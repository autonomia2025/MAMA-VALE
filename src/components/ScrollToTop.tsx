import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Maquinarias JVK — Contrapesos para Balanceo de Neumáticos',
    description: 'Provisión técnica de contrapesos de zinc clip-on y adhesivos para el sector automotriz, transporte pesado y maquinaria en Chile.',
  },
  '/contrapesos': {
    title: 'Contrapesos — Maquinarias JVK',
    description: 'Línea de contrapesos de zinc tipo clip-on y adhesivos con gramaje estampado para balanceo de precisión.',
  },
  '/aplicaciones': {
    title: 'Aplicaciones — Maquinarias JVK',
    description: 'Soluciones de balanceo para flotas automotrices, transporte de carga pesada y maquinaria industrial.',
  },
  '/nosotros': {
    title: 'Nosotros — Maquinarias JVK',
    description: 'Empresa chilena especializada en provisión técnica y disponibilidad continua de insumos de balanceo.',
  },
  '/cotizar': {
    title: 'Cotizar — Maquinarias JVK',
    description: 'Solicitud directa de cotización de contrapesos para vulcanizadoras, talleres y jefes de flota.',
  },
};

// Altura del navbar (80px) + 24px de desfase superior = 104px
const NAVBAR_OFFSET_PX = 104;

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const meta = ROUTE_META[pathname] || ROUTE_META['/'];
    document.title = meta.title;

    const metaDescriptionEl = document.querySelector('meta[name="description"]');
    if (metaDescriptionEl) {
      metaDescriptionEl.setAttribute('content', meta.description);
    }

    if (hash) {
      const targetId = hash.replace(/^#/, '');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const performScroll = () => {
        const el = document.getElementById(targetId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const targetY = Math.max(0, rect.top + window.scrollY - NAVBAR_OFFSET_PX);
          window.scrollTo({
            top: targetY,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
          return true;
        }
        return false;
      };

      if (!performScroll()) {
        // Si el elemento aún no está en el DOM (renderizado inicial de página), intentar en el siguiente frame o timeout corto
        const rafId = requestAnimationFrame(() => {
          if (!performScroll()) {
            const timeoutId = setTimeout(() => {
              if (!performScroll()) {
                window.scrollTo(0, 0);
              }
            }, 80);
            return () => clearTimeout(timeoutId);
          }
        });
        return () => cancelAnimationFrame(rafId);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
