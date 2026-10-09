import { EASE as E, intro, useApp } from '../lib/app';
import { VALUES } from '../lib/catalog';
import { FillWords, ImageSlot } from '../components/ui';

const SECTORS = [
  { t: 'Automotriz', slot: 'emp-automotriz', ph: 'Fotografía: taller automotriz con elevador en uso', d: 'Talleres mecánicos, vulcanizaciones, concesionarios y centros de servicio rápido.' },
  { t: 'Transporte', slot: 'emp-transporte', ph: 'Fotografía: flota de camiones o buses en patio de mantención', d: 'Flotas de carga y pasajeros que necesitan mantención propia, sin detener la operación.' },
  { t: 'Maquinaria', slot: 'emp-maquinaria', ph: 'Fotografía: maquinaria pesada en faena o taller', d: 'Equipos, herramientas e insumos para mantener maquinaria de trabajo pesado.' },
];

const STEPS = [
  { num: '01', t: 'Conversación', d: 'Entendemos el taller: espacio, flujo de trabajo y vehículos que atiende.' },
  { num: '02', t: 'Propuesta', d: 'Cotización formal con fichas técnicas y alternativas cuando corresponde.' },
  { num: '03', t: 'Entrega', d: 'Despacho e instalación coordinados con tu operación.' },
  { num: '04', t: 'Acompañamiento', d: 'Repuestos, insumos, contrapesos y soporte técnico posventa.' },
];

