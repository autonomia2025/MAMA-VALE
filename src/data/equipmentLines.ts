export interface EquipmentLineRow {
  name: string;
  description: string;
  href: string;
}

export const MAIN_FEATURED_EQUIPMENT = {
  label: 'LÍNEA PRINCIPAL',
  title: 'Elevadores',
  description:
    'El elevador define cuántos autos entran al taller por día. Trabajamos elevadores de dos y cuatro columnas, de tijera y de patín, con instalación, puesta en marcha y servicio posterior.',
  bulletPoints: [
    'Dos columnas, cuatro columnas, tijera y patín',
    'Instalación, anclaje y puesta en marcha incluidas',
    'Servicio técnico y repuestos en Chile',
  ],
  actionText: 'VER ELEVADORES',
  actionHref: '/equipamiento/elevadores',
  imageAlt: 'Detalle del carro y brazo de un elevador automotriz de dos columnas',
};

export const EDITORIAL_EQUIPMENT_LINES: EquipmentLineRow[] = [
  {
    name: 'Alineadores',
    description: 'Alineación 3D y convencional, con calibración y capacitación de operarios.',
    href: '/equipamiento/alineadores',
  },
  {
    name: 'Desmontadoras',
    description: 'Desmontadoras y balanceadoras para llanta de acero y aluminio.',
    href: '/equipamiento/desmontadoras',
  },
  {
    name: 'Lubricación',
    description: 'Bombas, carretes, dispensadores y gestión de aceite usado.',
    href: '/equipamiento/lubricacion',
  },
  {
    name: 'Redes',
    description: 'Redes de aire comprimido y fluidos, diseñadas e instaladas a medida.',
    href: '/equipamiento/redes',
  },
];
