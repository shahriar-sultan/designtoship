"use client";

import type { LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { OUTCOME_ICONS, OUTCOMES_SECTION } from "./outcomes-config";
import { Section } from "./Section";
import { useLanguage } from "./LanguageProvider";

function splitMixedScript(text: string) {
  const parts = text.split(/([A-Za-z0-9][A-Za-z0-9\s\-'.·(),"+?]*)/g).filter(Boolean);

  return parts.map((part, index) =>
    /^[A-Za-z0-9]/.test(part) ? (
      <span key={`${part}-${index}`} className="font-latin">
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

function OutcomeCardView({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <ScrollReveal delay={delay}>
      <article className="h-full rounded-[14px] border border-landing-border bg-landing-surface p-5 shadow-landing sm:p-6">
        <div
          className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-landing-gradient-from to-landing-gradient-to"
          aria-hidden
        >
          <Icon className="h-5 w-5 text-white" strokeWidth={1.85} />
        </div>
        <h3 className="font-bn text-base font-bold leading-snug text-landing-fg sm:text-lg">
          {splitMixedScript(title)}
        </h3>
        <p className="mt-2 font-bn text-sm leading-bn text-landing-muted sm:text-base sm:leading-bn">
          {splitMixedScript(description)}
        </p>
      </article>
    </ScrollReveal>
  );
}

export function AfterCourseOutcomes() {
  const { lang } = useLanguage();
  const copy = OUTCOMES_SECTION[lang];

  return (
    <Section
      id="after-course-outcomes"
      variant="alt"
      aria-labelledby="after-course-outcomes-heading"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        <ScrollReveal className="text-left sm:col-span-2 lg:col-span-1 lg:row-span-1 lg:self-center">
          <h2
            id="after-course-outcomes-heading"
            className="font-bn text-2xl font-bold tracking-tight text-landing-fg sm:text-3xl md:text-4xl leading-snug"
          >
            {splitMixedScript(copy.headline)}
          </h2>
          <p className="mt-4 font-bn text-base leading-bn text-landing-muted sm:text-lg sm:leading-bn">
            {splitMixedScript(copy.intro)}
          </p>
        </ScrollReveal>

        {copy.cards.map((card, index) => (
          <OutcomeCardView
            key={card.title}
            icon={OUTCOME_ICONS[index]}
            title={card.title}
            description={card.description}
            delay={80 + index * 60}
          />
        ))}
      </div>
    </Section>
  );
}
