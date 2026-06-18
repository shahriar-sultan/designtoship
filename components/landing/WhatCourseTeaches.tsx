"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { EditorialGraphicPlaceholder } from "./EditorialGraphicPlaceholder";
import { EYEBROW } from "./constants";
import { Section } from "./Section";
import { useLanguage } from "./LanguageProvider";

const GRAPHIC = {
  src: "/images/what-course-teaches-graphic.jpg",
  alt: "",
} as const;

export function WhatCourseTeaches() {
  const { t } = useLanguage();

  return (
    <Section
      id="what-course-teaches"
      variant="alt"
      containerClassName="max-w-6xl"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,55%)_minmax(0,45%)] lg:gap-12">
        <div className="text-left">
          <ScrollReveal>
            <p className={`${EYEBROW} mb-4`}>{t.whatCourseTeaches.eyebrow}</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="mb-6 font-bn text-3xl font-bold tracking-tight text-landing-fg sm:text-4xl md:mb-8 md:text-5xl">
              {t.whatCourseTeaches.headline}
            </h2>
          </ScrollReveal>

          <div className="space-y-4 md:space-y-5">
            {t.whatCourseTeaches.paragraphs.map((paragraph, index) => (
              <ScrollReveal key={index} delay={150 + index * 50}>
                <p className="font-bn text-base leading-bn text-landing-muted md:text-lg md:leading-bn">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={120} className="lg:justify-self-end">
          <EditorialGraphicPlaceholder src={GRAPHIC.src} alt={GRAPHIC.alt} />
        </ScrollReveal>
      </div>
    </Section>
  );
}
