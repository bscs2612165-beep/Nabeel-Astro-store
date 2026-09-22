import { useState } from 'react';
import { EVENTS } from '../data/events';
import EventCard from '../components/EventCard';
import { GAMES } from '../data/games';

const EVENT_GAMES = GAMES.filter((g) => EVENTS.some((e) => e.game === g.id));

export default function Events() {
  const [filter, setFilter] = useState('all');

  return (
    <>
      <header className="page-head page-head--accent">
        <div className="container">
          <div className="sec-head__eyebrow">Events</div>
          <h1 className="page-head__title">Latest Events</h1>
          <p className="page-head__desc">Seasonal events, limited rewards and collaborations across our supported games.</p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Filter events by game">
            <button type="button" className={`tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            {EVENT_GAMES.map((g) => (
              <button key={g.id} type="button" className={`tab ${filter === g.id ? 'active' : ''}`} onClick={() => setFilter(g.id)}>
                {g.short}
              </button>
            ))}
          </div>
          <div className="grid grid--3">
            {EVENTS.filter((e) => filter === 'all' || e.game === filter).map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}