import { useEffect, useRef, useState } from 'react';

function fmtINR(n: number) {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

/** Savings comparison bars + live calculator. */
export function Savings() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filled, setFilled] = useState(false);
  const [daily, setDaily] = useState('350');
  const [days, setDays] = useState('22');
  const [sub, setSub] = useState('4499');

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setFilled(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFilled(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const monthly = (parseFloat(daily) || 0) * (parseFloat(days) || 0) - (parseFloat(sub) || 0);

  return (
    <section className="sr-section" id="savings" style={{ background: 'var(--white)' }} ref={sectionRef}>
      <div className="sr-wrap">
        <div className="sr-head">
          <span className="sr-eyebrow reveal">Do The Math</span>
          <h2 className="sr-h2 reveal">Stop Paying Per Ride.</h2>
          <p className="sr-sub reveal">Save more by riding smarter.</p>
        </div>
        <div className="sr-savings-grid">
          <div className="sr-savings-compare reveal">
            <div className="sr-savings-bar-row">
              <div className="label">
                <span>Traditional Daily Taxi</span>
                <span>₹350 × 22 days ≈ ₹7,700/mo</span>
              </div>
              <div className="sr-savings-bar-track">
                <span
                  className="sr-savings-bar-fill"
                  style={{ background: '#9AA3AF', width: filled ? '100%' : undefined }}
                />
              </div>
            </div>
            <div className="sr-savings-bar-row">
              <div className="label">
                <span>Smart Ride Subscription</span>
                <span>₹4,499/mo</span>
              </div>
              <div className="sr-savings-bar-track">
                <span
                  className="sr-savings-bar-fill"
                  style={{ background: 'var(--amber)', width: filled ? '58%' : undefined }}
                />
              </div>
            </div>
            <div className="sr-savings-note">
              Estimated savings: ₹3,201/month — that's over ₹38,000 a year.
            </div>
          </div>

          <div className="sr-savings-calc reveal">
            <label htmlFor="calcDaily">Daily ride cost (₹)</label>
            <input id="calcDaily" type="number" value={daily} onChange={(e) => setDaily(e.target.value)} />
            <label htmlFor="calcDays">Days per month</label>
            <input id="calcDays" type="number" value={days} onChange={(e) => setDays(e.target.value)} />
            <label htmlFor="calcSub">Monthly subscription (₹)</label>
            <input id="calcSub" type="number" value={sub} onChange={(e) => setSub(e.target.value)} />
            <div className="sr-savings-output">
              <div>
                <b>{fmtINR(monthly)}</b>
                <span>Monthly Savings</span>
              </div>
              <div>
                <b>{fmtINR(monthly * 12)}</b>
                <span>Annual Savings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
