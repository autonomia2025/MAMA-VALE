import { EASE as E, intro, useApp } from '../lib/app';
import { Btn, BtnOutline, FillWords, Glow, GramRuler, ImageSlot, ProductTile, TextLink, useGridCols } from '../components/ui';

const TYPES = [
  { num: '01', t: 'Adhesivos', slot: 'cp-adhesivo', ph: 'Fotografía: tira de contrapesos adhesivos sobre llanta de aleación',
    d: 'Para llantas de aleación, donde el gancho no corresponde o dañaría la terminación. Tiras segmentadas que se cortan al gramo necesario.',
    specs: [['Segmentos', '5 g / 10 g'], ['Tira', '60 g'], ['Presentación', 'Caja de 100 tiras']],
    quote: ['cp-adhesivo', 'Contrapesos adhesivos — caja 100 tiras'] },
  { num: '02', t: 'De gancho', slot: 'cp-gancho', ph: 'Fotografía: contrapesos de gancho ordenados por gramaje',
    d: 'Para llantas de acero y aleación con pestaña. Fijación mecánica, rápida de instalar en la balanceadora y firme a alta velocidad.',
    specs: [['Gramajes', '5 — 60 g'], ['Llantas', 'Acero / aleación'], ['Presentación', 'Caja de 100 unidades']],
    quote: ['cp-gancho', 'Contrapesos de gancho — caja 100 unidades'] },
  { num: '03', t: 'Línea pesada', slot: 'cp-pesado', ph: 'Fotografía: rueda de camión con contrapesos de alto gramaje',
    d: 'Para camiones, buses y maquinaria. Mayor gramaje por unidad para corregir ruedas de gran diámetro con menos piezas.',
    specs: [['Vehículos', 'Camión / bus'], ['Gramajes', 'Consultar'], ['Presentación', 'Por caja']],
    quote: ['cp-pesado', 'Contrapesos línea pesada'] },
];

const AUDIENCE = [
  ['Vulcanizaciones y talleres', 'Reposición frecuente, cajas surtidas y despacho para no quedar sin stock un sábado.'],
  ['Flotas de transporte', 'Línea pesada para camión y bus, con abastecimiento programado según el plan de mantención.'],
  ['Distribuidores', 'Condiciones para reventa y continuidad de producto en cada formato.'],
];

