import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Ctx, EASE as E, type AppCtx, type CatFilters, type QuoteItem } from './lib/app';
import { loadCatalog, type Catalog } from './lib/catalog';
import { SETTINGS } from './lib/config';
import { Motion } from './lib/motion';
import { PAGE_LABEL, parseHash, type Route } from './lib/router';
import { Header, MobileMenu } from './components/Header';
import { Footer } from './components/Footer';
import { CtaBand } from './components/CtaBand';
import { Home } from './pages/Home';
import { CatalogPage } from './pages/Catalog';
import { ProductPage } from './pages/Product';
import { Contrapesos } from './pages/Contrapesos';
import { Empresa } from './pages/Empresa';
import { Contacto } from './pages/Contacto';

const QUOTE_KEY = 'jvk-quote-v1';
const BASE = 'Maquinarias JVK';

function titleFor(r: Route, data: Catalog | null) {
  if (r.page === 'producto' && data) { const p = data.products.find(x => x.id === r.pid); if (p) return p.n + ' — ' + BASE; }
  return ({
    inicio: BASE + ' — Equipos y contrapesos para talleres', catalogo: 'Catálogo — ' + BASE,
    contrapesos: 'Contrapesos para balanceo de neumáticos — ' + BASE, empresa: 'Empresa — ' + BASE,
    contacto: 'Contacto y cotización — ' + BASE,
  } as Record<string, string>)[r.page] || BASE;
}

function readQuote(): QuoteItem[] {
  try { const q = JSON.parse(localStorage.getItem(QUOTE_KEY) || '[]'); return Array.isArray(q) ? q : []; } catch { return []; }
}

