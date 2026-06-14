"use client";

import { useLanguage } from "./LanguageProvider";

export function LanguageToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggle}
      className="px-3 py-1.5 rounded-full border border-[#1C2740] text-sm font-medium text-slate-300 hover:border-[#6C3EFF]/60 hover:text-white transition-colors"
      aria-label="Switch language"
    >
      {lang === "bn" ? "English" : "বাংলা"}
    </button>
  );
}
