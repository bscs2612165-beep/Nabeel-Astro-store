import { useState } from 'react';
import { State, Spinner } from '../components/States';
import { lookupOrder } from '../utils/order';
import { formatPrice, formatDateTime } from '../utils/format';

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

export default function CheckOrder() {
  const [orderId, setOrderId] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | loading | found | notfound | invalid
  const [order, setOrder] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const id = orderId.trim();
    if (!id) {
      setPhase('invalid');
      return;
    }
    setPhase('loading');
    const res = await lookupOrder(id);
    if (res.ok) {
      setOrder(res.order);
      setPhase('found');
    } else {
      setPhase('notfound');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="lookup">
          <div className="sec-head__eyebrow">Orders</div>
          <h1 className="page-head__title" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.6rem)' }}>Check Order</h1>
          <p className="page-head__desc">Enter your order ID to see its status and details.</p>

          <div className="panel mt-24">
            <form onSubmit={submit} noValidate>
              <div className="row">
                <input
                  className="input grow"
                  value={orderId}
                  onChange={(e) => { setOrderId(e.target.value); setPhase('idle'); }}
                  placeholder="e.g. NAS-1234AB12"
                  aria-label="Order ID"
                />
                <button type="submit" className="btn btn--primary btn--lg">Track</button>
              </div>
            </form>
          </div>

          <div className="mt-24">
            {phase === 'invalid' && (
              <State tone="error" icon="⚠" title="Enter an order ID" desc="Please type your order ID to look it up." />
            )}
            {phase === 'loading' && (
              <div className="state"><Spinner large /><div className="state__desc">Looking up your order…</div></div>
            )}
            {phase === 'notfound' && (
              <div className="panel">
                <State tone="empty" icon="∅" title="Order not found" desc="We couldn't find that order ID. Double-check it, or try again." />
              </div>
            )}
            {phase === 'found' && order && (
              <div className="order-card">
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
                    <div className="os__kv"><div className="os__k">Amount</div><div className="os__v">{formatPrice(order.total)}</div></div>
                    <div className="os__kv"><div className="os__k">Payment method</div><div className="os__v">{order.paymentMethodName}</div></div>
                    <div className="os__kv"><div className="os__k">Quantity</div><div className="os__v">{order.quantity}</div></div>
                    <div className="os__kv"><div className="os__k">Date</div><div className="os__v">{formatDateTime(order.createdAt)}</div></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}