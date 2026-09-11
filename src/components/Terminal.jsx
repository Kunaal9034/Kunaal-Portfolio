import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Terminal as TerminalIcon, Copy, Check, Sparkles, CornerDownLeft, RotateCcw } from 'lucide-react';
import { personalData } from '../data/personal';
import { projectsData } from '../data/projects';
import { educationData } from '../data/education';
import { certificationsData } from '../data/certifications';
import { achievementsData } from '../data/achievements';

// Memoized terminal log entries display to eliminate re-renders on keystrokes
const TerminalLogs = memo(function TerminalLogs({ logs }) {
  return (
    <>
      {logs.map((log) => {
        if (log.type === 'system') {
          return (
            <div key={log.id} className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>{log.content}</span>
            </div>
          );
        }

        if (log.type === 'cmd') {
          return (
            <div key={log.id} className="space-y-1">
              {/* Command input prompt line */}
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold">
                <span className="text-emerald-600 dark:text-cyan-400 select-none">$</span>
                <span>{log.cmd}</span>
              </div>

              {/* Output lines */}
              {Array.isArray(log.output) ? (
                <div className="pl-4 space-y-0.5 text-slate-700 dark:text-slate-300 border-l border-cyan-500/30">
                  {log.output.map((outLine, idx) => (
                    <div 
                      key={idx} 
                      className={outLine.startsWith('AVAILABLE') || outLine.startsWith('TECHNICAL') || outLine.startsWith('VERIFIED') || outLine.startsWith('ACADEMIC') ? 'text-cyan-700 dark:text-cyan-400 font-bold' : ''}
                    >
                      {outLine}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pl-4 text-slate-700 dark:text-slate-300 border-l border-cyan-500/30">
                  {log.output}
                </div>
              )}
            </div>
          );
        }

        return null;
      })}
    </>
  );
});

const QUICK_PILLS = ['help', 'whoami', 'skills', 'projects', 'education', 'contact', 'clear'];

export default function Terminal() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([]);
  const [historyPointer, setHistoryPointer] = useState(-1);
  const [copied, setCopied] = useState(false);

  // Initial welcome message and output log
  const [logs, setLogs] = useState([
    {
      id: 'init-1',
      type: 'system',
      content: 'Kunaal DevCore Shell v2.4 [x86_64-apple-darwin / linux-elf]'
    },
    {
      id: 'init-2',
      type: 'system',
      content: 'Type "help" to view commands, or click the quick pills below.'
    },
    {
      id: 'init-3',
      type: 'cmd',
      cmd: 'whoami',
      output: [
        'Kunaal // Computer Science Engineer',
        'Specialization: AI / ML · Deep Learning · Backend Systems',
        'Available for Software Engineering & AI/ML Opportunities'
      ]
    }
  ]);

  const logContainerRef = useRef(null);
  const inputRef = useRef(null);
  const isNearBottomRef = useRef(true);

  // Track if the user has manually scrolled up to avoid interrupting reading
  const handleScroll = useCallback(() => {
    const el = logContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    isNearBottomRef.current = distanceFromBottom <= 40;
  }, []);

  // Container-only auto-scroll: strictly scrolls terminal output container, never the window
  useEffect(() => {
    const el = logContainerRef.current;
    if (!el) return;
    if (isNearBottomRef.current) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [logs]);

  // Execute terminal command
  const executeCommand = useCallback((cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    // Add to command history
    setHistory(prev => [trimmed, ...prev]);
    setHistoryPointer(-1);

    const lower = trimmed.toLowerCase();
    let responseOutput = null;

    switch (lower) {
      case 'help':
        responseOutput = [
          'AVAILABLE COMMANDS:',
          '  whoami          Display identity, role, and specialization',
          '  skills          List core programming languages and technical skills',
          '  projects        Display verified software engineering projects & metrics',
          '  education       View academic background and credentials',
          '  certifications  List industry certifications (e.g. NVIDIA)',
          '  achievements    Show competitive programming & leadership milestones',
          '  contact         Display verified contact details',
          '  socials         Show verified external developer profiles',
          '  clear           Clear terminal screen (or press Ctrl+L)'
        ];
        break;

      case 'whoami':
        responseOutput = [
          `NAME: ${personalData.name}`,
          `ROLE: Computer Science Engineer | AI/ML Enthusiast | Backend Developer`,
          `ACADEMIC FOCUS: Galgotias University, B.Tech CSE (AI/ML) [CGPA: 7.95/10]`,
          `STATUS: Active · Open for Software Engineering & AI/ML opportunities`
        ];
        break;

      case 'skills':
        responseOutput = [
          'TECHNICAL SKILLS MANIFEST:',
          '  • Languages:      Python, Java, C',
          '  • AI / ML:        Machine Learning, Deep Learning (NVIDIA Certified), NLP, Generative AI',
          '  • Databases:      MySQL, SQL, JDBC (Normalized Relational Schemas)',
          '  • Web & Tools:    HTML, CSS, JavaScript, Git, GitHub, Linux, VS Code',
          '  • Problem Solving: 500+ DSA problems solved across platforms'
        ];
        break;

      case 'projects':
        responseOutput = [
          'VERIFIED PROJECT ARCHITECTURES:',
          ...projectsData.flatMap(p => [
            `► ${p.title} [${p.techStack.join(' · ')}]`,
            `  Summary:  ${p.summary}`,
            `  Metrics:  ${p.stats.map(s => `${s.label}: ${s.value}`).join(' | ')}`,
            ''
          ])
        ];
        break;

      case 'education':
        responseOutput = [
          'ACADEMIC PROFILE:',
          ...educationData.map(e => `  • ${e.degree} — ${e.institution} (${e.period}) [${e.score}]`)
        ];
        break;

      case 'certifications':
        responseOutput = [
          'INDUSTRY & ACADEMIC CERTIFICATIONS:',
          ...certificationsData.map(c => `  • ${c.title} — ${c.issuer} (${c.year}) [${c.badge}]`)
        ];
        break;

      case 'achievements':
        responseOutput = [
          'KEY ENGINEERING ACHIEVEMENTS:',
          ...achievementsData.map(a => `  • [${a.metric}] ${a.title} — ${a.description}`)
        ];
        break;

      case 'contact':
        responseOutput = [
          'VERIFIED CONTACT CHANNELS:',
          `  • Email:    ${personalData.contact.email}`,
          `  • Phone:    ${personalData.contact.phone}`,
          `  • Location: ${personalData.contact.location}`
        ];
        break;

      case 'socials':
        responseOutput = [
          'DEVELOPER PROFILES:',
          ...personalData.socials.map(s => `  • ${s.name.padEnd(10)}: ${s.url}`)
        ];
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      default:
        responseOutput = [
          `bash: command not found: ${trimmed}`,
          'Type "help" to view all available commands.'
        ];
        break;
    }

    // Always ensure new command output scrolls into view in terminal container
    isNearBottomRef.current = true;

    setLogs(prev => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        type: 'cmd',
        cmd: trimmed,
        output: responseOutput
      }
    ]);

    setInputVal('');
  }, []);

  const handleKeyDown = (e) => {
    // Stop event from propagating to window/global listeners
    e.stopPropagation();

    // Ctrl + L or Cmd + L clears screen
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setLogs([]);
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextPointer = Math.min(historyPointer + 1, history.length - 1);
        setHistoryPointer(nextPointer);
        setInputVal(history[nextPointer] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer > 0) {
        const nextPointer = historyPointer - 1;
        setHistoryPointer(nextPointer);
        setInputVal(history[nextPointer] || '');
      } else if (historyPointer === 0) {
        setHistoryPointer(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'whoami', 'skills', 'projects', 'education', 'certifications', 'achievements', 'contact', 'socials', 'clear'];
      const match = commands.find(c => c.startsWith(inputVal.trim().toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const handleCopy = useCallback(() => {
    const textToCopy = logs
      .map(l => {
        if (l.type === 'system') return `[SYS] ${l.content}`;
        if (l.type === 'cmd') {
          const out = Array.isArray(l.output) ? l.output.join('\n') : l.output;
          return `$ ${l.cmd}\n${out}`;
        }
        return '';
      })
      .join('\n\n');

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [logs]);

  // Click on terminal body safely focuses input without window scroll
  const handleTerminalContainerClick = (e) => {
    if (e.target.closest('button, a, input')) return;
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <div 
      className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden border border-slate-300/80 dark:border-white/10 bg-slate-100/95 dark:bg-[#0c121e]/95 shadow-xl shadow-slate-200/60 dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 dark:hover:border-cyan-500/30 text-left"
      onClick={handleTerminalContainerClick}
    >
      {/* Top Gradient Accent Bar */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/90 dark:bg-dark-950/80 border-b border-slate-200 dark:border-white/5 select-none transition-colors">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
          <span className="ml-2 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors font-medium">
            <TerminalIcon className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>kunaal@dev-core:~</span>
          </span>
        </div>

        {/* Quick Utilities */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>INTERACTIVE</span>
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLogs([]);
            }}
            title="Reset / Clear screen"
            aria-label="Clear terminal"
            className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded hover:bg-slate-200/70 dark:hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            title="Copy terminal session"
            aria-label="Copy terminal text"
            className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded hover:bg-slate-200/70 dark:hover:bg-white/5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-cyber-emerald" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Screen / Log Display */}
      <div 
        ref={logContainerRef}
        onScroll={handleScroll}
        className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] space-y-3 leading-relaxed max-h-[290px] sm:max-h-[320px] overflow-y-auto overscroll-contain custom-scrollbar isolate"
        style={{
          overscrollBehaviorY: 'contain',
          WebkitOverflowScrolling: 'touch',
          transform: 'translateZ(0)'
        }}
        role="region"
        aria-label="Interactive Terminal Log"
        aria-live="polite"
      >
        <TerminalLogs logs={logs} />
      </div>

      {/* Interactive Command Input Line */}
      <div className="px-4 py-2.5 bg-slate-200/60 dark:bg-dark-900/90 border-t border-slate-200 dark:border-white/5 transition-colors">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            executeCommand(inputVal);
          }}
          className="flex items-center gap-2"
        >
          <label htmlFor="terminal-input" className="text-emerald-600 dark:text-cyan-400 font-mono text-xs select-none font-bold">
            $&gt;
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command ('help', 'whoami', 'skills', etc)..."
            autoComplete="off"
            spellCheck="false"
            className="flex-1 bg-transparent border-none text-slate-900 dark:text-white font-mono text-xs sm:text-sm focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 selection:bg-cyan-500/30"
          />
          <button
            type="submit"
            aria-label="Execute command"
            className="p-1 rounded bg-slate-300/70 dark:bg-white/10 hover:bg-cyan-500 hover:text-white text-slate-700 dark:text-slate-300 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Suggestion Pills for Touch & Fast Desktop Access */}
        <div className="flex items-center gap-1.5 pt-2 overflow-x-auto no-scrollbar select-none">
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0 mr-0.5">Quick:</span>
          {QUICK_PILLS.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                executeCommand(pill);
                inputRef.current?.focus({ preventScroll: true });
              }}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/80 dark:bg-dark-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all shrink-0"
            >
              [{pill}]
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
