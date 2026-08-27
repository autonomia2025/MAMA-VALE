import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Maquinarias JVK — Equipamiento y Servicios para Talleres Automotrices',
    description: 'Equipamiento, consumibles y servicios técnicos para talleres automotrices, vulcanizadoras y flotas en Chile.',
  },
  '/equipamiento': {
    title: 'Equipamiento — Maquinarias JVK',
    description: 'Líneas completas de equipamiento para talleres automotrices: elevadores, alineadores, desmontadoras, lubricación y redes.',
  },
  '/equipamiento/elevadores': {
    title: 'Elevadores — Maquinarias JVK',
    description: 'Elevadores automotrices de 2 y 4 columnas, tijera y sistemas de elevación para talleres.',
  },
  '/equipamiento/alineadores': {
    title: 'Alineadores — Maquinarias JVK',
    description: 'Sistemas de alineación 3D y computarizada de alta precisión para talleres mecánicos.',
  },
  '/equipamiento/desmontadoras': {
    title: 'Desmontadoras y Balanceadoras — Maquinarias JVK',
    description: 'Desmontadoras y balanceadoras de neumáticos para automóviles, camiones y maquinaria.',
  },
  '/equipamiento/lubricacion': {
    title: 'Equipos de Lubricación — Maquinarias JVK',
    description: 'Sistemas de distribución y extracción de aceites, grasas y fluidos para taller.',
  },
  '/equipamiento/redes': {
    title: 'Redes de Aire y Fluidos — Maquinarias JVK',
    description: 'Instalación y dimensionamiento de redes de aire comprimido y fluidos industriales.',
  },
  '/consumibles': {
    title: 'Consumibles — Maquinarias JVK',
    description: 'Insumos y consumibles técnicos de alta rotación para el trabajo diario de taller.',
  },
  '/consumibles/contrapesos': {
    title: 'Contrapesos — Maquinarias JVK',
    description: 'Línea de contrapesos de zinc tipo clip-on y adhesivos con gramaje estampado para balanceo de precisión.',
  },
  '/proyectos': {
    title: 'Proyectos — Maquinarias JVK',
    description: 'Instalaciones y proyectos de equipamiento para talleres automotrices en Chile.',
  },
  '/nosotros': {
    title: 'Nosotros — Maquinarias JVK',
    description: 'Empresa chilena especializada en equipamiento y provisión técnica continua para talleres automotrices.',
  },
  '/cotizar': {
    title: 'Cotizar — Maquinarias JVK',
    description: 'Solicitud directa de cotización de equipamiento y consumibles para talleres automotrices y flotas.',
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
