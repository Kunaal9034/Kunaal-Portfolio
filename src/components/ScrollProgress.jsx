import React, { useEffect, useState } from 'react';

/**
 * ScrollProgress
 * 
 * Minimal 2.5px progress indicator at the top of the viewport.
 * Dynamically tracks scroll progress from 0% to 100%.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (winHeightPx > 0) {
        const scrolled = (scrollPx / winHeightPx) * 100;
        setProgress(Math.min(Math.max(scrolled, 0), 100));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[2.5px] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 dark:from-blue-500 dark:via-indigo-500 dark:to-cyan-400 transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
