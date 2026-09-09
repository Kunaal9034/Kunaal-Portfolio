import React from 'react';
import { activitiesData } from '../data/activities';
import { Terminal, Users, BookOpen, Sparkles } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Activities() {
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.1 });
  const [dsaRef, dsaRevealed] = useScrollReveal({ threshold: 0.1 });
  const [activitiesGridRef, activitiesGridRevealed] = useScrollReveal({ threshold: 0.1 });

  const activityIcons = {
    'dsa-milestone': Terminal,
    'backend-leadership': Users,
    'ai-learning': BookOpen
  };

  return (
    <section id="activities" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 bg-slate-50/60 dark:bg-dark-950/60 light-tint-activities transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className={`text-center max-w-2xl mx-auto mb-16 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-cyan-800 dark:text-cyber-cyan bg-cyan-50/90 dark:bg-cyber-cyan/10 border border-cyan-200 dark:border-cyber-cyan/20 transition-colors shadow-sm shadow-cyan-500/5">
            <Users className="w-3.5 h-3.5 text-cyan-600 dark:text-cyber-cyan" />
            <span>Leadership & Development</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Activities & Leadership
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Collaborative technical leadership, self-directed upskilling, and algorithmic milestones.
          </p>
        </div>

        {/* Prominent DSA Milestone Banner / Card */}
        {activitiesData.filter(a => a.highlight).map((dsa) => (
          <div
            ref={dsaRef}
            key={dsa.id}
            className={`mb-10 rounded-2xl relative overflow-hidden p-8 sm:p-10 border-2 border-indigo-200/90 dark:border-indigo-500/30 bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/40 dark:from-dark-900 dark:via-dark-850 dark:to-indigo-950/30 shadow-xl shadow-indigo-500/10 dark:shadow-2xl dark:shadow-indigo-500/10 transition-colors reveal-init ${dsaRevealed ? 'revealed' : ''}`}
          >
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 text-indigo-800 dark:text-indigo-300 text-xs font-mono font-semibold transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
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
                      className="px-3 py-1 rounded-md text-xs font-mono bg-white/90 dark:bg-dark-950 border border-indigo-200/90 dark:border-indigo-800/30 text-indigo-800 dark:text-indigo-300 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Big Stat Callout */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-white/95 dark:bg-dark-950/80 border border-indigo-200/90 dark:border-indigo-800/30 text-center shadow-md shadow-indigo-500/5 dark:shadow-none transition-all group hover:border-indigo-400/60 hover:shadow-xl hover:shadow-indigo-500/10">
                <div className="text-5xl sm:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400">
                  <AnimatedCounter value={dsa.metric} />
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-white mt-2 transition-colors">
                  DSA Problems Solved
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono transition-colors">
                  Across multiple coding platforms
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Secondary Activities Grid */}
        <div ref={activitiesGridRef} className={`grid grid-cols-1 md:grid-cols-2 gap-8 reveal-init ${activitiesGridRevealed ? 'revealed' : ''}`}>
          {activitiesData.filter(a => !a.highlight).map((act) => {
            const Icon = activityIcons[act.id] || Users;
            const isLeadership = act.id === 'backend-leadership';
            return (
              <div
                key={act.id}
                className={`glass-card rounded-2xl p-7 border flex flex-col justify-between space-y-5 group transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                  isLeadership
                    ? 'border-blue-200/80 dark:border-white/5 bg-gradient-to-br from-white/95 via-blue-50/20 to-indigo-50/25 dark:bg-dark-900/60 hover:border-blue-500/50 hover:shadow-blue-500/10'
                    : 'border-purple-200/80 dark:border-white/5 bg-gradient-to-br from-white/95 via-purple-50/20 to-violet-50/25 dark:bg-dark-900/60 hover:border-purple-500/50 hover:shadow-purple-500/10'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-colors ${
                      isLeadership
                        ? 'bg-blue-50 dark:bg-white/5 border-blue-200/80 dark:border-white/10 text-blue-600 dark:text-cyber-cyan group-hover:border-blue-500/40'
                        : 'bg-purple-50 dark:bg-white/5 border-purple-200/80 dark:border-white/10 text-purple-600 dark:text-cyber-cyan group-hover:border-purple-500/40'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-mono px-3 py-1 rounded-full border transition-colors ${
                      isLeadership
                        ? 'bg-blue-50/80 dark:bg-dark-900 border-blue-200/70 dark:border-white/5 text-blue-800 dark:text-slate-300'
                        : 'bg-purple-50/80 dark:bg-dark-900 border-purple-200/70 dark:border-white/5 text-purple-800 dark:text-slate-300'
                    }`}>
                      {act.category}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-xl font-display font-bold text-slate-900 dark:text-white transition-colors ${
                      isLeadership ? 'group-hover:text-blue-700 dark:group-hover:text-cyber-cyan' : 'group-hover:text-purple-700 dark:group-hover:text-cyber-cyan'
                    }`}>
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
                        className={`px-2.5 py-0.5 rounded text-[11px] font-mono border transition-colors ${
                          isLeadership
                            ? 'bg-blue-50/60 dark:bg-dark-900 border-blue-200/60 dark:border-white/5 text-blue-800 dark:text-slate-400'
                            : 'bg-purple-50/60 dark:bg-dark-900 border-purple-200/60 dark:border-white/5 text-purple-800 dark:text-slate-400'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 transition-colors">
                  <span>Impact Metric:</span>
                  <span className={`font-bold ${
                    isLeadership ? 'text-blue-700 dark:text-cyber-cyan' : 'text-purple-700 dark:text-cyber-cyan'
                  }`}>
                    <AnimatedCounter value={act.metric} /> {act.metricLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
