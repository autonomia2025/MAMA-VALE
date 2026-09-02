import { Link } from 'react-router-dom';
import heroImage from '../assets/images/hero_elevador_taller_1787864098950.jpg';

interface LineItem {
  name: string;
  href: string;
}

const LINES: LineItem[] = [
  { name: 'ELEVADORES', href: '/equipamiento/elevadores' },
  { name: 'ALINEADORES', href: '/equipamiento/alineadores' },
  { name: 'DESMONTADORAS', href: '/equipamiento/desmontadoras' },
  { name: 'LUBRICACIÓN', href: '/equipamiento/lubricacion' },
  { name: 'REDES', href: '/equipamiento/redes' },
];

export default function Hero() {
  return (
    <section
      aria-label="Presentación principal"
      className="relative w-full bg-ink-900 flex flex-col justify-between overflow-x-clip min-h-[640px] py-[96px] md:py-0 md:h-screen md:min-h-[720px] md:max-h-[960px] md:pt-[100px] md:pb-[64px]"
    >
      {/* Capa de ambiente — foto de fondo desenfocada */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          loading="eager"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover scale-105 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/70 via-ink-900/50 to-ink-900/15" />
      </div>

      <div className="relative z-10 layout-container h-full flex-1 flex flex-col justify-between">
        {/* BLOQUE SUPERIOR — Eyebrow + Filete Dorado */}
        <div className="w-full flex items-center min-w-0">
          <div className="grid-base w-full items-center">
            <div className="col-span-12 md:col-span-8 lg:col-span-6 flex items-center gap-[16px] min-w-0">
              <span className="type-label font-semibold! text-gold-500 anim-hero-eyebrow whitespace-nowrap [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
                EQUIPAMIENTO PARA TALLERES AUTOMOTRICES
              </span>
              <div className="h-[1px] bg-gold-500 flex-1 anim-hero-hairline min-w-[16px] hidden sm:block" />
            </div>
          </div>
        </div>

        {/* BLOQUE CENTRAL — Contenido Principal */}
        <div className="w-full my-auto py-[32px] md:py-[40px]">
          {/* =========================================================================
              1. DESKTOP LAYOUT (≥ 1200px / lg)
              ========================================================================= */}
          <div className="hidden lg:grid grid-cols-12 gap-[24px] items-start">
            {/* Bloque de texto a ancho completo */}
            <div className="col-span-12 flex flex-col">
              {/* Titular en 2 líneas forzadas */}
              <h1 className="type-display text-paper m-0 [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]">
                <span className="block overflow-hidden py-1">
                  <span className="block anim-hero-title-1">
                    Un taller <span className="italic font-bold">detenido</span>
                  </span>
                </span>
                <span className="block overflow-hidden py-1">
                  <span className="block anim-hero-title-2">
                    no factura.
                  </span>
                </span>
              </h1>

              {/* Párrafo de apoyo y Acciones juntos en la animación */}
              <div className="anim-hero-body-actions">
                <p className="type-body font-medium! text-paper/75 m-0 mt-[48px] max-w-[560px] leading-[1.6] [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
                  Elevadores, alineadores, desmontadoras, lubricación y redes. Vendemos, instalamos y damos servicio, para que el equipo no sea el que te frena.
                </p>

                {/* Acciones en una fila */}
                <div className="mt-[40px] flex items-center gap-[24px]">
                  {/* Píldora primaria */}
                  <Link
                    to="/equipamiento"
                    className="type-label font-semibold! group inline-flex items-center justify-center h-[56px] px-[28px] rounded-full bg-paper text-ink-900 hover:bg-paper/90 hover:-translate-y-[2px] transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-paper focus-visible:outline-offset-2 shadow-sm"
                  >
                    <span>VER EQUIPAMIENTO</span>
                    <span className="ml-[8px] text-gold-700 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                      ↗
                    </span>
                  </Link>

                  {/* Enlace secundario */}
                  <Link
                    to="/cotizar"
                    className="type-label font-semibold! group relative inline-flex items-center gap-[4px] text-gold-500 py-[4px] transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-paper focus-visible:outline-offset-2 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]"
                  >
                    <span>COTIZAR</span>
                    <span className="inline-block transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                      ↗
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              2. TABLET LAYOUT (768px a 1199px / md)
              ========================================================================= */}
          <div className="hidden md:grid lg:hidden grid-cols-12 gap-[24px] items-start">
            {/* Texto a ancho completo */}
            <div className="col-span-12 flex flex-col">
              <h1 className="type-display text-paper m-0 [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]">
                <span className="block overflow-hidden py-1">
                  <span className="block anim-hero-title-1">
                    Un taller <span className="italic font-bold">detenido</span>
                  </span>
                </span>
                <span className="block overflow-hidden py-1">
                  <span className="block anim-hero-title-2">
                    no factura.
                  </span>
                </span>
              </h1>

              <div className="anim-hero-body-actions">
                <p className="type-body font-medium! text-paper/75 m-0 mt-[40px] max-w-[560px] leading-[1.6] [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
                  Elevadores, alineadores, desmontadoras, lubricación y redes. Vendemos, instalamos y damos servicio, para que el equipo no sea el que te frena.
                </p>

                <div className="mt-[32px] flex items-center gap-[24px]">
                  <Link
                    to="/equipamiento"
                    className="type-label font-semibold! group inline-flex items-center justify-center h-[56px] px-[28px] rounded-full bg-paper text-ink-900 hover:bg-paper/90 hover:-translate-y-[2px] transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-paper focus-visible:outline-offset-2 shadow-sm"
                  >
                    <span>VER EQUIPAMIENTO</span>
                    <span className="ml-[8px] text-gold-700 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                      ↗
                    </span>
                  </Link>
                  <Link
                    to="/cotizar"
                    className="type-label font-semibold! group relative inline-flex items-center gap-[4px] text-gold-500 py-[4px] transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-paper focus-visible:outline-offset-2 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]"
                  >
                    <span>COTIZAR</span>
                    <span className="inline-block transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                      ↗
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              3. MOBILE LAYOUT (< 768px)
              ========================================================================= */}
          <div className="flex md:hidden flex-col">
            {/* Titular mobile */}
            <h1 className="type-display text-paper m-0 text-[42px] leading-[1.0] [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]">
              <span className="block overflow-hidden py-0.5">
                <span className="block anim-hero-title-1">
                  Un taller <span className="italic font-bold">detenido</span>
                </span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span className="block anim-hero-title-2">
                  no factura.
                </span>
              </span>
            </h1>

            {/* Párrafo y acciones */}
            <div className="anim-hero-body-actions flex flex-col mt-[32px]">
              <p className="type-body font-medium! text-paper/75 m-0 leading-[1.6] [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
                Elevadores, alineadores, desmontadoras, lubricación y redes. Vendemos, instalamos y damos servicio, para que el equipo no sea el que te frena.
              </p>

              {/* Acciones apiladas */}
              <div className="mt-[32px] flex flex-col items-stretch gap-[16px]">
                <Link
                  to="/equipamiento"
                  className="type-label font-semibold! flex items-center justify-center w-full h-[56px] px-[24px] rounded-full bg-paper text-ink-900 focus-visible:outline-2 focus-visible:outline-paper focus-visible:outline-offset-2 shadow-sm"
                >
                  <span>VER EQUIPAMIENTO</span>
                  <span className="ml-[8px] text-gold-700">↗</span>
                </Link>

                <Link
                  to="/cotizar"
                  className="type-label font-semibold! inline-flex items-center justify-start gap-[4px] text-gold-500 py-[8px] focus-visible:outline-2 focus-visible:outline-paper focus-visible:outline-offset-2 self-start [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]"
                >
                  <span>COTIZAR</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BASE DEL HERO — ÍNDICE DE LÍNEAS
            ========================================================================= */}
        <div className="w-full pt-[40px] md:pt-0">
          {/* DESKTOP (≥ 1200px): 5 Celdas en 1 fila uniforme con filetes verticales */}
          <div className="hidden lg:block relative w-full">
            {/* Filete superior a ancho completo animado */}
            <div className="w-full border-t border-paper/20 anim-hero-index-line" />

            {/* Fila de 5 celdas */}
            <div className="grid grid-cols-5 w-full">
              {LINES.map((line, index) => (
                <div key={line.href} className="relative">
                  {/* Filete vertical de separación (4 filetes entre celdas) de 48px de alto */}
                  {index > 0 && (
                    <div
                      aria-hidden="true"
                      className="absolute left-0 top-0 w-[1px] h-[48px] bg-paper/20 pointer-events-none"
                    />
                  )}

                  {/* Enlace de celda */}
                  <Link
                    to={line.href}
                    className={`group relative flex items-center justify-between pt-[20px] pb-[16px] px-[16px] lg:px-[20px] focus-visible:outline-2 focus-visible:outline-paper focus-visible:outline-offset-2 anim-hero-cell-${index}`}
                  >
                    {/* Línea dorada superior que crece de izquierda a derecha en hover */}
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-[1px] bg-gold-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                    />

                    {/* Nombre de la línea */}
                    <span className="type-label font-semibold! text-paper/70 group-hover:text-paper transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {line.name}
                    </span>

                    {/* Glifo con desplazamiento diagonal en hover */}
                    <span className="type-label text-paper/55 group-hover:text-gold-500 transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                      ↗
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* TABLET (768px a 1199px): 2 filas (3 celdas arriba, 2 abajo) */}
          <div className="hidden md:block lg:hidden relative w-full">
            {/* Filete superior animado */}
            <div className="w-full border-t border-paper/20 anim-hero-index-line" />

            {/* Fila 1: 3 celdas */}
            <div className="grid grid-cols-3 w-full border-b border-paper/20">
              {LINES.slice(0, 3).map((line, index) => (
                <div key={line.href} className="relative">
                  {index > 0 && (
                    <div
                      aria-hidden="true"
                      className="absolute left-0 top-0 w-[1px] h-[48px] bg-paper/20 pointer-events-none"
                    />
                  )}
                  <Link
                    to={line.href}
                    className={`group relative flex items-center justify-between pt-[20px] pb-[16px] px-[16px] focus-visible:outline-2 focus-visible:outline-paper focus-visible:outline-offset-2 anim-hero-cell-${index}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-[1px] bg-gold-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                    />
                    <span className="type-label font-semibold! text-paper/70 group-hover:text-paper transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {line.name}
                    </span>
                    <span className="type-label text-paper/55 group-hover:text-gold-500 transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                      ↗
                    </span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Fila 2: 2 celdas */}
            <div className="grid grid-cols-2 w-full">
              {LINES.slice(3, 5).map((line, index) => (
                <div key={line.href} className="relative">
                  {index > 0 && (
                    <div
                      aria-hidden="true"
                      className="absolute left-0 top-0 w-[1px] h-[48px] bg-paper/20 pointer-events-none"
                    />
                  )}
                  <Link
                    to={line.href}
                    className={`group relative flex items-center justify-between pt-[20px] pb-[16px] px-[16px] focus-visible:outline-2 focus-visible:outline-paper focus-visible:outline-offset-2 anim-hero-cell-${index + 3}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-[1px] bg-gold-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                    />
                    <span className="type-label font-semibold! text-paper/70 group-hover:text-paper transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {line.name}
                    </span>
                    <span className="type-label text-paper/55 group-hover:text-gold-500 transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                      ↗
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE (< 768px): 1 Columna con 5 filas apiladas */}
          <div className="flex md:hidden flex-col w-full border-t border-paper/20 anim-hero-index-line">
            {LINES.map((line, index) => (
              <Link
                key={line.href}
                to={line.href}
                className={`flex items-center justify-between py-[16px] border-b border-paper/20 focus-visible:outline-2 focus-visible:outline-paper focus-visible:outline-offset-2 anim-hero-cell-${index}`}
              >
                <span className="type-label font-semibold! text-paper">
                  {line.name}
                </span>
                <span className="type-label text-paper/55">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
