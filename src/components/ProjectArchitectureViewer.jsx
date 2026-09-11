import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  FileSpreadsheet,
  Table,
  Calculator,
  BarChart3
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

/**
 * Get human-readable layer role name for console card header
 */
function getLayerRoleHeader(node, index) {
  if (!node) return `LAYER ${String(index + 1).padStart(2, '0')}`;
  
  switch (node.id) {
    case 'app-tier':
      return 'PRESENTATION LAYER';
    case 'jdbc-tier':
      return 'DATA ACCESS LAYER';
    case 'db-tier':
      return 'PERSISTENCE LAYER';
    case 'csv-storage':
      return 'PERSISTENCE / STORAGE LAYER';
    case 'pandas-layer':
      return 'DATA TRANSFORMATION LAYER';
    case 'processing-layer':
      return 'ANALYTICAL ENGINE LAYER';
    case 'viz-layer':
      return 'VISUALIZATION LAYER';
    default:
      return (node.role || `LAYER ${index + 1}`).toUpperCase();
  }
}

/**
 * ProjectArchitectureViewer
 * 
 * A keyboard-accessible, portal-mounted architecture visualization modal
 * styled as a premium developer-console / IDE window.
 * 
 * Strictly grounded in verified resume metrics and project architecture data.
 */
export default function ProjectArchitectureViewer({ isOpen, onClose, architecture }) {
  const [activeNodeId, setActiveNodeId] = useState(architecture?.nodes?.[0]?.id || 'app-tier');
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
  const scrollContainerRef = useRef(null);
  const previousFocusRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Smooth close transition
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 180);
  }, [onClose]);

  // Trap focus, handle Escape key, and lock body scroll cleanly
  useEffect(() => {
    if (!isOpen) return;

    // Save triggering element to restore focus when closed
    previousFocusRef.current = document.activeElement;
    
    // Lock page background scrolling and tag body for performance pauses
    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.body.classList.add('modal-open');

    // Focus close button on mount
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
        if (!focusableElements.length) return;
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
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
      document.body.classList.remove('modal-open');
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, handleClose]);

  if (!isOpen || !architecture || typeof document === 'undefined') return null;

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

  const getNodeIcon = (node, className = "w-5 h-5") => {
    const key = typeof node === 'string' ? node : (node?.icon || node?.id);
    switch (key) {
      case 'file-spreadsheet':
      case 'csv-storage':
        return <FileSpreadsheet className={`${className} text-emerald-600 dark:text-cyan-400`} />;
      case 'table':
      case 'pandas-layer':
        return <Table className={`${className} text-blue-600 dark:text-cyan-400`} />;
      case 'calculator':
      case 'processing-layer':
        return <Calculator className={`${className} text-indigo-600 dark:text-indigo-400`} />;
      case 'chart':
      case 'viz-layer':
        return <BarChart3 className={`${className} text-cyan-600 dark:text-cyan-400`} />;
      case 'app-tier':
        return <Terminal className={`${className} text-blue-600 dark:text-cyan-400`} />;
      case 'jdbc-tier':
        return <Cpu className={`${className} text-indigo-600 dark:text-indigo-400`} />;
      case 'db-tier':
        return <Database className={`${className} text-cyan-600 dark:text-cyan-400`} />;
      default:
        return <Layers className={`${className} text-slate-400`} />;
    }
  };

  const isConnectionHighlighted = (fromId, toId) => {
    if (!activeNodeId) return false;
    return activeNodeId === fromId || activeNodeId === toId;
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="arch-modal-title"
      aria-describedby="arch-modal-desc"
    >
      {/* 
        Independent Dark Backdrop Overlay 
        - Separate sibling so its opacity/blur NEVER cascades to the modal dialog
        - Promoted to GPU layer with translateZ(0) to prevent re-compositing during modal scroll
      */}
      <div
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-200 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ transform: 'translateZ(0)' }}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* 
        Modal Dialog Positioning Wrapper 
        - pointer-events-none allows backdrop clicks on padding areas
        - Hardware accelerated entrance/exit transform
      */}
      <div
        className={`relative z-[101] w-full h-full flex items-center justify-center p-3 sm:p-4 md:p-6 pointer-events-none transition-[opacity,transform] duration-200 ease-out ${
          isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        style={{ transform: 'translateZ(0)' }}
      >
        {/* 
          Developer Console Window Container
          - Opaque solid surface: bg-white in light mode, bg-[#0c121e] in dark mode
          - pointer-events-auto restores interaction
          - No inherited opacity or washed-out filters
        */}
        <div
          ref={modalRef}
          className="pointer-events-auto relative w-full max-w-4xl max-h-[88vh] rounded-2xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-white/10 shadow-2xl shadow-slate-950/50 flex flex-col overflow-hidden"
        >
          {/* Top Thin Blue/Cyan Accent Line */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 shrink-0" />

          {/* Sticky/Fixed Developer Console Header */}
          <div className="sticky top-0 z-20 px-5 py-4 sm:px-7 sm:py-5 bg-slate-50 dark:bg-[#080d16] border-b border-slate-200 dark:border-white/10 shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0 flex-1">
                {/* Window Meta Chrome Bar */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {/* Console Window Dots */}
                  <div className="flex items-center gap-1.5 mr-1 select-none" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  </div>

                  {/* Project Name Badge */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-cyan-300 border border-blue-200 dark:border-blue-800/40">
                    <Sparkles className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
                    {projectName}
                  </span>

                  {/* High-level Architecture Flow Subtitle */}
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate max-w-[280px] sm:max-w-md">
                    // {subtitle}
                  </span>
                </div>

                {/* Primary Title */}
                <h2
                  id="arch-modal-title"
                  className="text-lg sm:text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight"
                >
                  {title}
                </h2>

                {/* Architecture Summary */}
                <p
                  id="arch-modal-desc"
                  className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed line-clamp-2 sm:line-clamp-none"
                >
                  {summary}
                </p>
              </div>

              {/* Close Button [ X ] */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                className="p-2 sm:p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-200/80 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300/80 dark:border-white/10 transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Close architecture viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 
            Dedicated Modal Scroll Container
            - Dedicated single scroll container with overscroll-contain & touchmomentum
            - Promoted to GPU layer with translateZ(0) for 60fps smooth scrolling
          */}
          <div
            ref={scrollContainerRef}
            className="overflow-y-auto p-5 sm:p-7 space-y-7 custom-scrollbar flex-1 overscroll-contain"
            style={{
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
              transform: 'translateZ(0)',
              willChange: 'scroll-position'
            }}
          >
            
            {/* Section 1: Verified Performance Metrics Grid */}
            <div className="space-y-3" style={{ contain: 'layout paint' }}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider font-semibold">
                  <Activity className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>Verified Resume Performance Metrics</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-500">
                  {metrics.length} Verified Benchmarks
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#080d16] border border-slate-200 dark:border-white/5 transition-colors hover:border-blue-400 dark:hover:border-cyan-400/40 group"
                  >
                    <div className="text-lg sm:text-xl font-bold font-mono text-blue-600 dark:text-cyan-400 group-hover:text-blue-700 dark:group-hover:text-cyan-300 transition-colors">
                      <AnimatedCounter value={metric.value} />
                    </div>
                    <div className="text-xs font-medium text-slate-800 dark:text-slate-200 mt-0.5">
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

            {/* Featured Analytical Highlight (if available) */}
            {architecture.featuredHighlight && (
              <div className="p-4 sm:p-5 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40" style={{ contain: 'layout paint' }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-cyan-300 border border-blue-300 dark:border-blue-800/40">
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
                    <div className="shrink-0 px-3 py-1.5 rounded-lg bg-white dark:bg-[#0c121e] border border-blue-300/80 dark:border-blue-700/50 text-xs font-mono font-semibold text-blue-700 dark:text-cyan-300 shadow-xs">
                      {architecture.featuredHighlight.metricCallout}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section 2: Core Principles & Concepts Filter */}
            <div className="space-y-3" style={{ contain: 'layout paint' }}>
              <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>
                  {architecture.id === 'student-grade-tracker'
                    ? 'Project Capabilities & Principles'
                    : 'Core Highlighted Concepts'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-500 font-normal lowercase">(click to view detail)</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {corePrinciples.map((item, idx) => {
                  const isSelected = activePrinciple?.name === item.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePrinciple(isSelected ? null : item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-blue-600 dark:bg-cyan-600 text-white border-blue-600 dark:border-cyan-500 shadow-sm'
                          : 'bg-slate-100 dark:bg-[#080d16] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-cyan-400 hover:text-blue-600 dark:hover:text-cyan-300'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                      <span className="font-semibold">{item.name}</span>
                    </button>
                  );
                })}
              </div>

              {activePrinciple && (
                <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-start gap-2.5 transition-all">
                  <Info className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold font-mono text-blue-800 dark:text-cyan-300 mr-1.5">
                      {activePrinciple.name}:
                    </span>
                    {activePrinciple.description}
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Interactive Architecture Flow Diagram */}
            <div className="space-y-4" style={{ contain: 'layout paint' }}>
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2 font-semibold">
                  <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>Technical Architecture & Flow Pipeline</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-500">
                  Select node to inspect details
                </span>
              </div>

              {/* Developer Console Architecture Canvas */}
              <div className="p-4 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-[#080d16] border border-slate-200 dark:border-white/10 relative">
                
                {/* Flow Pipeline Stack */}
                <div className="max-w-2xl mx-auto space-y-0 relative z-10">
                  {nodes.map((node, index) => {
                    const isActive = activeNodeId === node.id;
                    const hasConnectionBelow = index < nodes.length - 1;
                    const conn = connections[index];
                    const connActive = hasConnectionBelow && isConnectionHighlighted(node.id, nodes[index + 1].id);
                    const layerIndex = String(index + 1).padStart(2, '0');
                    const layerHeader = getLayerRoleHeader(node, index);

                    return (
                      <div key={node.id} className="relative">
                        {/* 
                          Developer Console Architecture Card
                          - Uses CSS-only hover states to eliminate React re-renders during scrolling
                        */}
                        <button
                          type="button"
                          onClick={() => setActiveNodeId(node.id)}
                          className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-colors duration-150 group ${
                            isActive
                              ? 'bg-white dark:bg-[#0c121e] border-blue-500 dark:border-cyan-400 shadow-md ring-1 ring-blue-400/40 dark:ring-cyan-400/40'
                              : 'bg-white dark:bg-[#0c121e] border-slate-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-white/20'
                          }`}
                          aria-pressed={isActive}
                        >
                          <div className="space-y-3">
                            {/* Card Top: Layer Number, Role & Tech Badges */}
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-white/5 pb-2.5">
                              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-600 dark:text-cyan-400 tracking-wider">
                                <span>{layerIndex}</span>
                                <span>/</span>
                                <span>{layerHeader}</span>
                              </div>

                              <div className="flex flex-wrap items-center gap-1.5">
                                {node.tech && (
                                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-800/40">
                                    [ {node.tech} ]
                                  </span>
                                )}
                                {node.badges?.slice(0, 2).map((badge, bIdx) => (
                                  <span
                                    key={bIdx}
                                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hidden sm:inline"
                                  >
                                    {badge}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Card Middle: Icon & Node Title */}
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                                    isActive
                                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-cyan-400/50'
                                      : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10'
                                  }`}
                                >
                                  {getNodeIcon(node)}
                                </div>

                                <div>
                                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                                    {node.title}
                                  </h3>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                                    {node.role}
                                  </p>
                                </div>
                              </div>

                              {isActive && (
                                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded bg-blue-600 dark:bg-cyan-500 text-white shrink-0 shadow-xs">
                                  INSPECTING
                                </span>
                              )}
                            </div>

                            {/* Card Bottom: Key responsibilities / highlights preview */}
                            {node.responsibilities && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
                                {node.responsibilities.slice(0, 2).map((resp, rIdx) => (
                                  <div key={rIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-400 shrink-0" />
                                    <span className="truncate">{resp}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </button>

                        {/* 
                          Non-Overlapping Clear Vertical Data-Flow Connector 
                          - Lightweight CSS transitions without continuous layout-thrashing animations
                        */}
                        {hasConnectionBelow && (
                          <div className="py-2.5 flex flex-col items-center justify-center select-none" aria-hidden="true">
                            {/* Top vertical connector line */}
                            <div className="w-[2px] h-3.5 bg-slate-300 dark:bg-slate-700 relative overflow-hidden">
                              <div className={`absolute inset-0 bg-blue-500 dark:bg-cyan-400 transition-opacity duration-200 ${connActive ? 'opacity-100' : 'opacity-40'}`} />
                            </div>

                            {/* Down indicator */}
                            <div className="-my-0.5">
                              <ArrowDown className={`w-3.5 h-3.5 ${connActive ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-600'}`} />
                            </div>

                            {/* Technical Flow Label Pill (Centered, no overlap) */}
                            {conn && (
                              <div
                                className={`my-1 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border transition-colors shadow-xs flex items-center gap-1.5 ${
                                  connActive
                                    ? 'bg-blue-50 dark:bg-[#0c121e] text-blue-700 dark:text-cyan-300 border-blue-400 dark:border-cyan-400/50'
                                    : 'bg-white dark:bg-[#0c121e] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${connActive ? 'bg-blue-500 dark:bg-cyan-400' : 'bg-slate-400 dark:bg-slate-600'}`} />
                                <span>{conn.label}</span>
                              </div>
                            )}

                            {/* Down indicator */}
                            <div className="-my-0.5">
                              <ArrowDown className={`w-3.5 h-3.5 ${connActive ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-600'}`} />
                            </div>

                            {/* Bottom vertical connector line */}
                            <div className="w-[2px] h-3.5 bg-slate-300 dark:bg-slate-700 relative overflow-hidden">
                              <div className={`absolute inset-0 bg-blue-500 dark:bg-cyan-400 transition-opacity duration-200 ${connActive ? 'opacity-100' : 'opacity-40'}`} />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 4: Active Node Detailed Technical Inspection Panel */}
            {activeNode && (
              <div className="p-5 sm:p-6 rounded-xl bg-slate-50 dark:bg-[#080d16] border border-slate-200 dark:border-white/10 space-y-4" style={{ contain: 'layout paint' }}>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 flex items-center justify-center shrink-0">
                      {getNodeIcon(activeNode)}
                    </div>
                    <div>
                      <div className="text-xs font-mono font-semibold text-blue-600 dark:text-cyan-400">
                        // ACTIVE_NODE_TELEMETRY
                      </div>
                      <h4 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
                        {activeNode.title}
                      </h4>
                    </div>
                  </div>

                  <div className="text-xs font-mono px-2.5 py-1 rounded bg-white dark:bg-[#0c121e] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                    Tier: {activeNode.role}
                  </div>
                </div>

                {/* Detailed Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {activeNode.description}
                </p>

                {/* Key Technical Responsibilities List */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider font-semibold">
                    Key Technical Responsibilities
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeNode.responsibilities.map((resp, rIdx) => (
                      <li
                        key={rIdx}
                        className="p-2.5 rounded-lg bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer Bar */}
          <div className="px-5 py-3.5 sm:px-7 bg-slate-50 dark:bg-[#080d16] border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
            <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px] flex items-center gap-2">
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200 font-semibold font-mono text-[10px]">
                ESC
              </kbd>
              <span>or click outside to close</span>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/10 dark:hover:bg-white/15 dark:text-white border border-transparent dark:border-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 shadow-xs"
            >
              [ CLOSE VIEWER ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
