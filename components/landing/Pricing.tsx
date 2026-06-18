"use client";

import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CtaButton } from "./CtaButton";
import { EYEBROW } from "./constants";
import { Section } from "./Section";
import { useLanguage } from "./LanguageProvider";

export function Pricing() {
  const { t } = useLanguage();

  return (
    <Section id="pricing" containerClassName="max-w-2xl text-center">
      <ScrollReveal>
        <p className={`${EYEBROW} mb-4`}>{t.pricing.eyebrow}</p>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-landing-fg mb-6 md:mb-12">
          {t.pricing.headline}
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <div className="w-full rounded-2xl border border-landing-border bg-landing-bg-alt p-6 md:p-8 text-left">
          <p className="text-3xl md:text-4xl font-bold tracking-tight text-landing-muted line-through">
            {t.pricing.originalPrice}
          </p>
          <p className="text-4xl md:text-5xl font-bold tracking-tight text-landing-fg mt-2">
            {t.pricing.currentPrice}
          </p>

          <div className="mt-6 rounded-2xl p-[2px] bg-gradient-to-r from-landing-gradient-from to-landing-gradient-to shadow-[0_0_40px_rgba(249,115,22,0.2)]">
            <div className="rounded-2xl bg-landing-bg-alt p-5 md:p-6 border border-landing-accent/20 bg-gradient-to-br from-landing-accent/10 via-landing-bg-alt to-landing-bg">
              <p className="text-base md:text-lg font-semibold text-landing-fg">
                {t.pricing.earlyBirdLabel}
              </p>
              <p className="text-landing-muted text-base leading-relaxed mt-2">
                {t.pricing.earlyBirdBody}
              </p>
            </div>
          </div>

          <ul className="space-y-3 my-8">
            {t.pricing.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-landing-muted text-base"
              >
                <Check
                  className="w-4 h-4 text-landing-accent shrink-0 mt-0.5"
                  strokeWidth={2}
                />
                {feature}
              </li>
            ))}
          </ul>

          <CtaButton className="w-full text-base md:text-lg py-4" />

          <p className="text-center text-landing-fg text-sm md:text-base font-medium mt-6">
            {t.pricing.footnote}
          </p>
        </div>
      </ScrollReveal>
    </Section>
  );
}
