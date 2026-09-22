import { bannerFor, logoFor } from './assets';

// Mobile Legends pre-orders — prices mirror the confirmed owner rate list.
export const PREORDERS = [
  { id: 'po-starlight-next', game: 'mlbb', name: 'Normal Starlight (D.R)', artwork: bannerFor('mlbb'), logo: logoFor('mlbb'), releaseDate: '2026-09-01', price: 1350, discountPrice: null, status: 'open', tag: 'Starlight' },
  { id: 'po-starlight-plus', game: 'mlbb', name: 'Premium Starlight (D.R)', artwork: bannerFor('mlbb'), logo: logoFor('mlbb'), releaseDate: '2026-09-01', price: 3000, discountPrice: null, status: 'open', tag: 'Starlight' },
  { id: 'po-twilight', game: 'mlbb', name: 'Twilight Pass', artwork: bannerFor('mlbb'), logo: logoFor('mlbb'), releaseDate: '2026-09-01', price: 2450, discountPrice: null, status: 'open', tag: 'Pass' },
  { id: 'po-weekly', game: 'mlbb', name: 'Weekly Pass', artwork: bannerFor('mlbb'), logo: logoFor('mlbb'), releaseDate: '2026-09-01', price: 460, discountPrice: null, status: 'open', tag: 'Pass' }
];