"use client";

import { useLanguage } from "./LanguageProvider";

export function LanguageToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggle}
      className="px-3 py-1.5 rounded-full border border-landing-border text-sm font-medium text-landing-muted hover:border-landing-accent/40 hover:text-landing-accent transition-colors"
      aria-label={lang === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
    >
      {lang === "bn" ? "EN" : "বাং"}
    </button>
  );
}
