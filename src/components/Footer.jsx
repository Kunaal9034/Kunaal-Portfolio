import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { personalData } from '../data/personal';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, CodolioIcon } from './BrandIcons';
import MagneticButton from './MagneticButton';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialIcons = {
    Github: GithubIcon,
    Linkedin: LinkedinIcon,
    Code2: LeetCodeIcon,
    Terminal: CodolioIcon,
  };

  return (
    <footer className="relative z-10 border-t border-slate-200/80 dark:border-white/10 bg-gradient-to-b from-slate-50/90 via-slate-100/70 to-slate-200/40 dark:from-dark-950 dark:to-dark-950 py-14 sm:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 font-display font-bold text-slate-900 dark:text-white text-lg transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-cyber-emerald shadow-sm shadow-emerald-500/50" />
              <span>Kunaal</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 transition-colors">
              © 2026 Kunaal. Built with passion for technology.
            </p>
          </div>

          {/* Social Platform Links / Placeholders */}
          <div className="flex items-center gap-3">
            {personalData.socials.map((social) => {
              const Icon = socialIcons[social.icon] || Terminal;
              return social.url ? (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-xl bg-white/90 hover:bg-slate-100 border border-slate-200/90 hover:border-slate-300 text-slate-700 hover:text-blue-600 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-white/20 dark:text-slate-400 dark:hover:text-cyan-400 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm dark:shadow-none"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ) : (
                <span
                  key={social.name}
                  title={social.name}
                  aria-label={`${social.name} profile placeholder`}
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5 text-slate-400 dark:text-slate-600 flex items-center justify-center cursor-not-allowed"
                >
                  <Icon className="w-4 h-4" />
                </span>
              );
            })}

            {/* Back to top button */}
            <MagneticButton
              as="button"
              type="button"
              onClick={scrollToTop}
              className="ml-2 w-9 h-9 rounded-xl bg-white/90 hover:bg-slate-100 border border-slate-200/90 hover:border-slate-300 text-slate-700 hover:text-blue-600 dark:bg-dark-900 dark:hover:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-cyan-400 flex items-center justify-center transition-all shadow-sm dark:shadow-none"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </MagneticButton>
          </div>

        </div>
      </div>
    </footer>
  );
}
