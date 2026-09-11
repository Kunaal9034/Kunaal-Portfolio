import React, { useState } from 'react';
import { Cpu, Play, Sparkles, BarChart2, Hash, Zap, Clock, ShieldCheck, Check } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

// Genuine client-side NLP lexicon for rule-based sentiment calculation
const SENTIMENT_LEXICON = {
  // Positive valence
  good: 1.5, great: 2.0, excellent: 2.5, optimize: 1.8, optimized: 1.8, efficiency: 1.7,
  efficient: 1.7, fast: 1.4, clean: 1.3, robust: 2.0, intelligent: 2.0, breakthrough: 2.5,
  accurate: 1.8, scalable: 1.9, love: 2.0, best: 2.2, effective: 1.6, superior: 2.0,
  innovative: 2.1, seamless: 1.7, success: 2.0, successful: 2.0, elegant: 1.8,
  // Negative valence
  bad: -1.5, error: -2.0, fail: -2.2, failure: -2.2, bug: -1.8, slow: -1.5,
  inefficient: -1.8, bottleneck: -1.9, crash: -2.5, leak: -2.0, redundant: -1.4,
  poor: -1.7, defect: -2.0, vulnerable: -2.2, risk: -1.6, degrade: -1.8
};

const COMMON_STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'it', 'this', 'that', 'are', 'was', 'were', 'be', 'been', 'as', 'from'
]);