type Curtain = 'off' | 'in' | 'out';

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseHash(location.hash) || { page: 'inicio', pid: null, line: 'todas' });
  const [data, setData] = useState<Catalog | null>(null);
  const [vw, setVw] = useState(window.innerWidth);
  const [scrolled, setScrolled] = useState(false);
  const [navDark, setNavDark] = useState(false);
  const [pin, setPin] = useState(false);
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [bar, setBar] = useState({ w: 0, o: 0 });
  const [curtain, setCurtain] = useState<Curtain>('off');
  const [curtainLabel, setCurtainLabel] = useState('');
  const [menu, setMenu] = useState(false);
  const [quote, setQuote] = useState<QuoteItem[]>(readQuote);
  const [toast, setToast] = useState<{ n: string; k: number } | null>(null);
  const [cat, setCatState] = useState<CatFilters>({ brand: '', q: '', sort: 'rel', limit: 24 });
  const [gridFade, setGridFade] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef(route); routeRef.current = route;
  const timers = useRef<{ g?: number; t?: number }>({});

  const motion = useMemo(() => new Motion({ onScrolled: setScrolled, onNavDark: setNavDark, onPin: setPin }), []);
  const rm = motion.rm;

  const playIntro = useCallback(() => {
    if (rm) { setEntered(true); return; }
    setEntered(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
  }, [rm]);

  const flashGrid = useCallback(() => {
    if (rm) return;
    setGridFade(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setGridFade(false)));
  }, [rm]);

  // ---------- navigation ----------
  const go = useCallback(() => {
    const st = parseHash(location.hash); if (!st) return;
    const cur = routeRef.current;
    const g = timers.current;
    const resetCatalog = () => { if (st.page === 'catalogo') setCatState(c => ({ ...c, brand: '', limit: 24 })); };
    if (rm || (st.page === cur.page && st.pid === cur.pid)) {
      resetCatalog(); setRoute(st); setMenu(false); flashGrid();
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }
    clearTimeout(g.g);
    const LP = ['catalogo', 'producto'];
    if (!(LP.includes(st.page) && LP.includes(cur.page))) {
      // Full-screen navy curtain carrying the destination's name.
      setCurtainLabel(PAGE_LABEL[st.page]); setCurtain('in'); setMenu(false);
      g.g = window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        motion.resetScroll(); motion.prevOn = false;
        resetCatalog(); setRoute(st); setEntered(false); setCurtain('out');
        window.setTimeout(playIntro, 120);
        g.g = window.setTimeout(() => setCurtain('off'), 820);
      }, 520);
      return;
    }
    // Catalog ↔ product keeps a quick fade with a gold progress line.
    setLeaving(true); setBar({ w: .7, o: 1 }); setMenu(false);
    g.g = window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      resetCatalog(); setRoute(st); setLeaving(false); setEntered(false); setBar({ w: 1, o: 1 });
      playIntro();
      g.g = window.setTimeout(() => { setBar({ w: 1, o: 0 }); g.g = window.setTimeout(() => setBar({ w: 0, o: 0 }), 500); }, 380);
    }, 240);
  }, [rm, flashGrid, playIntro, motion]);

  // ---------- mount ----------
  useEffect(() => {
    motion.root = rootRef.current;
    const onResize = () => { setVw(window.innerWidth); requestAnimationFrame(() => { motion.measure(); motion.req(); }); };
    const onScroll = () => motion.req();
    const onMove = (e: PointerEvent) => motion.pointer(e);
    const onOver = (e: PointerEvent) => { const t = e.target as Element | null; motion.ct = t?.closest?.('a,button,select,input,textarea,label,[data-cur]') ? 1.8 : 1; motion.req(); };
    const onDown = () => { motion.cp = .82; motion.req(); };
    const onUp = () => { motion.cp = 1; motion.req(); };
    const onOut = (e: PointerEvent) => { if (!e.relatedTarget && motion.refs.cursor) motion.refs.cursor.style.opacity = '0'; };
    window.addEventListener('hashchange', go);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (motion.fine) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerover', onOver, { passive: true });
      document.addEventListener('pointerdown', onDown, { passive: true });
      document.addEventListener('pointerup', onUp, { passive: true });
      document.addEventListener('pointerout', onOut, { passive: true });
    }
    loadCatalog().then(setData).catch(() => {});
    playIntro();
    return () => {
      window.removeEventListener('hashchange', go);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerout', onOut);
      clearTimeout(timers.current.g); clearTimeout(timers.current.t);
      motion.destroy();
    };
  }, [go, motion, playIntro]);

  useEffect(() => { document.title = titleFor(route, data); }, [route, data]);
  useEffect(() => { requestAnimationFrame(() => { motion.scan(); motion.req(); }); }, [route.page, route.pid, data, motion]);

  // Escape closes the menu; the page behind does not scroll while it is open.
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  // ---------- quote ----------
  const saveQ = useCallback((q: QuoteItem[]) => {
    setQuote(q);
    try { localStorage.setItem(QUOTE_KEY, JSON.stringify(q)); } catch { /* private mode */ }
  }, []);
  const quoteRef = useRef(quote); quoteRef.current = quote;
  const addQuote = useCallback((id: string, n: string) => {
    const q = quoteRef.current.slice(); const i = q.findIndex(x => x.id === id);
    if (i >= 0) q[i] = { ...q[i], qty: q[i].qty + 1 }; else q.push({ id, n, qty: 1 });
    saveQ(q);
    clearTimeout(timers.current.t);
    setToast(t => ({ n, k: (t?.k || 0) + 1 }));
    timers.current.t = window.setTimeout(() => setToast(null), 3200);
  }, [saveQ]);
  const setQty = useCallback((id: string, d: number) => {
    saveQ(quoteRef.current.map(x => x.id === id ? { ...x, qty: x.qty + d } : x).filter(x => x.qty > 0));
  }, [saveQ]);

  const mob = vw < 760;
  const ctx: AppCtx = {
    route, data, motion, vw, mob, pin, entered, quote, addQuote, setQty, clearQuote: () => saveQ([]),
    cat, setCat: p => setCatState(c => ({ ...c, ...p })), gridFade, flashGrid,
  };
  const quoteCount = quote.reduce((a, x) => a + x.qty, 0);
  const page = route.page;

  return (
    <Ctx.Provider value={ctx}>
      <div ref={rootRef} style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)' }}>
        <a href="#contenido" className="skip">Saltar al contenido</a>

        <div aria-hidden="true" style={{ position: 'fixed', left: 0, right: 0, top: 0, height: 2, zIndex: 95, pointerEvents: 'none', background: 'var(--gold)', transformOrigin: '0 50%', transform: `scaleX(${bar.w})`, opacity: bar.o, transition: `transform .5s ${E}, opacity .4s ease` }} />

        <PageCurtain state={curtain} label={curtainLabel} />

        <Header scrolled={scrolled} dark={navDark} mob={mob} page={page} quoteCount={quoteCount} menu={menu} onMenu={() => setMenu(true)} />

        <main id="contenido" style={{
          position: 'relative', zIndex: 1, background: 'var(--bg)', borderRadius: '0 0 clamp(24px,3vw,40px) clamp(24px,3vw,40px)',
          opacity: leaving ? 0 : 1, transform: leaving ? 'translate3d(0,10px,0)' : 'none',
          transition: leaving ? 'opacity .22s cubic-bezier(.65,0,.35,1), transform .22s cubic-bezier(.65,0,.35,1)' : `opacity .55s ${E}, transform .7s ${E}`,
        }}>
          {page === 'inicio' && <Home />}
          {page === 'catalogo' && <CatalogPage />}
          {page === 'producto' && <ProductPage />}
          {page === 'contrapesos' && <Contrapesos />}
          {page === 'empresa' && <Empresa />}
          {page === 'contacto' && <Contacto />}
          {page !== 'contacto' && <CtaBand />}
        </main>

        <Footer />
        <MobileMenu open={menu} page={page} onClose={() => setMenu(false)} />
        {toast && <Toast key={toast.k} name={toast.n} />}
        {motion.fine && SETTINGS.customCursor && (
          <div ref={el => { motion.refs.cursor = el; }} aria-hidden="true" style={{ position: 'fixed', left: 0, top: 0, width: 34, height: 34, borderRadius: '50%', border: '1.5px solid #fff', mixBlendMode: 'difference', pointerEvents: 'none', zIndex: 200, opacity: 0, transition: 'opacity .3s ease', willChange: 'transform' }} />
        )}
      </div>
    </Ctx.Provider>
  );
}

