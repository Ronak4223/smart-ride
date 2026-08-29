import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';

interface TiltOptions {
  max?: number;
  scale?: number;
  /** px to lift on hover — folded into the same tween as the tilt so it
   *  doesn't fight with a CSS :hover transform (GSAP's inline transform
   *  always wins the cascade, silently killing any CSS translateY). */
  lift?: number;
  /** Resting scale before any hover interaction (e.g. a "popular" card
   *  that's slightly enlarged at rest) — also owned by GSAP so it isn't
   *  wiped out the instant the tilt tween's inline transform takes over. */
  baseScale?: number;
}

/**
 * Pointer-tracked 3D tilt for cards: rotateX/rotateY follow cursor
 * position relative to the element's center, with a slight lift (scale +
 * translateY) while hovering. Desktop only — there's no hover state on
 * touch, and a fake one just looks like a bug.
 */
export function useTilt<T extends HTMLElement>(options: TiltOptions = {}): RefObject<T | null> {
  const { max = 8, scale = 1.015, lift = 0, baseScale = 1 } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform';
    gsap.set(el, { scale: baseScale });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: px * max * 2,
        rotateX: -py * max * 2,
        y: -lift,
        scale,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
      });
    };
    const onLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, y: 0, scale: baseScale, duration: 0.6, ease: 'power3.out' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.set(el, { rotateX: 0, rotateY: 0, y: 0, scale: baseScale });
    };
  }, [max, scale, lift, baseScale]);

  return ref;
}
