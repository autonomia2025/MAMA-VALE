import { useApp } from '../lib/app';
import { CONTACT } from '../lib/config';

const SITE: [string, string][] = [['inicio', 'Inicio'], ['contrapesos', 'Contrapesos'], ['catalogo', 'Catálogo'], ['empresa', 'Empresa'], ['contacto', 'Contacto']];
const colHead = { fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: '#8C9AB5', marginBottom: 6 } as const;
const col = { display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' } as const;

export function Footer() {
  const { data, motion } = useApp();
  const lines = data ? data.lines : [];
  return (
    <footer data-dark="1" style={{ background: 'var(--navy-deep)', color: 'var(--soft-2)', overflow: 'hidden', marginTop: 'calc(-1 * clamp(24px,3vw,40px))', paddingTop: 'clamp(24px,3vw,40px)' }}>
      <div className="wrap" style={{ paddingTop: 'clamp(64px,8vw,112px)' }}>
        <div data-reveal="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: '48px 32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <img src="/assets/jvk-logo-white.png" alt="Maquinarias JVK" style={{ height: 40, width: 'auto', alignSelf: 'flex-start' }} />
            <p style={{ margin: 0, maxWidth: 280, fontSize: 15, lineHeight: 1.6, color: 'var(--soft)' }}>Soluciones para el sector automotriz, transporte y maquinaria.</p>
          </div>
          <nav aria-label="Pie de página" style={col}>
            <span style={colHead}>Sitio</span>
            {SITE.map(([k, t]) => <a key={k} href={'#/' + k} className="flink">{t}</a>)}
          </nav>
          <div style={col}>
            <span style={colHead}>Líneas</span>
            {lines.map(l => <a key={l.k} href={'#/catalogo?linea=' + l.k} className="flink">{l.t}</a>)}
          </div>
          <div style={col}>
            <span style={colHead}>Contacto</span>
            <a href={'mailto:' + CONTACT.email} className="flink">{CONTACT.email}</a>
            <a href={CONTACT.phoneHref} className="flink">{CONTACT.phone}</a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="flink">WhatsApp</a>
            <span style={{ fontSize: 15, color: 'var(--soft)' }}>{CONTACT.hours}</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginTop: 'clamp(56px,7vw,96px)', padding: '22px 0', borderTop: '1px solid var(--foot-line)', fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: '#8C9AB5' }}>
          <span>© 2026 Maquinarias JVK</span>
          <span>Calidad · Precisión · Confianza · Relaciones de largo plazo</span>
          <button className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: motion.rm ? 'auto' : 'smooth' })}>
            Volver arriba <span aria-hidden="true" className="to-top__arrow">↑</span>
          </button>
        </div>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div data-par="-0.14" aria-hidden="true" style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontStretch: '125%', fontWeight: 800, fontSize: 'clamp(140px,31vw,500px)', lineHeight: .74, letterSpacing: '-.05em', color: '#14223D', textAlign: 'center', marginBottom: '-.06em', userSelect: 'none' }}>JVK</div>
      </div>
    </footer>
  );
}
