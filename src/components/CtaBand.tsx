import { CONTACT } from '../lib/config';
import { Btn, TextLink } from './ui';

/** Closing call to action shown on every page except Contacto. */
export function CtaBand() {
  return (
    <section aria-labelledby="h-cta" className="wrap sec" style={{ paddingBottom: 'clamp(80px,10vw,140px)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px 64px', paddingTop: 'clamp(32px,4vw,56px)', borderTop: '1px solid var(--ink)' }}>
        <h2 data-reveal="mask" id="h-cta" style={{ margin: 0, flex: '1 1 560px', fontFamily: 'var(--f-display)', fontStretch: '114%', fontWeight: 600, fontSize: 'clamp(36px,5.4vw,88px)', lineHeight: .94, letterSpacing: '-.02em', textTransform: 'uppercase', textWrap: 'balance' }}>Cuéntanos qué necesita tu taller</h2>
        <div data-reveal="up" style={{ flex: '0 1 380px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <p className="body">Te respondemos con una cotización clara y la ficha técnica de cada equipo.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 26px', alignItems: 'center' }}>
            <Btn href="#/contacto">Solicitar cotización</Btn>
            <TextLink href={CONTACT.whatsapp} external>WhatsApp</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
