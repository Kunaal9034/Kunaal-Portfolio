import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Database,
  Terminal,
  Cpu,
  Layers,
  CheckCircle2,
  Sparkles,
  ArrowDown,
  Info,
  ShieldCheck,
  Zap,
  Activity,
  Maximize2,
  FileSpreadsheet,
  Table,
  Calculator,
  BarChart3,
  LineChart,
  TrendingUp
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

/**
 * ProjectArchitectureViewer
 * 
 * A reusable, keyboard-accessible, animated architecture visualization modal.
 * Designed for portfolio projects to display technical flows, architectural layers,
 * core engineering highlights, and resume-grounded performance metrics.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Callback to close modal
 * @param {Object} props.architecture - Architecture data configuration
 */
export default function ProjectArchitectureViewer({ isOpen, onClose, architecture }) {
  const [activeNodeId, setActiveNodeId] = useState(architecture?.nodes?.[0]?.id || 'app-tier');
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [activePrinciple, setActivePrinciple] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  // Sync active node when architecture prop changes
  useEffect(() => {
    if (architecture?.nodes?.[0]?.id) {
      setActiveNodeId(architecture.nodes[0].id);
      setActivePrinciple(null);
    }
  }, [architecture]);

  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Handle smooth closing animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  }, [onClose]);

  // Trap focus and handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element to restore focus on close
    previousFocusRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    // Focus close button initially
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      } else if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, handleClose]);

  if (!isOpen || !architecture) return null;

  const {
    projectName,
    title,
    subtitle,
    summary,
    nodes = [],
    connections = [],
    metrics = [],
    corePrinciples = []
  } = architecture;

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  const getNodeIcon = (node) => {
    const key = typeof node === 'string' ? node : (node?.icon || node?.id);
    switch (key) {
      case 'file-spreadsheet':
      case 'csv-storage':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-cyber-emerald" />;
      case 'table':
      case 'pandas-layer':
        return <Table className="w-5 h-5 text-cyan-600 dark:text-cyber-cyan" />;
      case 'calculator':
      case 'processing-layer':
        return <Calculator className="w-5 h-5 text-indigo-600 dark:text-cyber-indigo" />;
      case 'chart':
      case 'viz-layer':
        return <BarChart3 className="w-5 h-5 text-teal-600 dark:text-cyber-teal" />;
      case 'app-tier':
        return <Terminal className="w-5 h-5 text-emerald-600 dark:text-cyber-emerald" />;
      case 'jdbc-tier':
        return <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyber-cyan" />;
      case 'db-tier':
        return <Database className="w-5 h-5 text-indigo-600 dark:text-cyber-indigo" />;
      default:
        return <Layers className="w-5 h-5 text-slate-400" />;
    }
  };

  // Determine if a connection is highlighted based on active or hovered nodes
  const isConnectionHighlighted = (fromId, toId) => {
    const focusId = hoveredNodeId || activeNodeId;
    if (!focusId) return false;
    if (focusId === fromId || focusId === toId) return true;
    return false;
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto transition-opacity duration-200 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="arch-modal-title"
      aria-describedby="arch-modal-desc"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div
        ref={modalRef}
        className={`relative w-full max-w-5xl my-auto rounded-2xl bg-white dark:bg-dark-900 border border-slate-200/90 dark:border-white/10 shadow-2xl shadow-emerald-950/20 overflow-hidden flex flex-col max-h-[92vh] z-10 transition-all duration-300 transform ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 dark:from-blue-500 dark:via-indigo-500 dark:to-cyan-400 z-20" />

        {/* Top Header Bar */}
        <div className="relative px-6 py-5 sm:px-8 border-b border-slate-200/80 dark:border-white/10 bg-gradient-to-r from-white via-slate-50 to-blue-50/20 dark:bg-dark-950/80 backdrop-blur-md flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-blue-100/80 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40">
                <Sparkles className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
                {projectName}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                • {subtitle}
              </span>
            </div>
            <h2
              id="arch-modal-title"
              className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white"
            >
              {title}
            </h2>
            <p id="arch-modal-desc" className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              {summary}
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Close architecture viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-7 md:p-8 space-y-8 custom-scrollbar">
          
          {/* Section 1: Verified Project Metrics Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>Verified Resume Performance Metrics</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-500">
                {metrics.length} Verified Benchmarks
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-gradient-to-br from-white via-slate-50 to-blue-50/20 dark:bg-dark-950/60 border border-slate-200/80 dark:border-white/5 transition-all hover:border-blue-400 dark:hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5 group"
                >
                  <div className="text-lg sm:text-xl font-bold font-display text-blue-700 dark:text-cyan-300 group-hover:text-blue-800 dark:group-hover:text-cyan-200 transition-colors">
                    <AnimatedCounter value={metric.value} />
                  </div>
                  <div className="text-xs font-medium text-slate-800 dark:text-slate-300 mt-0.5">
                    {metric.label}
                  </div>
                  {metric.highlight && (
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1 truncate">
                      {metric.highlight}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Featured Capability Highlight (e.g. Subject-Wise Comparison) */}
          {architecture.featuredHighlight && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-transparent border border-blue-500/30 dark:border-blue-500/30 relative overflow-hidden transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800/40">
                      {architecture.featuredHighlight.badge}
                    </span>
                    <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                      {architecture.featuredHighlight.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {architecture.featuredHighlight.description}
                  </p>
                </div>

                {architecture.featuredHighlight.metricCallout && (
                  <div className="shrink-0 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-dark-900/90 border border-blue-400/40 dark:border-blue-500/30 text-xs font-mono font-semibold text-blue-700 dark:text-cyan-300 shadow-xs">
                    {architecture.featuredHighlight.metricCallout}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section 2: Core Engineering Principles & Capabilities Filter */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-500 dark:text-cyber-cyan" />
              <span>
                {architecture.id === 'student-grade-tracker'
                  ? 'Project Capabilities & Principles'
                  : 'Core Highlighted Concepts'}
              </span>
              <span className="text-[11px] text-slate-400 font-normal lowercase">(click to view detail)</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {corePrinciples.map((item, idx) => {
                const isSelected = activePrinciple?.name === item.name;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePrinciple(isSelected ? null : item)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20'
                        : 'bg-slate-100 dark:bg-dark-950/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-indigo-400/60 hover:text-indigo-600 dark:hover:text-cyan-400'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                    <span className="font-semibold">{item.name}</span>
                  </button>
                );
              })}
            </div>

            {activePrinciple && (
              <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 text-xs sm:text-sm text-slate-700 dark:text-slate-200 flex items-start gap-2.5 transition-all">
                <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold font-mono text-indigo-800 dark:text-indigo-300 mr-1.5">
                    {activePrinciple.name}:
                  </span>
                  {activePrinciple.description}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Interactive Visual Architecture Flow Diagram */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
                <span>Technical Architecture Flow Pipeline</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                Interactive: Click or hover nodes to inspect
              </span>
            </div>

            {/* Architecture Canvas */}
            <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 dark:bg-dark-950/90 border border-slate-200/80 dark:border-white/10 relative overflow-hidden">
              
              {/* Flow Pipeline Stack */}
              <div className="space-y-6 sm:space-y-8 relative z-10 max-w-2xl mx-auto">
                {nodes.map((node, index) => {
                  const isActive = activeNodeId === node.id;
                  const isHovered = hoveredNodeId === node.id;
                  const hasConnectionBelow = index < nodes.length - 1;
                  const conn = connections[index];
                  const connActive = hasConnectionBelow && isConnectionHighlighted(node.id, nodes[index + 1].id);

                  return (
                    <div key={node.id} className="relative">
                      {/* Node Card Button */}
                      <button
                        type="button"
                        onClick={() => setActiveNodeId(node.id)}
                        onMouseEnter={() => setHoveredNodeId(node.id)}
                        onMouseLeave={() => setHoveredNodeId(null)}
                        onFocus={() => setHoveredNodeId(node.id)}
                        onBlur={() => setHoveredNodeId(null)}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 group ${
                          isActive
                            ? 'bg-white dark:bg-dark-850 border-blue-500 dark:border-cyan-400 shadow-lg shadow-blue-500/10 ring-1 ring-blue-400/40'
                            : isHovered
                            ? 'bg-white/95 dark:bg-dark-850/80 border-blue-200 dark:border-white/20 -translate-y-0.5'
                            : 'bg-white/90 dark:bg-dark-900/80 border-slate-200/90 dark:border-white/5'
                        }`}
                        aria-pressed={isActive}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-start sm:items-center gap-3">
                            <div
                              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                                isActive
                                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800/40'
                                  : 'bg-slate-100 dark:bg-dark-800 border-slate-200 dark:border-white/10'
                              }`}
                            >
                              {getNodeIcon(node)}
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                  {node.role}
                                </span>
                              </div>
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                                <span>{node.title}</span>
                                {isActive && (
                                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-cyan-300 border border-blue-500/30">
                                    Inspecting
                                  </span>
                                )}
                              </h3>
                            </div>
                          </div>

                          {/* Tech badge & indicator */}
                          <div className="flex flex-wrap items-center gap-1.5 sm:self-center">
                            {node.badges.map((badge, bIdx) => (
                              <span
                                key={bIdx}
                                className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-slate-100/90 text-slate-700 dark:bg-dark-800 dark:text-slate-300 border border-slate-200/80 dark:border-white/10"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>
                      </button>

                      {/* Animated Connector to Next Node */}
                      {hasConnectionBelow && (
                        <div className="my-2 flex flex-col items-center justify-center relative py-1">
                          {/* SVG Flow Line with Animated Dashes */}
                          <div className="w-full flex items-center justify-center relative">
                            <svg
                              className="w-8 h-12 overflow-visible"
                              viewBox="0 0 32 48"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              {/* Background static line */}
                              <line
                                x1="16"
                                y1="0"
                                x2="16"
                                y2="44"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-slate-300 dark:text-slate-800"
                              />
                              {/* Animated Data-flow pulse line */}
                              <line
                                x1="16"
                                y1="0"
                                x2="16"
                                y2="44"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                className={`animate-flow-dash ${
                                  connActive
                                    ? 'text-blue-500 dark:text-cyan-400 opacity-100'
                                    : 'text-slate-400/60 dark:text-slate-700/60 opacity-50'
                                }`}
                              />
                              {/* Arrow head */}
                              <path
                                d="M12 40L16 45L20 40"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={connActive ? 'text-blue-500 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-600'}
                              />
                            </svg>

                            {/* Flow Connection Label Pill */}
                            {conn && (
                              <div
                                className={`absolute left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full text-[10px] font-mono border backdrop-blur-md transition-all whitespace-nowrap shadow-sm ${
                                  connActive
                                    ? 'bg-blue-50 dark:bg-dark-900 text-blue-700 dark:text-cyan-300 border-blue-300 dark:border-blue-800/40'
                                    : 'bg-white/95 dark:bg-dark-900/90 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10'
                                }`}
                              >
                                <span>{conn.label}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 4: Node Detailed Technical Inspection Panel */}
          {activeNode && (
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-dark-950/70 border border-slate-200/90 dark:border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/30 flex items-center justify-center shrink-0">
                    {getNodeIcon(activeNode)}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-blue-600 dark:text-cyan-400">
                      Active Node Inspection
                    </div>
                    <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                      {activeNode.title}
                    </h4>
                  </div>
                </div>

                <div className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-200/80 dark:bg-dark-800 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-white/10">
                  Tier: {activeNode.role}
                </div>
              </div>

              {/* Node Summary Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeNode.description}
              </p>

              {/* Responsibilities list grounded in resume */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Key Technical Responsibilities
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeNode.responsibilities.map((resp, rIdx) => (
                    <li
                      key={rIdx}
                      className="p-2.5 rounded-xl bg-white dark:bg-dark-900 border border-slate-200/80 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-dark-950/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px] flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-dark-800 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200 font-semibold">
              Esc
            </kbd>
            <span>or click outside to close</span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-xl font-medium bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 dark:text-white border border-transparent dark:border-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Close Architecture
          </button>
        </div>
      </div>
    </div>
  );
}
