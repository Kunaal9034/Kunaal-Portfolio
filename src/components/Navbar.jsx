import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowUpRight, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import MagneticButton from './MagneticButton';

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
      scrolled ? 'glass-nav py-3 sm:py-3.5 shadow-md dark:shadow-black/60' : 'glass-nav-top py-3.5 sm:py-4'
    }`}>
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 opacity-90" />

      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between">
        
        {/* Brand */}
        <a 
          href="#home" 
          className="group flex items-center gap-2.5 font-display text-xl font-bold tracking-[0.03em] text-slate-900 dark:text-white hover:text-blue-700 dark:hover:text-cyan-300 transition-colors shrink-0 mr-4 lg:mr-6 xl:mr-8"
          aria-label="Kunaal Portfolio Home"
        >
          <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-dark-900 border border-slate-300/80 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-cyan-400 group-hover:border-cyan-500/50 transition-colors">
            <Terminal className="w-4 h-4" />
          </span>
          <span className="tracking-[0.03em] font-mono text-lg flex items-center">
            <span>Kunaal</span>
            <span className="text-cyan-600 dark:text-cyan-400">.ai</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center justify-center gap-1 lg:gap-1.5 xl:gap-2.5 2xl:gap-3.5 mx-1 xl:mx-2 flex-1 min-w-0 font-mono" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-2.5 lg:px-2.5 xl:px-3 2xl:px-3.5 py-1.5 xl:py-2 text-xs xl:text-[13px] 2xl:text-sm rounded-lg whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                  isActive
                    ? 'font-bold text-slate-900 bg-slate-200/80 border border-slate-300 dark:text-cyan-300 dark:bg-white/10 dark:border-cyan-500/40 shadow-xs'
                    : 'font-medium text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 border border-transparent dark:text-slate-300/85 dark:hover:text-white dark:hover:bg-white/[0.06]'
                }`}
              >
                {isActive ? (
                  <span className="flex items-center gap-1">
                    <span className="text-cyan-600 dark:text-cyan-400 text-[10px]">&gt;</span>
                    <span>{link.name}</span>
                  </span>
                ) : (
                  <span>{link.name}</span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button, Theme Toggle & Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-3.5 shrink-0 ml-3 lg:ml-5 xl:ml-8">
          {/* Command Palette Trigger Button */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-medium text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 dark:text-slate-300 dark:hover:text-cyan-300 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 transition-colors shadow-xs"
            title="Open Command Palette (Ctrl+K)"
            aria-label="Open Command Palette"
          >
            <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span className="hidden sm:inline font-bold text-[10px] text-slate-500 dark:text-slate-400">Ctrl+K</span>
          </button>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Contact CTA */}
          <MagneticButton
            as="a"
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 xl:px-5 py-2 sm:py-2.5 text-xs font-mono font-bold tracking-wide rounded-xl transition-all duration-200 shadow-sm shrink-0
              bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500 text-white border border-cyan-400/30
              dark:bg-dark-900 dark:text-cyan-300 dark:border-cyan-500/40 dark:hover:border-cyan-400 dark:hover:bg-dark-850"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-200 dark:text-cyan-400 shrink-0" />
          </MagneticButton>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 sm:p-2.5 rounded-xl text-slate-700 hover:text-slate-950 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/90 dark:text-slate-300 dark:hover:text-white dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 shrink-0"
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden glass-nav border-b border-slate-200/90 dark:border-white/10 px-5 pt-4 pb-6 space-y-1.5 transition-all font-mono">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={`block px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors ${
                  isActive
                    ? 'bg-slate-200 text-slate-900 border border-slate-300 font-bold dark:bg-white/10 dark:text-cyan-300 dark:border-cyan-500/40'
                    : 'font-medium text-slate-700 hover:bg-slate-100/80 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                }`}
              >
                {isActive ? `> ${link.name}` : link.name}
              </a>
            );
          })}
          <div className="pt-3 border-t border-slate-200/90 dark:border-white/10">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block text-center py-2.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-white dark:text-dark-950 dark:from-cyan-400 dark:to-blue-400 shadow-sm"
            >
              [ Let's Talk → ]
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
