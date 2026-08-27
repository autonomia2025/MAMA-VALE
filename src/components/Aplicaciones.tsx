import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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
  const animDelayMs = 200 + rowIndex * 120; // Starts 200ms after row appears

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
            strokeWidth="1"
          />

          {/* Right Tick Mark (10px height centered at y=12) */}
          <line
            x1={`${endPct}%`}
            y1="7"
            x2={`${endPct}%`}
            y2="17"
            stroke="#C89B32"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  );
}

export default function Aplicaciones() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Motion preference detection
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
      aria-label="Aplicaciones por sector"
      className="w-full bg-paper section-padding"
    >
      <div className="layout-container">
        {/* Encabezado de Sección */}
        <div
          className="transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: isRevealed || prefersReducedMotion ? 1 : 0,
            transform: isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
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
            const rowDelayMs = index * 120;

            return (
              <div
                key={sector.id}
                className={index > 0 ? 'border-t border-line' : ''}
              >
                <Link
                  to="/aplicaciones"
                  aria-label={`${sector.name} — Rango: ${sector.rangeText}`}
                  style={{
                    opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                    transform:
                      isRevealed || prefersReducedMotion
                        ? 'translateY(0)'
                        : 'translateY(16px)',
                    transition: prefersReducedMotion
                      ? 'none'
                      : `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${rowDelayMs}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${rowDelayMs}ms`,
                  }}
                  className="group block relative w-full -mx-[20px] px-[20px] md:-mx-[40px] md:px-[40px] lg:-mx-[80px] lg:px-[80px] py-[32px] md:py-[48px] hover:bg-mist transition-colors duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
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

                    {/* Columnas 11 a 12: Lectura numérica alineada a la derecha */}
                    <div className="col-span-2 flex flex-col items-end justify-center">
                      <span className="type-data text-ink-900 group-hover:text-gold-700 transition-colors duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap">
                        {sector.rangeText}
                      </span>
                      <span className="type-label text-steel-500 mt-[2px]">
                        RANGO
                      </span>
                    </div>
                  </div>

                  {/* Tablet Layout (768px a 1199px) */}
                  <div className="hidden md:flex lg:hidden flex-col gap-[16px]">
                    {/* Línea 1: Sector a la izquierda, Rango a la derecha */}
                    <div className="flex items-baseline justify-between w-full">
                      <h3 className="type-h3 text-ink-900 m-0 transition-transform duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[6px]">
                        {sector.name}
                      </h3>
                      <div className="flex flex-col items-end">
                        <span className="type-data text-ink-900 group-hover:text-gold-700 transition-colors duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap">
                          {sector.rangeText}
                        </span>
                        <span className="type-label text-steel-500 mt-[2px]">
                          RANGO
                        </span>
                      </div>
                    </div>

                    {/* Línea 2: Descripción (columnas 1 a 8) */}
                    <p className="type-body-sm text-steel-500 m-0 max-w-[70%]">
                      {sector.description}
                    </p>

                    {/* Línea 3: Barra de rango a ancho completo con 24px de aire */}
                    <div className="w-full pt-[8px]">
                      <RangeBar
                        startPct={sector.startPct}
                        endPct={sector.endPct}
                        isRevealed={isRevealed}
                        rowIndex={index}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    </div>
                  </div>

                  {/* Mobile Layout (< 768px) */}
                  <div className="flex md:hidden flex-col gap-[16px]">
                    {/* 1. Nombre del sector */}
                    <h3 className="type-h3 text-ink-900 m-0">
                      {sector.name}
                    </h3>

                    {/* 2. Lectura numérica */}
                    <div className="flex items-baseline gap-[8px]">
                      <span className="type-data text-ink-900">
                        {sector.rangeText}
                      </span>
                      <span className="type-label text-steel-500">
                        RANGO
                      </span>
                    </div>

                    {/* 3. Barra de rango a ancho completo */}
                    <div className="w-full py-[4px]">
                      <RangeBar
                        startPct={sector.startPct}
                        endPct={sector.endPct}
                        isRevealed={isRevealed}
                        rowIndex={index}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    </div>

                    {/* 4. Descripción */}
                    <p className="type-body-sm text-steel-500 m-0">
                      {sector.description}
                    </p>
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
