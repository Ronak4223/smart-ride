import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { EASE } from '../styles/motion';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

interface StoryOptions {
  /** ScrollTrigger start position. */
  start?: string;
  /** Stagger between card-level elements. */
  stagger?: number;
  /** Scroll-linked drift for `[data-story="visual"]` media (desktop only). */
  parallax?: boolean;
}

const SEL = {
  visual: '[data-story="visual"]',
  eyebrow: '[data-story="eyebrow"]',
  heading: '[data-story="heading"]',
  sub: '[data-story="sub"]',
  card: '[data-story="card"]',
  last: '[data-story="last"]',
};

function pick(root: HTMLElement, sel: string): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(sel));
}

/**
 * The one section choreography used across the whole page.
 *
 * A section entering the viewport plays a single timeline:
 * visual establishes → heading reveals (masked, line by line) → supporting
 * copy follows → cards stagger in → trailing interactive bits settle.
 * Everything shares the same eases/timings so the page reads as one motion
 * language rather than a pile of per-section animations.
 */
export function useSectionStory<T extends HTMLElement>(
  options: StoryOptions = {},
): RefObject<T | null> {
  const { start = 'top 78%', stagger = 0.09, parallax = true } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const groups = {
      visual: pick(root, SEL.visual),
      eyebrow: pick(root, SEL.eyebrow),
      heading: pick(root, SEL.heading),
      sub: pick(root, SEL.sub),
      card: pick(root, SEL.card),
      last: pick(root, SEL.last),
    };
    const all = Object.values(groups).flat();
    if (!all.length) return;

    // Neutralise the global `.reveal` CSS observer for anything the timeline
    // owns, otherwise two systems fight over the same opacity.
    all.forEach((el) => el.classList.add('in-view'));

    if (reduced()) {
      gsap.set(all, { opacity: 1, clearProps: 'transform,filter,clipPath' });
      return;
    }

    const soft = coarse(); // mobile: reveals only, no blur/parallax cost
    const ctx = gsap.context(() => {
      const splits: SplitText[] = [];
      const tl = gsap.timeline({
        defaults: { ease: EASE.emphasis },
        scrollTrigger: { trigger: root, start, once: true },
      });

      if (groups.visual.length) {
        gsap.set(groups.visual, {
          opacity: 0,
          scale: 1.05,
          clipPath: 'inset(10% 0% 0% 0%)',
          willChange: 'transform, opacity',
        });
        tl.to(
          groups.visual,
          {
            opacity: 1,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.25,
            onComplete: () => gsap.set(groups.visual, { clearProps: 'clipPath,willChange' }),
          },
          0,
        );
      }

      if (groups.eyebrow.length) {
        gsap.set(groups.eyebrow, { opacity: 0, y: 14 });
        tl.to(groups.eyebrow, { opacity: 1, y: 0, duration: 0.6 }, 0.1);
      }

      groups.heading.forEach((el, i) => {
        const split = SplitText.create(el, { type: 'lines', mask: 'lines' });
        splits.push(split);
        gsap.set(split.lines, { yPercent: 110, opacity: 0 });
        tl.to(
          split.lines,
          { yPercent: 0, opacity: 1, duration: 1, stagger: 0.09 },
          0.18 + i * 0.08,
        );
      });

      if (groups.sub.length) {
        gsap.set(groups.sub, { opacity: 0, y: 20 });
        tl.to(groups.sub, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 }, 0.42);
      }

      if (groups.card.length) {
        gsap.set(groups.card, {
          opacity: 0,
          y: soft ? 32 : 46,
          scale: soft ? 1 : 0.985,
          ...(soft ? {} : { filter: 'blur(10px)' }),
          willChange: 'transform, opacity',
        });
        tl.to(
          groups.card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ...(soft ? {} : { filter: 'blur(0px)' }),
            duration: 1,
            stagger,
            onComplete: () => gsap.set(groups.card, { clearProps: 'filter,willChange' }),
          },
          0.5,
        );
      }

      if (groups.last.length) {
        gsap.set(groups.last, { opacity: 0, y: 16 });
        tl.to(groups.last, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, '>-0.35');
      }

      if (parallax && !soft) {
        groups.visual.forEach((v) => {
          const media = v.querySelector<HTMLElement>('img, video, .sr-photo') ?? v;
          gsap.fromTo(
            media,
            { yPercent: -2.5 },
            {
              yPercent: 2.5,
              ease: 'none',
              scrollTrigger: {
                trigger: v,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            },
          );
        });
      }

      return () => splits.forEach((s) => s.revert());
    }, root);

    return () => ctx.revert();
  }, [start, stagger, parallax]);

  return ref;
}
