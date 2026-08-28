// NOTA: Este componente se encuentra desmontado de la Home en favor del nuevo eje de Equipamiento (<LineasEquipamiento />).
// Su contenido de rangos por gramaje se reutilizará dentro de la página de contrapesos (/consumibles/contrapesos).

import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

interface SectorItem {
  id: string;
  name: string;
  description: string;
  rangeText: string;
  startPct: number; // 0-100 based on 500g
  endPct: number;   // 0-100 based on 500g
}

const SECTORS: SectorItem[] = [
  {
    id: 'automotriz',
    name: 'Automotriz',
    description: 'Automóviles de pasajeros, SUV y camionetas.',
    rangeText: '5 – 60 g',
    startPct: 1,  // 5g / 500g = 1%
    endPct: 12,   // 60g / 500g = 12%
  },
  {
    id: 'transporte-pesado',
    name: 'Transporte pesado',
    description: 'Camiones, buses, remolques y semirremolques.',
    rangeText: '50 – 300 g',
    startPct: 10, // 50g / 500g = 10%
    endPct: 60,   // 300g / 500g = 60%
  },
  {
    id: 'maquinaria',
    name: 'Maquinaria',
    description: 'Equipos de faena, agrícolas e industriales.',
    rangeText: '100 – 500 g',
    startPct: 20, // 100g / 500g = 20%
    endPct: 100,  // 500g / 500g = 100%
  },
];

interface RangeBarProps {
  startPct: number;
  endPct: number;
  isRevealed: boolean;
  rowIndex: number;
  prefersReducedMotion: boolean;
}

