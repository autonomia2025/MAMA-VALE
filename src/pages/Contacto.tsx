import { useEffect, useState } from 'react';
import { EASE as E, intro, useApp, type QuoteItem } from '../lib/app';
import { CONTACT } from '../lib/config';
import { Btn, BtnOutline, TextLink } from '../components/ui';

const TIPOS = ['Equipamiento', 'Contrapesos', 'Repuestos e insumos', 'Soporte técnico'];
const EMPTY = { nombre: '', empresa: '', email: '', telefono: '', tipo: 'Equipamiento', mensaje: '' };
type Form = typeof EMPTY;
type Errors = Partial<Record<'nombre' | 'email' | 'mensaje', string>>;

export interface QuoteRequest extends Form { items: QuoteItem[] }

/**
 * Sends a quote request. The design simulates the network call; replace the
 * body with a real endpoint (form service, API route, CRM) when it exists.
 */
async function sendQuoteRequest(_req: QuoteRequest): Promise<void> {
  await new Promise(r => setTimeout(r, 900));
}

export function Contacto() {
  const { quote, setQty, clearQuote, entered, vw, motion } = useApp();
  const I = intro(entered);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<string | null>(null);

  useEffect(() => { requestAnimationFrame(() => { motion.scan(); motion.req(); }); }, [sent, motion]);

  const bind = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    setErrors(er => ({ ...er, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const err: Errors = {};
    if (!form.nombre.trim()) err.nombre = 'Indica tu nombre.';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) err.email = 'Revisa el correo electrónico.';
    if (!form.mensaje.trim() && !quote.length) err.mensaje = 'Cuéntanos qué necesitas o agrega productos a la cotización.';
    setErrors(err);
    if (Object.keys(err).length) return;
    setSending(true);
    try {
      await sendQuoteRequest({ ...form, items: quote });
      setSent(form.email.trim());
      clearQuote();
    } finally {
      setSending(false);
    }
  };

  const quoteCount = quote.reduce((a, x) => a + x.qty, 0);
  const dt = { fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)', paddingTop: 3 } as const;
  const row = { display: 'grid', gridTemplateColumns: 'minmax(0,140px) minmax(0,1fr)', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--line)' } as const;

  return (
    <div data-screen-label="Contacto" className="wrap" style={{ paddingTop: 'clamp(28px,4vw,56px)', paddingBottom: 'clamp(80px,10vw,140px)' }}>
      <nav aria-label="Ruta" className="crumbs" style={{ opacity: I.o, transition: `opacity .8s ${E} .3s` }}>
        <a href="#/inicio">Inicio</a><span>/</span><span style={{ color: 'var(--ink)' }}>Contacto</span>
      </nav>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 'clamp(40px,6vw,96px)', marginTop: 'clamp(20px,3vw,36px)', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(36px,4vw,56px)', position: vw >= 1000 ? 'sticky' : 'static', top: 96 }}>
          <h1 style={{ margin: 0, display: 'flex', flexDirection: 'column', fontFamily: 'var(--f-display)', fontStretch: '112%', fontWeight: 600, fontSize: 'clamp(40px,5.6vw,88px)', lineHeight: .94, letterSpacing: I.ls, textTransform: 'uppercase', transition: `letter-spacing 1.6s ${E}` }}>
            <span className="line-mask"><span style={{ transform: I.line, transition: `transform 1.1s ${E} .05s` }}>Hablemos</span></span>
            <span className="line-mask"><span style={{ color: 'var(--gold-head)', transform: I.line, transition: `transform 1.1s ${E} .17s` }}>de tu taller.</span></span>
          </h1>
          <p className="body" style={{ maxWidth: 440, opacity: I.o, transform: I.up, transition: `opacity .9s ${E} .45s, transform 1s ${E} .45s` }}>Cuéntanos qué necesitas o arma tu lista desde el catálogo. Respondemos con una cotización formal y las fichas técnicas de cada equipo.</p>
          <dl style={{ margin: 0, borderTop: '1px solid var(--ink)', maxWidth: 520, opacity: I.o, transition: `opacity .9s ${E} .6s` }}>
            <div style={row}><dt style={dt}>Correo</dt><dd style={{ margin: 0 }}><TextLink href={'mailto:' + CONTACT.email} plain arrow={false}>{CONTACT.email}</TextLink></dd></div>
            <div style={row}><dt style={dt}>Teléfono</dt><dd style={{ margin: 0 }}><TextLink href={CONTACT.phoneHref} plain arrow={false}>{CONTACT.phone}</TextLink></dd></div>
            <div style={row}><dt style={dt}>WhatsApp</dt><dd style={{ margin: 0 }}><TextLink href={CONTACT.whatsapp} plain external>Escribir ahora</TextLink></dd></div>
            <div style={row}><dt style={dt}>Horario</dt><dd style={{ margin: 0, fontSize: 16 }}>{CONTACT.hours}</dd></div>
          </dl>
        </div>

        <div style={{ background: '#fff', borderRadius: 28, padding: 'clamp(24px,3.5vw,48px)', display: 'flex', flexDirection: 'column', gap: 36, opacity: I.o, transform: I.up, transition: `opacity .9s ${E} .35s, transform 1.1s ${E} .35s` }}>
          {sent ? (
            <div role="status" style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '40px 0', animation: `jvkUp .7s ${E}` }}>
              <span style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--ink)', color: 'var(--gold-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, animation: `jvkBump .6s ${E} .2s both` }}>✓</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--f-display)', fontStretch: '112%', fontWeight: 600, fontSize: 'clamp(28px,3vw,40px)', lineHeight: 1, textTransform: 'uppercase' }}>Recibimos tu solicitud</h2>
              <p className="body">Te escribiremos a {sent} con la cotización y las fichas técnicas.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Btn href="#/catalogo">Seguir en el catálogo</Btn>
                <BtnOutline onClick={() => { setSent(null); setForm(EMPTY); setErrors({}); }}>Nueva consulta</BtnOutline>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
                  <h2 className="h-card" style={{ lineHeight: 'normal' }}>Tu cotización</h2>
                  <span aria-live="polite" style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--muted)' }}>{quoteCount} ítems</span>
                </div>
                {quote.length === 0 && (
                  <p style={{ margin: 0, padding: '18px 20px', borderRadius: 16, background: 'var(--bg)', fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)' }}>
                    Aún no agregas productos. Puedes armar tu lista desde el <a href="#/catalogo" style={{ color: 'var(--ink)' }}>catálogo</a> o describir lo que necesitas abajo.
                  </p>
                )}
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid var(--line)' }}>
                  {quote.map(x => (
                    <li key={x.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto auto', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--line)', animation: `jvkUp .5s ${E}` }}>
                      <a href={x.id.startsWith('cp-') ? '#/contrapesos' : '#/producto/' + x.id} style={{ fontSize: 14, lineHeight: 1.35, color: 'var(--ink)', textDecoration: 'none' }}>{x.n}</a>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 2, border: '1px solid var(--line)', borderRadius: 999 }}>
                        <button className="qty-btn" onClick={() => setQty(x.id, -1)} aria-label="Restar">−</button>
                        <span style={{ minWidth: 22, textAlign: 'center', fontFamily: 'var(--f-mono)', fontSize: 13 }}>{x.qty}</span>
                        <button className="qty-btn" onClick={() => setQty(x.id, 1)} aria-label="Sumar">+</button>
                      </div>
                      <button className="qty-btn qty-btn--x" onClick={() => setQty(x.id, -x.qty)} aria-label="Quitar">×</button>
                    </li>
                  ))}
                </ul>
              </div>
              <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: '26px 24px' }}>
                  <Field label="Nombre *" err={errors.nombre}><input className="field__input" value={form.nombre} onChange={bind('nombre')} aria-invalid={!!errors.nombre} autoComplete="name" /></Field>
                  <Field label="Empresa o taller"><input className="field__input" value={form.empresa} onChange={bind('empresa')} autoComplete="organization" /></Field>
                  <Field label="Correo *" err={errors.email}><input className="field__input" type="email" value={form.email} onChange={bind('email')} aria-invalid={!!errors.email} autoComplete="email" /></Field>
                  <Field label="Teléfono"><input className="field__input" type="tel" value={form.telefono} onChange={bind('telefono')} autoComplete="tel" /></Field>
                </div>
                <fieldset style={{ border: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <legend className="mono-label" style={{ padding: 0, marginBottom: 12 }}>Tipo de consulta</legend>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {TIPOS.map(t => (
                      <button key={t} type="button" className="pill pill--form" aria-pressed={form.tipo === t} onClick={() => setForm(f => ({ ...f, tipo: t }))}>{t}</button>
                    ))}
                  </div>
                </fieldset>
                <Field label="Mensaje" err={errors.mensaje}>
                  <textarea className="field__input" value={form.mensaje} onChange={bind('mensaje')} rows={4} placeholder="Vehículos que atiendes, espacio disponible, plazos…" />
                </Field>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>* Campos obligatorios</span>
                  <Btn type="submit" disabled={sending}><span>{sending ? 'Enviando…' : 'Enviar solicitud'}</span></Btn>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, err, children }: { label: string; err?: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {children}
      {err && <span role="alert" className="field__err">{err}</span>}
    </label>
  );
}
