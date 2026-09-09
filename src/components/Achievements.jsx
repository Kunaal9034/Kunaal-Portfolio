import React from 'react';
import { achievementsData } from '../data/achievements';
import { Trophy, Code2, Users, BookOpen, CheckCircle } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Achievements() {
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.1 });
  const [achievementsGridRef, achievementsGridRevealed] = useScrollReveal({ threshold: 0.1 });

  const achievementIcons = {
    Award: Code2,
    Users: Users,
    BookOpen: BookOpen,
  };

  return (
    <section id="achievements" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 bg-slate-50/40 dark:bg-dark-950/40 light-tint-projects transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className={`text-center max-w-2xl mx-auto mb-16 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-violet-700 dark:text-cyber-violet bg-violet-50/90 dark:bg-cyber-violet/10 border border-violet-200 dark:border-cyber-violet/20 transition-colors shadow-sm shadow-violet-500/5">
            <Trophy className="w-3.5 h-3.5 text-violet-600 dark:text-cyber-violet" />
            <span>Verified Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Key Achievements
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Quantified engineering outcomes and verified achievements documented in the resume.
          </p>
        </div>

        {/* Distinctive Cards Grid */}
        <div ref={achievementsGridRef} className={`grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch reveal-init ${achievementsGridRevealed ? 'revealed' : ''}`}>
          {achievementsData.map((item) => {
            const Icon = achievementIcons[item.icon] || Trophy;
            const isFeatured = item.featured;
            const isCyan = item.id === 'backend-team-lead';
            const isIndigo = item.id === 'ai-coursework';

            return (
              <div
                key={item.id}
                className={`rounded-2xl p-7 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden ${
                  isFeatured
                    ? 'glass-card border-2 border-indigo-200/90 dark:border-indigo-500/40 bg-gradient-to-br from-white/95 via-indigo-50/30 to-blue-50/35 dark:from-dark-850 dark:to-indigo-950/20 shadow-xl shadow-indigo-500/10 hover:shadow-2xl hover:shadow-indigo-500/15'
                    : isCyan
                    ? 'glass-card border border-cyan-200/80 dark:border-white/5 bg-gradient-to-br from-white/95 via-cyan-50/20 to-blue-50/25 dark:bg-dark-900/60 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10'
                    : 'glass-card border border-indigo-200/80 dark:border-white/5 bg-gradient-to-br from-white/95 via-violet-50/20 to-indigo-50/25 dark:bg-dark-900/60 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10'
                }`}
              >
                {isFeatured && (
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white shadow-sm shadow-indigo-500/20">
                    Prominent
                  </div>
                )}

                <div className="space-y-4">
                  {/* Icon & Subtitle */}
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform ${
                    isFeatured
                      ? 'bg-indigo-50 dark:bg-white/5 border-indigo-200/80 dark:border-white/10 text-indigo-600 dark:text-cyan-400'
                      : isCyan
                      ? 'bg-cyan-50 dark:bg-white/5 border-cyan-200/80 dark:border-white/10 text-cyan-600 dark:text-cyan-400'
                      : 'bg-indigo-50 dark:bg-white/5 border-indigo-200/80 dark:border-white/10 text-indigo-600 dark:text-indigo-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <span className={`text-[11px] font-mono uppercase tracking-wider transition-colors ${
                      isFeatured ? 'text-indigo-800 dark:text-cyan-300' : isCyan ? 'text-cyan-800 dark:text-cyan-300' : 'text-indigo-800 dark:text-indigo-300'
                    }`}>
                      {item.subtitle}
                    </span>
                    <h3 className={`text-xl font-display font-bold text-slate-900 dark:text-white mt-1 transition-colors ${
                      isFeatured
                        ? 'group-hover:text-indigo-700 dark:group-hover:text-cyan-300'
                        : isCyan
                        ? 'group-hover:text-cyan-700 dark:group-hover:text-cyan-300'
                        : 'group-hover:text-indigo-700 dark:group-hover:text-indigo-300'
                    }`}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Highlight Stat */}
                  <div className={`p-4 rounded-xl border space-y-0.5 transition-colors ${
                    isFeatured
                      ? 'bg-indigo-50/70 dark:bg-dark-950/70 border-indigo-200/80 dark:border-white/5 group-hover:border-indigo-500/40'
                      : isCyan
                      ? 'bg-cyan-50/70 dark:bg-dark-950/70 border-cyan-200/80 dark:border-white/5 group-hover:border-cyan-500/40'
                      : 'bg-indigo-50/70 dark:bg-dark-950/70 border-indigo-200/80 dark:border-white/5 group-hover:border-indigo-500/40'
                  }`}>
                    <div className={`text-3xl font-display font-black text-transparent bg-clip-text ${
                      isFeatured
                        ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400'
                        : isCyan
                        ? 'bg-gradient-to-r from-cyan-700 to-blue-600 dark:from-cyan-400 dark:to-blue-400'
                        : 'bg-gradient-to-r from-indigo-700 to-violet-600 dark:from-indigo-400 dark:to-violet-400'
                    }`}>
                      <AnimatedCounter value={item.metric} />
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 transition-colors font-medium">
                      {item.metricSubtext}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Footer confirmation */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 transition-colors">
                  <span className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Resume Supported
                  </span>
                  <span>Documented</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
