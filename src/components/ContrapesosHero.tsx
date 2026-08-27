import { useReveal } from '../hooks/useReveal';

export default function ContrapesosHero() {
  const { ref: sectionRef, isRevealed, prefersReducedMotion, getStyle } = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      aria-label="Hero de contrapesos"
      className="w-full bg-paper pt-[56px] pb-[48px] md:pt-[80px] md:pb-[64px] lg:pt-[128px] lg:pb-[96px] overflow-x-clip"
    >
      <div className="layout-container">
        {/* Encabezado Superior */}
        <div>
          {/* Desktop Layout (≥ 1200px / lg) */}
          <div className="hidden lg:grid grid-cols-12 gap-[24px] items-end">
            {/* Columnas 1 a 7 */}
            <div className="col-span-7 flex flex-col gap-[24px]">
              <span
                className="type-label text-gold-700"
                style={getStyle(0)}
              >
                PRODUCTO
              </span>

              <h1 className="type-h1 text-ink-900 m-0">
                <span className="block overflow-hidden py-1">
                  <span
                    className="block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform:
                        isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(110%)',
                    }}
                  >
                    Contrapesos
                  </span>
                </span>
                <span className="block overflow-hidden py-1">
                  <span
                    className="block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform:
                        isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(110%)',
                      transitionDelay: prefersReducedMotion ? '0ms' : '90ms',
                    }}
                  >
                    de zinc.
                  </span>
                </span>
              </h1>
            </div>

            {/* Columnas 9 a 12: Alineado a la línea base de la última línea del titular */}
            <div className="col-start-9 col-span-4 pb-[4px]">
              <p
                className="type-body-sm text-steel-500 m-0 leading-[1.6]"
                style={getStyle(1)}
              >
                Tres tipos de montaje, un rango de 5 a 500 gramos y stock permanente. Filtra por lo que necesitas.
              </p>
            </div>
          </div>

          {/* Tablet Layout (768px a 1199px) */}
          <div className="hidden md:flex lg:hidden flex-col">
            <div className="flex flex-col gap-[24px]">
              <span
                className="type-label text-gold-700"
                style={getStyle(0)}
              >
                PRODUCTO
              </span>

              <h1 className="type-h1 text-ink-900 m-0">
                <span className="block overflow-hidden py-1">
                  <span
                    className="block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform:
                        isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(110%)',
                    }}
                  >
                    Contrapesos
                  </span>
                </span>
                <span className="block overflow-hidden py-1">
                  <span
                    className="block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform:
                        isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(110%)',
                      transitionDelay: prefersReducedMotion ? '0ms' : '90ms',
                    }}
                  >
                    de zinc.
                  </span>
                </span>
              </h1>
            </div>

            {/* Párrafo debajo del titular */}
            <div className="mt-[32px] max-w-[540px]">
              <p
                className="type-body-sm text-steel-500 m-0 leading-[1.6]"
                style={getStyle(1)}
              >
                Tres tipos de montaje, un rango de 5 a 500 gramos y stock permanente. Filtra por lo que necesitas.
              </p>
            </div>
          </div>

          {/* Mobile Layout (< 768px) */}
          <div className="flex md:hidden flex-col gap-[20px]">
            <span
              className="type-label text-gold-700"
              style={getStyle(0)}
            >
              PRODUCTO
            </span>

            <h1 className="type-h1 text-ink-900 m-0">
              <span className="block overflow-hidden py-0.5">
                <span
                  className="block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform:
                      isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(110%)',
                  }}
                >
                  Contrapesos
                </span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span
                  className="block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform:
                      isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(110%)',
                    transitionDelay: prefersReducedMotion ? '0ms' : '90ms',
                  }}
                >
                  de zinc.
                </span>
              </span>
            </h1>

            <p
              className="type-body-sm text-steel-500 m-0 leading-[1.6]"
              style={getStyle(1)}
            >
              Tres tipos de montaje, un rango de 5 a 500 gramos y stock permanente. Filtra por lo que necesitas.
            </p>
          </div>
        </div>

        {/* Fila de Resumen: 80px de aire bajo el titular (64px tablet, 48px mobile) */}
        <div
          className="mt-[48px] md:mt-[64px] lg:mt-[80px]"
          style={getStyle(2)}
        >
          {/* Filete de 1px en line a ancho completo */}
          <div className="w-full border-t border-line" />

          {/* Tres grupos: 32px de aire bajo el filete */}
          <div className="pt-[32px] grid grid-cols-1 md:grid-cols-12 gap-[32px] md:gap-[24px]">
            {/* Grupo 1: Columnas 1 a 3 */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col">
              <span className="type-h3 text-ink-900">
                5 – 500 g
              </span>
              <span className="type-label text-steel-500 mt-[8px]">
                RANGO DE GRAMAJE
              </span>
            </div>

            {/* Grupo 2: Columnas 5 a 7 */}
            <div className="md:col-start-5 md:col-span-4 lg:col-start-5 lg:col-span-3 flex flex-col">
              <span className="type-h3 text-ink-900">
                3
              </span>
              <span className="type-label text-steel-500 mt-[8px]">
                TIPOS DE MONTAJE
              </span>
            </div>

            {/* Grupo 3: Columnas 9 a 11 */}
            <div className="md:col-start-9 md:col-span-4 lg:col-start-9 lg:col-span-3 flex flex-col">
              <span className="type-h3 text-ink-900">
                Zinc
              </span>
              <span className="type-label text-steel-500 mt-[8px]">
                MATERIAL ÚNICO
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
