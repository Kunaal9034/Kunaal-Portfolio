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
    <section id="achievements" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-cyber-emerald bg-cyber-emerald/10 border border-cyber-emerald/20">
            <Trophy className="w-3.5 h-3.5" />
            Verified Milestones
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Key Achievements
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
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
                    ? 'glass-card border-2 border-cyber-emerald/50 bg-gradient-to-b from-dark-850 to-emerald-950/20 shadow-xl shadow-emerald-500/10'
                    : 'glass-card border border-white/5 hover:border-white/20'
                }`}
              >
                {isFeatured && (
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyber-emerald text-dark-950">
                    Prominent
                  </div>
                )}

                <div className="space-y-4">
                  {/* Icon & Subtitle */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyber-emerald group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyber-cyan">
                      {item.subtitle}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white mt-1 group-hover:text-cyber-emerald transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Highlight Stat */}
                  <div className="p-4 rounded-xl bg-dark-950/70 border border-white/5 space-y-0.5">
                    <div className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                      {item.metric}
                    </div>
                    <div className="text-xs text-slate-400">
                      {item.metricSubtext}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer confirmation */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyber-emerald">
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
