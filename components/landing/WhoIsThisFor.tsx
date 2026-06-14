"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { LandingButton } from "./LandingButton";
import {
  EYEBROW,
  CENTERED_SECTION_ROOT,
  CENTERED_SECTION_CONTENT,
  CENTERED_SECTION_VIGNETTE,
} from "./constants";
import { useLanguage } from "./LanguageProvider";

export function WhoIsThisFor() {
  const { t } = useLanguage();

  return (
    <section
      id="who-is-this-for"
      data-particle-shape="hyperboloid"
      className={CENTERED_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div
        className={CENTERED_SECTION_CONTENT}
        style={{ background: CENTERED_SECTION_VIGNETTE }}
      >
        <ScrollReveal>
          <p className={`${EYEBROW} mb-4`}>{t.whoIsThisFor.eyebrow}</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] mb-12 md:mb-16">
            {t.whoIsThisFor.headline}
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 text-left">
          <ScrollReveal delay={150}>
            <div className="rounded-2xl border border-[#1C2740] bg-[#0F1520] p-6 md:p-8">
              <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">
                {t.whoIsThisFor.forTitle}
              </h3>
              <ul className="space-y-3">
                {t.whoIsThisFor.forItems.map((item) => (
                  <li
                    key={item}
                    className="text-[#94A3B8] text-base leading-relaxed flex gap-3"
                  >
                    <span className="text-[#22D3EE] shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="rounded-2xl border border-[#1C2740] bg-[#0F1520] p-6 md:p-8">
              <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">
                {t.whoIsThisFor.notForTitle}
              </h3>
              <ul className="space-y-3">
                {t.whoIsThisFor.notForItems.map((item) => (
                  <li
                    key={item}
                    className="text-[#94A3B8] text-base leading-relaxed flex gap-3"
                  >
                    <span className="text-[#475569] shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={300}>
          <div className="rounded-2xl border border-[#1C2740] bg-[#0F1520] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-left">
            <p className="text-[#94A3B8] text-base max-w-xl">
              {t.whoIsThisFor.ctaNote}
            </p>
            <LandingButton className="shrink-0">
              {t.whoIsThisFor.ctaButton}
            </LandingButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
