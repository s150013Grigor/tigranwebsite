'use client';

import { useState, useEffect } from 'react';

/**
 * SSR-safe replacement for framer-motion's useReducedMotion.
 * Returns false on the server and during first client render (deterministic),
 * then updates to the real value via useEffect (no hydration mismatch).
 */
export function useReducedMotion(): boolean {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduce(mq.matches);
    const handler = (e: MediaQueryListEvent) => setShouldReduce(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return shouldReduce;
}
