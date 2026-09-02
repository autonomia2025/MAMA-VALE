import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import {
  MAIN_FEATURED_EQUIPMENT,
  EDITORIAL_EQUIPMENT_LINES,
} from '../data/equipmentLines';
import elevadorDetailImage from '../assets/images/elevador_detalle_brazo_1787864733138.jpg';

export default function LineasEquipamiento() {
  const {
    ref: sectionRef,
    isRevealed,
    prefersReducedMotion,
    getStyle,
    getTextStyle,
    getParagraphStyle,
    getImageContainerStyle,
    getImageStyle,
  } = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="lineas-equipamiento"
      aria-label="Líneas de equipamiento para taller"
      className="bg-paper py-[64px] md:py-[96px] lg:py-[160px]"
    >
      <div className="layout-container">
        {/* =========================================================================
            1. ENCABEZADO DE SECCIÓN
            ========================================================================= */}
        <div className="grid-base items-end">
          {/* Columnas 1 a 6: Eyebrow + Titular */}
          <div className="col-span-12 md:col-span-12 lg:col-span-6 flex flex-col">
            <span style={getTextStyle(0, 0)} className="type-label text-gold-700">EQUIPAMIENTO</span>
            <h2 className="type-h2 text-ink-900 mt-[24px] m-0">
              <span style={getTextStyle(0, 1)} className="block">Cinco líneas,</span>
              <span style={getTextStyle(0, 2)} className="block">un solo proveedor.</span>
            </h2>
          </div>

          {/* Columnas 8 a 12: Párrafo de apoyo / argumento comercial */}
          <div className="col-span-12 md:col-span-12 lg:col-span-5 lg:col-start-8 mt-[24px] lg:mt-0">
            <p style={getParagraphStyle(0, 3)} className="type-body-sm text-steel-500 m-0 leading-[1.6]">
              Equipar un taller con cinco proveedores distintos significa cinco
              garantías, cinco servicios técnicos y cinco números a los que
              llamar cuando algo falla.
            </p>
          </div>
        </div>

        {/* Separación de 96px al bloque destacado */}
        <div className="mt-[64px] md:mt-[96px]">
          {/* =========================================================================
              2. BLOQUE DESTACADO — ELEVADORES (Línea principal)
              ========================================================================= */}
          <div className="grid-base items-start">
            {/* Columnas 1 a 5 — Fotografía */}
            <div className="col-span-12 md:col-span-5 lg:col-span-5 flex flex-col">
              <div
                style={getImageContainerStyle(1)}
                className="relative w-full aspect-[3/2] md:aspect-[4/3] rounded-[20px] overflow-hidden bg-mist"
              >
                <img
                  style={getImageStyle(1)}
                  src={elevadorDetailImage}
                  alt={MAIN_FEATURED_EQUIPMENT.imageAlt}
                  loading="lazy"
                  width={600}
                  height={450}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Columnas 7 a 12 (Desktop) / 6 a 12 (Tablet) / 12 (Mobile) — Contenido */}
            <div className="col-span-12 md:col-span-7 lg:col-span-6 md:col-start-6 lg:col-start-7 flex flex-col mt-[40px] md:mt-0">
              {/* Etiqueta Línea Principal */}
              <span style={getTextStyle(1, 0)} className="type-label text-gold-700">
                {MAIN_FEATURED_EQUIPMENT.label}
              </span>

              {/* Nombre de la línea */}
              <h3 style={getTextStyle(1, 1)} className="type-h2 text-ink-900 mt-[20px] m-0">
                {MAIN_FEATURED_EQUIPMENT.title}
              </h3>

              {/* Párrafo */}
              <p style={getParagraphStyle(1, 2)} className="type-body text-steel-500 mt-[24px] m-0 max-w-[560px] leading-[1.6]">
                {MAIN_FEATURED_EQUIPMENT.description}
              </p>

              {/* Lista de 3 puntos con filete horizontal dorado */}
              <ul style={getParagraphStyle(1, 3)} className="mt-[40px] p-0 m-0 list-none flex flex-col gap-[14px]">
                {MAIN_FEATURED_EQUIPMENT.bulletPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-[12px] type-body-sm text-ink-900"
                  >
                    <span
                      aria-hidden="true"
                      className="w-[16px] h-[1px] bg-gold-500 shrink-0"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Enlace a Elevadores */}
              <div style={getParagraphStyle(1, 4)} className="mt-[48px]">
                <Link
                  to={MAIN_FEATURED_EQUIPMENT.actionHref}
                  className="type-label group relative inline-flex items-center gap-[4px] text-gold-700 py-[4px] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  <span>{MAIN_FEATURED_EQUIPMENT.actionText}</span>
                  <span className="inline-block transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                    ↗
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Separación de 128px bajo el bloque destacado hacia las cuatro filas editoriales */}
        <div className="mt-[64px] md:mt-[96px] lg:mt-[128px]">
          {/* Filete superior a ancho completo */}
          <div className="w-full border-t border-line" />

          {/* =========================================================================
              3. CUATRO FILAS EDITORIALES
              ========================================================================= */}
          <div className="flex flex-col w-full">
            {EDITORIAL_EQUIPMENT_LINES.map((line, index) => (
              <div
                key={line.href}
                style={getStyle(index + 1)}
                className="w-full border-b border-line"
              >
                <Link
                  to={line.href}
                  className="group relative block w-full py-[28px] md:py-[40px] px-0 lg:px-[16px] -mx-0 lg:-mx-[16px] transition-colors duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-mist focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  {/* Layout Desktop (≥ 1200px / lg) */}
                  <div className="hidden lg:grid grid-cols-12 gap-[24px] items-center w-full">
                    {/* Columnas 1 a 3 — Nombre de la línea */}
                    <div className="col-span-3">
                      <span className="type-h3 text-ink-900 inline-block transition-transform duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[6px]">
                        {line.name}
                      </span>
                    </div>

                    {/* Columnas 4 a 9 — Descripción */}
                    <div className="col-span-6 col-start-4">
                      <p className="type-body-sm text-steel-500 m-0 truncate">
                        {line.description}
                      </p>
                    </div>

                    {/* Columnas 11 a 12 — VER ↗ alineado a la derecha */}
                    <div className="col-span-2 col-start-11 text-right flex items-center justify-end gap-[4px]">
                      <span className="type-label text-gold-700">VER</span>
                      <span className="type-label text-gold-700 inline-block transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                        ↗
                      </span>
                    </div>
                  </div>

                  {/* Layout Tablet (768px a 1199px / md) */}
                  <div className="hidden md:flex lg:hidden flex-col gap-[8px] w-full">
                    {/* Fila 1: Nombre a la izquierda y VER ↗ a la derecha */}
                    <div className="flex items-center justify-between w-full">
                      <span className="type-h3 text-ink-900">
                        {line.name}
                      </span>
                      <div className="flex items-center gap-[4px]">
                        <span className="type-label text-gold-700">VER</span>
                        <span className="type-label text-gold-700">↗</span>
                      </div>
                    </div>

                    {/* Fila 2: Descripción (columnas 1 a 9) */}
                    <p className="type-body-sm text-steel-500 m-0 max-w-[75%] leading-[1.5]">
                      {line.description}
                    </p>
                  </div>

                  {/* Layout Mobile (< 768px) */}
                  <div className="flex md:hidden flex-col w-full">
                    {/* Nombre */}
                    <span className="type-h3 text-ink-900">
                      {line.name}
                    </span>

                    {/* Descripción debajo con 8px de aire */}
                    <p className="type-body-sm text-steel-500 m-0 mt-[8px] leading-[1.5]">
                      {line.description}
                    </p>

                    {/* VER ↗ debajo con 16px de aire */}
                    <div className="mt-[16px] flex items-center gap-[4px] self-start">
                      <span className="type-label text-gold-700">VER</span>
                      <span className="type-label text-gold-700">↗</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
