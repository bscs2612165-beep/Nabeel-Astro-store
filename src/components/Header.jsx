import { NavLink, useNavigate } from 'react-router-dom';
import Brand from './Brand';
import { useUI } from '../context/UIContext';
import { useStore } from '../context/StoreContext';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/games', label: 'Games' },
  { to: '/prices', label: 'Prices' },
  { to: '/events', label: 'Events' },
  { to: '/promotions', label: 'Promotions' },
  { to: '/check-order', label: 'Check Order' },
  { href: '#support-section', label: 'Support' }
];

export default function Header() {
  const { setSearchOpen, setDrawerOpen } = useUI();
  const { user } = useStore();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container header__inner">
        <Brand />
        <nav className="header__nav" aria-label="Primary">
          <ul className="nav__list">
            {LINKS.map((l) => (
              <li key={l.label}>
                {l.href ? (
                  <a className="nav__link" href={l.href}>{l.label}</a>
                ) : (
                  <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => `nav__link${isActive ? ' active' : ''}`}>
                    {l.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__actions">
          <button type="button" className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
            <span aria-hidden="true">⌕</span>
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label={user ? 'Account' : 'Login'}
            onClick={() => navigate(user ? '/account' : '/login')}
          >
            <span aria-hidden="true">{user ? '👤' : '🔑'}</span>
          </button>
          <button type="button" className="icon-btn mobile-toggle" aria-label="Open menu" onClick={() => setDrawerOpen(true)}>
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </div>
    </header>
  );
}