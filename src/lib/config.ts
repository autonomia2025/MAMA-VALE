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

const WA_TEXT = encodeURIComponent('Hola, vengo del sitio web de Maquinarias JVK y quiero cotizar.');

/** A sales line that takes both WhatsApp and calls. */
export interface Phone { label: string; tel: string; wa: string }
const phone = (label: string): Phone => {
  const digits = label.replace(/\D/g, '');
  return { label, tel: 'tel:+' + digits, wa: `https://wa.me/${digits}?text=${WA_TEXT}` };
};

const PHONES = [phone('+56 9 6678 6000'), phone('+56 9 7210 9294')];

export const CONTACT = {
  email: 'contacto@maquinariasjvk.cl',
  phones: PHONES,
  /** First line, used where a single WhatsApp link is needed. */
  whatsapp: PHONES[0].wa,
  hours: ['Lunes a viernes: 9:00 a 18:00', 'Sábado: 9:00 a 14:00'],
};
