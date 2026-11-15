# Limpieza de logos — estado (para continuar en un chat nuevo)

Versión vigente: **JVK Sitio v12.dc.html** → carga `data/catalogo-kajova-v12.json` (177 fotos limpias en uso).

## Tanda v12 (reintento de rechazadas)
- Limpias: 3571, 978, 29981, 1007, 27710, 1003, 27396, 28211, 29363
- Siguen rechazadas: 2420 (sticker morado deja forma), 27153 y 27418 (emblema LAUNCH con borde), 25003, 11875
- Fotos WebP para que el usuario suba: ver `fotos-para-subir.md`
- Pulidas: rayas del ala en 11829, 11827, 11858, 11837, 11821, 11856 (región `h` angosta sobre la -limpia) y etiquetas de manillas en 24136 y 39258 (24136 con `h` por manilla).
Fotos limpias: `assets/kajova/<id>-limpia.jpg` (originales intactas). Cada tanda nueva = copiar v10 a v11, nuevo JSON con las rutas `-limpia`.

## Método (herramientas en `tools/`)
- `ubicar.js.txt`: recortes ampliados con regla en px para ubicar el logo.
- `limpiar-logos.js.txt`: regiones `v` (columnas: interpolación vertical), `h` (franjas horizontales), `mask` (polígono + selector `white` / `bright` / `dark` / `sat` / `all`, relleno armónico + grano). Trabaja con la imagen escalada a máx. 1000 px.
- `comparar.js.txt`: antes/después ampliado. Se rechaza cualquier foto con silueta, mancha o rectángulo visible.

## Hecho (31 fotos limpias en uso)
- Elevadores: 16701, 28268, 2926, 1162, 29986, 28407
- Lubricación y fluidos: 153640, 153806, 29506
- Aire comprimido: 13191 (+13184), 13194, 13200, 27210, 1204, 24709, 27294, 27290, 24136*, 1032, 39258*, 29293, 27309, 2905, 2253, 9084, 27299, 27302  (*quedan etiquetas pequeñas en manillas)
- Servicio a la rueda: 1256, 29948

## Intentadas y rechazadas (siguen como estaban)
- Aire: 1007, 3571, 2420, 978
- Rueda: 1003, 28211, 27418, 27153, 29363, 5379, 27396
- No intentadas por complejidad (Aire): 29981, 24811, 27710, 2597, 933

## Sin poder descargar (WebP/GIF de chilelift.cl)
14957, 2591, 15441, 23965, 6805, 23921 y las demás marcadas en `fotos-con-marca.md`.

## Tanda v11 (en curso)
- Rueda limpias: 29956, 1110, 27150, 27626, 27322, 2817, 27833, 27333, 1288, 15081, 23916, 29496
- Rueda rechazadas: 29366 (etiqueta grande en borde), 1268 (etiqueta cubre todo el cilindro)
- Diagnóstico limpias (lote 1): 27837, 24264, 24260, 24254, 30014, 28196, 28981, 28200, 25769, 29279, 27329, 3573, 14515, 26038, 2801, 16106, 27636, 27640, 25767, 25761
- Diagnóstico lote 2 limpias: 24016, 7420, 27487, 27497, 27492, 24997, 20819, 22706, 6912, 24207, 26282, 4057, 14360, 22034, 22698, 17143, 3576, 999, 24574 · rechazada: 25003 (kit con muchas marcas en caja)
- Diagnóstico lote 3 limpias: 27864, 153316, 28147, 24768, 13273, 1056, 13736, 20544, 2573, 13740, 153802, 5464, 26303, 27118 + las 23 “Actualización anual” (misma plantilla: polígono [[612,793],[735,731],[735,810],[612,826]] diff; 26774 con x desde 598)
- Electromovilidad limpias: 13928, 13712, 16774, 24032, 16803, 25038, 25061 · falta: 11824
- Lavado/gases limpias: 2473, 2661, 2658, 1094, 1096, 2729, 2736, 2483, 2442, 2450, 7351, 7354, 2492, 7188, 7669, 7285, 7190, 28589, 2845
- Lavado Goodyear limpias: 11852, 11861, 11862, 11872, 11868, 11841, 11871, 11825, 11829, 11822, 11827, 11858, 11820, 11821, 11755, 11837, 11840, 11856, 11855, 11817, 11843, 11819, 11851
- Con raya fina vertical residual (cola del ala): corregido en v12
- Rechazada: 11875 (caja + paños con varios logos) · Sin descargar: 11824 (WebP)
- Nuevo selector `yellow` en limpiar-logos (etiquetas amarillas).
- Nuevo selector `diff` en limpiar-logos (distancia al color mediano del polígono).

## Pendiente
- Crear JVK Sitio v11 + catalogo-kajova-v11.json apuntando a todas las `-limpia` de esta tanda (aún no hecho: el sitio sigue mostrando las originales).
- Al terminar: lista final de fotos que no se pudieron o quedaron mal.
