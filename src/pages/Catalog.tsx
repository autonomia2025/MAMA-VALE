import { EASE as E, intro, useApp, type CatFilters } from '../lib/app';
import { norm } from '../lib/catalog';
import { BtnOutline, ProductTile, useGridCols } from '../components/ui';

export function CatalogPage() {
  const { data, route, cat, setCat, mob, entered, gridFade, flashGrid } = useApp();
  const I = intro(entered);
  const gridCols = useGridCols();
  const P = data?.products || [];
  const lines = data?.lines || [];
  const line = route.line;
  const lineTitle = (k: string) => lines.find(l => l.k === k)?.t || '';

  let list = P;
  if (line !== 'todas') list = list.filter(p => p.l === line);
  const brandOpts = Array.from(new Set(list.map(p => p.b).filter(Boolean))).sort();
  if (cat.brand) list = list.filter(p => p.b === cat.brand);
  if (cat.q.trim()) { const t = norm(cat.q.trim()); list = list.filter(p => norm(p.n + ' ' + p.b + ' ' + p.c.join(' ')).includes(t)); }
  if (cat.sort === 'az') list = list.slice().sort((a, b) => a.n.localeCompare(b.n, 'es'));
  const shown = list.slice(0, cat.limit);

  // Line filters are links so the URL (#/catalogo?linea=x) stays shareable.
  const catLines = [{ k: 'todas', t: 'Todas las líneas', n: P.length }, ...lines];
  const lineHref = (k: string) => (k === 'todas' ? '#/catalogo' : '#/catalogo?linea=' + k);
  const pick = (k: string) => { if (k === line) return; location.hash = lineHref(k); };
  const upd = (p: Partial<CatFilters>, flash = true) => { setCat(p); if (flash) flashGrid(); };

  return (
    <div data-screen-label="Catálogo" className="wrap" style={{ paddingTop: 'clamp(28px,4vw,56px)' }}>
      <nav aria-label="Ruta" className="crumbs" style={{ opacity: I.o, transition: `opacity .8s ${E} .3s` }}>
        <a href="#/inicio">Inicio</a><span>/</span><span style={{ color: 'var(--ink)' }}>Catálogo</span>
      </nav>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px 40px', margin: 'clamp(20px,3vw,36px) 0 clamp(28px,3vw,40px)' }}>
        <h1 style={{ margin: 0, fontFamily: 'var(--f-display)', fontStretch: '118%', fontWeight: 600, fontSize: 'clamp(48px,8.4vw,136px)', lineHeight: .88, letterSpacing: I.ls, textTransform: 'uppercase', transition: `letter-spacing 1.6s ${E}` }}>
          <span className="line-mask" style={{ paddingBottom: '.06em', marginBottom: '-.06em' }}><span style={{ transform: I.line, transition: `transform 1.1s ${E} .05s` }}>Catálogo</span></span>
        </h1>
        <p aria-live="polite" style={{ margin: 0, fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--muted)', opacity: I.o, transition: `opacity .8s ${E} .4s` }}>
          {list.length} productos · {line === 'todas' ? 'Todas las líneas' : lineTitle(line)}
        </p>
      </div>

      <div className="glass-light" style={{ position: 'sticky', top: 64, zIndex: 40, margin: '0 calc(-1 * var(--gutter))', padding: '14px var(--gutter)', borderLeft: 'none', borderRight: 'none', borderTop: 'none', borderBottom: '1px solid rgba(19,33,59,.1)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <label style={{ flex: '1 1 320px', position: 'relative', display: 'block' }}>
            <span className="sr-only">Buscar en el catálogo</span>
            <span aria-hidden="true" style={{ position: 'absolute', left: 21, top: '50%', width: 13, height: 13, marginTop: -8, border: '1.5px solid var(--gold-text)', borderRadius: '50%', pointerEvents: 'none' }} />
            <span aria-hidden="true" style={{ position: 'absolute', left: 32, top: '50%', width: 6, height: 1.5, marginTop: 4, background: 'var(--gold-text)', transform: 'rotate(45deg)', pointerEvents: 'none' }} />
            <input type="search" className="ctl" value={cat.q} onChange={e => upd({ q: e.target.value, limit: 24 }, false)} placeholder="Buscar por equipo, modelo o marca" style={{ padding: '0 22px 0 44px' }} />
          </label>
          <label style={{ flex: '0 1 220px', display: 'block' }}>
            <span className="sr-only">Marca</span>
            <select className="ctl" value={cat.brand} onChange={e => upd({ brand: e.target.value, limit: 24 })}>
              <option value="">Todas las marcas</option>
              {brandOpts.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </label>
          <label style={{ flex: '0 1 220px', display: 'block' }}>
            <span className="sr-only">Ordenar</span>
            <select className="ctl" value={cat.sort} onChange={e => upd({ sort: e.target.value as CatFilters['sort'] })}>
              <option value="rel">Orden: destacados</option>
              <option value="az">Nombre A–Z</option>
            </select>
          </label>
        </div>
        {mob && (
          <div className="no-scrollbar" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingTop: 12, margin: '0 calc(-1 * var(--gutter))', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
            {catLines.map(l => <button key={l.k} className="pill" aria-pressed={line === l.k} onClick={() => pick(l.k)}>{l.t}</button>)}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 'clamp(24px,4vw,56px)', alignItems: 'flex-start', paddingTop: 'clamp(24px,3vw,40px)' }}>
        {!mob && (
          <aside aria-label="Líneas" style={{ flex: '0 0 250px', position: 'sticky', top: 168, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <p className="mono-label" style={{ margin: '0 0 12px' }}>Líneas</p>
            {catLines.map(l => (
              <button key={l.k} className="side-line" aria-pressed={line === l.k} onClick={() => pick(l.k)}>
                <span>{l.t}</span><span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, opacity: .7 }}>{l.n}</span>
              </button>
            ))}
          </aside>
        )}
        <div style={{ flex: '1 1 auto', minWidth: 0 }}>
          {data && list.length === 0 && (
            <div style={{ padding: '80px 0', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start', animation: `jvkUp .6s ${E}` }}>
              <p style={{ margin: 0, fontFamily: 'var(--f-display)', fontStretch: '110%', fontWeight: 600, fontSize: 28, textTransform: 'uppercase' }}>Sin resultados</p>
              <p style={{ margin: 0, fontSize: 16, color: 'var(--muted)' }}>Prueba con otra marca o línea, o escríbenos y lo buscamos por ti.</p>
              <BtnOutline onClick={() => { upd({ q: '', brand: '', limit: 24 }); if (line !== 'todas') location.hash = '#/catalogo'; }}>Limpiar filtros</BtnOutline>
            </div>
          )}
          <div className="grid-tiles" style={{ gridTemplateColumns: gridCols, opacity: gridFade ? 0 : 1, transform: gridFade ? 'translate3d(0,12px,0)' : 'none', transition: gridFade ? 'none' : `opacity .5s ${E}, transform .7s ${E}` }}>
            {shown.map(p => <ProductTile key={p.id} p={p} />)}
          </div>
          {list.length > cat.limit && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: 'clamp(48px,6vw,80px) 0 0' }}>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--muted)' }}>Mostrando {shown.length} de {list.length}</span>
              <BtnOutline onClick={() => setCat({ limit: cat.limit + 24 })}>Cargar más productos</BtnOutline>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
