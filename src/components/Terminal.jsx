import React, { useState } from 'react';
import { Terminal as TerminalIcon, Copy, Check, Sparkles } from 'lucide-react';

export default function Terminal() {
  const [activeTab, setActiveTab] = useState('identity');
  const [copied, setCopied] = useState(false);

  const tabs = {
    identity: [
      { cmd: 'developer --name Kunaal', output: 'Kunaal' },
      { cmd: 'specialization', output: 'AI / ML' },
      { cmd: 'languages', output: 'Python · Java · C' },
      { cmd: 'focus', output: 'Backend · AI · DSA' },
      { cmd: 'problems-solved', output: '500+' }
    ],
    academics: [
      { cmd: 'institution', output: 'Galgotias University, Greater Noida' },
      { cmd: 'degree', output: 'B.Tech — CSE (AI/ML) [2024 – 2028]' },
      { cmd: 'cgpa', output: '7.95 / 10' },
      { cmd: 'certification', output: 'Fundamentals of Deep Learning — NVIDIA' }
    ],
    backend: [
      { cmd: 'core-stack', output: 'Java · MySQL · JDBC · OOP' },
      { cmd: 'projects', output: 'Hotel Management System (Java/JDBC), Student Grade Tracker (Python)' },
      { cmd: 'leadership', output: 'Led backend & database design across 4-member teams (2+ assignments)' }
    ]
  };

  const currentLines = tabs[activeTab];

  const handleCopy = () => {
    const textToCopy = currentLines.map(l => `$ ${l.cmd}\n> ${l.output}`).join('\n\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-dark-900/90 shadow-2xl shadow-cyber-emerald/5 backdrop-blur-xl transition-all duration-300 hover:border-cyber-emerald/30">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-dark-950/80 border-b border-white/5 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
          <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-cyber-emerald" />
            kunaal@dev-core:~
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('identity')}
            className={`px-2 py-0.5 text-xs font-mono rounded transition-colors ${
              activeTab === 'identity'
                ? 'bg-cyber-emerald/15 text-cyber-emerald font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            identity.sh
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('academics')}
            className={`px-2 py-0.5 text-xs font-mono rounded transition-colors ${
              activeTab === 'academics'
                ? 'bg-cyber-emerald/15 text-cyber-emerald font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            edu.env
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('backend')}
            className={`px-2 py-0.5 text-xs font-mono rounded transition-colors ${
              activeTab === 'backend'
                ? 'bg-cyber-emerald/15 text-cyber-emerald font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            stack.sys
          </button>

          <button
            type="button"
            onClick={handleCopy}
            title="Copy terminal contents"
            aria-label="Copy terminal text"
            className="p-1 ml-1 text-slate-400 hover:text-white rounded hover:bg-white/5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-cyber-emerald" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="p-5 font-mono text-xs sm:text-sm space-y-3 leading-relaxed">
        <div className="text-slate-500 pb-1 border-b border-white/5 flex items-center justify-between">
          <span className="flex items-center gap-1 text-[11px]">
            <Sparkles className="w-3 h-3 text-cyber-cyan" />
            Simulated Developer Environment // Mode: Read-only
          </span>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            ACTIVE
          </span>
        </div>

        {currentLines.map((line, idx) => (
          <div key={idx} className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
            <span className="text-slate-500 select-none flex items-center gap-1.5">
              <span className="text-cyber-emerald">$</span>
              <span className="text-slate-300">{line.cmd}</span>
            </span>
            <span className="text-cyber-cyan font-medium sm:ml-auto group-hover:text-cyber-emerald transition-colors">
              {line.output}
            </span>
          </div>
        ))}

        {/* Blinking cursor prompt */}
        <div className="pt-2 flex items-center gap-2 text-slate-400">
          <span className="text-cyber-emerald">$</span>
          <span className="text-slate-500 text-xs">awaiting next challenge</span>
          <span className="inline-block w-2 h-4 bg-cyber-emerald animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}
