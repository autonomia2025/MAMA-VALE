# Maquinarias JVK — sitio web

Implementación de producción del diseño `project/JVK Sitio v4.dc.html` (Claude Design).
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
- `public/data/catalogo.json` — catálogo (516 productos, 8 líneas)

Las rutas usan hash (`#/catalogo?linea=elevadores`, `#/producto/16701`), así que funcionan en cualquier hosting estático sin reglas de reescritura.

## Pendiente antes de publicar

- **Fotos de marca:** cada espacio de foto muestra su descripción. Sube la imagen a `public/photos/` y pon la ruta en `PHOTOS` en `src/lib/config.ts` (por ejemplo `'cp-gancho': '/photos/contrapesos-gancho.jpg'`). En `public/photos/` ya están las 3 fotos del sitio anterior.
- **Fotos de productos:** hoy se cargan desde chilelift.cl (como en el diseño). Si alguna falla, se oculta.
- **Contacto:** correo, teléfono y WhatsApp son provisorios (`CONTACT` en `src/lib/config.ts`).
- **Formulario:** el envío es simulado. Conecta un endpoint real en `sendQuoteRequest` (`src/pages/Contacto.tsx`).

El paquete original de Claude Design está en `project/`, `chats/` y `HANDOFF.md`.
