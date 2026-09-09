import React, { useState } from 'react';
import { skillCategories } from '../data/skills';
import { Code2, Cpu, Database, Globe, Wrench, Users, CheckCircle2 } from 'lucide-react';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');

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
    <section id="skills" className="py-24 relative z-10 border-t border-white/5 bg-dark-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20">
            Technical Proficiency
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Verified Skills & Core Tooling
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Categorized technical capabilities and soft skills strictly grounded in practical coursework and engineering projects.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-cyber-emerald text-dark-950 font-bold shadow-md shadow-cyber-emerald/20'
                : 'bg-dark-800 text-slate-300 hover:text-white hover:bg-dark-700 border border-white/5'
            }`}
          >
            All Categories
          </button>
          {skillCategories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Code2;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-cyber-cyan text-dark-950 font-bold shadow-md shadow-cyber-cyan/20'
                    : 'bg-dark-800 text-slate-300 hover:text-white hover:bg-dark-700 border border-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Code2;
            return (
              <div
                key={cat.id}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/5 hover:border-cyber-emerald/30 group"
              >
                <div className="space-y-4">
                  {/* Card Title & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyber-emerald group-hover:border-cyber-emerald/40 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-white text-lg">
                        {cat.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                      {cat.skills.length} items
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Skills List */}
                  <div className="space-y-2.5 pt-2">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl bg-dark-900/60 border border-white/5 hover:border-white/15 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyber-emerald" />
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/20">
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 pl-5">
                          {skill.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer status */}
                <div className="pt-4 mt-4 border-t border-white/5 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Source: Resume Record</span>
                  <span className="text-cyber-emerald">Verified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
