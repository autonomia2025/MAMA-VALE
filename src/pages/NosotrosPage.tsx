import { Link } from 'react-router-dom';
import { WHATSAPP_URL } from '../components/Cierre';
import { useReveal } from '../hooks/useReveal';

// =============================================================================
// CONSTANTES Y CONTENIDOS (DESACOPLADOS DEL COMPONENTE)
// =============================================================================

export interface EditorialColumn {
  paragraphs: string[];
}

export const EDITORIAL_TEXT: { left: string[]; right: string[] } = {
  left: [
    'Maquinarias JVK abastece de contrapesos a talleres, vulcanizadoras y flotas en Chile. No fabricamos maquinaria pesada ni vendemos catálogos infinitos: trabajamos una línea acotada de piezas de zinc y la mantenemos siempre disponible.',
    'Esa decisión es deliberada. Un taller que llama un martes a las seis de la tarde necesita saber si tiene el gramaje, no navegar entre cuarenta referencias que no maneja.',
  ],
  right: [
    'El balanceo es un oficio de tolerancias. Un contrapeso mal calibrado o con recubrimiento que se desprende no genera un reclamo inmediato: genera un neumático desgastado tres meses después y un cliente que culpa al taller, no al proveedor.',
    'Por eso trabajamos con un solo material y controlamos el gramaje pieza por pieza. Es menos vistoso que ofrecer de todo, y es la razón por la que nuestros clientes siguen comprando.',
  ],
};

export interface StepItem {
  index: string;
  title: string;
  description: string;
}

export const PASOS_DATA: StepItem[] = [
  {
    index: '01',
    title: 'Nos dices qué balanceas',
    description:
      'Tipo de llanta, volumen mensual aproximado y comuna de despacho. Con eso basta para armar la primera cotización.',
  },
  {
    index: '02',
    title: 'Confirmamos gramajes y precio',
    description:
      'Te enviamos las referencias que calzan con su gramaje exacto, el precio por volumen y el plazo real de entrega. Sin letra chica.',
  },
  {
    index: '03',
    title: 'Despachamos y reponemos',
    description:
      'Despacho a Santiago y regiones. Si compras todos los meses, dejamos la reposición programada para que no tengas que pedirla.',
  },
];

export interface FichaItem {
  value: string;
  label: string;
}

export const FICHA_EMPRESA_DATA: FichaItem[] = [
  { value: 'Santiago', label: 'BASE DE OPERACIONES' },
  { value: 'Todo Chile', label: 'COBERTURA DE DESPACHO' },
  { value: 'Zinc', label: 'MATERIAL ÚNICO' },
  { value: '24 – 48 h', label: 'DESPACHO EN RM' },
];

