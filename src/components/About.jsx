import React from 'react';
import { GraduationCap, MapPin, Calendar, Award, Brain, Database, Code, Compass, Cpu, User } from 'lucide-react';
import { personalData } from '../data/personal';
import useScrollReveal from '../hooks/useScrollReveal';
import SystemStatus from './SystemStatus';

export default function About() {
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.1 });
  const [topGridRef, topGridRevealed] = useScrollReveal({ threshold: 0.1 });
  const [focusGridRef, focusGridRevealed] = useScrollReveal({ threshold: 0.1 });

  const technicalFocus = [
    { title: "Machine Learning", desc: "Predictive models, statistical modeling, and pattern recognition", icon: Brain },
    { title: "Deep Learning", desc: "Neural network representations and GPU model training (NVIDIA certified)", icon: Cpu },
    { title: "Natural Language Processing", desc: "Text analysis, parsing, and linguistic algorithms", icon: Compass },
    { title: "Generative AI", desc: "Foundation models and generative architectures", icon: Award },
    { title: "Backend Development", desc: "Object-oriented backend design with Java, JDBC & exception handling", icon: Code },
    { title: "Data Structures & Algorithms", desc: "Algorithmic optimization with 500+ problems solved across platforms", icon: Code },
    { title: "Database Development", desc: "Normalized schemas, relational queries, and ACID principles in MySQL", icon: Database },
  ];

  return (
    <section id="about" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 light-tint-edu transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-16 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono tracking-wider text-blue-700 dark:text-cyber-cyan bg-blue-50/90 dark:bg-dark-800/90 border border-blue-200/80 dark:border-cyber-cyan/30 shadow-xs transition-colors">
            <span className="text-cyan-600 dark:text-cyber-cyan font-bold">01</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">ABOUT</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-blue-600 dark:text-cyber-cyan">profile.sys</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Engineering Rigor with an AI/ML Specialization
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Focused on building efficient software architectures and exploring intelligent systems.
          </p>
        </div>

        {/* Top Grid: Academic Profile Card & Narrative */}
        <div ref={topGridRef} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16 reveal-init ${topGridRevealed ? 'revealed' : ''}`}>
          
          {/* Degree Highlight Card */}
          <div className="lg:col-span-5 glass-card rounded-2xl flex flex-col justify-between relative overflow-hidden group border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 shadow-lg shadow-blue-500/5">
            {/* Top accent gradient bar */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />
            
            {/* Window header */}
            <div className="px-5 py-2.5 bg-slate-100/80 dark:bg-[#080d16] border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-xs text-slate-600 dark:text-slate-400">academic_profile.json</span>
              <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">[VERIFIED]</span>
            </div>

            <div className="p-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/40 flex items-center justify-center text-blue-600 dark:text-cyan-400 shadow-xs transition-colors shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-semibold transition-colors">Currently Pursuing</span>
                  <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white transition-colors">
                    B.Tech in Computer Science & Engineering
                  </h3>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-dark-950/80 border border-slate-200/80 dark:border-white/5 font-mono text-xs text-slate-700 dark:text-slate-300">
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">&gt; specialization:</span> Artificial Intelligence & Machine Learning
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-200/80 dark:border-white/5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 transition-colors font-mono">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span>institution: <strong className="text-slate-900 dark:text-white">Galgotias University</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>location: <span className="text-slate-900 dark:text-white">Greater Noida, Uttar Pradesh</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>academic_period: <span className="text-slate-900 dark:text-white">2024 – 2028</span></span>
                </div>
              </div>
            </div>

            {/* CGPA Banner */}
            <div className="mx-7 mb-7 p-4 rounded-xl bg-slate-50 dark:bg-dark-950/90 border border-slate-200/80 dark:border-white/5 flex items-center justify-between transition-colors">
              <div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">cumulative_gpa</div>
                <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white">7.95 <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">/ 10</span></div>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300/80 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-400 text-xs font-mono font-bold shadow-xs transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                NVIDIA Certified
              </div>
            </div>
          </div>

          {/* Academic & Engineering Focus Narrative */}
          <div className="lg:col-span-7 glass-card rounded-2xl flex flex-col justify-between overflow-hidden border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 shadow-lg shadow-blue-500/5">
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />
            
            {/* Window header */}
            <div className="px-5 py-2.5 bg-slate-100/80 dark:bg-[#080d16] border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-xs text-slate-600 dark:text-slate-400">README.md</span>
              <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">// Markdown</span>
            </div>

            <div className="p-7 space-y-5">
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2 transition-colors">
                <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyber-cyan" />
                Academic Journey & Technical Orientation
              </h3>

              <div className="relative pl-4 border-l-2 border-slate-200 dark:border-white/10 space-y-3 font-sans">
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed transition-colors">
                  I am an undergraduate Computer Science and Engineering student at Galgotias University with an academic specialization in Artificial Intelligence and Machine Learning. My approach balances solid theoretical computer science foundations with hands-on software development across Java and Python.
                </p>

                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed transition-colors">
                  In addition to deep neural networks, machine learning, and natural language processing, I place strong emphasis on low-level correctness, data structure efficiency, and robust backend engineering with JDBC, MySQL, and object-oriented principles.
                </p>
              </div>

              {/* Key Focus Tags */}
              <div className="pt-2 border-t border-slate-200/80 dark:border-white/5">
                <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-2.5 font-semibold flex items-center gap-2">
                  <span className="text-cyan-600 dark:text-cyan-400">&gt;</span>
                  <span>Core Disciplines Manifest:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {personalData.academicFocus.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100/90 text-slate-800 dark:bg-dark-900 dark:text-slate-300 border border-slate-200/90 dark:border-white/10 hover:border-blue-400 dark:hover:border-cyan-400/50 transition-colors"
                    >
                      [ {interest} ]
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-7 py-3 bg-slate-50/70 dark:bg-dark-950/60 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>status: active_coursework</span>
              <span className="text-emerald-600 dark:text-emerald-400">academic_sync: true</span>
            </div>
          </div>

        </div>

        {/* Verified System Telemetry Status Panel */}
        <div className="max-w-2xl mx-auto mb-16">
          <SystemStatus />
        </div>

        {/* Technical Focus Areas Grid */}
        <div ref={focusGridRef} className={`space-y-4 reveal-init ${focusGridRevealed ? 'revealed' : ''}`}>
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm">&gt;</span>
              <h3 className="text-lg font-display font-semibold text-slate-900 dark:text-white transition-colors">Areas of Focus</h3>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">// Curriculum & Self-Initiated Study</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {technicalFocus.map((item, idx) => {
              const Icon = item.icon;
              const moduleCode = `MOD_0${idx + 1}`;

              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-5 space-y-3 border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 hover:border-blue-400 dark:hover:border-cyan-400/40 hover:-translate-y-1 hover:shadow-md transition-all duration-200 group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/40 text-blue-600 dark:text-cyan-400 flex items-center justify-center transition-all duration-200 group-hover:scale-105 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {moduleCode}
                    </span>
                  </div>

                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
