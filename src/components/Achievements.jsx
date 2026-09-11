import React from 'react';
import { achievementsData } from '../data/achievements';
import { Trophy, Code2, Users, BookOpen, CheckCircle, Sparkles, Terminal, Activity } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Achievements() {
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.1 });
  const [achievementsGridRef, achievementsGridRevealed] = useScrollReveal({ threshold: 0.1 });

  const featuredDSA = achievementsData.find(a => a.id === 'dsa-500');
  const otherAchievements = achievementsData.filter(a => a.id !== 'dsa-500');

  const achievementIcons = {
    Users: Users,
    BookOpen: BookOpen,
  };

  return (
    <section id="achievements" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 bg-slate-50/40 dark:bg-[#070c14] light-tint-projects transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className={`text-center max-w-2xl mx-auto mb-14 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono tracking-wider text-blue-700 dark:text-cyber-cyan bg-blue-50/90 dark:bg-dark-800/90 border border-blue-200/80 dark:border-cyber-cyan/30 shadow-xs transition-colors">
            <span className="text-cyan-600 dark:text-cyber-cyan font-bold">07</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">ACHIEVEMENTS</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-blue-600 dark:text-cyber-cyan">verified_milestones.manifest</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Engineering Milestones
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Quantified engineering outcomes and verified achievements documented directly in the resume.
          </p>
        </div>

        <div ref={achievementsGridRef} className={`space-y-6 reveal-init ${achievementsGridRevealed ? 'revealed' : ''}`}>
          
          {/* Prominent Featured Flagship: 500+ DSA Problems Solved */}
          {featuredDSA && (
            <div className="glass-card rounded-2xl overflow-hidden border-2 border-blue-400/40 dark:border-cyan-500/40 bg-white/95 dark:bg-[#0c121e]/95 shadow-xl shadow-cyan-500/10 transition-all font-mono">
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400" />
              
              {/* Window Header */}
              <div className="px-5 py-2.5 bg-slate-100/90 dark:bg-[#080d16] border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white ml-1">
                    dsa_benchmark.env
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-900 dark:bg-cyan-950/70 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-600/50 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                  <span>FLAGSHIP_BENCHMARK</span>
                </span>
              </div>

              {/* Main Content Body */}
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Big Metric Display */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="text-xs text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>ALGORITHMIC RIGOR</span>
                  </div>

                  <div className="text-5xl sm:text-6xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-white dark:via-cyan-200 dark:to-cyan-400">
                    <AnimatedCounter value="500+" />
                  </div>

                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Data Structure & Algorithm Problems Solved
                  </div>

                  <p className="font-sans text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {featuredDSA.description}
                  </p>
                </div>

                {/* Developer Console Code Box */}
                <div className="lg:col-span-7 p-4 sm:p-5 rounded-xl bg-slate-100/90 dark:bg-dark-950/90 border border-slate-200 dark:border-white/10 space-y-2 text-xs">
                  <div className="text-slate-500 pb-2 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                    <span>$ dsa --verify-profile</span>
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>VERIFIED</span>
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-700 dark:text-slate-300">
                    <div>&gt; target_metric: <strong className="text-slate-900 dark:text-white">500+ problems</strong></div>
                    <div>&gt; platforms: <span className="text-cyan-600 dark:text-cyan-400">LeetCode, Codolio & coding platforms</span></div>
                    <div>&gt; core_focus: <span className="text-slate-800 dark:text-slate-200">Data structures, algorithmic complexity, optimization</span></div>
                    <div>&gt; problem_domains: <span className="text-slate-800 dark:text-slate-200">Arrays, Strings, Trees, Dynamic Programming, Graphs</span></div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                      Persistent Practice
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                      Algorithmic Complexity
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                      Competitive Programming
                    </span>
                  </div>
                </div>

              </div>

              {/* Status Footer */}
              <div className="px-6 py-2.5 bg-slate-50 dark:bg-[#080d16] border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500">
                <span>record_id: milestone_dsa-500</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">status: active_practice</span>
              </div>
            </div>
          )}

          {/* Secondary Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {otherAchievements.map((item) => {
              const Icon = achievementIcons[item.icon] || Trophy;

              return (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl flex flex-col justify-between overflow-hidden border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 hover:border-cyan-500/40 shadow-lg transition-all duration-300 font-mono"
                >
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

                  {/* Header */}
                  <div className="px-5 py-2.5 bg-slate-100/80 dark:bg-[#080d16] border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-500/80 inline-block" />
                      <span className="text-xs text-slate-600 dark:text-slate-400 ml-1">
                        milestone_{item.id}.log
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      [ RECORD ]
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl border border-blue-200/80 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-cyan-400 font-mono">
                        <AnimatedCounter value={item.metric} />
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold uppercase">
                        // {item.subtitle}
                      </div>
                      <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mt-0.5">
                        {item.title}
                      </h3>
                    </div>

                    <p className="font-sans text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="px-6 py-2.5 bg-slate-50/70 dark:bg-dark-950/60 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle className="w-3 h-3" />
                      <span>verified_outcome</span>
                    </span>
                    <span>{item.metricSubtext}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
