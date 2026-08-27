import { useRef } from 'react';
import { Link } from 'react-router-dom';
import GramScale from './GramScale';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      aria-label="Presentación principal"
      className="relative w-full bg-paper flex flex-col justify-between overflow-hidden min-h-[640px] md:min-h-[720px] md:max-h-[960px] md:h-screen pt-[100px] pb-[48px] md:pt-[110px] md:pb-[64px]"
    >
      <div className="layout-container h-full flex-1 flex flex-col justify-between">
        {/* BLOQUE SUPERIOR — Eyebrow + Hairline */}
        <div className="w-full flex items-center min-w-0">
          <div className="grid-base w-full items-center">
            <div className="col-span-12 md:col-span-8 lg:col-span-6 flex items-center gap-[12px] sm:gap-[16px] min-w-0">
              <span className="type-label text-gold-700 anim-hero-eyebrow text-[9.5px] xs:text-[10px] sm:text-[11px] tracking-[0.06em] sm:tracking-[0.10em] truncate sm:whitespace-nowrap">
                CONTRAPESOS PARA BALANCEO DE NEUMÁTICOS
              </span>
              <div className="h-[1px] bg-gold-500 flex-1 anim-hero-hairline min-w-[12px] hidden xs:block" />
            </div>
          </div>
        </div>

        {/* BLOQUE CENTRAL — Titular y Apoyo (ópticamente centrado hacia arriba) */}
        <div className="w-full my-auto py-[32px] md:py-[40px] md:-translate-y-[16px]">
          {/* Desktop Layout (≥1200px / lg) */}
          <div className="hidden lg:grid grid-cols-12 gap-[24px] items-end">
            {/* Titular: Columnas 1 a 8 */}
            <div className="col-span-8">
              <h1 className="type-display text-ink-900 m-0">
                <span className="block overflow-hidden py-1">
                  <span className="block anim-hero-title-1">El equilibrio</span>
                </span>
                <span className="block overflow-hidden py-1">
                  <span className="block anim-hero-title-2">se mide</span>
                </span>
                <span className="block overflow-hidden py-1">
                  <span className="block anim-hero-title-3">
                    en <span className="italic font-bold">gramos.</span>
                  </span>
                </span>
              </h1>
            </div>

            {/* Párrafo de apoyo y Acciones: Columnas 9 a 12, alineado abajo */}
            <div className="col-span-4 self-end flex flex-col justify-end anim-hero-body">
              <p className="type-body text-steel-500 m-0 max-w-[380px] leading-[1.6]">
                Contrapesos de zinc para automóviles, transporte pesado y maquinaria. Gramaje exacto, adherencia garantizada, stock permanente en Santiago.
              </p>

              <div className="mt-[32px] flex items-center gap-[24px]">
                <Link
                  to="/catalogo"
                  className="type-label inline-flex items-center justify-center py-[16px] px-[32px] rounded-full bg-ink-900 text-paper hover:bg-ink-900/90 hover:-translate-y-[2px] transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  Ver catálogo técnico
                </Link>
                <Link
                  to="/cotizar"
                  className="type-label group relative inline-flex items-center gap-[4px] text-gold-700 py-[4px] transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  <span>Cotizar</span>
                  <span className="inline-block transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                    ↗
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Tablet Layout (768px a 1199px) */}
          <div className="hidden md:flex lg:hidden flex-col">
            <div className="w-full max-w-[85%]">
              <h1 className="type-display text-ink-900 m-0">
                <span className="block overflow-hidden py-1">
                  <span className="block anim-hero-title-1">El equilibrio</span>
                </span>
                <span className="block overflow-hidden py-1">
                  <span className="block anim-hero-title-2">se mide</span>
                </span>
                <span className="block overflow-hidden py-1">
                  <span className="block anim-hero-title-3">
                    en <span className="italic font-bold">gramos.</span>
                  </span>
                </span>
              </h1>
            </div>

            <div className="mt-[48px] max-w-[600px] anim-hero-body">
              <p className="type-body text-steel-500 m-0">
                Contrapesos de zinc para automóviles, transporte pesado y maquinaria. Gramaje exacto, adherencia garantizada, stock permanente en Santiago.
              </p>

              <div className="mt-[32px] flex items-center gap-[24px]">
                <Link
                  to="/catalogo"
                  className="type-label inline-flex items-center justify-center py-[16px] px-[32px] rounded-full bg-ink-900 text-paper hover:bg-ink-900/90 hover:-translate-y-[2px] transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  Ver catálogo técnico
                </Link>
                <Link
                  to="/cotizar"
                  className="type-label group relative inline-flex items-center gap-[4px] text-gold-700 py-[4px] transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  <span>Cotizar</span>
                  <span className="inline-block transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                    ↗
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Layout (< 768px) */}
          <div className="flex md:hidden flex-col">
            <div className="w-full">
              <h1 className="type-display text-ink-900 m-0 text-[42px] leading-[1.0]">
                <span className="block overflow-hidden py-0.5">
                  <span className="block anim-hero-title-1">El equilibrio</span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <span className="block anim-hero-title-2">se mide</span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <span className="block anim-hero-title-3">
                    en <span className="italic font-bold">gramos.</span>
                  </span>
                </span>
              </h1>
            </div>

            <div className="mt-[32px] w-full anim-hero-body">
              <p className="type-body text-steel-500 m-0">
                Contrapesos de zinc para automóviles, transporte pesado y maquinaria. Gramaje exacto, adherencia garantizada, stock permanente en Santiago.
              </p>

              <div className="mt-[32px] flex flex-col items-stretch gap-[16px]">
                <Link
                  to="/catalogo"
                  className="type-label w-full py-[16px] px-[24px] text-center rounded-full bg-ink-900 text-paper hover:bg-ink-900/90 transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  Ver catálogo técnico
                </Link>
                <Link
                  to="/cotizar"
                  className="type-label group relative inline-flex items-center justify-start gap-[4px] text-gold-700 py-[8px] transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  <span>Cotizar</span>
                  <span className="inline-block transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                    ↗
                  </span>
                  <span className="absolute bottom-0 left-0 w-[64px] h-[1px] bg-gold-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE INFERIOR — Escala de Gramaje */}
        <div className="w-full pt-[24px]">
          <GramScale heroRef={heroRef} />
        </div>
      </div>
    </section>
  );
}
