import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { getOrders } from '../utils/order';
import { ACTIVE_GAMES } from '../data/games';
import { formatPrice, formatDate } from '../utils/format';

function statusTone(status) {
  const map = { 'Order Created': 'created', 'Payment Pending': 'pending', 'Payment Confirmed': 'confirmed', Processing: 'processing', Completed: 'completed' };
  return map[status] || 'created';
}

export default function Account() {
  const { user, profile, logout } = useStore();
  const navigate = useNavigate();
  const orders = getOrders();

  if (!user) {
    return (
      <div className="section"><div className="container" style={{ maxWidth: 520 }}>
        <div className="panel">
          <h2 className="panel__title">Log in to view your dashboard</h2>
          <p className="panel__sub">This is a demo dashboard. No real authentication.</p>
          <div className="row">
            <button type="button" className="btn btn--primary grow" onClick={() => navigate('/login')}>Login</button>
            <button type="button" className="btn btn--secondary grow" onClick={() => navigate('/login?mode=signup')}>Create account</button>
          </div>
        </div>
      </div></div>
    );
  }

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 900 }}>
        <div className="sec-head__eyebrow">Dashboard</div>
        <h1 className="page-head__title" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', marginBottom: 24 }}>My Account</h1>

        <div className="grid grid--2">
          {/* Profile */}
          <div className="panel">
            <div className="panel__title">Profile</div>
            <div className="os__kv"><div className="os__k">Name</div><div className="os__v">{profile?.name || user.name}</div></div>
            <div className="os__kv"><div className="os__k">Email</div><div className="os__v">{user.email}</div></div>
            <div className="os__kv"><div className="os__k">Member since</div><div className="os__v">{formatDate(profile?.joined)}</div></div>
            <div className="row mt-16">
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => { logout(); navigate('/'); }}>
                Log out
              </button>
            </div>
          </div>

          {/* Favorite games */}
          <div className="panel">
            <div className="panel__title">Favorite games</div>
            <div className="pkg-list">
              {ACTIVE_GAMES.map((g) => (
                <button type="button" key={g.id} className="pkg-opt" onClick={() => navigate(`/games/${g.id}/topup`)}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={g.logo} alt="" style={{ width: 44, height: 28, objectFit: 'contain' }} />
                    <span className="pkg-opt__label">{g.name}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent orders */}
        <div className="mt-24">
          <div className="sec-head__row">
            <div><h2 className="sec-head__title">Recent orders</h2><p className="sec-head__desc">Your latest top-ups.</p></div>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => navigate('/check-order')}>Check order</button>
          </div>

          {orders.length === 0 ? (
            <div className="panel">
              <div className="state state--empty">
                <div className="state__icon">∅</div>
                <div className="state__title">No orders yet</div>
                <div className="state__desc">Your top-ups will appear here.</div>
                <button type="button" className="btn btn--primary mt-12" onClick={() => navigate('/games')}>Start an order</button>
              </div>
            </div>
          ) : (
            <div className="stack">
              {orders.slice(0, 5).map((o) => (
                <div className="order-card" key={o.orderId}>
                  <div className="order-card__head">
                    <div>
                      <div className="order-card__id">ORDER NUMBER</div>
                      <div className="order-card__num">{o.orderId}</div>
                    </div>
                    <span className={`status-pill status-pill--${statusTone(o.status)}`}><span className="status-dot" />{o.status}</span>
                  </div>
                  <div className="order-card__body">
                    <div className="order-grid">
                      <div className="os__kv"><div className="os__k">Game</div><div className="os__v">{o.gameName}</div></div>
                      <div className="os__kv"><div className="os__k">Product</div><div className="os__v">{o.product?.description}</div></div>
                      <div className="os__kv"><div className="os__k">Total</div><div className="os__v">{formatPrice(o.total)}</div></div>
                      <div className="os__kv"><div className="os__k">Date</div><div className="os__v">{formatDate(o.createdAt)}</div></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}