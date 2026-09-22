import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Brand from './Brand';
import { useUI } from '../context/UIContext';
import { useStore } from '../context/StoreContext';
import { useFocusTrap } from '../hooks/useFocusTrap';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/games', label: 'Games' },
  { to: '/prices', label: 'Prices' },
  { to: '/events', label: 'Events' },
  { to: '/promotions', label: 'Promotions' },
  { to: '/pre-orders', label: 'Pre-Orders' },
  { to: '/check-order', label: 'Check Order' },
  { href: '#support-section', label: 'Support' }
];

export default function MobileNav() {
  const { drawerOpen, setDrawerOpen } = useUI();
  const { user } = useStore();
  const panelRef = useRef(null);
  useFocusTrap(panelRef, drawerOpen);

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [drawerOpen]);

  const close = () => setDrawerOpen(false);

  const handleSupport = (e) => {
    e.preventDefault();
    close();
    requestAnimationFrame(() => {
      const el = document.getElementById('support-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <div className={`drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
      <div className="drawer__backdrop" onClick={close} />
      <aside className="drawer__panel" ref={panelRef} role="dialog" aria-modal="true" aria-label="Menu" {...{ inert: drawerOpen ? undefined : '' }}>
        <div className="drawer__head">
          <Brand />
          <button type="button" className="icon-btn" aria-label="Close menu" onClick={close}>✕</button>
        </div>
        <ul className="drawer__nav">
          {LINKS.map((l) => (
            <li key={l.label}>
              {l.href ? (
                <a className="drawer__link" href={l.href} onClick={handleSupport}>{l.label}</a>
              ) : (
                <NavLink to={l.to} end={l.to === '/'} className="drawer__link" onClick={() => setDrawerOpen(false)}>
                  {l.label}
                </NavLink>
              )}
            </li>
          ))}
          {user ? (
            <li>
              <NavLink to="/account" className="drawer__link" onClick={() => setDrawerOpen(false)}>
                Account
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/login" className="drawer__link drawer__link--cta" onClick={() => setDrawerOpen(false)}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
        <div className="drawer__foot">Nabeel Astro Store · Premium top-ups</div>
      </aside>
    </div>
  );
}