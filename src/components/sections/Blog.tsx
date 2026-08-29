import { BLOG } from '../../data/site';
import blog1 from '../../assets/photos/blog-1.jpg';
import blog2 from '../../assets/photos/blog-2.jpg';
import blog3 from '../../assets/photos/blog-3.jpg';
import { useSpotlight } from '../../lib/motionHooks';
import { useSectionStory } from '../../lib/useSectionStory';

const BLOG_PHOTOS: Record<string, { src: string; alt: string }> = {
  tips: { src: blog1, alt: 'Professional commuter walking toward a waiting premium car at sunrise' },
  trend: { src: blog2, alt: 'Modern urban mobility hub with premium vehicles and commuters at dusk' },
  plan: { src: blog3, alt: 'Business traveller comparing commute plans beside a premium sedan' },
};

/** Blog / resources — editorial cards with cinematic image motion. */
export function Blog() {
  const litRef = useSpotlight<HTMLDivElement>('.sr-blog-card');
  const sectionRef = useSectionStory<HTMLElement>({ stagger: 0.12 });

  return (
    <section className="sr-section" id="blog" style={{ background: 'var(--paper)' }} ref={sectionRef}>
      <div className="sr-wrap">
        <div className="sr-head">
          <span className="sr-eyebrow" data-story="eyebrow">Resources</span>
          <h2 className="sr-h2" data-story="heading">Latest from Smart Ride</h2>
        </div>
        <div>
          <div className="sr-blog-grid sr-card-row" ref={litRef}>
            {BLOG.map((b) => {
              const photo = BLOG_PHOTOS[b.icon];
              return (
                <article className="sr-blog-card sr-card-x sr-lit sr-sweep" data-story="card" key={b.title}>
                  <div className="sr-blog-visual" data-card-media>
                    {photo && (
                      <img
                        className="sr-photo"
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        width={1280}
                        height={720}
                      />
                    )}
                    <span className="grad" />
                  </div>
                  <div className="sr-blog-body">
                    <div className="sr-blog-meta">
                      <span className="cat">{b.cat}</span>
                      <span>·</span>
                      <span>{b.date}</span>
                    </div>
                    <h4 data-card-title>
                      <span className="sr-blog-title-line">{b.title}</span>
                    </h4>
                    <p>{b.excerpt}</p>
                    <span className="sr-blog-more" data-card-cta>
                      Read More
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
