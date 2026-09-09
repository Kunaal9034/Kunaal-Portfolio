import React from 'react';
import { projectsData } from '../data/projects';
import ProjectCard from './ProjectCard';
import { FolderGit2, Sparkles } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-cyber-emerald bg-cyber-emerald/10 border border-cyber-emerald/20">
            <FolderGit2 className="w-3.5 h-3.5" />
            Engineering Projects
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Data-Driven Project Showcase
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Real-world software engineering and data analytics systems featuring measurable performance outcomes and clean architectures.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Modular Architecture Callout Note */}
        <div className="mt-12 p-5 rounded-2xl glass-card border border-dashed border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Extensible Project Engine</h4>
              <p className="text-xs text-slate-400">
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
