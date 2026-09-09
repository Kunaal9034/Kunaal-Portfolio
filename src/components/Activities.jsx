import React from 'react';
import { activitiesData } from '../data/activities';
import { Terminal, Users, BookOpen, Sparkles } from 'lucide-react';

export default function Activities() {
  const activityIcons = {
    'dsa-milestone': Terminal,
    'backend-leadership': Users,
    'ai-learning': BookOpen
  };

  return (
    <section id="activities" className="py-24 relative z-10 border-t border-slate-200/80 dark:border-white/5 bg-slate-100/40 dark:bg-dark-950/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-cyan-700 dark:text-cyber-cyan bg-cyan-50 dark:bg-cyber-cyan/10 border border-cyan-300 dark:border-cyber-cyan/20 transition-colors">
            <Users className="w-3.5 h-3.5" />
            Leadership & Development
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Activities & Leadership
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base transition-colors">
            Collaborative technical leadership, self-directed upskilling, and algorithmic milestones.
          </p>
        </div>

        {/* Prominent DSA Milestone Banner / Card */}
        {activitiesData.filter(a => a.highlight).map((dsa) => (
          <div
            key={dsa.id}
            className="mb-10 rounded-2xl relative overflow-hidden p-8 sm:p-10 border-2 border-emerald-500/40 dark:border-cyber-emerald/40 bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/70 dark:from-dark-900 dark:via-dark-850 dark:to-emerald-950/30 shadow-xl shadow-emerald-500/10 dark:shadow-2xl dark:shadow-emerald-500/10 transition-colors"
          >
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-cyber-emerald/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-cyber-emerald/15 border border-emerald-300/80 dark:border-cyber-emerald/30 text-emerald-700 dark:text-cyber-emerald text-xs font-mono font-semibold transition-colors">
                  <Sparkles className="w-3.5 h-3.5" />
                  Key Algorithmic Milestone
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white transition-colors">
                  {dsa.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl transition-colors">
                  {dsa.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {dsa.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-white dark:bg-dark-950 border border-emerald-400/40 dark:border-cyber-emerald/30 text-emerald-700 dark:text-cyber-emerald transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Big Stat Callout */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/95 dark:bg-dark-950/80 border border-emerald-400/40 dark:border-cyber-emerald/30 text-center shadow-sm dark:shadow-none transition-colors">
                <div className="text-5xl sm:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400">
                  {dsa.metric}
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1 transition-colors">
                  Problems Solved
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 transition-colors">
                  Across multiple coding platforms
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Secondary Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activitiesData.filter(a => !a.highlight).map((act) => {
            const Icon = activityIcons[act.id] || Users;
            return (
              <div
                key={act.id}
                className="glass-card rounded-2xl p-7 border border-slate-200/80 dark:border-white/5 hover:border-cyan-500/40 dark:hover:border-cyber-cyan/40 flex flex-col justify-between space-y-5 group transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-cyan-600 dark:text-cyber-cyan group-hover:border-cyan-500/40 dark:group-hover:border-cyber-cyan/40 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 transition-colors">
                      {act.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyber-cyan transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed transition-colors">
                      {act.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {act.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 transition-colors">
                  <span>Impact Metric:</span>
                  <span className="text-cyan-700 dark:text-cyber-cyan font-bold">{act.metric} {act.metricLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
