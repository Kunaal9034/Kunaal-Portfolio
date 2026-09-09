import React from 'react';
import { educationData } from '../data/education';
import { GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Education() {
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.1 });
  const [timelineRef, timelineRevealed] = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="education" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-dark-950/40 light-tint-edu transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className={`text-center max-w-2xl mx-auto mb-16 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-indigo-700 dark:text-cyber-indigo bg-indigo-50/90 dark:bg-cyber-indigo/10 border border-indigo-200 dark:border-cyber-indigo/20 transition-colors shadow-sm shadow-indigo-500/5">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-cyber-indigo" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Education Timeline
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Verified academic milestones and formal engineering coursework credentials.
          </p>
        </div>

        {/* Timeline Layout */}
        <div ref={timelineRef} className={`space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 sm:before:-translate-x-1/2 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-indigo-500 before:to-violet-500 reveal-init ${timelineRevealed ? 'revealed' : ''}`}>
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
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-50 dark:bg-dark-950 border-2 border-blue-500 group-hover:border-indigo-500 flex items-center justify-center transition-colors z-10 shadow-md shadow-blue-500/20">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:bg-indigo-400 transition-colors" />
                </div>

                {/* Card Container */}
                <div className={`ml-12 sm:ml-0 sm:w-1/2 ${isEven ? 'sm:pl-10' : 'sm:pr-10'}`}>
                  <div className="glass-card rounded-2xl p-6 sm:p-7 border border-indigo-100/90 dark:border-white/5 bg-gradient-to-br from-white/95 via-indigo-50/20 to-blue-50/20 dark:bg-dark-900/60 hover:border-indigo-400/50 dark:hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200 space-y-4">
                    
                    {/* Period & Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-xs font-mono text-indigo-700 dark:text-indigo-300 font-medium transition-colors">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        {item.period}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        item.status === 'Pursuing'
                          ? 'bg-emerald-100/80 dark:bg-cyber-emerald/15 text-emerald-800 dark:text-cyber-emerald border border-emerald-300 dark:border-cyber-emerald/30'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Institution & Degree */}
                    <div>
                      <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                        {item.institution}
                      </h3>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1 transition-colors">
                        {item.degree}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                        {item.location}
                      </p>
                    </div>

                    {/* Score / Grade Highlight */}
                    <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-dark-900/90 border border-indigo-200/80 dark:border-white/5 flex items-center justify-between transition-colors">
                      <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                        {item.scoreType === 'CGPA' ? 'Cumulative GPA' : 'Overall Board Score'}
                      </span>
                      <span className="text-sm font-bold font-mono text-indigo-700 dark:text-indigo-300">
                        {item.score}
                      </span>
                    </div>

                    {/* Curriculum Details */}
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-400 transition-colors">
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

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
