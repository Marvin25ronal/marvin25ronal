// Shared locale constants that can be imported from both client and server
export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
