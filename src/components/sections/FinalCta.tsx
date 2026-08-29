import { CarOutline } from './icons';
import { useMagnetic } from '../../lib/useMagnetic';
import { useCinematicReveal, useParallaxY } from '../../lib/motionHooks';

/** Closing call to action — the conversion moment. */
export function FinalCta() {
  const magnetic = useMagnetic<HTMLAnchorElement>(0.28);
  const bgRef = useParallaxY<HTMLDivElement>(90);
  const revealRef = useCinematicReveal<HTMLDivElement>('.sr-fc-reveal', {
    stagger: 0.14,
    y: 58,
    start: 'top 78%',
  });

  return (
    <section className="sr-section sr-final-cta">
      <div className="sr-fc-glow" aria-hidden="true" />
      <div className="sr-fc-bg" ref={bgRef}>
        <CarOutline />
      </div>
      <div className="sr-wrap" ref={revealRef}>
        <h2 className="sr-fc-reveal">Your Daily Commute Should Be the Easy Part.</h2>
        <p className="sr-fc-reveal">Choose your route. Pick your plan. Let Smart Ride handle the rest.</p>
        <div className="sr-final-ctas sr-fc-reveal">
          <a href="#plans" className="btn-solid sr-magnetic" ref={magnetic}>
            <span>Start Your Subscription</span>
          </a>
          <a href="#plans" className="btn-outline sr-cta-outline">
            Explore Plans
          </a>
        </div>
      </div>
    </section>
  );
}
