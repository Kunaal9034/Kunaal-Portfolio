import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Loader2, 
  RefreshCw,
  Terminal,
  Code2,
  FileCode
} from 'lucide-react';
import { personalData } from '../data/personal';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, CodolioIcon } from './BrandIcons';
import MagneticButton from './MagneticButton';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [headerRef, headerRevealed] = useScrollReveal({ threshold: 0.1 });
  const [gridRef, gridRevealed] = useScrollReveal({ threshold: 0.08 });

  const socialIcons = {
    Github: GithubIcon,
    Linkedin: LinkedinIcon,
    Code2: LeetCodeIcon,
    Terminal: CodolioIcon,
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g., name@domain.com).';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide a message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });

        // Reset the button to its original state after a reasonable delay (5 seconds)
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        throw new Error(data.error || 'Failed to deliver message.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus('error');
      setErrorMessage(
        err.message && err.message !== 'Failed to deliver message.'
          ? err.message
          : 'Unable to deliver message right now. Please check your connection and retry, or email directly to skunaal57@gmail.com.'
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 sm:py-28 lg:py-32 relative z-10 border-t border-slate-200/80 dark:border-white/5 bg-slate-50/60 dark:bg-dark-950/40 light-tint-contact transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className={`text-center max-w-2xl mx-auto mb-16 space-y-3 reveal-init ${headerRevealed ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono tracking-wider text-blue-700 dark:text-cyber-cyan bg-blue-50/90 dark:bg-dark-800/90 border border-blue-200/80 dark:border-cyber-cyan/30 shadow-xs transition-colors">
            <span className="text-cyan-600 dark:text-cyber-cyan font-bold">08</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">CONTACT</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-blue-600 dark:text-cyber-cyan">dev_console.sys</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Contact & Collaboration
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Feel free to reach out for software engineering inquiries, AI/ML discussions, or technical collaboration.
          </p>
        </div>

        {/* Contact Grid */}
        <div ref={gridRef} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start reveal-init ${gridRevealed ? 'revealed' : ''}`}>
          
          {/* Left Column: Direct Info & Social Profiles */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Channels Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-5 border border-slate-200/80 dark:border-white/10 bg-gradient-to-br from-white/95 via-blue-50/15 to-cyan-50/15 dark:bg-[#0c121e]/90 shadow-lg shadow-blue-500/5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  <h3 className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-white transition-colors">
                    <span className="text-slate-400 dark:text-slate-500 font-normal mr-1">//</span>
                    Direct Channels
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">info.config</span>
              </div>
              
              <div className="space-y-3.5 text-sm">
                {/* Email Item */}
                <div className="flex items-start justify-between p-3.5 rounded-xl bg-blue-50/50 dark:bg-dark-950/60 border border-blue-200/70 dark:border-white/5 group transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-blue-100/70 dark:bg-blue-950/40 border border-blue-300/80 dark:border-blue-800/40 flex items-center justify-center text-blue-700 dark:text-blue-400 transition-colors shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">email_address</div>
                      <a
                        href={`mailto:${personalData.contact.email}`}
                        className="font-mono text-xs sm:text-sm font-medium text-slate-900 dark:text-white hover:text-blue-700 dark:hover:text-cyan-400 transition-colors truncate block"
                      >
                        {personalData.contact.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/5 transition-colors shrink-0 ml-2"
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-cyan-50/50 dark:bg-dark-950/60 border border-cyan-200/70 dark:border-white/5 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-cyan-100/70 dark:bg-cyber-cyan/10 border border-cyan-300/80 dark:border-cyber-cyan/30 flex items-center justify-center text-cyan-700 dark:text-cyber-cyan transition-colors shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">phone_number</div>
                    <a
                      href={`tel:${personalData.contact.phone.replace(/\s+/g, '')}`}
                      className="font-mono text-xs sm:text-sm font-medium text-slate-900 dark:text-white hover:text-cyan-800 dark:hover:text-cyber-cyan transition-colors truncate block"
                    >
                      {personalData.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-indigo-50/50 dark:bg-dark-950/60 border border-indigo-200/70 dark:border-white/5 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100/70 dark:bg-cyber-indigo/10 border border-indigo-300/80 dark:border-cyber-indigo/30 flex items-center justify-center text-indigo-700 dark:text-cyber-indigo transition-colors shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">location</div>
                    <div className="font-mono text-xs sm:text-sm font-medium text-slate-900 dark:text-white transition-colors truncate">
                      {personalData.contact.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Coding Profiles */}
            <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-4 border border-slate-200/80 dark:border-white/10 bg-gradient-to-br from-white/95 via-slate-50/30 to-blue-50/15 dark:bg-[#0c121e]/90 shadow-lg shadow-blue-500/5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <h4 className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white transition-colors">
                    <span className="text-slate-400 dark:text-slate-500 font-normal mr-1">//</span>
                    Coding &amp; Profiles
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">profiles.sys</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {personalData.socials.map((social) => {
                  const Icon = socialIcons[social.icon] || CodolioIcon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white/90 hover:bg-blue-50/70 dark:bg-dark-950/70 dark:hover:bg-dark-900 border border-slate-200/90 hover:border-blue-300 dark:border-white/10 dark:hover:border-cyan-500/40 text-slate-800 hover:text-blue-950 dark:text-slate-200 dark:hover:text-white transition-all shadow-sm group"
                      title={`${social.name} Profile`}
                    >
                      <Icon className="w-4 h-4 text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
                      <span className="text-xs font-mono font-medium truncate">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Developer Code-Editor Contact Interface */}
          <div className="lg:col-span-7 relative">
            {/* Decorative Ambient Code Glow */}
            <div
              className="absolute -inset-1 sm:-inset-1.5 rounded-3xl bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-cyan-500/15 blur-xl opacity-70 pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* Code Editor Container */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-300/80 dark:border-white/10 bg-slate-100/95 dark:bg-[#0c121e]/95 shadow-2xl shadow-slate-300/40 dark:shadow-[0_25px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300">
              
              {/* Thin blue → cyan accent line along top edge */}
              <div className="h-[2.5px] w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

              {/* Window Chrome / Title Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200/90 dark:border-white/5 bg-slate-200/70 dark:bg-dark-950/80 select-none transition-colors">
                <div className="flex items-center gap-2">
                  {/* macOS / IDE Terminal Dots */}
                  <div className="flex items-center gap-1.5 mr-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/85 border border-rose-600/40 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/85 border border-amber-600/40 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/85 border border-emerald-600/40 inline-block" />
                  </div>

                  {/* Active Tab */}
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/90 dark:bg-dark-900/90 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300 shadow-sm">
                    <FileCode className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                    <span className="truncate max-w-[130px] sm:max-w-none">contact_inquiry.ts</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shrink-0" />
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded bg-blue-500/10 dark:bg-cyan-500/10 text-blue-700 dark:text-cyan-300 border border-blue-500/20 dark:border-cyan-500/20">
                    POST /api/contact
                  </span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-300/40 dark:bg-white/5 text-slate-700 dark:text-slate-300">
                    <Code2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-[11px] font-bold">&lt;/&gt;</span>
                  </div>
                </div>
              </div>

              {/* Editor Workspace */}
              <div className="relative p-5 sm:p-7 lg:p-8">
                
                {/* Decorative Faint Technical Background Watermark */}
                <div
                  className="absolute inset-0 p-6 overflow-hidden pointer-events-none select-none opacity-[0.035] dark:opacity-[0.04] font-mono text-[11px] leading-5 text-slate-800 dark:text-cyan-200 -z-0"
                  aria-hidden="true"
                >
                  <div>{`// Secure dispatch channel configuration`}</div>
                  <div>{`interface InquiryTransmission {`}</div>
                  <div>{`  name: string;`}</div>
                  <div>{`  email: string;`}</div>
                  <div>{`  message: string;`}</div>
                  <div>{`  timestamp: number;`}</div>
                  <div>{`}`}</div>
                  <div>{`export async function submitInquiry(payload: InquiryTransmission): Promise<DispatchResult> {`}</div>
                  <div>{`  return await fetch('/api/contact', {`}</div>
                  <div>{`    method: 'POST',`}</div>
                  <div>{`    headers: { 'Content-Type': 'application/json' },`}</div>
                  <div>{`    body: JSON.stringify(payload)`}</div>
                  <div>{`  });`}</div>
                  <div>{`}`}</div>
                </div>

                {/* Developer-Style Header */}
                <div className="relative z-10 mb-6 sm:mb-8 pb-5 border-b border-slate-200/90 dark:border-white/5">
                  <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                    <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <Terminal className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold">post_form</span>
                      <span className="text-slate-400 dark:text-slate-500">(</span>
                      <span className="text-slate-700 dark:text-slate-300">data</span>
                      <span className="text-slate-400 dark:text-slate-500">):</span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-white/5 px-2 py-0.5 rounded border border-slate-300/60 dark:border-white/5">
                      [ &lt;/&gt; ]
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-slate-900 dark:text-white tracking-tight break-all sm:break-normal flex items-center gap-2">
                    <span>ContactForm::submit_inquiry();</span>
                    <span className="inline-block w-2 h-5 bg-cyan-500 dark:bg-cyan-400 animate-pulse-subtle align-middle shrink-0" aria-hidden="true" />
                  </h3>
                </div>

                {/* Code-Style Form Fields */}
                <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-6">

                  {/* 01 & 02: Name Field */}
                  <div className="space-y-2">
                    {/* Line 01: Declaration */}
                    <div className="flex items-center justify-between gap-x-3 gap-y-1 flex-wrap text-xs sm:text-sm font-mono">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="text-slate-400 dark:text-slate-600 select-none w-5 sm:w-7 text-right font-mono text-xs shrink-0" aria-hidden="true">
                          01
                        </span>
                        <label htmlFor="contact-name" className="cursor-pointer">
                          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">const</span>{' '}
                          <span className="text-slate-800 dark:text-slate-200 font-medium">name_field</span>
                          <span className="text-slate-400 dark:text-slate-500">: </span>
                          <span className="text-teal-600 dark:text-cyan-400">string</span>
                          <span className="text-slate-400 dark:text-slate-500">;</span>
                        </label>
                      </div>

                      <div className="flex items-center pl-7 sm:pl-0">
                        <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-rose-100/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-300/70 dark:border-rose-900/60 font-medium select-none" aria-hidden="true">
                          &lt;required/&gt;
                        </span>
                        <span className="sr-only">(required field)</span>
                      </div>
                    </div>

                    {/* Line 02: Input Field */}
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <span className="text-slate-400 dark:text-slate-600 select-none w-5 sm:w-7 text-right font-mono text-xs pt-3.5 shrink-0" aria-hidden="true">
                        02
                      </span>
                      <div className="flex-1 relative min-w-0">
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          disabled={status === 'loading'}
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Morgan"
                          aria-invalid={errors.name ? 'true' : 'false'}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          className="w-full px-4 py-3 rounded-xl font-mono text-sm code-editor-input disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                        {errors.name && (
                          <p id="name-error" role="alert" className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mt-1.5 font-mono">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>// Error: {errors.name}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 03 & 04: Email Field */}
                  <div className="space-y-2">
                    {/* Line 03: Declaration */}
                    <div className="flex items-center justify-between gap-x-3 gap-y-1 flex-wrap text-xs sm:text-sm font-mono">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="text-slate-400 dark:text-slate-600 select-none w-5 sm:w-7 text-right font-mono text-xs shrink-0" aria-hidden="true">
                          03
                        </span>
                        <label htmlFor="contact-email" className="cursor-pointer">
                          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">const</span>{' '}
                          <span className="text-slate-800 dark:text-slate-200 font-medium">email_field</span>
                          <span className="text-slate-400 dark:text-slate-500">: </span>
                          <span className="text-teal-600 dark:text-cyan-400">string</span>
                          <span className="text-slate-400 dark:text-slate-500">;</span>
                        </label>
                      </div>

                      <div className="flex items-center pl-7 sm:pl-0">
                        <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-rose-100/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-300/70 dark:border-rose-900/60 font-medium select-none" aria-hidden="true">
                          &lt;required/&gt;
                        </span>
                        <span className="sr-only">(required field)</span>
                      </div>
                    </div>

                    {/* Line 04: Input Field */}
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <span className="text-slate-400 dark:text-slate-600 select-none w-5 sm:w-7 text-right font-mono text-xs pt-3.5 shrink-0" aria-hidden="true">
                        04
                      </span>
                      <div className="flex-1 relative min-w-0">
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          disabled={status === 'loading'}
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. alex@example.com"
                          aria-invalid={errors.email ? 'true' : 'false'}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className="w-full px-4 py-3 rounded-xl font-mono text-sm code-editor-input disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                        {errors.email && (
                          <p id="email-error" role="alert" className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mt-1.5 font-mono">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>// Error: {errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 05 & 06: Message Field */}
                  <div className="space-y-2">
                    {/* Line 05: Declaration */}
                    <div className="flex items-center justify-between gap-x-3 gap-y-1 flex-wrap text-xs sm:text-sm font-mono">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="text-slate-400 dark:text-slate-600 select-none w-5 sm:w-7 text-right font-mono text-xs shrink-0" aria-hidden="true">
                          05
                        </span>
                        <label htmlFor="contact-message" className="cursor-pointer">
                          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">var</span>{' '}
                          <span className="text-slate-800 dark:text-slate-200 font-medium">message_body</span>
                          <span className="text-slate-400 dark:text-slate-500">: </span>
                          <span className="text-teal-600 dark:text-cyan-400">string</span>
                          <span className="text-slate-400 dark:text-slate-500">;</span>
                        </label>
                      </div>

                      <div className="flex items-center pl-7 sm:pl-0">
                        <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-rose-100/80 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-300/70 dark:border-rose-900/60 font-medium select-none" aria-hidden="true">
                          &lt;required/&gt;
                        </span>
                        <span className="sr-only">(required field)</span>
                      </div>
                    </div>

                    {/* Line 06: Textarea Field */}
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <span className="text-slate-400 dark:text-slate-600 select-none w-5 sm:w-7 text-right font-mono text-xs pt-3.5 shrink-0" aria-hidden="true">
                        06
                      </span>
                      <div className="flex-1 relative min-w-0">
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={5}
                          required
                          disabled={status === 'loading'}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Share project details, inquiry, or opportunities..."
                          aria-invalid={errors.message ? 'true' : 'false'}
                          aria-describedby={errors.message ? 'message-error' : undefined}
                          className="w-full px-4 py-3 rounded-xl font-mono text-sm code-editor-input resize-none disabled:opacity-60 disabled:cursor-not-allowed leading-relaxed"
                        />
                        {errors.message && (
                          <p id="message-error" role="alert" className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mt-1.5 font-mono">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>// Error: {errors.message}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Execution Action & Status Feedback */}
                  <div className="pt-3 space-y-4">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="text-slate-400 dark:text-slate-600 select-none w-5 sm:w-7 text-right font-mono text-xs shrink-0" aria-hidden="true">
                        &gt;
                      </span>

                      <MagneticButton
                        as="button"
                        type="submit"
                        disabled={status === 'loading'}
                        className={`group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl font-mono text-sm font-bold tracking-wide transition-all duration-300 shadow-md ${
                          status === 'loading'
                            ? 'bg-blue-600/80 text-white dark:bg-cyan-500/80 dark:text-dark-950 cursor-not-allowed opacity-90'
                            : status === 'success'
                            ? 'bg-emerald-600 text-white dark:bg-emerald-400 dark:text-dark-950 shadow-emerald-500/30 scale-[1.01]'
                            : status === 'error'
                            ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/30'
                            : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 hover:from-blue-500 hover:via-indigo-500 hover:to-teal-500 text-white dark:from-blue-500 dark:via-indigo-500 dark:to-cyan-400 dark:text-dark-950 shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:-translate-y-0.5 active:translate-y-0'
                        }`}
                        title={
                          status === 'loading'
                            ? 'Executing submission...'
                            : status === 'success'
                            ? 'Transmission dispatched successfully!'
                            : status === 'error'
                            ? 'Execution failed. Click to retry.'
                            : 'Execute transmission'
                        }
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white dark:text-dark-950" />
                            <span>[ EXECUTING(); ... ]</span>
                          </>
                        ) : status === 'success' ? (
                          <>
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            <span>[ STATUS: 200 OK — DISPATCHED ✓ ]</span>
                          </>
                        ) : status === 'error' ? (
                          <>
                            <RefreshCw className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
                            <span>[ STATUS: 500 ERROR — RETRY(); ⟳ ]</span>
                          </>
                        ) : (
                          <>
                            <span>[ EXECUTE();</span>
                            <span className="text-cyan-200 dark:text-dark-950 transition-transform duration-300 group-hover:translate-x-1">➤</span>
                            <span>]</span>
                          </>
                        )}
                      </MagneticButton>
                    </div>

                    {/* Inline Execution Output Log (Success) */}
                    {status === 'success' && (
                      <div className="p-4 rounded-xl font-mono text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 space-y-1 ml-7 sm:ml-10 transition-all duration-300">
                        <div className="flex items-center gap-2 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>// [200 OK]: Transmission delivered to destination</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 pl-6 leading-relaxed">
                          Your message has been sent to skunaal57@gmail.com. Kunaal will respond to your email soon!
                        </p>
                      </div>
                    )}

                    {/* Inline Execution Output Log (Error) */}
                    {status === 'error' && (
                      <div className="p-4 rounded-xl font-mono text-xs bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 space-y-2 ml-7 sm:ml-10 transition-all duration-300">
                        <div className="flex items-center gap-2 font-bold">
                          <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                          <span>// [500 Server Error]: Transmission aborted</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 pl-6">{errorMessage}</p>
                        <p className="text-slate-500 dark:text-slate-400 pl-6 text-[11px]">
                          Click the execute action above to retry, or email directly to{' '}
                          <a href={`mailto:${personalData.contact.email}`} className="text-cyan-700 dark:text-cyan-400 underline font-semibold">
                            {personalData.contact.email}
                          </a>.
                        </p>
                      </div>
                    )}

                    {/* Destination Endpoint Configuration Line */}
                    <div className="pt-2 pl-7 sm:pl-10 flex flex-wrap items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400 select-all border-t border-slate-200/80 dark:border-white/5">
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold">const</span>
                      <span className="text-slate-800 dark:text-slate-300 font-medium">DISPATCH_ENDPOINT</span>
                      <span className="text-slate-400 dark:text-slate-500">=</span>
                      <a
                        href={`mailto:${personalData.contact.email}`}
                        className="text-cyan-700 dark:text-cyan-400 hover:underline hover:text-cyan-800 dark:hover:text-cyan-300 font-medium transition-colors"
                        title={`Direct email link to ${personalData.contact.email}`}
                      >
                        &quot;{personalData.contact.email}&quot;
                      </a>
                      <span className="text-slate-400 dark:text-slate-500">;</span>
                    </div>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
