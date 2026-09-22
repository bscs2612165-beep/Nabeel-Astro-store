import { useCallback, useState } from 'react';
import { KEY_RECENT, storageGet, storageSet } from '../utils/storage';

const MAX = 12;

export function useRecentlyViewed() {
  const [items, setItems] = useState(() => storageGet(KEY_RECENT) || []);

  const add = useCallback((entry) => {
    const current = storageGet(KEY_RECENT) || [];
    const filtered = current.filter((i) => !(i.type === entry.type && i.id === entry.id));
    const next = [{ ...entry, viewedAt: Date.now() }, ...filtered].slice(0, MAX);
    storageSet(KEY_RECENT, next);
    setItems(next);
  }, []);

  const clear = useCallback(() => {
    storageSet(KEY_RECENT, []);
    setItems([]);
  }, []);

  return { items, add, clear };
}