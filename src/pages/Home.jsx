import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { GAMES } from '../data/games';
import { EVENTS } from '../data/events';
import { TIPS } from '../data/tips';
import { UPDATES } from '../data/updates';
import { HERO_IMAGE, OWNER_IMAGE } from '../data/assets';
import { TRUST_SIGNALS } from '../config/site';
import SectionHead from '../components/SectionHead';
import GameCard from '../components/GameCard';
import EventCard from '../components/EventCard';
import MonthlyFeature from '../components/MonthlyFeature';
import RecentlyViewed from '../components/RecentlyViewed';
import PopularProducts from '../components/PopularProducts';

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const heroImgRef = useRef(null);

  // Subtle premium cursor parallax for the hero artwork.
  // Kept subtle (small lerped drift) and disabled on touch / reduced-motion.
  useEffect(() => {
    const hero = heroRef.current;
    const img = heroImgRef.current;
    if (!hero || !img) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (window.matchMedia('(hover: none)').matches) return undefined;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const RANGE = 12;

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * RANGE;
      targetY = y * RANGE;
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };
    const loop = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      img.style.transform = `scale(1.03) translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
      img.style.transform = '';
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero" ref={heroRef}>
        <div className="hero__bg" aria-hidden="true">
          <img src={HERO_IMAGE} alt="" ref={heroImgRef} {...{ fetchpriority: 'high' }} />
          <div className="hero__scrim" />
        </div>
        <div className="container">
          <div className="hero__content">
            <div className="hero__eyebrow">Premium Gaming Top-Ups</div>
            <h1 className="hero__title">
              Power up your <span className="grad">favorite games</span> in seconds.
            </h1>
            <p className="hero__desc">
              Nabeel Astro Store is your premium destination for PUBG Mobile, Mobile Legends and Honor of Kings top-ups — with Genshin Impact coming soon. Fast, secure and ready for gamers.
            </p>
            <div className="hero__cta">
              <button type="button" className="btn btn--primary btn--lg" onClick={() => navigate('/games')}>
                Explore Games
              </button>
              <button type="button" className="btn btn--secondary btn--lg" onClick={() => navigate('/check-order')}>
                Check Order
              </button>
            </div>
            <div className="hero__trust">
              {TRUST_SIGNALS.map((t) =>
                t.href ? (
                  <a className="trust-item trust-item--link" href={t.href} key={t.title}>
                    <span className="trust-item__dot" aria-hidden="true">{t.icon}</span>
                    <span>
                      <span className="trust-item__label" style={{ display: 'block' }}>{t.title}</span>
                      <span className="trust-item__sub">{t.sub}</span>
                    </span>
                  </a>
                ) : (
                  <div className="trust-item" key={t.title}>
                    <span className="trust-item__dot" aria-hidden="true">{t.icon}</span>
                    <span>
                      <span className="trust-item__label" style={{ display: 'block' }}>{t.title}</span>
                      <span className="trust-item__sub">{t.sub}</span>
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <RecentlyViewed />

      {/* Popular games */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Catalog" title="Popular Games" desc="Top up for the games you love." link="/games" linkLabel="All games" />
          <div className="grid grid--4">
            {GAMES.map((g) => <GameCard key={g.id} game={g} />)}
          </div>
        </div>
      </section>

      {/* Most popular products */}
      <PopularProducts />

      {/* Monthly feature */}
      <MonthlyFeature />

      {/* Latest events */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Events" title="Latest Events" desc="Seasonal events and limited-time happenings." link="/events" linkLabel="All events" />
          <div className="grid grid--3">
            {EVENTS.slice(0, 3).map((e) => <EventCard key={e.id} event={e} short />)}
          </div>
        </div>
      </section>

      {/* Gaming tips */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Improve" title="Gaming Tips" desc="Practical tips across our supported games." link="/tips" linkLabel="All tips" />
          <div className="grid grid--2">
            {TIPS.slice(0, 4).map((t) => (
              <article className="tip-card" key={t.id}>
                <div className="tip-card__logo"><img src={t.logo} alt="" /></div>
                <div>
                  <div className="tip-card__cat">{t.category}</div>
                  <div className="tip-card__game">{t.gameName}</div>
                  <p className="tip-card__text">{t.tip}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Updates */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="News" title="Gaming Updates" desc="Patches, skins, seasons and more." link="/updates" linkLabel="All updates" />
          <div className="grid grid--3">
            {UPDATES.slice(0, 3).map((u) => (
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

      {/* About */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="about">
            <div className="about__media">
              <img src={OWNER_IMAGE} alt="Nabeel Astro Store founder" loading="lazy" />
            </div>
            <div className="about__body">
              <div className="sec-head__eyebrow">About</div>
              <h2>About Nabeel Astro Store</h2>
              <p>
                Nabeel Astro Store was built to give gamers a fast, secure and honest place to top up their favorite games. Every order is handled with care, from checkout to delivery.
              </p>
              <p>
                We keep things simple: clean pricing, supported games only, and a support team that actually helps. Your player details are only used to complete your order.
              </p>
              <div className="about__sign">
                <div>
                  <div className="about__sign-name">Nabeel</div>
                  <div className="about__sign-role">Founder, Nabeel Astro Store</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}