import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-all duration-200 
        bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border-slate-200/80 shadow-sm hover:shadow hover:border-slate-300
        dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300 dark:hover:text-white dark:border-white/10 dark:hover:border-cyber-emerald/40 dark:shadow-none
        focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-emerald focus-visible:ring-offset-2 dark:focus-visible:ring-offset-dark-950 ${className}`}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light mode (☀️)' : 'Switch to dark mode (🌙)'}
      aria-pressed={!isDark}
    >
      <span className="sr-only">
        {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      </span>

      {/* Sun Icon (Visible in Light Mode) */}
      <Sun
        className={`w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-500 absolute transition-all duration-300 ease-out transform ${
          isDark
            ? 'rotate-90 scale-0 opacity-0 pointer-events-none'
            : 'rotate-0 scale-100 opacity-100'
        }`}
        aria-hidden="true"
      />

      {/* Moon Icon (Visible in Dark Mode) */}
      <Moon
        className={`w-4 h-4 sm:w-4.5 sm:h-4.5 text-cyber-cyan absolute transition-all duration-300 ease-out transform ${
          isDark
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
