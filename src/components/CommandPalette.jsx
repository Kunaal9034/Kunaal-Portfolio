import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, CornerDownLeft, ExternalLink, FileText, Moon, Sun, X, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { personalData } from '../data/personal';
import { useTheme } from '../context/ThemeContext';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const actions = [
    // Navigation
    { id: 'home', label: 'Go to Home', group: 'Navigation', icon: Terminal, action: () => navigateTo('#home') },
    { id: 'about', label: 'Go to About', group: 'Navigation', icon: Terminal, action: () => navigateTo('#about') },
    { id: 'skills', label: 'Go to Skills', group: 'Navigation', icon: Terminal, action: () => navigateTo('#skills') },
    { id: 'projects', label: 'Go to Projects', group: 'Navigation', icon: Terminal, action: () => navigateTo('#projects') },
    { id: 'github', label: 'Go to GitHub Repositories', group: 'Navigation', icon: Terminal, action: () => navigateTo('#github') },
    { id: 'playground', label: 'Go to AI / ML Playground', group: 'Navigation', icon: Terminal, action: () => navigateTo('#playground') },
    { id: 'workflow', label: 'Go to Engineering Workflow', group: 'Navigation', icon: Terminal, action: () => navigateTo('#workflow') },
    { id: 'education', label: 'Go to Education', group: 'Navigation', icon: Terminal, action: () => navigateTo('#education') },
    { id: 'certifications', label: 'Go to Certifications', group: 'Navigation', icon: Terminal, action: () => navigateTo('#certifications') },
    { id: 'activities', label: 'Go to Activities', group: 'Navigation', icon: Terminal, action: () => navigateTo('#activities') },
    { id: 'achievements', label: 'Go to Achievements', group: 'Navigation', icon: Terminal, action: () => navigateTo('#achievements') },
    { id: 'contact', label: 'Go to Contact', group: 'Navigation', icon: Terminal, action: () => navigateTo('#contact') },
    // Quick Actions
    { id: 'resume', label: 'Download Resume (PDF)', group: 'Actions', icon: FileText, action: () => downloadResume() },
    { id: 'open-github', label: 'Open GitHub Profile', group: 'Actions', icon: GithubIcon, action: () => window.open('https://github.com/Kunaal9034', '_blank') },
    { id: 'open-linkedin', label: 'Open LinkedIn Profile', group: 'Actions', icon: LinkedinIcon, action: () => window.open('https://www.linkedin.com/in/kunaal90/', '_blank') },
    { id: 'toggle-theme', label: `Toggle Theme (${theme === 'dark' ? 'Light Mode' : 'Dark Mode'})`, group: 'Actions', icon: theme === 'dark' ? Sun : Moon, action: () => toggleTheme() }
  ];

  const navigateTo = (hash) => {
    setIsOpen(false);
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
    setIsOpen(false);
    const link = document.createElement('a');
    link.href = '/Kunaal_Resume.pdf';
    link.download = 'Kunaal_Resume.pdf';
    link.click();
  };

  // Keyboard shortcut listener: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  // Filtered actions based on search query
  const filteredActions = actions.filter(action =>
    action.label.toLowerCase().includes(query.toLowerCase()) ||
    action.group.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handlePaletteKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredActions.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div 
        className="w-full max-w-xl glass-card rounded-2xl overflow-hidden border border-slate-300 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/95 shadow-2xl transition-all font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Accent Bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

        {/* Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-white/5 flex items-center gap-3">
          <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handlePaletteKeyDown}
            placeholder="Type a command or search sections..."
            className="w-full bg-transparent border-none text-slate-900 dark:text-white text-xs sm:text-sm font-mono focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close Command Palette"
            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-72 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {filteredActions.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400">
              No matching commands found.
            </div>
          ) : (
            filteredActions.map((action, idx) => {
              const isSelected = selectedIndex === idx;
              const Icon = action.icon;

              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => action.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs transition-colors select-none ${
                    isSelected
                      ? 'bg-blue-600 text-white dark:bg-cyan-500/20 dark:text-cyan-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-3.5 h-3.5 shrink-0 opacity-80" />
                    <span className="font-medium truncate">{action.label}</span>
                  </div>
                  <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${
                    isSelected
                      ? 'border-white/30 text-white dark:border-cyan-400/40 dark:text-cyan-300'
                      : 'border-slate-200 dark:border-white/5 text-slate-400 dark:text-slate-500'
                  }`}>
                    {action.group}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint Bar */}
        <div className="px-4 py-2 bg-slate-100/90 dark:bg-dark-950/80 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 select-none">
          <div className="flex items-center gap-2">
            <span>Use</span>
            <span className="px-1.5 py-0.5 rounded bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 font-bold">↑</span>
            <span className="px-1.5 py-0.5 rounded bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 font-bold">↓</span>
            <span>to navigate</span>
            <span className="px-1.5 py-0.5 rounded bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 font-bold">↵</span>
            <span>to select</span>
          </div>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
