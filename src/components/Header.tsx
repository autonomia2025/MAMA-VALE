import { useEffect, useRef } from 'react';
import { EASE as E } from '../lib/app';
import { CONTACT } from '../lib/config';
import type { Page } from '../lib/router';

const NAV: [Page, string][] = [['contrapesos', 'Contrapesos'], ['catalogo', 'Catálogo'], ['empresa', 'Empresa'], ['contacto', 'Contacto']];
const activeOf = (p: Page) => (p === 'producto' ? 'catalogo' : p);

interface HeaderProps { scrolled: boolean; dark: boolean; mob: boolean; page: Page; quoteCount: number; menu: boolean; onMenu(): void }

/** Transparent over the hero, frosted once scrolled, dark glass over navy sections. */
export function Header({ scrolled, dark, mob, page, quoteCount, menu, onMenu }: HeaderProps) {
  const blur = mob ? 'blur(10px) saturate(1.4)' : 'blur(18px) saturate(1.6)';
  const bg = dark ? 'rgba(12,22,40,.5)' : scrolled ? 'rgba(241,240,236,.72)' : 'rgba(241,240,236,0)';
  const filter = dark ? (mob ? 'blur(12px) saturate(1.3)' : 'blur(22px) saturate(1.5)') : scrolled ? blur : 'none';
  const border = dark ? 'rgba(255,255,255,.08)' : scrolled ? 'rgba(19,33,59,.10)' : 'rgba(19,33,59,0)';
  const fg = dark ? '#fff' : 'var(--ink)';
  const compact = scrolled && !mob;
  const logoH = compact ? 31 : 36;
  const active = activeOf(page);
  const logoTr = `height .45s ${E}, opacity .4s ${E}`;

  return (
    <header className="nav" style={{ background: bg, backdropFilter: filter, WebkitBackdropFilter: filter, borderBottomColor: border }}>
      <div className="wrap nav__in" style={{ height: compact ? 64 : 76 }}>
        <a href="#/inicio" aria-label="Maquinarias JVK, inicio" style={{ display: 'flex', alignItems: 'center', flex: 'none' }}>
          <span style={{ position: 'relative', display: 'block' }}>
            <img src="/assets/jvk-logo.png" alt="Maquinarias JVK" style={{ height: logoH, width: 'auto', display: 'block', opacity: dark ? 0 : 1, transition: logoTr }} />
            <img src="/assets/jvk-logo-white.png" alt="" aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, height: logoH, width: 'auto', display: 'block', opacity: dark ? 1 : 0, transition: logoTr }} />
          </span>
        </a>
        {!mob && (
          <nav aria-label="Principal" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px,3vw,44px)' }}>
            {NAV.map(([k, t]) => (
              <a key={k} href={'#/' + k} className="nav__link" aria-current={active === k ? 'page' : undefined} style={{ color: fg }}>{t}</a>
            ))}
          </nav>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 'none' }}>
          <a href="#/contacto" aria-label="Ver cotización" data-mag="1" className="nav__cta"
            style={{ background: dark ? 'var(--gold-2)' : 'var(--ink)', color: dark ? 'var(--navy-deep)' : '#fff' }}>
            <span className="nav__cta-label">Cotización</span>
            <span key={'b' + quoteCount} style={{ minWidth: 28, height: 28, borderRadius: 999, background: dark ? 'var(--navy-deep)' : 'var(--gold)', color: dark ? 'var(--gold-2)' : 'var(--navy-deep)', transition: `background .4s ${E}, color .4s ${E}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 500, padding: '0 8px', animation: quoteCount ? `jvkBump .5s ${E}` : 'none' }}>{quoteCount}</span>
          </a>
          {mob && (
            <button onClick={onMenu} aria-label="Abrir menú" aria-expanded={menu} className="nav__menu"
              style={{ border: '1px solid ' + (dark ? 'rgba(255,255,255,.3)' : 'rgba(19,33,59,.2)'), color: fg }}>
              <span aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ display: 'block', width: 16, height: 1.5, background: fg }} />
                <span style={{ display: 'block', width: 10, height: 1.5, background: fg }} />
              </span>Menú
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

/** Full-screen menu that opens as a circle from the menu button; links rise in one by one. */
export function MobileMenu({ open, page, onClose }: { open: boolean; page: Page; onClose(): void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => closeRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [open]);
  const active = activeOf(page);
  const links: [Page, string][] = [['inicio', 'Inicio'], ...NAV];
  return (
    <div role="dialog" aria-modal="true" aria-label="Menú" aria-hidden={!open}
      style={{ position: 'fixed', inset: 0, zIndex: 80, background: 'var(--navy-deep)', color: '#fff', display: 'flex', flexDirection: 'column', padding: '0 20px 32px', clipPath: open ? 'circle(150% at calc(100% - 48px) 38px)' : 'circle(0% at calc(100% - 48px) 38px)', visibility: open ? 'visible' : 'hidden', transition: `clip-path .75s cubic-bezier(.76,0,.24,1), visibility 0s linear ${open ? '0s' : '.75s'}` }}>
      <div style={{ height: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src="/assets/jvk-logo-white.png" alt="Maquinarias JVK" style={{ height: 34, width: 'auto' }} />
        <button ref={closeRef} onClick={onClose} aria-label="Cerrar menú" className="nav__menu" style={{ border: '1px solid #33456A', color: '#fff' }}>
          <span aria-hidden="true" style={{ fontSize: 16, lineHeight: 1 }}>×</span>Cerrar
        </button>
      </div>
      <nav aria-label="Menú móvil" style={{ display: 'flex', flexDirection: 'column', marginTop: 32, borderTop: '1px solid var(--foot-line)' }}>
        {links.map(([k, t], i) => (
          <a key={k} href={'#/' + k} onClick={() => { if (location.hash === '#/' + k) onClose(); }} style={{ display: 'block', overflow: 'hidden', borderBottom: '1px solid var(--foot-line)', color: '#fff', textDecoration: 'none' }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', fontFamily: 'var(--f-display)', fontStretch: '115%', fontWeight: 600, fontSize: 'clamp(28px,8vw,40px)', textTransform: 'uppercase', color: active === k ? 'var(--gold-2)' : '#fff', transform: open ? 'translate3d(0,0,0)' : 'translate3d(0,110%,0)', transition: `transform .7s ${E} ${open ? 200 + i * 60 : 0}ms` }}>
              <span>{t}</span><span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--gold-2)' }}>{String(i + 1).padStart(2, '0')}</span>
            </span>
          </a>
        ))}
      </nav>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 15, color: 'var(--soft)', opacity: open ? 1 : 0, transition: `opacity .5s ${E} .5s` }}>
        <a href={'mailto:' + CONTACT.email} style={{ color: '#fff' }}>{CONTACT.email}</a>
        <a href={CONTACT.phoneHref} style={{ color: '#fff' }}>{CONTACT.phone}</a>
      </div>
    </div>
  );
}
