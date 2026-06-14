"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
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
let listeners: Array<() => void> = [];

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=31536000`;
}

function getLangSnapshot(): Language {
  const saved = getCookie(COOKIE_NAME) as Language | null;
  return saved === "en" ? "en" : "bn";
}

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(
    subscribe,
    getLangSnapshot,
    (): Language => "bn",
  );

  const setLang = (l: Language) => {
    setCookie(COOKIE_NAME, l);
    notifyListeners();
  };

  const toggle = () => setLang(lang === "bn" ? "en" : "bn");

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      <div
        data-lang={lang}
        style={{
          fontFamily:
            lang === "bn"
              ? "var(--font-bengali), var(--font-hind-siliguri), var(--font-geist-sans), sans-serif"
              : "var(--font-geist-sans), sans-serif",
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
