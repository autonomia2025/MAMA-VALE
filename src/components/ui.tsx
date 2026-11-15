import { useEffect, useRef, useState, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import { useApp } from '../lib/app';
import { CONTACT, PHOTOS, SETTINGS, type Phone } from '../lib/config';
import { fmtCLP, type Product } from '../lib/catalog';

const Arrows = () => (
  <span aria-hidden="true" className="btn__disc">
    <span className="btn__arrow">→</span>
    <span className="btn__arrow">→</span>
  </span>
);

interface BtnProps { children: ReactNode; gold?: boolean; plus?: boolean; mag?: boolean; style?: CSSProperties }

/** Primary pill. Renders an <a> when given href, otherwise a <button>. */
export function Btn({ href, children, gold, plus, mag = true, style, ...rest }: BtnProps & { href?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = 'btn' + (gold ? ' btn--gold' : '');
  const icon = plus
    ? <span aria-hidden="true" className="btn__disc"><span className="btn__plus">+</span></span>
    : <Arrows />;
  if (href) return <a href={href} className={cls} data-mag={mag ? '1' : undefined} style={style}>{children} {icon}</a>;
  return <button className={cls} data-mag={mag ? '1' : undefined} style={style} {...rest}>{children} {icon}</button>;
}

export function BtnOutline({ href, children, plus, ...rest }: { href?: string; children: ReactNode; plus?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const inner = <><span>{children}</span>{plus && <span aria-hidden="true" className="btn-o__plus">+</span>}</>;
  if (href) return <a href={href} className="btn-o">{inner}</a>;
  return <button className="btn-o" {...rest}>{inner}</button>;
}

export function TextLink({ href, children, light, plain, arrow = true, external }: { href: string; children: ReactNode; light?: boolean; plain?: boolean; arrow?: boolean; external?: boolean }) {
  return (
    <a href={href} className={'tlink' + (light ? ' tlink--light' : '') + (plain ? ' tlink--plain' : '')}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
      {children}{arrow && <> <span aria-hidden="true" className="tlink__arrow">→</span></>}
    </a>
  );
}

const WA_PATH = 'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.31-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z';

export function WaIcon({ size, color }: { size: number; color: string }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flex: 'none', display: 'block' }}><path d={WA_PATH} /></svg>;
}

/** One sales line: WhatsApp link with its number, then a small "Llamar" link. */
export function PhoneRow({ ph, dark }: { ph: Phone; dark?: boolean }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: dark ? '4px 14px' : '4px 18px' }}>
      {dark ? (
        <a href={ph.wa} target="_blank" rel="noopener" aria-label={'Escribir por WhatsApp al ' + ph.label} className="flink" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <WaIcon size={15} color="var(--gold-2)" />{ph.label}
        </a>
      ) : (
        <a href={ph.wa} target="_blank" rel="noopener" aria-label={'Escribir por WhatsApp al ' + ph.label} className="tlink tlink--plain">
          <WaIcon size={17} color="var(--gold-text)" />{ph.label}
        </a>
      )}
      <a href={ph.tel} aria-label={'Llamar al ' + ph.label} className={'call-link' + (dark ? ' call-link--dark' : '')}>Llamar</a>
    </div>
  );
}

