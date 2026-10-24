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
  /** CSS filter that recolours the photo (v5: tells KAJOVA units apart from the source photos) */ f?: string;
}
export interface Catalog { lines: Line[]; products: Product[] }

export async function loadCatalog(): Promise<Catalog> {
  const r = await fetch('/data/catalogo.json');
  if (!r.ok) throw new Error('catalog ' + r.status);
  return r.json();
}

/** Short description and the product used as each line's preview image. */
export const LINES: Record<string, [string, RegExp]> = {
  elevadores: ['Dos y cuatro columnas y tijera.', /tijera de alineación/i],
  rueda: ['Balanceadoras, desmontadoras, alineación y vulcanización.', /KWB-921/i],
  diagnostico: ['Scanners, analizadores de gases y software.', /X-431 PRO3 LINK/i],
  electro: ['Equipos y herramientas para vehículos eléctricos y baterías.', /EVM324/i],
  fluidos: ['Lubricación, aire acondicionado y cambio de fluidos.', /AC519/i],
  carroceria: ['Cabinas de pintura, soldadoras, spotters y mesas.', /TRAMONTANA/i],
  aire: ['Compresores, herramientas y estaciones de trabajo.', /COMPRESOR DE TORNILLO/i],
  lavado: ['Lavado, limpieza, insumos y repuestos.', /HIDROLAVADORA MICHELIN/i],
};

/** Product ids shown in "Equipos destacados". */
export const FEATURED = ['28268', '1256', '27336', '28407', '24693', '27449', '992', '25061'];

export const VALUES = [
  { num: '01', t: 'Calidad', d: 'Trabajamos con marcas que conocemos y productos que probamos antes de recomendarlos.' },
  { num: '02', t: 'Precisión', d: 'La ficha técnica correcta, el gramaje correcto y el plazo que comprometimos.' },
  { num: '03', t: 'Confianza', d: 'Precios claros y asesoría honesta, incluso cuando la mejor respuesta es un equipo más simple.' },
  { num: '04', t: 'Relaciones de largo plazo', d: 'Seguimos presentes después de la venta: repuestos, insumos, actualizaciones y soporte.' },
];

export const fmtCLP = (n: number) => '$' + Math.round(n).toLocaleString('es-CL');
export const norm = (s: string) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

