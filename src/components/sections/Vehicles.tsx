import { useSpotlight } from '../../lib/motionHooks';
import { useSectionStory } from '../../lib/useSectionStory';
import { useTilt } from '../../lib/useTilt';
import { IconPerson, IconBag, IconSnow, IconRoad, StarRow } from './icons';
import sedanPhoto from '../../assets/photos/veh-sedan.jpg';
import executivePhoto from '../../assets/photos/veh-executive.jpg';
import suvPhoto from '../../assets/photos/veh-suv.jpg';
import vanPhoto from '../../assets/photos/veh-van.jpg';

interface Vehicle {
  name: string;
  price: string;
  pax: string;
  bags: string;
  ride: string;
  rating: number;
  popular?: boolean;
  photo: string;
  alt: string;
}

const VEHICLES: Vehicle[] = [
  {
    name: 'Smart Sedan',
    price: '₹2,999',
    pax: '4',
    bags: '2',
    ride: 'City',
    rating: 4.7,
    photo: sedanPhoto,
    alt: 'Premium white sedan waiting on a city street in warm morning light',
  },
  {
    name: 'Smart Executive',
    price: '₹4,499',
    pax: '4',
    bags: '3',
    ride: 'Priority',
    rating: 4.9,
    popular: true,
    photo: executivePhoto,
    alt: 'Luxury black executive sedan outside glass towers in a corporate district',
  },
  {
    name: 'Smart SUV',
    price: '₹5,499',
    pax: '6',
    bags: '4',
    ride: 'Long route',
    rating: 4.6,
    photo: suvPhoto,
    alt: 'Modern dark grey SUV parked on an urban boulevard at golden hour',
  },
  {
    name: 'Smart Van',
    price: 'Custom',
    pax: '8',
    bags: '6',
    ride: 'Corporate',
    rating: 4.5,
    photo: vanPhoto,
    alt: 'Executive transport van serving as a corporate shuttle at an office campus',
  },
];

function VehicleCard({ v }: { v: Vehicle }) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 6, scale: 1.015, lift: 2 });
  return (
    <div
      ref={tiltRef}
      data-story="card"
      className={`sr-vehicle-card sr-card-x sr-lit${v.popular ? ' popular sr-featured-glow' : ''}`}
    >
      {v.popular && <span className="sr-vehicle-popular-badge">Most Popular</span>}
      <div className="sr-vehicle-visual sr-sweep" data-card-media>
        <img className="sr-photo" src={v.photo} alt={v.alt} loading="lazy" width={1280} height={800} />
      </div>
      <div className="sr-vehicle-body">
        <div className="sr-vehicle-name" data-card-title>{v.name}</div>
        <div className="sr-vehicle-rating">
          <span className="stars">
            <StarRow rating={v.rating} />
          </span>
          <span>{v.rating.toFixed(1)}</span>
        </div>
        <div className="sr-vehicle-specs">
          <span>
            <IconPerson /> {v.pax} seats
          </span>
          <span>
            <IconBag /> {v.bags} bags
          </span>
          <span>
            <IconSnow /> AC
          </span>
          <span>
            <IconRoad /> {v.ride}
          </span>
        </div>
        <div className="sr-vehicle-price">
          {v.price === 'Custom' ? (
            <b>Custom pricing</b>
          ) : (
            <>
              From <b>{v.price}</b>/mo
            </>
          )}
        </div>
        <a href="#plans" className="btn-navy-outline" data-card-cta>
          View Details
        </a>
      </div>
    </div>
  );
}

/** Vehicle collection / fleet. */
export function Vehicles() {
  const sectionRef = useSectionStory<HTMLElement>({ stagger: 0.11 });
  const gridRef = useSpotlight<HTMLDivElement>('.sr-vehicle-card');
  return (
    <section className="sr-section" id="vehicles" style={{ background: 'var(--paper)' }} ref={sectionRef}>
      <div className="sr-wrap">
        <div className="sr-head">
          <span className="sr-eyebrow" data-story="eyebrow">Our Fleet</span>
          <h2 className="sr-h2" data-story="heading">Choose Your Ride</h2>
          <p className="sr-sub" data-story="sub">Comfortable vehicles for every kind of commute.</p>
        </div>
        <div className="sr-vehicles-grid sr-card-row" ref={gridRef}>
          {VEHICLES.map((v) => (
            <VehicleCard key={v.name} v={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
