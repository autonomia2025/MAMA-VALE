import { EASE as E, intro, useApp } from '../lib/app';

// Texto entregado por JVK. Los [corchetes] los completa la clienta.
const EMAIL = 'contacto@maquinariasjvk.cl';
const SECTIONS: { t: string; p: React.ReactNode }[] = [
  { t: 'Quiénes somos', p: <>Maquinarias JVK ([RAZÓN SOCIAL], RUT [RUT DE LA EMPRESA]) es responsable del tratamiento de los datos personales que entregas en este sitio. Puedes contactarnos en <a href={'mailto:' + EMAIL} style={{ color: 'var(--ink)' }}>{EMAIL}</a>.</> },
  { t: 'Qué datos recopilamos', p: 'Solo los que tú nos entregas al enviar una solicitud de cotización: nombre, correo electrónico, y de forma opcional empresa o taller, teléfono, tipo de consulta, mensaje y los productos que agregaste a tu cotización. También registramos la fecha de envío y datos técnicos básicos del navegador, para prevenir abusos.' },
  { t: 'Para qué los usamos', p: 'Para responder tu solicitud, enviarte la cotización y las fichas técnicas, y hacer seguimiento de esa consulta. No usamos tus datos para enviarte publicidad sin tu autorización ni los vendemos a terceros.' },
  { t: 'Base para usarlos', p: 'Tu consentimiento, que entregas al marcar la casilla del formulario. Puedes retirarlo cuando quieras escribiéndonos.' },
  { t: 'Con quién los compartimos', p: 'Usamos proveedores tecnológicos que procesan los datos por cuenta nuestra y solo para los fines descritos: Vercel (alojamiento del sitio), Supabase (almacenamiento de las solicitudes) y Resend (envío de correos). Sus servidores están fuera de Chile (Brasil y Estados Unidos) y cuentan con medidas de seguridad acordes a la industria.' },
  { t: 'Cuánto tiempo los guardamos', p: 'Mientras dure la gestión de tu solicitud y hasta 2 años después de nuestro último contacto, salvo que la ley exija conservarlos por más tiempo. Luego los eliminamos.' },
  { t: 'Tus derechos', p: <>Puedes pedir acceder a tus datos, corregirlos, eliminarlos, oponerte a su uso o solicitar una copia de ellos, de acuerdo con la legislación chilena de protección de datos personales. Escríbenos a <a href={'mailto:' + EMAIL} style={{ color: 'var(--ink)' }}>{EMAIL}</a> indicando tu nombre y tu solicitud; te responderemos en un plazo máximo de 30 días.</> },
  { t: 'Cookies', p: 'Este sitio no usa cookies publicitarias ni de seguimiento.' },
  { t: 'Seguridad', p: 'Los datos viajan cifrados (HTTPS) y se guardan en una base de datos con acceso restringido.' },
  { t: 'Cambios a esta política', p: 'Si la actualizamos, publicaremos la nueva versión en esta página con su fecha.' },
];

export function Privacidad() {
  const { entered } = useApp();
  const I = intro(entered);

  return (
    <div data-screen-label="Política de privacidad" className="wrap" style={{ paddingTop: 'clamp(28px,4vw,56px)', paddingBottom: 'clamp(80px,10vw,140px)' }}>
      <nav aria-label="Ruta" className="crumbs" style={{ opacity: I.o, transition: `opacity .8s ${E} .3s` }}>
        <a href="#/inicio">Inicio</a><span>/</span><span style={{ color: 'var(--ink)' }}>Política de privacidad</span>
      </nav>
      <h1 style={{ margin: 'clamp(20px,3vw,36px) 0 0', display: 'flex', flexDirection: 'column', fontFamily: 'var(--f-display)', fontStretch: '112%', fontWeight: 600, fontSize: 'clamp(38px,6vw,98px)', lineHeight: .94, letterSpacing: I.ls, textTransform: 'uppercase', transition: `letter-spacing 1.6s ${E}` }}>
        <span className="line-mask"><span style={{ transform: I.line, transition: `transform 1.1s ${E} .05s` }}>Política de</span></span>
        <span className="line-mask"><span style={{ color: 'var(--gold-head)', transform: I.line, transition: `transform 1.1s ${E} .17s` }}>privacidad.</span></span>
      </h1>
      <p className="eyebrow" style={{ marginTop: 'clamp(24px,3vw,36px)', opacity: I.o, transition: `opacity .9s ${E} .45s` }}>Última actualización: noviembre de 2026</p>
      <ol style={{ listStyle: 'none', margin: 'clamp(36px,4vw,56px) 0 0', padding: 0, maxWidth: 760, borderTop: '1px solid var(--ink)', opacity: I.o, transform: I.up, transition: `opacity .9s ${E} .5s, transform 1s ${E} .5s` }}>
        {SECTIONS.map((s, i) => (
          <li key={s.t} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 'clamp(24px,3vw,32px) 0', borderBottom: '1px solid var(--line)' }}>
            <h2 className="h-card">{i + 1}. {s.t}</h2>
            <p className="body">{s.p}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
