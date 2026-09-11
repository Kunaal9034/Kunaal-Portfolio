import React from 'react';
import { Activity, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { personalData } from '../data/personal';

export default function SystemStatus() {
  const telemetry = [
    { label: 'SYSTEM_CORE', value: 'Kunaal.ai // v2.4' },
    { label: 'RUNTIME_STATUS', value: 'ONLINE [STABLE]', isLive: true },
    { label: 'ENGINEERING_MODE', value: 'DEVELOPER_CONSOLE' },
    { label: 'PRIMARY_FOCUS', value: 'AI / ML & BACKEND SYSTEMS' },
    { label: 'ACADEMIC_TRACK', value: 'B.TECH CSE (AI/ML) · 7.95 CGPA' },
    { label: 'DSA_BENCHMARK', value: '500+ PROBLEMS SOLVED' },
    { label: 'AVAILABILITY', value: 'OPEN FOR SWE & AI/ML ROLES', isBadge: true }
  ];

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 shadow-lg font-mono transition-colors">
      {/* Top Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

      {/* Header */}
      <div className="px-4 py-2.5 bg-slate-100/80 dark:bg-[#080d16] border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span className="font-bold text-slate-900 dark:text-white">SYSTEM_STATUS.SYS</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>VERIFIED_FACTS</span>
        </div>
      </div>

      {/* Telemetry rows */}
      <div className="p-4 sm:p-5 space-y-2 text-xs">
        {telemetry.map((item, idx) => (
          <div 
            key={idx} 
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1.5 border-b border-slate-100 dark:border-white/5 last:border-none"
          >
            <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium">
              {item.label}
            </span>
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
              {item.isLive && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
              )}
              {item.isBadge ? (
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50">
                  {item.value}
                </span>
              ) : (
                <span>{item.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
