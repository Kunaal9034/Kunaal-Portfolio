import React, { useRef, useState, useEffect } from 'react';

/**
 * MagneticButton
 * 
 * Provides a subtle, premium magnetic cursor pull to interactive buttons.
 * - Displaces only 3-5px max with smooth spring-like easing
 * - Automatically disabled on touch screens and prefers-reduced-motion
 * - Does not displace when navigating via keyboard
 */
export default function MagneticButton({
  children,
  className = '',
  as = 'button',
  onClick,
  href,
  target,
  rel,
  download,
  type = 'button',
  title,
  'aria-label': ariaLabel,
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Disable on touch devices or if reduced motion is requested
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReduced) {
      setIsDisabled(true);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (isDisabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Subtle magnetic strength (max ±5px)
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const pullStrength = 0.18;
    const maxOffset = 5;

    const offsetX = Math.max(Math.min(distanceX * pullStrength, maxOffset), -maxOffset);
    const offsetY = Math.max(Math.min(distanceY * pullStrength, maxOffset), -maxOffset);

    setPosition({ x: offsetX, y: offsetY });
  };

  const handleMouseEnter = () => {
    if (!isDisabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const Component = as;

  const style = isDisabled
    ? {}
    : {
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? 'transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)'
          : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
      };

  return (
    <Component
      ref={ref}
      className={`inline-block select-none ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
      download={download}
      type={as === 'button' ? type : undefined}
      title={title}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Component>
  );
}
