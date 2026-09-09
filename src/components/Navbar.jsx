import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Activities', href: '#activities' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-nav py-3 shadow-lg shadow-slate-900/5 dark:shadow-black/40' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand */}
        <a 
          href="#home" 
          className="group flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-cyber-emerald transition-colors"
          aria-label="Kunaal Portfolio Home"
        >
          <span className="w-8 h-8 rounded-lg bg-cyber-emerald/10 border border-cyber-emerald/30 flex items-center justify-center text-cyber-emerald group-hover:border-cyber-emerald/60 transition-colors">
            <Terminal className="w-4 h-4" />
          </span>
          <span>
            Kunaal<span className="text-cyber-emerald">.ai</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-emerald-700 dark:text-cyber-emerald bg-emerald-50 dark:bg-cyber-emerald/10 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-cyber-emerald rounded-full"></span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button, Theme Toggle & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Contact CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300/80 dark:bg-cyber-emerald/15 dark:hover:bg-cyber-emerald/25 dark:text-cyber-emerald dark:border-cyber-emerald/30 dark:hover:border-cyber-emerald/60 transition-all duration-200"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10 transition-colors"
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="xl:hidden glass-nav border-b border-slate-200 dark:border-white/10 px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-cyber-emerald/15 text-emerald-700 dark:text-cyber-emerald font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <div className="pt-3 border-t border-slate-200 dark:border-white/10">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block text-center py-2.5 rounded-lg text-sm font-semibold bg-cyber-emerald text-dark-950 hover:bg-cyber-emerald/90 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
