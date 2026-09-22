// Centralized product catalog — SOURCE OF TRUTH = owner rate list.
// product.image is a {key} hint for game-level fallbacks (logo, search, glyph).
// product.artwork is the real currency/package visual shown on the card
// (optional — games without dedicated artwork fall back to the game logo).
// pricing fields: price (always present), discountPrice (unused — owner rates
// are final). product.badge optionally overrides the derived badge.
// availability: 'available' | 'unavailable' | 'pricing-pending'
import { PRODUCT_ART } from './assets';

export const PRODUCTS = [
  // ---- PUBG Mobile — UC ----
  { id: 'pubg-uc-60', game: 'pubg', name: 'PUBG UC', category: 'UC', description: '60 UC', qtyLabel: '60 UC', price: 280, currency: 'PKR', discountPrice: null, image: 'pubg', artwork: PRODUCT_ART.pubgUcCrate, supportLabel: 'Instant Top-Up', popular: true, availability: 'available' },
  { id: 'pubg-uc-325', game: 'pubg', name: 'PUBG UC', category: 'UC', description: '325 UC', qtyLabel: '325 UC', price: 1400, currency: 'PKR', discountPrice: null, image: 'pubg', artwork: PRODUCT_ART.pubgUcWide, supportLabel: 'Instant Top-Up', popular: true, availability: 'available' },
  { id: 'pubg-uc-660', game: 'pubg', name: 'PUBG UC', category: 'UC', description: '660 UC', qtyLabel: '660 UC', price: 2800, currency: 'PKR', discountPrice: null, image: 'pubg', artwork: PRODUCT_ART.pubgUcStack, supportLabel: 'Instant Top-Up', popular: true, availability: 'available' },
  { id: 'pubg-uc-985', game: 'pubg', name: 'PUBG UC', category: 'UC', description: '985 UC', qtyLabel: '985 UC', price: 4200, currency: 'PKR', discountPrice: null, image: 'pubg', artwork: PRODUCT_ART.pubgUcCrate, supportLabel: 'Instant Top-Up', popular: true, availability: 'available' },
  { id: 'pubg-uc-1320', game: 'pubg', name: 'PUBG UC', category: 'UC', description: '1320 UC', qtyLabel: '1320 UC', price: 5500, currency: 'PKR', discountPrice: null, image: 'pubg', artwork: PRODUCT_ART.pubgUcWide, supportLabel: 'Instant Top-Up', popular: true, availability: 'available' },
  { id: 'pubg-uc-1800', game: 'pubg', name: 'PUBG UC', category: 'UC', description: '1800 UC', qtyLabel: '1800 UC', price: 6800, currency: 'PKR', discountPrice: null, image: 'pubg', artwork: PRODUCT_ART.pubgUcStack, supportLabel: 'Instant Top-Up', popular: false, availability: 'available' },
  { id: 'pubg-uc-2125', game: 'pubg', name: 'PUBG UC', category: 'UC', description: '2125 UC', qtyLabel: '2125 UC', price: 8200, currency: 'PKR', discountPrice: null, image: 'pubg', artwork: PRODUCT_ART.pubgUcCrate, supportLabel: 'Instant Top-Up', popular: false, availability: 'available' },
  { id: 'pubg-uc-2785', game: 'pubg', name: 'PUBG UC', category: 'UC', description: '2785 UC', qtyLabel: '2785 UC', price: 10900, currency: 'PKR', discountPrice: null, image: 'pubg', artwork: PRODUCT_ART.pubgUcWide, supportLabel: 'Instant Top-Up', popular: false, availability: 'available' },
  { id: 'pubg-uc-3850', game: 'pubg', name: 'PUBG UC', category: 'UC', description: '3850 UC', qtyLabel: '3850 UC', price: 13600, currency: 'PKR', discountPrice: null, image: 'pubg', artwork: PRODUCT_ART.pubgUcStack, supportLabel: 'Instant Top-Up', popular: false, availability: 'available' },
  { id: 'pubg-uc-8100', game: 'pubg', name: 'PUBG UC', category: 'UC', description: '8100 UC', qtyLabel: '8100 UC', price: 27300, currency: 'PKR', discountPrice: null, image: 'pubg', artwork: PRODUCT_ART.pubgUcWide, supportLabel: 'Instant Top-Up', popular: false, availability: 'available' },

  // ---- Mobile Legends — Standard Diamonds ----
  { id: 'mlbb-dia-55', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '55 Diamonds', qtyLabel: '55', price: 270, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: true, availability: 'available' },
  { id: 'mlbb-dia-86', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '86 Diamonds', qtyLabel: '86', price: 380, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: true, availability: 'available' },
  { id: 'mlbb-dia-112', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '112 Diamonds', qtyLabel: '112', price: 550, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: true, availability: 'available' },
  { id: 'mlbb-dia-165', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '165 Diamonds', qtyLabel: '165', price: 750, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: true, availability: 'available' },
  { id: 'mlbb-dia-275', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '275 Diamonds', qtyLabel: '275', price: 1150, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: true, availability: 'available' },
  { id: 'mlbb-dia-330', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '330 Diamonds', qtyLabel: '330', price: 1350, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: true, availability: 'available' },
  { id: 'mlbb-dia-429', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '429 Diamonds', qtyLabel: '429', price: 1800, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: false, availability: 'available' },
  { id: 'mlbb-dia-565', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '565 Diamonds', qtyLabel: '565', price: 2300, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: false, availability: 'available' },
  { id: 'mlbb-dia-620', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '620 Diamonds', qtyLabel: '620', price: 2500, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: false, availability: 'available' },
  { id: 'mlbb-dia-706', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '706 Diamonds', qtyLabel: '706', price: 2850, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: false, availability: 'available' },
  { id: 'mlbb-dia-878', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '878 Diamonds', qtyLabel: '878', price: 3600, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: false, availability: 'available' },
  { id: 'mlbb-dia-1050', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '1050 Diamonds', qtyLabel: '1050', price: 4350, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: false, availability: 'available' },
  { id: 'mlbb-dia-1130', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '1130 Diamonds', qtyLabel: '1130', price: 4500, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: false, availability: 'available' },
  { id: 'mlbb-dia-1412', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '1412 Diamonds', qtyLabel: '1412', price: 5700, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: false, availability: 'available' },
  { id: 'mlbb-dia-1756', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '1756 Diamonds', qtyLabel: '1756', price: 7200, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: false, availability: 'available' },
  { id: 'mlbb-dia-2195', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '2195 Diamonds', qtyLabel: '2195', price: 8500, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: false, availability: 'available' },
  { id: 'mlbb-dia-2901', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '2901 Diamonds', qtyLabel: '2901', price: 11300, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: false, availability: 'available' },
  { id: 'mlbb-dia-3688', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '3688 Diamonds', qtyLabel: '3688', price: 14800, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: false, availability: 'available' },
  { id: 'mlbb-dia-5532', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '5532 Diamonds', qtyLabel: '5532', price: 22000, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: false, availability: 'available' },
  { id: 'mlbb-dia-9288', game: 'mlbb', name: 'Diamonds', category: 'Standard Diamonds', description: '9288 Diamonds', qtyLabel: '9288', price: 36000, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbDiamond, popular: false, availability: 'available' },

  // ---- Mobile Legends — Double Diamonds (only 1st time) ----
  { id: 'mlbb-double-50', game: 'mlbb', name: 'Double Diamonds', category: 'Double Diamonds', description: '50+50 Diamonds', qtyLabel: '50+50', price: 270, currency: 'PKR', discountPrice: null, image: 'mlbb', supportLabel: 'Only 1st time', popular: true, availability: 'available' },
  { id: 'mlbb-double-150', game: 'mlbb', name: 'Double Diamonds', category: 'Double Diamonds', description: '150+150 Diamonds', qtyLabel: '150+150', price: 750, currency: 'PKR', discountPrice: null, image: 'mlbb', supportLabel: 'Only 1st time', popular: true, availability: 'available' },
  { id: 'mlbb-double-250', game: 'mlbb', name: 'Double Diamonds', category: 'Double Diamonds', description: '250+250 Diamonds', qtyLabel: '250+250', price: 1200, currency: 'PKR', discountPrice: null, image: 'mlbb', supportLabel: 'Only 1st time', popular: true, availability: 'available' },
  { id: 'mlbb-double-500', game: 'mlbb', name: 'Double Diamonds', category: 'Double Diamonds', description: '500+500 Diamonds', qtyLabel: '500+500', price: 2300, currency: 'PKR', discountPrice: null, image: 'mlbb', supportLabel: 'Only 1st time', popular: false, availability: 'available' },

  // ---- Mobile Legends — Passes ----
  { id: 'mlbb-weekly', game: 'mlbb', name: 'Weekly Pass', category: 'Passes', description: 'Weekly Pass', qtyLabel: 'Weekly Pass', price: 460, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbWeeklyPass, supportLabel: 'Daily diamonds across the week', popular: true, availability: 'available' },
  { id: 'mlbb-weekly-3x', game: 'mlbb', name: '3× Weekly Pass', category: 'Passes', description: '3× Weekly Pass', qtyLabel: '3× Weekly Pass', price: 1350, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbWeeklyPass, supportLabel: '3 weeks of diamonds', popular: true, availability: 'available' },
  { id: 'mlbb-twilight', game: 'mlbb', name: 'Twilight Pass', category: 'Passes', description: 'Twilight Pass', qtyLabel: 'Twilight Pass', price: 2450, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbTwilightPass, supportLabel: 'Limited-time pass', popular: false, availability: 'available' },
  { id: 'mlbb-starlight', game: 'mlbb', name: 'Normal Starlight', category: 'Passes', description: 'Normal Starlight (D.R)', qtyLabel: 'Normal Starlight', price: 1350, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbStarlight, supportLabel: 'Monthly Starlight membership', popular: true, availability: 'available' },
  { id: 'mlbb-starlight-plus', game: 'mlbb', name: 'Premium Starlight', category: 'Passes', description: 'Premium Starlight (D.R)', qtyLabel: 'Premium Starlight', price: 3000, currency: 'PKR', discountPrice: null, image: 'mlbb', artwork: PRODUCT_ART.mlbbPremiumStarlight, supportLabel: 'Premium rewards', popular: false, availability: 'available' },

  // ---- Honor of Kings — Tokens ----
  { id: 'hok-tokens-80', game: 'hok', name: 'Honor Tokens', category: 'Tokens', description: '80 + Bonus Tokens', qtyLabel: '80 + Bonus', price: 280, currency: 'PKR', discountPrice: null, image: 'hok', artwork: PRODUCT_ART.hokTokens, popular: true, availability: 'available' },
  { id: 'hok-tokens-240', game: 'hok', name: 'Honor Tokens', category: 'Tokens', description: '240 + Bonus Tokens', qtyLabel: '240 + Bonus', price: 850, currency: 'PKR', discountPrice: null, image: 'hok', artwork: PRODUCT_ART.hokTokens, popular: true, availability: 'available' },
  { id: 'hok-tokens-400', game: 'hok', name: 'Honor Tokens', category: 'Tokens', description: '400 + Bonus Tokens', qtyLabel: '400 + Bonus', price: 1400, currency: 'PKR', discountPrice: null, image: 'hok', artwork: PRODUCT_ART.hokTokens, popular: true, availability: 'available' },
  { id: 'hok-tokens-560', game: 'hok', name: 'Honor Tokens', category: 'Tokens', description: '560 + Bonus Tokens', qtyLabel: '560 + Bonus', price: 2000, currency: 'PKR', discountPrice: null, image: 'hok', artwork: PRODUCT_ART.hokTokens, popular: true, availability: 'available' },
  { id: 'hok-tokens-800', game: 'hok', name: 'Honor Tokens', category: 'Tokens', description: '800 + Bonus Tokens', qtyLabel: '800 + Bonus', price: 2800, currency: 'PKR', discountPrice: null, image: 'hok', artwork: PRODUCT_ART.hokTokens, popular: true, availability: 'available' },
  { id: 'hok-tokens-1200', game: 'hok', name: 'Honor Tokens', category: 'Tokens', description: '1200 + Bonus Tokens', qtyLabel: '1200 + Bonus', price: 4200, currency: 'PKR', discountPrice: null, image: 'hok', artwork: PRODUCT_ART.hokTokens, popular: false, availability: 'available' },
  { id: 'hok-tokens-2400', game: 'hok', name: 'Honor Tokens', category: 'Tokens', description: '2400 + Bonus Tokens', qtyLabel: '2400 + Bonus', price: 8000, currency: 'PKR', discountPrice: null, image: 'hok', artwork: PRODUCT_ART.hokTokens, popular: false, availability: 'available' },
  { id: 'hok-tokens-4000', game: 'hok', name: 'Honor Tokens', category: 'Tokens', description: '4000 + Bonus Tokens', qtyLabel: '4000 + Bonus', price: 13300, currency: 'PKR', discountPrice: null, image: 'hok', artwork: PRODUCT_ART.hokTokens, popular: false, availability: 'available' },
  { id: 'hok-tokens-6400', game: 'hok', name: 'Honor Tokens', category: 'Tokens', description: '6400 + Bonus Tokens', qtyLabel: '6400 + Bonus', price: 21300, currency: 'PKR', discountPrice: null, image: 'hok', artwork: PRODUCT_ART.hokTokens, popular: false, availability: 'available' },
  { id: 'hok-tokens-8000', game: 'hok', name: 'Honor Tokens', category: 'Tokens', description: '8000 + Bonus Tokens', qtyLabel: '8000 + Bonus', price: 26600, currency: 'PKR', discountPrice: null, image: 'hok', artwork: PRODUCT_ART.hokTokens, popular: false, availability: 'available' },
  { id: 'hok-tokens-12000', game: 'hok', name: 'Honor Tokens', category: 'Tokens', description: '12000 + Bonus Tokens', qtyLabel: '12000 + Bonus', price: 39900, currency: 'PKR', discountPrice: null, image: 'hok', artwork: PRODUCT_ART.hokTokens, popular: false, availability: 'available' },
  { id: 'hok-tokens-16000', game: 'hok', name: 'Honor Tokens', category: 'Tokens', description: '16000 + Bonus Tokens', qtyLabel: '16000 + Bonus', price: 53200, currency: 'PKR', discountPrice: null, image: 'hok', artwork: PRODUCT_ART.hokTokens, popular: false, availability: 'available' },

  // ---- Honor of Kings — Cards ----
  { id: 'hok-weekly-card', game: 'hok', name: 'Weekly Card', category: 'Cards', description: 'Weekly Card', qtyLabel: 'Weekly Card', price: 350, currency: 'PKR', discountPrice: null, image: 'hok', supportLabel: 'Daily token rewards', popular: true, availability: 'available' },
  { id: 'hok-weekly-card-plus', game: 'hok', name: 'Weekly Card Plus', category: 'Cards', description: 'Weekly Card Plus', qtyLabel: 'Weekly Card Plus', price: 950, currency: 'PKR', discountPrice: null, image: 'hok', supportLabel: 'Bonus token rewards', popular: false, availability: 'available' }
];

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
export const productsForGame = (gameId) => PRODUCTS.filter((p) => p.game === gameId);
export const popularProducts = () => PRODUCTS.filter((p) => p.popular && p.availability === 'available');

const VISUAL_HINT = {
  pubg: { glyph: 'UC', accent: '#f5472c' },
  mlbb: { glyph: 'ML', accent: '#22c3d8' },
  genshin: { glyph: 'GO', accent: '#5a8cff' },
  hok: { glyph: 'HK', accent: '#f2b23a' }
};

// Legacy visual hint (glyph + accent) — used as a last-resort fallback by
// legacy tiles. Modern cards prefer product.artwork, then the game logo.
export function productVisual(product, game) {
  const hint = VISUAL_HINT[product.image] || { glyph: 'NA', accent: '#8a8f9d' };
  return { glyph: hint.glyph, accent: game ? game.accent : hint.accent };
}