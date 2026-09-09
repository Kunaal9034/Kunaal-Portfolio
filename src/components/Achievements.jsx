import React from 'react';
import { achievementsData } from '../data/achievements';
import { Trophy, Code2, Users, BookOpen, CheckCircle } from 'lucide-react';

export default function Achievements() {
  const achievementIcons = {
    Award: Code2,
    Users: Users,
    BookOpen: BookOpen,
  };

  return (
    <section id="achievements" className="py-24 relative z-10 border-t border-slate-200/80 dark:border-white/5 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-cyber-emerald bg-emerald-50 dark:bg-cyber-emerald/10 border border-emerald-300 dark:border-cyber-emerald/20 transition-colors">
            <Trophy className="w-3.5 h-3.5" />
            Verified Milestones
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Key Achievements
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base transition-colors">
            Quantified engineering outcomes and verified achievements documented in the resume.
          </p>
        </div>

        {/* Distinctive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
          {achievementsData.map((item) => {
            const Icon = achievementIcons[item.icon] || Trophy;
            const isFeatured = item.featured;

            return (
              <div
                key={item.id}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                  isFeatured
                    ? 'glass-card border-2 border-emerald-500/40 dark:border-cyber-emerald/50 bg-gradient-to-b from-white to-emerald-50/50 dark:from-dark-850 dark:to-emerald-950/20 shadow-xl shadow-emerald-500/10'
                    : 'glass-card border border-slate-200/80 dark:border-white/5 hover:border-emerald-500/30 dark:hover:border-white/20'
                }`}
              >
                {isFeatured && (
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyber-emerald text-dark-950">
                    Prominent
                  </div>
                )}

                <div className="space-y-4">
                  {/* Icon & Subtitle */}
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-emerald-600 dark:text-cyber-emerald group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-700 dark:text-cyber-cyan transition-colors">
                      {item.subtitle}
                    </span>
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mt-1 group-hover:text-emerald-600 dark:group-hover:text-cyber-emerald transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Highlight Stat */}
                  <div className="p-4 rounded-xl bg-slate-100/90 dark:bg-dark-950/70 border border-slate-200 dark:border-white/5 space-y-0.5 transition-colors">
                    <div className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400">
                      {item.metric}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 transition-colors">
                      {item.metricSubtext}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Footer confirmation */}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 transition-colors">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-cyber-emerald font-medium">
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
