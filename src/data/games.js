import { LOGOS, BANNERS } from './assets';

// Supported games.
// Active games offer a full top-up flow. Games flagged `comingSoon` are
// displayed as intentional, premium "coming soon" cards — no products or
// prices are shown until they go live.
export const GAMES = [
  {
    id: 'pubg',
    name: 'PUBG Mobile',
    short: 'PUBG',
    tagline: 'Drop in, gear up, rule the zone.',
    description: 'Battle royale at its finest. Top up UC to unlock outfit crates, Royale Pass, and premium in-game currency.',
    banner: BANNERS.pubg,
    logo: LOGOS.pubg,
    accent: '#f5472c',
    accentSoft: 'rgba(245,71,44,0.14)',
    popular: true,
    hasEvents: true,
    playerField: { id: 'playerId', label: 'Player ID', placeholder: 'Your in-game Player ID', helper: 'Find it in Settings → Account → Player ID.' }
  },
  {
    id: 'mlbb',
    name: 'Mobile Legends: Bang Bang',
    short: 'MLBB',
    tagline: 'Join the battle of legends.',
    description: 'Dominate the Land of Dawn. Top up Diamonds, Weekly Pass, and monthly Starlight offerings for your favorite heroes.',
    banner: BANNERS.mlbb,
    logo: LOGOS.mlbb,
    accent: '#22c3d8',
    accentSoft: 'rgba(34,195,216,0.12)',
    popular: true,
    hasEvents: true,
    playerField: { id: 'userId', label: 'User ID', placeholder: 'In-game User ID + Server ID', helper: 'Find it in Profile → the number under your name.' }
  },
  {
    id: 'hok',
    name: 'Honor of Kings',
    short: 'HOK',
    tagline: 'Rise to the throne of honor.',
    description: 'Team up for epic 5v5 battles. Top up Tokens and supported currency packages to unlock heroes and seasonal rewards.',
    banner: BANNERS.hok,
    logo: LOGOS.hok,
    accent: '#f2b23a',
    accentSoft: 'rgba(242,178,58,0.12)',
    popular: true,
    hasEvents: true,
    playerField: { id: 'accountId', label: 'Account ID', placeholder: 'In-game Account ID', helper: 'Found under your profile within the game.' }
  },
  {
    id: 'genshin',
    name: 'Genshin Impact',
    short: 'Genshin',
    tagline: 'Travel across Teyvat.',
    description: 'A breathtaking open world awaits. Genshin top-ups are coming to Nabeel Astro Store soon — stay tuned.',
    banner: BANNERS.genshin,
    logo: LOGOS.genshin,
    accent: '#5a8cff',
    accentSoft: 'rgba(90,140,255,0.12)',
    popular: true,
    hasEvents: false,
    comingSoon: true,
    playerField: { id: 'uid', label: 'UID', placeholder: 'Your Traveler UID', helper: 'Found in the Paimon menu → Profile → UID.' }
  }
];

export const getGame = (id) => GAMES.find((g) => g.id === id);

export const ACTIVE_GAMES = GAMES.filter((g) => !g.comingSoon);
