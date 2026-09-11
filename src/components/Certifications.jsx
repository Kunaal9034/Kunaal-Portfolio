import React from 'react';
import { certificationsData } from '../data/certifications';
import { Award, CheckCircle, Calendar, ShieldCheck, Cpu } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Certifications() {
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.1 });
  const [certsGridRef, certsGridRevealed] = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="certifications" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 bg-slate-50/50 dark:bg-[#070c14] light-tint-certs transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className={`text-center max-w-2xl mx-auto mb-16 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono tracking-wider text-blue-700 dark:text-cyber-cyan bg-blue-50/90 dark:bg-dark-800/90 border border-blue-200/80 dark:border-cyber-cyan/30 shadow-xs transition-colors">
            <span className="text-cyan-600 dark:text-cyber-cyan font-bold">05</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">CERTIFICATIONS</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-blue-600 dark:text-cyber-cyan">verified_credentials.manifest</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Certifications & Training
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Professional certifications and institutional training programs completed during engineering study.
          </p>
        </div>

        {/* Certifications Cards Grid */}
        <div ref={certsGridRef} className={`grid grid-cols-1 md:grid-cols-2 gap-8 reveal-init ${certsGridRevealed ? 'revealed' : ''}`}>
          {certificationsData.map((cert) => {
            const isNvidia = cert.issuer === 'NVIDIA';
            return (
              <div
                key={cert.id}
                className="glass-card rounded-2xl flex flex-col justify-between border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 hover:border-blue-400 dark:hover:border-cyan-400/40 shadow-lg shadow-blue-500/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Top Accent Line */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

                {/* Window Header */}
                <div className="px-5 py-2.5 bg-slate-100/80 dark:bg-[#080d16] border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="font-mono text-xs text-slate-600 dark:text-slate-400 ml-1.5">
                      credential_{cert.id}.manifest
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300/80 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    [ VERIFIED ]
                  </span>
                </div>

                <div className="p-6 sm:p-7 space-y-4">
                  {/* Issuer & Year */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl border border-blue-200/80 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400 flex items-center justify-center transition-colors shrink-0">
                        {isNvidia ? <Cpu className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="text-xs font-mono font-semibold uppercase text-slate-600 dark:text-slate-400 transition-colors">
                          issuer: {cert.issuer}
                        </div>
                        <div className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 font-medium">
                          {cert.badge}
                        </div>
                      </div>
                    </div>

                    <span className="flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400">
                      <Calendar className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                      {cert.year}
                    </span>
                  </div>

                  {/* Certification Title */}
                  <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors font-sans">
                    {cert.description}
                  </p>
                </div>

                {/* Card verification footer */}
                <div className="px-6 py-3 bg-slate-50/70 dark:bg-dark-950/60 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 transition-colors">
                  <span className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    status: verified_credential
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    source: resume_record
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
