import { useEffect, useRef } from 'react';

/**
 * Plays a video exactly once per viewport entry.
 * enter -> currentTime = 0 + play; end -> hold last frame;
 * leave -> pause + reset to 0; return -> play from 0 again.
 * Each hook instance owns its own IntersectionObserver, so multiple
 * videos on the page never share playback state.
 */
export function useSectionVideo<T extends HTMLElement>(threshold = 0.4) {
  const containerRef = useRef<T | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    if (!('IntersectionObserver' in window)) {
      video.play().catch(() => {});
      return;
    }

    let inside = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const visible = entry.isIntersecting && entry.intersectionRatio >= threshold;

        if (visible && !inside) {
          inside = true;
          video.currentTime = 0;
          video.play().catch(() => {});
        } else if (!visible && inside) {
          inside = false;
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: [0, threshold, 1] },
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [threshold]);

  return { containerRef, videoRef };
}
