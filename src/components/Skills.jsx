import React, { useState } from 'react';
import { skillCategories } from '../data/skills';
import { Code2, Cpu, Database, Globe, Wrench, Users } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.1 });
  const [gridRef, gridRevealed] = useScrollReveal({ threshold: 0.08 });

  const categoryIcons = {
    languages: Code2,
    'ai-ml': Cpu,
    databases: Database,
    web: Globe,
    tools: Wrench,
    'soft-skills': Users,
  };

  const filteredCategories = selectedCategory === 'all'
    ? skillCategories
    : skillCategories.filter(cat => cat.id === selectedCategory);

  return (
    <section id="skills" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 light-tint-skills bg-slate-50/60 dark:bg-[#070c14] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-12 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono tracking-wider text-blue-700 dark:text-cyber-cyan bg-blue-50/90 dark:bg-dark-800/90 border border-blue-200/80 dark:border-cyber-cyan/30 shadow-xs transition-colors">
            <span className="text-cyan-600 dark:text-cyber-cyan font-bold">02</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">SKILLS</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-blue-600 dark:text-cyber-cyan">stack_config.sys</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Verified Skills & Core Tooling
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Categorized technical capabilities and soft skills strictly grounded in practical coursework and engineering projects.
          </p>
        </div>

        {/* Category Filter Pills - Developer Toggle Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20 dark:bg-cyan-500 dark:text-dark-950 dark:border-cyan-400 font-bold'
                : 'bg-white/95 dark:bg-[#0c121e] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border-slate-200/90 dark:border-white/10 hover:border-blue-400 dark:hover:border-cyan-400/40'
            }`}
          >
            [ ALL ]
          </button>
          {skillCategories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Code2;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20 dark:bg-cyan-500 dark:text-dark-950 dark:border-cyan-400 font-bold'
                    : 'bg-white/95 dark:bg-[#0c121e] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border-slate-200/90 dark:border-white/10 hover:border-blue-400 dark:hover:border-cyan-400/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>[ {cat.title.toUpperCase()} ]</span>
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div ref={gridRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-init ${gridRevealed ? 'revealed' : ''}`}>
          {filteredCategories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Code2;
            return (
              <div
                key={cat.id}
                className="glass-card rounded-2xl flex flex-col justify-between border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 hover:border-blue-400 dark:hover:border-cyan-400/40 shadow-lg shadow-blue-500/5 group overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top accent line */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />
                
                {/* Window header */}
                <div className="px-5 py-2.5 bg-slate-100/80 dark:bg-[#080d16] border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyber-cyan" />
                    <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                      // MODULE: {cat.title.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-dark-950 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-white/10">
                    {cat.skills.length} items
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  {/* Card Title & Icon */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/40 text-blue-600 dark:text-cyan-400 flex items-center justify-center transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg transition-colors">
                      {cat.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                    {cat.description}
                  </p>

                  {/* Skills List with Technical Terminal / Package Styling */}
                  <div className="space-y-2.5 pt-2">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl bg-slate-50/80 dark:bg-dark-950/70 border border-slate-200/80 dark:border-white/5 hover:border-blue-300 dark:hover:border-cyan-400/30 hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs sm:text-sm font-mono font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 transition-colors">
                            <span className="text-cyan-600 dark:text-cyan-400 text-xs">&gt;</span>
                            [ {skill.name} ]
                          </span>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200/80 dark:bg-dark-900 dark:text-cyan-300 dark:border-cyan-800/40 transition-colors">
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 pl-3.5 transition-colors font-sans">
                          {skill.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer status */}
                <div className="px-6 py-3 bg-slate-50/70 dark:bg-dark-950/60 border-t border-slate-200/80 dark:border-white/5 text-[11px] font-mono text-slate-500 flex items-center justify-between transition-colors">
                  <span>source: resume.manifest</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Verified
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
