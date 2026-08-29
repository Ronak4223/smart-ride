import { useNavigate } from '@tanstack/react-router';
import { POPULAR_ROUTES } from '../../data/popularRoutes';
import { IconClock, IconTag } from './icons';
import { RouteMap } from './RouteMap';
import { useSectionStory } from '../../lib/useSectionStory';
import { useSpotlight } from '../../lib/motionHooks';
import { useSubscription } from '../../lib/subscription-store';

/** Route Explorer, restored from the original build. Each card now links to
 * a real, working route (validated against the mock locality dataset) and
 * "View Plan" pre-fills the subscription flow instead of doing nothing. */
export function RouteExplorer() {
  const sectionRef = useSectionStory<HTMLElement>({ stagger: 0.1 });
  const gridRef = useSpotlight<HTMLDivElement>('.sr-route-card');
  const panelRef = useSectionStory<HTMLDivElement>({
    stagger: 0.12,
    start: 'top 80%',
    parallax: false,
  });
  const navigate = useNavigate();
  const { setCity, setPickup, setDrop, setDayPreset, setPickupTime, findPlans } = useSubscription();

  const viewPlan = (route: (typeof POPULAR_ROUTES)[number]) => {
    setCity(route.citySlug);
    setPickup(route.pickup);
    setDrop(route.drop);
    setDayPreset('weekdays');
    setPickupTime('08:30');
    findPlans();
    navigate({ to: '/subscription' });
  };

  return (
    <section className="sr-section" id="routes" style={{ background: 'var(--white)' }} ref={sectionRef}>
      <div className="sr-wrap">
        <div className="sr-head">
          <span className="sr-eyebrow" data-story="eyebrow">Popular Routes</span>
          <h2 className="sr-h2" data-story="heading">
            Reliable daily transportation across the routes that matter most.
          </h2>
        </div>

        <div className="sr-routes-grid sr-card-row" ref={gridRef}>
          {POPULAR_ROUTES.map((r) => (
            <div className="sr-route-card sr-card-x sr-lit" data-story="card" key={`${r.citySlug}-${r.pickup}-${r.drop}`}>
              <div className="sr-route-line">
                <span className="sr-route-dot" />
                <span className="sr-route-dash" />
                <span className="sr-route-dot end" />
              </div>
              <div className="sr-route-points" data-card-title>
                <span>{r.pickup}</span>
                <span>{r.drop}</span>
              </div>
              <div className="sr-route-meta">
                <span>
                  <IconClock /> {r.time}
                </span>
                <span>
                  <IconTag /> {r.plansLabel}
                </span>
              </div>
              <div className="sr-route-price">
                <div>
                  <b>{r.price}</b>
                  <small>starting / month</small>
                </div>
                <button type="button" className="sr-route-cta" data-card-cta onClick={() => viewPlan(r)}>
                  View Plan →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="sr-routes-more" data-story="last">
          <a href="/plans" className="btn-navy-outline">
            View All Routes
          </a>
        </div>

        <div className="sr-map-panel" ref={panelRef}>
          <div className="sr-map-info">
            <h3 data-story="heading">Panipat → Delhi</h3>
            <p data-story="sub">
              Every Smart Ride subscription runs on a fixed route with live vehicle visibility, so
              you always know where your ride is before it arrives.
            </p>
            <div className="sr-map-stats">
              <div data-story="card">
                <b>52 km</b>
                <span>Distance</span>
              </div>
              <div data-story="card">
                <b>~65 min</b>
                <span>Avg. Time</span>
              </div>
              <div data-story="card">
                <b>3</b>
                <span>Plans Available</span>
              </div>
            </div>
          </div>
          <div data-story="visual" style={{ minWidth: 0, display: 'grid' }}>
            <RouteMap />
          </div>
        </div>
      </div>
    </section>
  );
}
