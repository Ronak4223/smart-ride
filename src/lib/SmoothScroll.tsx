import { type ReactNode, useState } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Keeps GSAP's ScrollTrigger positions in sync with Lenis's eased scroll
 * position every tick. Rendered as a child of <ReactLenis root>, which is
 * the officially documented integration pattern.
 */
function ScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

function computeSmoothScrollEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const isSmallScreen = window.innerWidth < 900;
  return !(prefersReduced || isCoarsePointer || isSmallScreen);
}

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Wraps the app in Lenis smooth scrolling (root mode: no wrapper divs,
 * native document scroll stays real underneath). Disabled outright on
 * touch devices, small screens, and prefers-reduced-motion, where native
 * scroll is the correct choice rather than a compromise.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const [enabled] = useState(computeSmoothScrollEnabled);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ duration: 0.65, smoothWheel: true }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
