"use client";

import {
  Layout,
  Type,
  Palette,
  Component,
  Route,
  MousePointerClick,
  Boxes,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { EYEBROW } from "./constants";
import { Section } from "./Section";
import { useLanguage } from "./LanguageProvider";

const skillIcons: LucideIcon[] = [
  Route,
  Layout,
  Boxes,
  Palette,
  Type,
  MousePointerClick,
  Smartphone,
  Component,
];

export function WhatYouLearn() {
  const { t } = useLanguage();

  return (
    <Section id="what-you-learn" variant="alt" containerClassName="max-w-5xl">
      <div className="text-center mb-8 md:mb-12">
        <ScrollReveal>
          <p className={`${EYEBROW} mb-4`}>{t.whatYouLearn.eyebrow}</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-landing-fg mb-5">
            {t.whatYouLearn.headline}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="text-xl text-landing-muted max-w-2xl mx-auto leading-relaxed">
            {t.whatYouLearn.subhead}
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {t.whatYouLearn.skills.map((skill, index) => {
          const Icon = skillIcons[index];
          return (
            <ScrollReveal key={skill.title} delay={200 + index * 50}>
              <div className="rounded-2xl border border-landing-border bg-landing-surface p-6 text-left transition-colors hover:border-landing-accent/40 h-full">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-landing-gradient-from to-landing-gradient-to">
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-semibold text-landing-fg mb-2">
                  {skill.title}
                </h3>
                <p className="text-base text-landing-muted leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
}
