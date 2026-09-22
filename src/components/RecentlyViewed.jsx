import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { getGame } from '../data/games';
import { getProduct } from '../data/products';

export default function RecentlyViewed() {
  const { items, clear } = useStore();

  // Drop stale entries for games/products that no longer exist.
  const valid = items.filter((it) => {
    if (it.type === 'game') return !!getGame(it.id);
    if (it.type === 'product') return !!getGame(it.game) && !!getProduct(it.id);
    return true;
  });

  if (!valid.length) return null;

  const chipHref = (item) => {
    if (item.type === 'game') return `/games/${item.id}/topup`;
    if (item.type === 'product') return `/games/${item.game}/topup?product=${item.id}`;
    return item.href || '/';
  };

  const groom = (item) => {
    if (item.type === 'game') {
      const g = getGame(item.id);
      return { ...item, image: g?.banner, label: g?.name || item.label, code: 'Game' };
    }
    if (item.type === 'product') {
      const g = getGame(item.game);
      return { ...item, image: item.image, label: item.label, code: g?.name || item.game };
    }
    return item;
  };

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="sec-head__row">
          <div>
            <h2 className="sec-head__title">Recently Viewed</h2>
            <p className="sec-head__desc">Your latest games and products.</p>
          </div>
          <button type="button" className="btn btn--ghost btn--sm" onClick={clear}>
            Clear
          </button>
        </div>
        <div className="recent-strip">
          {valid.map((raw) => {
            const item = groom(raw);
            return (
              <Link key={`${item.type}-${item.id}`} to={chipHref(item)} className="recent-chip">
                <span className="recent-chip__thumb">
                  {item.image ? <img src={item.image} alt="" loading="lazy" /> : item.code}
                </span>
                <span>
                  <span className="recent-chip__t">{item.label}</span>
                  <span className="recent-chip__s">{item.code}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}