/** "WhatsApp" text link that opens a small menu to pick which sales line to write to. */
export function WaPicker() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  // On narrow screens the button can sit near the right edge; shift the menu left so it stays on screen.
  const [shift, setShift] = useState(0);

  useEffect(() => {
    if (!open) { setShift(0); return; }
    const r = pop.current?.getBoundingClientRect();
    if (r) setShift(Math.min(0, document.documentElement.clientWidth - 20 - r.right));
    pop.current?.querySelector('a')?.focus();
    const down = (e: PointerEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false); };
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    document.addEventListener('pointerdown', down);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', down); document.removeEventListener('keydown', key); };
  }, [open]);

  const arrows = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const as = Array.from(pop.current?.querySelectorAll('a') || []);
    const i = as.indexOf(document.activeElement as HTMLAnchorElement), n = as.length;
    as[e.key === 'ArrowDown' ? (i + 1) % n : (i - 1 + n) % n]?.focus();
  };

  return (
    <div ref={wrap} style={{ position: 'relative' }}
      onBlur={e => { if (open && e.relatedTarget && !wrap.current?.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <button ref={btn} type="button" className="tlink tlink--btn" aria-haspopup="true" aria-expanded={open} aria-controls="wa-pick" onClick={() => setOpen(o => !o)}>
        WhatsApp <span aria-hidden="true" className="tlink__arrow">→</span>
      </button>
      {open && (
        <div id="wa-pick" ref={pop} role="group" aria-label="Elegir número de WhatsApp" className="wa-pick" style={{ left: shift }} onKeyDown={arrows}>
          <span className="wa-pick__head">Escribir por WhatsApp a</span>
          {CONTACT.phones.map(ph => (
            <a key={ph.tel} href={ph.wa} target="_blank" rel="noopener" className="wa-pick__opt" onClick={() => setOpen(false)}>
              <WaIcon size={18} color="var(--gold-text)" /><span style={{ flex: 1 }}>{ph.label}</span><span aria-hidden="true" className="wa-pick__arrow">→</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/** Brand photo area. Shows the captioned placeholder until PHOTOS[id] is set. */
export function ImageSlot({ id, placeholder }: { id: string; placeholder: string }) {
  const src = PHOTOS[id];
  const [failed, setFailed] = useState(false);
  return (
    <div className="slot" data-slot={id}>
      {src && !failed ? (
        <img src={src} alt={placeholder.replace(/^Fotografía:\s*/i, '')} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="slot__empty" role="img" aria-label={placeholder}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 16-5-5-9 9" />
          </svg>
          <span className="slot__cap">{placeholder}</span>
        </div>
      )}
    </div>
  );
}

/** Product image that hides itself if the remote file fails, instead of showing a broken icon. */
export function ProductImg({ src, alt, className, style }: { src?: string; alt: string; className?: string; style?: CSSProperties }) {
  const [failed, setFailed] = useState(false);
  if (!src) return null;
  return <img src={src} alt={alt} loading="lazy" className={className} onError={() => setFailed(true)}
    style={{ ...style, visibility: failed ? 'hidden' : undefined }} />;
}

export function priceOf(p: Product) {
  return p.p && SETTINGS.showPrices ? fmtCLP(p.p) : 'Precio a cotizar';
}

export function ProductTile({ p }: { p: Product }) {
  const { quote, addQuote } = useApp();
  const inQ = quote.some(x => x.id === p.id);
  const href = '#/producto/' + p.id;
  return (
    <article className="tile">
      <a href={href} aria-label={p.n} className="tile__media">
        <ProductImg src={p.i} alt={p.n} className="tile__img" style={{ filter: p.f }} />
        <span aria-hidden="true" className="tile__peek glass-light">Ver ficha →</span>
      </a>
      <button className="tile__add" data-in={inQ} title="Añadir a cotización"
        aria-label={(inQ ? 'Sumar otra unidad de ' : 'Añadir ') + p.n + ' a cotización'}
        onClick={e => { e.preventDefault(); addQuote(p.id, p.n); }}>{inQ ? '✓' : '+'}</button>
      <div className="tile__meta">
        <span className="mono-label">{p.b || 'JVK'}</span>
        <a href={href} className="tile__name">{p.n}</a>
        <span className="tile__price">{priceOf(p)}</span>
      </div>
    </article>
  );
}

export function useGridCols() {
  const { mob } = useApp();
  if (mob) return 'repeat(2,minmax(0,1fr))';
  return SETTINGS.catalogDensity === 'Compacta' ? 'repeat(auto-fill,minmax(180px,1fr))' : 'repeat(auto-fill,minmax(230px,1fr))';
}

const GRAMS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
const E = 'cubic-bezier(.22,1,.36,1)';

/** 5–60 g scale with a glass tooltip that follows the pointer. */
export function GramRuler() {
  const [rg, setRg] = useState<number | null>(null);
  const left = rg == null ? '50%' : `calc(${(rg / (GRAMS.length - 1)).toFixed(4)} * (100% - 16px) + 8px)`;
  const op = rg == null ? 0 : 1;
  return (
    <div aria-hidden="true" style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--navy-line)', paddingTop: 40, cursor: 'ew-resize' }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        const i = Math.max(0, Math.min(GRAMS.length - 1, Math.round((e.clientX - r.left - 8) / (r.width - 16) * (GRAMS.length - 1))));
        if (i !== rg) setRg(i);
      }}
      onMouseLeave={() => setRg(null)}>
      <span className="glass-dark" style={{ position: 'absolute', top: 0, left, transform: 'translateX(-50%)', opacity: op, transition: `left .35s ${E}, opacity .3s ${E}`, pointerEvents: 'none', height: 28, padding: '0 12px', borderRadius: 999, display: 'flex', alignItems: 'center', fontFamily: 'var(--f-mono)', fontSize: 12, color: '#fff', whiteSpace: 'nowrap' }}>{rg == null ? '' : GRAMS[rg] + ' g'}</span>
      <span style={{ position: 'absolute', bottom: -1, left, width: 2, height: 26, marginLeft: -1, background: 'var(--gold-2)', borderRadius: 2, opacity: op, transition: `left .35s ${E}, opacity .3s ${E}`, pointerEvents: 'none' }} />
      {GRAMS.map((g, i) => (
        <div key={g} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 16 }}>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: rg === i ? 'var(--gold-2)' : '#8C9AB5', transition: `color .25s ${E}` }}>{g}</span>
          <span style={{ height: 18, display: 'flex', alignItems: 'flex-end' }}>
            {g % 10 === 0
              ? <span style={{ width: 1, height: 18, background: 'var(--gold-2)', display: 'block' }} />
              : <span style={{ width: 1, height: 9, background: '#5A6B8C', display: 'block' }} />}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Gold radial light that the motion engine moves with the pointer inside dark panels. */
export const Glow = () => (
  <div data-glow="1" aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: 720, height: 720, margin: '-360px 0 0 -360px', borderRadius: '50%', background: 'radial-gradient(closest-side,rgba(201,164,90,.16),rgba(201,164,90,0))', mixBlendMode: 'screen', pointerEvents: 'none', zIndex: 2, opacity: 0, transition: `opacity .6s ${E}, transform .5s cubic-bezier(.2,.8,.2,1)` }} />
);

/** Words that darken one by one as the block scrolls past (motion engine `data-fill`). */
export function FillWords({ text, color }: { text: string; color?: string }) {
  return <>{text.split(' ').map((w, i) => <span key={i} data-w="1" style={{ color, transition: 'opacity .25s linear' }}>{w + ' '}</span>)}</>;
}
