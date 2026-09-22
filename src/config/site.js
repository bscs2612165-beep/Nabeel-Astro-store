// Global site configuration — single place to tweak brand-wide values.
export const SITE = {
  name: 'Nabeel Astro Store',
  tagline: 'Premium gaming top-ups, delivered fast.',
  currency: 'PKR',
  currencySymbol: '₨',
  servingSince: 2023,
  copyrightYear: 2026
};

// Month-by-month configurable monthly feature (auto-advances).
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function currentMonth() {
  const m = new Date().getMonth();
  return { name: MONTHS[m], date: new Date(), index: m };
}

// Contact/social values — single source of truth for the footer & support.
export const CONTACT = {
  whatsapp: 'https://wa.me/923418109808',
  whatsappDisplay: '+923418109808',
  messenger: 'https://m.me/astro.ml.786',
  email: 'nabeelazhar3000@gmail.com',
  phone: '+92 341 8109808',
  facebook: 'https://www.facebook.com/astro.ml.786',
  facebookDisplay: 'astro.ml.786',
  instagram: 'https://www.instagram.com/ASTROML10',
  instagramDisplay: '@ASTROML10',
  address: '77MW+M6H, road, Ulfat Colony, Jauharabad, Pakistan',
  support: {
    hours: 'Mon – Sun, 10:00 AM – 11:00 PM (PKT)',
    response: 'We typically reply within 2 hours.'
  }
};

export const TRUST_SIGNALS = [
  { icon: '❖', title: 'Secure Checkout', sub: 'Your details stay private.' },
  { icon: '⚡', title: 'Fast Processing', sub: 'Orders handled quickly.' },
  { icon: '✆', title: 'Customer Support', sub: 'We are here to help.', href: '#support-section' }
];