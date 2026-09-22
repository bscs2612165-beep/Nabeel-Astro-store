import { useNavigate } from 'react-router-dom';
import { GAMES } from '../data/games';
import { productsForGame } from '../data/products';
import { formatPrice } from '../utils/format';
import { groupPaymentMethods } from '../payments/PaymentProvider';

const gameById = (id) => GAMES.find((g) => g.id === id);

function PriceRow({ p }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="price-row"
      onClick={() => navigate(`/games/${p.game}/topup?product=${p.id}`)}
    >
      <span className="price-row__qty">{p.qtyLabel}</span>
      <span className="price-row__sub">{p.supportLabel || 'Instant Top-Up'}</span>
      <span className="price-row__price">{formatPrice(p.price)}</span>
    </button>
  );
}

function PriceBlock({ title, sub, products }) {
  return (
    <div className="price-block">
      <div className="price-block__head">
        <div className="price-block__title">{title}</div>
        {sub && <div className="price-block__sub">{sub}</div>}
      </div>
      <div className="price-grid">
        {products.map((p) => <PriceRow key={p.id} p={p} />)}
      </div>
    </div>
  );
}

export default function Prices() {
  const pubg = gameById('pubg');
  const mlbb = gameById('mlbb');
  const hok = gameById('hok');

  const pubgProducts = productsForGame('pubg');
  const mlbbStandard = productsForGame('mlbb').filter((p) => p.category === 'Standard Diamonds');
  const mlbbDouble = productsForGame('mlbb').filter((p) => p.category === 'Double Diamonds');
  const mlbbPasses = productsForGame('mlbb').filter((p) => p.category === 'Passes');
  const hokTokens = productsForGame('hok').filter((p) => p.category === 'Tokens');
  const hokCards = productsForGame('hok').filter((p) => p.category === 'Cards');

  return (
    <>
      <header className="page-head page-head--accent">
        <div className="container">
          <div className="sec-head__eyebrow">Rates</div>
          <h1 className="page-head__title">Price List</h1>
          <p className="page-head__desc">
            Official rates in PKR (Pakistani Rupee). Processing time 1–30 minutes. Choose a package to start your top-up.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          {/* PUBG UC */}
          <div className="price-game">
            <div className="price-game__head">
              <img src={pubg.logo} alt={`${pubg.name} logo`} />
              <div>
                <h2 className="price-game__title">{pubg.name} — Unknown Cash (UC)</h2>
                <p className="price-game__sub">Process time: 1–30 mins · PKR</p>
              </div>
            </div>
            <PriceBlock title="UC Packages" products={pubgProducts} />
          </div>

          {/* MLBB */}
          <div className="price-game">
            <div className="price-game__head">
              <img src={mlbb.logo} alt={`${mlbb.name} logo`} />
              <div>
                <h2 className="price-game__title">{mlbb.name} — Diamonds &amp; Passes</h2>
                <p className="price-game__sub">PKR · processing time 1–30 mins</p>
              </div>
            </div>
            <div className="price-sections">
              <PriceBlock title="Standard Diamonds" products={mlbbStandard} />
              <PriceBlock title="Double Diamonds" sub="Only 1st time" products={mlbbDouble} />
              <PriceBlock title="Passes" products={mlbbPasses} />
            </div>
          </div>

          {/* HoK */}
          <div className="price-game">
            <div className="price-game__head">
              <img src={hok.logo} alt={`${hok.name} logo`} />
              <div>
                <h2 className="price-game__title">{hok.name} — Tokens &amp; Cards</h2>
                <p className="price-game__sub">PKR · processing time 1–30 mins</p>
              </div>
            </div>
            <div className="price-sections">
              <PriceBlock title="Tokens" products={hokTokens} />
              <PriceBlock title="Cards" products={hokCards} />
            </div>
          </div>

          {/* Payment methods */}
          <div className="pay-panel">
            <div className="pay-panel__head">
              <div className="sec-head__eyebrow">Payments</div>
              <h2 className="pay-panel__title">Supported payment methods</h2>
              <p className="pay-panel__sub">Pay easily using your preferred method. Currency is PKR.</p>
            </div>
            <div className="pay-methods">
              {groupPaymentMethods().map((group) => (
                <div className="pay-group" key={group.region}>
                  <div className="pay-group__label">{group.region}</div>
                  <div className="pay-methods__row">
                    {group.methods.map((m) => (
                      <div className="pay-method" key={m.id}>
                        <span className="pay-method__badge" aria-hidden="true">
                          {m.id === 'easypaisa' ? 'EP' : m.id === 'jazzcash' ? 'JC' : m.id === 'stripe' ? 'S' : m.id === 'gcash' ? 'G' : m.id === 'maya' ? 'M' : m.id === 'gotyme' ? 'GT' : 'QR'}
                        </span>
                        <span>
                          <span className="pay-method__name">{m.name}</span>
                          <span className="pay-method__region">{m.note}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}