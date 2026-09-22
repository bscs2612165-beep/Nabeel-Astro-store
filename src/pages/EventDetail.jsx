import { useNavigate, useParams } from 'react-router-dom';
import { getEvent } from '../data/events';
import { formatDate } from '../utils/format';
import { getGame } from '../data/games';
import { State } from '../components/States';

export default function EventDetail() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = getEvent(eventId);

  if (!event) {
    return (
      <div className="container section">
        <State tone="error" icon="⚠" title="Event not found" desc="We couldn't find that event." actionLabel="All events" actionTo="/events" />
      </div>
    );
  }

  const game = getGame(event.game);

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 860 }}>
        <button type="button" className="btn btn--ghost btn--sm mb-8" onClick={() => navigate('/events')}>← All events</button>
        <div className="feature" style={{ minHeight: 380, alignItems: 'stretch' }}>
          <div className="feature__bg">
            <img src={event.image} alt={`${event.title} artwork`} />
          </div>
          <div className="feature__content" style={{ maxWidth: 640 }}>
            <div className="feature__eyebrow">{event.tag}</div>
            <h1 className="feature__title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>{event.title}</h1>
            <p className="feature__desc">{event.description}</p>
            <div className="feature__meta">
              <div className="feature__meta-item"><div className="k">Game</div><div className="v">{game.name}</div></div>
              <div className="feature__meta-item"><div className="k">Starts</div><div className="v">{formatDate(event.start)}</div></div>
              <div className="feature__meta-item"><div className="k">Ends</div><div className="v">{formatDate(event.end)}</div></div>
            </div>
            <button type="button" className="btn btn--primary btn--lg" onClick={() => navigate(`/games/${event.game}/topup`)}>
              Top Up {game.short}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}