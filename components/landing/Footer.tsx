"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import {
  BATCH_4_APPLY_URL,
  CENTERED_SECTION_VIGNETTE,
  GRADIENT_TEXT,
} from "./constants";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      data-particle-shape="stellar-nebula"
      className="relative z-10 w-full py-12 px-6"
      style={{ background: "transparent" }}
    >
      <div
        className="relative z-10 max-w-2xl mx-auto px-8 py-12 text-center"
        style={{ background: CENTERED_SECTION_VIGNETTE }}
      >
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 py-4 border-t border-[#1C2740]">
            <div>
              <p className={`text-lg font-bold ${GRADIENT_TEXT}`}>
                {t.footer.brand}
              </p>
              <p className="text-[#475569] text-sm mt-1">{t.footer.tagline}</p>
            </div>

            <nav className="flex items-center justify-center gap-6 text-sm">
              <button
                type="button"
                onClick={() => scrollTo("curriculum")}
                className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors cursor-pointer"
              >
                {t.footer.linkCurriculum}
              </button>
              <button
                type="button"
                onClick={() => scrollTo("pricing")}
                className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors cursor-pointer"
              >
                {t.footer.linkPricing}
              </button>
              <button
                type="button"
                onClick={() =>
                  window.open(BATCH_4_APPLY_URL, "_blank", "noopener,noreferrer")
                }
                className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors cursor-pointer"
              >
                {t.footer.linkApply}
              </button>
            </nav>
          </div>
        </ScrollReveal>

        <p className="text-center text-[#475569] text-sm pt-4 border-t border-[#1C2740]">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
