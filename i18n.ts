import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from '@/app/lib/locales';

export default getRequestConfig(async () => {
  // Try to read locale from cookie; fall back to 'es' (safe for static export)
  let locale: Locale = 'es';
  try {
    const { headers } = await import('next/headers');
    const headersList = await headers();
    const cookieLocale = headersList.get('cookie')?.match(/NEXT_LOCALE=([^;]+)/)?.[1];
    if (cookieLocale && locales.includes(cookieLocale as Locale)) {
      locale = cookieLocale as Locale;
    }
  } catch {
    // headers() not available in static export — use default
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
