import { useCinematicReveal } from '../../lib/motionHooks';
import { useSectionVideo } from '../../lib/useSectionVideo';
import corpVideo from '../../assets/videos/corporate.mp4';

const ARROW = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ICON = {
  clock: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  ),
  person: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" />
    </svg>
  ),
  shield: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3l7 3v6c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  chart: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 15v-3m4 3V9m4 6v-4.5" />
    </svg>
  ),
  calendar: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
    </svg>
  ),
  pin: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
};

const FEATURES = [
  { icon: ICON.clock, label: 'Punctual & Reliable' },
  { icon: ICON.chart, label: 'Cost-Effective Billing' },
  { icon: ICON.person, label: 'Verified Professional Drivers' },
  { icon: ICON.calendar, label: 'Customizable Schedules' },
  { icon: ICON.shield, label: 'Safe & Comfortable Rides' },
  { icon: ICON.pin, label: 'Real-time Tracking & Support' },
];

/** Corporate solutions — framed navy module with a play-once cinematic video. */
export function Corporate() {
  const sectionRef = useCinematicReveal<HTMLElement>('.sr-corp-copy > *', { stagger: 0.1 });
  const { containerRef, videoRef } = useSectionVideo<HTMLDivElement>(0.4);

  return (
    <section className="sr-section sr-corp-section" id="corporate" ref={sectionRef}>
      <div className="sr-wrap">
        <div className="sr-corp-frame">
          <div className="sr-corp-grid">
            <div className="sr-corp-copy">
              <div className="sr-corp-eyebrow">
                <span className="sr-eyebrow sr-eyebrow-gold">Corporate Solutions</span>
                <i className="sr-corp-rule" />
              </div>
              <h2>
                Smart Transportation
                <br />
                for Modern Teams<span className="sr-accent">.</span>
              </h2>
              <p>
                On-time commutes. Happy teams. Productive offices. All with Smart Ride&apos;s
                reliable corporate solutions.
              </p>
              <ul className="sr-corp-features">
                {FEATURES.map((f) => (
                  <li key={f.label}>
                    <span className="sr-corp-ficon">{f.icon}</span>
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>
              <div className="sr-corp-ctas">
                <a href="#plans" className="btn-amber sr-corp-btn">
                  Business Corporate Plans {ARROW}
                </a>
                <a href="#contact" className="sr-corp-btn sr-corp-btn-ghost">
                  Talk to Sales {ARROW}
                </a>
              </div>
            </div>
            <div className="sr-corp-visual reveal" ref={containerRef}>
              <video
                ref={videoRef}
                className="sr-corp-video"
                src={corpVideo}
                muted
                playsInline
                preload="metadata"
              />
              <div className="sr-corp-badge">
                <b>500+</b>
                <span>Verified Drivers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
