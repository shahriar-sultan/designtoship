"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import {
  EYEBROW,
  CENTERED_SECTION_ROOT,
  CENTERED_SECTION_CONTENT,
  CENTERED_SECTION_VIGNETTE,
} from "./constants";
import { useLanguage } from "./LanguageProvider";

export function ToolStack() {
  const { t } = useLanguage();

  return (
    <section
      id="tools"
      data-particle-shape="milky-way"
      className={CENTERED_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div
        className={CENTERED_SECTION_CONTENT}
        style={{ background: CENTERED_SECTION_VIGNETTE }}
      >
        <ScrollReveal>
          <p className={`${EYEBROW} mb-4`}>{t.toolStack.eyebrow}</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9]">
            {t.toolStack.headline}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="text-[#94A3B8] text-xl md:text-2xl mt-4 mb-10 md:mb-14">
            {t.toolStack.subhead}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-4 md:gap-6 text-left">
          {t.toolStack.tools.map((tool, index) => (
            <ScrollReveal key={tool.name} delay={100 + index * 60}>
              <div className="rounded-2xl border border-[#1C2740] bg-[#0F1520] p-5 md:p-6 h-full">
                <h3 className="text-base md:text-lg font-semibold text-[#F1F5F9] mb-2">
                  {tool.name}
                </h3>
                <p className="text-[#94A3B8] text-base leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <p className="text-center text-[#475569] text-base mt-10">
            {t.toolStack.footnote}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
