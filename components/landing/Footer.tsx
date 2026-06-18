"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { BATCH_4_APPLY_URL, CTA_LABEL, GRADIENT_TEXT } from "./constants";
import { Section } from "./Section";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section as="footer" containerClassName="max-w-2xl text-center">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 py-4 border-t border-landing-border">
          <div>
            <p className={`text-lg font-bold ${GRADIENT_TEXT}`}>
              {t.footer.brand}
            </p>
            <p className="text-landing-muted text-sm mt-1">{t.footer.tagline}</p>
          </div>

          <nav className="flex items-center justify-center gap-6 text-sm">
            <button
              type="button"
              onClick={() => scrollTo("curriculum")}
              className="text-landing-muted hover:text-landing-fg transition-colors cursor-pointer"
            >
              {t.footer.linkCurriculum}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("pricing")}
              className="text-landing-muted hover:text-landing-fg transition-colors cursor-pointer"
            >
              {t.footer.linkPricing}
            </button>
            <button
              type="button"
              onClick={() =>
                window.open(BATCH_4_APPLY_URL, "_blank", "noopener,noreferrer")
              }
              className="text-landing-muted hover:text-landing-fg transition-colors cursor-pointer"
            >
              {CTA_LABEL}
            </button>
          </nav>
        </div>
      </ScrollReveal>

      <p className="text-center text-landing-muted text-sm pt-4 border-t border-landing-border">
        {t.footer.copyright}
      </p>
    </Section>
  );
}
