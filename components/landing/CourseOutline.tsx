"use client";

import { ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";
import { COURSE_OUTLINE } from "./course-outline-config";
import { Section } from "./Section";
import { useLanguage } from "./LanguageProvider";

function splitMixedScript(text: string) {
  const parts = text.split(/([A-Za-z0-9][A-Za-z0-9\s\-'.·+,]*)/g).filter(Boolean);

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

function PhaseConnector({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center text-landing-accent/60",
        className,
      )}
    >
      <ChevronRight className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.5} />
    </div>
  );
}

function PhaseChip({
  step,
  name,
  weeks,
  isDestination,
}: {
  step: number;
  name: string;
  weeks: string;
  isDestination?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col rounded-xl border px-3 py-3 sm:px-4 sm:py-3.5",
        isDestination
          ? "border-landing-accent bg-gradient-to-br from-landing-gradient-from to-landing-gradient-to text-white shadow-landing"
          : "border-landing-border bg-landing-surface text-landing-fg",
      )}
    >
      <span
        className={cn(
          "font-latin text-xs font-bold tabular-nums sm:text-sm",
          isDestination ? "text-white/90" : "text-landing-accent",
        )}
      >
        {step}
      </span>
      <p
        className={cn(
          "mt-1 font-bn text-sm font-semibold leading-snug sm:text-[0.9375rem]",
          isDestination ? "text-white" : "text-landing-fg",
        )}
      >
        {splitMixedScript(name)}
      </p>
      <p
        className={cn(
          "mt-0.5 font-bn text-xs leading-bn sm:text-sm",
          isDestination ? "text-white/85" : "text-landing-muted",
        )}
      >
        {splitMixedScript(weeks)}
      </p>
    </div>
  );
}

export function CourseOutline() {
  const { lang } = useLanguage();
  const copy = COURSE_OUTLINE[lang];

  return (
    <Section id="course-outline" variant="alt" containerClassName="max-w-6xl">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <h2 className="font-bn text-3xl font-bold tracking-tight text-landing-fg sm:text-4xl">
            {copy.headline}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <p className="mt-3 font-bn text-base leading-bn text-landing-muted sm:text-lg sm:leading-bn">
            {splitMixedScript(copy.subtitle)}
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={120}>
        <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
          {copy.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-bn text-xl font-bold text-landing-accent sm:text-2xl">
                <span className="font-latin">{stat.value}</span>
              </p>
              <p className="mt-0.5 font-bn text-xs text-landing-muted sm:text-sm">
                {splitMixedScript(stat.label)}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Desktop: horizontal phase flow */}
      <ScrollReveal delay={160} className="mt-10 hidden lg:block">
        <div className="flex items-stretch gap-1.5 xl:gap-2">
          {copy.phases.map((phase, index) => (
            <div key={phase.step} className="flex min-w-0 flex-1 items-center">
              <PhaseChip
                step={phase.step}
                name={phase.name}
                weeks={phase.weeks}
                isDestination={index === 5}
              />
              {index < copy.phases.length - 1 && (
                <PhaseConnector className="mx-0.5 xl:mx-1" />
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Mobile / tablet: vertical stack with connectors */}
      <ScrollReveal delay={160} className="mt-8 space-y-2 sm:mt-10 lg:hidden">
        {copy.phases.map((phase, index) => (
          <div key={phase.step}>
            <PhaseChip
              step={phase.step}
              name={phase.name}
              weeks={phase.weeks}
              isDestination={index === 5}
            />
            {index < copy.phases.length - 1 && (
              <div className="flex justify-center py-1" aria-hidden>
                <div className="h-4 w-px bg-landing-accent/35" />
              </div>
            )}
          </div>
        ))}
      </ScrollReveal>
    </Section>
  );
}
