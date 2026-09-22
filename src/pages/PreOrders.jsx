import { useNavigate } from 'react-router-dom';
import { PREORDERS } from '../data/preorders';
import { formatPrice, formatDate } from '../utils/format';
import { useToast } from '../context/ToastContext';

export default function PreOrders() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const open = PREORDERS.filter((p) => p.status === 'open');
  const soon = PREORDERS.filter((p) => p.status !== 'open');

  const preorder = (p) => {
    toast('Pre-order noted', `${p.name} is on your list. We'll let you know at release.`, 'info');
  };

  const renderList = (list) => (
    <div className="grid grid--4">
      {list.map((p) => (
        <article className="pre-card" key={p.id}>
          <div className="pre-card__media">
            <img src={p.artwork} alt={`${p.name} artwork`} loading="lazy" />
            <span className={`pre-card__status pre-card__status--${p.status}`}>{p.status}</span>
          </div>
          <div className="pre-card__body">
            <div className="pre-card__tag">{p.tag}</div>
            <div className="pre-card__name">{p.name}</div>
            <div className="pre-card__release">Releases {formatDate(p.releaseDate)}</div>
            <div className="pre-card__foot">
              <span className="product-card__price">
                {p.discountPrice ? <><del>{formatPrice(p.price)}</del>{formatPrice(p.discountPrice)}</> : formatPrice(p.price)}
              </span>
              <button type="button" className="btn btn--primary btn--sm" onClick={() => preorder(p)}>
                Pre-order
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <>
      <header className="page-head page-head--accent">
        <div className="container">
          <div className="sec-head__eyebrow">Mobile Legends</div>
          <h1 className="page-head__title">Pre-Orders</h1>
          <p className="page-head__desc">Reserve upcoming Mobile Legends offerings before release. Pre-orders are not charged until release.</p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="sec-head"><div className="sec-head__eyebrow">Open now</div><h2 className="sec-head__title">Open Pre-Orders</h2></div>
          {open.length ? renderList(open) : <p className="muted">No open pre-orders right now.</p>}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head"><div className="sec-head__eyebrow">Coming up</div><h2 className="sec-head__title">Coming Soon</h2></div>
          {soon.length ? renderList(soon) : <p className="muted">Nothing announced yet.</p>}
        </div>
      </section>
    </>
  );
}