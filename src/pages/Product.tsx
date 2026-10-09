import { useRef, useState } from 'react';
import { EASE as E, intro, useApp } from '../lib/app';
import { fmtCLP } from '../lib/catalog';
import { SETTINGS } from '../lib/config';
import { Btn, BtnOutline, ProductTile, TextLink, useGridCols } from '../components/ui';

export function ProductPage() {
  const { data, route, quote, addQuote, mob, entered, motion } = useApp();
  const I = intro(entered);
  const gridCols = useGridCols();
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgFailed, setImgFailed] = useState<string | null>(null);

  if (!data) return <div className="wrap" style={{ minHeight: '60vh' }} />;
  const pr = data.products.find(p => p.id === route.pid);
  if (!pr) {
    return (
      <div data-screen-label="Producto" className="wrap" style={{ paddingTop: 'clamp(28px,4vw,56px)' }}>
        <div style={{ padding: '120px 0', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
          <h1 style={{ margin: 0, fontFamily: 'var(--f-display)', fontStretch: '112%', fontWeight: 600, fontSize: 40, textTransform: 'uppercase' }}>Producto no encontrado</h1>
          <TextLink href="#/catalogo">Volver al catálogo</TextLink>
        </div>
      </div>
    );
  }

  const line = data.lines.find(l => l.k === pr.l)?.t || '';
  const lineHref = '#/catalogo?linea=' + pr.l;
  const priced = !!pr.p && SETTINGS.showPrices;
  const price = priced ? fmtCLP(pr.p) : 'Precio a cotizar';
  const inQ = quote.find(x => x.id === pr.id);
  const addLabel = inQ ? 'En tu cotización · ' + inQ.qty : 'Añadir a cotización';
  const add = () => addQuote(pr.id, pr.n);
  const specs = pr.s || [];
  const related = data.products.filter(p => p.l === pr.l && p.id !== pr.id).slice(0, 4);

  // Zoom follows the pointer on desktop.
  const zoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current; if (!img || mob || motion.rm) return;
    const r = e.currentTarget.getBoundingClientRect();
    img.style.transformOrigin = `${((e.clientX - r.left) / r.width * 100).toFixed(1)}% ${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`;
    img.style.transform = 'scale(1.75)';
  };
  const zoomOut = () => { if (imgRef.current) imgRef.current.style.transform = 'scale(1)'; };

  return (
    <div data-screen-label="Producto" className="wrap" style={{ paddingTop: 'clamp(28px,4vw,56px)' }}>
      <nav aria-label="Ruta" className="crumbs"><a href="#/catalogo">← Catálogo</a><span>/</span><a href={lineHref}>{line}</a></nav>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap: 'clamp(32px,5vw,80px)', marginTop: 'clamp(20px,3vw,36px)', alignItems: 'start' }}>
        <div onMouseMove={zoomMove} onMouseLeave={zoomOut} style={{ position: 'relative', aspectRatio: '1/1', background: '#fff', borderRadius: 28, overflow: 'hidden', cursor: 'zoom-in', clipPath: I.clip, transition: `clip-path 1.3s ${E}` }}>
          {pr.i && (
            <img key={pr.id} ref={imgRef} src={pr.i} alt={pr.n} onError={() => setImgFailed(pr.id)}
              style={{ position: 'absolute', inset: '10%', width: '80%', height: '80%', objectFit: 'contain', transition: `transform .6s ${E}`, animation: `jvkImgIn .9s ${E}`, visibility: imgFailed === pr.id ? 'hidden' : undefined }} />
          )}
          <span className="glass-light" style={{ position: 'absolute', left: 18, top: 18, display: 'inline-flex', alignItems: 'center', height: 36, padding: '0 14px', borderRadius: 999, fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink)', pointerEvents: 'none' }}>Ref. {pr.id}</span>
          {!mob && <span className="glass-light" style={{ position: 'absolute', right: 18, bottom: 18, display: 'inline-flex', alignItems: 'center', height: 36, padding: '0 14px', borderRadius: 999, fontSize: 12, color: 'var(--muted)', pointerEvents: 'none' }}>Pasa el cursor para ampliar</span>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, position: 'sticky', top: 96, opacity: I.o, transform: I.up, transition: `opacity .9s ${E} .25s, transform 1s ${E} .25s` }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="eyebrow" style={{ color: 'var(--gold-text)' }}>{pr.b || 'JVK'}</span>
            <h1 style={{ margin: 0, fontFamily: 'var(--f-display)', fontStretch: '106%', fontWeight: 600, fontSize: 'clamp(28px,3vw,44px)', lineHeight: 1.04, letterSpacing: '-.015em', textWrap: 'balance' }}>{pr.n}</h1>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--ink-2)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3E8E5B', boxShadow: '0 0 0 4px rgba(62,142,91,.14)' }} />{pr.a || 'Consultar disponibilidad'}
            </span>
          </div>
          <div style={{ borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--line)', padding: '22px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 'clamp(24px,2.4vw,32px)', fontWeight: 500 }}>{price}</span>
            <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--muted)' }}>{priced ? 'Precio publicado en CLP. Confirmamos disponibilidad, despacho e instalación al cotizar.' : 'El valor depende de configuración, despacho e instalación. Te enviamos una cotización formal.'}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Btn plus onClick={add}><span aria-live="polite">{addLabel}</span></Btn>
            <BtnOutline href="#/contacto">Hablar con un asesor</BtnOutline>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, color: 'var(--ink-2)' }}>
            {['Asesoría técnica antes de la compra', 'Despacho e instalación coordinados', 'Repuestos y soporte posventa'].map(t => (
              <li key={t} style={{ display: 'flex', gap: 12 }}><span style={{ color: 'var(--gold-text)', fontFamily: 'var(--f-mono)' }}>→</span>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 'clamp(40px,5vw,80px)', paddingTop: 'clamp(80px,10vw,140px)' }}>
        <div data-reveal="up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h2 className="eyebrow" style={{ fontWeight: 400 }}>Descripción</h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: 'var(--ink-2)', textWrap: 'pretty' }}>{pr.d || 'Solicita la ficha técnica completa a nuestro equipo.'}</p>
        </div>
        {specs.length > 0 && (
          <div data-reveal="up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 className="eyebrow" style={{ fontWeight: 400 }}>Especificaciones</h2>
            <dl style={{ margin: 0, borderTop: '1px solid var(--ink)' }}>
              {specs.map(([k, v], i) => (
                <div key={i} className="spec-row">
                  <dt style={{ fontSize: 14, color: 'var(--muted)' }}>{k}</dt>
                  <dd style={{ margin: 0, fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--ink)', textAlign: 'right' }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      <section aria-labelledby="h-rel" style={{ paddingTop: 'clamp(80px,10vw,140px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, marginBottom: 32 }}>
          <h2 data-reveal="mask" id="h-rel" className="h-sub">Más en {line}</h2>
          <TextLink href={lineHref}>Ver la línea</TextLink>
        </div>
        <div data-reveal="stagger" className="grid-tiles" style={{ gridTemplateColumns: gridCols }}>
          {related.map(p => <ProductTile key={p.id} p={p} />)}
        </div>
      </section>

      {mob && (
        <div className="glass-light" style={{ position: 'fixed', left: 12, right: 12, bottom: 12, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 10px 10px 18px', borderRadius: 22, animation: `jvkUp .6s ${E}` }}>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 14, fontWeight: 500, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{price}</span>
          <button onClick={add} className="bar-btn">{addLabel}</button>
        </div>
      )}
    </div>
  );
}
