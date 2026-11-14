// Pruebas de la función /api/cotizacion con Supabase, Resend y Turnstile simulados.
// Ejecutar:  node --test tests/*.test.mjs

import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import handler, { rutValido, formatearRut, validar, armarCorreo, escaparHtml } from '../api/cotizacion.ts';

let llamadas;
let comportamiento;

function respuestaFetch(status, json) {
  return { ok: status >= 200 && status < 300, status, json: async () => json };
}

beforeEach(() => {
  llamadas = [];
  comportamiento = { supabase: 201, resend: 200, turnstile: true };
  process.env.SUPABASE_URL = 'https://demo.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-key';
  process.env.RESEND_API_KEY = 're_demo';
  process.env.MAIL_TO = 'ventas@jvk.cl, jefe@jvk.cl';
  process.env.MAIL_FROM = 'Maquinarias JVK <cotizaciones@jvk.cl>';
  delete process.env.TURNSTILE_SECRET_KEY;

  globalThis.fetch = async (url, opts) => {
    llamadas.push({ url: String(url), opts });
    if (String(url).includes('supabase.co')) {
      if (comportamiento.supabase >= 400) return respuestaFetch(comportamiento.supabase, {});
      return respuestaFetch(201, [{ id: 'uuid-1', numero: 42 }]);
    }
    if (String(url).includes('resend.com')) return respuestaFetch(comportamiento.resend, {});
    if (String(url).includes('turnstile')) return respuestaFetch(200, { success: comportamiento.turnstile });
    throw new Error('URL inesperada: ' + url);
  };
});

function crearRes() {
  const res = {
    statusCode: 200,
    body: undefined,
    headers: {},
    setHeader(k, v) { this.headers[k] = v; },
    status(c) { this.statusCode = c; return this; },
    json(b) { this.body = b; return this; },
  };
  return res;
}

const bodyValido = () => ({
  nombre: 'Juan Pérez',
  empresa: 'Taller Los Andes',
  rut: '12.345.678-5',
  email: 'Juan@Taller.cl',
  telefono: '+56 9 8765 4321',
  mensaje: 'Necesito cotizar dos elevadores.',
  productos: [
    { id: 'a1', nombre: 'Elevador de 2 columnas bajo KAJOVA TLT240SB – 4 toneladas', cantidad: 2 },
  ],
  consentimiento: true,
  website: '',
  tiempoMs: 12000,
});

const post = (body, headers = {}) => ({ method: 'POST', body, headers: { 'user-agent': 'test', ...headers } });

// ---------- RUT ----------

test('RUT: acepta válidos y rechaza inválidos', () => {
  assert.equal(rutValido('12.345.678-5'), true);
  assert.equal(rutValido('123456785'), true);
  assert.equal(rutValido('11.111.111-1'), true);
  assert.equal(rutValido('12.345.678-9'), false);
  assert.equal(rutValido('abc'), false);
  assert.equal(rutValido('1-9'), false);
  assert.equal(formatearRut('123456785'), '12.345.678-5');
});

test('RUT: dígito verificador K y 0 se calculan bien', () => {
  // Cálculo independiente del módulo 11 (otra implementación, escrita aparte).
  const dvEsperado = (cuerpo) => {
    const pesos = [2, 3, 4, 5, 6, 7];
    const digitos = String(cuerpo).split('').reverse().map(Number);
    const suma = digitos.reduce((acc, d, i) => acc + d * pesos[i % 6], 0);
    const dv = 11 - (suma % 11);
    return dv === 11 ? '0' : dv === 10 ? 'K' : String(dv);
  };

  let conK = null;
  let conCero = null;
  for (let n = 10000000; n < 10000200 && (!conK || !conCero); n++) {
    const dv = dvEsperado(n);
    if (dv === 'K' && !conK) conK = `${n}${dv}`;
    if (dv === '0' && !conCero) conCero = `${n}${dv}`;
  }
  assert.ok(conK && conCero, 'se encontraron ejemplos con K y con 0');
  assert.equal(rutValido(conK), true, `RUT ${conK} debería ser válido`);
  assert.equal(rutValido(conK.toLowerCase()), true, 'la k minúscula también');
  assert.equal(rutValido(conCero), true, `RUT ${conCero} debería ser válido`);

  // Cambiando el dígito verificador debe fallar.
  assert.equal(rutValido(conK.slice(0, -1) + '1'), false);
  assert.equal(rutValido(conCero.slice(0, -1) + 'K'), false);

  // Y una muestra amplia: todos los RUT generados con el cálculo independiente son válidos.
  for (let n = 5000000; n < 5000500; n++) {
    assert.equal(rutValido(`${n}${dvEsperado(n)}`), true);
  }
});

// ---------- flujo feliz ----------

