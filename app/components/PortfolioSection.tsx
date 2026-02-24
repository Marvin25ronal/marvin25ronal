'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';

interface Project {
  id: string;
  category: string;
  tags: string[];
  /** Pon la imagen en /public/projects/<id>-1.jpg, etc.
   *  Si el arreglo está vacío se muestra el placeholder. */
  images: string[];
  links: { demo?: string; repo?: string };
}

/* ─────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────── */
function Lightbox({
  images,
  initial,
  title,
  onClose,
}: {
  images: string[];
  initial: number;
  title: string;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initial);

  const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10"
        aria-label="Cerrar"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
        {current + 1} / {images.length}
      </div>

      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full mx-8 rounded-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.6)' }}
      >
        <Image
          src={images[current]}
          alt={`${title} ${current + 1}`}
          width={1200}
          height={800}
          className="object-contain w-full h-full max-h-[85vh]"
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            className="absolute left-4 w-12 h-12 flex items-center justify-center rounded-full text-white transition-all duration-200 hover:bg-white/10 hover:scale-110"
            aria-label="Anterior"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={e => { e.stopPropagation(); next(); }}
            className="absolute right-4 w-12 h-12 flex items-center justify-center rounded-full text-white transition-all duration-200 hover:bg-white/10 hover:scale-110"
            aria-label="Siguiente"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setCurrent(i); }}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === current ? '20px' : '8px',
                  height: '8px',
                  background: i === current ? '#60a5fa' : 'rgba(255,255,255,0.35)',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   IMAGE SLOT
───────────────────────────────────────── */
function ProjectImageSlot({
  images,
  title,
  color,
}: {
  images: string[];
  title: string;
  color: string;
}) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) {
    return (
      <div
        className="relative w-full h-48 flex flex-col items-center justify-center gap-2 rounded-xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color}10, ${color}05)`,
          border: `1px dashed ${color}40`,
        }}
      >
        <svg className="w-10 h-10 opacity-30" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-xs font-medium opacity-40" style={{ color }}>Captura pendiente</p>
      </div>
    );
  }

  return (
    <>
      {/* Thumbnail */}
      <div
        className="relative w-full h-48 rounded-xl overflow-hidden group/img cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={images[active]}
          alt={`${title} screenshot ${active + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover/img:scale-105"
        />

        {/* Dark overlay on hover with expand icon */}
        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Dots navigation */}
        {images.length > 1 && (
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5"
            onClick={e => e.stopPropagation()}
          >
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                style={{
                  background: i === active ? '#fff' : 'rgba(255,255,255,0.4)',
                  transform: i === active ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          initial={active}
          title={title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

export function PortfolioSection() {
  const t = useTranslations('portfolio');
  const [activeFilter, setActiveFilter] = useState('all');

  const projects: Project[] = [
    {
      id: 'mcdonalds',
      category: 'mobile',
      tags: ['React Native', 'Android', 'iOS', 'CI/CD', 'Mesoamérica','NextJS','NestJS'],
      // Agrega capturas en /public/projects/  ej: '/projects/mcdonalds-1.jpg'
      images: [
        '/projects/mcdonalds-1.png',
        '/projects/mcdonalds-2.png',
        '/projects/mcdonalds-3.png',
      ],
      links: {},
    },
    {
      id: 'celebrations',
      category: 'fullstack',
      tags: ['React', 'Node.js', 'Cotizaciones', 'Paquetes', 'PostgreSQL'],
      images: [
        '/projects/celebraciones-1.png',
        '/projects/celebraciones-2.png',
      ],
      links: {},
    },
    {
      id: 'hands',
      category: 'ai',
      tags: ['Python', 'TensorFlow', 'Lenguaje de Señas', 'Tiempo Real', 'OpenCV'],
      images: [
        '/projects/hands-1.jpeg',
        '/projects/hands-2.jpeg',
        '/projects/hands-3.jpeg',
      ],
      links: {},
    },
    {
      id: 'icecream',
      category: 'mobile',
      tags: ['React Native', 'SQLite', 'Inventario', 'Impresora Térmica', 'Kiosko'],
      images: [
        '/projects/ice-1.png',
        '/projects/ice-2.png',
        '/projects/ice-3.png',
        '/projects/ice-4.png',
      ],
      links: {},
    },
  ];

  const filters = [
    { id: 'all',       label: t('filters.all'),       icon: '⬡' },
    { id: 'mobile',    label: t('filters.mobile'),    icon: '📱' },
    { id: 'fullstack', label: t('filters.fullstack'), icon: '⚡' },
    { id: 'ai',        label: t('filters.ai'),        icon: '🤖' },
  ];

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const categoryColor: Record<string, string> = {
    mobile:    '#34d399',
    fullstack: '#60a5fa',
    ai:        '#a78bfa',
  };

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 10% 50%, rgba(59,130,246,0.07) 0%, transparent 60%),
            radial-gradient(circle at 90% 20%, rgba(167,139,250,0.06) 0%, transparent 50%),
            linear-gradient(180deg, #1a1f35 0%, #0a0e1a 100%)
          `,
        }}
      />
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(96,165,250,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

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

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
              style={{
                background: activeFilter === f.id ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)' : 'rgba(255,255,255,0.05)',
                color: activeFilter === f.id ? '#fff' : 'rgba(255,255,255,0.6)',
                border: activeFilter === f.id ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: activeFilter === f.id ? '0 0 20px rgba(96,165,250,0.3)' : 'none',
                transform: activeFilter === f.id ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <span>{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid — 2 cols en desktop para dar más espacio a las cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((project, i) => {
            const color = categoryColor[project.category] ?? '#60a5fa';
            const title = t(`projects.${project.id}.title` as Parameters<typeof t>[0]);

            return (
              <article
                key={project.id}
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both`,
                  background: 'rgba(10,14,26,0.75)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
                }}
              >
                {/* Hover glow border */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ boxShadow: `inset 0 0 0 1px ${color}40` }}
                />

                {/* Top accent bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, ${color}, ${color}00)` }}
                />

                <div className="p-6 space-y-5">

                  {/* ── IMAGE SLOT ── */}
                  <ProjectImageSlot images={project.images} title={title} color={color} />

                  {/* Category badge + icon */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
                    >
                      {t(`filters.${project.category}` as Parameters<typeof t>[0])}
                    </span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                    >
                      {t(`projects.${project.id}.icon` as Parameters<typeof t>[0])}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {title}
                  </h3>

                  {/* Company / Context */}
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color }}>
                    {t(`projects.${project.id}.company` as Parameters<typeof t>[0])}
                  </p>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {t(`projects.${project.id}.description` as Parameters<typeof t>[0])}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-lg font-medium"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          color: 'rgba(255,255,255,0.65)',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  {(project.links.demo || project.links.repo) && (
                    <div className="flex gap-4 pt-2 border-t border-white/10">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold hover:text-white transition-colors duration-200"
                          style={{ color }}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Demo
                        </a>
                      )}
                      {project.links.repo && (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* GitHub CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/Marvin25ronal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            {t('githubCta')}
          </a>
        </div>
      </div>
    </section>
  );
}
