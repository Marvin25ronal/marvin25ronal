'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const CONTACT_LINKS = [
  {
    id: 'email',
    href: 'mailto:mr97.martinez@gmail.com',
    label: 'mr97.martinez@gmail.com',
    color: '#60a5fa',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'github',
    href: 'https://github.com/Marvin25ronal',
    label: '@Marvin25ronal',
    color: '#a78bfa',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/marvin-mart%C3%ADnez-26888b26a/',
    label: 'marvin-martínez',
    color: '#34d399',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    href: 'https://wa.me/50254774710',
    label: '+502 5477-4710',
    color: '#4ade80',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

type FormState = 'idle' | 'sending' | 'sent';

export function ContactSection() {
  const t = useTranslations('contact');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormState>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Mailto fallback — replace with EmailJS/Formspree when ready
    const subject = encodeURIComponent(`Contacto desde portafolio — ${form.name}`);
    const body = encodeURIComponent(`Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:mr97.martinez@gmail.com?subject=${subject}&body=${body}`);
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">

      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 70% 20%, rgba(96,165,250,0.08) 0%, transparent 55%),
            radial-gradient(ellipse at 20% 80%, rgba(167,139,250,0.07) 0%, transparent 50%),
            linear-gradient(180deg, #0a0e1a 0%, #0d1020 100%)
          `,
        }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(96,165,250,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-[#60a5fa] text-sm font-semibold tracking-widest uppercase">
            {t('eyebrow')}
          </p>
          <h2
            className="text-5xl sm:text-6xl font-bold"
            style={{
              background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── LEFT: contact info ── */}
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed text-lg">
              {t('intro')}
            </p>

            {/* Contact links */}
            <div className="space-y-3">
              {CONTACT_LINKS.map(link => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.id !== 'email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: `${link.color}0a`,
                    border: `1px solid ${link.color}20`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${link.color}18`,
                      border: `1px solid ${link.color}35`,
                      color: link.color,
                      boxShadow: `0 0 16px ${link.color}20`,
                    }}
                  >
                    {link.icon}
                  </div>

                  {/* Label */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-0.5">
                      {t(`links.${link.id}` as Parameters<typeof t>[0])}
                    </p>
                    <p className="font-semibold transition-colors duration-200 group-hover:text-white"
                      style={{ color: link.color }}>
                      {link.label}
                    </p>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
                    style={{ color: link.color }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-400 text-sm">Villa Nueva, Guatemala 🇬🇹</span>
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[320px] gap-4 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.3)' }}
                >
                  ✅
                </div>
                <h3 className="text-xl font-bold text-white">{t('form.successTitle')}</h3>
                <p className="text-gray-400">{t('form.successMessage')}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 px-6 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
                >
                  {t('form.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-bold text-white mb-6">{t('form.title')}</h3>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder={t('form.namePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300 focus:ring-2"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder={t('form.emailPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">
                    {t('form.message')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder={t('form.messagePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none transition-all duration-300 resize-none"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.5)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    boxShadow: '0 0 24px rgba(96,165,250,0.25)',
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      {t('form.sending')}
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {t('form.submit')}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Marvin Ronaldo Martínez Marroquín
          </p>
          <p className="text-gray-700 text-xs">
            {t('footer')}
          </p>
        </div>
      </div>
    </section>
  );
}
