export const PAGES = ['inicio', 'catalogo', 'producto', 'contrapesos', 'empresa', 'contacto'] as const;
export type Page = typeof PAGES[number];
export interface Route { page: Page; pid: string | null; line: string }

/** Parses `#/page/id?linea=x`. Returns null for in-page anchors such as `#formatos`. */
export function parseHash(hash: string): Route | null {
  const h = (hash || '').replace(/^#\/?/, '');
  const first = h.split(/[/?]/)[0];
  if (h && !hash.startsWith('#/') && !(PAGES as readonly string[]).includes(first)) return null;
  const [path, qs] = h.split('?');
  const parts = path.split('/');
  let page = (parts[0] || 'inicio') as Page;
  if (!PAGES.includes(page)) page = 'inicio';
  const line = page === 'catalogo' ? new URLSearchParams(qs || '').get('linea') || 'todas' : 'todas';
  return { page, pid: page === 'producto' ? parts[1] || null : null, line };
}

export const PAGE_LABEL: Record<Page, string> = {
  inicio: 'Inicio', catalogo: 'Catálogo', producto: 'Catálogo', contrapesos: 'Contrapesos', empresa: 'Empresa', contacto: 'Contacto',
};
