import React, { useState, useEffect, useRef } from 'react';

/**
 * Parses metric strings like "50+", "~40%", "4", "500+", "100+", "~60%"
 * Returns { prefix, target, suffix } or null if not numeric
 */
function parseMetric(val) {
  if (typeof val === 'number') {
    return { prefix: '', target: val, suffix: '' };
  }
  if (typeof val !== 'string') return null;

  const trimmed = val.trim();
  const match = trimmed.match(/^([~><]?)\s*(\d+(?:\.\d+)?)\s*(%|\+|\b.*)?$/);
  if (!match) return null;

  return {
    prefix: match[1] || '',
    target: parseFloat(match[2]),
    suffix: match[3] || ''
  };
}

/**
 * AnimatedCounter
 * 
 * Smooth count-up animation that triggers once when entering the viewport.
 * - Preserves approximately ("~") qualifiers without inventing precision
 * - Respects prefers-reduced-motion
 * - Never restarts repeatedly
 * - Accessible with aria-label
 */
export default function AnimatedCounter({
  value,
  duration = 1400,
  delay = 0,
  className = ''
}) {
  const [displayValue, setDisplayValue] = useState(() => {
    // Initial display: if prefers reduced motion or SSR, show final value directly
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return value;
    }
    const parsed = parseMetric(value);
    if (!parsed) return value;
    // Show clean starting state (0, ~0%, etc.)
    if (parsed.prefix === '~' && parsed.suffix === '%') return '~0%';
    return `${parsed.prefix}0`;
  });

  const elementRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const parsed = parseMetric(value);
    if (!parsed) {
      setDisplayValue(value);
      return;
    }

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      hasAnimatedRef.current = true;
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setDisplayValue(value);
      hasAnimatedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          const startAnimation = () => {
            const startTime = performance.now();
            const { prefix, target, suffix } = parsed;

            const step = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Cubic ease-out curve
              const eased = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.round(eased * target);

              if (progress >= 1) {
                // Ensure exact final format
                setDisplayValue(`${prefix}${target}${suffix}`);
              } else {
                // Format intermediate count-up states
                if (currentVal === 0) {
                  if (prefix === '~' && suffix === '%') {
                    setDisplayValue('~0%');
                  } else {
                    setDisplayValue('0');
                  }
                } else if (currentVal < target) {
                  if (prefix === '~' && suffix === '%') {
                    setDisplayValue(`~${currentVal}%`);
                  } else if (suffix === '+') {
                    setDisplayValue(`${prefix}${currentVal}`);
                  } else {
                    setDisplayValue(`${prefix}${currentVal}${suffix}`);
                  }
                } else {
                  setDisplayValue(`${prefix}${target}${suffix}`);
                }
                requestAnimationFrame(step);
              }
            };

            requestAnimationFrame(step);
          };

          if (delay > 0) {
            setTimeout(startAnimation, delay);
          } else {
            startAnimation();
          }
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [value, duration, delay]);

  return (
    <span
      ref={elementRef}
      className={`inline-block tabular-nums font-display ${className}`}
      aria-label={typeof value === 'string' ? value : String(value)}
    >
      {displayValue}
    </span>
  );
}
