'use client';

import { useTranslations } from 'next-intl';

const hobbies = [
  {
    id: 'coffee',
    icon: '☕',
    color: '#a0622a',
    bg: 'rgba(160,98,42,0.12)',
    border: 'rgba(160,98,42,0.3)',
  },
  {
    id: 'mountaineering',
    icon: '🏔️',
    color: '#5a9e6f',
    bg: 'rgba(90,158,111,0.12)',
    border: 'rgba(90,158,111,0.3)',
  },
  {
    id: 'kayak',
    icon: '🚣',
    color: '#2e9cca',
    bg: 'rgba(46,156,202,0.12)',
    border: 'rgba(46,156,202,0.3)',
  },
  {
    id: 'camping',
    icon: '⛺',
    color: '#c8882a',
    bg: 'rgba(200,136,42,0.12)',
    border: 'rgba(200,136,42,0.3)',
  },
  {
    id: 'travel',
    icon: '✈️',
    color: '#7e9fc7',
    bg: 'rgba(126,159,199,0.12)',
    border: 'rgba(126,159,199,0.3)',
  },
  {
    id: 'volcanoes',
    icon: '🌋',
    color: '#d95f3b',
    bg: 'rgba(217,95,59,0.12)',
    border: 'rgba(217,95,59,0.3)',
  },
];

export function HobbiesSection() {
  const t = useTranslations('hobbies');

  return (
    <section id="hobbies" className="relative overflow-hidden">

      {/* ── TRANSITION: tech → nature ── */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(180deg, #0a0e1a 0%, transparent 100%)',
        }}
      />

      {/* ── NATURE BACKGROUND ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(90,158,111,0.18) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 70%, rgba(160,98,42,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(46,156,202,0.10) 0%, transparent 50%),
            linear-gradient(180deg, #0a0e1a 0%, #0f1a12 30%, #111a0e 60%, #0d1614 100%)
          `,
        }}
      />

      {/* ── MOUNTAIN SILHOUETTE SVG ── */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-[0.07]">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-64">
          <path
            d="M0,320 L0,200 L120,140 L240,200 L360,80 L480,160 L560,60 L640,140 L720,20 L800,120 L900,50 L1000,150 L1100,80 L1200,160 L1300,100 L1380,140 L1440,120 L1440,320 Z"
            fill="#5a9e6f"
          />
          <path
            d="M0,320 L0,240 L100,200 L200,240 L320,160 L440,220 L540,140 L660,200 L780,100 L880,180 L980,130 L1080,200 L1180,150 L1280,210 L1440,180 L1440,320 Z"
            fill="#3d7a52"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* ── AMBIENT ORBS ── */}
      <div
        className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(90,158,111,0.12), transparent)',
          filter: 'blur(70px)',
          animation: 'pulseGlow 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(160,98,42,0.10), transparent)',
          filter: 'blur(60px)',
          animation: 'pulseGlow 14s ease-in-out infinite 3s',
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: '#5a9e6f' }}
          >
            {t('eyebrow')}
          </p>
          <h2
            className="text-5xl sm:text-6xl font-bold"
            style={{
              background: 'linear-gradient(to right, #5a9e6f, #a0622a)',
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, i) => (
            <div
              key={hobby.id}
              className="group relative rounded-2xl p-6 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1"
              style={{
                background: hobby.bg,
                border: `1px solid ${hobby.border}`,
                animation: `fadeInUp 0.5s ease-out ${i * 0.09}s both`,
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `0 0 30px ${hobby.color}25, inset 0 0 0 1px ${hobby.color}40` }}
              />

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${hobby.color}20`,
                  border: `1px solid ${hobby.color}40`,
                  boxShadow: `0 0 20px ${hobby.color}20`,
                }}
              >
                {hobby.icon}
              </div>

              {/* Title */}
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: hobby.color }}
              >
                {t(`items.${hobby.id}.title` as Parameters<typeof t>[0])}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {t(`items.${hobby.id}.description` as Parameters<typeof t>[0])}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-20 text-center">
          <blockquote
            className="text-lg sm:text-xl text-gray-300 italic max-w-2xl mx-auto px-8 py-6 rounded-2xl relative"
            style={{
              background: 'rgba(90,158,111,0.06)',
              border: '1px solid rgba(90,158,111,0.15)',
            }}
          >
            <span
              className="absolute top-3 left-5 text-5xl font-serif leading-none opacity-30"
              style={{ color: '#5a9e6f' }}
            >
              "
            </span>
            {t('quote')}
            <span
              className="absolute bottom-1 right-5 text-5xl font-serif leading-none opacity-30"
              style={{ color: '#5a9e6f' }}
            >
              "
            </span>
          </blockquote>
        </div>

      </div>

      {/* ── TRANSITION: nature → contact ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, #0a0e1a 0%, transparent 100%)',
        }}
      />
    </section>
  );
}
