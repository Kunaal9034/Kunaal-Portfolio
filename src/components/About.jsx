import React from 'react';
import { GraduationCap, MapPin, Calendar, Award, Brain, Database, Code, Compass, Cpu, User } from 'lucide-react';
import { personalData } from '../data/personal';
import useScrollReveal from '../hooks/useScrollReveal';

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
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-blue-700 dark:text-cyber-blue bg-blue-50/90 dark:bg-cyber-blue/10 border border-blue-200/80 dark:border-cyber-blue/20 shadow-xs transition-colors">
            <User className="w-3.5 h-3.5 text-blue-600 dark:text-cyber-blue" />
            <span>About Me</span>
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
          <div className="lg:col-span-5 glass-card rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden group border border-slate-200/80 dark:border-white/10 bg-gradient-to-br from-white via-indigo-50/20 to-blue-50/30 dark:bg-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 dark:bg-cyber-indigo/10 rounded-full blur-3xl -z-10 group-hover:bg-blue-400/20 dark:group-hover:bg-cyber-indigo/20 transition-all duration-500" />
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100/80 dark:bg-cyber-indigo/15 border border-indigo-300/80 dark:border-cyber-indigo/30 flex items-center justify-center text-indigo-700 dark:text-cyber-indigo shadow-xs transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-700 dark:text-cyber-indigo font-semibold transition-colors">Currently Pursuing</span>
                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mt-1 transition-colors">
                  B.Tech in Computer Science & Engineering
                </h3>
                <p className="text-cyan-800 dark:text-cyber-cyan text-sm font-semibold mt-0.5 transition-colors">
                  Specialization: Artificial Intelligence & Machine Learning
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-200/80 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 transition-colors">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600 dark:text-cyber-cyan shrink-0" />
                  <span>Institution: <strong className="text-slate-900 dark:text-white">Galgotias University</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-700 dark:text-cyber-cyan shrink-0" />
                  <span>Location: <span className="text-slate-900 dark:text-white">Greater Noida, Uttar Pradesh</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-700 dark:text-cyber-indigo shrink-0" />
                  <span>Academic Period: <span className="text-slate-900 dark:text-white">2024 – 2028</span></span>
                </div>
              </div>
            </div>

            {/* CGPA Banner */}
            <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between transition-colors">
              <div>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">Cumulative Grade Point Average</div>
                <div className="text-2xl font-display font-bold text-slate-900 dark:text-white">7.95 <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/ 10</span></div>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-100/80 dark:bg-cyber-emerald/15 border border-emerald-300 dark:border-cyber-emerald/30 text-emerald-900 dark:text-cyber-emerald text-xs font-bold shadow-xs transition-colors">
                NVIDIA Certified
              </div>
            </div>
          </div>

          {/* Academic & Engineering Focus Narrative */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-7 flex flex-col justify-center space-y-5 border border-slate-200/80 dark:border-white/10 bg-gradient-to-br from-white via-slate-50/60 to-cyan-50/30 dark:bg-none">
            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2 transition-colors">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-cyber-blue" />
              Academic Journey & Technical Orientation
            </h3>

            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed transition-colors">
              I am an undergraduate Computer Science and Engineering student at Galgotias University with an academic specialization in Artificial Intelligence and Machine Learning. My approach balances solid theoretical computer science foundations with hands-on software development across Java and Python.
            </p>

            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed transition-colors">
              In addition to deep neural networks, machine learning, and natural language processing, I place strong emphasis on low-level correctness, data structure efficiency, and robust backend engineering with JDBC, MySQL, and object-oriented principles.
            </p>

            {/* Key Focus Tags */}
            <div className="pt-2">
              <div className="text-xs font-mono uppercase text-slate-600 dark:text-slate-400 mb-2.5 font-semibold">Key Core Disciplines:</div>
              <div className="flex flex-wrap gap-2">
                {personalData.academicFocus.map((interest, idx) => {
                  const tagPillColors = [
                    "bg-cyan-50/90 text-cyan-900 border-cyan-200/80 hover:border-cyan-400",
                    "bg-blue-50/90 text-blue-900 border-blue-200/80 hover:border-blue-400",
                    "bg-indigo-50/90 text-indigo-900 border-indigo-200/80 hover:border-indigo-400",
                    "bg-violet-50/90 text-violet-900 border-violet-200/80 hover:border-violet-400",
                    "bg-amber-50/90 text-amber-900 border-amber-200/80 hover:border-amber-400",
                    "bg-teal-50/90 text-teal-900 border-teal-200/80 hover:border-teal-400",
                  ];
                  return (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${tagPillColors[idx % tagPillColors.length]} dark:bg-dark-800 dark:border-white/10 dark:text-slate-200 dark:hover:border-cyber-blue/40`}
                    >
                      {interest}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Technical Focus Areas Grid */}
        <div ref={focusGridRef} className={`space-y-4 reveal-init ${focusGridRevealed ? 'revealed' : ''}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-semibold text-slate-900 dark:text-white transition-colors">Areas of Focus</h3>
            <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">Curriculum & Self-Initiated Study</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {technicalFocus.map((item, idx) => {
              const Icon = item.icon;
              const focusCardColors = [
                { iconBg: "bg-cyan-100/80 text-cyan-700 border-cyan-200/90 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-800/40", border: "hover:border-cyan-400/60 dark:hover:border-cyan-500/30", textHover: "group-hover:text-cyan-700 dark:group-hover:text-cyan-400" },
                { iconBg: "bg-violet-100/80 text-violet-700 border-violet-200/90 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800/40", border: "hover:border-violet-400/60 dark:hover:border-violet-500/30", textHover: "group-hover:text-violet-700 dark:group-hover:text-violet-400" },
                { iconBg: "bg-indigo-100/80 text-indigo-700 border-indigo-200/90 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/40", border: "hover:border-indigo-400/60 dark:hover:border-indigo-500/30", textHover: "group-hover:text-indigo-700 dark:group-hover:text-indigo-400" },
                { iconBg: "bg-amber-100/80 text-amber-700 border-amber-200/90 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40", border: "hover:border-amber-400/60 dark:hover:border-amber-500/30", textHover: "group-hover:text-amber-700 dark:group-hover:text-amber-400" },
                { iconBg: "bg-blue-100/80 text-blue-700 border-blue-200/90 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/40", border: "hover:border-blue-400/60 dark:hover:border-blue-500/30", textHover: "group-hover:text-blue-700 dark:group-hover:text-blue-400" },
                { iconBg: "bg-teal-100/80 text-teal-700 border-teal-200/90 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800/40", border: "hover:border-teal-400/60 dark:hover:border-teal-500/30", textHover: "group-hover:text-teal-700 dark:group-hover:text-teal-400" },
                { iconBg: "bg-indigo-100/80 text-indigo-700 border-indigo-200/90 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/40", border: "hover:border-indigo-400/60 dark:hover:border-indigo-500/30", textHover: "group-hover:text-indigo-700 dark:group-hover:text-indigo-400" },
              ];
              const colorConfig = focusCardColors[idx % focusCardColors.length];

              return (
                <div
                  key={idx}
                  className={`glass-card rounded-2xl p-5 space-y-2.5 border border-slate-200/80 dark:border-white/5 ${colorConfig.border} hover:-translate-y-1 hover:shadow-md transition-all duration-200 group`}
                >
                  <div className={`w-9 h-9 rounded-xl ${colorConfig.iconBg} border flex items-center justify-center transition-all duration-200 group-hover:scale-105`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className={`font-semibold text-sm text-slate-900 dark:text-white ${colorConfig.textHover} transition-colors`}>
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
