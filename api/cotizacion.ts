// Función serverless de Vercel: recibe el formulario de cotización,
// lo valida, lo guarda en Supabase y avisa por correo con Resend.
//
// Va en la carpeta /api en la raíz del proyecto (al lado de /src).
// Responde en la ruta  POST /api/cotizacion
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   SUPABASE_URL               https://xxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY  clave "service_role" (NUNCA con prefijo VITE_, NUNCA en el front)
//   RESEND_API_KEY             clave de Resend
//   MAIL_TO                    correo(s) que reciben las cotizaciones, separados por coma
//   MAIL_FROM                  remitente, ej: "Maquinarias JVK <cotizaciones@tudominio.cl>"
//   TURNSTILE_SECRET_KEY       (opcional) activa la verificación anti-bots de Cloudflare

// Declaraciones mínimas para no depender de @types/node ni de @vercel/node.
declare const process: any;
declare const fetch: any;
declare const URLSearchParams: any;
declare const console: any;

const LIMITES = {
  nombre: 100,
  empresa: 120,
  email: 254,
  telefono: 20,
  mensaje: 2000,
  productoNombre: 200,
  productoId: 60,
  maxProductos: 50,
};

export const TIPOS_CONSULTA = ['Equipamiento', 'Contrapesos', 'Repuestos e insumos', 'Soporte técnico'];

// ---------- utilidades ----------

function limpiar(valor: any, max: number): string {
  if (typeof valor !== 'string') return '';
  // quita caracteres de control (incluye saltos de línea) y recorta
  return valor.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max);
}

function limpiarMultilinea(valor: any, max: number): string {
  if (typeof valor !== 'string') return '';
  // conserva saltos de línea (\n = \u000A) y tabulaciones, quita el resto de caracteres de control
  return valor
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);
}

export function escaparHtml(texto: any): string {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function emailValido(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// RUT chileno con dígito verificador (módulo 11). Acepta 12.345.678-5 o 123456785.
export function rutValido(rut: string): boolean {
  const limpio = rut.replace(/[.\-\s]/g, '').toUpperCase();
  if (!/^\d{7,8}[\dK]$/.test(limpio)) return false;
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  let suma = 0;
  let factor = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const resto = 11 - (suma % 11);
  const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);
  return dv === esperado;
}

export function formatearRut(rut: string): string {
  const limpio = rut.replace(/[.\-\s]/g, '').toUpperCase();
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  return cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
}

// ---------- validación ----------

export function validar(body: any): { errores: Record<string, string>; datos: any } {
  const errores: Record<string, string> = {};
  const datos: any = {};

  datos.nombre = limpiar(body.nombre, LIMITES.nombre);
  if (datos.nombre.length < 2) errores.nombre = 'Escribe tu nombre.';

  datos.empresa = limpiar(body.empresa, LIMITES.empresa);

  datos.email = limpiar(body.email, LIMITES.email).toLowerCase();
  if (!emailValido(datos.email)) errores.email = 'Escribe un correo válido.';

  datos.telefono = limpiar(body.telefono, LIMITES.telefono);
  if (datos.telefono) {
    const digitos = datos.telefono.replace(/\D/g, '');
    if (digitos.length < 8 || digitos.length > 15) {
      errores.telefono = 'Escribe un teléfono válido.';
    }
  }

  datos.rut = limpiar(body.rut, 15);
  if (datos.rut) {
    if (rutValido(datos.rut)) datos.rut = formatearRut(datos.rut);
    else errores.rut = 'El RUT no es válido.';
  }

  datos.mensaje = limpiarMultilinea(body.mensaje, LIMITES.mensaje);

  // Tipo de consulta (botones del formulario). Valor desconocido → se ignora.
  const tipo = limpiar(body.tipo, 40);
  datos.tipo = TIPOS_CONSULTA.includes(tipo) ? tipo : '';

  datos.productos = [] as Array<{ id: string; nombre: string; cantidad: number }>;
  if (Array.isArray(body.productos)) {
    for (const p of body.productos.slice(0, LIMITES.maxProductos)) {
      if (!p || typeof p !== 'object') continue;
      const nombre = limpiar(p.nombre, LIMITES.productoNombre);
      if (!nombre) continue;
      const cantidad = Math.min(999, Math.max(1, parseInt(p.cantidad, 10) || 1));
      datos.productos.push({
        id: limpiar(String(p.id ?? ''), LIMITES.productoId),
        nombre,
        cantidad,
      });
    }
  }

  if (!datos.mensaje && datos.productos.length === 0) {
    errores.mensaje = 'Cuéntanos qué necesitas o agrega productos a tu cotización.';
  }

  datos.consentimiento = body.consentimiento === true;
  if (!datos.consentimiento) {
    errores.consentimiento = 'Debes aceptar el uso de tus datos para responder tu solicitud.';
  }

  return { errores, datos };
}

// ---------- servicios externos ----------

async function verificarTurnstile(token: any, ip?: string): Promise<boolean> {
  const secreto = process.env.TURNSTILE_SECRET_KEY;
  if (!secreto) return true; // protección desactivada
  if (!token || typeof token !== 'string') return false;
  try {
    const params = new URLSearchParams({ secret: secreto, response: token });
    if (ip) params.set('remoteip', ip);
    const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: params,
    });
    const json = await resp.json();
    return json.success === true;
  } catch (e: any) {
    console.error('turnstile_error', e && e.message);
    return false;
  }
}

