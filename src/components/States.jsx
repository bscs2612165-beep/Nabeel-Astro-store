import { Link } from 'react-router-dom';

export function State({ icon, title, desc, actionLabel, actionTo, tone, children }) {
  return (
    <div className={`state state--${tone || ''}`}>
      <div className="state__icon" aria-hidden="true">{icon}</div>
      <div className="state__title">{title}</div>
      {desc && <div className="state__desc">{desc}</div>}
      {actionTo && (
        <div className="state__action">
          <Link to={actionTo} className="btn btn--primary">{actionLabel}</Link>
        </div>
      )}
      {children}
    </div>
  );
}

export function Spinner({ large }) {
  return <div className={`spinner ${large ? 'spinner--lg' : ''}`} role="status" aria-label="Loading" />;
}

export function SkeletonCard() {
  return (
    <div className="skel skel-card" aria-hidden="true">
      <div className="skel skel-line skel-line--w60" />
    </div>
  );
}