import { useEffect, useRef, useState } from 'react';

interface Stop {
  /** Position along the path, 0 → 1 */
  t: number;
  name: string;
  eta: string;
  remaining: string;
  kind: 'pickup' | 'stop' | 'drop';
}

const STOPS: Stop[] = [
  { t: 0, name: 'Panipat — Pickup', eta: 'Departed 06:40', remaining: '52 km', kind: 'pickup' },
  { t: 0.34, name: 'Samalkha Stop', eta: '42 min', remaining: '37 km', kind: 'stop' },
  { t: 0.68, name: 'Sonipat Stop', eta: '18 min', remaining: '16 km', kind: 'stop' },
  { t: 1, name: 'Delhi — Drop', eta: '18 min', remaining: '0 km', kind: 'drop' },
];

const PATH_D = 'M40 152 Q 140 178 200 122 T 330 78 Q 395 52 445 26';
const TOTAL_KM = 52;

/** Interactive route visualisation: animated path, live vehicle, hoverable stops. */
export function RouteMap() {
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [len, setLen] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0.68);
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, angle: 0 });
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, []);

  // Scroll-triggered reveal of the drawn path
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Gentle live-tracking drift, paused on hover
  useEffect(() => {
    if (!revealed || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setProgress((p) => (p >= 0.985 ? 0.04 : p + 0.0025 + Math.random() * 0.0015));
    }, 90);
    return () => window.clearInterval(id);
  }, [revealed, paused]);

  // Keep the vehicle glued to the path
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !len) return;
    const t = hover !== null ? STOPS[hover]!.t : progress;
    const p = path.getPointAtLength(len * t);
    const p2 = path.getPointAtLength(Math.min(len, len * t + 1));
    setPos({ x: p.x, y: p.y, angle: (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI });
  }, [progress, len, hover]);

  const active = hover !== null ? STOPS[hover]! : null;
  const shown = hover !== null ? STOPS[hover]!.t : progress;
  const pct = Math.round(shown * 100);
  const remainingKm = Math.max(0, Math.round(TOTAL_KM * (1 - shown)));
  const etaMin = Math.max(1, Math.round(65 * (1 - shown)));

  return (
    <div className="sr-map-visual sr-routemap" ref={wrapRef}>
      <svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" role="img"
        aria-label="Live route from Panipat to Delhi">
        <defs>
          <pattern id="mapgrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30 0H0V30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>
          <filter id="routeglow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="480" height="250" fill="url(#mapgrid)" />

        {/* base road */}
        <path d={PATH_D} stroke="rgba(255,255,255,0.12)" strokeWidth="10" fill="none" strokeLinecap="round" />

        {/* drawn route */}
        <path
          ref={pathRef}
          d={PATH_D}
          stroke="rgba(245,196,0,0.35)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          style={
            len
              ? {
                  strokeDasharray: len,
                  strokeDashoffset: revealed ? 0 : len,
                  transition: 'stroke-dashoffset 1.6s ease',
                }
              : undefined
          }
        />

        {/* travelled portion */}
        {len ? (
          <path
            d={PATH_D}
            stroke="#F5C400"
            strokeWidth="3.4"
            fill="none"
            strokeLinecap="round"
            filter="url(#routeglow)"
            style={{
              strokeDasharray: len,
              strokeDashoffset: len * (1 - (revealed ? shown : 0)),
              transition: 'stroke-dashoffset .35s linear',
            }}
          />
        ) : null}

        {/* stops */}
        {STOPS.map((s, i) => {
          const path = pathRef.current;
          if (!path || !len) return null;
          const p = path.getPointAtLength(len * s.t);
          const isEnd = s.kind !== 'stop';
          return (
            <g
              key={s.name}
              className={`sr-node${hover === i ? ' on' : ''}`}
              transform={`translate(${p.x},${p.y})`}
              onMouseEnter={() => {
                setHover(i);
                setPaused(true);
              }}
              onMouseLeave={() => {
                setHover(null);
                setPaused(false);
              }}
              onTouchStart={() => {
                setHover(i);
                setPaused(true);
              }}
            >
              <circle r="16" fill="transparent" />
              <circle
                r={isEnd ? 7 : 5}
                fill={s.kind === 'drop' ? '#fff' : '#F5C400'}
                opacity={shown >= s.t ? 1 : 0.45}
              />
              <circle
                r={hover === i ? 15 : 11}
                fill="none"
                stroke={s.kind === 'drop' ? '#fff' : '#F5C400'}
                strokeWidth="1.4"
                opacity="0.5"
                style={{ transition: 'r .25s ease' }}
              />
            </g>
          );
        })}

        {/* vehicle */}
        {len ? (
          <g
            transform={`translate(${pos.x},${pos.y}) rotate(${pos.angle})`}
            style={{ transition: 'transform .35s linear' }}
          >
            <rect x="-11" y="-6" width="22" height="12" rx="4" fill="#F5C400" />
            <rect x="-4" y="-4" width="9" height="8" rx="2" fill="rgba(11,16,23,0.55)" />
          </g>
        ) : null}
      </svg>

      <div className="sr-track-hud">
        <div className="sr-track-row">
          <span>{active ? active.name : 'Panipat → Delhi'}</span>
          <b>{pct}%</b>
        </div>
        <div className="sr-track-bar">
          <span style={{ width: `${pct}%` }} />
        </div>
        <div className="sr-track-meta">
          <div>
            <b>{active ? active.eta : `${etaMin} min`}</b>
            <span>ETA</span>
          </div>
          <div>
            <b>{active ? active.remaining : `${remainingKm} km`}</b>
            <span>Remaining</span>
          </div>
          <div>
            <b className="sr-live">Live</b>
            <span>Tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
}
