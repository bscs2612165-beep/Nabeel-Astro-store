import { GAMES } from '../data/games';
import { productsForGame } from '../data/products';

// Per-game configuration controlling the top-up flow:
// fields, instructions, validation, and linked products.
// Extend here (e.g. extra fields) without touching page markup.
const build = (cfg) => cfg;

export const gameConfigs = {
  pubg: build({
    game: GAMES.find((g) => g.id === 'pubg'),
    products: () => productsForGame('pubg'),
    fields: [
      { id: 'playerId', label: 'Player ID', type: 'text', placeholder: 'In-game Player ID', required: true, error: 'Enter your Player ID.' },
      { id: 'server', label: 'Server', type: 'select', required: false, options: ['Auto', 'Asia', 'North America', 'Europe'] }
    ],
    validate: (values) => {
      const errs = {};
      if (!values.playerId || values.playerId.trim().length < 6) errs.playerId = 'Player ID looks too short.';
      return errs;
    },
    instructions: ['Find your Player ID under Settings → Account.', 'Double-check the ID before checkout to avoid errors.']
  }),
  mlbb: build({
    game: GAMES.find((g) => g.id === 'mlbb'),
    products: () => productsForGame('mlbb'),
    fields: [
      { id: 'userId', label: 'User ID', type: 'numeric', placeholder: 'Enter your User ID', required: true, error: 'Enter your User ID.' },
      { id: 'zoneId', label: 'Zone ID / Server ID', type: 'numeric', placeholder: 'Enter your Zone ID', required: true, error: 'Enter your Zone ID.', hint: 'Your Zone ID / Server ID is the number shown in parentheses next to your User ID in Mobile Legends.' }
    ],
    validate: (values) => {
      const errs = {};
      const userId = (values.userId || '').trim();
      const zoneId = (values.zoneId || '').trim();
      if (!userId) errs.userId = 'User ID is required.';
      else if (!/^\d+$/.test(userId)) errs.userId = 'User ID must be numeric.';
      else if (userId.length < 4) errs.userId = 'User ID must be at least 4 digits.';
      if (!zoneId) errs.zoneId = 'Zone ID is required.';
      else if (!/^\d+$/.test(zoneId)) errs.zoneId = 'Zone ID must be numeric.';
      return errs;
    },
    instructions: ['Find your User ID on your profile screen.', 'Your Zone ID / Server ID is shown in parentheses next to your User ID.']
  }),
  hok: build({
    game: GAMES.find((g) => g.id === 'hok'),
    products: () => productsForGame('hok'),
    fields: [
      { id: 'accountId', label: 'Account ID', type: 'text', placeholder: 'In-game Account ID', required: true, error: 'Enter your Account ID.' }
    ],
    validate: (values) => {
      const errs = {};
      if (!values.accountId || values.accountId.trim().length < 4) errs.accountId = 'Account ID is required.';
      return errs;
    },
    instructions: ['Your Account ID is shown in your in-game profile.']
  })
};

export const getGameConfig = (id) => gameConfigs[id] || gameConfigs.pubg;