import { useState } from 'react';
import { TIPS } from '../data/tips';
import { GAMES } from '../data/games';

const TIP_GAMES = GAMES.filter((g) => TIPS.some((t) => t.game === g.id));

export default function Tips() {
  const [filter, setFilter] = useState('all');
  const list = TIPS.filter((t) => filter === 'all' || t.game === filter);

  return (
    <>
      <header className="page-head page-head--accent">
        <div className="container">
          <div className="sec-head__eyebrow">Improve</div>
          <h1 className="page-head__title">Gaming Tips</h1>
          <p className="page-head__desc">Practical habits and guidance across our supported games. Tips are advice, not guaranteed results.</p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Filter tips by game">
            <button type="button" className={`tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            {TIP_GAMES.map((g) => (
              <button key={g.id} type="button" className={`tab ${filter === g.id ? 'active' : ''}`} onClick={() => setFilter(g.id)}>
                {g.short}
              </button>
            ))}
          </div>
          <div className="grid grid--2">
            {list.map((t) => (
              <article className="tip-card" key={t.id}>
                <div className="tip-card__logo"><img src={t.logo} alt="" loading="lazy" /></div>
                <div>
                  <div className="tip-card__cat">{t.category}</div>
                  <div className="tip-card__game">{t.gameName}</div>
                  <p className="tip-card__text">{t.tip}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}