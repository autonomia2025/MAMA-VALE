import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

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
}

function SectorBlock({ sector }: SectorBlockProps) {
  const { ref: blockRef, isRevealed, prefersReducedMotion, getStyle } = useReveal<HTMLElement>();

  return (
    <section
      ref={blockRef}
      aria-label={`Sector ${sector.name}`}
      className={`w-full ${sector.bgClass} py-[56px] md:py-[80px] lg:py-[128px] overflow-x-clip`}
    >
      <div className="layout-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px] md:gap-[24px] items-start">
          {/* COLUMNAS 1 A 6 (Tablet: 1 a 7, Mobile: 1 a 12) — ARGUMENTO */}
          <div
            className="col-span-12 md:col-span-7 lg:col-span-6 flex flex-col"
            style={getStyle(0)}
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
                return (
                  <li
                    key={vehicle}
                    className="flex items-center"
                    style={getStyle(idx + 1)}
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

          {/* COLUMNAS 8 A 12 (Tablet: 8 a 12, Mobile: 1 a 12) — FICHA */}
          <div
            className="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-5 lg:col-start-8 mt-[64px] md:mt-0 self-start"
            style={getStyle(1)}
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
                        strokeWidth="1.5"
                      />

                      {/* Right Tick Mark (10px height centered at y=12) */}
                      <line
                        x1={`${sector.endPct}%`}
                        y1="7"
                        x2={`${sector.endPct}%`}
                        y2="17"
                        stroke="#C89B32"
                        strokeWidth="1.5"
                      />
                    </g>
                  </svg>
                </div>

                {/* Etiquetas de escala: 0 g a la izquierda, 500 g a la derecha con 8px de aire */}
                <div className="flex justify-between items-center mt-[8px]">
                  <span className="type-data text-steel-500 text-[12px]">
                    0 g
                  </span>
                  <span className="type-data text-steel-500 text-[12px]">
                    500 g
                  </span>
                </div>
              </div>

              {/* 3. PARÁMETROS TÉCNICOS (3 filas con separador border-line) */}
              <div className="mt-[40px] flex flex-col">
                {/* Parámetro 1: Montaje */}
                <div className="py-[16px] border-t border-line flex justify-between items-baseline">
                  <span className="type-label text-steel-500">
                    MONTAJE
                  </span>
                  <span className="type-data text-ink-900 text-right">
                    {sector.ficha.montaje}
                  </span>
                </div>

                {/* Parámetro 2: Llanta compatible */}
                <div className="py-[16px] border-t border-line flex justify-between items-baseline">
                  <span className="type-label text-steel-500">
                    LLANTA
                  </span>
                  <span className="type-data text-ink-900 text-right">
                    {sector.ficha.llanta}
                  </span>
                </div>

                {/* Parámetro 3: Incremento */}
                <div className="py-[16px] border-t border-b border-line flex justify-between items-baseline">
                  <span className="type-label text-steel-500">
                    INCREMENTO
                  </span>
                  <span className="type-data text-ink-900 text-right">
                    {sector.ficha.incremento}
                  </span>
                </div>
              </div>

              {/* 4. ENLACE A CATÁLOGO FILTRADO con 32px de aire */}
              <div className="mt-[32px] self-start">
                <Link
                  to="/contrapesos"
                  className="group relative inline-flex items-center gap-[4px] text-gold-700 py-[4px] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  <span className="type-label">VER EN CATÁLOGO</span>
                  <span className="type-label inline-block transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                    ↗
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
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
  const { ref: heroRef, getStyle: getHeroStyle } = useReveal<HTMLElement>();
  const { ref: closingRef, getStyle: getClosingStyle } = useReveal<HTMLElement>();

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
            style={getHeroStyle(0)}
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
          />
        ))}
      </div>

      {/* ========================================================= */}
      {/* PARTE 3 — BANDA DE CIERRE                                 */}
      {/* ========================================================= */}
      <section
        ref={closingRef}
        aria-label="Cierre de Aplicaciones"
        className="w-full bg-ink-900 py-[56px] md:py-[80px] lg:py-[128px] overflow-x-clip relative border-b border-paper/15"
      >
        <div className="layout-container">
          <div
            className="grid grid-cols-1 md:grid-cols-12 gap-[32px] md:gap-[24px] items-end"
            style={getClosingStyle(0)}
          >
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
