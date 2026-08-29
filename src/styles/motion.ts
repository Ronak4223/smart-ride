/**
 * Shared motion tokens. Every GSAP call in the app should pull from here
 * instead of hand-picking an ease/duration per component — that's what
 * turns "animated in several places" into "one coherent motion language."
 */

export const EASE = {
  /** Default entrance for cards, text blocks, most reveals. */
  out: 'power3.out',
  /** Snappier, for small UI feedback (buttons, toggles). */
  outSoft: 'power2.out',
  /** Scroll-scrubbed motion (camera turns, progress-linked transforms). */
  linear: 'none',
  /** Emphasis entrances — hero headline, section titles. */
  emphasis: 'expo.out',
  /** Settling/bounce — suspension, card pop. */
  settle: 'back.out(1.6)',
} as const;

export const DURATION = {
  instant: 0.2,
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.4,
} as const;

export const STAGGER = {
  tight: 0.05,
  base: 0.08,
  loose: 0.12,
} as const;

/** Standard "reveal" from/to pair for scroll-triggered entrances. */
export const REVEAL_FROM = { opacity: 0, y: 28 } as const;
export const REVEAL_TO = { opacity: 1, y: 0 } as const;

/** Default ScrollTrigger start position for one-shot reveals. */
export const REVEAL_START = 'top 85%';
