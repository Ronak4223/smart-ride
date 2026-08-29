import { useMemo, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { CITIES, getAreasForCity } from '../../data/locations';
import { useSubscription } from '../../lib/subscription-store';
import type { DayLabel } from '../../types/subscription';

const DAYS: DayLabel[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const VEHICLE_OPTIONS = [
  { rate: 130, label: 'Smart Sedan' },
  { rate: 170, label: 'Smart Executive' },
  { rate: 200, label: 'Smart SUV' },
  { rate: 180, label: 'Smart Van' },
];

function fmtINR(n: number) {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

/** Subscription scheduler with the original live cost calculator, now backed
 * by the same real city/locality dataset and subscription flow as the rest
 * of the site — "Continue to Subscription" carries this exact route through. */
export function Scheduler() {
  const navigate = useNavigate();
  const { setCity, setPickup, setDrop, setCustomDays, setPickupTime, findPlans } = useSubscription();

  const [city, setCityLocal] = useState('');
  const [pickup, setPickupLocal] = useState('');
  const [drop, setDropLocal] = useState('');
  const [days, setDays] = useState<DayLabel[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [pickupTime, setPickupTimeLocal] = useState('07:30');
  const [dropTime, setDropTime] = useState('18:15');
  const [rate, setRate] = useState(170);
  const [error, setError] = useState<string | null>(null);

  const areas = useMemo(() => getAreasForCity(city), [city]);

  const toggleDay = (day: DayLabel) =>
    setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : DAYS.filter((d) => prev.includes(d) || d === day)));

  const count = days.length || 1;
  const rides = Math.round(count * 4.34);
  const cost = rides * rate;
  const vehicleLabel = VEHICLE_OPTIONS.find((v) => v.rate === rate)?.label ?? '';
  const dayLabel = days.length > 0 ? days.join(', ') : 'No days selected';

  return (
    <section className="sr-section sr-scheduler-section" id="scheduler">
      <div className="sr-wrap">
        <div className="sr-head">
          <span className="sr-eyebrow reveal">Build Your Plan</span>
          <h2 className="sr-h2 reveal">Build Your Daily Schedule</h2>
        </div>
        <div className="sr-scheduler-grid">
          <div className="sr-scheduler-card reveal">
            <div className="sr-form-row">
              <label>
                <span>Pickup Time</span>
                <input type="time" value={pickupTime} onChange={(e) => setPickupTimeLocal(e.target.value)} />
              </label>
              <label>
                <span>Drop Time (est.)</span>
                <input type="time" value={dropTime} onChange={(e) => setDropTime(e.target.value)} />
              </label>
            </div>
            <label style={{ display: 'block', marginBottom: 10 }}>
              <span>Days</span>
            </label>
            <div className="sr-days-row">
              {DAYS.map((d) => (
                <span
                  key={d}
                  role="button"
                  tabIndex={0}
                  aria-pressed={days.includes(d)}
                  className={`sr-day-pill${days.includes(d) ? ' active' : ''}`}
                  onClick={() => toggleDay(d)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleDay(d);
                    }
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
            <div className="sr-form-row">
              <label>
                <span>City</span>
                <select
                  value={city}
                  onChange={(e) => {
                    setCityLocal(e.target.value);
                    setPickupLocal('');
                    setDropLocal('');
                  }}
                >
                  <option value="" disabled>
                    Select your city
                  </option>
                  {CITIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Vehicle</span>
                <select value={rate} onChange={(e) => setRate(Number(e.target.value))}>
                  {VEHICLE_OPTIONS.map((v) => (
                    <option key={v.rate} value={v.rate}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="sr-form-row">
              <label>
                <span>Pickup Location</span>
                <select value={pickup} onChange={(e) => setPickupLocal(e.target.value)} disabled={!city}>
                  <option value="" disabled>
                    {city ? 'Select pickup area' : 'Select a city first'}
                  </option>
                  {areas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Drop Location</span>
                <select value={drop} onChange={(e) => setDropLocal(e.target.value)} disabled={!pickup}>
                  <option value="" disabled>
                    {pickup ? 'Select drop area' : 'Select pickup first'}
                  </option>
                  {areas.map((a) => (
                    <option key={a} value={a} disabled={a === pickup}>
                      {a}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="sr-preview-card reveal">
            <h4>Subscription Preview</h4>
            <div className="sr-preview-row">
              <span>Vehicle</span>
              <b>{vehicleLabel}</b>
            </div>
            <div className="sr-preview-row">
              <span>Schedule</span>
              <b>{`${dayLabel} · ${pickupTime} / ${dropTime}`}</b>
            </div>
            <div className="sr-preview-row">
              <span>Pickup</span>
              <b>{pickup || '—'}</b>
            </div>
            <div className="sr-preview-row">
              <span>Drop</span>
              <b>{drop || '—'}</b>
            </div>
            <div className="sr-preview-row">
              <span>Rides / month</span>
              <b>{rides}</b>
            </div>
            <div className="sr-preview-total">
              <div>
                <span>Estimated monthly cost</span>
                <div className="amt">{fmtINR(cost)}</div>
              </div>
            </div>
            {error ? (
              <p role="alert" style={{ color: '#b45309', fontSize: '12.5px', fontWeight: 600, marginBottom: 8 }}>
                {error}
              </p>
            ) : null}
            <button
              type="button"
              className="btn-amber"
              onClick={() => {
                if (!city || !pickup || !drop || days.length === 0) {
                  setError('Please select a city, pickup, drop and at least one day.');
                  return;
                }
                if (pickup === drop) {
                  setError('Pickup and drop locations must be different.');
                  return;
                }
                setError(null);
                setCity(city);
                setPickup(pickup);
                setDrop(drop);
                setCustomDays(days);
                setPickupTime(pickupTime);
                findPlans();
                navigate({ to: '/subscription' });
              }}
            >
              Continue to Subscription
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
