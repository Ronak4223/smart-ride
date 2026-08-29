/** Small inline icons reused across the restored sections (ported 1:1 from the original markup). */

export const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const IconTag = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 12l-8 8-9-9V4h7l10 10Z" />
    <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const IconPerson = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" />
  </svg>
);

export const IconBag = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="5" y="8" width="14" height="12" rx="2" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const IconSnow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 3v18M5 7l14 10M19 7 5 17" />
  </svg>
);

export const IconRoad = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M8 3 4 21M16 3l4 18M12 8v3m0 5v1" />
  </svg>
);

export const IconCheck = ({ size = 16 }: { size?: number }) => (
  <svg
    className="yes"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export const IconCross = ({ size = 14 }: { size?: number }) => (
  <svg
    className="no"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconTick = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

export const IconStar = ({ size = 11, filled = true }: { size?: number; filled?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M12 2l3.1 6.6 7.2.8-5.4 5 1.5 7.1L12 18l-6.4 3.5 1.5-7.1-5.4-5 7.2-.8L12 2Z" />
  </svg>
);

export function StarRow({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <IconStar key={i} filled={i <= full} />
      ))}
    </>
  );
}

export const CarOutline = () => (
  <svg viewBox="0 0 300 130" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 100 C14 90 20 84 30 82 L52 78 L74 46 C80 36 92 30 106 30 L182 30 C196 30 208 36 214 46 L232 76 L262 82 C278 85 286 90 286 100 L286 100 L14 100 Z" />
      <circle cx="70" cy="102" r="18" />
      <circle cx="228" cy="102" r="18" />
    </g>
  </svg>
);
