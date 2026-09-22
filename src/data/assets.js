// Central asset registry — single source of truth for every supplied image.
// Images are imported so Vite bundles, optimizes and hashes them at build time.

import pubgBanner from '../../assets/banners/pubg.jpg';
import mlbbBanner from '../../assets/banners/mlbb.jpg';
import mlbbHeroBanner from '../../assets/banners/mlbb-hero.jpg';
import genshinBanner from '../../assets/banners/genshin-web.jpg';
import hokBanner from '../../assets/banners/hok.jpg';

import pubgLogo from '../../assets/logos/pubg.png';
import mlbbLogo from '../../assets/logos/mlbb.png';
import genshinLogo from '../../assets/logos/genshin.png';
import hokLogo from '../../assets/logos/hok.png';

import ownerPhoto from '../../assets/owner/owner.jpg';

// Product artwork — the real currency/package visuals used on product cards.
import pubgUcWide from '../../assets/products/pubg/pubg-uc-wide.jpg';
import pubgUcCrate from '../../assets/products/pubg/pubg-uc-crate.jpg';
import pubgUcStack from '../../assets/products/pubg/pubg-uc-stack.jpg';

import mlbbStarlight from '../../assets/products/mlbb/starlight.jpg';
import mlbbPremiumStarlight from '../../assets/products/mlbb/premium-starlight.jpg';
import mlbbWeeklyPass from '../../assets/products/mlbb/weeklypass.jpg';
import mlbbTwilightPass from '../../assets/products/mlbb/twilight-pass.jpg';
import mlbbDiamond from '../../assets/products/mlbb/diamond.jpg';

import hokTokens from '../../assets/products/hok/hok-tokens.jpg';

export const BANNERS = {
  pubg: pubgBanner,
  mlbb: mlbbBanner,
  genshin: genshinBanner,
  hok: hokBanner
};

// High-resolution Johnson hero artwork for the homepage hero.
export const HERO_IMAGE = mlbbHeroBanner;

export const LOGOS = {
  pubg: pubgLogo,
  mlbb: mlbbLogo,
  genshin: genshinLogo,
  hok: hokLogo
};

export const OWNER_IMAGE = ownerPhoto;

// PUBG UC artwork set (widest → promo, near-square crate → hero, mid → stacked).
export const PRODUCT_ART = {
  pubgUcWide,
  pubgUcCrate,
  pubgUcStack,
  mlbbStarlight,
  mlbbPremiumStarlight,
  mlbbWeeklyPass,
  mlbbTwilightPass,
  mlbbDiamond,
  hokTokens
};

export function bannerFor(key) {
  return BANNERS[key] || pubgBanner;
}

export function logoFor(key) {
  return LOGOS[key] || pubgLogo;
}
