"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

export function LocaleHtml() {
  const locale = useLocale();

  useEffect(() => {
    // Update the html lang attribute when locale changes
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
