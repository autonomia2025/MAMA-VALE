import { useEffect, useRef, useState } from 'react';

interface PillarItem {
  id: string;
  name: string;
  affirmation: string;
  data: string;
  label: string;
}

const PILLARS: PillarItem[] = [
  {
    id: 'calidad',
    name: 'Calidad',
    affirmation: 'Zinc de composición estable, sin desprendimiento del recubrimiento ni pérdida de adherencia con el tiempo.',
    data: 'Zinc',
    label: 'MATERIAL ÚNICO',
  },
  {
    id: 'precision',
    name: 'Precisión',
    affirmation: 'Tolerancia controlada pieza por pieza. El gramaje estampado es el gramaje real.',
    data: '± 1 g',
    label: 'TOLERANCIA',
  },
  {
    id: 'confianza',
    name: 'Confianza',
    affirmation: 'Stock permanente en Santiago. No trabajamos contra importación por pedido.',
    data: '24 – 48 h',
    label: 'DESPACHO EN RM',
  },
  {
    id: 'relaciones',
    name: 'Relaciones de largo plazo',
    affirmation: 'Precio por volumen y reposición programada para talleres que compran todos los meses.',
    data: 'Programada',
    label: 'REPOSICIÓN',
  },
];

export default function PorQueJVK() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // IntersectionObserver for reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Por qué elegir JVK"
      className="w-full bg-ink-900 border-b border-paper/15 py-[80px] md:py-[128px] lg:py-[200px] overflow-x-clip"
    >
      <div className="layout-container">
        {/* Encabezado */}
        <div className="flex flex-col">
          {/* Desktop Layout (≥ 1024px / lg) */}
          <div className="hidden lg:grid grid-cols-12 gap-[24px] items-end">
            {/* Columnas 1 a 8: Eyebrow + Titular en 2 líneas con revelado clip-path */}
            <div className="col-span-8 flex flex-col gap-[24px]">
              <span
                className="type-label text-gold-500 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                  transform:
                    isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(12px)',
                }}
              >
                POR QUÉ JVK
              </span>

              <h2 className="type-h1 text-paper m-0">
                <span className="block overflow-hidden py-1">
                  <span
                    className="block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform:
                        isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(110%)',
                    }}
                  >
                    Un gramo de más
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
                    también desbalancea.
                  </span>
                </span>
              </h2>
            </div>

            {/* Columnas 9 a 12: Párrafo de apoyo alineado a la base */}
            <div className="col-start-9 col-span-4 pb-[4px]">
              <p
                className="type-body-sm text-paper/65 m-0 leading-[1.6] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                  transform:
                    isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(12px)',
                  transitionDelay: prefersReducedMotion ? '0ms' : '300ms',
                }}
              >
                Trabajamos con talleres que no pueden permitirse una rueda mal balanceada ni un despacho que no llega.
              </p>
            </div>
          </div>

          {/* Tablet & Mobile Layout (< 1024px) */}
          <div className="flex lg:hidden flex-col gap-[24px]">
            <span
              className="type-label text-gold-500 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                transform:
                  isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              POR QUÉ JVK
            </span>

            <h2 className="type-h1 text-paper m-0">
              <span className="block overflow-hidden py-1">
                <span
                  className="block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform:
                      isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(110%)',
                  }}
                >
                  Un gramo de más
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
                  también desbalancea.
                </span>
              </span>
            </h2>

            <p
              className="type-body-sm text-paper/65 m-0 max-w-[540px] leading-[1.6] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                transform:
                  isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(12px)',
                transitionDelay: prefersReducedMotion ? '0ms' : '300ms',
              }}
            >
              Trabajamos con talleres que no pueden permitirse una rueda mal balanceada ni un despacho que no llega.
            </p>
          </div>
        </div>

        {/* Separación de 128px antes de los pilares (80px tablet, 64px mobile) */}
        <div className="h-[64px] md:h-[80px] lg:h-[128px]" />

        {/* Los Cuatro Pilares */}
        {/* Desktop (lg): 4 columnas de 3 unidades */}
        <div className="hidden lg:grid grid-cols-12 gap-[24px]">
          {PILLARS.map((pillar, index) => {
            const hairlineDelayMs = index * 90;
            const contentDelayMs = hairlineDelayMs + 150;

            return (
              <div
                key={pillar.id}
                className="col-span-3 group flex flex-col justify-between"
              >
                <div>
                  {/* 1. Filete horizontal en gold-500 a ancho de columna */}
                  <div className="w-full h-[2px] flex items-start overflow-hidden">
                    <div
                      className="w-full bg-gold-500 origin-left transition-[height,transform] ease-[cubic-bezier(0.16,1,0.3,1)] h-[1px] group-hover:h-[2px]"
                      style={{
                        transform:
                          isRevealed || prefersReducedMotion ? 'scaleX(1)' : 'scaleX(0)',
                        transitionDuration: '500ms, 260ms',
                        transitionDelay: prefersReducedMotion
                          ? '0ms'
                          : `${hairlineDelayMs}ms, 0ms`,
                      }}
                    />
                  </div>

                  {/* Contenido del pilar */}
                  <div
                    style={{
                      opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                      transform:
                        isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(12px)',
                      transition: prefersReducedMotion
                        ? 'none'
                        : `opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) ${contentDelayMs}ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${contentDelayMs}ms`,
                    }}
                  >
                    {/* 2. Nombre del pilar: 32px de aire */}
                    <h3 className="type-h3 text-paper mt-[32px] mb-0 min-h-[56px] flex items-start">
                      {pillar.name}
                    </h3>

                    {/* 3. Afirmación de respaldo: 16px de aire, máx 3 líneas */}
                    <p className="type-body-sm text-paper/65 group-hover:text-paper/90 transition-colors duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] mt-[16px] mb-0 leading-[1.6]">
                      {pillar.affirmation}
                    </p>
                  </div>
                </div>

                {/* 4. Dato y Etiqueta: 32px de aire */}
                <div
                  className="mt-[32px] pt-[8px] flex flex-col"
                  style={{
                    opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                    transform:
                      isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(12px)',
                    transition: prefersReducedMotion
                      ? 'none'
                      : `opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) ${contentDelayMs}ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${contentDelayMs}ms`,
                  }}
                >
                  <span className="type-data text-gold-500">
                    {pillar.data}
                  </span>
                  <span className="type-label text-paper/50 mt-[6px]">
                    {pillar.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tablet (md a lg): Retícula de 2x2, separación vertical de 80px */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-x-[32px] gap-y-[80px]">
          {PILLARS.map((pillar, index) => {
            const hairlineDelayMs = index * 90;
            const contentDelayMs = hairlineDelayMs + 150;

            return (
              <div
                key={pillar.id}
                className="col-span-1 flex flex-col justify-between"
              >
                <div>
                  {/* 1. Filete horizontal en gold-500 */}
                  <div className="w-full h-[2px] flex items-start overflow-hidden">
                    <div
                      className="w-full bg-gold-500 origin-left h-[1px]"
                      style={{
                        transform:
                          isRevealed || prefersReducedMotion ? 'scaleX(1)' : 'scaleX(0)',
                        transition: prefersReducedMotion
                          ? 'none'
                          : `transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${hairlineDelayMs}ms`,
                      }}
                    />
                  </div>

                  {/* Contenido del pilar */}
                  <div
                    style={{
                      opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                      transform:
                        isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(12px)',
                      transition: prefersReducedMotion
                        ? 'none'
                        : `opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) ${contentDelayMs}ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${contentDelayMs}ms`,
                    }}
                  >
                    {/* 2. Nombre del pilar */}
                    <h3 className="type-h3 text-paper mt-[32px] mb-0 min-h-[32px]">
                      {pillar.name}
                    </h3>

                    {/* 3. Afirmación de respaldo */}
                    <p className="type-body-sm text-paper/65 mt-[16px] mb-0 leading-[1.6] max-w-[480px]">
                      {pillar.affirmation}
                    </p>
                  </div>
                </div>

                {/* 4. Dato y Etiqueta */}
                <div
                  className="mt-[32px] pt-[8px] flex flex-col"
                  style={{
                    opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                    transform:
                      isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(12px)',
                    transition: prefersReducedMotion
                      ? 'none'
                      : `opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) ${contentDelayMs}ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${contentDelayMs}ms`,
                  }}
                >
                  <span className="type-data text-gold-500">
                    {pillar.data}
                  </span>
                  <span className="type-label text-paper/50 mt-[6px]">
                    {pillar.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile (< 768px): 1 pilar por fila, separación vertical de 64px */}
        <div className="flex md:hidden flex-col gap-y-[64px]">
          {PILLARS.map((pillar, index) => {
            const hairlineDelayMs = index * 90;
            const contentDelayMs = hairlineDelayMs + 150;

            return (
              <div
                key={pillar.id}
                className="flex flex-col"
              >
                {/* 1. Filete horizontal en gold-500 */}
                <div className="w-full h-[1px] bg-gold-500 origin-left"
                  style={{
                    transform:
                      isRevealed || prefersReducedMotion ? 'scaleX(1)' : 'scaleX(0)',
                    transition: prefersReducedMotion
                      ? 'none'
                      : `transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${hairlineDelayMs}ms`,
                  }}
                />

                {/* Contenido del pilar */}
                <div
                  style={{
                    opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                    transform:
                      isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(12px)',
                    transition: prefersReducedMotion
                      ? 'none'
                      : `opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) ${contentDelayMs}ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${contentDelayMs}ms`,
                  }}
                >
                  {/* 2. Nombre del pilar */}
                  <h3 className="type-h3 text-paper mt-[24px] mb-0">
                    {pillar.name}
                  </h3>

                  {/* 3. Afirmación de respaldo */}
                  <p className="type-body-sm text-paper/65 mt-[12px] mb-0 leading-[1.6]">
                    {pillar.affirmation}
                  </p>

                  {/* 4. Dato y Etiqueta */}
                  <div className="mt-[24px] flex flex-col">
                    <span className="type-data text-gold-500">
                      {pillar.data}
                    </span>
                    <span className="type-label text-paper/50 mt-[4px]">
                      {pillar.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
