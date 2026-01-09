import { defineRouting } from 'next-intl/routing';

export const locales = ['bn', 'en'] as const;
export const defaultLocale = 'bn' as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always'
});
