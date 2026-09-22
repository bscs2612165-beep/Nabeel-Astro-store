import { bannerFor, logoFor } from './assets';

// Reusable event catalog covering supported games.
export const EVENTS = [
  { id: 'pubg-royale-remix', game: 'pubg', title: 'Royale Remix Season', description: 'Explore new map rotations, fresh crate drops, and a full season of ranked rewards for PUBG Mobile squads.', image: bannerFor('pubg'), logo: logoFor('pubg'), start: '2026-08-10', end: '2026-09-08', tag: 'Season Update' },
  { id: 'pubg-limited-rewards', game: 'pubg', title: 'Limited Reward Crate', description: 'A short-window crate with exclusive outfits and emotes for the most dedicated survivors.', image: bannerFor('pubg'), logo: logoFor('pubg'), start: '2026-08-15', end: '2026-09-15', tag: 'Limited Rewards' },
  { id: 'mlbb-collab', game: 'mlbb', title: 'Land of Dawn Collaboration', description: 'Limited collaboration skins and a fresh in-game event arrive for Mobile Legends fans.', image: bannerFor('mlbb'), logo: logoFor('mlbb'), start: '2026-08-12', end: '2026-09-20', tag: 'Collaboration' },
  { id: 'mlbb-monthly', game: 'mlbb', title: 'Monthly Hero Spotlight', description: 'Monthly promotions and featured hero offerings for the Mobile Legends community.', image: bannerFor('mlbb'), logo: logoFor('mlbb'), start: '2026-08-01', end: '2026-08-31', tag: 'Monthly' },
  { id: 'hok-seasonal', game: 'hok', title: 'Honor of Kings Season', description: 'A brand-new ranked season with fresh rewards for climbing the Honor of Kings ladder.', image: bannerFor('hok'), logo: logoFor('hok'), start: '2026-08-14', end: '2026-09-28', tag: 'Seasonal' },
  { id: 'hok-hero', game: 'hok', title: 'Featured Hero Event', description: 'Limited hero offerings and seasonal rewards for Honor of Kings players.', image: bannerFor('hok'), logo: logoFor('hok'), start: '2026-08-05', end: '2026-08-31', tag: 'Hero Event' }
];

export const getEvent = (id) => EVENTS.find((e) => e.id === id);
