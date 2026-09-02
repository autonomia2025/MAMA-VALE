import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

interface SubmenuItem {
  name: string;
  href: string;
}

const EQUIPAMIENTO_SUBITEMS: SubmenuItem[] = [
  { name: 'Todas las líneas', href: '/equipamiento' },
  { name: 'Elevadores', href: '/equipamiento/elevadores' },
  { name: 'Alineadores', href: '/equipamiento/alineadores' },
  { name: 'Desmontadoras', href: '/equipamiento/desmontadoras' },
  { name: 'Lubricación', href: '/equipamiento/lubricacion' },
  { name: 'Redes', href: '/equipamiento/redes' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const location = useLocation();

  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const submenuContainerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check active section states
  const isEquipamientoActive = location.pathname.startsWith('/equipamiento');
  const isConsumiblesActive = location.pathname.startsWith('/consumibles');
  const isNosotrosActive = location.pathname === '/nosotros';
  const isCotizarActive = location.pathname === '/cotizar';

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSubmenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle desktop submenu hover with 180ms close delay
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setSubmenuOpen(true);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setSubmenuOpen(false);
    }, 180);
  };

  // Handle blur outside desktop submenu container
  const handleContainerBlur = (e: React.FocusEvent) => {
    if (
      submenuContainerRef.current &&
      !submenuContainerRef.current.contains(e.relatedTarget as Node)
    ) {
      setSubmenuOpen(false);
    }
  };

  // Keyboard navigation on submenu trigger
  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSubmenuOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSubmenuOpen((prev) => !prev);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSubmenuOpen(true);
      const firstLink = submenuContainerRef.current?.querySelector<HTMLAnchorElement>(
        '[role="menuitem"]'
      );
      firstLink?.focus();
    }
  };

  // Handle Escape key for mobile menu & submenu focus trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (submenuOpen) {
          setSubmenuOpen(false);
          return;
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          menuButtonRef.current?.focus();
          return;
        }
      }

      if (mobileMenuOpen && e.key === 'Tab' && overlayRef.current) {
        const focusableElements = overlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    [mobileMenuOpen, submenuOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav
        aria-label="Navegación principal"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'h-[72px] navbar-glass-scrolled'
            : 'h-[80px] bg-ink-900 border-b border-paper/10'
        }`}
      >
        {/* Inner edge reflection: 1px in paper at 50% right above bottom border */}
        <div
          aria-hidden="true"
          className={`absolute bottom-[1px] left-0 right-0 h-[1px] bg-paper/10 pointer-events-none transition-opacity duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="layout-container h-full flex items-center justify-between">
          {/* Wordmark */}
          <Link
            to="/"
            className="flex items-baseline focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
            aria-label="Maquinarias JVK — Inicio"
          >
            <span
              className={`font-medium tracking-[0.12em] text-paper transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? 'text-[14px]' : 'text-[16px]'
              }`}
            >
              MAQUINARIAS
            </span>
            <span
              className={`text-paper transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? 'text-[14px]' : 'text-[16px]'
              }`}
            >
              &thinsp;
            </span>
            <span
              className={`font-bold italic text-paper transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? 'text-[14px]' : 'text-[16px]'
              }`}
            >
              JVK
            </span>
          </Link>

          {/* Desktop Navigation (900px and up) */}
          <div className="hidden min-[900px]:flex items-center gap-[32px]">
            {/* 1. EQUIPAMIENTO (con submenú desplegable) */}
            <div
              ref={submenuContainerRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onBlur={handleContainerBlur}
            >
              <div className="flex items-center">
                <Link
                  to="/equipamiento"
                  aria-expanded={submenuOpen}
                  aria-haspopup="true"
                  aria-controls="equipamiento-desktop-submenu"
                  onKeyDown={handleTriggerKeyDown}
                  className={`group relative py-[8px] type-label text-[12px] text-left transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2 ${
                    isEquipamientoActive ? 'text-paper' : 'text-paper/85 hover:text-paper'
                  }`}
                >
                  <span>EQUIPAMIENTO</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500 origin-left transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isEquipamientoActive || submenuOpen
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              </div>

              {/* Submenu Dropdown Panel */}
              <div
                id="equipamiento-desktop-submenu"
                role="menu"
                aria-label="Submenú Equipamiento"
                className={`absolute top-[100%] left-0 pt-[8px] z-50 transition-all duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  submenuOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-[8px] pointer-events-none'
                }`}
              >
                <div className="w-[280px] submenu-glass rounded-[20px] p-[16px] shadow-none">
                  <ul className="flex flex-col list-none p-0 m-0">
                    {/* Item 1: Todas las líneas */}
                    <li role="none">
                      <NavLink
                        to="/equipamiento"
                        role="menuitem"
                        onClick={() => setSubmenuOpen(false)}
                        className={({ isActive }) =>
                          `group relative block type-label py-[12px] px-[12px] rounded-sm transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isActive && location.pathname === '/equipamiento'
                              ? 'text-ink-900 font-medium'
                              : 'text-ink-900/70 hover:text-ink-900 focus-visible:text-ink-900'
                          }`
                        }
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[10px] bottom-[10px] w-[1px] bg-gold-500 origin-top scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                        <span>Todas las líneas</span>
                      </NavLink>
                    </li>

                    {/* Filete separador horizontal */}
                    <li role="separator" aria-hidden="true">
                      <div className="my-[8px] border-t border-line" />
                    </li>

                    {/* Líneas específicas */}
                    {EQUIPAMIENTO_SUBITEMS.slice(1).map((subitem) => (
                      <li key={subitem.href} role="none">
                        <NavLink
                          to={subitem.href}
                          role="menuitem"
                          onClick={() => setSubmenuOpen(false)}
                          className={({ isActive }) =>
                            `group relative block type-label py-[12px] px-[12px] rounded-sm transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              isActive
                                ? 'text-ink-900 font-medium'
                                : 'text-ink-900/70 hover:text-ink-900 focus-visible:text-ink-900'
                            }`
                          }
                        >
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-[10px] bottom-[10px] w-[1px] bg-gold-500 origin-top scale-y-0 group-hover:scale-y-100 group-focus-visible:scale-y-100 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                          />
                          <span>{subitem.name}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. CONSUMIBLES */}
            <NavLink
              to="/consumibles"
              className={({ isActive }) =>
                `group relative py-[8px] type-label text-[12px] text-left transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2 ${
                  isActive || isConsumiblesActive
                    ? 'text-paper'
                    : 'text-paper/85 hover:text-paper'
                }`
              }
            >
              <span>CONSUMIBLES</span>
              <span
                className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500 origin-left transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isConsumiblesActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </NavLink>

            {/* 3. NOSOTROS */}
            <NavLink
              to="/nosotros"
              className={({ isActive }) =>
                `group relative py-[8px] type-label text-[12px] text-left transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2 ${
                  isActive || isNosotrosActive
                    ? 'text-paper'
                    : 'text-paper/85 hover:text-paper'
                }`
              }
            >
              <span>NOSOTROS</span>
              <span
                className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500 origin-left transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isNosotrosActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </NavLink>

            {/* CTA Cotizar */}
            <NavLink
              to="/cotizar"
              className={({ isActive }) =>
                `type-label px-[28px] rounded-full border transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isScrolled ? 'py-[10px]' : 'py-[14px]'
                } ${
                  isActive || isCotizarActive
                    ? 'bg-gold-700 border-gold-700 text-paper'
                    : 'bg-gold-500 border-gold-500 text-ink-900 hover:bg-gold-700 hover:border-gold-700 hover:text-paper'
                }`
              }
            >
              Cotizar
            </NavLink>
          </div>

          {/* Mobile Menu Button (under 900px) */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-overlay"
            className="flex min-[900px]:hidden flex-col justify-center items-center w-[44px] h-[44px] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2 z-50"
          >
            <div className="relative w-[20px] h-[14px]">
              <span
                className={`absolute left-0 w-[20px] h-[1.5px] bg-paper transition-transform duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileMenuOpen ? 'top-[6px] rotate-45' : 'top-0 rotate-0'
                }`}
              />
              <span
                className={`absolute left-0 w-[20px] h-[1.5px] bg-paper transition-transform duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileMenuOpen ? 'top-[6px] -rotate-45' : 'bottom-0 rotate-0'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-navigation-overlay"
        ref={overlayRef}
        aria-modal="true"
        role="dialog"
        aria-label="Menú móvil"
        className={`fixed inset-0 z-40 mobile-menu-glass flex flex-col min-[900px]:hidden overflow-y-auto transition-opacity duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top spacer matching navbar height */}
        <div className="h-[80px] w-full shrink-0" />

        {/* Content container */}
        <div className="layout-container flex-1 flex flex-col justify-between pt-[24px] pb-[48px]">
          {/* Stacked Links Hierarchy */}
          <div className="flex flex-col gap-[32px]">
            {/* 01 EQUIPAMIENTO (Encabezado no interactivo + lista indentada) */}
            <div
              style={{
                transitionDelay: mobileMenuOpen ? '0ms' : '0ms',
              }}
              className={`flex flex-col gap-[16px] transition-all duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mobileMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-[16px] opacity-0'
              }`}
            >
              <div className="flex items-baseline gap-[16px]">
                <span className="type-label text-gold-700">01</span>
                <span className="type-label text-steel-500">EQUIPAMIENTO</span>
              </div>

              {/* Subitems indentados 20px con separación de 16px */}
              <div className="flex flex-col gap-[16px] pl-[20px]">
                {EQUIPAMIENTO_SUBITEMS.map((sub, j) => (
                  <NavLink
                    key={sub.href}
                    to={sub.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      transitionDelay: mobileMenuOpen ? `${(j + 1) * 50}ms` : '0ms',
                    }}
                    className={({ isActive }) =>
                      `type-h3 text-left transition-all duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        mobileMenuOpen
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-[16px] opacity-0'
                      } ${
                        isActive
                          ? 'text-ink-900 font-medium'
                          : 'text-steel-500 hover:text-ink-900'
                      }`
                    }
                  >
                    {sub.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* 02 CONSUMIBLES */}
            <NavLink
              to="/consumibles"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                transitionDelay: mobileMenuOpen ? '380ms' : '0ms',
              }}
              className={({ isActive }) =>
                `flex items-baseline gap-[16px] transition-all duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileMenuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-[16px] opacity-0'
                } ${
                  isActive || isConsumiblesActive
                    ? 'text-ink-900 font-medium'
                    : 'text-steel-500 hover:text-ink-900'
                }`
              }
            >
              <span className="type-label text-gold-700">02</span>
              <span className="type-h3 text-left text-ink-900">Consumibles</span>
            </NavLink>

            {/* 03 NOSOTROS */}
            <NavLink
              to="/nosotros"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                transitionDelay: mobileMenuOpen ? '440ms' : '0ms',
              }}
              className={({ isActive }) =>
                `flex items-baseline gap-[16px] transition-all duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileMenuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-[16px] opacity-0'
                } ${
                  isActive ? 'text-ink-900 font-medium' : 'text-steel-500 hover:text-ink-900'
                }`
              }
            >
              <span className="type-label text-gold-700">03</span>
              <span className="type-h3 text-left text-ink-900">Nosotros</span>
            </NavLink>
          </div>

          {/* Full-width CTA */}
          <div
            style={{
              transitionDelay: mobileMenuOpen ? '500ms' : '0ms',
            }}
            className={`w-full pt-[32px] transition-all duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              mobileMenuOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-[16px] opacity-0'
            }`}
          >
            <NavLink
              to="/cotizar"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `type-label block w-full py-[14px] text-center rounded-full border transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? 'bg-gold-700 border-gold-700 text-paper'
                    : 'bg-gold-500 border-gold-500 text-ink-900 hover:bg-gold-700 hover:border-gold-700 hover:text-paper'
                }`
              }
            >
              Cotizar
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
