import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-ink-900 pt-[96px] text-left">
      <div className="layout-container">
        {/* Top Row: Large Wordmark + Subtitle */}
        <div className="flex flex-col gap-[16px]">
          <Link
            to="/"
            className="inline-block focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
            aria-label="Maquinarias JVK — Inicio"
          >
            <div className="type-h3 lg:type-h2 text-paper text-left">
              <span>MAQUINARIAS </span>
              <span className="italic font-bold">JVK</span>
            </div>
          </Link>
          <p className="type-body-sm text-paper/65 text-left max-w-[640px]">
            Equipamiento, consumibles y servicios para talleres automotrices en Chile.
          </p>
        </div>

        {/* Divider Rule: 96px top air, 64px bottom air */}
        <div className="border-t border-paper/15 mt-[96px] mb-[64px]" />

        {/* Bottom Row: 4 Columns (2 cols on mobile, 4 on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-[20px] gap-y-[32px] lg:gap-[24px]">
          {/* Column 1: Equipamiento */}
          <div className="col-span-1 lg:col-span-3 flex flex-col gap-[24px]">
            <span className="type-label text-gold-500">EQUIPAMIENTO</span>
            <ul className="flex flex-col gap-[12px] p-0 m-0 list-none">
              <li>
                <Link
                  to="/equipamiento/elevadores"
                  className="type-body-sm text-paper/65 hover:text-paper transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
                >
                  Elevadores
                </Link>
              </li>
              <li>
                <Link
                  to="/equipamiento/alineadores"
                  className="type-body-sm text-paper/65 hover:text-paper transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
                >
                  Alineadores
                </Link>
              </li>
              <li>
                <Link
                  to="/equipamiento/desmontadoras"
                  className="type-body-sm text-paper/65 hover:text-paper transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
                >
                  Desmontadoras y balanceadoras
                </Link>
              </li>
              <li>
                <Link
                  to="/equipamiento/lubricacion"
                  className="type-body-sm text-paper/65 hover:text-paper transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
                >
                  Lubricación
                </Link>
              </li>
              <li>
                <Link
                  to="/equipamiento/redes"
                  className="type-body-sm text-paper/65 hover:text-paper transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
                >
                  Redes de aire y fluidos
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Consumibles */}
          <div className="col-span-1 lg:col-span-3 flex flex-col gap-[24px]">
            <span className="type-label text-gold-500">CONSUMIBLES</span>
            <ul className="flex flex-col gap-[12px] p-0 m-0 list-none">
              <li>
                <Link
                  to="/consumibles/contrapesos"
                  className="type-body-sm text-paper/65 hover:text-paper transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
                >
                  Contrapesos clip-on
                </Link>
              </li>
              <li>
                <Link
                  to="/consumibles/contrapesos"
                  className="type-body-sm text-paper/65 hover:text-paper transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
                >
                  Contrapesos adhesivos
                </Link>
              </li>
              <li>
                <Link
                  to="/consumibles/contrapesos#catalogo"
                  className="type-body-sm text-paper/65 hover:text-paper transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
                >
                  Catálogo de contrapesos
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Empresa */}
          <div className="col-span-1 lg:col-span-3 flex flex-col gap-[24px]">
            <span className="type-label text-gold-500">EMPRESA</span>
            <ul className="flex flex-col gap-[12px] p-0 m-0 list-none">
              <li>
                <Link
                  to="/nosotros"
                  className="type-body-sm text-paper/65 hover:text-paper transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/cotizar"
                  className="type-body-sm text-paper/65 hover:text-paper transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
                >
                  Cotizar
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contacto */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-3 flex flex-col gap-[24px]">
            <span className="type-label text-gold-500">CONTACTO</span>
            <div className="flex flex-col gap-[12px]">
              <span className="type-body-sm text-paper/65">
                Santiago, Chile
              </span>
              <a
                href="tel:+56223456789"
                className="type-data text-paper/65 hover:text-paper transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
              >
                +56 2 2345 6789 ↗
              </a>
              <a
                href="mailto:contacto@maquinariasjvk.cl"
                className="type-data text-paper/65 hover:text-paper transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2 break-all"
              >
                contacto@maquinariasjvk.cl ↗
              </a>
            </div>
          </div>
        </div>

        {/* Closing Row: 64px air above, text-label in paper/65 */}
        <div className="mt-[64px] pb-[64px] flex items-center justify-between">
          <p className="type-label text-paper/65 text-left m-0">
            &copy; 2026 MAQUINARIAS JVK
          </p>
        </div>
      </div>
    </footer>
  );
}
