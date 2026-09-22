import { useState } from 'react';
import { UPDATES } from '../data/updates';
import { GAMES } from '../data/games';

const UPDATE_GAMES = GAMES.filter((g) => UPDATES.some((u) => u.game === g.id));

export default function Updates() {
  const [filter, setFilter] = useState('all');
  const list = UPDATES.filter((u) => filter === 'all' || u.game === filter);

  return (
    <>
      <header className="page-head page-head--accent">
        <div className="container">
          <div className="sec-head__eyebrow">News</div>
          <h1 className="page-head__title">Gaming Updates</h1>
          <p className="page-head__desc">Patches, characters, skins and seasons across our supported games.</p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Filter updates by game">
            <button type="button" className={`tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            {UPDATE_GAMES.map((g) => (
              <button key={g.id} type="button" className={`tab ${filter === g.id ? 'active' : ''}`} onClick={() => setFilter(g.id)}>
                {g.short}
              </button>
            ))}
          </div>
          <div className="grid grid--3">
            {list.map((u) => (
              <article className="media-card" key={u.id}>
                <div className="media-card__media media-card__media--short">
                  <img src={u.logo} alt="" style={{ objectFit: 'contain', padding: 20 }} loading="lazy" />
                  <span className="media-card__tag">{u.tag}</span>
                </div>
                <div className="media-card__body">
                  <div className="media-card__meta">{u.gameName} · {u.date}</div>
                  <div className="media-card__title">{u.title}</div>
                  <p className="media-card__desc">{u.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}