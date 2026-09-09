import React, { useState } from 'react';
import { skillCategories } from '../data/skills';
import { Code2, Cpu, Database, Globe, Wrench, Users, CheckCircle2, Sparkles } from 'lucide-react';
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

  const categoryStyles = {
    languages: {
      cardBorder: "border-blue-200/80 hover:border-blue-400/80",
      iconBox: "bg-blue-100/80 text-blue-700 border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/40",
      chip: "bg-blue-50/70 border-blue-200/80 hover:bg-blue-100/70",
      level: "bg-blue-100/80 text-blue-900 border-blue-300/80",
      icon: "text-blue-600 dark:text-blue-400",
      headerBadge: "text-blue-700 bg-blue-50 border-blue-200",
      filterActive: "bg-blue-600 text-white shadow-blue-500/25",
      darkText: "dark:text-blue-400",
      darkLevel: "dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/30",
      darkBorderHover: "dark:hover:border-blue-500/40"
    },
    'ai-ml': {
      cardBorder: "border-violet-200/80 hover:border-violet-400/80",
      iconBox: "bg-violet-100/80 text-violet-700 border-violet-200/80 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800/40",
      chip: "bg-violet-50/70 border-violet-200/80 hover:bg-violet-100/70",
      level: "bg-violet-100/80 text-violet-900 border-violet-300/80",
      icon: "text-violet-600 dark:text-violet-400",
      headerBadge: "text-violet-700 bg-violet-50 border-violet-200",
      filterActive: "bg-violet-600 text-white shadow-violet-500/25",
      darkText: "dark:text-violet-400",
      darkLevel: "dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800/30",
      darkBorderHover: "dark:hover:border-violet-500/40"
    },
    databases: {
      cardBorder: "border-indigo-200/80 hover:border-indigo-400/80",
      iconBox: "bg-indigo-100/80 text-indigo-700 border-indigo-200/80 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/40",
      chip: "bg-indigo-50/70 border-indigo-200/80 hover:bg-indigo-100/70",
      level: "bg-indigo-100/80 text-indigo-900 border-indigo-300/80",
      icon: "text-indigo-600 dark:text-indigo-400",
      headerBadge: "text-indigo-700 bg-indigo-50 border-indigo-200",
      filterActive: "bg-indigo-600 text-white shadow-indigo-500/25",
      darkText: "dark:text-indigo-400",
      darkLevel: "dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/30",
      darkBorderHover: "dark:hover:border-indigo-500/40"
    },
    web: {
      cardBorder: "border-cyan-200/80 hover:border-cyan-400/80",
      iconBox: "bg-cyan-100/80 text-cyan-700 border-cyan-200/80 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-800/40",
      chip: "bg-cyan-50/70 border-cyan-200/80 hover:bg-cyan-100/70",
      level: "bg-cyan-100/80 text-cyan-900 border-cyan-300/80",
      icon: "text-cyan-600 dark:text-cyan-400",
      headerBadge: "text-cyan-700 bg-cyan-50 border-cyan-200",
      filterActive: "bg-cyan-600 text-white shadow-cyan-500/25",
      darkText: "dark:text-cyan-400",
      darkLevel: "dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-800/30",
      darkBorderHover: "dark:hover:border-cyan-500/40"
    },
    tools: {
      cardBorder: "border-amber-200/80 hover:border-amber-400/80",
      iconBox: "bg-amber-100/80 text-amber-700 border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40",
      chip: "bg-amber-50/70 border-amber-200/80 hover:bg-amber-100/70",
      level: "bg-amber-100/80 text-amber-900 border-amber-300/80",
      icon: "text-amber-600 dark:text-amber-400",
      headerBadge: "text-amber-700 bg-amber-50 border-amber-200",
      filterActive: "bg-amber-600 text-white shadow-amber-500/25",
      darkText: "dark:text-amber-400",
      darkLevel: "dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/30",
      darkBorderHover: "dark:hover:border-amber-500/40"
    },
    'soft-skills': {
      cardBorder: "border-slate-300/80 hover:border-slate-400/80",
      iconBox: "bg-slate-100/90 text-slate-700 border-slate-300/80 dark:bg-dark-800 dark:text-slate-300 dark:border-white/10",
      chip: "bg-slate-50/80 border-slate-200/80 hover:bg-slate-100/80",
      level: "bg-slate-100 text-slate-800 border-slate-300",
      icon: "text-slate-600 dark:text-slate-400",
      headerBadge: "text-slate-700 bg-slate-100 border-slate-300",
      filterActive: "bg-slate-700 text-white shadow-slate-500/25",
      darkText: "dark:text-slate-300",
      darkLevel: "dark:bg-dark-800 dark:text-slate-300 dark:border-white/10",
      darkBorderHover: "dark:hover:border-white/20"
    }
  };

  const filteredCategories = selectedCategory === 'all'
    ? skillCategories
    : skillCategories.filter(cat => cat.id === selectedCategory);

  return (
    <section id="skills" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 light-tint-skills bg-slate-50/60 dark:bg-dark-950/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-12 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-cyan-800 dark:text-cyber-cyan bg-cyan-50/90 dark:bg-cyber-cyan/10 border border-cyan-300/80 dark:border-cyber-cyan/20 shadow-xs transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyber-cyan" />
            <span>Technical Proficiency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Verified Skills & Core Tooling
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Categorized technical capabilities and soft skills strictly grounded in practical coursework and engineering projects.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-500/20 dark:bg-blue-500 dark:text-white dark:shadow-blue-500/20'
                : 'bg-white/90 dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-dark-700 border border-slate-200 dark:border-white/5 shadow-xs dark:shadow-none'
            }`}
          >
            All Categories
          </button>
          {skillCategories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Code2;
            const style = categoryStyles[cat.id] || categoryStyles.languages;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? `${style.filterActive} dark:bg-cyan-500 dark:text-dark-950 font-bold shadow-md`
                    : 'bg-white/90 dark:bg-dark-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-dark-700 border border-slate-200 dark:border-white/5 shadow-xs dark:shadow-none'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div ref={gridRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-init ${gridRevealed ? 'revealed' : ''}`}>
          {filteredCategories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Code2;
            const style = categoryStyles[cat.id] || categoryStyles.languages;
            return (
              <div
                key={cat.id}
                className={`glass-card rounded-2xl p-6 flex flex-col justify-between border ${style.cardBorder} dark:border-white/5 ${style.darkBorderHover} group`}
              >
                <div className="space-y-4">
                  {/* Card Title & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-lg ${style.iconBox} flex items-center justify-center transition-colors`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg transition-colors">
                        {cat.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100/80 dark:bg-white/5 text-slate-700 dark:text-slate-400 border border-slate-200/80 dark:border-white/5">
                      {cat.skills.length} items
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                    {cat.description}
                  </p>

                  {/* Skills List with Category-Specific Tinting */}
                  <div className="space-y-2.5 pt-2">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={`p-3 rounded-xl ${style.chip} dark:bg-dark-900/60 border dark:border-white/5 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 transition-colors">
                            <CheckCircle2 className={`w-3.5 h-3.5 ${style.icon}`} />
                            {skill.name}
                          </span>
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${style.level} ${style.darkLevel} transition-colors`}>
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 pl-5 transition-colors">
                          {skill.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer status */}
                <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-white/5 text-[11px] font-mono text-slate-500 flex items-center justify-between transition-colors">
                  <span>Source: Resume Record</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Verified</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
