import React from 'react';
import { certificationsData } from '../data/certifications';
import { Award, CheckCircle, Calendar, ShieldCheck, Cpu } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Certifications() {
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.1 });
  const [certsGridRef, certsGridRevealed] = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="certifications" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 bg-slate-50/50 dark:bg-dark-950/40 light-tint-certs transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className={`text-center max-w-2xl mx-auto mb-16 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-amber-800 dark:text-cyber-amber bg-amber-50/90 dark:bg-cyber-amber/10 border border-amber-200/80 dark:border-cyber-amber/20 transition-colors shadow-sm shadow-amber-500/5">
            <Award className="w-3.5 h-3.5 text-amber-600 dark:text-cyber-amber" />
            <span>Verified Credentials</span>
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
                className={`glass-card rounded-2xl p-7 border flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isNvidia
                    ? 'border-cyan-200/80 dark:border-white/10 bg-gradient-to-br from-white/95 via-cyan-50/20 to-blue-50/25 dark:bg-dark-900/60 hover:border-cyan-500/50 hover:shadow-cyan-500/10'
                    : 'border-amber-200/80 dark:border-white/10 bg-gradient-to-br from-white/95 via-amber-50/20 to-orange-50/25 dark:bg-dark-900/60 hover:border-amber-500/50 hover:shadow-amber-500/10'
                }`}
              >
                {/* Glow accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -z-10 transition-all duration-500 ${
                  isNvidia ? 'bg-cyan-500/10 group-hover:bg-cyan-500/20' : 'bg-amber-500/10 group-hover:bg-amber-500/20'
                }`} />

                <div className="space-y-4">
                  {/* Issuer & Year */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                        isNvidia
                          ? 'bg-cyan-50 dark:bg-white/5 border-cyan-200/80 dark:border-white/10 text-cyan-600 dark:text-cyan-400'
                          : 'bg-amber-50 dark:bg-white/5 border-amber-200/80 dark:border-white/10 text-amber-600 dark:text-amber-400'
                      }`}>
                        {isNvidia ? <Cpu className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-semibold uppercase text-slate-600 dark:text-slate-400 transition-colors">
                          {cert.issuer}
                        </span>
                        <div className={`text-[11px] font-mono transition-colors ${
                          isNvidia ? 'text-cyan-700 dark:text-cyan-300' : 'text-amber-700 dark:text-amber-300'
                        }`}>
                          {cert.badge}
                        </div>
                      </div>
                    </div>

                    <span className={`flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded border transition-colors ${
                      isNvidia
                        ? 'text-cyan-800 dark:text-slate-400 bg-cyan-50/70 dark:bg-dark-900 border-cyan-200/70 dark:border-white/5'
                        : 'text-amber-800 dark:text-slate-400 bg-amber-50/70 dark:bg-dark-900 border-amber-200/70 dark:border-white/5'
                    }`}>
                      <Calendar className="w-3 h-3 text-slate-500 dark:text-slate-500" />
                      {cert.year}
                    </span>
                  </div>

                  {/* Certification Title */}
                  <h3 className={`text-xl font-display font-bold text-slate-900 dark:text-white transition-colors ${
                    isNvidia ? 'group-hover:text-cyan-700 dark:group-hover:text-cyan-300' : 'group-hover:text-amber-700 dark:group-hover:text-amber-300'
                  }`}>
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">
                    {cert.description}
                  </p>
                </div>

                {/* Card verification footer */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 transition-colors">
                  <span className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400">
                    <CheckCircle className="w-4 h-4" />
                    Verified Credential
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Resume Verified
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
