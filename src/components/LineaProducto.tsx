import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface ProductSpec {
  label: string;
  value: string;
}

interface ProductItem {
  id: string;
  name: string;
  description: string;
  specs: ProductSpec[];
  svgType: 'steel-clip' | 'alloy-clip' | 'adhesive-roll';
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'clip-on-acero',
    name: 'Clip-on acero',
    description: 'Montaje a presión sobre el borde de la llanta. La opción estándar en llanta de acero.',
    specs: [
      { label: 'MATERIAL', value: 'Zinc' },
      { label: 'GRAMAJE', value: '5 – 60 g' },
      { label: 'MONTAJE', value: 'A presión' },
    ],
    svgType: 'steel-clip',
  },
  {
    id: 'clip-on-aluminio',
    name: 'Clip-on aluminio',
    description: 'Perfil bajo y clip de curvatura cerrada, para no dañar el acabado de la llanta.',
    specs: [
      { label: 'MATERIAL', value: 'Zinc' },
      { label: 'GRAMAJE', value: '5 – 60 g' },
      { label: 'MONTAJE', value: 'A presión' },
    ],
    svgType: 'alloy-clip',
  },
  {
    id: 'adhesivo-rollo',
    name: 'Adhesivo en rollo',
    description: 'Tira segmentada de aplicación interna. Se corta al gramaje exacto que pide la rueda.',
    specs: [
      { label: 'MATERIAL', value: 'Zinc' },
      { label: 'SEGMENTO', value: '5 g' },
      { label: 'MONTAJE', value: 'Adhesivo' },
    ],
    svgType: 'adhesive-roll',
  },
];

interface TechnicalDrawingProps {
  type: 'steel-clip' | 'alloy-clip' | 'adhesive-roll';
  isRevealed: boolean;
  colIndex: number;
  prefersReducedMotion: boolean;
}

