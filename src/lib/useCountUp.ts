import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DURATION, EASE } from '../styles/motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates a number from 0 to `target` when the element scrolls into view,
 * using GSAP's own tween easing (not a linear setInterval tick) so it
 * actually decelerates into the final value. `format` lets callers render
 * "10K+" / "4.9" / "99%" instead of forcing plain integers.
 */
export function useCountUp<T extends HTMLElement>(
  target: number,
  format: (value: number) => string = (v) => Math.round(v).toString(),
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = format(target);
      return;
    }

    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: target,
      duration: DURATION.cinematic,
      ease: EASE.outSoft,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = format(counter.value);
      },
    });

    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return ref;
}
