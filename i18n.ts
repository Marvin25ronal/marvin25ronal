import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { locales, type Locale } from '@/app/lib/locales';

export default getRequestConfig(async () => {
  // Get locale from cookie or default to Spanish
  const headersList = await headers();
  const cookieLocale = headersList.get('cookie')?.match(/NEXT_LOCALE=([^;]+)/)?.[1];
  const locale = (cookieLocale && locales.includes(cookieLocale as Locale) ? cookieLocale : 'es') as Locale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
