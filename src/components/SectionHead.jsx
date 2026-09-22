import { Link } from 'react-router-dom';

export default function SectionHead({ eyebrow, title, desc, link, linkLabel, eyebrowClass }) {
  return (
    <div className="sec-head">
      {eyebrow && <div className={`sec-head__eyebrow ${eyebrowClass || ''}`}>{eyebrow}</div>}
      <div className="sec-head__row">
        <div>
          <h2 className="sec-head__title">{title}</h2>
          {desc && <p className="sec-head__desc">{desc}</p>}
        </div>
        {link && (
          <Link to={link} className="sec-head__link">
            {linkLabel || 'View all'} →
          </Link>
        )}
      </div>
    </div>
  );
}