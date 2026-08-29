import { CarOutline } from './icons';
import { useSectionStory } from '../../lib/useSectionStory';

const CARDS = [
  {
    title: 'Verified Drivers',
    body: 'Driver background verification and documentation, checked before they join the fleet.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3l7 3v6c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-3Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Live Trip Tracking',
    body: 'Track your scheduled ride in real time, from pickup to drop.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    ),
  },
  {
    title: 'Emergency Assistance',
    body: 'Quick access to support whenever you need it, on any scheduled ride.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 9v4M12 17h.01" />
        <path d="M10.3 4.3 2.9 17a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" />
      </svg>
    ),
  },
  {
    title: 'Ride Monitoring',
    body: 'Smart Ride monitors every scheduled journey from start to finish.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

/** Safety & trust. */
export function Safety() {
  const sectionRef = useSectionStory<HTMLElement>({ stagger: 0.09, parallax: false });
  return (
    <section className="sr-section sr-safety-section" id="safety" ref={sectionRef}>
      <div className="sr-safety-bg">
        <CarOutline />
      </div>
      <div className="sr-wrap">
        <div className="sr-head">
          <span className="sr-eyebrow" data-story="eyebrow">Safety First</span>
          <h2 className="sr-h2" data-story="heading">Your Safety Comes First.</h2>
          <p className="sr-sub" data-story="sub">
            Every scheduled ride runs on the same standard, regardless of route or plan.
          </p>
        </div>
        <div className="sr-safety-grid sr-card-row">
          {CARDS.map((c) => (
            <div className="sr-safety-card sr-card-x" data-story="card" key={c.title}>
              <span className="sr-safety-icon">{c.icon}</span>
              <h4 data-card-title>{c.title}</h4>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
        <p className="sr-safety-line" data-story="last">
          Safety is not an add-on. <b>It's built into every ride.</b>
        </p>
      </div>
    </section>
  );
}
