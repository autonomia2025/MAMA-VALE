export interface Line { k: string; t: string; n: number }
export interface Product {
  id: string;
  /** name */ n: string;
  /** brand */ b: string;
  /** categories */ c: string[];
  /** line key */ l: string;
  /** price in CLP, 0 when unpublished */ p: number;
  /** availability */ a?: string;
  /** description */ d?: string;
  /** image URL */ i?: string;
  /** spec pairs */ s?: [string, string][];
}
export interface Catalog { lines: Line[]; products: Product[] }

export async function loadCatalog(): Promise<Catalog> {
  const r = await fetch('/data/catalogo.json');
  if (!r.ok) throw new Error('catalog ' + r.status);
  return r.json();
}

/** Short description and the product used as each line's preview image. */
export const LINES: Record<string, [string, RegExp]> = {
  elevadores: ['Dos y cuatro columnas, tijera, foso y alineación.', /SPOA10-AV/i],
  rueda: ['Balanceadoras, desmontadoras, alineación y vulcanización.', /SMARTWEIGHT® PRO/i],
  diagnostico: ['Scanners, analizadores de gases y software.', /X-431 PRO3 LINK/i],
  electro: ['Equipos y herramientas para vehículos eléctricos y baterías.', /EVM324/i],
  fluidos: ['Lubricación, aire acondicionado y cambio de fluidos.', /AC519/i],
  carroceria: ['Cabinas de pintura, soldadoras, spotters y mesas.', /TRAMONTANA/i],
  aire: ['Compresores, herramientas y estaciones de trabajo.', /COMPRESOR BLACK/i],
  lavado: ['Lavado, limpieza, insumos y repuestos.', /HIDROLAVADORA MICHELIN/i],
};

export const FEATURED = [/PRO9D-EVO/i, /SMARTWEIGHT® PRO/i, /TCX54/i, /BEA 550/i, /DSD32/i, /X-431 PRO3 LINK/i, /AC519/i, /TRAMONTANA/i];

export const VALUES = [
  { num: '01', t: 'Calidad', d: 'Trabajamos con marcas que conocemos y productos que probamos antes de recomendarlos.' },
  { num: '02', t: 'Precisión', d: 'La ficha técnica correcta, el gramaje correcto y el plazo que comprometimos.' },
  { num: '03', t: 'Confianza', d: 'Precios claros y asesoría honesta, incluso cuando la mejor respuesta es un equipo más simple.' },
  { num: '04', t: 'Relaciones de largo plazo', d: 'Seguimos presentes después de la venta: repuestos, insumos, actualizaciones y soporte.' },
];

export const fmtCLP = (n: number) => '$' + Math.round(n).toLocaleString('es-CL');
export const norm = (s: string) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export function brandCounts(products: Product[]) {
  const counts: Record<string, number> = {};
  products.forEach(p => { if (p.b) counts[p.b] = (counts[p.b] || 0) + 1; });
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
}
