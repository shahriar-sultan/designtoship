"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { EYEBROW } from "./constants";
import { Section } from "./Section";
import { useLanguage } from "./LanguageProvider";

export function Instructor() {
  const { t } = useLanguage();

  return (
    <Section id="instructor" variant="alt" containerClassName="max-w-2xl text-center">
      <ScrollReveal>
        <p className={`${EYEBROW} mb-4`}>{t.instructor.eyebrow}</p>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-landing-fg">
          {t.instructor.name}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={150}>
        <p className="text-landing-muted mt-3 mb-8 text-xl md:text-2xl">
          {t.instructor.role}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="rounded-2xl border border-landing-border bg-landing-surface p-6 md:p-10 text-left">
          <p className="text-landing-muted text-base leading-relaxed whitespace-pre-line">
            {t.instructor.bio}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={300}>
        <div className="flex flex-wrap gap-2 mt-8 justify-center">
          {t.instructor.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-sm font-medium border border-landing-border text-landing-muted bg-landing-bg-alt"
            >
              {tag}
            </span>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  );
}
