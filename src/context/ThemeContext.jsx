import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
});

const THEME_STORAGE_KEY = 'kunaal-theme';

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    }
    // Dark mode is default on first visit
    return 'dark';
  });

  const applyTheme = (newTheme, withTransition = true) => {
    const root = document.documentElement;
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (withTransition) {
      root.classList.add('theme-transition');
      window.clearTimeout(window.__themeTransitionTimeout);
      window.__themeTransitionTimeout = window.setTimeout(() => {
        root.classList.remove('theme-transition');
      }, 300);
    }

    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#06090e');
      }
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.colorScheme = 'light';
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#f8fafc');
      }
    }
  };

  useEffect(() => {
    // Initial sync without transition flicker
    applyTheme(theme, false);
  }, []);

  const setTheme = (newTheme) => {
    if (newTheme !== 'dark' && newTheme !== 'light') return;
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      console.warn('localStorage is unavailable', e);
    }
    applyTheme(newTheme, true);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
