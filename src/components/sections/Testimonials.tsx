import { TESTIMONIALS, initials } from '../../data/site';
import { IconStar } from './icons';
import { useSpotlight } from '../../lib/motionHooks';
import { useSectionStory } from '../../lib/useSectionStory';

/** Rider testimonials — layered, depth-stacked cards with cursor lighting. */
export function Testimonials() {
  const litRef = useSpotlight<HTMLDivElement>('.sr-testi-card');
  const sectionRef = useSectionStory<HTMLElement>({ stagger: 0.12 });

  return (
    <section className="sr-section" id="testimonials" ref={sectionRef}>
      <div className="sr-wrap">
        <div className="sr-head" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <span className="sr-eyebrow" data-story="eyebrow">Testimonials</span>
          <h2 className="sr-h2" data-story="heading">Trusted by Everyday Commuters</h2>
        </div>
        <div>
          <div className="sr-testimonials-grid sr-testi-stack sr-card-row" ref={litRef}>
            {TESTIMONIALS.map((t, i) => (
              <div className="sr-testi-card sr-card-x sr-lit" data-story="card" data-layer={i} key={t.name}>
                <div className="sr-testi-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <IconStar key={s} size={14} />
                  ))}
                </div>
                <p className="sr-testi-quote" data-card-title>{`“${t.quote}”`}</p>
                <div className="sr-testi-person">
                  <div className="sr-testi-avatar">{initials(t.name)}</div>
                  <div>
                    <b>{t.name}</b>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
