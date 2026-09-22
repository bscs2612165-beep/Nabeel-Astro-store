import { useNavigate, useParams } from 'react-router-dom';
import { getOrders } from '../utils/order';
import { formatPrice, formatDateTime } from '../utils/format';
import { State } from '../components/States';

function statusTone(status) {
  const map = {
    'Order Created': 'created',
    'Payment Pending': 'pending',
    'Payment Confirmed': 'confirmed',
    Processing: 'processing',
    Completed: 'completed'
  };
  return map[status] || 'created';
}

const playerDisplay = (info = {}) => {
  const parts = Object.entries(info)
    .filter(([k]) => !['server', 'zone'].includes(k))
    .map(([, v]) => String(v || '').trim())
    .filter(Boolean);
  return parts.length ? parts.join(' · ') : 'Pending';
};

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = getOrders().find((o) => o.orderId === orderId);

  if (!order) {
    return (
      <div className="section">
        <div className="container" style={{ maxWidth: 640 }}>
          <State
            tone="empty"
            icon="∅"
            title="Order not found"
            desc="We couldn't find that order on this device. Orders are stored locally in this demo build."
            actionLabel="Check Order"
            actionTo="/check-order"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="state">
          <div className="state__icon" style={{ color: 'var(--green)', background: 'rgba(53,208,127,0.12)' }}>✓</div>
          <div className="state__title">Order created</div>
          <div className="state__desc">Your order is pending payment. No payment has been processed yet.</div>
        </div>

        <div className="order-card mt-24">
          <div className="order-card__head">
            <div>
              <div className="order-card__id">ORDER NUMBER</div>
              <div className="order-card__num">{order.orderId}</div>
            </div>
            <span className={`status-pill status-pill--${statusTone(order.status)}`}>
              <span className="status-dot" />{order.status}
            </span>
          </div>
          <div className="order-card__body">
            <div className="order-grid">
              <div className="os__kv"><div className="os__k">Game</div><div className="os__v">{order.gameName}</div></div>
              <div className="os__kv"><div className="os__k">Product</div><div className="os__v">{order.product?.description}</div></div>
              <div className="os__kv"><div className="os__k">Quantity</div><div className="os__v">{order.quantity}</div></div>
              <div className="os__kv"><div className="os__k">Player account</div><div className="os__v">{playerDisplay(order.playerInfo)}</div></div>
              <div className="os__kv"><div className="os__k">Amount</div><div className="os__v">{formatPrice(order.total)}</div></div>
              <div className="os__kv"><div className="os__k">Payment</div><div className="os__v">{order.paymentMethodName}</div></div>
              <div className="os__kv"><div className="os__k">Email</div><div className="os__v">{order.email}</div></div>
              <div className="os__kv"><div className="os__k">Date</div><div className="os__v">{formatDateTime(order.createdAt)}</div></div>
            </div>
            <div className="row mt-24">
              <button type="button" className="btn btn--primary grow" onClick={() => navigate('/check-order')}>Check Order</button>
              <button type="button" className="btn btn--secondary grow" onClick={() => navigate('/games')}>Keep Browsing</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}