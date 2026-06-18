"use client";

import { useId, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";
import {
  CURRICULUM_PHASES,
  type CurriculumPhase,
  type CurriculumWeekRow,
} from "./curriculum-config";
import { EYEBROW } from "./constants";
import { CurriculumCourseCard } from "./CurriculumCourseCard";
import { Section } from "./Section";
import { useLanguage } from "./LanguageProvider";

const phaseIds = [
  "phase-1",
  "phase-2",
  "phase-3",
  "phase-4",
  "phase-5",
  "phase-6",
] as const;

function splitMixedScript(text: string) {
  const parts = text.split(/([A-Za-z0-9][A-Za-z0-9\s\-'.·(),+→—]*)/g).filter(Boolean);

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

function SkillTags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Skills covered">
      {tags.map((tag) => (
        <li key={tag}>
          <span className="inline-block rounded-full border border-landing-accent/25 bg-landing-accent/10 px-2.5 py-0.5 font-latin text-[11px] font-medium leading-tight text-landing-accent sm:text-xs">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}

function WeekRow({ week }: { week: CurriculumWeekRow }) {
  return (
    <li className="rounded-lg border border-landing-border/80 bg-landing-surface p-3.5 sm:p-4">
      <p className="font-bn text-xs font-semibold uppercase tracking-wide text-landing-muted sm:text-sm">
        {splitMixedScript(week.label)}
      </p>
      <p className="mt-1 font-bn text-sm font-bold leading-snug text-landing-fg sm:text-base">
        {splitMixedScript(week.title)}
      </p>
      <ul className="mt-3 space-y-2">
        {week.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-2 font-bn text-sm leading-bn text-landing-muted"
          >
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-landing-accent/70"
            />
            <span>{splitMixedScript(bullet)}</span>
          </li>
        ))}
      </ul>
      <SkillTags tags={week.tags} />
    </li>
  );
}

function CollapsedPreview({
  phase,
  lang,
}: {
  phase: CurriculumPhase;
  lang: "bn" | "en";
}) {
  if (phase.kind !== "detailed" || phase.weekRows.length === 0) {
    return null;
  }

  const first = phase.weekRows[0];
  const moreCount = phase.weekRows.length - 1;
  const moreLabel =
    lang === "bn"
      ? `· +${moreCount} সপ্তাহ`
      : `· +${moreCount} week${moreCount === 1 ? "" : "s"}`;

  return (
    <p className="mt-2 font-bn text-sm leading-bn text-landing-muted/90">
      <span className="font-semibold text-landing-muted">
        {splitMixedScript(first.label)}
      </span>
      <span aria-hidden> — </span>
      <span>{splitMixedScript(first.title)}</span>
      {moreCount > 0 && (
        <span className="text-landing-muted/75"> {moreLabel}</span>
      )}
    </p>
  );
}

export function Curriculum() {
  const { t, lang } = useLanguage();
  const phases = CURRICULUM_PHASES[lang];
  const baseId = useId();
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(
    () => new Set(["phase-1"]),
  );

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((current) => {
      const next = new Set(current);
      if (next.has(phaseId)) {
        next.delete(phaseId);
      } else {
        next.add(phaseId);
      }
      return next;
    });
  };

  return (
    <Section id="curriculum">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <p className={`${EYEBROW} mb-4`}>{t.curriculum.eyebrow}</p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2 className="font-bn text-3xl font-bold tracking-tight text-landing-fg sm:text-4xl md:text-5xl">
            {t.curriculum.headline}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <p className="mt-4 font-bn text-lg leading-bn text-landing-muted sm:text-xl md:text-2xl">
            {splitMixedScript(t.curriculum.subhead)}
          </p>
        </ScrollReveal>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-12">
        <CurriculumCourseCard className="order-1 lg:col-start-2 lg:row-start-1" />

        <ScrollReveal delay={160} className="order-2 lg:col-start-1 lg:row-start-1">
          <div className="relative">
            <div
              aria-hidden
              className="absolute bottom-4 left-[4.65rem] top-3 w-0.5 bg-gradient-to-b from-landing-gradient-from to-landing-gradient-to sm:left-[5.15rem]"
            />

            <ol className="relative space-y-5 sm:space-y-6">
              {phases.map((phase, index) => {
                const phaseId = phaseIds[index];
                const isExpanded = expandedPhases.has(phaseId);
                const isDestination = phase.kind === "destination";
                const isShort = phase.kind === "short";
                const isDetailed = phase.kind === "detailed";
                const panelId = `${baseId}-${phaseId}-panel`;
                const isExpandable = !isDestination;

                return (
                  <li
                    key={phaseId}
                    className="relative grid grid-cols-[auto_auto_1fr] gap-x-3 sm:gap-x-4"
                  >
                    <div className="pt-4 text-right">
                      <span className="block min-w-[3.25rem] font-bn text-xs leading-bn text-landing-muted sm:min-w-[3.75rem] sm:text-sm">
                        {phase.weeks}
                      </span>
                    </div>

                    <div className="relative flex justify-center pt-4">
                      <span
                        aria-hidden
                        className={cn(
                          "relative z-10 shrink-0 rounded-full bg-gradient-to-br from-landing-gradient-from to-landing-gradient-to ring-4 ring-landing-bg",
                          isShort ? "h-2.5 w-2.5" : "h-3.5 w-3.5",
                        )}
                      />
                    </div>

                    <article
                      className={cn(
                        "rounded-xl border p-4 sm:p-5",
                        isDestination &&
                          "border-landing-accent/35 bg-landing-accent/5 border-l-[3px] border-l-landing-accent",
                        isDetailed &&
                          "border-landing-border bg-landing-bg-alt shadow-landing/40",
                        isShort &&
                          "border-landing-border/70 bg-landing-bg py-3.5 sm:py-4",
                      )}
                    >
                      <h3
                        className={cn(
                          "font-bn font-bold leading-snug text-landing-fg",
                          isShort ? "text-sm sm:text-base" : "text-base sm:text-lg",
                        )}
                      >
                        {splitMixedScript(phase.title)}
                      </h3>
                      <p
                        className={cn(
                          "mt-1.5 font-bn leading-bn",
                          isShort
                            ? "text-xs text-landing-muted/90 sm:text-sm"
                            : "text-sm text-landing-muted sm:text-base",
                        )}
                      >
                        {splitMixedScript(phase.outcome)}
                      </p>

                      {!isExpanded && isDetailed && (
                        <CollapsedPreview phase={phase} lang={lang} />
                      )}

                      {isExpandable && (
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-controls={panelId}
                          onClick={() => togglePhase(phaseId)}
                          className={cn(
                            "mt-3 rounded-sm font-bn text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-landing-accent",
                            isShort
                              ? "text-landing-muted hover:text-landing-fg"
                              : "text-landing-accent hover:text-landing-accent-hover",
                          )}
                        >
                          {isExpanded
                            ? t.curriculum.timelineCollapse
                            : isShort
                              ? t.curriculum.timelineExpandShort
                              : t.curriculum.timelineExpand}
                        </button>
                      )}

                      {isExpandable && (
                        <div
                          id={panelId}
                          role="region"
                          aria-hidden={!isExpanded}
                          className={cn(
                            "grid transition-[grid-template-rows] duration-300 ease-out",
                            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                          )}
                        >
                          <div className="overflow-hidden">
                            {isDetailed && (
                              <ul className="mt-4 space-y-3 border-t border-landing-border pt-4 sm:space-y-4">
                                {phase.weekRows.map((week) => (
                                  <WeekRow key={week.label} week={week} />
                                ))}
                              </ul>
                            )}

                            {isShort && (
                              <p className="mt-3 border-t border-landing-border/60 pt-3 font-bn text-sm leading-bn text-landing-muted sm:text-base">
                                {splitMixedScript(phase.summary)}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </article>
                  </li>
                );
              })}

              <li
                aria-hidden
                className="grid grid-cols-[auto_auto_1fr] gap-x-3 sm:gap-x-4"
              >
                <div />
                <div className="flex justify-center pb-1">
                  <span className="relative z-10 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-landing-gradient-from to-landing-gradient-to ring-4 ring-landing-bg" />
                </div>
                <div />
              </li>
            </ol>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