function RangeBar({
  startPct,
  endPct,
  isRevealed,
  rowIndex,
  prefersReducedMotion,
}: RangeBarProps) {
  const widthPct = endPct - startPct;
  const clampedIndex = Math.min(rowIndex + 1, 4);
  const animDelayMs = clampedIndex * 80 + 100;

  return (
    <div className="relative w-full h-[24px] flex items-center select-none">
      <svg
        width="100%"
        height="24"
        className="overflow-visible block w-full"
        aria-hidden="true"
      >
        {/* Total Range Rail (0 to 500g) */}
        <line
          x1="0%"
          y1="12"
          x2="100%"
          y2="12"
          stroke="#D8DADC"
          strokeWidth="1"
        />

        {/* Proportional Range Segment + End Ticks */}
        <g
          style={{
            transformOrigin: `${startPct}% 12px`,
            transform: isRevealed || prefersReducedMotion ? 'scaleX(1)' : 'scaleX(0)',
            transition: prefersReducedMotion
              ? 'none'
              : `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${animDelayMs}ms`,
          }}
        >
          {/* Main Range Line */}
          <line
            x1={`${startPct}%`}
            y1="12"
            x2={`${endPct}%`}
            y2="12"
            stroke="#C89B32"
            className="transition-[stroke-width] duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] stroke-[3px] group-hover:stroke-[5px]"
          />

          {/* Left Tick Mark (10px height centered at y=12) */}
          <line
            x1={`${startPct}%`}
            y1="7"
            x2={`${startPct}%`}
            y2="17"
            stroke="#C89B32"
            strokeWidth="1.5"
          />

          {/* Right Tick Mark (10px height centered at y=12) */}
          <line
            x1={`${endPct}%`}
            y1="7"
            x2={`${endPct}%`}
            y2="17"
            stroke="#C89B32"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
}

export default function Aplicaciones() {
  const { ref: sectionRef, isRevealed, prefersReducedMotion, getStyle } = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      aria-label="Aplicaciones por sector"
      className="w-full bg-paper section-padding overflow-x-clip"
    >
      <div className="layout-container">
        {/* Encabezado de Sección */}
        <div style={getStyle(0)}>
          {/* Desktop & Tablet Header Layout */}
          <div className="hidden lg:grid grid-cols-12 gap-[24px] items-end">
            {/* Columnas 1 a 6: Eyebrow + Titular */}
            <div className="col-span-6 flex flex-col gap-[24px]">
              <span className="type-label text-gold-700">APLICACIONES</span>
              <h2 className="type-h2 text-ink-900 m-0">
                Cada rueda pide<br />
                un peso distinto.
              </h2>
            </div>

            {/* Columnas 8 a 12: Párrafo de apoyo alineado a la base */}
            <div className="col-start-8 col-span-5 pb-[4px]">
              <p className="type-body-sm text-steel-500 m-0 leading-[1.6]">
                Del automóvil de pasajeros al equipo de faena, el rango de corrección cambia por completo. Trabajamos los tres.
              </p>
            </div>
          </div>

          {/* Tablet & Mobile Header Layout */}
          <div className="flex lg:hidden flex-col gap-[24px]">
            <span className="type-label text-gold-700">APLICACIONES</span>
            <h2 className="type-h2 text-ink-900 m-0">
              Cada rueda pide<br />
              un peso distinto.
            </h2>
            <p className="type-body-sm text-steel-500 m-0 max-w-[540px] leading-[1.6]">
              Del automóvil de pasajeros al equipo de faena, el rango de corrección cambia por completo. Trabajamos los tres.
            </p>
          </div>
        </div>

        {/* Separación de 96px antes de las filas */}
        <div className="h-[64px] md:h-[96px]" />

        {/* Filas de Sector (Borde superior e inferior en line de 1px) */}
        <div className="border-t border-line border-b border-line flex flex-col">
          {SECTORS.map((sector, index) => {
            return (
              <div
                key={sector.id}
                className={index > 0 ? 'border-t border-line' : ''}
              >
                <Link
                  to="/consumibles/contrapesos"
                  aria-label={`${sector.name} — Rango: ${sector.rangeText}`}
                  style={getStyle(index + 1)}
                  className="group block relative w-auto -mx-[20px] px-[20px] md:-mx-[40px] md:px-[40px] lg:-mx-[80px] lg:px-[80px] py-[32px] md:py-[48px] hover:bg-mist transition-colors duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  {/* Desktop Layout (≥ 1200px / lg) */}
                  <div className="hidden lg:grid grid-cols-12 gap-[24px] items-center">
                    {/* Columnas 1 a 3: Sector */}
                    <div className="col-span-3">
                      <h3 className="type-h3 text-ink-900 m-0 transition-transform duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[6px]">
                        {sector.name}
                      </h3>
                    </div>

                    {/* Columnas 4 a 6: Descripción */}
                    <div className="col-span-3">
                      <p className="type-body-sm text-steel-500 m-0 truncate">
                        {sector.description}
                      </p>
                    </div>

                    {/* Columnas 7 a 10: Barra de rango */}
                    <div className="col-span-4 px-[8px]">
                      <RangeBar
                        startPct={sector.startPct}
                        endPct={sector.endPct}
                        isRevealed={isRevealed}
                        rowIndex={index}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    </div>

                    {/* Columnas 11 a 12: Rango Numérico + Flecha */}
                    <div className="col-span-2 flex items-center justify-end gap-[16px]">
                      <span className="type-data text-ink-900">
                        {sector.rangeText}
                      </span>
                      <span
                        aria-hidden="true"
                        className="type-label text-gold-700 transition-transform duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[4px]"
                      >
                        →
                      </span>
                    </div>
                  </div>

                  {/* Tablet & Mobile Layout (< 1200px) */}
                  <div className="flex lg:hidden flex-col gap-[16px]">
                    <div className="flex items-center justify-between">
                      <h3 className="type-h3 text-ink-900 m-0">
                        {sector.name}
                      </h3>
                      <div className="flex items-center gap-[12px]">
                        <span className="type-data text-ink-900">
                          {sector.rangeText}
                        </span>
                        <span
                          aria-hidden="true"
                          className="type-label text-gold-700 transition-transform duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[4px]"
                        >
                          →
                        </span>
                      </div>
                    </div>

                    <p className="type-body-sm text-steel-500 m-0">
                      {sector.description}
                    </p>

                    <div className="pt-[8px]">
                      <RangeBar
                        startPct={sector.startPct}
                        endPct={sector.endPct}
                        isRevealed={isRevealed}
                        rowIndex={index}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    </div>
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
