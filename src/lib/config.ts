// Site-wide switches. These were the "Tweaks" controls in the Claude Design prototype.
export const SETTINGS = {
  /** Glass balancing readout over the home hero photo. */
  showReadout: true,
  /** Desktop ring cursor. Off by request: the site uses the normal cursor. */
  customCursor: false,
  /** Show published CLP prices; when false every product reads "Cotizar". Off since v5: no prices on the site. */
  showPrices: false,
  /** Catalog grid density. */
  catalogDensity: 'Cómoda' as 'Cómoda' | 'Compacta',
};

// Brand photography. Every key is an <ImageSlot id>. Leave a value empty to
// show the captioned placeholder; set it to a path under /public (for example
// '/photos/home-hero.jpg') once the real photo exists.
export const PHOTOS: Record<string, string> = {
  'home-hero': '',
  'home-contrapesos': '',
  'cp-hero': '',
  'cp-adhesivo': '',
  'cp-gancho': '',
  'cp-pesado': '',
  'emp-hero': '',
  'emp-automotriz': '',
  'emp-transporte': '',
  'emp-maquinaria': '',
};

export const CONTACT = {
  email: 'ventas@maquinariasjvk.cl',
  phone: '+56 9 0000 0000',
  phoneHref: 'tel:+56900000000',
  whatsapp: 'https://wa.me/56900000000',
  hours: 'Lunes a viernes, 9:00 a 18:00',
};
