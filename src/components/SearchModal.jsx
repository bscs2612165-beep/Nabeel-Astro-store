import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../context/UIContext';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { GAMES } from '../data/games';
import { PRODUCTS } from '../data/products';
import { EVENTS } from '../data/events';
import { PROMOTIONS } from '../data/promotions';
import { TIPS } from '../data/tips';
import { logoFor } from '../data/assets';

const SUGGESTIONS = ['PUBG UC', 'Diamonds', 'Double Diamonds', 'Tokens', 'Starlight', 'Weekly Pass'];

function norm(s) {
  return s.toLowerCase().trim();
}

export default function SearchModal() {
  const { searchOpen, setSearchOpen } = useUI();
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const navigate = useNavigate();
  useFocusTrap(panelRef, searchOpen);

  useEffect(() => {
    if (searchOpen) {
      setQ('');
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current && inputRef.current.focus(), 30);
      return () => { document.body.style.overflow = prev; };
    }
    return undefined;
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const query = norm(q);
    if (!query) return null;
    const games = GAMES.filter((g) => norm(g.name).includes(query) || norm(g.short).includes(query));
    const products = PRODUCTS.filter((p) => [p.name, p.description, p.category].some((x) => norm(String(x)).includes(query)));
    const events = EVENTS.filter((e) => norm(e.title).includes(query) || norm(e.description).includes(query));
    const promos = PROMOTIONS.filter((p) => norm(p.title).includes(query) || norm(p.code).includes(query));
    const tips = TIPS.filter((t) => norm(t.tip).includes(query) || norm(t.category).includes(query));
    return { games, products, events, promos, tips };
  }, [q]);

  const noResults = q && results && !results.games.length && !results.products.length && !results.events.length && !results.promos.length && !results.tips.length;

  const go = (to) => {
    setSearchOpen(false);
    navigate(to);
  };

  if (!searchOpen) return null;

  return (
    <div className="search-modal" role="dialog" aria-modal="true" aria-label="Search">
      <div className="search-modal__backdrop" onClick={() => setSearchOpen(false)} />
      <div className="search-modal__panel" ref={panelRef}>
        <div className="search-modal__input-row">
          <span aria-hidden="true" style={{ fontSize: 18, color: 'var(--text3)' }}>⌕</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search games, products, events…"
            aria-label="Search"
          />
          {q && (
            <button type="button" className="icon-btn" aria-label="Clear" onClick={() => setQ('')}>✕</button>
          )}
        </div>

        {!q ? (
          <div className="search-modal__hint">
            <span>Try searching for</span>
            <span>
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" onClick={() => setQ(s)} style={{ color: 'var(--accent)', margin: '0 4px', fontWeight: 600 }}>
                  {s}
                </button>
              ))}
            </span>
          </div>
        ) : (
          <div className="search-modal__results">
            {noResults ? (
              <div className="state state--empty">
                <div className="state__icon">∅</div>
                <div className="state__title">No results found</div>
                <div className="state__desc">No matches for “{q}”. Try another keyword.</div>
              </div>
            ) : (
              <>
                {results.games.map((g) => (
                  <button key={`g-${g.id}`} className="result-row" onClick={() => go(`/games/${g.id}/topup`)}>
                    <span className="result-row__thumb"><img src={g.banner} alt="" /></span>
                    <span className="result-row__title">{g.name}</span>
                    <span className="result-row__sub" style={{ marginLeft: 'auto' }}>{g.comingSoon ? 'Game · Coming soon' : 'Game'}</span>
                  </button>
                ))}
                {results.products.map((p) => (
                  <button key={`p-${p.id}`} className="result-row" onClick={() => go(`/games/${p.game}/topup?product=${p.id}`)}>
                    <span className="result-row__thumb"><img src={logoFor(p.image)} alt="" /></span>
                    <span className="result-row__title">{p.name} · {p.description}</span>
                    <span className="result-row__sub" style={{ marginLeft: 'auto' }}>Product</span>
                  </button>
                ))}
                {results.events.map((e) => (
                  <button key={`e-${e.id}`} className="result-row" onClick={() => go(`/events/${e.id}`)}>
                    <span className="result-row__thumb"><img src={e.image} alt="" /></span>
                    <span className="result-row__title">{e.title}</span>
                    <span className="result-row__sub" style={{ marginLeft: 'auto' }}>Event</span>
                  </button>
                ))}
                {results.promos.map((t) => (
                  <button key={`r-${t.id}`} className="result-row" onClick={() => go('/promotions')}>
                    <span className="result-row__title">{t.title} <span className="result-row__sub">· {t.code}</span></span>
                    <span className="result-row__sub" style={{ marginLeft: 'auto' }}>Promotion</span>
                  </button>
                ))}
                {results.tips.map((t) => (
                  <button key={`t-${t.id}`} className="result-row" onClick={() => go('/tips')}>
                    <span className="result-row__title">{t.category}</span>
                    <span className="result-row__sub" style={{ marginLeft: 'auto' }}>{t.gameName} Tip</span>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}