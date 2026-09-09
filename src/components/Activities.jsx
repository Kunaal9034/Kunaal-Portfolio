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
    <section id="activities" className="py-24 relative z-10 border-t border-white/5 bg-dark-950/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20">
            <Users className="w-3.5 h-3.5" />
            Leadership & Development
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Activities & Leadership
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Collaborative technical leadership, self-directed upskilling, and algorithmic milestones.
          </p>
        </div>

        {/* Prominent DSA Milestone Banner / Card */}
        {activitiesData.filter(a => a.highlight).map((dsa) => (
          <div
            key={dsa.id}
            className="mb-10 rounded-2xl relative overflow-hidden p-8 sm:p-10 border-2 border-cyber-emerald/40 bg-gradient-to-br from-dark-900 via-dark-850 to-emerald-950/30 shadow-2xl shadow-emerald-500/10"
          >
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-cyber-emerald/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-emerald/15 border border-cyber-emerald/30 text-cyber-emerald text-xs font-mono font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Key Algorithmic Milestone
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {dsa.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                  {dsa.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {dsa.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-dark-950 border border-cyber-emerald/30 text-cyber-emerald"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Big Stat Callout */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-dark-950/80 border border-cyber-emerald/30 text-center">
                <div className="text-5xl sm:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {dsa.metric}
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  Problems Solved
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
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
                className="glass-card rounded-2xl p-7 border border-white/5 hover:border-cyber-cyan/40 flex flex-col justify-between space-y-5 group transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyber-cyan group-hover:border-cyber-cyan/40 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-dark-900 border border-white/5 text-slate-300">
                      {act.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-cyber-cyan transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                      {act.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {act.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-dark-900 border border-white/5 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Impact Metric:</span>
                  <span className="text-cyber-cyan font-bold">{act.metric} {act.metricLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
