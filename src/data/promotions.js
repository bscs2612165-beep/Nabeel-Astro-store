import { bannerFor, logoFor } from './assets';

// Demo promotions — clearly configurable pricing and promo codes.
export const PROMOTIONS = [
  { id: 'promo-uc-sale', game: 'pubg', title: 'Double UC Pack', tagline: 'Extra value on select PUBG UC packages.', image: bannerFor('pubg'), logo: logoFor('pubg'), code: 'DOUBLEUC', discountText: 'Save up to 12%', expiry: '2026-09-01' },
  { id: 'promo-starlight', game: 'mlbb', title: 'Starlight Month', tagline: 'Bundle deals on the monthly Starlight offering.', image: bannerFor('mlbb'), logo: logoFor('mlbb'), code: 'STARLIGHT', discountText: 'Starlight savings', expiry: '2026-08-31' },
  { id: 'promo-tokens', game: 'hok', title: 'Token Deal', tagline: 'Limited pricing on Honor Token packages.', image: bannerFor('hok'), logo: logoFor('hok'), code: 'HONOR10', discountText: 'Flat 10% off tokens', expiry: '2026-08-28' }
];

export const applyPromo = (code, subtotal) => {
  const p = PROMOTIONS.find((x) => x.code.toLowerCase() === String(code || '').trim().toLowerCase());
  if (!p) return { ok: false, amount: 0, promo: null };
  const percent = p.code === 'HONOR10' ? 0.1 : p.code === 'DOUBLEUC' ? 0.12 : 0.08;
  return { ok: true, amount: Math.round(subtotal * percent), promo: p, percent };
};
