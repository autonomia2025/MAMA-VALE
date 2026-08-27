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
  '/catalogo': {
    title: 'Catálogo Técnico — Maquinarias JVK',
    description: 'Especificaciones técnicas, gramajes, tipos de perfil y compatibilidad de contrapesos de balanceo.',
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

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const meta = ROUTE_META[pathname] || ROUTE_META['/'];
    document.title = meta.title;

    const metaDescriptionEl = document.querySelector('meta[name="description"]');
    if (metaDescriptionEl) {
      metaDescriptionEl.setAttribute('content', meta.description);
    }
  }, [pathname]);

  return null;
}