test('solicitud válida: guarda en Supabase y envía correo', async () => {
  const res = crearRes();
  await handler(post(bodyValido()), res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true, numero: 42 });
  assert.equal(llamadas.length, 2);

  const sb = llamadas[0];
  assert.match(sb.url, /demo\.supabase\.co\/rest\/v1\/solicitudes$/);
  assert.equal(sb.opts.headers.apikey, 'service-key');
  assert.equal(sb.opts.headers.authorization, undefined);
  const fila = JSON.parse(sb.opts.body);
  assert.equal(fila.email, 'juan@taller.cl'); // en minúsculas
  assert.equal(fila.rut, '12.345.678-5');
  assert.equal(fila.productos[0].cantidad, 2);
  assert.equal(fila.consentimiento, true);

  const mail = JSON.parse(llamadas[1].opts.body);
  assert.deepEqual(mail.to, ['ventas@jvk.cl', 'jefe@jvk.cl']);
  assert.equal(mail.reply_to, 'juan@taller.cl');
  assert.match(mail.subject, /#42/);
});

test('solo con productos (sin mensaje) también es válido', async () => {
  const b = bodyValido();
  b.mensaje = '';
  const res = crearRes();
  await handler(post(b), res);
  assert.equal(res.statusCode, 200);
});

test('RUT y teléfono son opcionales', async () => {
  const b = bodyValido();
  delete b.rut; delete b.telefono; delete b.empresa;
  const res = crearRes();
  await handler(post(b), res);
  assert.equal(res.statusCode, 200);
});

// ---------- anti-spam ----------

test('campo trampa lleno: responde ok pero no guarda ni envía', async () => {
  const b = bodyValido();
  b.website = 'http://spam.com';
  const res = crearRes();
  await handler(post(b), res);
  assert.equal(res.statusCode, 200);
  assert.equal(llamadas.length, 0);
});

test('envío demasiado rápido: responde ok pero no guarda ni envía', async () => {
  const b = bodyValido();
  b.tiempoMs = 800;
  const res = crearRes();
  await handler(post(b), res);
  assert.equal(res.statusCode, 200);
  assert.equal(llamadas.length, 0);
});

test('Turnstile activo sin token: 400 y no guarda', async () => {
  process.env.TURNSTILE_SECRET_KEY = 'secreto';
  const res = crearRes();
  await handler(post(bodyValido()), res);
  assert.equal(res.statusCode, 400);
  assert.equal(llamadas.length, 0);
});

