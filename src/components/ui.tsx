import { useState, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import { useApp } from '../lib/app';
import { PHOTOS, SETTINGS } from '../lib/config';
import { fmtCLP, type Product } from '../lib/catalog';

const Arrows = () => (
  <span aria-hidden="true" className="btn__disc">
    <span className="btn__arrow">→</span>
    <span className="btn__arrow">→</span>
  </span>
);

interface BtnProps { children: ReactNode; gold?: boolean; plus?: boolean; mag?: boolean; style?: CSSProperties }

/** Primary pill. Renders an <a> when given href, otherwise a <button>. */
export function Btn({ href, children, gold, plus, mag = true, style, ...rest }: BtnProps & { href?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = 'btn' + (gold ? ' btn--gold' : '');
  const icon = plus
    ? <span aria-hidden="true" className="btn__disc"><span className="btn__plus">+</span></span>
    : <Arrows />;
  if (href) return <a href={href} className={cls} data-mag={mag ? '1' : undefined} style={style}>{children} {icon}</a>;
  return <button className={cls} data-mag={mag ? '1' : undefined} style={style} {...rest}>{children} {icon}</button>;
}

export function BtnOutline({ href, children, plus, ...rest }: { href?: string; children: ReactNode; plus?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const inner = <><span>{children}</span>{plus && <span aria-hidden="true" className="btn-o__plus">+</span>}</>;
  if (href) return <a href={href} className="btn-o">{inner}</a>;
  return <button className="btn-o" {...rest}>{inner}</button>;
}

export function TextLink({ href, children, light, plain, arrow = true, external }: { href: string; children: ReactNode; light?: boolean; plain?: boolean; arrow?: boolean; external?: boolean }) {
  return (
    <a href={href} className={'tlink' + (light ? ' tlink--light' : '') + (plain ? ' tlink--plain' : '')}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
      {children}{arrow && <> <span aria-hidden="true" className="tlink__arrow">→</span></>}
    </a>
  );
}

/** Brand photo area. Shows the captioned placeholder until PHOTOS[id] is set. */
export function ImageSlot({ id, placeholder }: { id: string; placeholder: string }) {
  const src = PHOTOS[id];
  const [failed, setFailed] = useState(false);
  return (
    <div className="slot" data-slot={id}>
      {src && !failed ? (
        <img src={src} alt={placeholder.replace(/^Fotografía:\s*/i, '')} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="slot__empty" role="img" aria-label={placeholder}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 16-5-5-9 9" />
          </svg>
          <span className="slot__cap">{placeholder}</span>
        </div>
      )}
    </div>
  );
}

/** Product image that hides itself if the remote file fails, instead of showing a broken icon. */
export function ProductImg({ src, alt, className, style }: { src?: string; alt: string; className?: string; style?: CSSProperties }) {
  const [failed, setFailed] = useState(false);
  if (!src) return null;
  return <img src={src} alt={alt} loading="lazy" className={className} onError={() => setFailed(true)}
    style={{ ...style, visibility: failed ? 'hidden' : undefined }} />;
}

export function priceOf(p: Product) {
  return p.p && SETTINGS.showPrices ? fmtCLP(p.p) : 'Cotizar';
}

export function ProductTile({ p }: { p: Product }) {
  const { quote, addQuote } = useApp();
  const inQ = quote.some(x => x.id === p.id);
  const href = '#/producto/' + p.id;
  return (
    <article className="tile">
      <a href={href} aria-label={p.n} className="tile__media">
        <ProductImg src={p.i} alt={p.n} className="tile__img" style={{ filter: p.f }} />
        <span aria-hidden="true" className="tile__peek glass-light">Ver ficha →</span>
      </a>
      <button className="tile__add" data-in={inQ} title="Añadir a cotización"
        aria-label={(inQ ? 'Sumar otra unidad de ' : 'Añadir ') + p.n + ' a cotización'}
        onClick={e => { e.preventDefault(); addQuote(p.id, p.n); }}>{inQ ? '✓' : '+'}</button>
      <div className="tile__meta">
        <span className="mono-label">{p.b || 'JVK'}</span>
        <a href={href} className="tile__name">{p.n}</a>
        <span className="tile__price">{priceOf(p)}</span>
      </div>
    </article>
  );
}

export function useGridCols() {
  const { mob } = useApp();
  if (mob) return 'repeat(2,minmax(0,1fr))';
  return SETTINGS.catalogDensity === 'Compacta' ? 'repeat(auto-fill,minmax(180px,1fr))' : 'repeat(auto-fill,minmax(230px,1fr))';
}

const GRAMS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
const E = 'cubic-bezier(.22,1,.36,1)';

/** 5–60 g scale with a glass tooltip that follows the pointer. */
export function GramRuler() {
  const [rg, setRg] = useState<number | null>(null);
  const left = rg == null ? '50%' : `calc(${(rg / (GRAMS.length - 1)).toFixed(4)} * (100% - 16px) + 8px)`;
  const op = rg == null ? 0 : 1;
  return (
    <div aria-hidden="true" style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--navy-line)', paddingTop: 40, cursor: 'ew-resize' }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        const i = Math.max(0, Math.min(GRAMS.length - 1, Math.round((e.clientX - r.left - 8) / (r.width - 16) * (GRAMS.length - 1))));
        if (i !== rg) setRg(i);
      }}
      onMouseLeave={() => setRg(null)}>
      <span className="glass-dark" style={{ position: 'absolute', top: 0, left, transform: 'translateX(-50%)', opacity: op, transition: `left .35s ${E}, opacity .3s ${E}`, pointerEvents: 'none', height: 28, padding: '0 12px', borderRadius: 999, display: 'flex', alignItems: 'center', fontFamily: 'var(--f-mono)', fontSize: 12, color: '#fff', whiteSpace: 'nowrap' }}>{rg == null ? '' : GRAMS[rg] + ' g'}</span>
      <span style={{ position: 'absolute', bottom: -1, left, width: 2, height: 26, marginLeft: -1, background: 'var(--gold-2)', borderRadius: 2, opacity: op, transition: `left .35s ${E}, opacity .3s ${E}`, pointerEvents: 'none' }} />
      {GRAMS.map((g, i) => (
        <div key={g} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 16 }}>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: rg === i ? 'var(--gold-2)' : '#8C9AB5', transition: `color .25s ${E}` }}>{g}</span>
          <span style={{ height: 18, display: 'flex', alignItems: 'flex-end' }}>
            {g % 10 === 0
              ? <span style={{ width: 1, height: 18, background: 'var(--gold-2)', display: 'block' }} />
              : <span style={{ width: 1, height: 9, background: '#5A6B8C', display: 'block' }} />}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Gold radial light that the motion engine moves with the pointer inside dark panels. */
export const Glow = () => (
  <div data-glow="1" aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: 720, height: 720, margin: '-360px 0 0 -360px', borderRadius: '50%', background: 'radial-gradient(closest-side,rgba(201,164,90,.16),rgba(201,164,90,0))', mixBlendMode: 'screen', pointerEvents: 'none', zIndex: 2, opacity: 0, transition: `opacity .6s ${E}, transform .5s cubic-bezier(.2,.8,.2,1)` }} />
);

/** Words that darken one by one as the block scrolls past (motion engine `data-fill`). */
export function FillWords({ text, color }: { text: string; color?: string }) {
  return <>{text.split(' ').map((w, i) => <span key={i} data-w="1" style={{ color, transition: 'opacity .25s linear' }}>{w + ' '}</span>)}</>;
}
