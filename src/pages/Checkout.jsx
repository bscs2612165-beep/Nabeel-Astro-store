import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getGame } from '../data/games';
import { getProduct } from '../data/products';
import { getGameConfig } from '../config/gameConfig';
import { applyPromo } from '../data/promotions';
import { groupPaymentMethods } from '../payments/PaymentProvider';
import { formatPrice, isValidEmail } from '../utils/format';
import { buildOrder, saveOrder } from '../utils/order';
import { useToast } from '../context/ToastContext';
import { useStore } from '../context/StoreContext';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { add } = useStore();

  const state = location.state || {};
  const game = getGame(state.gameId || 'pubg');
  const product = getProduct(state.productId);
  const playerInfo = state.playerInfo || {};

const playerDisplay = (info) => {
  const parts = Object.entries(info)
    .filter(([k]) => !['server', 'zone'].includes(k))
    .map(([, v]) => String(v || '').trim())
    .filter(Boolean);
  return parts.length ? parts.join(' · ') : 'Pending';
};
  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState('easypaisa');
  const [promoInput, setPromoInput] = useState('');
  const [applied, setApplied] = useState(null);
  const [promoMsg, setPromoMsg] = useState('');
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  const unitPrice = product ? product.discountPrice || product.price : 0;
  const subTotal = unitPrice * qty;
  const discount = applied ? applied.amountPerUnit * qty : 0;
  const total = Math.max(0, subTotal - discount);

  const missing = !product;

  useEffect(() => {
    if (missing) toast('No package selected', 'Choose a package to check out.', 'warning');
  }, [missing, toast]);

  if (missing) {
    return (
      <div className="section">
        <div className="container" style={{ maxWidth: 560 }}>
          <div className="panel">
            <h2 className="panel__title">Start an order first</h2>
            <p className="panel__sub">Choose a game and a package before checking out.</p>
            <button type="button" className="btn btn--primary btn--block" onClick={() => navigate('/games')}>Choose a game</button>
          </div>
        </div>
      </div>
    );
  }

  const apply = () => {
    if (!promoInput.trim()) { setPromoMsg(''); setApplied(null); return; }
    const res = applyPromo(promoInput, subTotal);
    if (!res.ok || res.amount === 0) {
      setApplied(null);
      setPromoMsg('Invalid promo code.');
      toast('Invalid code', 'That promo code was not found.', 'warning');
      return;
    }
    setApplied({ code: res.promo.code, amountPerUnit: Math.round(res.amount / qty) });
    setPromoMsg(`Promo applied (${res.promo.code}).`);
    toast('Promo applied', `${res.promo.code} saved you ${formatPrice(Math.round(res.amount / qty) * qty)}.`, 'success');
  };

  const placeOrder = async () => {
    const errs = {};
    if (!isValidEmail(email)) errs.email = 'Enter a valid email for your receipt.';
    const config = getGameConfig(game.id);
    const configErrs = config.validate ? config.validate(playerInfo) : {};
    if (Object.keys(configErrs).length) {
      errs.account = 'Player account details look incomplete or invalid.';
    } else if (!Object.values(playerInfo).some((v) => String(v || '').trim().length > 0)) {
      errs.account = 'Player account details are required.';
    }
    setErrors(errs);
    if (Object.keys(errs).length) {
      toast('Check your details', 'Some required fields are missing.', 'error');
      return;
    }

    setPlacing(true);
    const order = buildOrder({
      product,
      game,
      playerInfo,
      email,
      quantity: qty,
      paymentMethod: method,
      unitPrice,
      discountAmount: discount,
      promo: applied ? { code: applied.code } : null
    });
    saveOrder(order);
    add({ type: 'product', id: product.id, game: product.game, label: `${product.name} · ${product.description}`, image: undefined });
    toast('Order created', `Your order ${order.orderId} was created. Payment is pending.`, 'success');
    navigate(`/order-success/${order.orderId}`);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="sec-head__eyebrow mb-8">Checkout · {game.name}</div>
        <h1 className="page-head__title" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: 28 }}>Checkout</h1>

        <div className="grid grid--2 checkout-grid">
          <div className="stack">
            {/* Order line */}
            <div className="panel">
              <div className="panel__title">Order</div>
              <div className="order-summary">
                <div className="os__kv"><div className="os__k">Game</div><div className="os__v">{game.name}</div></div>
                <div className="os__kv"><div className="os__k">Package</div><div className="os__v">{product.name} — {product.description}</div></div>
                <div className="os__kv"><div className="os__k">Player account</div><div className="os__v">{playerDisplay(playerInfo)}</div></div>
              </div>
              {errors.account && <div className="field__error mt-8">{errors.account}</div>}
              <div className="field mt-16">
                <label className="field__label" htmlFor="qty">Quantity</label>
                <div className="row">
                  <button type="button" className="btn btn--secondary btn--sm" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                  <input id="qty" className="input" type="number" min="1" max="5" value={qty} onChange={(e) => setQty(Math.max(1, Math.min(5, Number(e.target.value) || 1)))} style={{ width: 90, textAlign: 'center' }} />
                  <button type="button" className="btn btn--secondary btn--sm" onClick={() => setQty((q) => Math.min(5, q + 1))}>+</button>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="panel">
              <div className="panel__title">Receipt email</div>
              <div className="field">
                <label className="field__label" htmlFor="email">Email <span className="req">*</span></label>
                <input
                  id="email"
                  className={`input${errors.email ? ' invalid' : ''}`}
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((s) => ({ ...s, email: '' })); }}
                  placeholder="you@example.com"
                />
                {errors.email && <span className="field__error">{errors.email}</span>}
              </div>
            </div>

            {/* Promo */}
            <div className="panel">
              <div className="panel__title">Promo code</div>
              <div className="row">
                <input className="input grow" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} placeholder="e.g. STARLIGHT" />
                <button type="button" className="btn btn--secondary" onClick={apply}>Apply</button>
              </div>
              {promoMsg && <div className="field__hint mt-8">{promoMsg}</div>}
            </div>

            {/* Payment */}
            <div className="panel">
              <div className="panel__title">Payment method</div>
              {groupPaymentMethods().map((group) => (
                <div className="pm-group" key={group.region}>
                  <div className="pm-group__label">{group.region}</div>
                  <div className="radio-wrap">
                    {group.methods.map((m) => (
                      <div key={m.id} className={`radio-opt${method === m.id ? ' sel' : ''}`} onClick={() => setMethod(m.id)} role="radio" aria-checked={method === m.id} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') setMethod(m.id); }}>
                        <span className="radio-opt__radio" aria-hidden="true" />
                        <span className="radio-opt__body">
                          <div className="radio-opt__name">{m.name}</div>
                          <div className="radio-opt__region">{m.note}</div>
                        </span>
                        <span className="radio-opt__status">{m.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <p className="field__hint mt-8">
                Your order is created as "Payment Pending". No payment is charged or confirmed in the browser —
                confirmation happens only after the payment provider (or the store owner) verifies the payment.
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="stack">
            <div className="order-summary" style={{ position: 'sticky', top: 84 }}>
              <div className="panel__title">Order summary</div>
              <div className="os__row"><span className="os__row--lbl">Subtotal ({qty}×)</span><span>{formatPrice(subTotal)}</span></div>
              {discount > 0 && <div className="os__row"><span className="os__row--lbl">Promo {applied.code}</span><span>−{formatPrice(discount)}</span></div>}
              <div className="os__row os__row--total"><span>Total</span><span>{formatPrice(total)}</span></div>
              <button type="button" className="btn btn--primary btn--block btn--lg mt-16" onClick={placeOrder} disabled={placing}>
                {placing ? 'Placing order…' : 'Place Order'}
              </button>
              <p className="field__hint mt-8" style={{ textAlign: 'center' }}>
                After placing, your order will be {`"Payment Pending"`} until verified.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}