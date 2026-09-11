import React from 'react';
import { ArrowDown, FileText, Send, Code, Cpu, Database } from 'lucide-react';
import Terminal from './Terminal';
import ProfilePhoto from './ProfilePhoto';
import GradientOrbs from './GradientOrbs';
import MagneticButton from './MagneticButton';
import AnimatedCounter from './AnimatedCounter';
import { personalData } from '../data/personal';

export default function Hero() {

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden light-tint-hero">
      {/* Interactive Ambient Gradient Orbs */}
      <GradientOrbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Introduction & CTAs */}
          {/* Left Column: Introduction & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status pill badge */}
            <div className="hero-reveal-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-300/80 dark:border-cyan-500/30 bg-blue-50/90 dark:bg-dark-900/90 text-blue-900 dark:text-cyan-300 text-xs font-mono font-medium shadow-xs transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Software Engineering & AI/ML Opportunities</span>
            </div>

            {/* Name & Command Prompts */}
            <div className="hero-reveal-2 space-y-3">
              <div className="font-mono text-xs text-indigo-600 dark:text-cyan-400 flex items-center gap-2 select-none">
                <span className="text-slate-400 dark:text-slate-500">$</span>
                <span className="font-semibold">whoami</span>
                <span className="w-1.5 h-3.5 bg-cyan-500 animate-pulse inline-block align-middle" aria-hidden="true" />
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight transition-colors">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-white dark:via-slate-200 dark:to-cyan-300">{personalData.name}</span>
              </h1>

              <div className="space-y-1 pt-1">
                <div className="font-mono text-[11px] text-slate-500 dark:text-slate-500 select-none flex items-center gap-1.5">
                  <span>$</span>
                  <span>role</span>
                </div>
                <p className="text-base sm:text-lg font-mono font-medium tracking-wide flex flex-wrap items-center gap-2">
                  <span className="text-slate-900 dark:text-slate-100 transition-colors">Computer Science Engineer</span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <span className="text-cyan-700 dark:text-cyan-400 transition-colors">AI/ML Enthusiast</span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <span className="text-indigo-600 dark:text-indigo-400 transition-colors">Backend Developer</span>
                </p>
              </div>
            </div>

            {/* Supporting Text strictly from resume */}
            <p className="hero-reveal-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed transition-colors">
              {personalData.tagline}
            </p>

            {/* Visual Discipline Badges */}
            <div className="hero-reveal-4 flex flex-wrap gap-2.5 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-cyan-50/80 dark:bg-dark-900 border border-cyan-200/80 dark:border-cyan-500/20 text-cyan-900 dark:text-cyan-300 transition-colors">
                <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Deep Learning & NLP</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-blue-50/80 dark:bg-dark-900 border border-blue-200/80 dark:border-blue-500/20 text-blue-900 dark:text-blue-300 transition-colors">
                <Database className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Java · MySQL · JDBC</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-indigo-50/80 dark:bg-dark-900 border border-indigo-200/80 dark:border-indigo-500/20 text-indigo-900 dark:text-indigo-300 transition-colors">
                <Code className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>500+ DSA Solved</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hero-reveal-5 flex flex-wrap items-center gap-3.5 pt-2 font-mono">
              <MagneticButton
                as="a"
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 dark:from-blue-500 dark:via-indigo-500 dark:to-cyan-400 dark:text-dark-950 transition-all duration-200 group border border-cyan-400/30"
              >
                <span>[ VIEW PROJECTS ↓ ]</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </MagneticButton>

              <MagneticButton
                as="a"
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/95 hover:bg-slate-50 text-slate-800 hover:text-slate-950 border border-slate-300/80 hover:border-cyan-500/60 shadow-xs dark:bg-dark-900 dark:hover:bg-dark-850 dark:text-slate-200 dark:border-white/10 dark:hover:border-cyan-500/40 dark:shadow-none text-xs font-bold transition-all duration-200"
              >
                <span>[ CONTACT ME ✉ ]</span>
                <Send className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              </MagneticButton>

              <MagneticButton
                as="a"
                href="/Kunaal_Resume.pdf"
                download="Kunaal_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/80 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-300/80 hover:border-slate-400 dark:bg-dark-950/60 dark:hover:bg-dark-900 dark:text-slate-300 dark:hover:text-white dark:border-white/10 text-xs font-medium transition-all duration-200"
                title="Download Kunaal's Resume"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>[ RESUME ↓ ]</span>
              </MagneticButton>
            </div>

            {/* Metrics Ribbon */}
            <div className="hero-reveal-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6 border-t border-slate-200/90 dark:border-white/10 transition-colors">
              {personalData.highlights.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-100/90 dark:bg-dark-900/80 border border-slate-200/90 dark:border-white/10 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all hover:-translate-y-0.5"
                  >
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-500 select-none mb-1">
                      0{idx + 1}_METRIC
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white transition-colors">
                      <AnimatedCounter value={item.value} />
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-0.5 transition-colors">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Profile Photo + Interactive Terminal */}
          <div className="hero-reveal-4 lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-xl flex flex-col items-center gap-5 sm:gap-6">
              <ProfilePhoto />
              <Terminal />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
