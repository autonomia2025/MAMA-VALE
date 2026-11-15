# Maquinarias JVK — sitio web

Implementación de producción del diseño `project/JVK Sitio v14.dc.html` (Claude Design): marca KAJOVA, sin precios, catálogo depurado con fotos limpias y datos de contacto reales.
Vite + React + TypeScript, sin otras dependencias. Se publica como sitio estático.

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/
npm run preview
```

## Estructura

- `src/pages/` — Inicio, Catálogo, Producto, Contrapesos, Empresa, Contacto
- `src/components/` — header, menú móvil, footer, CTA y piezas compartidas (botones, fichas, regla de gramos)
- `src/lib/motion.ts` — motor de scroll y cursor (reveals, parallax, sección fija lateral, glow); se activa con atributos `data-*`
- `src/lib/config.ts` — **lo que se edita a menudo**: interruptores (precios, lectura del hero, cursor), datos de contacto y fotos
- `src/styles.css` — sistema de diseño (colores, botones, links, vidrio)
- `public/data/catalogo.json` — catálogo KAJOVA (362 productos, 8 líneas; copia de `project/data/catalogo-kajova-v12.json` con las rutas de fotos absolutas)

Las rutas usan hash (`#/catalogo?linea=elevadores`, `#/producto/16701`), así que funcionan en cualquier hosting estático sin reglas de reescritura.

## Pendiente antes de publicar

- **Fotos de marca:** cada espacio de foto muestra su descripción. Sube la imagen a `public/photos/` y pon la ruta en `PHOTOS` en `src/lib/config.ts` (por ejemplo `'cp-gancho': '/photos/contrapesos-gancho.jpg'`). En `public/photos/` ya están las 3 fotos del sitio anterior.
- **Fotos de productos:** 240 se sirven desde el propio sitio (`public/assets/kajova/`, fotos limpias de la v14); las otras 122 aún se cargan desde chilelift.cl. Si alguna falla, se oculta.
- **Contacto:** correo, los dos números de WhatsApp/teléfono y el horario están en `CONTACT` (`src/lib/config.ts`).
- **Formulario:** envía a `api/cotizacion.ts` (función de Vercel) que guarda en Supabase (`supabase/schema.sql`) y avisa por correo con Resend. Variables en `.env.example`; pruebas con `node --test tests/*.test.mjs` (Node 22+). `npm run dev` no ejecuta `/api`: usa `npx vercel dev` o el preview de Vercel. `api/keepalive.ts` corre a diario (cron en `vercel.json`) para que Supabase no pause el proyecto. Falta la página `#/privacidad`.

El paquete original de Claude Design está en `project/`, `chats/` y `HANDOFF.md`.
