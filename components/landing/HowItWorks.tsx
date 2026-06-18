"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { EYEBROW } from "./constants";
import { Section } from "./Section";
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
    <Section id="how-it-works" containerClassName="max-w-2xl text-center">
      <ScrollReveal>
        <p className={`${EYEBROW} mb-4`}>{t.howItWorks.eyebrow}</p>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-landing-fg mb-6 md:mb-12">
          {t.howItWorks.headline}
        </h2>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 gap-6 text-left">
        {steps.map((step, index) => (
          <ScrollReveal key={step.title} delay={100 + index * 80}>
            <div className="relative rounded-2xl border border-landing-border bg-landing-bg-alt p-6 h-full">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-landing-gradient-from to-landing-gradient-to text-white text-sm font-bold mb-4">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-landing-fg mb-2">
                {step.title}
              </h3>
              <p className="text-landing-muted text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={400}>
        <p className="text-center text-landing-muted text-base mt-8 md:mt-10">
          {t.howItWorks.footnote}
        </p>
      </ScrollReveal>
    </Section>
  );
}
