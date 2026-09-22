import { Link } from 'react-router-dom';
import { SITE } from '../config/site';

export default function Brand({ compact = false }) {
  return (
    <Link to="/" className="brand" aria-label={`${SITE.name} home`}>
      <span className="brand__mark" aria-hidden="true">⚡</span>
      {!compact && (
        <span className="brand__text">
          <span className="brand__name">{SITE.name}</span>
          <span className="brand__sub">Top-Ups</span>
        </span>
      )}
    </Link>
  );
}