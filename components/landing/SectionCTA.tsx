"use client";

import { LandingButton } from "./LandingButton";
import { CENTERED_SECTION_VIGNETTE } from "./constants";
import { useLanguage } from "./LanguageProvider";

export function SectionCTA() {
  const { t } = useLanguage();

  return (
    <div
      className="relative z-10 w-full flex flex-col items-center gap-2 md:gap-4 py-8 md:py-16 px-6 md:px-8"
      style={{ background: "transparent" }}
    >
      <div
        className="relative z-10 max-w-2xl mx-auto px-6 md:px-8 py-4 md:py-8 text-center w-full"
        style={{ background: CENTERED_SECTION_VIGNETTE }}
      >
        <LandingButton className="text-base md:text-lg px-10 py-4">
          {t.sectionCta.button}
        </LandingButton>
        <p className="text-slate-400 text-sm mt-2 md:mt-4">{t.sectionCta.note}</p>
      </div>
    </div>
  );
}