export default function MLPlayground() {
  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.1 });
  const [contentRef, contentRevealed] = useScrollReveal({ threshold: 0.1 });

  const [activeTab, setActiveTab] = useState('nlp');
  const [inputText, setInputText] = useState(
    'Deep learning models and normalized database schemas significantly optimize backend performance and eliminate redundant execution bottlenecks.'
  );

  const [results, setResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const samplePrompts = [
    'Deep learning models and normalized schemas optimize backend performance.',
    'System suffered from manual reservation errors, slow query bottlenecks, and memory leaks.',
    'Algorithmic data structures and clean OOP architecture deliver scalable results.'
  ];

  const runNLPModel = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const startTime = performance.now();

      // 1. Tokenization
      const rawTokens = inputText
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter(t => t.length > 0);

      const totalTokens = rawTokens.length;

      // 2. Vocabulary & Stopword Filtering
      const filteredTokens = rawTokens.filter(t => !COMMON_STOPWORDS.has(t));
      const uniqueTokens = new Set(rawTokens);
      const uniqueFiltered = new Set(filteredTokens);

      // 3. Lexical Diversity
      const lexicalDiversity = totalTokens > 0 
        ? ((uniqueTokens.size / totalTokens) * 100).toFixed(1) 
        : 0;

      // 4. Term Frequency (TF)
      const frequencyMap = {};
      filteredTokens.forEach(token => {
        frequencyMap[token] = (frequencyMap[token] || 0) + 1;
      });

      const topKeywords = Object.entries(frequencyMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([word, count]) => ({
          word,
          count,
          tfWeight: (count / (filteredTokens.length || 1)).toFixed(3)
        }));

      // 5. Sentiment Polarity Calculation
      let valenceSum = 0;
      let sentimentMatches = 0;

      rawTokens.forEach(token => {
        if (SENTIMENT_LEXICON[token] !== undefined) {
          valenceSum += SENTIMENT_LEXICON[token];
          sentimentMatches++;
        }
      });

      // Normalize polarity between -1.0 and +1.0
      let polarity = 0;
      if (sentimentMatches > 0) {
        polarity = Math.max(-1, Math.min(1, valenceSum / (sentimentMatches * 2)));
      }

      let classification = 'NEUTRAL';
      if (polarity > 0.15) classification = 'POSITIVE (OPTIMIZED)';
      else if (polarity < -0.15) classification = 'NEGATIVE (BOTTLENECK DETECTED)';

      const endTime = performance.now();
      const executionTimeMs = (endTime - startTime).toFixed(2);

      setResults({
        totalTokens,
        uniqueTokens: uniqueTokens.size,
        contentTokens: filteredTokens.length,
        lexicalDiversity,
        polarity: polarity.toFixed(2),
        classification,
        sentimentMatches,
        topKeywords,
        executionTimeMs
      });

      setIsProcessing(false);
    }, 150);
  };

  return (
    <section id="playground" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 light-tint-edu transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-14 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono tracking-wider text-blue-700 dark:text-cyber-cyan bg-blue-50/90 dark:bg-dark-800/90 border border-blue-200/80 dark:border-cyber-cyan/30 shadow-xs transition-colors">
            <span className="text-cyan-600 dark:text-cyber-cyan font-bold">05</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">AI_ML_PLAYGROUND</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-blue-600 dark:text-cyber-cyan">client_inference.js</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Interactive ML & NLP Engine
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Client-side mathematical processing engine executing real-time tokenization, lexical density, and sentiment polarity directly in your browser.
          </p>
        </div>

        {/* Playground Container */}
        <div ref={contentRef} className={`max-w-4xl mx-auto glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0c121e]/90 shadow-xl transition-colors reveal-init ${contentRevealed ? 'revealed' : ''}`}>
          
          {/* Top Window Chrome */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />
          <div className="px-5 py-3 bg-slate-100/80 dark:bg-[#080d16] border-b border-slate-200/80 dark:border-white/5 flex flex-wrap items-center justify-between gap-3 select-none">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-xs text-slate-700 dark:text-slate-300 font-semibold ml-1">
                ml_inference_console.sh
              </span>
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('nlp')}
                className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                  activeTab === 'nlp'
                    ? 'bg-blue-600 text-white dark:bg-cyan-500/20 dark:text-cyan-300 border border-transparent dark:border-cyan-500/40'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/5'
                }`}
              >
                [ NLP Feature Extractor ]
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('deeplearning')}
                className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                  activeTab === 'deeplearning'
                    ? 'bg-blue-600 text-white dark:bg-cyan-500/20 dark:text-cyan-300 border border-transparent dark:border-cyan-500/40'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/5'
                }`}
              >
                [ Deep Learning ONNX ]
              </button>
            </div>
          </div>

          {activeTab === 'nlp' ? (
            /* Active NLP Model Tab */
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Sample Prompts */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>PRESET TEST CORPUS:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {samplePrompts.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setInputText(sample)}
                      className="px-2.5 py-1 text-[11px] font-mono text-left rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-dark-900 dark:hover:bg-dark-850 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 hover:border-cyan-500/40 transition-colors truncate max-w-full"
                    >
                      Sample 0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="space-y-2 font-mono">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <label htmlFor="nlp-input" className="font-semibold flex items-center gap-1.5">
                    <span className="text-cyan-600 dark:text-cyan-400">&gt;</span>
                    <span>INPUT_TEXT_CORPUS:</span>
                  </label>
                  <span className="text-[11px]">{inputText.length} chars</span>
                </div>
                <textarea
                  id="nlp-input"
                  rows={3}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text to analyze with client-side NLP algorithms..."
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-300/80 dark:border-white/10 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all resize-none"
                />
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between font-mono">
                <button
                  type="button"
                  onClick={runNLPModel}
                  disabled={isProcessing || !inputText.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isProcessing ? 'CALCULATING INFERENCE...' : '[ RUN NLP MODEL ]'}</span>
                </button>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% Genuine Client Execution (0 API Keys)</span>
                </span>
              </div>

              {/* Computed Output Display */}
              {results && (
                <div className="pt-6 border-t border-slate-200 dark:border-white/10 space-y-5 animate-fadeIn font-mono">
                  <div className="flex items-center justify-between text-xs text-cyan-600 dark:text-cyan-400 font-bold">
                    <span>// MODEL_OUTPUT_TELEMETRY:</span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>latency: {results.executionTimeMs} ms</span>
                    </span>
                  </div>

                  {/* Summary Metric Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-dark-950 border border-slate-200 dark:border-white/5">
                      <div className="text-[10px] text-slate-500">TOTAL_TOKENS</div>
                      <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                        {results.totalTokens}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-dark-950 border border-slate-200 dark:border-white/5">
                      <div className="text-[10px] text-slate-500">UNIQUE_TERMS</div>
                      <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                        {results.uniqueTokens}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-dark-950 border border-slate-200 dark:border-white/5">
                      <div className="text-[10px] text-slate-500">LEXICAL_DENSITY</div>
                      <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mt-1">
                        {results.lexicalDiversity}%
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-dark-950 border border-slate-200 dark:border-white/5">
                      <div className="text-[10px] text-slate-500">SENTIMENT_POLARITY</div>
                      <div className={`text-xl font-bold mt-1 ${
                        Number(results.polarity) > 0 ? 'text-emerald-600 dark:text-emerald-400' : Number(results.polarity) < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-300'
                      }`}>
                        {results.polarity}
                      </div>
                    </div>
                  </div>

                  {/* Classification Banner */}
                  <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Classified Polarity State:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {results.classification}
                    </span>
                  </div>

                  {/* Top Extracted Terms */}
                  {results.topKeywords.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        TOP_EXTRACTED_CONTENT_TERMS (TERM FREQUENCY WEIGHTS):
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {results.topKeywords.map((kw, idx) => (
                          <div
                            key={idx}
                            className="px-3 py-1.5 rounded-lg bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2"
                          >
                            <span className="font-bold text-cyan-600 dark:text-cyan-400">{kw.word}</span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              freq: {kw.count} · tf: {kw.tfWeight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          ) : (
            /* Deep Learning Coming Soon Tab */
            <div className="p-8 sm:p-10 text-center font-mono space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-dark-900 border border-slate-300 dark:border-white/10 flex items-center justify-center mx-auto text-cyan-600 dark:text-cyan-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <div className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Deep Neural Network Inference (NVIDIA Certified)
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  STATUS: COMING SOON // ONNX RUNTIME ENGINE
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed pt-2">
                  Client-side WebAssembly / ONNX Runtime execution for GPU-accelerated deep neural networks is currently in engineering development. To maintain genuine portfolio integrity, no mocked AI responses are generated.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
