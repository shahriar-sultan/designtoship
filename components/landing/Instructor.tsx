"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import {
  EYEBROW,
  CENTERED_SECTION_ROOT,
  CENTERED_SECTION_CONTENT,
  CENTERED_SECTION_VIGNETTE,
} from "./constants";
import { useLanguage } from "./LanguageProvider";

export function Instructor() {
  const { t } = useLanguage();

  return (
    <section
      id="instructor"
      data-particle-shape="hyperboloid"
      className={CENTERED_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div
        className={CENTERED_SECTION_CONTENT}
        style={{ background: CENTERED_SECTION_VIGNETTE }}
      >
        <ScrollReveal>
          <p className={`${EYEBROW} mb-4`}>{t.instructor.eyebrow}</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9]">
            {t.instructor.name}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="text-[#94A3B8] mt-3 mb-8 text-xl md:text-2xl">
            {t.instructor.role}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="rounded-2xl border border-[#1C2740] bg-[#0F1520] p-6 md:p-10 text-left">
            <p className="text-[#94A3B8] text-base leading-relaxed whitespace-pre-line">
              {t.instructor.bio}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-wrap gap-2 mt-8 justify-center">
            {t.instructor.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full text-sm font-medium border border-[#1C2740] text-[#94A3B8] bg-[#0F1520]"
              >
                {tag}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
