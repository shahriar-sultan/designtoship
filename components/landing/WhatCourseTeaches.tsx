"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import {
  EYEBROW,
  CENTERED_SECTION_ROOT,
  CENTERED_SECTION_CONTENT,
  CENTERED_SECTION_VIGNETTE,
} from "./constants";
import { useLanguage } from "./LanguageProvider";

export function WhatCourseTeaches() {
  const { t } = useLanguage();

  return (
    <section
      id="what-course-teaches"
      data-particle-shape="sphere"
      className={CENTERED_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div
        className={CENTERED_SECTION_CONTENT}
        style={{ background: CENTERED_SECTION_VIGNETTE }}
      >
        <ScrollReveal>
          <p className={`${EYEBROW} mb-4`}>{t.whatCourseTeaches.eyebrow}</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] mb-6 md:mb-12">
            {t.whatCourseTeaches.headline}
          </h2>
        </ScrollReveal>

        <div className="text-left space-y-4 md:space-y-5">
          {t.whatCourseTeaches.paragraphs.map((paragraph, index) => (
            <ScrollReveal key={index} delay={150 + index * 50}>
              <p className="text-[#94A3B8] text-base md:text-lg leading-relaxed">
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
