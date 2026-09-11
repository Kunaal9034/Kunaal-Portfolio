import React from 'react';
import profileImg from '../assets/profile.png';
import profileWebp from '../assets/profile.webp';

/**
 * ProfilePhoto
 * 
 * Premium developer-console styled profile presentation for Kunaal.
 * - Displays the authentic, natural portrait photo without modification
 * - Developer-console window chrome matching the terminal aesthetics
 * - Subtle blue/cyan/indigo borders and corner accents
 * - Fully responsive and centered above the terminal
 * - High performance: WebP with PNG fallback, explicit aspect ratio, fetchPriority="high"
 */
export default function ProfilePhoto() {
  return (
    <div className="w-64 sm:w-72 md:w-80 max-w-full rounded-2xl overflow-hidden border border-slate-300/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/95 shadow-xl shadow-slate-200/60 dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/40 dark:hover:border-cyan-500/30 group">
      {/* Top Gradient Accent Bar */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

      {/* Developer Window Header Chrome */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-100/90 dark:bg-dark-950/80 border-b border-slate-200 dark:border-white/5 select-none transition-colors">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 border border-rose-600/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 border border-amber-600/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
          <span className="ml-1.5 text-[11px] font-mono text-slate-700 dark:text-slate-300 font-semibold tracking-wide">
            kunaal.png
          </span>
        </div>
        <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-semibold tracking-wider uppercase">
          KUNAAL // DEVELOPER
        </span>
      </div>

      {/* Image Container with Technical Corner Accents */}
      <div className="relative overflow-hidden bg-slate-100 dark:bg-dark-900 aspect-[719/633]">
        <picture className="block w-full h-full">
          <source srcSet={profileWebp} type="image/webp" />
          <img
            src={profileImg}
            alt="Kunaal - Computer Science Engineer & AI/ML Developer"
            width={719}
            height={633}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center block transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </picture>

        {/* Technical Corner Accents */}
        <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-500/80 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-500/80 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-500/80 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-500/80 pointer-events-none" aria-hidden="true" />
      </div>

      {/* Footer Status Telemetry Bar */}
      <div className="px-3.5 py-1.5 bg-slate-50 dark:bg-[#080d16] border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 select-none">
        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>STATUS: ACTIVE</span>
        </span>
        <span className="text-slate-500 dark:text-slate-400">
          AI/ML · BACKEND
        </span>
      </div>
    </div>
  );
}
