import React from 'react';
import { GraduationCap, MapPin, Calendar, Award, Brain, Database, Code, Compass } from 'lucide-react';
import { personalData } from '../data/personal';

export default function About() {
  const technicalFocus = [
    { title: "Machine Learning", desc: "Predictive models, statistical modeling, and pattern recognition", icon: Brain },
    { title: "Deep Learning", desc: "Neural network representations and GPU model training (NVIDIA certified)", icon: CpuIcon },
    { title: "Natural Language Processing", desc: "Text analysis, parsing, and linguistic algorithms", icon: Compass },
    { title: "Generative AI", desc: "Foundation models and generative architectures", icon: Award },
    { title: "Backend Development", desc: "Object-oriented backend design with Java, JDBC & exception handling", icon: Code },
    { title: "Data Structures & Algorithms", desc: "Algorithmic optimization with 500+ problems solved across platforms", icon: Code },
    { title: "Database Development", desc: "Normalized schemas, relational queries, and ACID principles in MySQL", icon: Database },
  ];

  function CpuIcon(props) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
      </svg>
    );
  }

  return (
    <section id="about" className="py-24 relative z-10 border-t border-slate-200/80 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-cyber-emerald bg-emerald-50 dark:bg-cyber-emerald/10 border border-emerald-300 dark:border-cyber-emerald/20 transition-colors">
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Engineering Rigor with an AI/ML Specialization
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Focused on building efficient software architectures and exploring intelligent systems.
          </p>
        </div>

        {/* Top Grid: Academic Profile Card & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Degree Highlight Card */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden group border border-slate-200/80 dark:border-white/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-emerald/10 rounded-full blur-3xl -z-10 group-hover:bg-cyber-emerald/20 transition-all duration-500" />
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-cyber-emerald/15 border border-emerald-300/80 dark:border-cyber-emerald/30 flex items-center justify-center text-emerald-600 dark:text-cyber-emerald transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-cyber-emerald transition-colors">Currently Pursuing</span>
                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mt-1 transition-colors">
                  B.Tech in Computer Science & Engineering
                </h3>
                <p className="text-cyan-700 dark:text-cyber-cyan text-sm font-medium mt-0.5 transition-colors">
                  Specialization: Artificial Intelligence & Machine Learning
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 transition-colors">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600 dark:text-cyber-emerald shrink-0" />
                  <span>Institution: <strong className="text-slate-900 dark:text-white">Galgotias University</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyber-cyan shrink-0" />
                  <span>Location: <span className="text-slate-900 dark:text-white">Greater Noida, Uttar Pradesh</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600 dark:text-cyber-indigo shrink-0" />
                  <span>Academic Period: <span className="text-slate-900 dark:text-white">2024 – 2028</span></span>
                </div>
              </div>
            </div>

            {/* CGPA Banner */}
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between transition-colors">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Cumulative Grade Point Average</div>
                <div className="text-2xl font-display font-bold text-slate-900 dark:text-white">7.95 <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/ 10</span></div>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-cyber-emerald/15 border border-emerald-300/80 dark:border-cyber-emerald/30 text-emerald-700 dark:text-cyber-emerald text-xs font-semibold transition-colors">
                NVIDIA Certified
              </div>
            </div>
          </div>

          {/* Academic & Engineering Focus Narrative */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-7 flex flex-col justify-center space-y-5 border border-slate-200/80 dark:border-white/10">
            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2 transition-colors">
              <span className="w-2 h-2 rounded-full bg-cyber-emerald" />
              Academic Journey & Technical Orientation
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed transition-colors">
              I am an undergraduate Computer Science and Engineering student at Galgotias University with an academic specialization in Artificial Intelligence and Machine Learning. My approach balances solid theoretical computer science foundations with hands-on software development across Java and Python.
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed transition-colors">
              In addition to deep neural networks, machine learning, and natural language processing, I place strong emphasis on low-level correctness, data structure efficiency, and robust backend engineering with JDBC, MySQL, and object-oriented principles.
            </p>

            {/* Key Focus Tags */}
            <div className="pt-2">
              <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-2.5">Key Core Disciplines:</div>
              <div className="flex flex-wrap gap-2">
                {personalData.academicFocus.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-emerald-500/40 dark:hover:border-cyber-emerald/40 transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Technical Focus Areas Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-semibold text-slate-900 dark:text-white transition-colors">Areas of Focus</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Curriculum & Self-Initiated Study</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {technicalFocus.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-xl p-5 space-y-2 border border-slate-200/80 dark:border-white/5 hover:border-emerald-500/40 dark:hover:border-cyber-emerald/30 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-cyber-emerald/10 border border-emerald-300/80 dark:border-cyber-emerald/20 flex items-center justify-center text-emerald-600 dark:text-cyber-emerald group-hover:bg-emerald-100 dark:group-hover:bg-cyber-emerald/20 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-cyber-emerald transition-colors">
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
