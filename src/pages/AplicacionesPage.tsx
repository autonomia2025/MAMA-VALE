import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export interface SectorDetail {
  id: string;
  name: string;
  paragraph: string;
  vehicles: string[];
  rangeText: string;
  startPct: number; // e.g. 1 (1%)
  endPct: number;   // e.g. 12 (12%)
  ficha: {
    montaje: string;
    llanta: string;
    incremento: string;
  };
  bgClass: 'bg-mist' | 'bg-paper';
}

export const SECTORS_DETAIL_DATA: SectorDetail[] = [
  {
    id: 'automotriz',
    name: 'Automotriz',
    paragraph:
      'El desbalance en un automóvil de pasajeros se siente antes de medirse: vibración en el volante sobre los 80 kilómetros por hora y desgaste irregular de la banda. La corrección es fina y el margen de error es estrecho.',
    vehicles: [
      'Automóviles de pasajeros',
      'SUV y crossover',
      'Camionetas',
      'Vehículos comerciales livianos',
    ],
    rangeText: '5 – 60 g',
    startPct: 1, // 1%
    endPct: 12,  // 12%
    ficha: {
      montaje: 'A presión y adhesivo',
      llanta: 'Acero y aluminio',
      incremento: '5 g',
    },
    bgClass: 'bg-mist',
  },
  {
    id: 'transporte-pesado',
    name: 'Transporte pesado',
    paragraph:
      'Aquí el desbalance no es incomodidad, es costo operativo. Una rueda mal corregida se traduce en desgaste prematuro de neumático, esfuerzo adicional sobre la suspensión y detenciones no programadas de la flota.',
    vehicles: [
      'Camiones de carga',
      'Buses interurbanos y urbanos',
      'Remolques y semirremolques',
      'Tractocamiones',
    ],
    rangeText: '50 – 300 g',
    startPct: 10, // 10%
    endPct: 60,   // 60%
    ficha: {
      montaje: 'A presión',
      llanta: 'Acero',
      incremento: '50 g',
    },
    bgClass: 'bg-paper',
  },
  {
    id: 'maquinaria',
    name: 'Maquinaria',
    paragraph:
      'Masas grandes, velocidades bajas y condiciones de faena severas. La corrección exige piezas de mayor gramaje y una sujeción que resista vibración sostenida, polvo y temperatura.',
    vehicles: [
      'Equipos de movimiento de tierra',
      'Maquinaria agrícola',
      'Equipos industriales',
      'Vehículos de faena minera',
    ],
    rangeText: '100 – 500 g',
    startPct: 20, // 20%
    endPct: 100,  // 100%
    ficha: {
      montaje: 'A presión',
      llanta: 'Acero',
      incremento: '100 g',
    },
    bgClass: 'bg-mist',
  },
];

interface SectorBlockProps {
  sector: SectorDetail;
  prefersReducedMotion: boolean;
}

