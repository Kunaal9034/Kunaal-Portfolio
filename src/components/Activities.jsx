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
    <section id="activities" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 bg-slate-50/60 dark:bg-[#070c14] light-tint-activities transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className={`text-center max-w-2xl mx-auto mb-16 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono tracking-wider text-blue-700 dark:text-cyber-cyan bg-blue-50/90 dark:bg-dark-800/90 border border-blue-200/80 dark:border-cyber-cyan/30 shadow-xs transition-colors">
            <span className="text-cyan-600 dark:text-cyber-cyan font-bold">06</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">ACTIVITIES</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-blue-600 dark:text-cyber-cyan">engineering_log.sys</span>
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
            className={`mb-10 rounded-2xl relative overflow-hidden border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 shadow-xl shadow-blue-500/5 hover:border-blue-400 dark:hover:border-cyan-400/40 transition-colors reveal-init ${dsaRevealed ? 'revealed' : ''}`}
          >
            {/* Top Accent Line */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

            {/* Window Header */}
            <div className="px-5 py-2.5 bg-slate-100/80 dark:bg-[#080d16] border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="font-mono text-xs text-slate-800 dark:text-slate-200 font-bold ml-1">
                  &gt; DSA_PROGRESS
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-50 text-blue-800 border border-blue-200/80 dark:bg-dark-900 dark:text-cyan-300 dark:border-cyan-800/40">
                [ ALGORITHMIC MILESTONE ]
              </span>
            </div>
            
            <div className="p-7 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/40 text-blue-700 dark:text-cyan-300 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>// VERIFIED_PROBLEM_SOLVING</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white transition-colors">
                  {dsa.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl transition-colors font-sans">
                  {dsa.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {dsa.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100/90 dark:bg-dark-900 border border-slate-200/90 dark:border-white/10 text-slate-800 dark:text-slate-300 transition-colors"
                    >
                      [ {tag} ]
                    </span>
                  ))}
                </div>
              </div>

              {/* Big Stat Callout */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-slate-50/80 dark:bg-dark-950/80 border border-slate-200/80 dark:border-white/5 text-center transition-all group hover:border-blue-400 dark:hover:border-cyan-400/40">
                <div className="text-5xl sm:text-6xl font-mono font-bold text-blue-600 dark:text-cyan-400">
                  <AnimatedCounter value={dsa.metric} />
                </div>
                <div className="text-sm font-mono font-bold text-slate-900 dark:text-white mt-2 transition-colors uppercase">
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
            const logName = act.id === 'backend-leadership' ? '> TEAM_PROJECTS' : '> AI_LEARNING';
            return (
              <div
                key={act.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 hover:border-blue-400 dark:hover:border-cyan-400/40 shadow-lg shadow-blue-500/5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 group"
              >
                {/* Top Accent Line */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

                {/* Window Header */}
                <div className="px-5 py-2.5 bg-slate-100/80 dark:bg-[#080d16] border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyber-cyan" />
                    <span className="font-mono text-xs text-slate-800 dark:text-slate-200 font-bold">
                      {logName}
                    </span>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-white dark:bg-dark-950 border border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-300">
                    {act.category}
                  </span>
                </div>

                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl border border-blue-200/80 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400 flex items-center justify-center transition-colors shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                      {act.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors font-sans">
                    {act.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {act.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-100/90 dark:bg-dark-900 border border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-300"
                      >
                        [ {tag} ]
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-3.5 bg-slate-50/70 dark:bg-dark-950/60 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 transition-colors">
                  <span>&gt; impact_metric:</span>
                  <span className="font-bold text-blue-600 dark:text-cyan-400">
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
