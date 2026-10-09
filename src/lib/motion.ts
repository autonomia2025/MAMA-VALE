// Scroll + pointer engine. One rAF loop reads layout, then writes transforms.
// Pages opt elements in with data attributes:
//   data-reveal="up|mask|img|stagger"  entrance on first intersection
//   data-par="0.1"   parallax (data-ptr adds a pointer drift)
//   data-depth       scales up as it enters the viewport
//   data-fill        words ([data-w]) darken as the block scrolls past
//   data-float       follows the pointer slightly
//   data-drift="±1"  hero lines slide apart with scroll
//   data-grow        hero photo widens to full bleed with scroll
//   data-glow        gold light follows the pointer inside its parent
//   data-dark        navbar turns dark glass while over this element
//   data-mag         magnetic button

const E = 'cubic-bezier(.22,1,.36,1)';
const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const qa = (root: Element, sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));

export interface MotionHooks {
  onScrolled(v: boolean): void;
  onNavDark(v: boolean): void;
  onPin(v: boolean): void;
}

type Word = HTMLElement & { __o?: string };
type WordHost = HTMLElement & { __ws?: Word[] };

export class Motion {
  root: HTMLElement | null = null;
  hooks: MotionHooks;
  rm = false;
  fine = false;
  pin = false;
  prevOn = false;
  refs: {
    pin: HTMLElement | null; row: HTMLElement | null; featBar: HTMLElement | null;
    prev: HTMLElement | null; marq: HTMLElement | null; cursor: HTMLElement | null;
  } = { pin: null, row: null, featBar: null, prev: null, marq: null, cursor: null };

  private io: IntersectionObserver | null = null;
  private ticking = false;
  private raf = 0;
  private scrolled = false;
  private navDark = false;
  private parEls: HTMLElement[] = []; private depthEls: HTMLElement[] = []; private fillEls: WordHost[] = [];
  private floatEls: HTMLElement[] = []; private driftEls: HTMLElement[] = []; private growEls: HTMLElement[] = [];
  private glowEls: HTMLElement[] = []; private darkEls: HTMLElement[] = [];
  private vel = 0; private lastY: number | null = null; private pinDist = 0; private pinVis = 1;
  mx: number | null = null; my = 0;
  private sx = 0; private sy = 0;
  px: number | null = null; private py = 0;
  private cx = -100; private cy = -100; private cs = 1; ct = 1; cp = 1;
  private magEl: HTMLElement | null = null;