function SectorBlock({ sector, prefersReducedMotion }: SectorBlockProps) {
  const blockRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = blockRef.current;
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
      ref={blockRef}
      aria-label={`Sector ${sector.name}`}
      className={`w-full ${sector.bgClass} py-[56px] md:py-[80px] lg:py-[128px] overflow-x-clip`}
    >
      <div className="layout-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px] md:gap-[24px] items-start">
          {/* ========================================================= */}
          {/* COLUMNAS 1 A 6 (Tablet: 1 a 7, Mobile: 1 a 12) — ARGUMENTO */}
          {/* ========================================================= */}
          <div
            className="col-span-12 md:col-span-7 lg:col-span-6 flex flex-col"
            style={{
              opacity: isRevealed || prefersReducedMotion ? 1 : 0,
              transform:
                isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(16px)',
              transition: prefersReducedMotion
                ? 'none'
                : 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Nombre del sector en type-h2 */}
            <h2 className="type-h2 text-ink-900 m-0 leading-tight">
              {sector.name}
            </h2>

            {/* Párrafo con 24px de aire, type-body color steel-500 */}
            <p className="type-body text-steel-500 mt-[24px] mb-0 leading-[1.6] max-w-[560px]">
              {sector.paragraph}
            </p>

            {/* Lista de vehículos típicos con 40px de aire */}
            <ul className="mt-[40px] mb-0 p-0 list-none flex flex-col gap-[12px]">
              {sector.vehicles.map((vehicle, idx) => {
                const itemDelayMs = prefersReducedMotion ? 0 : 200 + idx * 70;
                return (
                  <li
                    key={vehicle}
                    className="flex items-center"
                    style={{
                      opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                      transform:
                        isRevealed || prefersReducedMotion
                          ? 'translateY(0)'
                          : 'translateY(12px)',
                      transition: prefersReducedMotion
                        ? 'none'
                        : `opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) ${itemDelayMs}ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${itemDelayMs}ms`,
                    }}
                  >
                    {/* Filete horizontal de 16px y 1px en gold-500 con 12px de separación */}
                    <span
                      aria-hidden="true"
                      className="w-[16px] h-[1px] bg-gold-500 mr-[12px] shrink-0"
                    />
                    <span className="type-body-sm text-ink-900">
                      {vehicle}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ========================================================= */}
          {/* COLUMNAS 8 A 12 (Tablet: 8 a 12, Mobile: 1 a 12) — FICHA */}
          {/* ========================================================= */}
          <div
            className="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-5 lg:col-start-8 mt-[64px] md:mt-0 self-start"
            style={{
              opacity: isRevealed || prefersReducedMotion ? 1 : 0,
              transform:
                isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(16px)',
              transition: prefersReducedMotion
                ? 'none'
                : 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms',
            }}
          >
            {/* Filete de 1px en line a ancho de columna */}
            <div className="w-full border-t border-line" />

            <div className="pt-[32px] flex flex-col">
              {/* 1. LECTURA DE RANGO */}
              <div className="flex flex-col">
                <span className="type-h3 text-ink-900 leading-none">
                  {sector.rangeText}
                </span>
                <span className="type-label text-steel-500 mt-[8px]">
                  RANGO DE CORRECCIÓN
                </span>
              </div>

              {/* 2. BARRA DE RANGO con 32px de aire */}
              <div className="mt-[32px] flex flex-col w-full">
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
                        transformOrigin: `${sector.startPct}% 12px`,
                        transform:
                          isRevealed || prefersReducedMotion
                            ? 'scaleX(1)'
                            : 'scaleX(0)',
                        transition: prefersReducedMotion
                          ? 'none'
                          : 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 300ms',
                      }}
                    >
                      {/* Main Range Line (3px stroke en gold-500) */}
                      <line
                        x1={`${sector.startPct}%`}
                        y1="12"
                        x2={`${sector.endPct}%`}
                        y2="12"
                        stroke="#C89B32"
                        strokeWidth="3"
                      />

                      {/* Left Tick Mark (10px height centered at y=12) */}
                      <line
                        x1={`${sector.startPct}%`}
                        y1="7"
                        x2={`${sector.startPct}%`}
                        y2="17"
                        stroke="#C89B32"
                        strokeWidth="1"
                      />

                      {/* Right Tick Mark (10px height centered at y=12) */}
                      <line
                        x1={`${sector.endPct}%`}
                        y1="7"
                        x2={`${sector.endPct}%`}
                        y2="17"
                        stroke="#C89B32"
                        strokeWidth="1"
                      />
                    </g>
                  </svg>
                </div>

                {/* Referencias bajo el riel con 12px de aire */}
                <div className="mt-[12px] flex items-center justify-between w-full">
                  <span className="type-label text-steel-500">0</span>
                  <span className="type-label text-steel-500">500 G</span>
                </div>
              </div>

              {/* 3. PARES DE FICHA con 48px de aire */}
              <div className="mt-[48px] flex flex-col">
                {/* Fila 1: MONTAJE */}
                <div className="py-[16px] flex items-center justify-between border-b border-line gap-[16px]">
                  <span className="type-label text-steel-500 shrink-0">
                    MONTAJE
                  </span>
                  <span className="type-data text-ink-900 text-right">
                    {sector.ficha.montaje}
                  </span>
                </div>

                {/* Fila 2: LLANTA */}
                <div className="py-[16px] flex items-center justify-between border-b border-line gap-[16px]">
                  <span className="type-label text-steel-500 shrink-0">
                    LLANTA
                  </span>
                  <span className="type-data text-ink-900 text-right">
                    {sector.ficha.llanta}
                  </span>
                </div>

                {/* Fila 3: INCREMENTO */}
                <div className="py-[16px] flex items-center justify-between border-b border-line gap-[16px]">
                  <span className="type-label text-steel-500 shrink-0">
                    INCREMENTO
                  </span>
                  <span className="type-data text-ink-900 text-right">
                    {sector.ficha.incremento}
                  </span>
                </div>
              </div>

              {/* 4. ENLACE AL CATÁLOGO con 48px de aire */}
              <div className="mt-[48px]">
                <Link
                  to="/contrapesos#catalogo"
                  className="group inline-flex items-center gap-[4px] type-label text-gold-700 relative py-[4px] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  <span>VER REFERENCIAS</span>
                  <span className="inline-block transition-transform duration-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                    ↗
                  </span>
                  {/* Subrayado de 1px en gold-500 que crece desde la izquierda en hover */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-500 transition-all duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full pointer-events-none" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AplicacionesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsHeroRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full bg-paper flex flex-col">
      {/* ========================================================= */}
      {/* PARTE 1 — HERO DE PÁGINA                                  */}
      {/* ========================================================= */}
      <section
        ref={heroRef}
        aria-label="Encabezado de Aplicaciones"
        className="w-full bg-paper pt-[56px] pb-[48px] md:pt-[80px] md:pb-[64px] lg:pt-[128px] lg:pb-[96px] overflow-x-clip"
      >
        <div className="layout-container">
          <div
            className="grid grid-cols-1 md:grid-cols-12 gap-[24px] items-end"
            style={{
              opacity: isHeroRevealed || prefersReducedMotion ? 1 : 0,
              transform:
                isHeroRevealed || prefersReducedMotion
                  ? 'translateY(0)'
                  : 'translateY(12px)',
              transition: prefersReducedMotion
                ? 'none'
                : 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Columnas 1 a 7 (Tablet: 1 a 12) */}
            <div className="col-span-12 md:col-span-12 lg:col-span-7 flex flex-col">
              <span className="type-label text-gold-700">APLICACIONES</span>
              <h1 className="type-h1 text-ink-900 mt-[24px] mb-0 leading-[1.05]">
                De un neumático
                <br />
                a una oruga.
              </h1>
            </div>

            {/* Columnas 9 a 12 (Tablet: 1 a 12 abajo del titular) */}
            <div className="col-span-12 md:col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col lg:pb-[4px] mt-[16px] md:mt-[24px] lg:mt-0">
              <p className="type-body-sm text-steel-500 m-0 leading-[1.6]">
                El principio es el mismo, la escala no. Cada sector exige un rango
                de corrección y un tipo de montaje distinto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PARTE 2 — BLOQUES DE SECTOR (3 bloques apilados)           */}
      {/* ========================================================= */}
      <div className="w-full flex flex-col">
        {SECTORS_DETAIL_DATA.map((sector) => (
          <SectorBlock
            key={sector.id}
            sector={sector}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>

      {/* ========================================================= */}
      {/* PARTE 3 — BANDA DE CIERRE                                 */}
      {/* ========================================================= */}
      <section
        aria-label="Cierre de Aplicaciones"
        className="w-full bg-ink-900 py-[56px] md:py-[80px] lg:py-[128px] overflow-x-clip relative border-b border-paper/15"
      >
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px] md:gap-[24px] items-end">
            {/* Columnas 1 a 7 (Tablet: 1 a 12) */}
            <div className="col-span-12 md:col-span-12 lg:col-span-7 flex flex-col">
              <h2 className="type-h2 text-paper m-0 leading-[1.1]">
                ¿No ves tu
                <br />
                caso acá?
              </h2>
            </div>

            {/* Columnas 9 a 12 (Tablet: 1 a 12 con 48px de aire) */}
            <div className="col-span-12 md:col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col items-start mt-[16px] md:mt-[24px] lg:mt-0">
              <p className="type-body-sm text-paper/65 m-0 leading-[1.6]">
                Trabajamos aplicaciones fuera de catálogo. Cuéntanos qué rueda
                necesitas balancear.
              </p>

              {/* Botón Píldora COTIZAR ↗ con 32px de aire */}
              <div className="mt-[32px] w-full">
                <Link
                  to="/cotizar"
                  className="group w-full h-[56px] px-[28px] rounded-full bg-paper text-ink-900 type-label inline-flex items-center justify-between transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-paper/95 hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
                >
                  <span>COTIZAR</span>
                  <span className="text-gold-700 inline-block transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
