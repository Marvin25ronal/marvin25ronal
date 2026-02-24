'use client';

import { useState, useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';

type Messages = Record<string, unknown>;

function getStoredLocale(): string {
  if (typeof document === 'undefined') return 'es';
  const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
  return match ? match[1] : 'es';
}

export function TranslationsWrapper({
  children,
  allMessages,
}: {
  children: React.ReactNode;
  allMessages: Record<string, Messages>;
}) {
  const [locale, setLocale] = useState('es');
  const [messages, setMessages] = useState<Messages>(allMessages['es']);

  // On mount, read cookie to set initial locale
  useEffect(() => {
    const stored = getStoredLocale();
    if (stored !== 'es' && allMessages[stored]) {
      setLocale(stored);
      setMessages(allMessages[stored]);
    }
  }, [allMessages]);

  // Listen for locale changes dispatched by LanguageSwitcher
  useEffect(() => {
    const handler = () => {
      const stored = getStoredLocale();
      setLocale(stored);
      setMessages(allMessages[stored] || allMessages['es']);
    };
    window.addEventListener('localechange', handler);
    return () => window.removeEventListener('localechange', handler);
  }, [allMessages]);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
