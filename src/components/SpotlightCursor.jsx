import React, { useEffect, useRef, useState } from 'react';

/**
 * SpotlightCursor
 * 
 * Soft radial spotlight that subtly follows mouse movement.
 * - Extremely low opacity for restrained elegance
 * - Zero pointer event interference
 * - Disabled on touch/mobile and prefers-reduced-motion
 */
export default function SpotlightCursor() {
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const targetCoords = useRef({ x: -1000, y: -1000 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Disable on touch or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReduced) {
      setIsDisabled(true);
      return;
    }

    const handleMouseMove = (e) => {
      targetCoords.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const updateLoop = () => {
      setCoords((prev) => {
        const dx = targetCoords.current.x - prev.x;
        const dy = targetCoords.current.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        };
      });
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
  }, [isVisible]);

  if (isDisabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[1] transition-opacity duration-500 overflow-hidden ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.04), rgba(99, 102, 241, 0.02) 40%, transparent 80%)`
        }}
      />
    </div>
  );
}
