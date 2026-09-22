import { useNavigate } from 'react-router-dom';

export default function GameCard({ game }) {
  const navigate = useNavigate();
  const topup = () => navigate(`/games/${game.id}/topup`);
  const evs = () => navigate('/events');

  return (
    <article className={`game-card${game.comingSoon ? ' is-coming' : ''}`} style={{ '--game-accent': game.accent }}>
      <div className="game-card__media">
        <img className="banner" src={game.banner} alt={`${game.name} banner`} loading="lazy" />
        {game.comingSoon && <span className="game-card__soon">Coming Soon</span>}
        <div className="game-card__logo">
          <img src={game.logo} alt={`${game.name} logo`} loading="lazy" />
        </div>
      </div>
      <div className="game-card__body">
        <div className="game-card__name game-card__name--offset">{game.name}</div>
        <p className="game-card__desc">{game.description}</p>
        <div className="game-card__actions">
          {game.comingSoon ? (
            <button type="button" className="btn btn--ghost btn--sm" disabled>
              Coming Soon
            </button>
          ) : (
            <button type="button" className="btn btn--primary btn--sm" onClick={topup}>
              Top Up
            </button>
          )}
          {!game.comingSoon && game.hasEvents && (
            <button type="button" className="btn btn--ghost btn--sm" onClick={evs}>
              Events
            </button>
          )}
        </div>
      </div>
    </article>
  );
}