function PageCurtain({ state, label }: { state: Curtain; label: string }) {
  const clip = state === 'in' ? 'inset(0% 0% 0% 0%)' : state === 'out' ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)';
  const trn = state === 'in' ? 'clip-path .5s cubic-bezier(.76,0,.24,1)' : state === 'out' ? 'clip-path .75s cubic-bezier(.76,0,.24,1)' : 'none';
  const labelT = state === 'in' ? 'translate3d(0,0,0)' : state === 'out' ? 'translate3d(0,-110%,0)' : 'translate3d(0,110%,0)';
  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 96, background: 'var(--navy-deep)', pointerEvents: 'none', display: 'flex', alignItems: 'flex-end', padding: '0 clamp(20px,4vw,56px) clamp(28px,5vw,64px)', clipPath: clip, transition: trn, visibility: state === 'off' ? 'hidden' : 'visible' }}>
      <div style={{ overflow: 'hidden', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, containerType: 'inline-size' }}>
        <span style={{ display: 'block', fontFamily: 'var(--f-display)', fontStretch: '120%', fontWeight: 600, fontSize: 'min(calc((100cqi - 150px) / 9.8),168px)', whiteSpace: 'nowrap', lineHeight: .9, letterSpacing: '-.02em', textTransform: 'uppercase', color: '#fff', transform: labelT, transition: `transform .5s ${E} .04s` }}>{label}</span>
        <img src="/assets/jvk-logo-white.png" alt="" style={{ height: 34, width: 'auto', marginBottom: 12, opacity: state === 'in' ? 1 : 0, transition: `opacity .35s ${E} .1s` }} />
      </div>
    </div>
  );
}

function Toast({ name }: { name: string }) {
  return (
    <div role="status" className="glass-dark" style={{ position: 'fixed', left: '50%', bottom: 24, transform: 'translateX(-50%)', zIndex: 90, display: 'flex', alignItems: 'center', gap: 16, width: 'max-content', maxWidth: 'calc(100% - 32px)', padding: '8px 8px 8px 20px', borderRadius: 999, background: 'rgba(12,22,40,.82)', color: '#fff', fontSize: 14, animation: `jvkToast .5s ${E}` }}>
      <span style={{ width: 22, height: 22, flex: 'none', borderRadius: '50%', background: 'var(--gold-2)', color: 'var(--navy-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '46vw' }}><span style={{ color: 'var(--soft)' }}>Añadido · </span>{name}</span>
      <a href="#/contacto" className="toast-cta" style={{ flex: 'none', height: 38, display: 'inline-flex', alignItems: 'center', padding: '0 16px', borderRadius: 999, background: 'var(--gold-2)', color: 'var(--navy-deep)', textDecoration: 'none', fontWeight: 600 }}>Ver cotización</a>
    </div>
  );
}