async function guardarEnSupabase(datos: any, userAgent: any): Promise<any> {
  const url = process.env.SUPABASE_URL;
  const clave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !clave) throw new Error('Faltan variables de Supabase');

  const resp = await fetch(`${String(url).replace(/\/$/, '')}/rest/v1/solicitudes`, {
    method: 'POST',
    headers: {
      apikey: clave,
      // Clave antigua "service_role" (JWT, empieza con eyJ): va también como Bearer.
      // Clave nueva "secret" (sb_secret_...): solo en apikey, no es un JWT.
      ...(String(clave).startsWith('eyJ') ? { authorization: `Bearer ${clave}` } : {}),
      'content-type': 'application/json',
      prefer: 'return=representation',
    },
    body: JSON.stringify({
      nombre: datos.nombre,
      empresa: datos.empresa || null,
      rut: datos.rut || null,
      email: datos.email,
      telefono: datos.telefono || null,
      tipo: datos.tipo || null,
      mensaje: datos.mensaje || null,
      productos: datos.productos,
      consentimiento: datos.consentimiento,
      origen: 'web',
      user_agent: limpiar(userAgent || '', 300) || null,
    }),
  });

  if (!resp.ok) {
    throw new Error(`Supabase respondió ${resp.status}`);
  }
  const filas = await resp.json();
  return Array.isArray(filas) ? filas[0] : filas;
}

export function armarCorreo(datos: any, fila: any): { asunto: string; html: string } {
  const numero = fila && fila.numero ? `#${fila.numero}` : '';
  const lineasProductos = datos.productos.length
    ? `<ul>${datos.productos
        .map((p: any) => `<li>${escaparHtml(p.cantidad)} × ${escaparHtml(p.nombre)}</li>`)
        .join('')}</ul>`
    : '<p><em>Sin productos seleccionados.</em></p>';

  const filaTabla = (etiqueta: string, valor: string) =>
    valor
      ? `<tr><td style="padding:4px 12px 4px 0;color:#666">${etiqueta}</td><td style="padding:4px 0"><strong>${escaparHtml(
          valor
        )}</strong></td></tr>`
      : '';

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#111;max-width:560px">
      <h2 style="margin:0 0 12px">Nueva solicitud de cotización ${escaparHtml(numero)}</h2>
      <table style="border-collapse:collapse">
        ${filaTabla('Nombre', datos.nombre)}
        ${filaTabla('Empresa', datos.empresa)}
        ${filaTabla('RUT', datos.rut)}
        ${filaTabla('Correo', datos.email)}
        ${filaTabla('Teléfono', datos.telefono)}
        ${filaTabla('Tipo de consulta', datos.tipo)}
      </table>
      <h3 style="margin:18px 0 6px">Productos</h3>
      ${lineasProductos}
      <h3 style="margin:18px 0 6px">Mensaje</h3>
      <p style="white-space:pre-wrap;margin:0">${escaparHtml(datos.mensaje || '—')}</p>
      <p style="color:#888;font-size:12px;margin-top:24px">Puedes responder directamente a este correo para contestarle al cliente.</p>
    </div>`;

  const asunto = `Nueva cotización ${numero} — ${datos.nombre}${datos.empresa ? ' (' + datos.empresa + ')' : ''}`
    .replace(/[\r\n]+/g, ' ')
    .slice(0, 200);

  return { asunto, html };
}

async function enviarCorreo(datos: any, fila: any): Promise<void> {
  const clave = process.env.RESEND_API_KEY;
  const para = String(process.env.MAIL_TO || '')
    .split(',')
    .map((s: string) => s.trim())
    .filter(Boolean);
  const de = process.env.MAIL_FROM;
  if (!clave || para.length === 0 || !de) throw new Error('Faltan variables de correo');

  const { asunto, html } = armarCorreo(datos, fila);
  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${clave}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: de, to: para, reply_to: datos.email, subject: asunto, html }),
  });
  if (!resp.ok) throw new Error(`Resend respondió ${resp.status}`);
}

// ---------- handler ----------

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Método no permitido' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ ok: false, error: 'Formato inválido' });
    }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ ok: false, error: 'Formato inválido' });
  }

  // Anti-spam silencioso: campo trampa lleno o envío demasiado rápido.
  // Se responde "ok" para no darle pistas al bot, pero no se guarda nada.
  const tiempoMs = Number(body.tiempoMs);
  const trampa = typeof body.website === 'string' && body.website.trim() !== '';
  const muyRapido = Number.isFinite(tiempoMs) && tiempoMs < 2500;
  if (trampa || muyRapido) {
    return res.status(200).json({ ok: true });
  }

  const ip = String((req.headers && req.headers['x-forwarded-for']) || '').split(',')[0].trim() || undefined;
  const humano = await verificarTurnstile(body.turnstileToken, ip);
  if (!humano) {
    return res.status(400).json({ ok: false, error: 'No pudimos verificar que eres una persona. Intenta de nuevo.' });
  }

  const { errores, datos } = validar(body);
  if (Object.keys(errores).length > 0) {
    return res.status(400).json({ ok: false, errores });
  }

  let fila: any;
  try {
    fila = await guardarEnSupabase(datos, req.headers && req.headers['user-agent']);
  } catch (e: any) {
    console.error('supabase_error', e && e.message);
    return res.status(500).json({
      ok: false,
      error: 'No pudimos registrar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.',
    });
  }

  // Si el correo falla, la solicitud igual quedó guardada: no se le muestra error al cliente.
  try {
    await enviarCorreo(datos, fila);
  } catch (e: any) {
    console.error('correo_error', e && e.message);
  }

  return res.status(200).json({ ok: true, numero: fila && fila.numero ? fila.numero : undefined });
}
