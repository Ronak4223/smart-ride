import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASE, DURATION, STAGGER, REVEAL_START } from '../styles/motion';

gsap.registerPlugin(SplitText, ScrollTrigger);

interface SplitRevealOptions {
  /** 'scroll' triggers on entering the viewport; 'load' fires immediately on mount. */
  trigger?: 'load' | 'scroll';
  delay?: number;
}

/**
 * Splits a heading into words (behind an overflow-hidden mask) and reveals
 * them with a staggered slide-up — the "someone actually designed this"
 * heading treatment, instead of the whole line fading up as one block.
 */
export function useSplitReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: SplitRevealOptions = {},
) {
  const { trigger = 'scroll', delay = 0 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const split = SplitText.create(el, { type: 'words', mask: 'words' });

    gsap.set(split.words, { opacity: 0, yPercent: 100 });
    const anim = gsap.to(split.words, {
      opacity: 1,
      yPercent: 0,
      duration: DURATION.base,
      ease: EASE.emphasis,
      stagger: STAGGER.tight,
      delay,
      ...(trigger === 'scroll'
        ? { scrollTrigger: { trigger: el, start: REVEAL_START, once: true } }
        : {}),
    });

    return () => {
      anim.kill();
      split.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, trigger, delay]);
}
