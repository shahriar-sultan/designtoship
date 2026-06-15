"use client";

import { AlertTriangle, Layers, Rocket } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  EYEBROW,
  CENTERED_SECTION_ROOT,
  CENTERED_SECTION_CONTENT,
  CENTERED_SECTION_VIGNETTE,
} from "./constants";
import { useLanguage } from "./LanguageProvider";

export function Problem() {
  const { t } = useLanguage();

  const cards = [
    {
      icon: Layers,
      title: t.problem.card1Title,
      description: t.problem.card1Body,
    },
    {
      icon: AlertTriangle,
      title: t.problem.card2Title,
      description: t.problem.card2Body,
    },
    {
      icon: Rocket,
      title: t.problem.card3Title,
      description: t.problem.card3Body,
    },
  ];

  return (
    <section
      id="problem"
      data-particle-shape="sphere"
      className={CENTERED_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div
        className={CENTERED_SECTION_CONTENT}
        style={{ background: CENTERED_SECTION_VIGNETTE }}
      >
        <ScrollReveal>
          <p className={`${EYEBROW} mb-4`}>{t.problem.eyebrow}</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] mb-6 md:mb-16">
            {t.problem.headline}
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 text-left">
          {cards.map((card, index) => (
            <ScrollReveal key={card.title} delay={150 + index * 100}>
              <div className="rounded-2xl border border-[#1C2740] bg-[#0F1520] p-6 md:p-8 h-full">
                <card.icon className="w-6 h-6 text-[#A855F7] mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-[#F1F5F9] mb-3">
                  {card.title}
                </h3>
                <p className="text-[#94A3B8] text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
