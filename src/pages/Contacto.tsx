import { useEffect, useRef, useState } from 'react';
import { EASE as E, intro, useApp, type QuoteItem } from '../lib/app';
import { CONTACT } from '../lib/config';
import { Btn, BtnOutline, PhoneRow, TextLink } from '../components/ui';

const TIPOS = ['Equipamiento', 'Contrapesos', 'Repuestos e insumos', 'Soporte técnico'];
const EMPTY = { nombre: '', empresa: '', email: '', telefono: '', tipo: 'Equipamiento', mensaje: '' };
type Form = typeof EMPTY;
type ErrKey = 'nombre' | 'email' | 'telefono' | 'mensaje' | 'consentimiento';
type Errors = Partial<Record<ErrKey, string>>;
const ERR_KEYS: ErrKey[] = ['nombre', 'email', 'telefono', 'mensaje', 'consentimiento'];

export interface QuoteRequest extends Form { items: QuoteItem[]; website: string; tiempoMs: number }

type QuoteResult =
  | { ok: true; numero?: number }
  | { ok: false; errores: Errors }
  | { ok: false; failed: true };

/** Posts the request to the serverless function in api/cotizacion.ts. */
async function sendQuoteRequest(req: QuoteRequest): Promise<QuoteResult> {
  let res: Response;
  try {
    res = await fetch('/api/cotizacion', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        nombre: req.nombre, empresa: req.empresa, email: req.email, telefono: req.telefono, tipo: req.tipo, mensaje: req.mensaje,
        productos: req.items.map(x => ({ id: x.id, nombre: x.n, cantidad: x.qty })),
        consentimiento: true,
        website: req.website,
        tiempoMs: req.tiempoMs,
      }),
    });
  } catch {
    return { ok: false, failed: true };
  }
  const json = await res.json().catch(() => null);
  if (res.ok && json?.ok) return { ok: true, numero: typeof json.numero === 'number' ? json.numero : undefined };
  if (res.status === 400 && json?.errores && typeof json.errores === 'object') {
    const errores: Errors = {};
    ERR_KEYS.forEach(k => { if (typeof json.errores[k] === 'string') errores[k] = json.errores[k]; });
    if (Object.keys(errores).length) return { ok: false, errores };
  }
  return { ok: false, failed: true };
}

export function Contacto() {
  const { data, quote, setQty, clearQuote, entered, vw, motion } = useApp();
  // Show the current catalog name; the saved one may be from an older catalog.
  const nameOf = (x: QuoteItem) => data?.products.find(p => p.id === x.id)?.n || x.n;
  const I = intro(entered);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<{ email: string; numero?: number } | null>(null);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [failed, setFailed] = useState(false);
  // When the form was shown; the backend treats very fast submissions as bots.
  const shownAt = useRef(Date.now());
  useEffect(() => { if (!sent) shownAt.current = Date.now(); }, [sent]);

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
    if (!consent) err.consentimiento = 'Debes aceptar el uso de tus datos para responder tu solicitud.';
    setErrors(err);
    setFailed(false);
    if (Object.keys(err).length) return;
    setSending(true);
    try {
      const r = await sendQuoteRequest({ ...form, items: quote, website: honeypot, tiempoMs: Date.now() - shownAt.current });
      if (r.ok) {
        setSent({ email: form.email.trim(), numero: r.numero });
        clearQuote();
      } else if ('errores' in r) {
        setErrors(r.errores);
      } else {
        setFailed(true);
      }
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
            <div style={row}><dt style={dt}>WhatsApp y teléfono</dt><dd style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>{CONTACT.phones.map(ph => <PhoneRow key={ph.tel} ph={ph} />)}</dd></div>
            <div style={row}><dt style={dt}>Horario</dt><dd style={{ margin: 0, fontSize: 16, lineHeight: 1.6, paddingTop: 2 }}>{CONTACT.hours.map(h => <span key={h} style={{ display: 'block' }}>{h}</span>)}</dd></div>
          </dl>
        </div>

        <div style={{ background: '#fff', borderRadius: 28, padding: 'clamp(24px,3.5vw,48px)', display: 'flex', flexDirection: 'column', gap: 36, opacity: I.o, transform: I.up, transition: `opacity .9s ${E} .35s, transform 1.1s ${E} .35s` }}>
          {sent ? (
            <div role="status" style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '40px 0', animation: `jvkUp .7s ${E}` }}>
              <span style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--ink)', color: 'var(--gold-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, animation: `jvkBump .6s ${E} .2s both` }}>✓</span>
              <h2 style={{ margin: 0, fontFamily: 'var(--f-display)', fontStretch: '112%', fontWeight: 600, fontSize: 'clamp(28px,3vw,40px)', lineHeight: 1, textTransform: 'uppercase' }}>Recibimos tu solicitud</h2>
              {sent.numero !== undefined && <p className="mono-label" style={{ fontSize: 12 }}>Solicitud N° {sent.numero}</p>}
              <p className="body">Te escribiremos a {sent.email} con la cotización y las fichas técnicas.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Btn href="#/catalogo">Seguir en el catálogo</Btn>
                <BtnOutline onClick={() => { setSent(null); setForm(EMPTY); setErrors({}); setConsent(false); setHoneypot(''); setFailed(false); }}>Nueva consulta</BtnOutline>
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
                      <a href={x.id.startsWith('cp-') ? '#/contrapesos' : '#/producto/' + x.id} style={{ fontSize: 14, lineHeight: 1.35, color: 'var(--ink)', textDecoration: 'none' }}>{nameOf(x)}</a>
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
                  <Field label="Teléfono" err={errors.telefono}><input className="field__input" type="tel" value={form.telefono} onChange={bind('telefono')} aria-invalid={!!errors.telefono} autoComplete="tel" /></Field>
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
                {/* Trap field for bots: hidden from people and assistive tech; must stay empty. */}
                <div aria-hidden="true" style={{ position: 'absolute', left: -9999, top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
                  <label>Sitio web<input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} /></label>
                </div>
                <div className="field">
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, lineHeight: 1.5, color: 'var(--ink-2)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={consent} onChange={e => { setConsent(e.target.checked); setErrors(er => ({ ...er, consentimiento: undefined })); }}
                      aria-invalid={!!errors.consentimiento} required style={{ marginTop: 4, accentColor: 'var(--ink)', flexShrink: 0 }} />
                    <span>Acepto que JVK use mis datos para responder esta solicitud. <a href="#/privacidad" style={{ color: 'var(--ink)' }}>Ver política de privacidad</a></span>
                  </label>
                  {errors.consentimiento && <span role="alert" className="field__err">{errors.consentimiento}</span>}
                </div>
                {failed && (
                  <p role="alert" className="field__err" style={{ margin: 0 }}>
                    No pudimos enviar tu solicitud. Intenta de nuevo o <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>escríbenos por WhatsApp</a>.
                  </p>
                )}
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
