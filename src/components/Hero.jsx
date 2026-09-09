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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-emerald/30 bg-cyber-emerald/10 text-cyber-emerald text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Software Engineering & AI/ML Opportunities</span>
            </div>

            {/* Name & Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">{personalData.name}</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-300 tracking-wide flex flex-wrap items-center gap-2">
                <span className="text-white">Computer Science Engineer</span>
                <span className="text-slate-600">|</span>
                <span className="text-cyber-cyan">AI/ML Enthusiast</span>
                <span className="text-slate-600">|</span>
                <span className="text-cyber-emerald">Backend Developer</span>
              </p>
            </div>

            {/* Supporting Text strictly from resume */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              {personalData.tagline}
            </p>

            {/* Visual Discipline Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>Deep Learning & NLP</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                <Database className="w-3.5 h-3.5 text-cyber-emerald" />
                <span>Java · MySQL · JDBC</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                <Code className="w-3.5 h-3.5 text-cyber-indigo" />
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-medium text-sm border border-white/15 hover:border-white/30 transition-all duration-200"
              >
                <span>Contact Me</span>
                <Send className="w-4 h-4 text-cyber-cyan" />
              </a>

              <a
                href="/Kunaal_Resume.pdf"
                download="Kunaal_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-transparent hover:bg-white/5 text-slate-300 hover:text-white font-medium text-sm border border-slate-700/80 hover:border-slate-500 transition-all duration-200"
                title="Download Kunaal's Resume"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              {personalData.highlights.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-bold font-display text-white">
                    {item.value}
                  </div>
                  <div className="text-xs text-slate-400 font-sans">
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
