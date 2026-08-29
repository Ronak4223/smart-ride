import { useSectionStory } from '../../lib/useSectionStory';
import { useSectionVideo } from '../../lib/useSectionVideo';
import whyVideo from '../../assets/videos/why-commute.mp4';

const ARROW = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ROWS = [
  {
    num: '01',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 15c0 1.1 1.34 2 3 2s3-.9 3-2-1.34-2-3-2-3-.9-3-2 1.34-2 3-2 3 .9 3 2M12 7v2m0 6v2" />
      </svg>
    ),
    title: 'Fixed monthly pricing',
    body: 'Know exactly what your commute costs — no surprise fares.',
  },
  {
    num: '02',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3l7 3v6c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-3Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Professionally verified drivers',
    body: 'Every driver is background-checked before joining the fleet.',
  },
  {
    num: '03',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
    title: 'Reliable scheduled pickup',
    body: 'Built around your working or study routine, every day.',
  },
];

/** Why Smart Ride — editorial split with a play-once cinematic video. */
export function WhySmartRide() {
  const sectionRef = useSectionStory<HTMLElement>({ stagger: 0.1, parallax: false });
  const { containerRef, videoRef } = useSectionVideo<HTMLDivElement>(0.4);

  return (
    <section className="sr-section sr-why-section" id="why" ref={sectionRef}>
      <div className="sr-wrap sr-why-grid">
        <div className="sr-why-visual" data-story="visual" ref={containerRef}>
          <video
            ref={videoRef}
            className="sr-why-video"
            src={whyVideo}
            muted
            playsInline
            preload="metadata"
          />
        </div>
        <div className="sr-why-content sr-card-row">
          <span className="sr-eyebrow" data-story="eyebrow">Why Smart Ride</span>
          <h2 className="sr-h2 sr-why-h2" data-story="heading">
            Your daily commute, without the <span className="sr-accent">daily hassle.</span>
          </h2>
          <p className="sr-sub" data-story="sub">
            One subscription. One reliable ride. Every day — the same driver rhythm, the same fixed
            price, the same route.
          </p>
          <div className="sr-why-rows">
            {ROWS.map((r) => (
              <div className="sr-why-row sr-card-x sr-card-x--flat" data-story="card" key={r.num}>
                <span className="sr-why-row-num">{r.num}</span>
                <span className="sr-why-row-icon">{r.icon}</span>
                <span className="sr-why-row-body">
                  <h4 data-card-title>{r.title}</h4>
                  <p>{r.body}</p>
                </span>
                <span className="sr-why-row-arrow" data-card-cta>{ARROW}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