export function Contrapesos() {
  const { data, addQuote, entered } = useApp();
  const I = intro(entered);
  const gridCols = useGridCols();
  const balTiles = (data?.products || []).filter(p => /balanceadora/i.test(p.n)).slice(0, 4);

  return (
    <div data-screen-label="Contrapesos">
      {/* ---------- hero panel ---------- */}
      <section aria-labelledby="h-cp1" className="wrap" style={{ paddingTop: 'clamp(16px,2.5vw,32px)' }}>
        <div data-dark="1" style={{ position: 'relative', background: 'var(--navy)', borderRadius: 32, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))', color: '#fff' }}>
          <Glow />
          <div style={{ padding: 'clamp(28px,5vw,72px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 56 }}>
            <nav aria-label="Ruta" className="crumbs crumbs--dark" style={{ opacity: I.o, transition: `opacity .8s ${E} .3s` }}>
              <a href="#/inicio">Inicio</a><span>/</span><span style={{ color: '#fff' }}>Contrapesos</span>
            </nav>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p className="eyebrow" style={{ color: 'var(--gold-2)', opacity: I.o, transition: `opacity .8s ${E} .2s` }}>Línea propia JVK</p>
              {/* v4: sized from the column width (container query) so "CONTRAPESOS" always fits on one line. */}
              <h1 id="h-cp1" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 14, containerType: 'inline-size' }}>
                <span className="line-mask" style={{ paddingBottom: '.06em', marginBottom: '-.06em' }}>
                  <span style={{ fontFamily: 'var(--f-display)', fontStretch: '120%', fontWeight: 600, fontSize: 'min(10cqi,108px)', whiteSpace: 'nowrap', lineHeight: .9, letterSpacing: I.ls, textTransform: 'uppercase', transform: I.line, transition: `transform 1.1s ${E} .1s, letter-spacing 1.6s ${E}` }}>Contrapesos</span>
                </span>
                <span style={{ fontSize: 'clamp(20px,2vw,28px)', fontWeight: 400, color: 'var(--soft-2)', opacity: I.o, transform: I.up, transition: `opacity .9s ${E} .4s, transform 1s ${E} .4s` }}>para balanceo de neumáticos</span>
              </h1>
              <p style={{ margin: 0, maxWidth: 480, fontSize: 17, lineHeight: 1.6, color: 'var(--soft)', textWrap: 'pretty', opacity: I.o, transform: I.up, transition: `opacity .9s ${E} .5s, transform 1s ${E} .5s` }}>Adhesivos y de gancho para autos y camionetas, y una línea pesada para camión y bus. Venta por caja para vulcanizaciones, talleres, flotas y distribuidores.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28, opacity: I.o, transition: `opacity .9s ${E} .7s` }}>
              <GramRuler />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 26px', alignItems: 'center' }}>
                <Btn href="#/contacto" gold>Cotizar por caja</Btn>
                <TextLink href="#formatos" light>Ver formatos</TextLink>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', minHeight: 'clamp(380px,46vw,720px)', background: 'var(--navy-panel)', overflow: 'hidden', clipPath: I.cpClip, transition: `clip-path 1.4s ${E} .15s` }}>
            <div data-par="0.08" data-ptr="1" style={{ position: 'absolute', left: '-2%', right: '-2%', top: '-9%', bottom: '-9%' }}>
              <div style={{ position: 'absolute', inset: 0, transform: I.scale, transition: `transform 2.2s ${E} .1s` }}>
                <ImageSlot id="cp-hero" placeholder="Fotografía: contrapesos en primer plano junto a llanta de aleación, fondo oscuro" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- formatos ---------- */}
      <section id="formatos" aria-labelledby="h-formatos" className="wrap sec" style={{ scrollMarginTop: 90 }}>
        <div className="sec-head" style={{ marginBottom: 'clamp(40px,5vw,72px)' }}>
          <p data-reveal="up" className="eyebrow">Formatos</p>
          <h2 data-reveal="mask" id="h-formatos" className="h-section" style={{ maxWidth: 980 }}>Tres formatos, un mismo criterio: el gramo exacto</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {TYPES.map(ct => (
            <article key={ct.num} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 'clamp(28px,4vw,64px)', padding: 'clamp(36px,4vw,56px) 0', borderTop: '1px solid var(--ink)', alignItems: 'start' }}>
              <div data-reveal="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--gold-text)' }}>{ct.num}</span>
                  <h3 style={{ margin: 0, fontFamily: 'var(--f-display)', fontStretch: '115%', fontWeight: 600, fontSize: 'clamp(28px,3.2vw,48px)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-.015em' }}>{ct.t}</h3>
                </div>
                <p className="body" style={{ maxWidth: 520 }}>{ct.d}</p>
                <dl style={{ margin: 0, maxWidth: 520 }}>
                  {ct.specs.map(([k, v]) => (
                    <div key={k} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 16, padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                      <dt style={{ fontSize: 14, color: 'var(--muted)' }}>{k}</dt>
                      <dd style={{ margin: 0, fontFamily: 'var(--f-mono)', fontSize: 13 }}>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div><BtnOutline plus onClick={() => addQuote(ct.quote[0], ct.quote[1])}>Añadir a cotización</BtnOutline></div>
              </div>
              <div data-reveal="img" data-r="24" style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 24, overflow: 'hidden', background: 'var(--ph)' }}>
                <div data-par="0.06" style={{ position: 'absolute', left: 0, right: 0, top: '-9%', bottom: '-9%' }}><ImageSlot id={ct.slot} placeholder={ct.ph} /></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- por qué el gramo ---------- */}
      <section aria-labelledby="h-gramo" className="wrap sec">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>
          <h2 data-fill="1" id="h-gramo" style={{ margin: 0, fontFamily: 'var(--f-display)', fontStretch: '104%', fontWeight: 500, fontSize: 'clamp(30px,3.6vw,54px)', lineHeight: 1.08, letterSpacing: '-.015em', textWrap: 'balance' }}>
            <FillWords text="Unos pocos gramos de diferencia se sienten en el volante." />
          </h2>
          <div data-reveal="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: 'var(--ink-2)', textWrap: 'pretty' }}>Un desbalance pequeño se transmite como vibración, desgaste irregular del neumático y carga extra sobre la suspensión. El contrapeso correcto, bien ubicado, lo corrige en minutos. Por eso cuidamos que cada unidad pese lo que dice.</p>
            <div style={{ borderTop: '1px solid var(--ink)' }}>
              {[['A', 'Vibración en volante y carrocería'], ['B', 'Desgaste irregular del neumático'], ['C', 'Fatiga en rodamientos y suspensión']].map(([k, t]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
                  <span className="num">{k}</span><span style={{ fontSize: 16 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- para quién ---------- */}
      <section aria-labelledby="h-quien" className="wrap sec">
        <div className="sec-head">
          <p data-reveal="up" className="eyebrow">Para quién</p>
          <h2 data-reveal="mask" id="h-quien" className="h-section">Venta por volumen</h2>
        </div>
        <div data-reveal="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: '40px 32px' }}>
          {AUDIENCE.map(([t, d]) => (
            <div key={t} style={{ borderTop: '1px solid var(--ink)', paddingTop: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h3 className="h-card" style={{ lineHeight: 'normal' }}>{t}</h3>
              <p className="small">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- balanceadoras ---------- */}
      <section aria-labelledby="h-bal" className="wrap sec">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, marginBottom: 32 }}>
          <h2 data-reveal="mask" id="h-bal" className="h-sub">Balanceadoras en catálogo</h2>
          <TextLink href="#/catalogo?linea=rueda">Servicio a la rueda</TextLink>
        </div>
        <div data-reveal="stagger" className="grid-tiles" style={{ gridTemplateColumns: gridCols }}>
          {balTiles.map(p => <ProductTile key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  );
}
