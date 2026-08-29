import { useCinematicReveal } from '../../lib/motionHooks';

const COLS = [
  {
    title: 'Product',
    links: [
      { label: 'Why Smart Ride', href: '#why' },
      { label: 'Plans', href: '#plans' },
      { label: 'Routes', href: '#routes' },
      { label: 'Vehicles', href: '#vehicles' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Drivers', href: '#drivers' },
      { label: 'Scheduler', href: '#scheduler' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#why' },
      { label: 'Careers', href: '#corporate' },
      { label: 'Partners', href: '#corporate' },
      { label: 'Corporate', href: '#corporate' },
      { label: 'Contact', href: '#corporate' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#faq' },
      { label: 'Safety', href: '#safety' },
      { label: 'FAQs', href: '#faq' },
      { label: 'Cancellation Policy', href: '#faq' },
      { label: 'Corporate Support', href: '#corporate' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Pricing Comparison', href: '#compare' },
      { label: 'Savings Calculator', href: '#savings' },
      { label: 'Mobile App', href: '#app' },
      { label: 'Resources', href: '#blog' },
    ],
  },
];

/** Site footer. */
export function Footer() {
  const revealRef = useCinematicReveal<HTMLElement>('.sr-footer-reveal', {
    stagger: 0.08,
    y: 34,
    start: 'top 92%',
  });

  return (
    <footer className="sr-footer" ref={revealRef}>
      <div className="sr-wrap">
        <div className="sr-footer-top sr-footer-reveal">
          <div className="sr-footer-brand">
            <span className="brand-mark" />
            SMART RIDE
          </div>
          <p>Smarter daily transportation, built around your routine.</p>
          <div className="sr-footer-social">
            <a href="#app" aria-label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.2-1.5 1.6-1.5H16.7V3.7C16.4 3.6 15.4 3.5 14.2 3.5c-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13H10v8h3.5Z" />
              </svg>
            </a>
            <a href="#app" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17" cy="7" r="1" />
              </svg>
            </a>
            <a href="#app" aria-label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.9 8.4H3.7V20h3.2V8.4ZM5.3 3.5A1.9 1.9 0 1 0 5.3 7.3 1.9 1.9 0 0 0 5.3 3.5ZM20.3 20h-3.2v-6c0-1.4 0-3.2-2-3.2s-2.3 1.6-2.3 3.1v6H9.6V8.4h3v1.6h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V20Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="sr-footer-cols">
          {COLS.map((col) => (
            <div className="sr-footer-col sr-footer-reveal" key={col.title}>
              <h5>{col.title}</h5>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>
                      <span>{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="sr-footer-bottom sr-footer-reveal">
          <span>© 2026 Smart Ride Mobility. All rights reserved.</span>
          <span>Made for daily commuters, everywhere.</span>
        </div>
      </div>
    </footer>
  );
}
