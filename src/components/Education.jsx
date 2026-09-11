import React from 'react';
import { educationData } from '../data/education';
import { GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Education() {
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.1 });
  const [timelineRef, timelineRevealed] = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="education" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-[#070c14] light-tint-edu transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className={`text-center max-w-2xl mx-auto mb-16 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono tracking-wider text-blue-700 dark:text-cyber-cyan bg-blue-50/90 dark:bg-dark-800/90 border border-blue-200/80 dark:border-cyber-cyan/30 shadow-xs transition-colors">
            <span className="text-cyan-600 dark:text-cyber-cyan font-bold">04</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">EDUCATION</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-blue-600 dark:text-cyber-cyan">academic_log.sys</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Education Timeline
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Verified academic milestones and formal engineering coursework credentials.
          </p>
        </div>

        {/* Timeline Layout */}
        <div ref={timelineRef} className={`space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 sm:before:-translate-x-1/2 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-indigo-500 before:to-cyan-400 reveal-init ${timelineRevealed ? 'revealed' : ''}`}>
          {educationData.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 group`}
              >
                {/* Center Node Indicator */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-xl bg-white dark:bg-[#0c121e] border-2 border-blue-500 group-hover:border-cyan-400 flex items-center justify-center transition-colors z-10 shadow-md shadow-blue-500/20">
                  <div className="w-2.5 h-2.5 rounded-sm bg-blue-500 group-hover:bg-cyan-400 transition-colors" />
                </div>

                {/* Card Container */}
                <div className={`ml-12 sm:ml-0 sm:w-1/2 ${isEven ? 'sm:pl-10' : 'sm:pr-10'}`}>
                  <div className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 hover:border-blue-400 dark:hover:border-cyan-400/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200">
                    
                    {/* Top Accent Line */}
                    <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

                    {/* Window Header */}
                    <div className="px-5 py-2.5 bg-slate-100/80 dark:bg-[#080d16] border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold transition-colors">
                        <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        {item.period}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider ${
                        item.status === 'Pursuing'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300/80 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/40'
                          : 'bg-slate-100 dark:bg-dark-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                      }`}>
                        [ {item.status.toUpperCase()} ]
                      </span>
                    </div>

                    <div className="p-6 sm:p-7 space-y-4">
                      {/* Institution & Degree */}
                      <div className="space-y-1">
                        <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                          {item.institution}
                        </h3>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors font-sans">
                          {item.degree}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1 font-mono">
                          <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                          {item.location}
                        </p>
                      </div>

                      {/* Score / Grade Highlight */}
                      <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-dark-950/80 border border-slate-200/80 dark:border-white/5 flex items-center justify-between transition-colors font-mono">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          &gt; {item.scoreType === 'CGPA' ? 'cumulative_gpa' : 'board_score'}:
                        </span>
                        <span className="text-base font-bold text-blue-600 dark:text-cyan-400">
                          {item.score}
                        </span>
                      </div>

                      {/* Curriculum Details */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">
                          // COURSEWORK_RECORDS:
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 transition-colors font-sans">
                          {item.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
