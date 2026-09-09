import React from 'react';
import { projectsData } from '../data/projects';
import ProjectCard from './ProjectCard';
import { FolderGit2, Sparkles } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Projects() {
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.1 });
  const [projectsGridRef, projectsGridRevealed] = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="projects" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 light-tint-projects transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-16 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-blue-700 dark:text-cyber-blue bg-blue-50/90 dark:bg-cyber-blue/10 border border-blue-200/80 dark:border-cyber-blue/20 transition-colors shadow-xs">
            <FolderGit2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyber-blue" />
            <span>Engineering Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Data-Driven Project Showcase
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Real-world software engineering and data analytics systems featuring measurable performance outcomes and clean architectures.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div ref={projectsGridRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch reveal-init ${projectsGridRevealed ? 'revealed' : ''}`}>
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Modular Architecture Callout Note */}
        <div className="mt-12 p-5 rounded-2xl glass-card border border-dashed border-slate-300/90 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyber-cyan/10 border border-cyan-300/80 dark:border-cyber-cyan/30 flex items-center justify-center text-cyan-600 dark:text-cyber-cyan shrink-0 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white transition-colors">Extensible Project Engine</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 transition-colors">
                Future systems, ML notebooks, or web applications coming soon<span className="inline-flex tracking-normal font-normal" aria-label="..."><span>.</span><span className="animate-ellipsis-dot-2">.</span><span className="animate-ellipsis-dot-3">.</span></span>
              </p>
            </div>
          </div>
          <div className="text-xs font-mono text-slate-500 whitespace-nowrap">
            {projectsData.length} Featured Projects
          </div>
        </div>

      </div>
    </section>
  );
}
