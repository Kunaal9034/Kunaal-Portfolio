import React from 'react';
import { educationData } from '../data/education';
import { GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-24 relative z-10 border-t border-white/5 bg-dark-950/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-cyber-indigo bg-cyber-indigo/10 border border-cyber-indigo/20">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Education Timeline
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Verified academic milestones and formal engineering coursework credentials.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 sm:before:-translate-x-1/2 before:w-0.5 before:bg-gradient-to-b before:from-cyber-emerald before:via-cyber-cyan before:to-cyber-indigo">
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
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-dark-950 border-2 border-cyber-emerald group-hover:border-cyber-cyan flex items-center justify-center transition-colors z-10 shadow-lg shadow-emerald-500/20">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyber-emerald group-hover:scale-125 transition-transform" />
                </div>

                {/* Card Container */}
                <div className={`ml-12 sm:ml-0 sm:w-1/2 ${isEven ? 'sm:pl-10' : 'sm:pr-10'}`}>
                  <div className="glass-card rounded-2xl p-6 sm:p-7 border border-white/5 hover:border-cyber-emerald/40 space-y-4">
                    
                    {/* Period & Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-xs font-mono text-cyber-cyan font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.period}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        item.status === 'Pursuing'
                          ? 'bg-cyber-emerald/15 text-cyber-emerald border border-cyber-emerald/30'
                          : 'bg-white/5 text-slate-300 border border-white/10'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Institution & Degree */}
                    <div>
                      <h3 className="text-xl font-display font-bold text-white group-hover:text-cyber-emerald transition-colors">
                        {item.institution}
                      </h3>
                      <p className="text-sm font-medium text-slate-300 mt-1">
                        {item.degree}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </p>
                    </div>

                    {/* Score / Grade Highlight */}
                    <div className="p-3 rounded-xl bg-dark-900/90 border border-white/5 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">
                        {item.scoreType === 'CGPA' ? 'Cumulative GPA' : 'Overall Board Score'}
                      </span>
                      <span className="text-sm font-bold font-mono text-cyber-emerald">
                        {item.score}
                      </span>
                    </div>

                    {/* Curriculum Details */}
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan shrink-0 mt-0.5" />
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
