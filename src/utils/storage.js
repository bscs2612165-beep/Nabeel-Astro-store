// Lightweight localStorage wrapper with safety checks.
export const KEY_RECENT = 'nas_recently_viewed';
export const KEY_ORDERS = 'nas_orders';
export const KEY_PROFILE = 'nas_profile';
export const KEY_AUTH = 'nas_auth';

function safeParse(raw) {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

export function storageGet(key) {
  try {
    return safeParse(localStorage.getItem(key));
  } catch (_) {
    return null;
  }
}

export function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_) {
    /* quota or privacy mode — ignore */
  }
}

export function storageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch (_) {
    /* ignore */
  }
}