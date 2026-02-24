'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const NAV_LINKS = [
  { id: 'hero',         href: '#hero' },
  { id: 'projects',     href: '#projects' },
  { id: 'technologies', href: '#technologies' },
  { id: 'hobbies',      href: '#hobbies' },
  { id: 'contact',      href: '#contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled]     = useState(false);
  const [active, setActive]         = useState('hero');
  const [menuOpen, setMenuOpen]     = useState(false);

  /* ── Scroll effects ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section
      const sections = NAV_LINKS.map(l => l.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(10, 14, 26, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(96, 165, 250, 0.12)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <button
          onClick={() => handleLink('#hero')}
          className="flex items-center gap-2 group"
        >
          <span
            className="text-xl font-black tracking-tight"
            style={{
              background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            MR
          </span>
          <span className="text-white/70 text-sm font-medium hidden sm:block group-hover:text-white transition-colors duration-300">
            Martínez
          </span>
        </button>

        {/* ── Desktop Links ── */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ id, href }) => (
            <li key={id}>
              <button
                onClick={() => handleLink(href)}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group"
                style={{
                  color: active === id ? '#60a5fa' : 'rgba(255,255,255,0.65)',
                }}
              >
                {/* Active indicator */}
                {active === id && (
                  <span
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'rgba(96, 165, 250, 0.08)',
                      border: '1px solid rgba(96, 165, 250, 0.2)',
                    }}
                  />
                )}

                {/* Hover bg */}
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                />

                <span className="relative">{t(id as 'home' | 'technologies' | 'projects' | 'hobbies' | 'contact')}</span>

                {/* Active dot */}
                {active === id && (
                  <span
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#60a5fa', boxShadow: '0 0 6px #60a5fa' }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* ── CTA + Hamburger ── */}
        <div className="flex items-center gap-3">
          {/* Contact CTA */}
          <a
            href="mailto:mr97.martinez@gmail.com"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              boxShadow: '0 0 20px rgba(59,130,246,0.3)',
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {t('contact')}
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg transition-colors duration-300 hover:bg-white/10"
            aria-label="Toggle menu"
          >
            <span
              className="w-5 h-0.5 bg-white transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }}
            />
            <span
              className="w-5 h-0.5 bg-white transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="w-5 h-0.5 bg-white transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          background: 'rgba(10, 14, 26, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: menuOpen ? '1px solid rgba(96, 165, 250, 0.12)' : 'none',
        }}
      >
        <ul className="flex flex-col px-4 py-4 gap-1">
          {NAV_LINKS.map(({ id, href }) => (
            <li key={id}>
              <button
                onClick={() => handleLink(href)}
                className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: active === id ? '#60a5fa' : 'rgba(255,255,255,0.7)',
                  background: active === id ? 'rgba(96,165,250,0.08)' : 'transparent',
                  border: active === id ? '1px solid rgba(96,165,250,0.2)' : '1px solid transparent',
                }}
              >
                {t(id as 'home' | 'technologies' | 'projects' | 'hobbies' | 'contact')}
              </button>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="mailto:mr97.martinez@gmail.com"
              className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t('contact')}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
