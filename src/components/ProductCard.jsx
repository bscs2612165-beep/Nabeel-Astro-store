import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/format';
import { getGame } from '../data/games';

// Single-badge system. `product.badge` may override; otherwise derived from data.
const BADGE_STYLES = {
  popular: { label: 'Popular', className: '' },
  sale: { label: 'Sale', className: 'product-card__badge--off' },
  new: { label: 'New', className: 'product-card__badge--new' },
  best: { label: 'Best Value', className: 'product-card__badge--best' }
};

export default function ProductCard({ product }) {
  const game = getGame(product.game);
  const navigate = useNavigate();
  const disabled = product.availability !== 'available';
  const pending = product.availability === 'pricing-pending';

  const open = () => navigate(`/games/${product.game}/topup?product=${product.id}`);

  const amount = product.qtyLabel || product.description || product.name;
  const supportText =
    product.supportLabel || (product.description && product.description !== amount ? product.description : 'Instant Top-Up');

  const badgeKey = product.badge || (product.discountPrice ? 'sale' : product.popular ? 'popular' : null);
  const badge = badgeKey ? BADGE_STYLES[badgeKey] : null;

  const currentPrice = product.discountPrice || product.price;
  const originalPrice = product.discountPrice ? product.price : null;
  const savings = product.discountPrice ? product.price - product.discountPrice : 0;

  // Real currency artwork when available; otherwise the game logo (graceful).
  const artwork = product.artwork || (game ? game.logo : null);
  const artworkAlt = product.artwork
    ? `${amount} ${game?.name || 'game'} currency artwork`
    : `${game?.name || 'Game'} logo`;
  const artworkLabel = `Open ${product.name} — ${amount}`;

  return (
    <article className={`product-card${disabled ? ' is-disabled' : ''}${pending ? ' is-pending' : ''}`} style={{ '--card-accent': game?.accent }}>
      {badge && !disabled && (
        <span className={`product-card__badge ${badge.className}`}>{badge.label}</span>
      )}

      <button
        type="button"
        className="product-card__art"
        style={{ background: game?.accentSoft }}
        onClick={open}
        disabled={disabled}
        aria-label={artworkLabel}
      >
        <span
          className="product-card__glow"
          aria-hidden="true"
          style={{ background: `radial-gradient(120% 90% at 50% -10%, color-mix(in srgb, ${game?.accent || '#7c6cff'} 30%, transparent), transparent 68%)` }}
        />
        {artwork && <img src={artwork} alt={artworkAlt} loading="lazy" />}
        <span className="product-card__cat" aria-hidden="true">{product.category}</span>
      </button>

      <div className="product-card__body">
        <div className="product-card__game">{game?.name}</div>
        <div className="product-card__name">{amount}</div>
        <p className="product-card__desc">{supportText}</p>

        <div className="product-card__price-row">
          {pending ? (
            <div className="product-card__pending">
              <span className="product-card__pending-label">Price coming soon</span>
              <span className="product-card__pending-note">Owner rates on the way</span>
            </div>
          ) : (
            <div className="product-card__price">
              <span className="product-card__price-line">
                <span className="product-card__now">{formatPrice(currentPrice)}</span>
                {originalPrice != null && <del className="product-card__orig">{formatPrice(originalPrice)}</del>}
              </span>
              {savings > 0 && <span className="product-card__save">Save {formatPrice(savings)}</span>}
            </div>
          )}

          <button
            type="button"
            className={`btn btn--primary btn--sm product-card__cta${pending ? ' btn--ghost' : ''}`}
            onClick={open}
            disabled={disabled}
            aria-label={`Top up ${product.name} — ${amount}${currentPrice ? ` for ${formatPrice(currentPrice)}` : ''}`}
          >
            {disabled ? (pending ? 'Coming Soon' : 'Unavailable') : 'Top Up'}
          </button>
        </div>
      </div>
    </article>
  );
}