import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal
 * 
 * Elegant viewport reveal hook.
 * Adds opacity & translate-y reveal once when entering viewport.
 * Automatically bypassed if prefers-reduced-motion is enabled.
 */
export default function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
  delay = 0
} = {}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // If reduced motion is preferred or SSR, reveal immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsRevealed(true), delay);
          } else {
            setIsRevealed(true);
          }
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, rootMargin, delay]);

  return [ref, isRevealed];
}
