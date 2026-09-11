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
    <footer className="relative z-10 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/90 dark:bg-[#070c14] py-10 sm:py-12 transition-colors overflow-hidden font-mono">
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Subtle Terminal Session Exit Line */}
        <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-dark-950/80 border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs select-none">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <span className="text-emerald-600 dark:text-cyan-400 font-bold">$</span>
            <span>exit</span>
            <span className="text-slate-400 dark:text-slate-600">→</span>
            <span className="text-slate-600 dark:text-slate-400">Thanks for visiting Kunaal.ai</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SESSION_STATUS: COMPLETED</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
          {/* Copyright text */}
          <div className="text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2 font-display font-bold text-slate-900 dark:text-white text-base">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono">&gt;</span>
              <span>Kunaal.ai</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              © 2026 Kunaal. Built with passion for technology.
            </p>
          </div>

          {/* Social Platform Links & Back to top */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {personalData.socials.map((social) => {
              const Icon = socialIcons[social.icon] || Terminal;
              return social.url ? (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 border border-slate-200/90 hover:border-blue-400 text-slate-700 hover:text-blue-600 dark:bg-dark-900 dark:hover:bg-dark-800 dark:border-white/10 dark:hover:border-cyan-400/40 dark:text-slate-400 dark:hover:text-cyan-400 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xs"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ) : (
                <span
                  key={social.name}
                  title={social.name}
                  aria-label={`${social.name} profile placeholder`}
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-white/5 text-slate-400 dark:text-slate-600 flex items-center justify-center cursor-not-allowed"
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
              className="ml-2 px-3 py-2 rounded-xl font-mono text-xs font-semibold bg-white hover:bg-slate-100 border border-slate-200/90 hover:border-blue-400 text-slate-700 hover:text-blue-600 dark:bg-dark-900 dark:hover:bg-dark-800 dark:border-white/10 dark:hover:border-cyan-400/40 dark:text-slate-300 dark:hover:text-cyan-400 flex items-center gap-1.5 transition-all shadow-xs"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">[ TOP ]</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
