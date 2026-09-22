import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/format';
import { isEventEnded } from '../utils/format';

export default function EventCard({ event, short }) {
  const navigate = useNavigate();
  const ended = isEventEnded(event.end);

  return (
    <article className="media-card" style={{ opacity: ended ? 0.6 : 1 }}>
      <div className={`media-card__media ${short ? 'media-card__media--short' : ''}`}>
        <img src={event.image} alt={`${event.title} artwork`} loading="lazy" />
        <span className="media-card__tag">{ended ? 'Ended' : event.tag}</span>
        <div className="media-card__logo"><img src={event.logo} alt="" loading="lazy" /></div>
      </div>
      <div className="media-card__body">
        <div className="media-card__meta">
          {formatDate(event.start)} — {formatDate(event.end)}
        </div>
        <div className="media-card__title">{event.title}</div>
        <p className="media-card__desc">{event.description}</p>
        <button type="button" className="btn btn--secondary btn--sm" onClick={() => navigate(`/events/${event.id}`)}>
          View Event
        </button>
      </div>
    </article>
  );
}