export default function NosotrosPage() {
  const {
    ref: heroRef,
    isRevealed: heroRevealed,
    prefersReducedMotion,
    getStyle: getHeroStyle,
  } = useReveal<HTMLElement>();

  const {
    ref: editorialRef,
    getStyle: getEditorialStyle,
  } = useReveal<HTMLElement>();

  const {
    ref: pasosRef,
    isRevealed: pasosRevealed,
    getStyle: getPasosStyle,
  } = useReveal<HTMLElement>();

  const {
    ref: fichaRef,
    isRevealed: fichaRevealed,
    getStyle: getFichaStyle,
  } = useReveal<HTMLElement>();

  return (
    <div className="w-full bg-paper flex flex-col overflow-x-clip">
      {/* ========================================================= */}
      {/* PARTE 1 — HERO DE PÁGINA                                  */}
      {/* ========================================================= */}
      <section
        ref={heroRef}
        aria-label="Encabezado de Nosotros"
        className="w-full bg-paper pt-[56px] pb-[48px] md:pt-[80px] md:pb-[64px] lg:pt-[128px] lg:pb-[96px] overflow-x-clip"
      >
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px] items-end">
            {/* Columnas 1 a 7 (Tablet: 1 a 12) */}
            <div className="col-span-12 md:col-span-12 lg:col-span-7 flex flex-col">
              {/* Eyebrow */}
              <span className="type-label text-gold-700" style={getHeroStyle(0)}>
                NOSOTROS
              </span>

              {/* Titular en 3 líneas con revelado clip-path línea por línea */}
              <h1 className="type-h1 text-ink-900 mt-[24px] mb-0 leading-[1.05]">
                {/* Línea 1 */}
                <span className="block overflow-hidden pb-[4px]">
                  <span
                    className="block"
                    style={{
                      transform:
                        heroRevealed || prefersReducedMotion
                          ? 'translateY(0)'
                          : 'translateY(105%)',
                      transition: prefersReducedMotion
                        ? 'none'
                        : 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 0ms',
                    }}
                  >
                    Un proveedor
                  </span>
                </span>

                {/* Línea 2 */}
                <span className="block overflow-hidden pb-[4px]">
                  <span
                    className="block"
                    style={{
                      transform:
                        heroRevealed || prefersReducedMotion
                          ? 'translateY(0)'
                          : 'translateY(105%)',
                      transition: prefersReducedMotion
                        ? 'none'
                        : 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 90ms',
                    }}
                  >
                    no debería
                  </span>
                </span>

                {/* Línea 3 */}
                <span className="block overflow-hidden pb-[4px]">
                  <span
                    className="block"
                    style={{
                      transform:
                        heroRevealed || prefersReducedMotion
                          ? 'translateY(0)'
                          : 'translateY(105%)',
                      transition: prefersReducedMotion
                        ? 'none'
                        : 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 180ms',
                    }}
                  >
                    sorprenderte.
                  </span>
                </span>
              </h1>
            </div>

            {/* Columnas 9 a 12 (Tablet: 1 a 12 abajo del titular) */}
            <div
              className="col-span-12 md:col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col lg:pb-[6px] mt-[16px] md:mt-[24px] lg:mt-0"
              style={getHeroStyle(1)}
            >
              <p className="type-body-sm text-steel-500 m-0 leading-[1.6]">
                Ni con un gramaje que no calza, ni con un despacho que no llega,
                ni con un precio distinto al de la última compra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PARTE 2 — TEXTO EDITORIAL                                 */}
      {/* ========================================================= */}
      <section
        ref={editorialRef}
        aria-label="Texto editorial"
        className="w-full bg-paper pt-0 pb-[64px] md:pb-[96px] lg:pb-[160px] overflow-x-clip"
      >
        <div className="layout-container">
          {/* Filete de 1px en line a ancho completo del contenedor */}
          <div className="w-full border-t border-line" />

          {/* Dos columnas de texto con 40px de aire bajo el filete */}
          <div
            className="pt-[40px] grid grid-cols-1 md:grid-cols-12 gap-[32px] md:gap-[24px]"
            style={getEditorialStyle(0)}
          >
            {/* Columna izquierda: Desktop 1 a 5, Tablet 1 a 6, Mobile 1 a 12 */}
            <div className="col-span-12 md:col-span-6 lg:col-span-5 flex flex-col gap-[24px]">
              {EDITORIAL_TEXT.left.map((p, idx) => (
                <p
                  key={idx}
                  className="type-body text-ink-900 m-0 leading-[1.6]"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Columna derecha: Desktop 7 a 11, Tablet 7 a 12, Mobile 1 a 12 */}
            <div className="col-span-12 md:col-span-6 lg:col-start-7 lg:col-span-5 flex flex-col gap-[24px]">
              {EDITORIAL_TEXT.right.map((p, idx) => (
                <p
                  key={idx}
                  className="type-body text-ink-900 m-0 leading-[1.6]"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PARTE 3 — CÓMO TRABAJAMOS                                 */}
      {/* ========================================================= */}
      <section
        ref={pasosRef}
        aria-label="Cómo trabajamos"
        className="w-full bg-mist py-[64px] md:py-[96px] lg:py-[160px] overflow-x-clip"
      >
        <div className="layout-container">
          {/* Encabezado: Columnas 1 a 6 */}
          <div
            className="grid grid-cols-1 md:grid-cols-12 gap-[24px]"
            style={getPasosStyle(0)}
          >
            <div className="col-span-12 lg:col-span-6 flex flex-col">
              <span className="type-label text-gold-700">CÓMO TRABAJAMOS</span>
              <h2 className="type-h2 text-ink-900 mt-[24px] mb-0 leading-tight">
                Tres pasos, sin sorpresas.
              </h2>
            </div>
          </div>

          {/* Los Tres Pasos con 96px de aire debajo del titular en desktop */}
          <div className="mt-[56px] md:mt-[72px] lg:mt-[96px] grid grid-cols-1 md:grid-cols-3 gap-0 relative">
            {PASOS_DATA.map((paso, idx) => {
              const fileteDelay = prefersReducedMotion ? 0 : idx * 80;
              const isNotLast = idx < PASOS_DATA.length - 1;

              return (
                <div
                  key={paso.index}
                  className={`flex flex-col relative ${
                    idx === 0
                      ? 'md:pr-[24px] lg:pr-[32px]'
                      : idx === 1
                      ? 'md:px-[24px] lg:px-[32px]'
                      : 'md:pl-[24px] lg:pl-[32px]'
                  }`}
                >
                  {/* Filete vertical en desktop/tablet entre columnas (oculto en mobile) */}
                  {isNotLast && (
                    <div
                      aria-hidden="true"
                      className="hidden md:block absolute right-0 top-0 bottom-0 w-[1px] bg-line pointer-events-none"
                    />
                  )}

                  {/* 1. Índice en type-data color gold-700 */}
                  <span
                    className="type-data text-gold-700 leading-none select-none"
                    style={getPasosStyle(idx + 1)}
                  >
                    {paso.index}
                  </span>

                  {/* 2. Filete horizontal de 1px en gold-500 a ancho de columna con 24px de aire */}
                  <div className="mt-[24px] w-full overflow-hidden">
                    <div
                      className="w-full h-[1px] bg-gold-500 origin-left"
                      style={{
                        transform:
                          pasosRevealed || prefersReducedMotion
                            ? 'scaleX(1)'
                            : 'scaleX(0)',
                        transition: prefersReducedMotion
                          ? 'none'
                          : `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${fileteDelay}ms`,
                      }}
                    />
                  </div>

                  {/* Contenido (Título + Descripción) */}
                  <div style={getPasosStyle(idx + 1)}>
                    {/* 3. Título del paso en type-h3 color ink-900 con 32px de aire */}
                    <h3 className="type-h3 text-ink-900 mt-[32px] mb-0 leading-snug">
                      {paso.title}
                    </h3>

                    {/* 4. Descripción en type-body-sm color steel-500 con 16px de aire */}
                    <p className="type-body-sm text-steel-500 mt-[16px] mb-0 leading-[1.6] max-w-[360px]">
                      {paso.description}
                    </p>
                  </div>

                  {/* Filete horizontal divisorio en mobile entre pasos con 48px de aire arriba y abajo */}
                  {isNotLast && (
                    <div
                      aria-hidden="true"
                      className="md:hidden w-full border-t border-line my-[48px]"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PARTE 4 — FICHA DE EMPRESA Y CIERRE                       */}
      {/* ========================================================= */}
      <section
        ref={fichaRef}
        aria-label="Ficha de empresa y cierre"
        className="w-full bg-paper pt-[64px] pb-[56px] md:pt-[96px] md:pb-[80px] lg:pt-[160px] lg:pb-[120px] overflow-x-clip"
      >
        <div className="layout-container">
          {/* ===================================================== */}
          {/* FICHA DE 4 GRUPOS                                     */}
          {/* ===================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px] md:gap-x-[32px] md:gap-y-[56px] lg:gap-[24px]">
            {FICHA_EMPRESA_DATA.map((item, idx) => {
              const fileteDelay = prefersReducedMotion ? 0 : idx * 80;

              return (
                <div key={item.label} className="flex flex-col">
                  {/* Filete horizontal de 1px en line a ancho de grupo con animación scaleX */}
                  <div className="w-full overflow-hidden">
                    <div
                      className="w-full h-[1px] bg-line origin-left"
                      style={{
                        transform:
                          fichaRevealed || prefersReducedMotion
                            ? 'scaleX(1)'
                            : 'scaleX(0)',
                        transition: prefersReducedMotion
                          ? 'none'
                          : `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${fileteDelay}ms`,
                      }}
                    />
                  </div>

                  {/* Valor y Etiqueta con 24px de aire bajo el filete */}
                  <div
                    className="pt-[24px] flex flex-col"
                    style={getFichaStyle(idx + 1)}
                  >
                    <span className="type-h3 text-ink-900 leading-none">
                      {item.value}
                    </span>
                    <span className="type-label text-steel-500 mt-[8px]">
                      {item.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===================================================== */}
          {/* CIERRE (con 128px de aire bajo la ficha en desktop)    */}
          {/* ===================================================== */}
          <div
            className="mt-[64px] md:mt-[96px] lg:mt-[128px] grid grid-cols-1 md:grid-cols-12 gap-[32px] md:gap-[24px] items-end"
            style={getFichaStyle(3)}
          >
            {/* Columnas 1 a 7 (Tablet: 1 a 12) */}
            <div className="col-span-12 md:col-span-12 lg:col-span-7 flex flex-col">
              <h2 className="type-h2 text-ink-900 m-0 leading-[1.1]">
                Empecemos por
                <br />
                una cotización.
              </h2>
            </div>

            {/* Columnas 9 a 12 (Tablet: 1 a 12 con 48px de aire) */}
            <div className="col-span-12 md:col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col items-start mt-[16px] md:mt-[24px] lg:mt-0">
              {/* Botón Píldora COTIZAR ↗ */}
              <Link
                to="/cotizar"
                className="group w-full h-[56px] px-[28px] rounded-full bg-ink-900 text-paper type-label inline-flex items-center justify-between transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-ink-900/90 hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
              >
                <span>COTIZAR</span>
                <span className="text-gold-500 inline-block transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                  ↗
                </span>
              </Link>

              {/* Enlace secundario con 16px de aire */}
              <div className="mt-[16px]">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Escribir por WhatsApp a Maquinarias JVK (abre en nueva pestaña)"
                  className="group type-label text-gold-700 hover:text-gold-700/80 inline-flex items-center gap-[4px] py-[4px] transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  <span>ESCRIBIR POR WHATSAPP</span>
                  <span className="inline-block transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
