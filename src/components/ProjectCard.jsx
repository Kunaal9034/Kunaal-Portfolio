import React, { useState } from 'react';
import { ExternalLink, Calendar, CheckCircle, Database, BarChart3, Lock, Network, Activity, ChevronDown, ChevronUp, Cpu, Layers, Check } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import ProjectArchitectureViewer from './ProjectArchitectureViewer';
import AnimatedCounter from './AnimatedCounter';
import MagneticButton from './MagneticButton';
import { projectArchitectures } from '../data/projectArchitectures';

export default function ProjectCard({ project }) {
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isCaseStudyExpanded, setIsCaseStudyExpanded] = useState(false);

  const isHotelProject = project.id === 'hotel-management-system';
  const architecture = projectArchitectures[project.id];
  const caseStudy = project.caseStudy;

  return (
    <article className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 hover:border-blue-400 dark:hover:border-cyan-400/40 shadow-lg shadow-blue-500/5 flex flex-col justify-between transition-all duration-300 group">
      
      {/* Top Accent Gradient Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

      {/* Repository Window Header Bar */}
      <div className="px-5 py-2.5 bg-slate-100/80 dark:bg-[#080d16] border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="font-mono text-xs text-slate-800 dark:text-slate-200 font-semibold ml-1">
            {project.id}/
          </span>
          <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
            (main)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-white dark:bg-dark-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
            {isHotelProject ? <Database className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> : <BarChart3 className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />}
            {project.badge}
          </span>
        </div>
      </div>

      {/* Card Header & Visual Structure */}
      <div className="p-6 sm:p-7 space-y-5">
        
        {/* Branch / Period Meta */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 border-b border-slate-200/80 dark:border-white/5 pb-3">
          <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-semibold">
            <span>├──</span>
            <span>repo_status: active</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            {project.period}
          </span>
        </div>

        {/* Title and Summary */}
        <div className="space-y-2">
          <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed transition-colors font-sans">
            {project.summary}
          </p>
        </div>

        {/* Project Metrics Area */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider transition-colors flex items-center gap-1.5 font-semibold">
              <span className="text-cyan-600 dark:text-cyan-400">├──</span>
              <Activity className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>PERFORMANCE_METRICS</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-500">
              {isHotelProject ? "Verified Benchmarks" : "Verified Outcomes"}
            </span>
          </div>

          <div className={`grid ${isHotelProject ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-2 sm:grid-cols-4'} gap-2.5`}>
            {project.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50/80 dark:bg-dark-950/80 border border-slate-200/80 dark:border-white/5 hover:border-blue-300 dark:hover:border-cyan-400/30 transition-all duration-200 group/stat"
              >
                <div className="text-base sm:text-lg font-bold font-mono text-slate-900 dark:text-white group-hover/stat:text-blue-600 dark:group-hover/stat:text-cyan-300 transition-colors">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 truncate mt-0.5 transition-colors uppercase">
                  {stat.label}
                </div>
                {stat.detail && (
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                    {stat.detail}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-2 pt-1">
          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider font-semibold transition-colors flex items-center gap-1">
            <span className="text-cyan-600 dark:text-cyan-400">├──</span>
            <span>TECHNOLOGY_STACK</span>
          </div>
          <div className="flex flex-wrap gap-2 pl-4">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100/90 text-slate-800 dark:bg-dark-900 dark:text-slate-300 border border-slate-200/90 dark:border-white/10 hover:border-blue-400 dark:hover:border-cyan-400/40 transition-colors"
              >
                [ {tech} ]
              </span>
            ))}
          </div>
        </div>

        {/* Key Highlights */}
        <div className="space-y-2.5 pt-1">
          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider font-semibold transition-colors flex items-center gap-1">
            <span className="text-cyan-600 dark:text-cyan-400">└──</span>
            <span>ENGINEERING_HIGHLIGHTS</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed transition-colors pl-4 font-sans">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expandable Technical Case Study Toggle */}
        {caseStudy && (
          <div className="pt-2 border-t border-slate-200/80 dark:border-white/5">
            <button
              type="button"
              onClick={() => setIsCaseStudyExpanded(!isCaseStudyExpanded)}
              aria-expanded={isCaseStudyExpanded}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-100/80 hover:bg-slate-200/70 dark:bg-dark-900/90 dark:hover:bg-dark-850 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 text-xs font-mono font-semibold text-slate-800 dark:text-cyan-300 transition-all"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>{isCaseStudyExpanded ? 'COLLAPSE CASE STUDY' : 'EXPAND TECHNICAL CASE STUDY'}</span>
              </span>
              {isCaseStudyExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Expandable Case Study Content */}
            {isCaseStudyExpanded && (
              <div className="mt-3 p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-[#070c14] border border-slate-200 dark:border-cyan-500/20 space-y-4 font-mono text-xs transition-all animate-fadeIn">
                <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-bold tracking-wider uppercase flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-white/5">
                  <span>// TECHNICAL CASE STUDY:</span>
                  <span>{project.title.toUpperCase()}</span>
                </div>

                {/* 1. Problem */}
                <div className="space-y-1">
                  <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">01 // Problem</span>
                  <p className="font-sans text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-2 border-l-2 border-rose-500/50">
                    {caseStudy.problem}
                  </p>
                </div>

                {/* 2. Approach */}
                <div className="space-y-1">
                  <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">02 // Approach</span>
                  <p className="font-sans text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-2 border-l-2 border-amber-500/50">
                    {caseStudy.approach}
                  </p>
                </div>

                {/* 3. Technology */}
                <div className="space-y-1">
                  <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">03 // Technology</span>
                  <div className="flex flex-wrap gap-1.5 pl-2">
                    {caseStudy.technology.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-white dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. Architecture */}
                <div className="space-y-1">
                  <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">04 // Architecture</span>
                  <p className="font-sans text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-2 border-l-2 border-indigo-500/50">
                    {caseStudy.architecture}
                  </p>
                  {architecture && (
                    <div className="pt-1 pl-2">
                      <button
                        type="button"
                        onClick={() => setIsArchitectureOpen(true)}
                        className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Network className="w-3 h-3" />
                        <span>[ Open Interactive Architecture Flow Diagram → ]</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 5. Implementation */}
                <div className="space-y-1">
                  <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">05 // Implementation</span>
                  <p className="font-sans text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-2 border-l-2 border-cyan-500/50">
                    {caseStudy.implementation}
                  </p>
                </div>

                {/* 6. Results */}
                <div className="space-y-1.5">
                  <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">06 // Results</span>
                  <ul className="space-y-1 pl-2 font-sans text-xs text-slate-700 dark:text-slate-300">
                    {caseStudy.results.map((res, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-cyber-emerald shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Footer: Action Links */}
      <div className="px-6 py-4 bg-slate-50/70 dark:bg-[#080d16] border-t border-slate-200/80 dark:border-white/5 flex flex-wrap items-center justify-between gap-3 transition-colors">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Architecture Action */}
          {architecture && (
            <MagneticButton
              as="button"
              type="button"
              onClick={() => setIsArchitectureOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 dark:bg-cyber-emerald/15 dark:hover:bg-cyber-emerald/25 dark:text-cyber-emerald dark:border-cyber-emerald/30 transition-all duration-200 group/arch focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-xs"
              aria-haspopup="dialog"
              aria-expanded={isArchitectureOpen}
            >
              <Network className="w-3.5 h-3.5 text-emerald-600 dark:text-cyber-emerald transition-transform group-hover/arch:scale-110" />
              <span>[ VIEW ARCHITECTURE → ]</span>
            </MagneticButton>
          )}

          {/* GitHub Action */}
          {project.links.github ? (
            <MagneticButton
              as="a"
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 border border-slate-200/90 dark:bg-dark-900 dark:hover:bg-dark-800 dark:text-white dark:border-white/10 transition-colors shadow-xs"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>[ SOURCE CODE → ]</span>
            </MagneticButton>
          ) : (
            <div
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono bg-slate-100 dark:bg-dark-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 cursor-not-allowed transition-colors"
              title="Repository link placeholder (configurable in src/data/projects.js)"
            >
              <Lock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
              <span>[ REPO: CONFIGURABLE ]</span>
            </div>
          )}

          {/* Demo Action */}
          {project.links.demo ? (
            <MagneticButton
              as="a"
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 dark:bg-cyber-emerald/15 dark:hover:bg-cyber-emerald/25 dark:text-cyber-emerald dark:border-cyber-emerald/30 transition-colors shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>[ LIVE DEMO → ]</span>
            </MagneticButton>
          ) : (
            <div
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono bg-slate-100 dark:bg-dark-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 cursor-not-allowed transition-colors"
              title="Console application / Demo video link configurable in src/data/projects.js"
            >
              <span>[ {isHotelProject ? "CONSOLE APP" : "PYTHON SCRIPT"} ]</span>
            </div>
          )}
        </div>

        <span className="text-[11px] font-mono text-slate-500">
          id: {project.id}
        </span>
      </div>

      {/* Reusable Project Architecture Viewer Modal */}
      {architecture && (
        <ProjectArchitectureViewer
          isOpen={isArchitectureOpen}
          onClose={() => setIsArchitectureOpen(false)}
          architecture={architecture}
        />
      )}

    </article>
  );
}
