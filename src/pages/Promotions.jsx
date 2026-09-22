import { useNavigate } from 'react-router-dom';
import { PROMOTIONS } from '../data/promotions';
import { formatDate } from '../utils/format';

export default function Promotions() {
  const navigate = useNavigate();

  return (
    <>
      <header className="page-head page-head--accent">
        <div className="container">
          <div className="sec-head__eyebrow">Deals</div>
          <h1 className="page-head__title">Promotions</h1>
          <p className="page-head__desc">Limited-time offers and promo codes across supported games.</p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="grid grid--2">
            {PROMOTIONS.map((p) => (
              <article className="media-card promo-card" key={p.id}>
                <div className="promo-card__media media-card__media media-card__media--short">
                  <img src={p.image} alt={`${p.title} artwork`} loading="lazy" />
                </div>
                <div className="media-card__body">
                  <div className="media-card__tag">{p.discountText}</div>
                  <div className="media-card__title mt-8">{p.title}</div>
                  <p className="media-card__desc">{p.tagline}</p>
                  <div className="media-card__meta">Use code <strong className="accent">{p.code}</strong> · until {formatDate(p.expiry)}</div>
                  <button type="button" className="btn btn--secondary btn--sm mt-8" onClick={() => navigate('/games')}>
                    Browse deals
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}