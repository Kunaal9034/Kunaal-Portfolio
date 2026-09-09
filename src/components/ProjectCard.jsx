import React from 'react';
import { ExternalLink, Calendar, CheckCircle, Database, BarChart3, Lock } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

export default function ProjectCard({ project }) {
  const isHotelProject = project.id === 'hotel-management-system';

  return (
    <article className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-cyber-emerald/40 flex flex-col justify-between transition-all duration-300 group">
      
      {/* Card Header & Visual Badge */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-emerald-50 dark:bg-cyber-emerald/10 text-emerald-700 dark:text-cyber-emerald border border-emerald-300/80 dark:border-cyber-emerald/30 transition-colors">
            {isHotelProject ? <Database className="w-3.5 h-3.5" /> : <BarChart3 className="w-3.5 h-3.5" />}
            {project.badge}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 transition-colors">
            <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            {project.period}
          </span>
        </div>

        {/* Title and Summary */}
        <div className="space-y-2">
          <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-cyber-emerald transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">
            {project.summary}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div>
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 transition-colors">Technology Stack</div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-dark-900 border border-slate-200/80 dark:border-white/10 text-cyan-800 dark:text-cyber-cyan transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl bg-slate-100/90 dark:bg-dark-900/80 border border-slate-200 dark:border-white/5 transition-colors">
          {project.stats.map((stat, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <div className="text-lg font-bold font-display text-slate-900 dark:text-white transition-colors">{stat.value}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate transition-colors">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Key Highlights from Resume */}
        <div className="space-y-2.5 pt-2">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors">Engineering Highlights</div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-cyber-emerald shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Footer: Action Links */}
      <div className="p-6 sm:p-8 pt-0 border-t border-slate-200 dark:border-white/5 mt-4 flex flex-wrap items-center justify-between gap-3 transition-colors">
        <div className="flex items-center gap-3">
          {/* GitHub Action */}
          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-slate-950 border border-slate-200/90 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white dark:border-white/10 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </a>
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
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300/80 dark:bg-cyber-emerald/15 dark:hover:bg-cyber-emerald/25 dark:text-cyber-emerald dark:border-cyber-emerald/30 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demonstration</span>
            </a>
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

    </article>
  );
}
