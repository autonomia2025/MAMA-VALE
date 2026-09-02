import { useState, useMemo, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  CONTACT_PHONE,
  CONTACT_EMAIL,
  CONTACT_DISPATCH,
  WHATSAPP_URL,
} from '../components/Cierre';
import { useReveal } from '../hooks/useReveal';



export default function CotizarPage() {
  const { ref: pageRef, getStyle } = useReveal<HTMLElement>();

  // Form State
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Email format validation (standard RFC regex)
  const isEmailValid = useMemo(() => {
    if (!correo.trim()) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
  }, [correo]);

  // Form validation: nombre, correo valid, and message filled
  const isFormValid = useMemo(() => {
    return (
      nombre.trim().length > 0 &&
      isEmailValid &&
      mensaje.trim().length > 0
    );
  }, [nombre, isEmailValid, mensaje]);

  // Form Submit Handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    // =========================================================================
    // CONEXIÓN BACKEND / SERVICIO REAL:
    // Conectar aquí el dispatch API/servicio de envío de cotización
    // Ejemplo: await fetch('/api/cotizar', { method: 'POST', body: JSON.stringify(formData) });
    // =========================================================================

    setIsSubmitted(true);
  };

  // Reset handler to return to empty form
  const handleResetForm = () => {
    setNombre('');
    setCorreo('');
    setMensaje('');
    setIsSubmitted(false);
  };

  return (
    <section
      ref={pageRef}
      aria-label="Página de cotización de contrapesos"
      className="w-full bg-paper pt-[56px] pb-[72px] md:pt-[80px] md:pb-[96px] lg:pt-[128px] lg:pb-[160px] overflow-x-clip"
    >
      <div className="layout-container">
        {/* ENCABEZADO DE PÁGINA — Ancho columnas 1 a 8 */}
        <div
          className="w-full grid-base"
          style={getStyle(0)}
        >
          <div className="col-span-12 lg:col-span-8 flex flex-col">
            {/* Eyebrow */}
            <span className="type-label text-gold-700">COTIZACIÓN</span>

            {/* Titular en dos líneas con 24px de aire */}
            <h1 className="type-h1 text-ink-900 mt-[24px] mb-0 leading-[1.05]">
              Cuéntanos qué
              <br />
              necesitas.
            </h1>

            {/* Párrafo con 24px de aire */}
            <p className="type-body-sm text-steel-500 mt-[24px] mb-0 max-w-[620px] leading-[1.6]">
              Mientras más preciso el detalle, más rápida la respuesta. Si prefieres
              hablar directo, abajo están los datos.
            </p>
          </div>
        </div>

        {/* CONTENEDOR DE DOS COLUMNAS — Con 96px de aire debajo del encabezado en desktop */}
        <div
          className="mt-[56px] md:mt-[72px] lg:mt-[96px] grid grid-cols-1 md:grid-cols-12 gap-[32px] md:gap-[24px] items-start"
          style={getStyle(1)}
        >
          {/* ========================================================= */}
          {/* COLUMNA DEL FORMULARIO — Columnas 1 a 7 (Tablet: 1 a 8) */}
          {/* ========================================================= */}
          <div className="col-span-12 md:col-span-8 lg:col-span-7 min-h-[500px]">
            {isSubmitted ? (
              /* BLOQUE DE CONFIRMACIÓN ALINEADO A LA IZQUIERDA */
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col items-start pt-[12px]"
              >
                {/* Filete de 1px en gold-500 de 80px de ancho */}
                <div className="w-[80px] h-[1px] bg-gold-500" />

                {/* Titular con 32px de aire */}
                <h3 className="type-h3 text-ink-900 mt-[32px] mb-0">
                  Cotización enviada.
                </h3>

                {/* Subtexto con 16px de aire */}
                <p className="type-body-sm text-steel-500 mt-[16px] mb-0">
                  Te contactamos al correo que dejaste.
                </p>

                {/* Botón ENVIAR OTRA ↗ con 32px de aire */}
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="type-label text-gold-700 hover:text-gold-700/85 mt-[32px] p-0 bg-transparent border-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2 transition-colors duration-[180ms]"
                >
                  ENVIAR OTRA ↗
                </button>
              </div>
            ) : (
              /* FORMULARIO DE COTIZACIÓN */
              <form onSubmit={handleSubmit} noValidate className="w-full">
                {/* Campos de línea apilados verticalmente con 40px de separación */}
                <div className="flex flex-col gap-[40px]">
                  {/* Fila 1: NOMBRE Y APELLIDO y CORREO */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[24px]">
                    {/* NOMBRE Y APELLIDO */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="cotizar-nombre"
                        className="type-label text-steel-500 mb-[8px]"
                      >
                        NOMBRE Y APELLIDO
                      </label>
                      <input
                        id="cotizar-nombre"
                        name="nombre"
                        type="text"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b border-line rounded-none py-[12px] px-0 type-body text-ink-900 focus:border-gold-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-4 transition-colors duration-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                    </div>

                    {/* CORREO */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="cotizar-correo"
                        className="type-label text-steel-500 mb-[8px]"
                      >
                        CORREO
                      </label>
                      <input
                        id="cotizar-correo"
                        name="correo"
                        type="email"
                        required
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        className="w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b border-line rounded-none py-[12px] px-0 type-body text-ink-900 focus:border-gold-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-4 transition-colors duration-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                    </div>
                  </div>

                  {/* Fila 2: ¿QUÉ NECESITAS? */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="cotizar-mensaje"
                      className="type-label text-steel-500 mb-[8px]"
                    >
                      ¿QUÉ NECESITAS?
                    </label>
                    <textarea
                      id="cotizar-mensaje"
                      name="mensaje"
                      required
                      rows={4}
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      className="w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b border-line rounded-none py-[12px] px-0 type-body text-ink-900 resize-none focus:border-gold-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-4 transition-colors duration-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </div>
                </div>

                {/* BOTÓN DE ENVÍO — Con 64px de aire */}
                <div className="mt-[64px] flex flex-col items-start w-full">
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full md:w-auto md:min-w-[280px] lg:w-full lg:max-w-[340px] h-[56px] px-[28px] rounded-full bg-ink-900 text-paper type-label flex items-center justify-between transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-ink-900 not-disabled:hover:bg-ink-900/90 not-disabled:hover:-translate-y-[2px]"
                  >
                    <span>ENVIAR COTIZACIÓN</span>
                    <span className="text-gold-500 font-normal">↗</span>
                  </button>

                  {/* Leyenda de respuesta con 16px de aire */}
                  <p className="type-label text-steel-500 mt-[16px] mb-0">
                    RESPONDEMOS EN MENOS DE 24 HORAS HÁBILES
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* ========================================================= */}
          {/* COLUMNA DE APOYO — Columnas 9 a 12 (Mobile: mt-[80px])   */}
          {/* ========================================================= */}
          <div className="col-span-12 md:col-start-9 md:col-span-4 lg:col-start-9 lg:col-span-4 mt-[56px] md:mt-0 self-start">
            {/* Filete de 1px en line a ancho de columna */}
            <div className="w-full border-t border-line" />

            {/* Tres grupos apilados separados por 48px, con 32px de aire bajo el filete */}
            <div className="pt-[32px] flex flex-col gap-[48px]">
              {/* Grupo 1: WHATSAPP */}
              <div className="flex flex-col">
                <span className="type-label text-steel-500">WHATSAPP</span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Escribir por WhatsApp a ${CONTACT_PHONE} (abre en nueva pestaña)`}
                  className="type-data text-ink-900 hover:text-gold-700 mt-[8px] transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2 w-fit"
                >
                  {CONTACT_PHONE} ↗
                </a>
              </div>

              {/* Grupo 2: CORREO */}
              <div className="flex flex-col">
                <span className="type-label text-steel-500">CORREO</span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  aria-label={`Enviar correo a ${CONTACT_EMAIL}`}
                  className="type-data text-ink-900 hover:text-gold-700 mt-[8px] transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2 w-fit break-all"
                >
                  {CONTACT_EMAIL} ↗
                </a>
              </div>

              {/* Grupo 3: DESPACHO */}
              <div className="flex flex-col">
                <span className="type-label text-steel-500">DESPACHO</span>
                <span className="type-data text-ink-900 mt-[8px]">
                  {CONTACT_DISPATCH}
                </span>
              </div>
            </div>

            {/* Bloque final con 64px de aire bajo el último grupo */}
            <div className="mt-[64px]">
              {/* Filete de 1px en line a ancho de columna */}
              <div className="w-full border-t border-line" />

              {/* Párrafo con 32px de aire bajo el filete */}
              <p className="type-body-sm text-steel-500 mt-[32px] mb-0 leading-[1.6]">
                ¿No sabes qué gramaje necesitas? Revisa el catálogo técnico y filtra por
                tipo de llanta.
              </p>

              {/* Enlace con 16px de aire */}
              <div className="mt-[16px]">
                <Link
                  to="/consumibles/contrapesos#catalogo"
                  className="type-label inline-flex items-center gap-[4px] text-gold-700 hover:text-gold-700/80 transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-ink-900 focus-visible:outline-offset-2"
                >
                  <span>VER CATÁLOGO ↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
