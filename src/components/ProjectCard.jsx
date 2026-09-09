import React, { useState } from 'react';
import { ExternalLink, Calendar, CheckCircle, Database, BarChart3, Lock, Network, Activity } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import ProjectArchitectureViewer from './ProjectArchitectureViewer';
import AnimatedCounter from './AnimatedCounter';
import MagneticButton from './MagneticButton';
import { projectArchitectures } from '../data/projectArchitectures';

export default function ProjectCard({ project }) {
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const isHotelProject = project.id === 'hotel-management-system';
  const architecture = projectArchitectures[project.id];

  return (
    <article className={`glass-card rounded-2xl overflow-hidden border ${
      isHotelProject
        ? 'border-blue-200/80 hover:border-blue-400/80 dark:hover:border-blue-500/40'
        : 'border-violet-200/80 hover:border-violet-400/80 dark:hover:border-violet-500/40'
    } dark:border-white/10 flex flex-col justify-between transition-all duration-300 group`}>
      
      {/* Subtle Top Border Gradient Accent */}
      <div className={`h-1 w-full ${
        isHotelProject
          ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 dark:from-blue-500/40 dark:via-indigo-500/40 dark:to-cyan-500/40'
          : 'bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-400 dark:from-indigo-500/40 dark:via-violet-500/40 dark:to-blue-400/40'
      }`} />

      {/* Card Header & Visual Badge */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium ${
            isHotelProject
              ? 'bg-blue-50/90 text-blue-900 border-blue-200/80 dark:bg-blue-950/40 dark:text-cyan-300 dark:border-blue-800/40'
              : 'bg-violet-50/90 text-violet-900 border-violet-200/80 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800/40'
          } border shadow-xs transition-colors`}>
            {isHotelProject ? <Database className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> : <BarChart3 className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />}
            {project.badge}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 transition-colors">
            <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            {project.period}
          </span>
        </div>

        {/* Title and Summary */}
        <div className="space-y-2">
          <h3 className={`text-2xl font-display font-bold text-slate-900 dark:text-white ${
            isHotelProject ? 'group-hover:text-blue-700 dark:group-hover:text-cyan-300' : 'group-hover:text-violet-700 dark:group-hover:text-violet-300'
          } transition-colors`}>
            {project.title}
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">
            {project.summary}
          </p>
        </div>

        {/* Project Metrics Area */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider transition-colors flex items-center gap-1.5 font-semibold">
              <Activity className={`w-3.5 h-3.5 ${isHotelProject ? 'text-blue-600 dark:text-cyan-400' : 'text-indigo-600 dark:text-violet-400'}`} />
              <span>Project Metrics</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-500">
              {isHotelProject ? "7 Verified Benchmarks" : "Verified Outcomes"}
            </span>
          </div>

          <div className={`grid ${isHotelProject ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-2 sm:grid-cols-4'} gap-2.5`}>
            {project.stats.map((stat, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl ${
                  isHotelProject
                    ? 'bg-blue-50/50 hover:bg-blue-50/80 border-blue-100/90 hover:border-blue-300/80 dark:hover:border-blue-500/30'
                    : 'bg-violet-50/50 hover:bg-violet-50/80 border-violet-100/90 hover:border-violet-300/80 dark:hover:border-violet-500/30'
                } dark:bg-dark-900/80 dark:hover:bg-dark-850/90 border dark:border-white/5 transition-all duration-200 group/stat`}
              >
                <div className={`text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white ${
                  isHotelProject ? 'group-hover/stat:text-blue-700 dark:group-hover/stat:text-cyan-300' : 'group-hover/stat:text-violet-700 dark:group-hover/stat:text-violet-300'
                } transition-colors`}>
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate mt-0.5 transition-colors">
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
        <div>
          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 font-semibold transition-colors">Technology Stack</div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium ${
                  isHotelProject
                    ? 'bg-blue-50/80 border-blue-200/70 text-blue-950 dark:text-blue-300'
                    : 'bg-violet-50/80 border-violet-200/70 text-violet-950 dark:text-violet-300'
                } dark:bg-dark-900 border dark:border-white/10 transition-colors`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Highlights from Resume */}
        <div className="space-y-2.5 pt-2">
          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider font-semibold transition-colors">Engineering Highlights</div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className={`w-4 h-4 ${isHotelProject ? 'text-blue-600 dark:text-cyan-400' : 'text-indigo-600 dark:text-violet-400'} shrink-0 mt-0.5`} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Footer: Action Links */}
      <div className="p-6 sm:p-8 pt-0 border-t border-slate-200 dark:border-white/5 mt-4 flex flex-wrap items-center justify-between gap-3 transition-colors">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Architecture Action */}
          {architecture && (
            <MagneticButton
              as="button"
              type="button"
              onClick={() => setIsArchitectureOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300/80 dark:bg-cyber-emerald/15 dark:hover:bg-cyber-emerald/25 dark:text-cyber-emerald dark:border-cyber-emerald/30 transition-all duration-200 group/arch focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-sm"
              aria-haspopup="dialog"
              aria-expanded={isArchitectureOpen}
            >
              <Network className="w-3.5 h-3.5 text-emerald-600 dark:text-cyber-emerald transition-transform group-hover/arch:scale-110" />
              <span>View Architecture</span>
            </MagneticButton>
          )}

          {/* GitHub Action */}
          {project.links.github ? (
            <MagneticButton
              as="a"
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-slate-950 border border-slate-200/90 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white dark:border-white/10 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </MagneticButton>
          ) : (
            <div
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono bg-slate-100 dark:bg-dark-900/80 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 cursor-not-allowed transition-colors"
              title="Repository link placeholder (configurable in src/data/projects.js)"
            >
              <Lock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
              <span>Repository [Configurable]</span>
            </div>
          )}

          {/* Demo Action */}
          {project.links.demo ? (
            <MagneticButton
              as="a"
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300/80 dark:bg-cyber-emerald/15 dark:hover:bg-cyber-emerald/25 dark:text-cyber-emerald dark:border-cyber-emerald/30 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demonstration</span>
            </MagneticButton>
          ) : (
            <div
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono bg-slate-100 dark:bg-dark-900/80 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 cursor-not-allowed transition-colors"
              title="Console application / Demo video link configurable in src/data/projects.js"
            >
              <span>{isHotelProject ? "Console App / Standalone" : "Python Script / Analytics"}</span>
            </div>
          )}
        </div>

        <span className="text-[11px] font-mono text-slate-500">
          ID: {project.id}
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
