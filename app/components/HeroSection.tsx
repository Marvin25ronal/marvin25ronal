'use client';

import Image from 'next/image';
import { ElectromagneticField } from './ElectromagneticField';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('hero');
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ============================================
          BACKGROUND LAYERS - PROFESSIONAL ELECTROMAGNETIC FIELD
          ============================================ */}

      {/* Layer 1: Animated Gradient Mesh - Deep Space Foundation */}
      <div
        className="hero-background"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(96, 165, 250, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(139, 92, 246, 0.10) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
            linear-gradient(135deg, #0a0e1a 0%, #1a1f35 100%)
          `,
          backgroundSize: '200% 200%',
          animation: 'electricField 20s ease-in-out infinite',
          zIndex: 1
        }}
      />

      {/* Layer 2: Ambient Energy Orbs - Subtle Glow */}
      <div
        className="glow-orb glow-orb-1"
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          top: '15%',
          left: '10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.18), transparent)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          animation: 'pulseGlow 12s ease-in-out infinite',
          zIndex: 2
        }}
      />
      <div
        className="glow-orb glow-orb-2"
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          bottom: '15%',
          right: '15%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15), transparent)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          animation: 'pulseGlow 10s ease-in-out infinite 4s',
          zIndex: 2
        }}
      />

      {/* Layer 3: Electromagnetic Field Network - The Main Attraction */}
      <ElectromagneticField />

      {/* Overlay for text contrast - Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e1a]/10 to-[#0a0e1a]/50 z-[4]" />

      {/* ============================================
          HERO CONTENT - PREMIUM DESIGN
          ============================================ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column: Text Content */}
          <div className="text-left space-y-8 order-2 lg:order-1">

            {/* Name - Premium Typography with Enhanced Effects */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span
                className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                style={{
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.4), 0 0 40px rgba(255, 255, 255, 0.2), 0 0 60px rgba(96, 165, 250, 0.15)'
                }}
              >
                {t('firstName')}
              </span>
              <span
                className="block bg-gradient-to-r from-[#60a5fa] via-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent animate-gradient"
                style={{
                  backgroundSize: '200% auto',
                  textShadow: '0 0 40px rgba(96, 165, 250, 0.3)'
                }}
              >
                {t('lastName')}
              </span>
            </h1>

            {/* Professional Title - Premium Glass Container */}
            <div className="inline-block animate-float">
              <div className="relative group">
                {/* Glow effect behind */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#60a5fa] via-[#8b5cf6] to-[#a78bfa] rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Glass container */}
                <div className="relative px-8 py-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  {/* Inner highlight */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                  <p className="relative text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">
                    {t('title')}
                  </p>
                </div>
              </div>
            </div>

            {/* Master's Degree - Subtle but Present */}
            <div className="inline-block">
              <p className="text-sm sm:text-base text-gray-400 font-medium px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <span className="text-[#a78bfa]">✨</span> {t('mastersDegree')}
              </p>
            </div>

            {/* Value Proposition - Enhanced Glass Card */}
            <div className="relative max-w-xl group">
              {/* Ambient glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#60a5fa]/20 to-[#8b5cf6]/20 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

              {/* Glass card */}
              <div className="relative px-8 py-6 bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.05)]">
                {/* Top highlight line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <p className="relative text-lg sm:text-xl text-gray-200 leading-relaxed">
                  {t('description')}
                </p>
              </div>
            </div>

            {/* Call to Action Buttons - FIXED PREMIUM DESIGN */}
            <div className="flex flex-wrap gap-4 pt-4">

              {/* PRIMARY BUTTON - Gradient with Shimmer (NO OUTLINE) */}
              <a
                href="#projects"
                className="hero-primary-button group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white rounded-xl transition-all duration-300 ease-out hover:scale-105 active:scale-[0.98] shadow-[0_0_30px_rgba(59,130,246,0.4),0_10px_25px_-5px_rgba(0,0,0,0.2)]"
              >
                {/* Gradient background layers */}
                <span className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] via-[#6366f1] to-[#8b5cf6] rounded-xl" />

                {/* Animated gradient overlay on hover */}
                <span className="absolute inset-0 bg-gradient-to-br from-[#60a5fa] via-[#8b5cf6] to-[#a855f7] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Shimmer overlay on hover */}
                <span className="absolute inset-0 overflow-hidden rounded-xl">
                  <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                </span>

                {/* Inner glow top highlight */}
                <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl opacity-50" />

                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2">
                  {t('viewProjects')}
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>

              {/* SECONDARY BUTTON - Premium Glass (NO OUTLINE, FIXED) */}
              <a
                href="/resume.pdf"
                download
                className="hero-secondary-button group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white rounded-xl transition-all duration-300 ease-out hover:scale-105 active:scale-[0.98] shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
              >
                {/* Gradient border using pseudo-element */}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 via-[#60a5fa]/20 to-[#8b5cf6]/20 p-[2px]">
                  <span className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl" />
                </span>

                {/* Inner highlight */}
                <span className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent rounded-t-xl" />

                {/* Hover glow effect */}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.15] to-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('downloadResume')}
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Profile Photo */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              {/* Enhanced glow effect behind photo */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#60a5fa] via-[#8b5cf6] to-[#a78bfa] rounded-full blur-3xl opacity-40 photo-glow"
                style={{
                  transform: 'scale(1.15)'
                }}
              />

              {/* Photo container with premium border */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-[#60a5fa]/40 shadow-[0_0_80px_rgba(96,165,250,0.4),0_0_120px_rgba(139,92,246,0.3)]">
                {/* Placeholder - Replace with your actual photo */}

                {/* Uncomment when you have your photo */}
                <Image
                  src="/profile-photo.jpg"
                  alt="Marvin Ronaldo Martínez Marroquín"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="scroll-indicator flex flex-col items-center gap-2">
            <span className="text-[#60a5fa] text-sm font-medium">{t('scroll')}</span>
            <svg
              className="w-6 h-6 text-[#60a5fa]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
