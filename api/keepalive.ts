// Función serverless de Vercel: hace una consulta mínima a Supabase para que el
// proyecto (plan gratis) no se pause por inactividad. La llama a diario el cron
// definido en vercel.json.
//
// Responde en la ruta  GET /api/keepalive  y devuelve solo { ok: true } o { ok: false },
// nunca datos de la tabla.
//
// Variables de entorno:
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  las mismas de api/cotizacion.ts
//   CRON_SECRET                              (opcional) si existe, se exige
//                                            "Authorization: Bearer <CRON_SECRET>"

// Declaraciones mínimas para no depender de @types/node ni de @vercel/node.
declare const process: any;
declare const fetch: any;
declare const console: any;

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false });
  }

  const secreto = process.env.CRON_SECRET;
  if (secreto) {
    const auth = String((req.headers && req.headers.authorization) || '');
    if (auth !== `Bearer ${secreto}`) return res.status(401).json({ ok: false });
  }

  const url = process.env.SUPABASE_URL;
  const clave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !clave) {
    console.error('keepalive_error', 'Faltan variables de Supabase');
    return res.status(500).json({ ok: false });
  }

  try {
    const resp = await fetch(`${String(url).replace(/\/$/, '')}/rest/v1/solicitudes?select=id&limit=1`, {
      method: 'GET',
      headers: {
        apikey: clave,
        // Igual que en api/cotizacion.ts: la clave antigua (JWT, empieza con eyJ) va también como Bearer.
        ...(String(clave).startsWith('eyJ') ? { authorization: `Bearer ${clave}` } : {}),
      },
    });
    if (!resp.ok) {
      console.error('keepalive_error', `Supabase respondió ${resp.status}`);
      return res.status(502).json({ ok: false });
    }
    return res.status(200).json({ ok: true });
  } catch (e: any) {
    console.error('keepalive_error', e && e.message);
    return res.status(502).json({ ok: false });
  }
}
