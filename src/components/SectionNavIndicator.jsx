import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'activities', label: 'Activities' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

/**
 * SectionNavIndicator
 * 
 * Desktop floating right-side indicator displaying active section.
 * - Minimal dots with glowing active ring
 * - Tooltip on hover
 * - Smooth scroll on click
 * - Hidden on mobile/tablet (xl:flex only)
 */
export default function SectionNavIndicator() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3.5 py-4 px-2 rounded-full glass-card border border-slate-200/60 dark:border-white/5 backdrop-blur-md shadow-lg shadow-black/5"
      aria-label="Section Quick Navigation"
    >
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;

        return (
          <button
            key={sec.id}
            type="button"
            onClick={() => scrollTo(sec.id)}
            className="group relative flex items-center justify-center p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full"
            aria-label={`Scroll to ${sec.label}`}
            aria-current={isActive ? 'true' : undefined}
          >
            {/* Tooltip on hover */}
            <span className="pointer-events-none absolute right-full mr-3 px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap bg-slate-900/90 dark:bg-dark-900/95 text-white border border-slate-700/80 dark:border-white/10 shadow-md opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
              {sec.label}
            </span>

            {/* Dot Indicator */}
            <span
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-2.5 h-2.5 bg-emerald-500 dark:bg-cyber-emerald ring-4 ring-emerald-500/25 dark:ring-cyber-emerald/30 shadow-sm shadow-emerald-500/50 scale-110'
                  : 'w-1.5 h-1.5 bg-slate-400 dark:bg-slate-600 group-hover:bg-slate-600 dark:group-hover:bg-slate-300 group-hover:scale-125'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
