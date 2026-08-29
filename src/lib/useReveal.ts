import { useEffect } from 'react';

/**
 * Reveal-on-scroll engine ported from the original build: every `.reveal`
 * element gets `.in-view` once it enters the viewport. Single observer for
 * the whole page so sections don't each spin up their own.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    const bound = new WeakSet<HTMLElement>();
    let index = 0;
    const observe = (list: HTMLElement[]) => {
      list.forEach((el) => {
        if (bound.has(el)) return;
        bound.add(el);
        el.style.transitionDelay = `${Math.min(index % 6, 5) * 60}ms`;
        index += 1;
        io.observe(el);
      });
    };

    observe(els);

    // Sections can remount (e.g. when the smooth-scroll layer activates),
    // which would otherwise leave the observer watching detached nodes.
    const mo = new MutationObserver(() => {
      observe(Array.from(document.querySelectorAll<HTMLElement>('.reveal')));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}

/** Smoothly scrolls to an in-page anchor, honouring reduced-motion. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}
