import React, { useEffect, useState, useRef } from 'react';

/**
 * GradientOrbs
 * 
 * Subtle, highly blurred gradient light orbs positioned behind the hero.
 * Smoothly responds with micro-parallax to cursor movement on desktop.
 */
export default function GradientOrbs() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const targetOffset = useRef({ x: 0, y: 0 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReduced) return;

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // Gentle dampening (max ~18px translation)
      targetOffset.current = {
        x: ((e.clientX - centerX) / centerX) * 18,
        y: ((e.clientY - centerY) / centerY) * 18,
      };
    };

    const updateLoop = () => {
      setOffset((prev) => ({
        x: prev.x + (targetOffset.current.x - prev.x) * 0.08,
        y: prev.y + (targetOffset.current.y - prev.y) * 0.08,
      }));
      animFrameId.current = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animFrameId.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Primary Blue/Indigo Soft Ambient Orb */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full bg-blue-500/10 dark:bg-indigo-500/[0.08] blur-[130px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      />

      {/* Secondary Cyan/Violet Soft Accent Orb */}
      <div
        className="absolute top-1/3 right-1/4 translate-x-1/3 -translate-y-1/3 w-[26rem] h-[26rem] rounded-full bg-cyan-500/10 dark:bg-violet-500/[0.07] blur-[140px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${-offset.x * 0.8}px, ${-offset.y * 0.8}px, 0)`,
        }}
      />
    </div>
  );
}
