import { useEffect, useState } from 'react';
import { DRIVERS, initials } from '../../data/site';
import { IconStar, IconTick } from './icons';
import { useSectionStory } from '../../lib/useSectionStory';

type Driver = (typeof DRIVERS)[number];

/** Driver grid with the original profile modal. */
export function Drivers() {
  const [active, setActive] = useState<Driver | null>(null);
  const sectionRef = useSectionStory<HTMLElement>({ stagger: 0.08, parallax: false });

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <>
      <section className="sr-section" id="drivers" ref={sectionRef}>
        <div className="sr-wrap">
          <div className="sr-head">
            <span className="sr-eyebrow" data-story="eyebrow">Our Team</span>
            <h2 className="sr-h2" data-story="heading">Meet Your Ride Partners</h2>
            <p className="sr-sub" data-story="sub">
              Experienced professionals who make every journey comfortable and dependable.
            </p>
          </div>
          <div className="sr-drivers-grid sr-card-row">
            {DRIVERS.map((d) => (
              <div
                className="sr-driver-card sr-card-x"
                data-story="card"
                key={d.name}
                role="button"
                tabIndex={0}
                onClick={() => setActive(d)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActive(d);
                  }
                }}
              >
                <div
                  className="sr-driver-avatar"
                  style={{ background: 'linear-gradient(135deg,var(--navy-800),var(--navy-950))' }}
                >
                  {initials(d.name)}
                  <span className="vbadge">
                    <IconTick size={12} />
                  </span>
                </div>
                <div className="sr-driver-name" data-card-title>{d.name}</div>
                <div className="sr-driver-exp">{d.exp}</div>
                <div className="sr-driver-stats">
                  <span>
                    <IconStar /> <b>{d.rating}</b>
                  </span>
                  <span>
                    <b>{d.trips}</b> trips
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className={`sr-modal-backdrop${active ? ' open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
      >
        {active && (
          <div className="sr-modal" role="dialog" aria-modal="true" aria-label={active.name}>
            <button className="sr-modal-close" aria-label="Close" onClick={() => setActive(null)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <div
              className="sr-modal-avatar"
              style={{ background: 'linear-gradient(135deg,var(--navy-800),var(--navy-950))' }}
            >
              {initials(active.name)}
            </div>
            <h3>{active.name}</h3>
            <p className="sr-modal-role">Smart Ride Driver Partner</p>
            <div className="sr-modal-grid">
              <div>
                <b>{active.rating} ★</b>
                <span>Rating</span>
              </div>
              <div>
                <b>{active.trips}</b>
                <span>Trips</span>
              </div>
              <div>
                <b>{active.exp.replace(' Experience', '')}</b>
                <span>Experience</span>
              </div>
              <div>
                <b>Verified</b>
                <span>Status</span>
              </div>
            </div>
            <p className="langs">Languages: <span>{active.langs}</span></p>
          </div>
        )}
      </div>
    </>
  );
}
