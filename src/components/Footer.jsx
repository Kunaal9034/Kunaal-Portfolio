import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { personalData } from '../data/personal';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, CodolioIcon } from './BrandIcons';

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
    <footer className="relative z-10 border-t border-slate-200 dark:border-white/10 bg-slate-100/90 dark:bg-dark-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 font-display font-bold text-slate-900 dark:text-white text-lg transition-colors">
              <span className="w-2 h-2 rounded-full bg-cyber-emerald" />
              <span>Kunaal</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">
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
                  className="w-9 h-9 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-emerald-500/40 text-slate-600 hover:text-slate-900 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-cyber-emerald/40 dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition-colors shadow-sm dark:shadow-none"
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
            <button
              type="button"
              onClick={scrollToTop}
              className="ml-2 w-9 h-9 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-600 hover:text-emerald-600 dark:bg-dark-900 dark:hover:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-cyber-emerald flex items-center justify-center transition-colors shadow-sm dark:shadow-none"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
