import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check, Loader2, RefreshCw } from 'lucide-react';
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
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-blue-700 dark:text-cyber-blue bg-blue-50/90 dark:bg-cyber-blue/10 border border-blue-200 dark:border-cyber-blue/20 transition-colors shadow-sm shadow-blue-500/5">
            <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-cyber-blue" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
            Contact & Collaboration
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed transition-colors">
            Feel free to reach out for software engineering inquiries, AI/ML discussions, or technical collaboration.
          </p>
        </div>

        {/* Contact Grid */}
        <div ref={gridRef} className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-start reveal-init ${gridRevealed ? 'revealed' : ''}`}>
          
          {/* Left Column: Direct Info & Social Placeholders */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card rounded-2xl p-7 space-y-6 border border-slate-200/80 dark:border-white/5 bg-gradient-to-br from-white/95 via-blue-50/15 to-cyan-50/15 dark:bg-dark-900/60 shadow-lg shadow-blue-500/5">
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white transition-colors">
                Contact Information
              </h3>
              
              <div className="space-y-4 text-sm">
                {/* Email Item */}
                <div className="flex items-start justify-between p-3.5 rounded-xl bg-blue-50/50 dark:bg-dark-900/80 border border-blue-200/70 dark:border-white/5 group transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100/70 dark:bg-blue-950/40 border border-blue-300/80 dark:border-blue-800/40 flex items-center justify-center text-blue-700 dark:text-blue-400 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">Email Address</div>
                      <a
                        href={`mailto:${personalData.contact.email}`}
                        className="font-medium text-slate-900 dark:text-white hover:text-blue-700 dark:hover:text-cyan-400 transition-colors"
                      >
                        {personalData.contact.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/5 transition-colors"
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-cyan-50/50 dark:bg-dark-900/80 border border-cyan-200/70 dark:border-white/5 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-cyan-100/70 dark:bg-cyber-cyan/10 border border-cyan-300/80 dark:border-cyber-cyan/30 flex items-center justify-center text-cyan-700 dark:text-cyber-cyan transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">Phone Number</div>
                    <a
                      href={`tel:${personalData.contact.phone.replace(/\s+/g, '')}`}
                      className="font-medium text-slate-900 dark:text-white hover:text-cyan-800 dark:hover:text-cyber-cyan transition-colors"
                    >
                      {personalData.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-indigo-50/50 dark:bg-dark-900/80 border border-indigo-200/70 dark:border-white/5 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100/70 dark:bg-cyber-indigo/10 border border-indigo-300/80 dark:border-cyber-indigo/30 flex items-center justify-center text-indigo-700 dark:text-cyber-indigo transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">Location</div>
                    <div className="font-medium text-slate-900 dark:text-white transition-colors">
                      {personalData.contact.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Coding Platform Profiles */}
            <div className="glass-card rounded-2xl p-7 space-y-4 border border-slate-200/80 dark:border-white/5 bg-gradient-to-br from-white/95 via-slate-50/30 to-blue-50/15 dark:bg-dark-900/60 shadow-lg shadow-blue-500/5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold font-display text-slate-900 dark:text-white transition-colors">Coding & Professional Profiles</h4>
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
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white/90 hover:bg-blue-50/70 dark:bg-dark-900 dark:hover:bg-dark-800 border border-slate-200/90 hover:border-blue-300 dark:border-white/10 dark:hover:border-blue-500/40 text-slate-800 hover:text-blue-950 dark:text-slate-200 dark:hover:text-white transition-all shadow-sm"
                      title={`${social.name} Profile`}
                    >
                      <Icon className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                      <span className="text-xs font-medium">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-7 sm:p-9 border border-slate-200/80 dark:border-white/10 bg-gradient-to-br from-white/95 via-slate-50/30 to-blue-50/15 dark:bg-dark-900/60 relative overflow-hidden shadow-xl shadow-blue-500/5">
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 dark:from-blue-500 dark:via-indigo-500 dark:to-cyan-400" />
              
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white transition-colors">
                    Send a Message
                  </h3>
                </div>

                {/* Name Field */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-name" className="block text-xs font-medium text-slate-700 dark:text-slate-300 font-mono transition-colors">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
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
                    className="w-full px-4 py-3 rounded-xl form-input text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-email" className="block text-xs font-medium text-slate-700 dark:text-slate-300 font-mono transition-colors">
                    Your Email <span className="text-rose-500">*</span>
                  </label>
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
                    className="w-full px-4 py-3 rounded-xl form-input text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contact-message" className="block text-xs font-medium text-slate-700 dark:text-slate-300 font-mono transition-colors">
                    Message <span className="text-rose-500">*</span>
                  </label>
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
                    className="w-full px-4 py-3 rounded-xl form-input text-sm resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button & Status Banners */}
                <div className="pt-2 space-y-3">
                  <MagneticButton
                    as="button"
                    type="submit"
                    disabled={status === 'loading'}
                    className={`group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 ${
                      status === 'loading'
                        ? 'bg-emerald-500/80 text-white dark:text-dark-950 cursor-not-allowed shadow-md opacity-90'
                        : status === 'success'
                        ? 'bg-emerald-600 dark:bg-emerald-400 text-white dark:text-dark-950 shadow-lg shadow-emerald-500/30 scale-[1.02]'
                        : status === 'error'
                        ? 'bg-rose-500 hover:bg-rose-600 dark:hover:bg-rose-400 text-white shadow-lg shadow-rose-500/25 hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white dark:bg-cyber-emerald dark:hover:bg-emerald-400 dark:text-dark-950 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]'
                    }`}
                    title={
                      status === 'loading'
                        ? 'Sending your message...'
                        : status === 'success'
                        ? 'Message sent successfully!'
                        : status === 'error'
                        ? 'Sending failed. Click to retry.'
                        : 'Send Message'
                    }
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white dark:text-dark-950" />
                        <span>Sending...</span>
                      </>
                    ) : status === 'success' ? (
                      <>
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        <span>Message Sent ✓</span>
                      </>
                    ) : status === 'error' ? (
                      <>
                        <RefreshCw className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
                        <span>Failed to Send — Retry</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5 text-white dark:text-dark-950" />
                      </>
                    )}
                  </MagneticButton>

                  {/* Inline Success Banner */}
                  {status === 'success' && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2.5 transition-all duration-300">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-cyber-emerald" />
                      <span>Your message has been sent to skunaal57@gmail.com. Kunaal will respond to your email soon!</span>
                    </div>
                  )}

                  {/* Inline Error Banner with Retry info */}
                  {status === 'error' && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5 transition-all duration-300">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500 dark:text-rose-400" />
                      <div className="space-y-1">
                        <p>{errorMessage}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Click the button above to retry, or email directly to{' '}
                          <a href={`mailto:${personalData.contact.email}`} className="text-cyan-700 dark:text-cyber-cyan hover:underline font-medium">
                            {personalData.contact.email}
                          </a>.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Mail Link */}
                <p className="text-[11px] text-slate-500 leading-relaxed pt-2">
                  Direct messages are delivered to{' '}
                  <a href={`mailto:${personalData.contact.email}`} className="text-cyan-700 dark:text-cyber-cyan hover:underline font-medium">
                    {personalData.contact.email}
                  </a>.
                </p>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
