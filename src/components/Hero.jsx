import React from 'react';
import { ArrowDown, FileText, Send, Code, Cpu, Database } from 'lucide-react';
import Terminal from './Terminal';
import { personalData } from '../data/personal';

export default function Hero() {

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Introduction & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Status pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-600/30 dark:border-cyber-emerald/30 bg-emerald-50 dark:bg-cyber-emerald/10 text-emerald-700 dark:text-cyber-emerald text-xs font-medium transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Software Engineering & AI/ML Opportunities</span>
            </div>

            {/* Name & Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight transition-colors">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">{personalData.name}</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium tracking-wide flex flex-wrap items-center gap-2">
                <span className="text-slate-900 dark:text-white transition-colors">Computer Science Engineer</span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span className="text-cyan-700 dark:text-cyber-cyan transition-colors">AI/ML Enthusiast</span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span className="text-emerald-700 dark:text-cyber-emerald transition-colors">Backend Developer</span>
              </p>
            </div>

            {/* Supporting Text strictly from resume */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed transition-colors">
              {personalData.tagline}
            </p>

            {/* Visual Discipline Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 transition-colors">
                <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyber-cyan" />
                <span>Deep Learning & NLP</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 transition-colors">
                <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-cyber-emerald" />
                <span>Java · MySQL · JDBC</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 transition-colors">
                <Code className="w-3.5 h-3.5 text-indigo-600 dark:text-cyber-indigo" />
                <span>500+ DSA Solved</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyber-emerald hover:bg-emerald-400 text-dark-950 font-semibold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all duration-200 group"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-200/90 hover:border-slate-300 shadow-sm dark:bg-slate-900/90 dark:hover:bg-slate-800 dark:text-white dark:border-white/15 dark:hover:border-white/30 dark:shadow-none transition-all duration-200"
              >
                <span>Contact Me</span>
                <Send className="w-4 h-4 text-cyan-600 dark:text-cyber-cyan" />
              </a>

              <a
                href="/Kunaal_Resume.pdf"
                download="Kunaal_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 dark:hover:bg-white/5 dark:text-slate-300 dark:hover:text-white dark:border-slate-700/80 dark:hover:border-slate-500 transition-all duration-200"
                title="Download Kunaal's Resume"
              >
                <FileText className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200 dark:border-white/10 transition-colors">
              {personalData.highlights.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white transition-colors">
                    {item.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-sans transition-colors">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Interactive Terminal */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Terminal />
          </div>

        </div>
      </div>
    </section>
  );
}
