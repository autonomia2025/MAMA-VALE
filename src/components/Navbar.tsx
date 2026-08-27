import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  { name: 'Contrapesos', href: '/contrapesos', index: '01' },
  { name: 'Aplicaciones', href: '/aplicaciones', index: '02' },
  { name: 'Catálogo', href: '/contrapesos#catalogo', index: '03' },
  { name: 'Nosotros', href: '/nosotros', index: '04' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
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

  // Handle Escape key and focus trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!mobileMenuOpen) return;

      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && overlayRef.current) {
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
    [mobileMenuOpen]
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
            : 'h-[80px] bg-transparent border-b border-line/35'
        }`}
      >
        {/* Inner edge reflection: 1px in paper at 50% right above bottom border */}
        <div
          aria-hidden="true"
          className={`absolute bottom-[1px] left-0 right-0 h-[1px] bg-paper/50 pointer-events-none transition-opacity duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="layout-container h-full flex items-center justify-between">
          {/* Wordmark */}
          <Link
            to="/"
            className="flex items-baseline focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
            aria-label="Maquinarias JVK — Inicio"
          >
            <span
              className={`font-medium tracking-[0.12em] text-ink-900 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? 'text-[14px]' : 'text-[16px]'
              }`}
            >
              MAQUINARIAS
            </span>
            <span
              className={`text-ink-900 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? 'text-[14px]' : 'text-[16px]'
              }`}
            >
              &thinsp;
            </span>
            <span
              className={`font-bold italic text-ink-900 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? 'text-[14px]' : 'text-[16px]'
              }`}
            >
              JVK
            </span>
          </Link>

          {/* Desktop Navigation (900px and up) */}
          <div className="hidden min-[900px]:flex items-center gap-[32px]">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `group relative py-[8px] type-label text-left transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'text-ink-900' : 'text-ink-900/70 hover:text-ink-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.name}</span>
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500 origin-left transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}

            {/* CTA Cotizar */}
            <NavLink
              to="/cotizar"
              className={({ isActive }) =>
                `type-label px-[28px] rounded-full border border-gold-500 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isScrolled ? 'py-[10px]' : 'py-[14px]'
                } ${
                  isActive
                    ? 'bg-ink-900 border-ink-900 text-paper'
                    : 'bg-transparent text-gold-700 hover:bg-ink-900 hover:border-ink-900 hover:text-paper'
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
            className="flex min-[900px]:hidden flex-col justify-center items-center w-[44px] h-[44px] text-ink-900 focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2 z-50"
          >
            <div className="relative w-[20px] h-[14px]">
              <span
                className={`absolute left-0 w-[20px] h-[1.5px] bg-ink-900 transition-transform duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileMenuOpen
                    ? 'top-[6px] rotate-45'
                    : 'top-0 rotate-0'
                }`}
              />
              <span
                className={`absolute left-0 w-[20px] h-[1.5px] bg-ink-900 transition-transform duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileMenuOpen
                    ? 'top-[6px] -rotate-45'
                    : 'bottom-0 rotate-0'
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
        className={`fixed inset-0 z-40 mobile-menu-glass flex flex-col min-[900px]:hidden transition-opacity duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top spacer matching navbar height */}
        <div className="h-[80px] w-full" />

        {/* Content container */}
        <div className="layout-container flex-1 flex flex-col justify-between pt-[32px] pb-[48px]">
          {/* Stacked Links */}
          <div className="flex flex-col gap-[32px]">
            {NAV_ITEMS.map((item, i) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  transitionDelay: mobileMenuOpen ? `${i * 60}ms` : '0ms',
                }}
                className={({ isActive }) =>
                  `flex items-baseline gap-[16px] transition-all duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    mobileMenuOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-[16px] opacity-0'
                  } ${isActive ? 'text-ink-900 font-medium' : 'text-steel-500 hover:text-ink-900'}`
                }
              >
                <span className="type-label text-gold-700">{item.index}</span>
                <span className="type-h3 text-left text-ink-900">{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Full-width CTA */}
          <div
            style={{
              transitionDelay: mobileMenuOpen ? `${NAV_ITEMS.length * 60}ms` : '0ms',
            }}
            className={`w-full transition-all duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              mobileMenuOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-[16px] opacity-0'
            }`}
          >
            <NavLink
              to="/cotizar"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `type-label block w-full py-[14px] text-center rounded-full border border-gold-500 transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? 'bg-ink-900 border-ink-900 text-paper'
                    : 'bg-transparent text-gold-700 hover:bg-ink-900 hover:border-ink-900 hover:text-paper'
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
