'use client';

import { useState, useEffect } from 'react';
import { locales, type Locale } from '@/app/lib/locales';

function getStoredLocale(): Locale {
  if (typeof document === 'undefined') return 'es';
  const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
  const val = match?.[1];
  return (val && locales.includes(val as Locale)) ? (val as Locale) : 'es';
}

export function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('es');

  useEffect(() => {
    setCurrentLocale(getStoredLocale());
  }, []);

  const switchLocale = (newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    setCurrentLocale(newLocale);
    window.dispatchEvent(new Event('localechange'));
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-3">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`
            relative px-6 py-3 rounded-xl font-bold
            transition-all duration-300 ease-out
            hover:scale-105 active:scale-[0.98]
            ${
              currentLocale === loc
                ? `
                  bg-gradient-to-br from-[#3b82f6] via-[#6366f1] to-[#8b5cf6]
                  text-white
                  shadow-[0_0_30px_rgba(59,130,246,0.5),0_8px_20px_-4px_rgba(0,0,0,0.2)]
                  before:absolute before:inset-[2px] before:rounded-[10px]
                  before:bg-gradient-to-br before:from-white/20 before:to-transparent
                  before:opacity-50
                `
                : `
                  bg-white/[0.06] backdrop-blur-xl
                  text-white/70 hover:text-white
                  border-2 border-white/10
                  hover:border-white/30 hover:bg-white/[0.12]
                  hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.15)]
                `
            }
          `}
          aria-label={`Switch to ${loc === 'es' ? 'Spanish' : 'English'}`}
        >
          {currentLocale === loc && (
            <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl opacity-50" />
          )}
          <span className="relative z-10">{loc.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
