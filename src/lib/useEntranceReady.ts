import { useEffect, useState } from "react";

/**
 * Renders `false` on the server and on first client paint (so there's no
 * hydration mismatch), then flips to `true` a tick later. Pair with a CSS
 * `transition` so a value set directly in render (like a bar-chart height)
 * actually animates in on mount instead of appearing instantly — a plain
 * `transition-*` class alone has nothing to transition *from* otherwise.
 */
export function useEntranceReady(delayMs = 30): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), delayMs);
    return () => window.clearTimeout(id);
  }, [delayMs]);
  return ready;
}
