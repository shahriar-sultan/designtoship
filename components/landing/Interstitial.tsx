"use client";

import { useEffect, useRef, useState } from "react";
import { LandingButton } from "./LandingButton";
import {
  CENTERED_SECTION_CONTENT,
  CENTERED_SECTION_ROOT,
  CENTERED_SECTION_VIGNETTE,
  GRADIENT_TEXT,
} from "./constants";
import { useLanguage } from "./LanguageProvider";

interface InterstitialProps {
  copy: string;
  subCopy?: string;
  subCopyGradient?: boolean;
  showCta?: boolean;
}

export function Interstitial({
  copy,
  subCopy,
  subCopyGradient = false,
  showCta = false,
}: InterstitialProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={CENTERED_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div
        className={`${CENTERED_SECTION_CONTENT} transition-opacity duration-[400ms]`}
        style={{
          opacity: visible ? 1 : 0,
          background: CENTERED_SECTION_VIGNETTE,
        }}
      >
        <h2
          className={`text-3xl md:text-5xl lg:text-7xl font-bold leading-tight ${GRADIENT_TEXT}`}
        >
          {copy}
        </h2>
        {subCopy && (
          <p
            className={
              subCopyGradient
                ? `mt-2 md:mt-4 text-3xl md:text-5xl lg:text-7xl font-bold leading-tight ${GRADIENT_TEXT}`
                : "mt-2 md:mt-4 text-base md:text-lg text-slate-400"
            }
          >
            {subCopy}
          </p>
        )}
        {showCta && (
          <div className="mt-3 md:mt-8">
            <LandingButton className="text-base md:text-lg px-10 py-4">
              {t.sectionCta.button}
            </LandingButton>
          </div>
        )}
      </div>
    </div>
  );
}
