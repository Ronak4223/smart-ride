import { IconTick } from './icons';

const FEATURES = [
  'Live tracking',
  'Schedule management',
  'Subscription control',
  'Payment history',
  'Driver information',
];

/** Mobile app promotion. */
export function AppPromo() {
  return (
    <section className="sr-section sr-app-section" id="app">
      <div className="sr-wrap sr-app-grid">
        <div className="sr-app-copy">
          <span className="sr-eyebrow reveal" style={{ color: 'var(--amber)' }}>
            Smart Ride App
          </span>
          <h2 className="reveal">
            Your Ride.
            <br />
            In Your Pocket.
          </h2>
          <p className="reveal">
            Manage your Smart Ride subscription, track vehicles, update schedules and contact support
            — all from one app.
          </p>
          <ul className="sr-app-features reveal">
            {FEATURES.map((f) => (
              <li key={f}>
                <IconTick /> {f}
              </li>
            ))}
          </ul>
          <div className="sr-store-row reveal">
            <a href="#app" className="sr-store-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.7 12.6c0-3 2.5-4.5 2.6-4.6-1.4-2.1-3.6-2.4-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-1 0-2.4-1.1-4-1-2 0-3.9 1.2-4.9 3-2.1 3.6-.5 9 1.5 12 1 1.4 2.1 3 3.7 3 1.5-.1 2-.9 3.8-.9s2.3.9 3.9.9c1.6 0 2.6-1.5 3.6-2.9 1.1-1.6 1.6-3.2 1.6-3.3-.1 0-3-1.2-3-4.9ZM15.6 3.3c.8-1 1.4-2.4 1.2-3.8-1.2 0-2.6.8-3.5 1.8-.7.8-1.4 2.2-1.2 3.6 1.4.1 2.7-.7 3.5-1.6Z" />
              </svg>
              <span className="store-label">
                <span>Download on the</span>
                <b>App Store</b>
              </span>
            </a>
            <a href="#app" className="sr-store-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.6 2.5c-.4.3-.6.8-.6 1.4v16.2c0 .6.2 1.1.6 1.4l.1.1L13 12.4v-.2L3.7 2.4l-.1.1Z" />
                <path d="M16.2 15.6 13 12.4v-.2l3.2-3.2 4 2.3c1.1.6 1.1 1.6 0 2.2l-4 2.1Z" />
                <path d="M16.2 15.6 13 12.3 3.6 21.7c.4.4 1 .4 1.7.1l10.9-6.2Z" />
                <path d="M16.2 8.9 5.3 2.7c-.7-.4-1.3-.3-1.7.1L13 12.3l3.2-3.4Z" />
              </svg>
              <span className="store-label">
                <span>Get it on</span>
                <b>Google Play</b>
              </span>
            </a>
          </div>
        </div>

        <div className="reveal">
          <div className="sr-phone">
            <div className="sr-phone-screen">
              <div className="sr-phone-status">
                <span>9:41</span>
                <span>●●● 5G 100%</span>
              </div>
              <div className="sr-phone-map">
                <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="pgrid" width="18" height="18" patternUnits="userSpaceOnUse">
                      <path d="M18 0H0V18" fill="none" stroke="rgba(255,255,255,0.06)" />
                    </pattern>
                  </defs>
                  <rect width="200" height="130" fill="url(#pgrid)" />
                  <path
                    d="M10 110 Q 60 120 90 80 T 190 20"
                    stroke="#F5C400"
                    strokeWidth="2.2"
                    fill="none"
                    strokeDasharray="1 8"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="110" r="5" fill="#F5C400" />
                  <circle cx="190" cy="20" r="5" fill="#fff" />
                </svg>
              </div>
              <div className="sr-phone-pill">On the way</div>
              <div className="sr-phone-card">
                <div className="sr-phone-card-top">
                  <div className="sr-phone-avatar" />
                  <div>
                    <b>Arjun Mehta</b>
                    <span>Smart Executive · DL 4C 2291</span>
                  </div>
                  <div className="sr-phone-eta">
                    <b>4 min</b>
                    <span>ETA</span>
                  </div>
                </div>
              </div>
              <div className="sr-phone-card">
                <div className="sr-phone-card-top" style={{ marginBottom: 0 }}>
                  <div>
                    <b>Smart Plus</b>
                    <span>Active · renews in 14 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
