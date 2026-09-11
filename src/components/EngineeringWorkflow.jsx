import React, { useState } from 'react';
import { GitCommit, Cpu, CheckCircle2, ShieldAlert, ArrowRight, Terminal } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function EngineeringWorkflow() {
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.1 });
  const [pipelineRef, pipelineRevealed] = useScrollReveal({ threshold: 0.1 });
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: '01',
      title: 'PLAN',
      tag: 'spec.analysis',
      summary: 'Decompose core requirements, outline problem constraints, and define data modeling boundaries.',
      details: [
        'Analyze system functional requirements and operational edge cases',
        'Identify data entities, integrity constraints, and schema relationships',
        'Establish performance benchmarks and error reduction goals'
      ]
    },
    {
      id: '02',
      title: 'DESIGN',
      tag: 'schema.architect',
      summary: 'Design modular software architectures and normalize relational databases to minimize redundancy.',
      details: [
        'Architect multi-tier boundaries separating UI, business logic, and persistence',
        'Normalize relational tables to 3NF, cutting data redundancy by ~60%',
        'Define clean object-oriented class hierarchies and interface contracts'
      ]
    },
    {
      id: '03',
      title: 'IMPLEMENT',
      tag: 'code.compile',
      summary: 'Write robust, maintainable code in Java or Python with strict exception safety and input validation.',
      details: [
        'Implement CRUD operations with rigorous parameterized input validation',
        'Use try-with-resources to eliminate JDBC connection leaks',
        'Leverage vectorized Pandas and NumPy pipelines for high-throughput data processing'
      ]
    },
    {
      id: '04',
      title: 'TEST',
      tag: 'verify.bench',
      summary: 'Execute comprehensive transaction testing, profile query speeds, and ensure leak-free stability.',
      details: [
        'Run 100+ simulated test transactions to verify ACID compliance',
        'Benchmark database query execution times (~35% speed improvement)',
        'Validate visual analytics outputs (Matplotlib) against ground truth metrics'
      ]
    },
    {
      id: '05',
      title: 'DEPLOY',
      tag: 'git.release',
      summary: 'Package code with version control, clear repository structures, and reproducible documentation.',
      details: [
        'Commit clean, atomic git commits with informative branch management',
        'Document architecture diagrams, schemas, and usage specifications',
        'Ensure zero regressions and reproducible local environment setups'
      ]
    }
  ];

  return (
    <section id="workflow" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 light-tint-projects transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-16 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono tracking-wider text-blue-700 dark:text-cyber-cyan bg-blue-50/90 dark:bg-dark-800/90 border border-blue-200/80 dark:border-cyber-cyan/30 shadow-xs transition-colors">
            <span className="text-cyan-600 dark:text-cyber-cyan font-bold">06</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">ENGINEERING_PROCESS</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-blue-600 dark:text-cyber-cyan">pipeline.workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            How I Engineer Systems
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            A disciplined, 5-stage software engineering pipeline ensuring stability, normalization, and measurable performance.
          </p>
        </div>

        {/* Workflow Pipeline Grid */}
        <div ref={pipelineRef} className={`reveal-init ${pipelineRevealed ? 'revealed' : ''} space-y-8`}>
          
          {/* Horizontal Step Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono">
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group select-none ${
                    isSelected
                      ? 'bg-white dark:bg-dark-900 border-cyan-500 shadow-md shadow-cyan-500/15'
                      : 'bg-slate-50 dark:bg-[#0c121e]/80 border-slate-200 dark:border-white/10 hover:border-cyan-500/40'
                  }`}
                >
                  {/* Top indicator bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 transition-all ${
                    isSelected ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400' : 'bg-transparent group-hover:bg-cyan-500/40'
                  }`} />

                  <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mb-1">
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">{step.id}</span>
                    <span className="text-[10px]">{step.tag}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Card */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 shadow-xl transition-all font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  STAGE {steps[activeStep].id} //
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {steps[activeStep].title} PHASE
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                protocol: {steps[activeStep].tag}
              </span>
            </div>

            <div className="py-5 space-y-4">
              <p className="text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                {steps[activeStep].summary}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider">
                  Verified Engineering Deliverables:
                </div>
                <ul className="space-y-2 font-sans text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {steps[activeStep].details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-cyber-emerald shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
              <button
                type="button"
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-cyan-500 disabled:opacity-40 transition-colors"
              >
                ← Previous Stage
              </button>

              <div className="flex items-center gap-1">
                {steps.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeStep === idx ? 'w-5 bg-cyan-500' : 'bg-slate-300 dark:bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:border-cyan-500 disabled:opacity-40 transition-colors"
              >
                Next Stage →
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
