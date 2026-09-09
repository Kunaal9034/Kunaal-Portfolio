import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor
 * 
 * Minimal, precision desktop cursor with smooth trailing outer ring.
 * - Central micro-dot (5px) for exact precision
 * - Trailing interactive ring (24px default, expands to 38px on hoverable elements)
 * - Automatically hidden on touch devices and prefers-reduced-motion
 * - Disappears cleanly when leaving the document
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReduced) {
      setIsDisabled(true);
      return;
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive element
      const target = e.target;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], label, .interactive, .glass-card')
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const updateLoop = () => {
      if (dotRef.current && ringRef.current) {
        // Direct dot placement
        dotRef.current.style.transform = `translate3d(${mousePos.current.x - 3}px, ${mousePos.current.y - 3}px, 0)`;

        // Smooth trailing ring lerp
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

        const size = isHovered ? 40 : 24;
        const offset = size / 2;

        ringRef.current.style.transform = `translate3d(${ringPos.current.x - offset}px, ${ringPos.current.y - offset}px, 0)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }
      animFrameId.current = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animFrameId.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible, isHovered]);

  if (isDisabled) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Central Precision Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-cyber-emerald pointer-events-none"
      />

      {/* Smooth Trailing Responsive Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none transition-[width,height,border-color,background-color] duration-200 ease-out ${
          isHovered
            ? 'border-blue-500/50 dark:border-cyan-400/50 bg-blue-500/10 dark:bg-cyan-500/10'
            : 'border-slate-400/30 dark:border-white/25 bg-transparent'
        }`}
        style={{ width: '24px', height: '24px' }}
      />
    </div>
  );
}
