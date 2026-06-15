"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";
import {
  EYEBROW,
  CENTERED_SECTION_ROOT,
  CENTERED_SECTION_CONTENT,
  CENTERED_SECTION_VIGNETTE,
} from "./constants";
import { useLanguage } from "./LanguageProvider";

const phaseIds = [
  "phase-1",
  "phase-2",
  "phase-3",
  "phase-4",
  "phase-5",
  "phase-6",
];

function renderCurriculumItem(item: string, lang: "bn" | "en") {
  const enMatch = item.match(/^Week (\d+) — (.+)$/);
  const bnMatch = item.match(/^সপ্তাহ ([\d০-৯]+) — (.+)$/);

  if (lang === "en" && enMatch) {
    return (
      <>
        <span className="font-bold text-[#F1F5F9]">Week {enMatch[1]}:</span>{" "}
        {enMatch[2]}
      </>
    );
  }

  if (lang === "bn" && bnMatch) {
    return (
      <>
        <span className="font-bold text-[#F1F5F9]">সপ্তাহ {bnMatch[1]}:</span>{" "}
        {bnMatch[2]}
      </>
    );
  }

  return item;
}

export function Curriculum() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="curriculum"
      data-particle-shape="galaxy-spiral"
      className={CENTERED_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div
        className={CENTERED_SECTION_CONTENT}
        style={{ background: CENTERED_SECTION_VIGNETTE }}
      >
        <ScrollReveal>
          <p className={`${EYEBROW} mb-4`}>{t.curriculum.eyebrow}</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9]">
            {t.curriculum.headline}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="text-[#94A3B8] text-xl md:text-2xl mt-4 mb-5 md:mb-14">
            {t.curriculum.subhead}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <Accordion.Root
            type="single"
            collapsible
            defaultValue="phase-1"
            className="space-y-3 text-left"
          >
            {t.curriculum.phases.map((phase, index) => (
              <Accordion.Item
                key={phaseIds[index]}
                value={phaseIds[index]}
                className="rounded-2xl border border-[#1C2740] bg-[#0F1520] overflow-hidden"
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    className={cn(
                      "flex w-full items-center justify-between gap-4 px-6 py-5 text-left",
                      "text-[#F1F5F9] hover:bg-[#0F1520]/80 transition-colors",
                      "group cursor-pointer",
                    )}
                  >
                    <div>
                      <span className="block text-lg font-semibold">
                        {phase.title}
                      </span>
                      <span className="block text-base text-[#475569] font-normal mt-1">
                        {phase.weeks}
                      </span>
                    </div>
                    <ChevronDown
                      className="w-5 h-5 text-[#94A3B8] shrink-0 transition-transform group-data-[state=open]:rotate-180"
                      strokeWidth={1.5}
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <ul className="px-6 pb-6 space-y-3 border-t border-[#1C2740] pt-4">
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        className="text-[#94A3B8] text-base leading-relaxed pl-4 border-l-2 border-[#6C3EFF]/40"
                      >
                        {renderCurriculumItem(item, lang)}
                      </li>
                    ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </ScrollReveal>
      </div>
    </section>
  );
}
