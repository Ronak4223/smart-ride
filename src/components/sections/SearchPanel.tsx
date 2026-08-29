import { useMemo, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSubscription } from '../../lib/subscription-store';
import { CITIES, getAreasForCity } from '../../data/locations';
import { DAY_PRESET_OPTIONS } from '../../data/subscriptionPlans';
import type { DayPreset } from '../../types/subscription';

/** Search / plan-finder panel that sits under the hero. Feeds the real,
 * frontend-only subscription flow at /subscription — city, pickup and drop
 * are dependent selects backed by mock locality data. */
export function SearchPanel() {
  const navigate = useNavigate();
  const { setCity, setPickup, setDrop, setDayPreset, setPickupTime, findPlans } = useSubscription();

  const [city, setCityLocal] = useState('');
  const [pickup, setPickupLocal] = useState('');
  const [drop, setDropLocal] = useState('');
  const [dayPreset, setDayPresetLocal] = useState<DayPreset | ''>('');
  const [time, setTimeLocal] = useState('');
  const [error, setError] = useState<string | null>(null);

  const areas = useMemo(() => getAreasForCity(city), [city]);

  return (
    <section className="sr-search-wrap">
      <div className="sr-wrap">
        <form
          className="sr-search-card reveal"
          onSubmit={(e) => {
            e.preventDefault();
            if (!city || !pickup || !drop || !dayPreset || !time) {
              setError('Please select a city, pickup, drop, days and pickup time.');
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
            setDayPreset(dayPreset);
            setPickupTime(time);
            if (dayPreset !== 'custom') findPlans();
            navigate({ to: '/subscription' });
          }}
        >
          <div className="sr-search-label">
            <span className="sr-search-eyebrow">Daily Commute, Simplified</span>
            <h3>
              Your route. Your schedule.
              <br />
              One monthly ride.
            </h3>
          </div>
          <div className="sr-search-fields">
            <div className="sr-search-grid">
              <label className="sr-field">
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
              <label className="sr-field">
                <span>Pickup</span>
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
              <label className="sr-field">
                <span>Drop</span>
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
              <label className="sr-field">
                <span>Days</span>
                <select value={dayPreset} onChange={(e) => setDayPresetLocal(e.target.value as DayPreset)}>
                  <option value="" disabled>
                    Select days
                  </option>
                  {DAY_PRESET_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="sr-field">
                <span>Pickup Time</span>
                <input type="time" value={time} onChange={(e) => setTimeLocal(e.target.value)} />
              </label>
            </div>
            {error ? (
              <p role="alert" style={{ color: 'var(--amber-ink, #b45309)', fontSize: '12.5px', fontWeight: 600 }}>
                {error}
              </p>
            ) : null}
            <button type="submit" className="btn-amber">
              Find My Plan
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
