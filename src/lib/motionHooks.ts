import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const coarse = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * Cursor spotlight: writes --mx/--my (0-100%) onto every `selector` child of
 * the container while the pointer is over it. One delegated listener for the
 * whole grid — no per-card listeners, no layout reads on move except the
 * hovered card's rect.
 */
export function useSpotlight<T extends HTMLElement>(selector: string): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || coarse() || reduced()) return;

    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(selector);
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      card.classList.add('is-lit');
    };
    const onOut = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(selector);
      if (card && !card.contains(e.relatedTarget as Node)) card.classList.remove('is-lit');
    };

    root.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerout', onOut);
    return () => {
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerout', onOut);
    };
  }, [selector]);

  return ref;
}

/**
 * Scroll-scrubbed vertical parallax. `distance` is the total travel in px
 * across the element's full pass through the viewport — GPU transform only,
 * so no layout shifts.
 */
export function useParallaxY<T extends HTMLElement>(distance = 60): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const tween = gsap.fromTo(
      el,
      { yPercent: 0, y: distance / 2 },
      {
        y: -distance / 2,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: 'transform' });
    };
  }, [distance]);

  return ref;
}

/**
 * Pointer-driven multi-layer depth: children carrying `data-depth="0.4"`
 * translate proportionally to the pointer offset from the container center.
 * This is what makes a flat photo panel read as a scene with layers.
 */
export function usePointerDepth<T extends HTMLElement>(strength = 18): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || coarse() || reduced()) return;
    const layers = Array.from(el.querySelectorAll<HTMLElement>('[data-depth]'));
    if (!layers.length) return;

    const setters = layers.map((l) => ({
      el: l,
      depth: parseFloat(l.dataset['depth'] ?? '0.5'),
      x: gsap.quickTo(l, 'x', { duration: 0.7, ease: 'power3.out' }),
      y: gsap.quickTo(l, 'y', { duration: 0.7, ease: 'power3.out' }),
    }));

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setters.forEach((s) => {
        s.x(px * strength * s.depth);
        s.y(py * strength * s.depth);
      });
    };
    const onLeave = () => setters.forEach((s) => { s.x(0); s.y(0); });

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      onLeave();
    };
  }, [strength]);

  return ref;
}

/**
 * Cinematic entrance: elements matching `selector` rise out of a soft blur
 * with a clip-path wipe and a slight scale settle — deliberately not the
 * stock "opacity 0 → 1, y 20 → 0" fade-up.
 */
export function useCinematicReveal<T extends HTMLElement>(
  selector: string,
  options: { stagger?: number; start?: string; y?: number } = {},
): RefObject<T | null> {
  const { stagger = 0.09, start = 'top 82%', y = 42 } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (!els.length) return;
    if (reduced()) {
      gsap.set(els, { opacity: 1, clearProps: 'all' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(els, {
        opacity: 0,
        y,
        scale: 0.985,
        filter: 'blur(14px)',
        clipPath: 'inset(0% 0% 22% 0%)',
        willChange: 'transform, opacity, filter',
      });
      gsap.to(els, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.1,
        ease: 'expo.out',
        stagger,
        scrollTrigger: { trigger: root, start, once: true },
        onComplete: () => gsap.set(els, { willChange: 'auto', clearProps: 'filter,clipPath' }),
      });
    }, root);

    return () => ctx.revert();
  }, [selector, stagger, start, y]);

  return ref;
}
