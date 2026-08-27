import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

// Reemplazables de contacto centralizados
export const CONTACT_PHONE = '+56 9 0000 0000';
export const CONTACT_PHONE_CLEAN = '+56900000000';
export const CONTACT_EMAIL = 'contacto@maquinariasjvk.cl';
export const CONTACT_DISPATCH = 'Santiago y regiones';
export const WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE_CLEAN.replace('+', '')}`;

export default function Cierre() {
  const { ref: sectionRef, isRevealed, prefersReducedMotion, getStyle } = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      aria-label="Cierre y cotización"
      className="w-full bg-paper pt-[80px] pb-[56px] md:pt-[128px] md:pb-[80px] lg:pt-[200px] lg:pb-[120px] overflow-x-clip"
    >
      <div className="layout-container">
        {/* Bloque Superior: Afirmación + Acciones */}
        <div>
          {/* Desktop Layout (≥ 1200px / lg) */}
          <div className="hidden lg:grid grid-cols-12 gap-[24px] items-end">
            {/* Columnas 1 a 8: Eyebrow + Titular type-display */}
            <div className="col-span-8 flex flex-col gap-[32px]">
              <span
                className="type-label text-gold-700"
                style={getStyle(0)}
              >
                COTIZACIÓN
              </span>

              <h2 className="type-display text-ink-900 m-0">
                <span className="block overflow-hidden py-1">
                  <span
                    className="block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform:
                        isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(110%)',
                    }}
                  >
                    Dinos qué ruedas
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
                    balanceas.
                  </span>
                </span>
              </h2>
            </div>

            {/* Columnas 9 a 12: Párrafo de apoyo + Acciones */}
            <div
              className="col-span-4 self-end flex flex-col justify-end"
              style={getStyle(1)}
            >
              <p className="type-body-sm text-steel-500 m-0 leading-[1.6]">
                Cuéntanos el tipo de llanta y el volumen mensual que manejas. Te respondemos con gramajes, precios y plazos.
              </p>

              <div className="mt-[40px] flex flex-col items-stretch gap-[16px]">
                {/* Acción primaria — WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Escribir por WhatsApp a Maquinarias JVK (abre en nueva pestaña)"
                  className="group flex items-center justify-between w-full h-[56px] px-[28px] rounded-full bg-ink-900 text-paper hover:bg-ink-900/90 hover:-translate-y-[2px] transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  <span className="type-label tracking-[0.08em]">
                    ESCRIBIR POR WHATSAPP
                  </span>
                  <span className="type-label text-gold-500 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                    ↗
                  </span>
                </a>

                {/* Acción secundaria — Formulario */}
                <Link
                  to="/cotizar"
                  aria-label="Ir al formulario de cotización"
                  className="group relative inline-flex items-center gap-[4px] text-gold-700 py-[4px] self-start focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  <span className="type-label">PREFIERO EL FORMULARIO</span>
                  <span className="type-label inline-block transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                    ↗
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Tablet Layout (768px a 1199px) */}
          <div className="hidden md:flex lg:hidden flex-col">
            {/* Titular en columnas 1 a 10 */}
            <div className="w-full max-w-[85%] flex flex-col gap-[32px]">
              <span
                className="type-label text-gold-700"
                style={getStyle(0)}
              >
                COTIZACIÓN
              </span>

              <h2 className="type-display text-ink-900 m-0">
                <span className="block overflow-hidden py-1">
                  <span
                    className="block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform:
                        isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(110%)',
                    }}
                  >
                    Dinos qué ruedas
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
                    balanceas.
                  </span>
                </span>
              </h2>
            </div>

            {/* Párrafo y acciones con 56px de aire, columnas 1 a 6 */}
            <div
              className="mt-[56px] max-w-[480px] flex flex-col gap-[32px]"
              style={getStyle(1)}
            >
              <p className="type-body-sm text-steel-500 m-0 leading-[1.6]">
                Cuéntanos el tipo de llanta y el volumen mensual que manejas. Te respondemos con gramajes, precios y plazos.
              </p>

              <div className="flex flex-col items-stretch gap-[16px]">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Escribir por WhatsApp a Maquinarias JVK"
                  className="group flex items-center justify-between w-full h-[56px] px-[28px] rounded-full bg-ink-900 text-paper hover:bg-ink-900/90 hover:-translate-y-[2px] transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  <span className="type-label tracking-[0.08em]">
                    ESCRIBIR POR WHATSAPP
                  </span>
                  <span className="type-label text-gold-500 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                    ↗
                  </span>
                </a>

                <Link
                  to="/cotizar"
                  aria-label="Ir al formulario de cotización"
                  className="group relative inline-flex items-center gap-[4px] text-gold-700 py-[4px] self-start focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  <span className="type-label">PREFIERO EL FORMULARIO</span>
                  <span className="type-label inline-block transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                    ↗
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Layout (< 768px) */}
          <div className="flex md:hidden flex-col">
            <div className="flex flex-col gap-[24px]">
              <span
                className="type-label text-gold-700"
                style={getStyle(0)}
              >
                COTIZACIÓN
              </span>

              <h2 className="type-display text-ink-900 m-0 text-[42px] leading-[1.0]">
                <span className="block overflow-hidden py-0.5">
                  <span
                    className="block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform:
                        isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(110%)',
                    }}
                  >
                    Dinos qué ruedas
                  </span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <span
                    className="block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform:
                        isRevealed || prefersReducedMotion ? 'translateY(0)' : 'translateY(110%)',
                      transitionDelay: prefersReducedMotion ? '0ms' : '90ms',
                    }}
                  >
                    balanceas.
                  </span>
                </span>
              </h2>
            </div>

            <div
              className="mt-[32px] w-full flex flex-col gap-[28px]"
              style={getStyle(1)}
            >
              <p className="type-body-sm text-steel-500 m-0 leading-[1.6]">
                Cuéntanos el tipo de llanta y el volumen mensual que manejas. Te respondemos con gramajes, precios y plazos.
              </p>

              <div className="flex flex-col items-stretch gap-[16px]">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Escribir por WhatsApp a Maquinarias JVK"
                  className="group flex items-center justify-between w-full h-[56px] px-[24px] rounded-full bg-ink-900 text-paper focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  <span className="type-label tracking-[0.08em]">
                    ESCRIBIR POR WHATSAPP
                  </span>
                  <span className="type-label text-gold-500">
                    ↗
                  </span>
                </a>

                <Link
                  to="/cotizar"
                  aria-label="Ir al formulario de cotización"
                  className="type-label inline-flex items-center gap-[4px] text-gold-700 py-[4px] self-start focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  <span>PREFIERO EL FORMULARIO ↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bloque de Datos de Contacto */}
        <div
          className="mt-[64px] md:mt-[96px]"
          style={getStyle(2)}
        >
          {/* Filete horizontal de 1px en line a ancho completo */}
          <div className="w-full border-t border-line" />

          {/* Tres grupos de contacto: 40px bajo el filete */}
          <div className="pt-[40px] grid grid-cols-1 md:grid-cols-12 gap-[32px] md:gap-[24px]">
            {/* Teléfono: Columnas 1 a 3 (md: 1 a 4, lg: 1 a 3) */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col">
              <span className="type-label text-steel-500">
                TELÉFONO
              </span>
              <a
                href={`tel:${CONTACT_PHONE_CLEAN}`}
                aria-label={`Llamar al teléfono ${CONTACT_PHONE}`}
                className="type-data text-ink-900 hover:text-gold-700 transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] mt-[8px] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2 w-fit"
              >
                {CONTACT_PHONE}
              </a>
            </div>

            {/* Correo: Columnas 5 a 7 (md: 5 a 8, lg: 5 a 7) */}
            <div className="md:col-start-5 md:col-span-4 lg:col-start-5 lg:col-span-3 flex flex-col">
              <span className="type-label text-steel-500">
                CORREO
              </span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label={`Enviar correo a ${CONTACT_EMAIL}`}
                className="type-data text-ink-900 hover:text-gold-700 transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] mt-[8px] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2 w-fit"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            {/* Despacho: Columnas 9 a 11 (md: 9 a 12, lg: 9 a 3) */}
            <div className="md:col-start-9 md:col-span-4 lg:col-start-9 lg:col-span-3 flex flex-col">
              <span className="type-label text-steel-500">
                DESPACHO
              </span>
              <span className="type-data text-ink-900 mt-[8px]">
                {CONTACT_DISPATCH}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
