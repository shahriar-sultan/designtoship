"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Language, type Translations } from "@/lib/translations";

type LanguageContextType = {
  lang: Language;
  setLang: (l: Language) => void;
  toggle: () => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

const COOKIE_NAME = "lang";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`;
}

function readPersistedLang(): Language {
  const saved = getCookie(COOKIE_NAME);
  return saved === "en" ? "en" : "bn";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("bn");

  useEffect(() => {
    setLangState(readPersistedLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Language) => {
    setLangState(l);
    setCookie(COOKIE_NAME, l);
  };

  const toggle = () => {
    setLangState((current) => {
      const next = current === "bn" ? "en" : "bn";
      setCookie(COOKIE_NAME, next);
      return next;
    });
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      <div
        data-lang={lang}
        style={{
          fontFamily:
            lang === "bn"
              ? "var(--font-anek-bangla), var(--font-bengali), var(--font-hind-siliguri), var(--font-inter), sans-serif"
              : "var(--font-inter), var(--font-geist-sans), sans-serif",
          WebkitFontSmoothing: lang === "bn" ? "subpixel-antialiased" : undefined,
          MozOsxFontSmoothing: lang === "bn" ? "auto" : undefined,
        }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
