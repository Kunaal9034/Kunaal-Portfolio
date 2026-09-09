import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
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
      scrolled ? 'glass-nav py-3.5 sm:py-4 shadow-sm dark:shadow-black/40' : 'glass-nav-top py-4.5 sm:py-5'
    }`}>
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        
        {/* Brand */}
        <a 
          href="#home" 
          className="group flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-cyber-emerald transition-colors shrink-0 mr-6 xl:mr-10"
          aria-label="Kunaal Portfolio Home"
        >
          <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center justify-center text-emerald-600 dark:text-cyber-emerald group-hover:border-emerald-500/40 dark:group-hover:border-cyber-emerald/40 transition-colors">
            <Terminal className="w-4 h-4" />
          </span>
          <span>
            Kunaal<span className="text-emerald-600 dark:text-cyber-emerald">.ai</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center justify-center gap-5 xl:gap-6 2xl:gap-8 mx-2 flex-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-4 py-2 text-[15px] 2xl:text-[16px] rounded-full whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? 'font-semibold text-slate-900 bg-slate-100/90 border border-slate-200/90 shadow-xs dark:text-white dark:bg-white/10 dark:border-white/15'
                    : 'font-medium text-slate-600 hover:text-slate-950 hover:bg-slate-100/70 border border-transparent dark:text-slate-300/85 dark:hover:text-white dark:hover:bg-white/[0.07]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-emerald-500 dark:bg-cyber-emerald rounded-full transition-all"></span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button, Theme Toggle & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-6 xl:ml-10">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Contact CTA */}
          <MagneticButton
            as="a"
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-4.5 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm
              bg-slate-900 hover:bg-slate-800 text-white border border-slate-800
              dark:bg-white/10 dark:hover:bg-white/15 dark:text-white dark:border-white/15 dark:shadow-none"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400 dark:text-cyber-emerald" />
          </MagneticButton>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2.5 rounded-xl text-slate-700 hover:text-slate-950 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/90 dark:text-slate-300 dark:hover:text-white dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="xl:hidden glass-nav border-b border-slate-200/90 dark:border-white/10 px-5 pt-4 pb-6 space-y-1.5 transition-all">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={`block px-4 py-3 rounded-xl text-[15px] transition-colors ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 border border-slate-200 font-semibold dark:bg-white/10 dark:text-white dark:border-white/15'
                    : 'font-medium text-slate-700 hover:bg-slate-100/80 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <div className="pt-3 border-t border-slate-200/90 dark:border-white/10">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block text-center py-3 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-cyber-emerald dark:text-dark-950 dark:hover:bg-cyber-emerald/90 transition-colors shadow-sm"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
