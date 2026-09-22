import { useState } from 'react';
import { GAMES } from '../data/games';
import SectionHead from '../components/SectionHead';
import GameCard from '../components/GameCard';

export default function Games() {
  const [selected, setSelected] = useState('all');

  return (
    <>
      <header className="page-head page-head--accent">
        <div className="container">
          <div className="sec-head__eyebrow">Catalog</div>
          <h1 className="page-head__title">Games</h1>
          <p className="page-head__desc">Choose a game to start your top-up. Each game has its own packages and account fields.</p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <SectionHead eyebrow="Supported" title="Popular Games" desc="The games we currently support." />
          <div className="grid grid--4">
            {GAMES.map((g) => <GameCard key={g.id} game={g} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Tiles" title="Game Highlights" desc="Quick overview of each game's currency." />
          <div className="tabs" role="tablist" aria-label="Filter games">
            <button type="button" className={`tab ${selected === 'all' ? 'active' : ''}`} onClick={() => setSelected('all')}>All</button>
            {GAMES.map((g) => (
              <button key={g.id} type="button" className={`tab ${selected === g.id ? 'active' : ''}`} onClick={() => setSelected(g.id)}>
                {g.short}
              </button>
            ))}
          </div>
          <div className="grid grid--4">
            {GAMES.filter((g) => selected === 'all' || g.id === selected).map((g) => (
              <article className={`product-card${g.comingSoon ? ' is-coming' : ''}`} key={g.id}>
                <div className="product-card__art product-card__art--static" style={{ background: g.accentSoft }}>
                  <span
                    className="product-card__glow"
                    aria-hidden="true"
                    style={{ background: `radial-gradient(120% 90% at 50% -10%, color-mix(in srgb, ${g.accent} 30%, transparent), transparent 68%)` }}
                  />
                  <img src={g.logo} alt={`${g.name} logo`} loading="lazy" />
                  {g.comingSoon && <span className="game-card__soon">Coming Soon</span>}
                </div>
                <div className="product-card__body">
                  <div className="product-card__game">{g.name}</div>
                  {g.comingSoon ? (
                    <>
                      <div className="product-card__name">Coming Soon</div>
                      <p className="product-card__desc">We're preparing top-ups for {g.name}. Rates and packages arrive shortly.</p>
                    </>
                  ) : (
                    <>
                      <div className="product-card__name">{g.short} Currency</div>
                      <p className="product-card__desc">{g.tagline}</p>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}