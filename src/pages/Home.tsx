import { useEffect, useRef, useState } from 'react';
import { EASE as E, intro, useApp } from '../lib/app';
import { FEATURED, LINES, VALUES, brandCounts, type Product } from '../lib/catalog';
import { SETTINGS } from '../lib/config';
import { Btn, FillWords, Glow, GramRuler, ImageSlot, ProductImg, ProductTile, TextLink } from '../components/ui';

const MANIFESTO: [string, string][] = [
  ['Un neumático mal balanceado se nota a 80 km/h. Un taller mal equipado se nota todos los días.', '#13213B'],
  ['En JVK elegimos cada equipo y cada contrapeso para que ninguna de las dos cosas pase.', '#7D8494'],
];

const statNum = { fontFamily: 'var(--f-display)', fontStretch: '115%', fontWeight: 600, fontSize: 'clamp(34px,3.4vw,48px)', lineHeight: 1 } as const;
const stat = { borderTop: '1px solid var(--ink)', paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 6 } as const;
const statLbl = { fontSize: 15, color: 'var(--muted)' } as const;
const neg = 'calc(-1 * var(--gutter))';

export function Home() {
  const { data, entered } = useApp();
  const I = intro(entered);
  const P = data?.products || [];
  const brands = brandCounts(P);

  return (
    <div data-screen-label="Inicio">
      {/* ---------- hero ---------- */}
      <section aria-labelledby="h-home" className="wrap" style={{ paddingTop: 'clamp(28px,4.5vw,64px)' }}>
        <h1 id="h-home" style={{ margin: 0, display: 'flex', flexDirection: 'column', fontFamily: 'var(--f-display)', fontStretch: '112%', fontWeight: 600, fontSize: 'clamp(38px,5.8vw,94px)', lineHeight: .94, letterSpacing: I.ls, textTransform: 'uppercase', transition: `letter-spacing 1.6s ${E}` }}>
          <span data-drift="-1" className="line-mask"><span style={{ transform: I.line, transition: `transform 1.1s ${E} .05s` }}>Equipamos talleres</span></span>
          <span data-drift="1" className="line-mask" style={{ paddingLeft: 'clamp(0px,11vw,200px)' }}><span style={{ color: 'var(--gold-head)', transform: I.line, transition: `transform 1.1s ${E} .17s` }}>que no improvisan.</span></span>
        </h1>
        {/* v4: everything under the headline is centred; the headline itself keeps its alignment. */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '28px 48px', marginTop: 'clamp(28px,4vw,52px)', marginBottom: 'clamp(28px,3.5vw,44px)' }}>
          <p className="eyebrow" style={{ display: 'flex', gap: 14, alignItems: 'center', opacity: I.o, transition: `opacity .9s ${E} .5s` }}>
            <span style={{ width: 28, height: 1, background: 'var(--ink)' }} />Maquinarias JVK · Chile
          </p>
          <div style={{ flex: '0 1 auto', width: 'min(100%,460px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, opacity: I.o, transform: I.up, transition: `opacity .9s ${E} .55s, transform 1s ${E} .55s` }}>
            <p className="lede">Soluciones para el sector automotriz, transporte y maquinaria. Contrapesos de línea propia y más de 500 equipos para cada puesto del taller.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px 26px', alignItems: 'center' }}>
              <Btn href="#/catalogo">Ver catálogo</Btn>
              <TextLink href="#/contrapesos">Línea de contrapesos</TextLink>
            </div>
          </div>
        </div>
        <div data-grow="1" style={{ marginLeft: neg, marginRight: neg, clipPath: 'inset(0 clamp(20px,4vw,56px) round 28px)', willChange: 'clip-path' }}>
          <div style={{ position: 'relative', height: 'clamp(400px,68vh,760px)', clipPath: I.clipG, transition: `clip-path 1.5s ${E} .15s`, background: 'var(--ph)', overflow: 'hidden' }}>
            <div data-par="0.1" data-ptr="1" style={{ position: 'absolute', left: '-2%', right: '-2%', top: '-9%', bottom: '-9%' }}>
              <div style={{ position: 'absolute', inset: 0, transform: I.scale, transition: `transform 2.2s ${E} .1s` }}>
                <ImageSlot id="home-hero" placeholder="Fotografía principal: rueda en balanceadora, luz lateral fría, fondo de taller desenfocado" />
              </div>
            </div>
            <div aria-hidden="true" style={{ position: 'absolute', inset: 'auto 0 0 0', height: '45%', background: 'linear-gradient(180deg,rgba(12,22,40,0),rgba(12,22,40,.32))', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', left: 'calc(var(--gutter) + clamp(12px,2vw,24px))', bottom: 'clamp(12px,2vw,24px)' }}><ScrollCue on={entered} /></div>
            {SETTINGS.showReadout && <Readout />}
          </div>
        </div>
        <div data-reveal="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,210px),1fr))', gap: '28px 32px', padding: 'clamp(28px,3vw,40px) 0 0' }}>
          <div style={stat}><span style={statNum}>{data ? P.length : 516}</span><span style={statLbl}>productos en catálogo</span></div>
          <div style={stat}><span style={statNum}>{data ? brands.length : 35}</span><span style={statLbl}>marcas de equipamiento</span></div>
          <div style={stat}><span style={statNum}>8</span><span style={statLbl}>líneas para el taller completo</span></div>
          <div style={stat}><span style={statNum}>5–60 g</span><span style={statLbl}>contrapesos de línea propia</span></div>
        </div>
      </section>

      {/* ---------- 01 criterio ---------- */}
      <section id="criterio" aria-label="Criterio" className="wrap sec" style={{ paddingBottom: 'var(--sec)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 32 }}>
          <p data-reveal="up" className="eyebrow">01 — Criterio</p>
          <p data-fill="1" style={{ gridColumn: '1/-1', margin: 0, maxWidth: 1180, fontFamily: 'var(--f-display)', fontStretch: '104%', fontWeight: 500, fontSize: 'clamp(28px,3.9vw,58px)', lineHeight: 1.12, letterSpacing: '-.015em', textWrap: 'pretty' }}>
            {MANIFESTO.map(([t, c]) => <FillWords key={t} text={t} color={c} />)}
          </p>
        </div>
      </section>

      {/* ---------- 02 contrapesos ---------- */}
      <section aria-labelledby="h-cp" className="wrap">
        <div data-depth="1" data-dark="1" style={{ position: 'relative', background: 'var(--navy)', borderRadius: 32, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))', transformOrigin: '50% 0' }}>
          <Glow />
          <div style={{ position: 'relative', minHeight: 'clamp(340px,44vw,660px)', background: 'var(--navy-panel)', overflow: 'hidden', color: '#fff' }}>
            <div data-par="0.08" style={{ position: 'absolute', left: 0, right: 0, top: '-9%', bottom: '-9%' }}>
              <ImageSlot id="home-contrapesos" placeholder="Fotografía: contrapesos de gancho y adhesivos sobre superficie oscura, luz rasante" />
            </div>
            <span className="chip glass-dark" style={{ position: 'absolute', left: 'clamp(14px,2vw,24px)', bottom: 'clamp(14px,2vw,24px)', color: '#fff' }}>Stock permanente · venta por caja</span>
          </div>
          <div style={{ padding: 'clamp(28px,5vw,72px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 48, color: '#fff' }}>
            <div data-reveal="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <p className="eyebrow" style={{ color: 'var(--gold-2)' }}>02 — Línea propia</p>
              {/* v4: the giant word scales with its column (container query) so it is never clipped. */}
              <h2 id="h-cp" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 10, containerType: 'inline-size' }}>
                <span style={{ fontFamily: 'var(--f-display)', fontStretch: '118%', fontWeight: 600, fontSize: 'min(10.2cqi,96px)', whiteSpace: 'nowrap', lineHeight: .95, letterSpacing: '-.02em', textTransform: 'uppercase' }}>Contrapesos</span>
                <span style={{ fontSize: 'clamp(19px,1.7vw,24px)', fontWeight: 400, color: 'var(--soft-2)' }}>para balanceo de neumáticos</span>
              </h2>
              <p style={{ margin: 0, maxWidth: 460, fontSize: 16, lineHeight: 1.6, color: 'var(--soft)', textWrap: 'pretty' }}>Es donde empezamos y lo que más despachamos. Gramaje exacto, fijación segura y stock constante para vulcanizaciones, talleres y flotas.</p>
            </div>
            <div data-reveal="stagger" style={{ display: 'flex', flexDirection: 'column' }}>
              {[['Adhesivos', '5 / 10 g · tira 60 g'], ['De gancho', '5 — 60 g'], ['Línea pesada', 'camión y bus']].map(([k, v], i) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, padding: '16px 0', borderTop: '1px solid var(--navy-line)', borderBottom: i === 2 ? '1px solid var(--navy-line)' : undefined }}>
                  <span style={{ fontSize: 16, fontWeight: 500 }}>{k}</span>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--gold-2)' }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <GramRuler />
              <Btn href="#/contrapesos" gold>Conocer la línea</Btn>
            </div>
          </div>
        </div>
      </section>

      <LinesSection />
      <FeaturedSection />

      {/* ---------- 05 valores ---------- */}
      <section aria-labelledby="h-valores" className="wrap sec">
        <div className="sec-head">
          <p data-reveal="up" className="eyebrow">05 — Cómo trabajamos</p>
          <h2 data-reveal="mask" id="h-valores" className="h-section" style={{ maxWidth: 900 }}>Lo que no cambia de un pedido a otro</h2>
        </div>
        <div data-reveal="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: '40px 32px' }}>
          {VALUES.map(v => (
            <div key={v.num} style={{ borderTop: '1px solid var(--ink)', paddingTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span className="num">{v.num}</span>
              <h3 className="h-card">{v.t}</h3>
              <p className="small">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Marquee brands={brands.slice(0, 16)} />
    </div>
  );
}

/** Wheel-balancer readout that counts down to 0 g, "Equilibrada". */
function Readout() {
  const { entered, motion } = useApp();
  const I = intro(entered);
  const [v, setV] = useState({ ri: 38, re: 22 });
  useEffect(() => {
    if (motion.rm) { setV({ ri: 0, re: 0 }); return; }
    const A = 38, B = 22; let t0: number | null = null; let raf = 0;
    const step = (ts: number) => {
      if (t0 === null) t0 = ts;
      const k = Math.min(1, Math.max(0, (ts - t0 - 1500) / 1900));
      const e = 1 - Math.pow(1 - k, 3);
      const ri = Math.round(A * (1 - e)), re = Math.round(B * (1 - e));
      setV(o => (o.ri === ri && o.re === re ? o : { ri, re }));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [motion]);
  const balanced = v.ri + v.re === 0;
  const lbl = { fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--soft)', textTransform: 'uppercase', letterSpacing: '.08em' } as const;
  const big = { fontFamily: 'var(--f-mono)', fontSize: 34, fontWeight: 500, lineHeight: 1, fontVariantNumeric: 'tabular-nums' } as const;
  return (
    <div data-float="1" aria-hidden="true" style={{ position: 'absolute', right: 'calc(var(--gutter) + clamp(12px,2vw,28px))', bottom: 'clamp(12px,2vw,28px)', width: 'min(340px,calc(100% - 24px - 2 * var(--gutter)))', pointerEvents: 'none' }}>
      <div className="glass-dark" style={{ borderRadius: 22, padding: '18px 20px 20px', color: '#fff', display: 'flex', flexDirection: 'column', gap: 16, opacity: I.o, transform: I.up, transition: `opacity .9s ${E} 1s, transform 1.1s ${E} 1s` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--soft-2)' }}>
          <span>Balanceo dinámico</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: balanced ? 'var(--gold-2)' : '#9AA6BD', transition: `color .5s ${E}` }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: balanced ? 'var(--gold-2)' : 'rgba(255,255,255,.3)', transition: `background .5s ${E}` }} />
            {balanced ? 'Equilibrada' : 'Midiendo'}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><span style={lbl}>Interior</span><span style={big}>{v.ri}<span style={{ fontSize: 15, color: 'var(--soft)' }}> g</span></span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><span style={lbl}>Exterior</span><span style={big}>{v.re}<span style={{ fontSize: 15, color: 'var(--soft)' }}> g</span></span></div>
        </div>
        <div style={{ position: 'relative', height: 16, background: 'repeating-linear-gradient(90deg,rgba(255,255,255,.22) 0 1px,transparent 1px 10px)' }}>
          <span style={{ position: 'absolute', left: '50%', top: -3, bottom: -3, width: 1, background: '#fff' }} />
          <span style={{ position: 'absolute', top: -4, width: 3, height: 24, borderRadius: 2, background: 'var(--gold-2)', left: (50 + (v.ri - v.re) * 1.1 + v.re * 0.4) + '%', transition: 'left .12s linear' }} />
        </div>
      </div>
    </div>
  );
}

function ScrollCue({ on }: { on: boolean }) {
  const { motion } = useApp();
  return (
    <button type="button" aria-label="Bajar al contenido" className="glass-dark"
      onClick={() => { const el = document.getElementById('criterio'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 40, behavior: motion.rm ? 'auto' : 'smooth' }); }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 12, height: 40, padding: '0 16px 0 14px', borderRadius: 999, background: 'rgba(12,22,40,.42)', backdropFilter: 'blur(14px) saturate(1.4)', WebkitBackdropFilter: 'blur(14px) saturate(1.4)', border: '1px solid rgba(255,255,255,.16)', color: '#fff', fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer', opacity: on ? 1 : 0, transition: `opacity .8s ${E} 1.4s` }}>
      <span aria-hidden="true" style={{ position: 'relative', width: 1, height: 18, background: 'rgba(255,255,255,.25)', overflow: 'hidden', display: 'block' }}>
        <span style={{ position: 'absolute', left: 0, top: 0, width: 1, height: 8, background: 'var(--gold-2)', display: 'block', animation: `jvkCue 1.8s ${E} infinite` }} />
      </span>
      Desliza
    </button>
  );
}

/** 03 — the eight product lines, with an image preview that trails the cursor on wide desktops. */
function LinesSection() {
  const { data, vw, motion } = useApp();
  const lines = data?.lines || [];
  const P = data?.products || [];
  const [hover, setHover] = useState('elevadores');
  const [prevOn, setPrevOn] = useState(false);
  const prevEnabled = vw >= 1100 && motion.fine;
  const hl = lines.find(l => l.k === hover) || lines[0];
  let hp: Product | undefined;
  if (hl) { const pool = P.filter(p => p.l === hl.k); hp = pool.find(p => LINES[hl.k][1].test(p.n)) || pool[0]; }
  const setOn = (v: boolean) => { if (v) motion.px = null; motion.prevOn = v; setPrevOn(v); motion.req(); };
  useEffect(() => () => { motion.prevOn = false; motion.refs.prev = null; }, [motion]);

  return (
    <section aria-labelledby="h-lineas" className="wrap sec">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px 48px', marginBottom: 'clamp(36px,4vw,56px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 820 }}>
          <p data-reveal="up" className="eyebrow">03 — Catálogo</p>
          <h2 data-reveal="mask" id="h-lineas" className="h-section">Ocho líneas para equipar un taller completo</h2>
        </div>
        <TextLink href="#/catalogo">Ver todo el catálogo</TextLink>
      </div>
      <div onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)} style={{ position: 'relative' }}>
        <ol data-reveal="stagger" className="lines">
          {lines.map((l, i) => {
            const enter = () => setHover(l.k);
            return (
              <li key={l.k}>
                <a href={'#/catalogo?linea=' + l.k} onMouseEnter={enter} onFocus={enter} className="lines__row">
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '6px 28px', minWidth: 0, transform: 'translateX(calc(var(--h,0) * 14px))', transition: `transform .6s ${E}` }}>
                    <span style={{ fontFamily: 'var(--f-display)', fontStretch: '112%', fontWeight: 600, fontSize: 'clamp(22px,3.4vw,52px)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-.015em' }}>{l.t}</span>
                    <span style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--muted)', maxWidth: 340 }}>{(LINES[l.k] || [''])[0]}</span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{l.n} productos</span>
                    <span aria-hidden="true" className="lines__arrow">→</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
        {prevEnabled && (
          <div ref={el => { motion.refs.prev = el; }} aria-hidden="true" style={{ position: 'fixed', left: 0, top: 0, zIndex: 20, width: 260, pointerEvents: 'none', willChange: 'transform' }}>
            <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 20, overflow: 'hidden', background: '#fff', boxShadow: '0 40px 80px -40px rgba(12,22,40,.45)', opacity: prevOn ? 1 : 0, transform: `scale(${prevOn ? 1 : .86})`, transition: `opacity .35s ${E}, transform .55s ${E}` }}>
              {hp && <ProductImg key={hp.id} src={hp.i} alt={hp.n} style={{ position: 'absolute', inset: '12%', width: '76%', height: '76%', objectFit: 'contain', animation: `jvkImgIn .8s ${E}` }} />}
              <span style={{ position: 'absolute', left: 12, right: 12, bottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, height: 34, padding: '0 14px', borderRadius: 999, background: 'rgba(241,240,236,.7)', backdropFilter: 'blur(14px) saturate(1.5)', WebkitBackdropFilter: 'blur(14px) saturate(1.5)', border: '1px solid rgba(255,255,255,.6)', fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink)' }}>
                <span>Explorar</span><span style={{ color: 'var(--muted)' }}>{hl ? hl.n + ' productos' : ''}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** 04 — featured equipment. On large screens the section pins and vertical scroll moves the row sideways. */
function FeaturedSection() {
  const { data, pin, motion } = useApp();
  const P = data?.products || [];
  const tiles = FEATURED.map(rx => P.find(p => rx.test(p.n))).filter((p): p is Product => !!p);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [edge, setEdge] = useState({ atStart: true, atEnd: false });

  useEffect(() => () => { motion.refs.pin = null; motion.refs.row = null; motion.refs.featBar = null; }, [motion]);
  useEffect(() => { requestAnimationFrame(() => { motion.measure(); motion.req(); }); }, [tiles.length, pin, motion]);

  const onRowScroll = () => {
    const el = rowRef.current; if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const vis = el.clientWidth / (el.scrollWidth || 1), p = max > 0 ? el.scrollLeft / max : 1;
    if (barRef.current) barRef.current.style.transform = `scaleX(${(vis + (1 - vis) * p).toFixed(4)})`;
    const atStart = el.scrollLeft < 8, atEnd = el.scrollLeft > max - 8;
    if (atStart !== edge.atStart || atEnd !== edge.atEnd) setEdge({ atStart, atEnd });
  };
  const by = (d: number) => { const el = rowRef.current; el?.scrollBy({ left: d * el.clientWidth * 0.8, behavior: motion.rm ? 'auto' : 'smooth' }); };

  return (
    <section ref={el => { motion.refs.pin = el; }} aria-labelledby="h-dest" style={{ position: 'relative', marginTop: 'var(--sec)' }}>
      <div style={{ position: pin ? 'sticky' : 'relative', top: 0, minHeight: pin ? '100vh' : 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', padding: pin ? 'clamp(64px,9vh,104px) 0 32px' : 0 }}>
        <div className="wrap" style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 'clamp(28px,3vw,44px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p data-reveal="up" className="eyebrow">04 — Selección</p>
            <h2 data-reveal="mask" id="h-dest" className="h-section">Equipos destacados</h2>
          </div>
          {pin ? (
            <p className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>Sigue bajando para recorrer<span aria-hidden="true" style={{ width: 28, height: 1, background: 'var(--ink)' }} /></p>
          ) : (
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="round" onClick={() => by(-1)} disabled={edge.atStart} aria-label="Anterior">←</button>
              <button className="round round--solid" onClick={() => by(1)} disabled={edge.atEnd} aria-label="Siguiente">→</button>
            </div>
          )}
        </div>
        <div ref={el => { rowRef.current = el; motion.refs.row = el; }} onScroll={onRowScroll} className="no-scrollbar"
          style={{ display: 'flex', gap: 20, overflowX: pin ? 'visible' : 'auto', scrollSnapType: pin ? 'none' : 'x mandatory', willChange: 'transform', transformOrigin: '50% 100%', padding: '0 var(--gutter) 8px', scrollPadding: '0 var(--gutter)' }}>
          {tiles.map(p => (
            <div key={p.id} style={{ flex: '0 0 clamp(250px,24vw,330px)', scrollSnapAlign: 'start' }}><ProductTile p={p} /></div>
          ))}
        </div>
        <div className="wrap" style={{ width: '100%', paddingTop: 28 }}>
          <div aria-hidden="true" style={{ height: 1, background: 'var(--line)', overflow: 'hidden' }}>
            <div ref={el => { barRef.current = el; motion.refs.featBar = el; }} style={{ height: 1, background: 'var(--ink)', transformOrigin: '0 50%', transform: 'scaleX(.4)', transition: `transform .25s ${E}` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee({ brands }: { brands: string[] }) {
  const { motion } = useApp();
  useEffect(() => () => { motion.refs.marq = null; }, [motion]);
  const items = [0, 1].flatMap(r => brands.map((b, i) => (
    <span key={r + '-' + i} aria-hidden={r === 1 || undefined} style={{ display: 'inline-flex', alignItems: 'center', gap: 48, paddingRight: 48, fontFamily: 'var(--f-display)', fontStretch: '118%', fontWeight: 600, fontSize: 'clamp(26px,3vw,44px)', textTransform: 'uppercase', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
      {b}<span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
    </span>
  )));
  return (
    <section aria-label="Marcas en catálogo" className="sec" style={{ overflow: 'hidden' }}>
      <p className="wrap eyebrow" style={{ margin: '0 auto 28px' }}>Marcas en catálogo</p>
      <div className="marquee-box" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '28px 0', overflow: 'hidden' }}>
        <div ref={el => { motion.refs.marq = el; }} aria-label={brands.join(', ')} style={{ display: 'flex', width: 'max-content', animation: 'jvkMarquee 70s linear infinite', animationPlayState: 'var(--ps, running)' }}>{items}</div>
      </div>
    </section>
  );
}
