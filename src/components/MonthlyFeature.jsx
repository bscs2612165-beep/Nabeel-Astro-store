import { useNavigate } from 'react-router-dom';
import Countdown from './Countdown';
import { currentMonth } from '../config/site';
import { bannerFor } from '../data/assets';

export default function MonthlyFeature() {
  const { name, date } = currentMonth();
  const navigate = useNavigate();

  // Target: end of current month.
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
  const target = endOfMonth.getTime();

  return (
    <section className="section">
      <div className="container">
        <div className="feature">
          <div className="feature__bg">
            <img src={bannerFor('mlbb')} alt="" loading="lazy" />
          </div>
          <div className="feature__content">
            <div className="feature__eyebrow">Monthly Feature</div>
            <h2 className="feature__title">{name} Monthly Feature</h2>
            <p className="feature__desc">
              A fresh monthly lineup of rewards and offers for your favorite games. Packs change every month, so check back often.
            </p>
            <div className="feature__meta">
              <div className="feature__meta-item">
                <div className="k">Rewards</div>
                <div className="v">New packs monthly</div>
              </div>
              <div className="feature__meta-item">
                <div className="k">Offer</div>
                <div className="v">Limited-time value</div>
              </div>
            </div>
            <div className="feature__meta">
              <Countdown target={target} labels={['Days', 'Hrs', 'Min', 'Sec']} />
            </div>
            <div className="mt-16">
              <button type="button" className="btn btn--primary btn--lg" onClick={() => navigate('/promotions')}>
                Explore Feature
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}