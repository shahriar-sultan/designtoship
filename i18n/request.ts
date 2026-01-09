import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Await the requestLocale promise (Next.js 16 change)
  let locale = await requestLocale;

  // If no locale or invalid locale, use default locale as fallback
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