export function Empresa() {
  const { entered } = useApp();
  const I = intro(entered);

  return (
    <div data-screen-label="Empresa">
      <section aria-labelledby="h-emp" className="wrap" style={{ paddingTop: 'clamp(28px,4vw,56px)' }}>
        <nav aria-label="Ruta" className="crumbs" style={{ opacity: I.o, transition: `opacity .8s ${E} .3s` }}>
          <a href="#/inicio">Inicio</a><span>/</span><span style={{ color: 'var(--ink)' }}>Empresa</span>
        </nav>
        <h1 id="h-emp" style={{ margin: 'clamp(20px,3vw,36px) 0 0', display: 'flex', flexDirection: 'column', fontFamily: 'var(--f-display)', fontStretch: '112%', fontWeight: 600, fontSize: 'clamp(38px,6vw,98px)', lineHeight: .94, letterSpacing: I.ls, textTransform: 'uppercase', transition: `letter-spacing 1.6s ${E}` }}>
          <span data-drift="-1" className="line-mask"><span style={{ transform: I.line, transition: `transform 1.1s ${E} .05s` }}>Que cada rueda</span></span>
          <span data-drift="1" className="line-mask" style={{ paddingLeft: 'clamp(0px,14vw,260px)' }}><span style={{ color: 'var(--gold-head)', transform: I.line, transition: `transform 1.1s ${E} .17s` }}>gire derecho.</span></span>
        </h1>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 'clamp(28px,4vw,52px) 0 clamp(28px,3.5vw,44px)' }}>
          <p className="lede" style={{ maxWidth: 460, opacity: I.o, transform: I.up, transition: `opacity .9s ${E} .5s, transform 1s ${E} .5s` }}>Maquinarias JVK provee soluciones para el sector automotriz, transporte y maquinaria. Desde el contrapeso que corrige unos gramos de desbalance hasta el elevador que sostiene un camión.</p>
        </div>
        <div style={{ position: 'relative', marginBottom: 56 }}>
          <div style={{ position: 'relative', height: 'clamp(320px,54vh,640px)', borderRadius: 28, overflow: 'hidden', background: 'var(--ph)', clipPath: I.clip, transition: `clip-path 1.5s ${E} .2s` }}>
            <div data-par="0.1" data-ptr="1" style={{ position: 'absolute', left: '-2%', right: '-2%', top: '-9%', bottom: '-9%' }}>
              <div style={{ position: 'absolute', inset: 0, transform: I.scale, transition: `transform 2.2s ${E} .1s` }}>
                <ImageSlot id="emp-hero" placeholder="Fotografía: equipo JVK en bodega o en instalación de un equipo, luz natural" />
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', right: 'clamp(16px,4vw,56px)', bottom: -48, width: 'min(380px,calc(100% - 32px))', pointerEvents: 'none' }}>
            <div className="glass-light" style={{ borderRadius: 22, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 10, opacity: I.o, transform: I.up, transition: `opacity .9s ${E} 1s, transform 1.1s ${E} 1s` }}>
              <span className="mono-label">Sectores que atendemos</span>
              <span style={{ fontFamily: 'var(--f-display)', fontStretch: '110%', fontWeight: 600, fontSize: 20, lineHeight: 1.2, textTransform: 'uppercase', color: 'var(--ink)' }}>Automotriz · Transporte · Maquinaria</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Propósito" className="wrap sec">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 32 }}>
          <p data-reveal="up" className="eyebrow">Nuestro trabajo</p>
          <div style={{ gridColumn: '1/-1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 'clamp(28px,4vw,64px)' }}>
            <p data-fill="1" style={{ margin: 0, fontFamily: 'var(--f-display)', fontStretch: '104%', fontWeight: 500, fontSize: 'clamp(26px,3vw,44px)', lineHeight: 1.12, letterSpacing: '-.015em', textWrap: 'pretty' }}>
              <FillWords text="Elegir bien, explicar con claridad y seguir disponibles cuando el equipo ya está funcionando." />
            </p>
            <div data-reveal="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: 17, lineHeight: 1.65, color: 'var(--ink-2)' }}>
              <p style={{ margin: 0, textWrap: 'pretty' }}>Un taller no compra un elevador o una balanceadora todos los meses. Cuando lo hace, necesita saber que el equipo calza con su espacio, su flujo de trabajo y los vehículos que atiende.</p>
              <p style={{ margin: 0, textWrap: 'pretty' }}>Por eso cada cotización de JVK incluye la ficha técnica, alternativas cuando corresponde y una conversación previa. Y después de la venta, seguimos ahí para repuestos, insumos y contrapesos.</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="h-val2" className="wrap sec">
        <h2 data-reveal="up" id="h-val2" className="eyebrow" style={{ fontWeight: 400, marginBottom: 'clamp(32px,4vw,56px)' }}>Valores</h2>
        {VALUES.map(v => (
          <div key={v.num} data-reveal="up" className="value-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap: '16px clamp(28px,4vw,64px)', padding: 'clamp(28px,3vw,40px) 0', borderTop: '1px solid var(--ink)', alignItems: 'baseline' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'baseline', gap: 18, fontFamily: 'var(--f-display)', fontStretch: '116%', fontWeight: 600, fontSize: 'clamp(30px,4.6vw,72px)', lineHeight: .95, letterSpacing: 'calc(-.02em + var(--h,0) * .025em)', textTransform: 'uppercase', transition: `letter-spacing .7s ${E}` }}>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 400, letterSpacing: 0, color: 'var(--gold-text)' }}>{v.num}</span>{v.t}
            </h3>
            <p className="body" style={{ maxWidth: 520 }}>{v.d}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="h-sect" className="wrap sec">
        <div className="sec-head">
          <p data-reveal="up" className="eyebrow">Sectores</p>
          <h2 data-reveal="mask" id="h-sect" className="h-section">Automotriz, transporte y maquinaria</h2>
        </div>
        <div data-reveal="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '40px 22px' }}>
          {SECTORS.map(se => (
            <div key={se.slot} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 24, overflow: 'hidden', background: 'var(--ph)' }}>
                <div data-par="0.06" style={{ position: 'absolute', left: 0, right: 0, top: '-9%', bottom: '-9%' }}><ImageSlot id={se.slot} placeholder={se.ph} /></div>
              </div>
              <h3 className="h-card" style={{ fontSize: 24, lineHeight: 'normal' }}>{se.t}</h3>
              <p className="small">{se.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="h-proc" className="wrap sec">
        <div className="sec-head">
          <p data-reveal="up" className="eyebrow">Proceso</p>
          <h2 data-reveal="mask" id="h-proc" className="h-section">De la consulta al soporte</h2>
        </div>
        <ol data-reveal="stagger" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap: '40px 28px' }}>
          {STEPS.map(st => (
            <li key={st.num} style={{ position: 'relative', paddingTop: 30, borderTop: '1px solid rgba(19,33,59,.25)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ position: 'absolute', top: -6, left: 0, width: 11, height: 11, borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 0 5px var(--bg)' }} />
              <span className="num">{st.num}</span>
              <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600 }}>{st.t}</h3>
              <p className="small" style={{ lineHeight: 1.6 }}>{st.d}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