  constructor(hooks: MotionHooks) {
    this.hooks = hooks;
    this.rm = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    this.fine = !this.rm && !!window.matchMedia?.('(pointer: fine)').matches;
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver(es => es.forEach(en => {
        if (!en.isIntersecting) return;
        this.reveal(en.target as HTMLElement); this.io!.unobserve(en.target);
      }), { rootMargin: '0px 0px -10% 0px' });
    }
  }

  destroy() { cancelAnimationFrame(this.raf); this.io?.disconnect(); }

  /** Re-collects tagged elements; call after every page render. */
  scan() {
    const root = this.root; if (!root) return;
    this.parEls = qa(root, '[data-par]'); this.depthEls = qa(root, '[data-depth]'); this.fillEls = qa(root, '[data-fill]');
    this.floatEls = qa(root, '[data-float]'); this.driftEls = qa(root, '[data-drift]'); this.growEls = qa(root, '[data-grow]');
    this.glowEls = qa(root, '[data-glow]'); this.darkEls = qa(root, '[data-dark]');
    const d = window.innerWidth < 760 ? 16 : 28;
    qa(root, '[data-reveal]:not([data-rv])').forEach(el => {
      el.setAttribute('data-rv', '1');
      if (this.rm || !this.io) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      const t = el.getAttribute('data-reveal');
      const prep = (n: HTMLElement, i: number) => {
        n.style.transition = `opacity .8s ${E} ${i * 70}ms, transform 1s ${E} ${i * 70}ms, clip-path 1.1s ${E} ${i * 70}ms`;
        if (t === 'mask') { n.style.clipPath = 'inset(0 0 100% 0)'; n.style.transform = `translate3d(0,${d}px,0)`; }
        else if (t === 'img') { const r = n.getAttribute('data-r') || '24'; n.style.clipPath = `inset(0 0 22% 0 round ${r}px)`; n.style.transform = 'scale(.985)'; }
        else { n.style.opacity = '0'; n.style.transform = `translate3d(0,${d}px,0)`; }
      };
      if (t === 'stagger') Array.from(el.children as HTMLCollectionOf<HTMLElement>).forEach(prep); else prep(el, 0);
      this.io.observe(el);
    });
    this.measure();
  }

  private reveal(el: HTMLElement) {
    const t = el.getAttribute('data-reveal');
    const fin = (n: HTMLElement) => {
      n.style.opacity = '1'; n.style.transform = 'none';
      if (t === 'mask') n.style.clipPath = 'inset(0 0 0% 0)';
      if (t === 'img') n.style.clipPath = `inset(0 0 0% 0 round ${n.getAttribute('data-r') || '24'}px)`;
    };
    if (t === 'stagger') Array.from(el.children as HTMLCollectionOf<HTMLElement>).forEach(fin); else fin(el);
  }

  /** Sizes the pinned horizontal section so vertical scroll maps to row travel. */
  measure() {
    const sec = this.refs.pin, tr = this.refs.row;
    const pin = !this.rm && window.innerWidth >= 1000 && window.innerHeight >= 680;
    if (pin !== this.pin) { this.pin = pin; this.hooks.onPin(pin); requestAnimationFrame(() => this.measure()); }
    if (!sec || !tr) return;
    if (pin && tr.lastElementChild) {
      const last = tr.lastElementChild as HTMLElement, g = Math.min(56, Math.max(20, window.innerWidth * .04));
      this.pinDist = Math.max(0, last.offsetLeft + last.offsetWidth + g - tr.clientWidth);
      this.pinVis = tr.clientWidth / (this.pinDist + tr.clientWidth);
      sec.style.height = (window.innerHeight + this.pinDist) + 'px';
    } else { sec.style.height = ''; tr.style.transform = ''; this.pinDist = 0; }
  }

  resetScroll() { this.px = null; this.lastY = 0; }

  req() { if (!this.ticking) { this.ticking = true; this.raf = requestAnimationFrame(() => this.tick()); } }

  pointer(e: PointerEvent) {
    this.mx = e.clientX; this.my = e.clientY;
    if (this.refs.cursor) this.refs.cursor.style.opacity = '1';
    const t = e.target as Element | null;
    const el = t?.closest ? t.closest<HTMLElement>('[data-mag]') : null;
    if (this.magEl && this.magEl !== el) { this.magEl.style.transition = `transform .6s ${E}`; this.magEl.style.transform = ''; }
    if (el && window.innerWidth >= 760) {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      el.style.transition = `transform .25s ${E}`;
      el.style.transform = `translate3d(${(dx * .16).toFixed(1)}px,${(dy * .3).toFixed(1)}px,0)`;
    }
    this.magEl = el;
    this.req();
  }

  private tick() {
    this.ticking = false;
    const vh = window.innerHeight, vw = window.innerWidth;
    const sc = window.scrollY > 12; if (sc !== this.scrolled) { this.scrolled = sc; this.hooks.onScrolled(sc); }
    const nd = this.darkEls.some(el => { const r = el.getBoundingClientRect(); return r.top <= 38 && r.bottom >= 38; });
    if (nd !== this.navDark) { this.navDark = nd; this.hooks.onNavDark(nd); }
    if (this.rm) return;
    const motion = vw >= 760;
    let again = false;
    // reads
    const par = motion ? this.parEls.map(el => [el, el.parentElement!.getBoundingClientRect()] as const) : [];
    const dep = motion ? this.depthEls.map(el => [el, el.parentElement!.getBoundingClientRect()] as const) : [];
    const fil = this.fillEls.map(el => [el, el.getBoundingClientRect()] as const);
    const y = window.scrollY;
    const gr = motion ? this.growEls.map(el => [el, el.getBoundingClientRect()] as const) : [];
    const pinR = this.pin && this.refs.pin ? this.refs.pin.getBoundingClientRect() : null;
    const glw = motion && this.mx != null ? this.glowEls.map(el => [el, el.parentElement!.getBoundingClientRect()] as const) : [];
    const dv = this.lastY == null ? 0 : y - this.lastY; this.lastY = y;
    this.vel += (dv - this.vel) * .18; if (Math.abs(this.vel) < .05) this.vel = 0; else again = true;
    if (motion && this.mx != null) {
      const tx = (this.mx / vw - .5) * 2, ty = (this.my / vh - .5) * 2;
      this.sx += (tx - this.sx) * .07; this.sy += (ty - this.sy) * .07;
      if (Math.abs(tx - this.sx) > .002 || Math.abs(ty - this.sy) > .002) again = true;
    }
    // writes
    par.forEach(([el, r]) => {
      if (r.bottom < -200 || r.top > vh + 200) return;
      const f = parseFloat(el.getAttribute('data-par') || '0') || 0;
      const lim = r.height * .09;
      let py = -(r.top + r.height / 2 - vh / 2) * f; py = Math.max(-lim, Math.min(lim, py));
      let px = 0;
      if (el.hasAttribute('data-ptr')) { px = this.sx * -12; py += this.sy * -8; }
      el.style.transform = `translate3d(${px.toFixed(1)}px,${py.toFixed(1)}px,0)`;
    });
    dep.forEach(([el, r]) => {
      const p = clamp((vh - r.top) / (vh * .8)), e = 1 - Math.pow(1 - p, 3);
      el.style.transform = `scale(${(.94 + .06 * e).toFixed(4)})`;
    });
    if (motion) this.floatEls.forEach(el => { el.style.transform = `translate3d(${(this.sx * 12).toFixed(1)}px,${(this.sy * 9).toFixed(1)}px,0)`; });
    fil.forEach(([sec, r]) => {
      const ws = sec.__ws || (sec.__ws = qa(sec, '[data-w]') as Word[]);
      const n = ws.length, p = clamp((vh * .86 - r.top) / (r.height + vh * .3));
      ws.forEach((w, i) => { const o = (.14 + .86 * clamp(p * n * 1.15 - i)).toFixed(2); if (w.__o !== o) { w.__o = o; w.style.opacity = o; } });
    });
    if (motion) { const p = clamp(y / vh); this.driftEls.forEach(el => { el.style.transform = `translate3d(${(parseFloat(el.getAttribute('data-drift') || '0') * p * vw * .05).toFixed(1)}px,0,0)`; }); }
    gr.forEach(([el, r]) => {
      const p = clamp(y / Math.max(1, r.top + y - 64)), e = p * p * (3 - 2 * p);
      const g = Math.min(56, Math.max(20, vw * .04)) * (1 - e);
      el.style.clipPath = `inset(0 ${g.toFixed(1)}px round ${(28 * (1 - e)).toFixed(1)}px)`;
    });
    if (pinR && this.refs.row) {
      const p = clamp(-pinR.top / Math.max(1, pinR.height - vh));
      const sk = motion ? Math.max(-1.2, Math.min(1.2, this.vel * -.05)) : 0;
      this.refs.row.style.transform = `translate3d(${(-p * this.pinDist).toFixed(1)}px,0,0) skewX(${sk.toFixed(2)}deg)`;
      if (this.refs.featBar) this.refs.featBar.style.transform = `scaleX(${(this.pinVis + (1 - this.pinVis) * p).toFixed(4)})`;
    }
    glw.forEach(([el, r]) => {
      const inside = this.mx! >= r.left && this.mx! <= r.right && this.my >= r.top && this.my <= r.bottom;
      el.style.opacity = inside ? '1' : '0';
      if (inside) el.style.transform = `translate3d(${(this.mx! - r.left).toFixed(0)}px,${(this.my - r.top).toFixed(0)}px,0)`;
    });
    const mq = this.refs.marq;
    if (mq?.getAnimations) {
      const an = mq.getAnimations()[0];
      if (an) { const rate = 1 + Math.min(5, Math.abs(this.vel) * .22); if (Math.abs((an.playbackRate || 1) - rate) > .02) an.playbackRate = rate; }
    }
    const pv = this.refs.prev;
    if (pv && this.prevOn && this.mx != null) {
      const tx = this.mx < vw - 330 ? this.mx + 36 : this.mx - 296, ty = this.my - 170;
      if (this.px == null) { this.px = tx; this.py = ty; }
      const dx = tx - this.px; this.px += dx * .16; this.py += (ty - this.py) * .16;
      const rot = Math.max(-6, Math.min(6, dx * .05));
      pv.style.transform = `translate3d(${this.px.toFixed(1)}px,${this.py.toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg)`;
      if (Math.abs(dx) > .3 || Math.abs(ty - this.py) > .3) again = true;
    }
    const c = this.refs.cursor;
    if (c && this.mx != null) {
      this.cx += (this.mx - this.cx) * .24; this.cy += (this.my - this.cy) * .24;
      const target = this.ct * this.cp; this.cs += (target - this.cs) * .2;
      c.style.transform = `translate3d(${(this.cx - 17).toFixed(1)}px,${(this.cy - 17).toFixed(1)}px,0) scale(${this.cs.toFixed(3)})`;
      if (Math.abs(this.mx - this.cx) > .3 || Math.abs(this.my - this.cy) > .3 || Math.abs(target - this.cs) > .005) again = true;
    }
    if (again) this.req();
  }
}
