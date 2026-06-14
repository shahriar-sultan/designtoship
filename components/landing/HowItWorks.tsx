"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import {
  EYEBROW,
  CENTERED_SECTION_ROOT,
  CENTERED_SECTION_CONTENT,
  CENTERED_SECTION_VIGNETTE,
} from "./constants";
import { useLanguage } from "./LanguageProvider";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { title: t.howItWorks.step1Title, description: t.howItWorks.step1Body },
    { title: t.howItWorks.step2Title, description: t.howItWorks.step2Body },
    { title: t.howItWorks.step3Title, description: t.howItWorks.step3Body },
    { title: t.howItWorks.step4Title, description: t.howItWorks.step4Body },
  ];

  return (
    <section
      id="how-it-works"
      data-particle-shape="dna-helix"
      className={CENTERED_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div
        className={CENTERED_SECTION_CONTENT}
        style={{ background: CENTERED_SECTION_VIGNETTE }}
      >
        <ScrollReveal>
          <p className={`${EYEBROW} mb-4`}>{t.howItWorks.eyebrow}</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] mb-12 md:mb-16">
            {t.howItWorks.headline}
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6 text-left">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={100 + index * 80}>
              <div className="relative rounded-2xl border border-[#1C2740] bg-[#0F1520] p-6 h-full">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#6C3EFF] via-[#A855F7] to-[#22D3EE] text-white text-sm font-bold mb-4">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#94A3B8] text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <p className="text-center text-[#475569] text-base mt-10">
            {t.howItWorks.footnote}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
