import { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getGame } from '../data/games';
import { getGameConfig } from '../config/gameConfig';
import { formatPrice } from '../utils/format';
import { useStore } from '../context/StoreContext';
import { useToast } from '../context/ToastContext';
import { State } from '../components/States';

const STEPS = ['Game', 'Account', 'Package', 'Review'];

export default function TopUp() {
  const { gameId } = useParams();
  const [params] = useSearchParams();
  const game = getGame(gameId);
  const config = getGameConfig(gameId);
  const navigate = useNavigate();
  const { add } = useStore();
  const { toast } = useToast();

  const initialValues = useMemo(() => {
    const v = {};
    config.fields.forEach((f) => {
      v[f.id] = f.type === 'select' ? (f.options[0] || '') : '';
    });
    return v;
  }, [config]);

  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [productId, setProductId] = useState(params.get('product') || '');
  const [submitted, setSubmitted] = useState(false);

  if (!game) {
    return (
      <div className="container section">
        <State tone="error" icon="⚠" title="Game not found" desc="We couldn't find that game." actionLabel="Back to games" actionTo="/games" />
      </div>
    );
  }

  if (game.comingSoon) {
    return (
      <div className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="feature coming" style={{ minHeight: 420, alignItems: 'stretch' }}>
            <div className="feature__bg">
              <img src={game.banner} alt={`${game.name} banner`} />
            </div>
            <div className="feature__content" style={{ maxWidth: 620 }}>
              <div className="feature__eyebrow">Coming Soon</div>
              <h1 className="feature__title" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)' }}>{game.name} Top-Ups</h1>
              <p className="feature__desc">
                We're preparing top-up packages for {game.name}. Your Traveler UID and a full package lineup will be supported here as soon as we launch.
              </p>
              <div className="feature__meta">
                <div className="feature__meta-item">
                  <div className="k">Status</div>
                  <div className="v">Coming Soon</div>
                </div>
                <div className="feature__meta-item">
                  <div className="k">Packages</div>
                  <div className="v">In preparation</div>
                </div>
              </div>
              <button type="button" className="btn btn--secondary btn--lg" onClick={() => navigate('/games')}>
                Browse available games
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const products = config.products();
  const selected = products.find((p) => p.id === productId);

  const groupedProducts = products.reduce((acc, p) => {
    const key = p.category || 'Packages';
    (acc[key] = acc[key] || []).push(p);
    return acc;
  }, {});

  const set = (id, val) => {
    setValues((v) => ({ ...v, [id]: val }));
    setErrors((e) => ({ ...e, [id]: '' }));
  };

  const validateStep = () => {
    if (step === 1) {
      const errs = config.validate(values);
      setErrors(errs);
      return Object.keys(errs).length === 0;
    }
    if (step === 2) {
      if (!selected || selected.availability !== 'available') {
        toast('Select a package', 'Choose an available package to continue.', 'warning');
        return false;
      }
      return true;
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const goCheckout = () => {
    setSubmitted(true);
    add({ type: 'game', id: game.id, label: game.name, image: game.banner });
    navigate('/checkout', {
      state: { gameId: game.id, productId, playerInfo: values, qty: 1, from: 'topup' }
    });
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="mb-8">
          <div className="sec-head__eyebrow">Top Up · {game.name}</div>
          <h1 className="page-head__title" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>{game.short} Top-Up</h1>
        </div>

        <div className="steps" aria-label="Progress">
          {STEPS.map((s, i) => (
            <div className={`step${i < step ? ' done' : ''}${i === step ? ' active' : ''}`} key={s}>
              <span className="step__num">{i < step ? '✓' : i + 1}</span>
              {s}
              {i < STEPS.length - 1 && <span className="step__sep" />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="panel">
            <div className="panel__title">Your Game</div>
            <p className="panel__sub">We've loaded the correct account fields and packages for {game.name}.</p>
            <img src={game.banner} alt={`${game.name} banner`} style={{ borderRadius: 12, height: 220, width: '100%', objectFit: 'cover' }} />
          </div>
        )}

        {step === 1 && (
          <div className="panel">
            <div className="panel__title">Enter your {game.name} account</div>
            <p className="panel__sub">Only used to deliver this order. Double-check before continuing.</p>
            <div className="form-grid">
              {config.fields.map((f) => (
                <div className="field" key={f.id}>
                  <label className="field__label" htmlFor={f.id}>
                    {f.label} {f.required && <span className="req">*</span>}
                  </label>
                  {f.type === 'select' ? (
                    <select id={f.id} className={`select${errors[f.id] ? ' invalid' : ''}`} value={values[f.id]} onChange={(e) => set(f.id, e.target.value)}>
                      {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      id={f.id}
                      className={`input${errors[f.id] ? ' invalid' : ''}`}
                      type="text"
                      inputMode={f.type === 'numeric' ? 'numeric' : undefined}
                      pattern={f.type === 'numeric' ? '[0-9]*' : undefined}
                      value={values[f.id]}
                      onChange={(e) => set(f.id, f.type === 'numeric' ? e.target.value.replace(/[^0-9]/g, '') : e.target.value)}
                      placeholder={f.placeholder}
                      autoComplete="off"
                    />
                  )}
                  {f.hint && <span className="field__hint">{f.hint}</span>}
                  {errors[f.id] && <span className="field__error">{errors[f.id]}</span>}
                </div>
              ))}
            </div>
            <div className="mt-16">
              {config.instructions.map((ins) => (
                <div key={ins} className="field__hint mb-8">• {ins}</div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="panel">
            <div className="panel__title">Choose a package</div>
            {Object.entries(groupedProducts).map(([cat, catProducts]) => (
              <div className="pkg-group" key={cat}>
                <div className="pkg-group__label">{cat}</div>
                <div className="pkg-list">
                  {catProducts.map((p) => {
                    const disabled = p.availability !== 'available';
                    return (
                      <button
                        type="button"
                        key={p.id}
                        className={`pkg-opt${selected?.id === p.id ? ' sel' : ''}${disabled ? ' disabled' : ''}`}
                        onClick={() => !disabled && setProductId(p.id)}
                        disabled={disabled}
                      >
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
        )}

        {step === 3 && selected && (
          <div className="panel">
            <div className="panel__title">Review</div>
            <div className="order-summary">
              <div className="os__kv"><div className="os__k">Game</div><div className="os__v">{game.name}</div></div>
              <div className="os__kv"><div className="os__k">Package</div><div className="os__v">{selected.description}</div></div>
              <div className="os__kv"><div className="os__k">Account</div><div className="os__v">{Object.entries(values).filter(([k]) => k !== 'server' && k !== 'zone').map(([, v]) => v).filter(Boolean).join(' · ') || '—'}</div></div>
              <div className="os__row os__row--total">
                <span>Total</span>
                <span>{formatPrice(selected.discountPrice || selected.price)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="row mt-24">
          {step > 0 && (
            <button type="button" className="btn btn--ghost" onClick={back}>Back</button>
          )}
          {step < STEPS.length - 1 ? (
            <button type="button" className="btn btn--primary grow" onClick={next}>Continue</button>
          ) : (
            <button type="button" className="btn btn--primary grow" onClick={goCheckout} disabled={submitted}>
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}