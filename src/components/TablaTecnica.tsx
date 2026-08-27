import { useState, useMemo } from 'react';
import { CONTRAPESOS_DATA, ContrapesoItem } from '../data/contrapesosData';
import { useReveal } from '../hooks/useReveal';

type TipoFilter = 'Todos' | 'Clip-on acero' | 'Clip-on aluminio' | 'Adhesivo';
type RangoFilter = 'Todos' | '5 – 60 g' | '50 – 300 g' | '100 – 500 g';

const TIPO_OPTIONS: TipoFilter[] = [
  'Todos',
  'Clip-on acero',
  'Clip-on aluminio',
  'Adhesivo',
];

const RANGO_OPTIONS: RangoFilter[] = [
  'Todos',
  '5 – 60 g',
  '50 – 300 g',
  '100 – 500 g',
];

export default function TablaTecnica() {
  const { ref: sectionRef, isRevealed, prefersReducedMotion, getStyle } = useReveal<HTMLElement>();

  // Filtros de estado
  const [selectedTipo, setSelectedTipo] = useState<TipoFilter>('Todos');
  const [selectedRango, setSelectedRango] = useState<RangoFilter>('Todos');

  // Transición de filtrado suave
  const [isFiltering, setIsFiltering] = useState(false);

  // Filtrado de referencias
  const filteredData = useMemo(() => {
    return CONTRAPESOS_DATA.filter((item: ContrapesoItem) => {
      // Filtro Tipo
      let matchesTipo = true;
      if (selectedTipo === 'Clip-on acero') {
        matchesTipo =
          item.tipo === 'Clip-on acero' || item.tipoFiltro === 'clip-on-acero';
      } else if (selectedTipo === 'Clip-on aluminio') {
        matchesTipo =
          item.tipo === 'Clip-on aluminio' ||
          item.tipoFiltro === 'clip-on-aluminio';
      } else if (selectedTipo === 'Adhesivo') {
        matchesTipo =
          item.tipo.toLowerCase().includes('adhesivo') ||
          item.tipoFiltro === 'adhesivo';
      }

      // Filtro Rango
      let matchesRango = true;
      if (selectedRango === '5 – 60 g') {
        matchesRango = item.gramajeNum >= 5 && item.gramajeNum <= 60;
      } else if (selectedRango === '50 – 300 g') {
        matchesRango = item.gramajeNum >= 50 && item.gramajeNum <= 300;
      } else if (selectedRango === '100 – 500 g') {
        matchesRango = item.gramajeNum >= 100 && item.gramajeNum <= 500;
      }

      return matchesTipo && matchesRango;
    });
  }, [selectedTipo, selectedRango]);

  const handleTipoChange = (tipo: TipoFilter) => {
    if (tipo === selectedTipo) return;
    if (!prefersReducedMotion) {
      setIsFiltering(true);
      setTimeout(() => {
        setSelectedTipo(tipo);
        setIsFiltering(false);
      }, 80);
    } else {
      setSelectedTipo(tipo);
    }
  };

  const handleRangoChange = (rango: RangoFilter) => {
    if (rango === selectedRango) return;
    if (!prefersReducedMotion) {
      setIsFiltering(true);
      setTimeout(() => {
        setSelectedRango(rango);
        setIsFiltering(false);
      }, 80);
    } else {
      setSelectedRango(rango);
    }
  };

  const handleResetFilters = () => {
    setSelectedTipo('Todos');
    setSelectedRango('Todos');
  };

  // Formato del contador siempre a 2 dígitos
  const countDisplay = `${String(filteredData.length).padStart(2, '0')} REFERENCIAS`;

  return (
    <section
      id="catalogo"
      ref={sectionRef}
      aria-label="Catálogo técnico de contrapesos"
      className="w-full bg-mist py-[56px] md:py-[80px] lg:py-[128px] overflow-x-clip"
    >
      <div className="layout-container">
        {/* Encabezado */}
        <div style={getStyle(0)}>
          {/* Desktop & Tablet Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px] items-end">
            <div className="md:col-span-8 lg:col-span-6 flex flex-col gap-[24px]">
              <span className="type-label text-gold-700">
                CATÁLOGO TÉCNICO
              </span>
              <h2 className="type-h2 text-ink-900 m-0">
                Encuentra tu pieza.
              </h2>
            </div>

            {/* Contador de resultados alineado abajo */}
            <div className="md:col-span-4 lg:col-start-9 lg:col-span-4 md:text-right pb-[4px]">
              <span
                className="type-data text-steel-500 tabular-nums"
                aria-live="polite"
                aria-atomic="true"
              >
                {countDisplay}
              </span>
            </div>
          </div>
        </div>

        {/* Barra de Filtros: 48px de aire bajo el encabezado */}
        <div
          className="mt-[48px]"
          style={getStyle(1)}
        >
          <div className="flex flex-col md:flex-col lg:flex-row lg:items-center gap-[24px] lg:gap-[64px]">
            {/* Grupo 1 — TIPO */}
            <div className="flex flex-wrap items-center gap-x-[24px] gap-y-[16px]">
              <span className="type-label text-steel-500 mr-[4px]">
                TIPO
              </span>
              {TIPO_OPTIONS.map((tipo) => {
                const isActive = selectedTipo === tipo;
                return (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => handleTipoChange(tipo)}
                    aria-pressed={isActive}
                    className={`relative type-label py-[4px] bg-transparent border-0 cursor-pointer transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2 ${
                      isActive
                        ? 'text-ink-900'
                        : 'text-steel-500 hover:text-ink-900'
                    }`}
                  >
                    <span>{tipo}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Grupo 2 — RANGO */}
            <div className="flex flex-wrap items-center gap-x-[24px] gap-y-[16px]">
              <span className="type-label text-steel-500 mr-[4px]">
                RANGO
              </span>
              {RANGO_OPTIONS.map((rango) => {
                const isActive = selectedRango === rango;
                return (
                  <button
                    key={rango}
                    type="button"
                    onClick={() => handleRangoChange(rango)}
                    aria-pressed={isActive}
                    className={`relative type-label py-[4px] bg-transparent border-0 cursor-pointer transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2 ${
                      isActive
                        ? 'text-ink-900'
                        : 'text-steel-500 hover:text-ink-900'
                    }`}
                  >
                    <span>{rango}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filete separador: 32px de aire arriba, 0px abajo */}
          <div className="w-full border-t border-line mt-[32px]" />
        </div>

        {/* Tabla Técnica / Estado Vacío */}
        <div
          className="mt-0"
          style={getStyle(2)}
        >
          {filteredData.length === 0 ? (
            /* Estado Vacío */
            <div className="py-[96px] text-left flex flex-col items-start">
              <p className="type-body text-ink-900 m-0">
                No hay referencias con esos filtros.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-[16px] type-label text-gold-700 hover:text-gold-700/80 bg-transparent border-0 p-0 cursor-pointer transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
              >
                LIMPIAR FILTROS ↗
              </button>
            </div>
          ) : (
            /* Tabla Semántica */
            <table
              className="w-full border-collapse text-left"
              aria-label="Tabla de especificaciones de contrapesos"
            >
              {/* Cabecera Desktop & Tablet */}
              <thead className="hidden md:table-header-group">
                <tr className="border-b border-line">
                  <th
                    scope="col"
                    className="w-[20%] py-[20px] type-label text-steel-500 font-normal text-left"
                  >
                    CÓDIGO
                  </th>
                  <th
                    scope="col"
                    className="w-[26%] py-[20px] type-label text-steel-500 font-normal text-left"
                  >
                    TIPO
                  </th>
                  <th
                    scope="col"
                    className="w-[18%] py-[20px] type-label text-steel-500 font-normal text-right"
                  >
                    GRAMAJE
                  </th>
                  <th
                    scope="col"
                    className="w-[20%] py-[20px] type-label text-steel-500 font-normal text-left"
                  >
                    MONTAJE
                  </th>
                  <th
                    scope="col"
                    className="w-[16%] py-[20px] type-label text-steel-500 font-normal text-left"
                  >
                    LLANTA
                  </th>
                </tr>
              </thead>

              {/* Cuerpo de la tabla con transición de opacidad al filtrar */}
              <tbody
                className={`block md:table-row-group transition-opacity duration-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isFiltering ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {filteredData.map((item) => (
                  <tr
                    key={item.codigo}
                    className="block md:table-row py-[20px] md:py-0 border-b border-line group active:bg-paper/80 lg:hover:bg-paper transition-all duration-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    {/* CÓDIGO */}
                    <td className="block md:table-cell float-left md:float-none w-1/2 md:w-[20%] text-left md:py-[16px] lg:py-[20px] md:border-b md:border-line type-data text-ink-900 group-hover:text-gold-700 group-active:text-gold-700 transition-colors duration-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {item.codigo}
                    </td>

                    {/* GRAMAJE (En mobile flota a la derecha en la misma línea de código) */}
                    <td className="block md:table-cell float-right md:float-none w-1/2 md:w-[18%] text-right md:py-[16px] lg:py-[20px] md:border-b md:border-line type-data text-ink-900 tabular-nums">
                      {item.gramajeStr}
                    </td>

                    {/* TIPO */}
                    <td className="block md:table-cell clear-both md:clear-none w-full md:w-[26%] text-left pt-[8px] md:pt-0 md:py-[16px] lg:py-[20px] md:border-b md:border-line type-body-sm text-ink-900">
                      {item.tipo}
                    </td>

                    {/* MONTAJE */}
                    <td className="inline-block md:table-cell w-auto md:w-[20%] text-left pt-[4px] md:pt-0 md:py-[16px] lg:py-[20px] md:border-b md:border-line type-body-sm text-steel-500">
                      {item.montaje}
                    </td>

                    {/* LLANTA */}
                    <td className="inline-block md:table-cell w-auto md:w-[16%] text-left pt-[4px] md:pt-0 md:py-[16px] lg:py-[20px] md:border-b md:border-line type-body-sm text-steel-500 before:content-['·_'] md:before:content-none pl-[4px] md:pl-0">
                      {item.llanta}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
