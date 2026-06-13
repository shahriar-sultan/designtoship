"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";
import {
  EYEBROW,
  ZIGZAG_SECTION_ROOT,
  SECTION_INNER,
  CONTENT_COLUMN_RIGHT,
  PARTICLE_COLUMN_LEFT,
} from "./constants";

const phases = [
  {
    id: "phase-1",
    title: "Phase 1 — Design Foundations",
    weeks: "Weeks 1–3",
    items: [
      "Week 1 — Figma Basics: Frames, shapes, text, hierarchy, alignment. You make 2–3 real screens of your product.",
      "Week 2 — Components, Auto Layout, Typography, Color: The skills professionals use every day. You build your mini design system.",
      "Week 3 — UX Thinking: User flows, sitemaps, wireframes. You learn to think before you draw.",
    ],
  },
  {
    id: "phase-2",
    title: "Phase 2 — Website Design",
    weeks: "Weeks 4–5",
    items: [
      "Week 4 — Landing Page Design: Anatomy of a good landing page. You design your homepage live in class with a senior designer.",
      "Week 5 — Full Website Design: Remaining pages, fast. You finish using your existing design system, not starting from scratch.",
    ],
  },
  {
    id: "phase-3",
    title: "Phase 3 — Website Build and Ship",
    weeks: "Weeks 6–8",
    items: [
      "Week 6 — Your First AI Build: You write prompts. The AI builds. Your first component appears on screen.",
      "Week 7 — Building Your Full Website: Section by section, page by page, with AI.",
      "Week 8 — Go Live: Your website is deployed. Real URL. First ship.",
    ],
  },
  {
    id: "phase-4",
    title: "Phase 4 — Tool Design",
    weeks: "Weeks 9–10",
    items: [
      "Week 9 — UX for Products: User flows, states, error handling. How senior product designers think.",
      "Week 10 — Booking Tool Hi-Fi Design: Every screen, every state, polished in Figma.",
    ],
  },
  {
    id: "phase-5",
    title: "Phase 5 — Tool Build and Ship",
    weeks: "Weeks 11–12",
    items: [
      "Week 11 — Building the Booking Tool: AI-built, connected to Google Sheets as a real backend. Open the Sheet — that is your data.",
      "Week 12 — Polish and Go Live: Your tool is live. Users can install it on their phone.",
    ],
  },
  {
    id: "phase-6",
    title: "Phase 6 — Showcase",
    weeks: "Week 13",
    items: [
      "Week 13 — Demo Day: You present your two live products. You get personal feedback from a senior designer. You leave with two URLs and proof of what you can do.",
    ],
  },
];

export function Curriculum() {
  return (
    <section
      id="curriculum"
      data-particle-shape="open-laptop"
      data-particle-side="left"
      className={ZIGZAG_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div className={PARTICLE_COLUMN_LEFT} aria-hidden="true" />
      <div className={CONTENT_COLUMN_RIGHT}>
        <div className={SECTION_INNER}>
          <ScrollReveal>
            <p className={`${EYEBROW} mb-4`}>THE CURRICULUM</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              13 weeks.
              <br />
              6 phases.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-[#94A3B8] text-xl md:text-2xl mt-4 mb-10 md:mb-14">
              Everything is taught through your own real product. No fake exercises.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Accordion.Root
              type="single"
              collapsible
              defaultValue="phase-1"
              className="space-y-3"
            >
              {phases.map((phase) => (
                <Accordion.Item
                  key={phase.id}
                  value={phase.id}
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
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
