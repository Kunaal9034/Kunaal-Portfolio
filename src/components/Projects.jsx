import React, { useState } from 'react';
import { projectsData } from '../data/projects';
import ProjectCard from './ProjectCard';
import { FolderGit2, Sparkles, Filter } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Projects() {
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.1 });
  const [projectsGridRef, projectsGridRevealed] = useScrollReveal({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filterOptions = [
    { label: 'ALL', value: 'ALL' },
    { label: 'JAVA', value: 'JAVA' },
    { label: 'PYTHON', value: 'PYTHON' },
    { label: 'BACKEND', value: 'BACKEND' }
  ];

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'ALL') return true;
    return project.tags && project.tags.includes(activeFilter);
  });

  return (
    <section id="projects" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 light-tint-projects transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-12 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono tracking-wider text-blue-700 dark:text-cyber-cyan bg-blue-50/90 dark:bg-dark-800/90 border border-blue-200/80 dark:border-cyber-cyan/30 shadow-xs transition-colors">
            <span className="text-cyan-600 dark:text-cyber-cyan font-bold">03</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">PROJECTS</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-blue-600 dark:text-cyber-cyan">repositories.manifest</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Data-Driven Project Showcase
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Real-world software engineering and data analytics systems featuring measurable performance outcomes, clean architectures, and expandable technical case studies.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 font-mono">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mr-2 select-none">
            <Filter className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>FILTER:</span>
          </div>

          {filterOptions.map((filter) => {
            const count = filter.value === 'ALL'
              ? projectsData.length
              : projectsData.filter(p => p.tags && p.tags.includes(filter.value)).length;

            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-500/20 border border-cyan-400/40'
                    : 'bg-white/80 dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/10 hover:border-cyan-500/40'
                }`}
              >
                <span>[ {filter.label} ({count}) ]</span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div 
          ref={projectsGridRef} 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch transition-opacity duration-300 reveal-init ${projectsGridRevealed ? 'revealed' : ''}`}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Extensible Project Engine Callout */}
        <div className="mt-12 p-5 rounded-2xl glass-card border border-slate-300/80 dark:border-white/10 bg-white/90 dark:bg-[#0c121e]/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-blue-950/40 border border-cyan-300/80 dark:border-cyan-800/40 flex items-center justify-center text-cyan-600 dark:text-cyber-cyan shrink-0 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold font-mono text-slate-900 dark:text-white transition-colors">
                // EXTENSIBLE_PROJECT_ENGINE
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 transition-colors font-sans">
                Future systems, ML pipelines, and production projects coming soon<span className="inline-flex tracking-normal font-normal" aria-label="..."><span>.</span><span className="animate-ellipsis-dot-2">.</span><span className="animate-ellipsis-dot-3">.</span></span>
              </p>
            </div>
          </div>
          <div className="text-xs font-mono text-slate-500 whitespace-nowrap px-3 py-1 rounded bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/10">
            status: {filteredProjects.length} active_displayed
          </div>
        </div>

      </div>
    </section>
  );
}
