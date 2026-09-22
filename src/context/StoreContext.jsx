import { createContext, useContext, useMemo, useState } from 'react';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { KEY_AUTH, KEY_PROFILE, storageGet, storageSet, storageRemove } from '../utils/storage';

const StoreContext = createContext(null);

// Lightweight demo auth (mock only — Stage 1). No real authentication.
function useMockAuth() {
  const [user, setUser] = useState(() => storageGet(KEY_AUTH) || null);
  const [profile, setProfile] = useState(() => storageGet(KEY_PROFILE) || null);

  const login = (email) => {
    const u = { email, name: email.split('@')[0] || 'Gamer' };
    setUser(u);
    storageSet(KEY_AUTH, u);
    if (!profile) {
      const p = { name: u.name, email, favorites: [], joined: new Date().toISOString().slice(0, 10) };
      setProfile(p);
      storageSet(KEY_PROFILE, p);
    }
    return u;
  };

  const logout = () => {
    setUser(null);
    storageRemove(KEY_AUTH);
  };

  return { user, profile, login, logout };
}

export function StoreProvider({ children }) {
  const auth = useMockAuth();
  const recent = useRecentlyViewed();
  const value = useMemo(() => ({ ...auth, ...recent }), [auth, recent]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}