test('Turnstile activo con token válido: continúa', async () => {
  process.env.TURNSTILE_SECRET_KEY = 'secreto';
  const b = bodyValido();
  b.turnstileToken = 'tok';
  const res = crearRes();
  await handler(post(b, { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' }), res);
  assert.equal(res.statusCode, 200);
  assert.match(llamadas[0].url, /turnstile/);
  assert.match(String(llamadas[0].opts.body), /remoteip=1\.2\.3\.4/);
});

test('Turnstile activo con token rechazado: 400', async () => {
  process.env.TURNSTILE_SECRET_KEY = 'secreto';
  comportamiento.turnstile = false;
  const b = bodyValido();
  b.turnstileToken = 'malo';
  const res = crearRes();
  await handler(post(b), res);
  assert.equal(res.statusCode, 400);
  assert.equal(llamadas.filter((l) => l.url.includes('supabase')).length, 0);
});

// ---------- validación ----------

test('rechaza sin consentimiento', async () => {
  const b = bodyValido();
  b.consentimiento = false;
  const res = crearRes();
  await handler(post(b), res);
  assert.equal(res.statusCode, 400);
  assert.ok(res.body.errores.consentimiento);
  assert.equal(llamadas.length, 0);
});

test('rechaza consentimiento enviado como texto "true"', async () => {
  const b = bodyValido();
  b.consentimiento = 'true';
  const res = crearRes();
  await handler(post(b), res);
  assert.equal(res.statusCode, 400);
});

test('rechaza correo, RUT y teléfono inválidos, todos a la vez', async () => {
  const b = bodyValido();
  b.email = 'no-es-correo';
  b.rut = '12.345.678-9';
  b.telefono = '123';
  const res = crearRes();
  await handler(post(b), res);
  assert.equal(res.statusCode, 400);
  assert.ok(res.body.errores.email);
  assert.ok(res.body.errores.rut);
  assert.ok(res.body.errores.telefono);
});

test('rechaza sin mensaje y sin productos', async () => {
  const b = bodyValido();
  b.mensaje = '';
  b.productos = [];
  const res = crearRes();
  await handler(post(b), res);
  assert.equal(res.statusCode, 400);
  assert.ok(res.body.errores.mensaje);
});

test('rechaza nombre vacío', async () => {
  const b = bodyValido();
  b.nombre = '   ';
  const res = crearRes();
  await handler(post(b), res);
  assert.equal(res.statusCode, 400);
  assert.ok(res.body.errores.nombre);
});

test('método distinto de POST: 405', async () => {
  const res = crearRes();
  await handler({ method: 'GET', headers: {} }, res);
  assert.equal(res.statusCode, 405);
  assert.equal(res.headers.Allow, 'POST');
});

test('cuerpo no JSON: 400', async () => {
  const res = crearRes();
  await handler({ method: 'POST', body: '{roto', headers: {} }, res);
  assert.equal(res.statusCode, 400);
});

test('cuerpo como texto JSON válido funciona', async () => {
  const res = crearRes();
  await handler({ method: 'POST', body: JSON.stringify(bodyValido()), headers: {} }, res);
  assert.equal(res.statusCode, 200);
});

// ---------- sanitización ----------

test('productos: cantidad inválida pasa a 1, tope 999, máximo 50 ítems', () => {
  const b = bodyValido();
  b.productos = [
    { id: 1, nombre: 'A', cantidad: 'abc' },
    { id: 2, nombre: 'B', cantidad: 5000 },
    { id: 3, nombre: 'C', cantidad: -4 },
    { id: 4, nombre: '', cantidad: 2 },
    null,
    'texto',
    ...Array.from({ length: 80 }, (_, i) => ({ id: 'x' + i, nombre: 'P' + i, cantidad: 1 })),
  ];
  const { datos } = validar(b);
  assert.equal(datos.productos[0].cantidad, 1);
  assert.equal(datos.productos[1].cantidad, 999);
  assert.equal(datos.productos[2].cantidad, 1);
  assert.ok(datos.productos.length <= 50);
  assert.ok(datos.productos.every((p) => p.nombre));
});

test('el correo escapa HTML y el asunto no admite saltos de línea', () => {
  const b = bodyValido();
  b.nombre = 'Ana <script>alert(1)</script>\r\nBcc: robo@x.cl';
  b.mensaje = '<img src=x onerror=alert(1)>';
  const { datos } = validar(b);
  const { asunto, html } = armarCorreo(datos, { numero: 7 });
  assert.ok(!/[\r\n]/.test(asunto));
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('<img src=x'));
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.equal(escaparHtml(`<a href="x">'&`), '&lt;a href=&quot;x&quot;&gt;&#39;&amp;');
});

test('el mensaje conserva saltos de línea', () => {
  const b = bodyValido();
  b.mensaje = 'Línea 1\nLínea 2\r\nLínea 3';
  const { datos } = validar(b);
  assert.equal(datos.mensaje, 'Línea 1\nLínea 2\nLínea 3');
});

// ---------- fallas de servicios ----------

test('si Supabase falla: 500 y no se envía correo', async () => {
  comportamiento.supabase = 500;
  const res = crearRes();
  await handler(post(bodyValido()), res);
  assert.equal(res.statusCode, 500);
  assert.equal(res.body.ok, false);
  assert.equal(llamadas.filter((l) => l.url.includes('resend')).length, 0);
});

test('si el correo falla: igual responde 200 porque la solicitud quedó guardada', async () => {
  comportamiento.resend = 500;
  const res = crearRes();
  await handler(post(bodyValido()), res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.ok, true);
});

test('si faltan variables de Supabase: 500 sin filtrar detalles', async () => {
  delete process.env.SUPABASE_URL;
  const res = crearRes();
  await handler(post(bodyValido()), res);
  assert.equal(res.statusCode, 500);
  assert.ok(!JSON.stringify(res.body).includes('Supabase'));
});

test('si faltan variables de correo: igual responde 200', async () => {
  delete process.env.RESEND_API_KEY;
  const res = crearRes();
  await handler(post(bodyValido()), res);
  assert.equal(res.statusCode, 200);
});

test('tipo de consulta: acepta los 4 valores del formulario e ignora otros', () => {
  const base = { nombre: 'Ana Pérez', email: 'ana@taller.cl', mensaje: 'Hola', consentimiento: true };
  assert.equal(validar({ ...base, tipo: 'Contrapesos' }).datos.tipo, 'Contrapesos');
  assert.equal(validar({ ...base, tipo: 'Soporte técnico' }).datos.tipo, 'Soporte técnico');
  assert.equal(validar({ ...base, tipo: '<script>' }).datos.tipo, '');
  assert.equal(validar(base).datos.tipo, '');
  const { html } = armarCorreo({ ...validar({ ...base, tipo: 'Equipamiento' }).datos }, { numero: 7 });
  assert.match(html, /Tipo de consulta/);
  assert.match(html, /Equipamiento/);
});

test('clave antigua service_role (JWT) también va como Bearer', async () => {
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOi.demo.firma';
  const res = crearRes();
  await handler(post(bodyValido()), res);
  assert.equal(res.statusCode, 200);
  const sb = llamadas.find(l => l.url.includes('supabase.co'));
  assert.equal(sb.opts.headers.apikey, 'eyJhbGciOi.demo.firma');
  assert.equal(sb.opts.headers.authorization, 'Bearer eyJhbGciOi.demo.firma');
});
