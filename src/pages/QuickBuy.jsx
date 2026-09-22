import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACTIVE_GAMES } from '../data/games';
import { getGameConfig } from '../config/gameConfig';
import { formatPrice } from '../utils/format';
import { useStore } from '../context/StoreContext';

// Compact single-screen flow: Game → Account → Package → Checkout.
export default function QuickBuy() {
  const navigate = useNavigate();
  const { add } = useStore();

  const [gameId, setGameId] = useState(ACTIVE_GAMES[0].id);
  const game = getGame(gameId);
  const config = getGameConfig(gameId);
  const [values, setValues] = useState(() => {
    const v = {};
    config.fields.forEach((f) => { v[f.id] = f.type === 'select' ? f.options[0] || '' : ''; });
    return v;
  });
  const [errors, setErrors] = useState({});
  const [productId, setProductId] = useState('');

  const products = config.products();
  const selected = products.find((p) => p.id === productId);

  const groupedProducts = products.reduce((acc, p) => {
    const key = p.category || 'Packages';
    (acc[key] = acc[key] || []).push(p);
    return acc;
  }, {});

  const switchGame = (id) => {
    setGameId(id);
    setProductId('');
    const g = getGameConfig(id);
    const v = {};
    g.fields.forEach((f) => { v[f.id] = f.type === 'select' ? f.options[0] || '' : ''; });
    setValues(v);
    setErrors({});
  };

  const set = (id, val) => { setValues((v) => ({ ...v, [id]: val })); setErrors((e) => ({ ...e, [id]: '' })); };

  const goCheckout = () => {
    if (!selected) { setErrors((e) => ({ ...e, product: 'Choose a package.' })); return; }
    const errs = config.validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    add({ type: 'game', id: game.id, label: game.name, image: game.banner });
    navigate('/checkout', { state: { gameId: game.id, productId, playerInfo: values, qty: 1, from: 'quickbuy' } });
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="sec-head__eyebrow mb-8">Quick Buy</div>
        <h1 className="page-head__title" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', marginBottom: 24 }}>Quick Buy</h1>
        <p className="page-head__desc mb-24">A fast way to top up: pick a game, a package, add your details, check out.</p>

        {/* Game */}
        <div className="stack">
          <div className="panel">
            <div className="panel__title">1 · Game</div>
            <div className="pkg-list">
              {ACTIVE_GAMES.map((g) => (
                <button type="button" key={g.id} className={`pkg-opt${gameId === g.id ? ' sel' : ''}`} onClick={() => switchGame(g.id)}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={g.logo} alt="" style={{ width: 46, height: 30, objectFit: 'contain' }} />
                    <span>
                      <div className="pkg-opt__label">{g.name}</div>
                      <div className="pkg-opt__sub">{g.tagline}</div>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Account */}
          <div className="panel">
            <div className="panel__title">2 · Account details</div>
            <div className="form-grid">
              {config.fields.map((f) => (
                <div className="field" key={f.id}>
                  <label className="field__label" htmlFor={`qb-${f.id}`}>{f.label}{f.required && <span className="req"> *</span>}</label>
                  {f.type === 'select' ? (
                    <select
                      id={`qb-${f.id}`}
                      className={`select${errors[f.id] ? ' invalid' : ''}`}
                      value={values[f.id]}
                      onChange={(e) => set(f.id, e.target.value)}
                    >
                      {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      id={`qb-${f.id}`}
                      className={`input${errors[f.id] ? ' invalid' : ''}`}
                      value={values[f.id] || ''}
                      onChange={(e) => set(f.id, e.target.value)}
                      placeholder={f.placeholder}
                    />
                  )}
                  {errors[f.id] && <span className="field__error">{errors[f.id]}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Package */}
          <div className="panel">
            <div className="panel__title">3 · Package</div>
            {errors.product && <div className="field__error mb-8">{errors.product}</div>}
            {groupedProducts && Object.entries(groupedProducts).map(([cat, catProducts]) => (
              <div className="pkg-group" key={cat}>
                <div className="pkg-group__label">{cat}</div>
                <div className="pkg-list">
                  {catProducts.map((p) => {
                    const disabled = p.availability !== 'available';
                    return (
                      <button type="button" key={p.id} className={`pkg-opt${selected?.id === p.id ? ' sel' : ''}${disabled ? ' disabled' : ''}`} onClick={() => !disabled && setProductId(p.id)} disabled={disabled}>
                        <span>
                          <div className="pkg-opt__label">{p.description}</div>
                          <div className="pkg-opt__sub">{p.supportLabel || 'Instant Top-Up'}</div>
                        </span>
                        <span className="pkg-opt__price">
                          {p.price == null ? (
                            <span className="pkg-opt__pending">Price coming soon</span>
                          ) : p.discountPrice ? (
                            <><del>{formatPrice(p.price)}</del>{formatPrice(p.discountPrice)}</>
                          ) : (
                            formatPrice(p.price)
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="btn btn--primary btn--lg btn--block" onClick={goCheckout}>
            {selected ? `Checkout · ${formatPrice(selected.discountPrice || selected.price)}` : 'Continue to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}