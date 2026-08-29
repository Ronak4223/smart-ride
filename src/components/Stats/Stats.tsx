import { useCountUp } from '../../lib/useCountUp';
import './Stats.css';

interface StatDef {
  target: number;
  format: (v: number) => string;
  label: string;
}

const STATS: StatDef[] = [
  { target: 10000, format: (v) => `${Math.round(v / 1000)}K+`, label: 'Daily Rides' },
  { target: 99, format: (v) => `${Math.round(v)}%`, label: 'On-Time Pickup' },
  { target: 4.9, format: (v) => v.toFixed(1), label: 'Rider Rating' },
  { target: 500, format: (v) => `${Math.round(v)}+`, label: 'Verified Drivers' },
];

function Stat({ target, format, label }: StatDef) {
  const ref = useCountUp<HTMLSpanElement>(target, format);
  return (
    <div className="stat">
      <span className="stat-num" ref={ref}>
        0
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export function Stats() {
  return (
    <section className="stats-strip" id="stats">
      <div className="sr-wrap">
        <div className="stats-grid">
          {STATS.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