function TechnicalDrawing({
  type,
  isRevealed,
  colIndex,
  prefersReducedMotion,
}: TechnicalDrawingProps) {
  const animDelayMs = 200 + colIndex * 140;
  const cotaDelayMs = animDelayMs + 600;

  return (
    <div className="w-full aspect-[4/3] max-md:aspect-[3/2] flex items-center justify-center select-none py-2">
      <svg
        viewBox="0 0 280 190"
        className="w-full h-full max-w-[280px] max-h-[190px] overflow-visible block"
        fill="none"
        aria-hidden="true"
      >
        {/* Steel Clip Blueprint */}
        {type === 'steel-clip' && (
          <>
            <g
              className="text-ink-900 group-hover:text-gold-700 transition-colors duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: prefersReducedMotion ? 'none' : 600,
                strokeDashoffset: isRevealed || prefersReducedMotion ? 0 : 600,
                transition: prefersReducedMotion
                  ? 'none'
                  : `stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1) ${animDelayMs}ms, color 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            >
              {/* Main counterweight body */}
              <path d="M 75 130 L 75 90 C 75 75, 88 65, 105 65 L 175 65 C 192 65, 205 75, 205 90 L 205 130 Z" />
              {/* Inner construction chamfer line */}
              <path d="M 85 130 L 85 92 C 85 82, 94 75, 105 75 L 175 75 C 186 75, 195 82, 195 92 L 195 130" />
              
              {/* Steel Spring Clip hook */}
              <path d="M 125 65 L 125 38 C 125 24, 142 16, 155 24 C 165 30, 168 44, 168 56 L 168 65" />
              <path d="M 132 65 L 132 40 C 132 30, 142 24, 152 30 C 160 35, 162 45, 162 65" />
              
              {/* Clip mounting rivet / notch indicator */}
              <circle cx="140" cy="50" r="2.5" />
            </g>

            {/* Dimension Line (Cota) */}
            <g
              stroke="#C89B32"
              strokeWidth="1"
              className="opacity-50 group-hover:opacity-100 transition-opacity duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                strokeDasharray: prefersReducedMotion ? 'none' : 200,
                strokeDashoffset: isRevealed || prefersReducedMotion ? 0 : 200,
                transition: prefersReducedMotion
                  ? 'none'
                  : `stroke-dashoffset 300ms cubic-bezier(0.16, 1, 0.3, 1) ${cotaDelayMs}ms, opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            >
              {/* Horizontal cota line */}
              <line x1="75" y1="152" x2="205" y2="152" />
              {/* Left extension line & tick */}
              <line x1="75" y1="138" x2="75" y2="158" />
              {/* Right extension line & tick */}
              <line x1="205" y1="138" x2="205" y2="158" />
            </g>
          </>
        )}

        {/* Alloy Clip Blueprint */}
        {type === 'alloy-clip' && (
          <>
            <g
              className="text-ink-900 group-hover:text-gold-700 transition-colors duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: prefersReducedMotion ? 'none' : 600,
                strokeDashoffset: isRevealed || prefersReducedMotion ? 0 : 600,
                transition: prefersReducedMotion
                  ? 'none'
                  : `stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1) ${animDelayMs}ms, color 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            >
              {/* Lower profile streamlined body */}
              <path d="M 65 130 L 65 98 C 65 84, 82 78, 102 78 L 178 78 C 198 78, 215 84, 215 98 L 215 130 Z" />
              {/* Inner bevel groove */}
              <path d="M 75 130 L 75 100 C 75 90, 88 86, 104 86 L 176 86 C 192 86, 205 90, 205 100 L 205 130" />
              
              {/* Alloy tight-curve precision clip */}
              <path d="M 120 78 L 120 46 C 120 30, 134 22, 146 22 C 158 22, 168 32, 168 46 L 168 54 C 168 62, 164 68, 158 72 L 154 78" />
              <path d="M 126 78 L 126 48 C 126 36, 135 28, 146 28 C 155 28, 162 36, 162 48 L 162 54 C 162 58, 159 62, 155 65 L 148 78" />
              
              {/* Alignment marker */}
              <line x1="140" y1="92" x2="140" y2="116" strokeDasharray="3 3" />
            </g>

            {/* Dimension Line (Cota) */}
            <g
              stroke="#C89B32"
              strokeWidth="1"
              className="opacity-50 group-hover:opacity-100 transition-opacity duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                strokeDasharray: prefersReducedMotion ? 'none' : 200,
                strokeDashoffset: isRevealed || prefersReducedMotion ? 0 : 200,
                transition: prefersReducedMotion
                  ? 'none'
                  : `stroke-dashoffset 300ms cubic-bezier(0.16, 1, 0.3, 1) ${cotaDelayMs}ms, opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            >
              {/* Horizontal cota line */}
              <line x1="65" y1="152" x2="215" y2="152" />
              {/* Left extension line & tick */}
              <line x1="65" y1="138" x2="65" y2="158" />
              {/* Right extension line & tick */}
              <line x1="215" y1="138" x2="215" y2="158" />
            </g>
          </>
        )}

        {/* Adhesive Roll Blueprint */}
        {type === 'adhesive-roll' && (
          <>
            <g
              className="text-ink-900 group-hover:text-gold-700 transition-colors duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: prefersReducedMotion ? 'none' : 750,
                strokeDashoffset: isRevealed || prefersReducedMotion ? 0 : 750,
                transition: prefersReducedMotion
                  ? 'none'
                  : `stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1) ${animDelayMs}ms, color 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            >
              {/* 5 Flat Segments on the left */}
              {/* Outer border of straight strip */}
              <rect x="40" y="85" width="135" height="35" rx="1" />
              
              {/* Segment separation cut lines */}
              <line x1="67" y1="85" x2="67" y2="120" strokeDasharray="3 2" />
              <line x1="94" y1="85" x2="94" y2="120" strokeDasharray="3 2" />
              <line x1="121" y1="85" x2="121" y2="120" strokeDasharray="3 2" />
              <line x1="148" y1="85" x2="148" y2="120" strokeDasharray="3 2" />
              
              {/* Segment inner weight mark */}
              <circle cx="53.5" cy="102.5" r="1.5" />
              <circle cx="80.5" cy="102.5" r="1.5" />
              <circle cx="107.5" cy="102.5" r="1.5" />
              <circle cx="134.5" cy="102.5" r="1.5" />
              <circle cx="161.5" cy="102.5" r="1.5" />

              {/* Spiral coiling on the right end (2 turns) */}
              {/* Top layer unspooling curve */}
              <path d="M 175 85 C 198 85, 218 95, 226 112 C 234 130, 222 152, 202 154 C 182 156, 168 140, 172 122 C 176 106, 194 98, 208 104 C 218 108, 222 120, 218 130" />
              {/* Bottom tape backing line */}
              <path d="M 175 120 C 188 120, 198 126, 202 136 C 206 145, 198 152, 190 150 C 182 148, 178 138, 182 128 C 186 118, 198 114, 206 118" />
            </g>

            {/* Dimension Line (Cota measuring a single 5g segment) */}
            <g
              stroke="#C89B32"
              strokeWidth="1"
              className="opacity-50 group-hover:opacity-100 transition-opacity duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                strokeDasharray: prefersReducedMotion ? 'none' : 100,
                strokeDashoffset: isRevealed || prefersReducedMotion ? 0 : 100,
                transition: prefersReducedMotion
                  ? 'none'
                  : `stroke-dashoffset 300ms cubic-bezier(0.16, 1, 0.3, 1) ${cotaDelayMs}ms, opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            >
              {/* Horizontal cota line under segment 1 */}
              <line x1="40" y1="142" x2="67" y2="142" />
              {/* Left tick */}
              <line x1="40" y1="128" x2="40" y2="148" />
              {/* Right tick */}
              <line x1="67" y1="128" x2="67" y2="148" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}

export default function LineaProducto() {
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
      aria-label="Línea de producto"
      className="w-full bg-mist section-padding overflow-x-clip"
    >
      <div className="layout-container">
        {/* Encabezado de Sección */}
        <div
          className="transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: isRevealed || prefersReducedMotion ? 1 : 0,
            transform:
              isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          {/* Desktop Layout (≥ 1024px / lg) */}
          <div className="hidden lg:grid grid-cols-12 gap-[24px] items-end">
            {/* Columnas 1 a 7: Eyebrow + Titular */}
            <div className="col-span-7 flex flex-col gap-[24px]">
              <span className="type-label text-gold-700">LÍNEA DE PRODUCTO</span>
              <h2 className="type-h2 text-ink-900 m-0">
                Tres piezas<br />
                para tres llantas.
              </h2>
            </div>

            {/* Columnas 9 a 12: Párrafo de apoyo alineado a la base */}
            <div className="col-start-9 col-span-4 pb-[4px]">
              <p className="type-body-sm text-steel-500 m-0 leading-[1.6]">
                El material de la llanta define el tipo de contrapeso. Cada pieza está pensada para un montaje distinto.
              </p>
            </div>
          </div>

          {/* Tablet & Mobile Layout */}
          <div className="flex lg:hidden flex-col gap-[24px]">
            <span className="type-label text-gold-700">LÍNEA DE PRODUCTO</span>
            <h2 className="type-h2 text-ink-900 m-0">
              Tres piezas<br />
              para tres llantas.
            </h2>
            <p className="type-body-sm text-steel-500 m-0 max-w-[540px] leading-[1.6]">
              El material de la llanta define el tipo de contrapeso. Cada pieza está pensada para un montaje distinto.
            </p>
          </div>
        </div>

        {/* Separación de 96px antes de la retícula de productos */}
        <div className="h-[64px] md:h-[96px]" />

        {/* Retícula de Productos */}
        {/* Desktop (lg): 3 columnas de 4 unidades con 2 divisores verticales en line */}
        <div className="hidden lg:grid grid-cols-12 gap-[24px] relative">
          {PRODUCTS.map((product, index) => {
            const colDelayMs = index * 140;

            return (
              <div
                key={product.id}
                className={`col-span-4 flex flex-col relative ${
                  index > 0 ? 'before:absolute before:left-[-12px] before:top-0 before:bottom-0 before:w-[1px] before:bg-line' : ''
                }`}
              >
                <Link
                  to="/contrapesos"
                  aria-label={`${product.name} — Ver detalle`}
                  style={{
                    opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                    transform:
                      isRevealed || prefersReducedMotion
                        ? 'translateY(0)'
                        : 'translateY(16px)',
                    transition: prefersReducedMotion
                      ? 'none'
                      : `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${colDelayMs}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${colDelayMs}ms`,
                  }}
                  className="group flex flex-col h-full focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  {/* 1. Dibujo técnico (proporción 4:3) */}
                  <TechnicalDrawing
                    type={product.svgType}
                    isRevealed={isRevealed}
                    colIndex={index}
                    prefersReducedMotion={prefersReducedMotion}
                  />

                  {/* 2. Filete divisor horizontal: 40px de aire sobre él */}
                  <div className="w-full border-t border-line mt-[40px]" />

                  {/* 3. Nombre: 24px de aire */}
                  <h3 className="type-h3 text-ink-900 mt-[24px] mb-0">
                    {product.name}
                  </h3>

                  {/* 4. Descripción: 12px de aire, max 2 líneas */}
                  <p className="type-body-sm text-steel-500 mt-[12px] mb-0 leading-[1.55]">
                    {product.description}
                  </p>

                  {/* 5. Ficha técnica: 32px de aire */}
                  <div className="mt-[32px] flex flex-col gap-[12px]">
                    {product.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-baseline justify-between w-full"
                      >
                        <span className="type-label text-steel-500">
                          {spec.label}
                        </span>
                        <span className="type-data text-ink-900">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 6. Enlace: 32px de aire */}
                  <div className="mt-[32px] pt-[4px] flex items-center">
                    <span className="type-label inline-flex items-center gap-[4px] text-gold-700">
                      <span>Ver detalle</span>
                      <span className="inline-block transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                        ↗
                      </span>
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Tablet (md a lg): 2 columnas en primera fila, 3ra columna en segunda fila */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-x-[32px] gap-y-[48px]">
          {PRODUCTS.map((product, index) => {
            const colDelayMs = index * 140;

            return (
              <div
                key={product.id}
                className={`col-span-1 flex flex-col ${
                  index === 2 ? 'border-t border-line pt-[48px]' : ''
                }`}
              >
                <Link
                  to="/contrapesos"
                  aria-label={`${product.name} — Ver detalle`}
                  style={{
                    opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                    transform:
                      isRevealed || prefersReducedMotion
                        ? 'translateY(0)'
                        : 'translateY(16px)',
                    transition: prefersReducedMotion
                      ? 'none'
                      : `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${colDelayMs}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${colDelayMs}ms`,
                  }}
                  className="group flex flex-col h-full focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  {/* 1. Dibujo técnico */}
                  <TechnicalDrawing
                    type={product.svgType}
                    isRevealed={isRevealed}
                    colIndex={index}
                    prefersReducedMotion={prefersReducedMotion}
                  />

                  {/* 2. Filete divisor */}
                  <div className="w-full border-t border-line mt-[40px]" />

                  {/* 3. Nombre */}
                  <h3 className="type-h3 text-ink-900 mt-[24px] mb-0">
                    {product.name}
                  </h3>

                  {/* 4. Descripción */}
                  <p className="type-body-sm text-steel-500 mt-[12px] mb-0 leading-[1.55]">
                    {product.description}
                  </p>

                  {/* 5. Ficha técnica */}
                  <div className="mt-[32px] flex flex-col gap-[12px]">
                    {product.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-baseline justify-between w-full"
                      >
                        <span className="type-label text-steel-500">
                          {spec.label}
                        </span>
                        <span className="type-data text-ink-900">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 6. Enlace */}
                  <div className="mt-[32px] pt-[4px] flex items-center">
                    <span className="type-label inline-flex items-center gap-[4px] text-gold-700">
                      <span>Ver detalle</span>
                      <span className="inline-block transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                        ↗
                      </span>
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Mobile (< 768px): 1 columna apilada con filete horizontal de separación */}
        <div className="flex md:hidden flex-col">
          {PRODUCTS.map((product, index) => {
            const colDelayMs = index * 140;

            return (
              <div
                key={product.id}
                className={index > 0 ? 'border-t border-line mt-[48px] pt-[48px]' : ''}
              >
                <Link
                  to="/contrapesos"
                  aria-label={`${product.name} — Ver detalle`}
                  style={{
                    opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                    transform:
                      isRevealed || prefersReducedMotion
                        ? 'translateY(0)'
                        : 'translateY(16px)',
                    transition: prefersReducedMotion
                      ? 'none'
                      : `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${colDelayMs}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${colDelayMs}ms`,
                  }}
                  className="flex flex-col focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  {/* 1. Dibujo técnico (proporción 3:2 en mobile) */}
                  <TechnicalDrawing
                    type={product.svgType}
                    isRevealed={isRevealed}
                    colIndex={index}
                    prefersReducedMotion={prefersReducedMotion}
                  />

                  {/* 2. Filete divisor */}
                  <div className="w-full border-t border-line mt-[32px]" />

                  {/* 3. Nombre */}
                  <h3 className="type-h3 text-ink-900 mt-[24px] mb-0">
                    {product.name}
                  </h3>

                  {/* 4. Descripción */}
                  <p className="type-body-sm text-steel-500 mt-[12px] mb-0 leading-[1.55]">
                    {product.description}
                  </p>

                  {/* 5. Ficha técnica */}
                  <div className="mt-[32px] flex flex-col gap-[12px]">
                    {product.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-baseline justify-between w-full"
                      >
                        <span className="type-label text-steel-500">
                          {spec.label}
                        </span>
                        <span className="type-data text-ink-900">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 6. Enlace */}
                  <div className="mt-[32px] pt-[4px] flex items-center">
                    <span className="type-label inline-flex items-center gap-[4px] text-gold-700">
                      <span>Ver detalle ↗</span>
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
