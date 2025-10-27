'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

// Technology icons - Using simple SVG shapes for now (can be replaced with actual icons)
const TechIcon = ({ name, color }: { name: string; color: string }) => (
  <div
    className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold"
    style={{
      background: `linear-gradient(135deg, ${color}15, ${color}08)`,
      border: `1px solid ${color}30`,
      boxShadow: `0 0 20px ${color}20`,
    }}
  >
    {name.substring(0, 2).toUpperCase()}
  </div>
);

interface TechItem {
  name: string;
  color: string;
  category: string;
}

export function TechnologiesSection() {
  const t = useTranslations('technologies');
  const [activeCategory, setActiveCategory] = useState('all');

  // Define technologies with their colors
  const technologies: TechItem[] = [
    // Frontend
    { name: 'React', color: '#61DAFB', category: 'frontend' },
    { name: 'Next.js', color: '#000000', category: 'frontend' },
    { name: 'TypeScript', color: '#3178C6', category: 'frontend' },
    { name: 'Tailwind CSS', color: '#06B6D4', category: 'frontend' },
    { name: 'Vue.js', color: '#4FC08D', category: 'frontend' },

    // Backend
    { name: 'Node.js', color: '#339933', category: 'backend' },
    { name: 'Python', color: '#3776AB', category: 'backend' },
    { name: 'Java', color: '#007396', category: 'backend' },
    { name: 'Express', color: '#000000', category: 'backend' },
    { name: 'Django', color: '#092E20', category: 'backend' },

    // Database
    { name: 'PostgreSQL', color: '#4169E1', category: 'database' },
    { name: 'MongoDB', color: '#47A248', category: 'database' },
    { name: 'MySQL', color: '#4479A1', category: 'database' },
    { name: 'Redis', color: '#DC382D', category: 'database' },

    // Tools & DevOps
    { name: 'Git', color: '#F05032', category: 'tools' },
    { name: 'Docker', color: '#2496ED', category: 'tools' },
    { name: 'AWS', color: '#FF9900', category: 'tools' },
    { name: 'GitHub', color: '#181717', category: 'tools' },
    { name: 'VS Code', color: '#007ACC', category: 'tools' },
  ];

  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'frontend', label: t('categories.frontend') },
    { id: 'backend', label: t('categories.backend') },
    { id: 'database', label: t('categories.database') },
    { id: 'tools', label: t('categories.tools') },
  ];

  const filteredTechnologies = activeCategory === 'all'
    ? technologies
    : technologies.filter(tech => tech.category === activeCategory);

  return (
    <section
      id="technologies"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background - Similar to Hero */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 80% 20%, rgba(96, 165, 250, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(167, 139, 250, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, #0a0e1a 0%, #1a1f35 100%)
          `,
        }}
      />

      {/* Glow Orb */}
      <div
        className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-20 glow-orb"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.3), transparent)',
          filter: 'blur(80px)',
          animation: 'pulseGlow 10s ease-in-out infinite',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2
            className="text-5xl sm:text-6xl font-bold"
            style={{
              background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(96, 165, 250, 0.3)',
            }}
          >
            {t('title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                px-6 py-3 rounded-lg font-semibold transition-all duration-300
                ${activeCategory === category.id
                  ? 'bg-[#60a5fa] text-white shadow-[0_0_24px_rgba(96,165,250,0.4)]'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 hover:border-[#60a5fa]/30'
                }
              `}
              style={{
                transform: activeCategory === category.id ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredTechnologies.map((tech, index) => (
            <div
              key={tech.name}
              className="tech-card group"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
              }}
            >
              <div
                className="
                  relative p-6 rounded-2xl
                  bg-[#0a0e1a]/80 backdrop-blur-sm
                  border border-white/10
                  hover:border-[#60a5fa]/50
                  transition-all duration-300
                  hover:transform hover:scale-105
                  hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]
                "
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${tech.color}15, transparent)`,
                    filter: 'blur(20px)',
                    zIndex: -1,
                  }}
                />

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <TechIcon name={tech.name} color={tech.color} />
                </div>

                {/* Name */}
                <h3 className="text-center text-white font-semibold text-lg">
                  {tech.name}
                </h3>

                {/* Category Badge */}
                <p className="text-center text-gray-400 text-sm mt-2">
                  {t(`categories.${tech.category}`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: t('stats.experience.number'), label: t('stats.experience.label') },
            { number: t('stats.projects.number'), label: t('stats.projects.label') },
            { number: t('stats.technologies.number'), label: t('stats.technologies.label') },
          ].map((stat, index) => (
            <div
              key={index}
              className="
                text-center p-8 rounded-2xl
                bg-[#0a0e1a]/60 backdrop-blur-sm
                border border-[#60a5fa]/20
                hover:border-[#60a5fa]/50
                transition-all duration-300
                hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]
              "
            >
              <div
                className="text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.number}
              </div>
              <div className="text-gray-300 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
