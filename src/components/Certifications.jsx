import React from 'react';
import { certificationsData } from '../data/certifications';
import { Award, CheckCircle, Calendar, ShieldCheck, Cpu } from 'lucide-react';

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-cyber-teal bg-cyber-teal/10 border border-cyber-teal/20">
            <Award className="w-3.5 h-3.5" />
            Verified Credentials
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Certifications & Training
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Professional certifications and institutional training programs completed during engineering study.
          </p>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificationsData.map((cert) => {
            const isNvidia = cert.issuer === 'NVIDIA';
            return (
              <div
                key={cert.id}
                className="glass-card rounded-2xl p-7 border border-white/10 hover:border-cyber-emerald/40 flex flex-col justify-between relative overflow-hidden group transition-all duration-300"
              >
                {/* Glow accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -z-10 transition-all duration-500 ${
                  isNvidia ? 'bg-emerald-500/10 group-hover:bg-emerald-500/20' : 'bg-cyan-500/10 group-hover:bg-cyan-500/20'
                }`} />

                <div className="space-y-4">
                  {/* Issuer & Year */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyber-emerald">
                        {isNvidia ? <Cpu className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-semibold uppercase text-slate-400">
                          {cert.issuer}
                        </span>
                        <div className="text-[11px] text-cyber-cyan font-mono">
                          {cert.badge}
                        </div>
                      </div>
                    </div>

                    <span className="flex items-center gap-1 text-xs font-mono text-slate-400 px-2.5 py-1 rounded bg-dark-900 border border-white/5">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {cert.year}
                    </span>
                  </div>

                  {/* Certification Title */}
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-cyber-emerald transition-colors">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Card verification footer */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyber-emerald">
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
