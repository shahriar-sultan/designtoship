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

export function FAQ() {
  const { t } = useLanguage();

  return (
    <section
      id="faq"
      data-particle-shape="supernova-shell"
      className={CENTERED_SECTION_ROOT}
      style={{ background: "transparent" }}
    >
      <div
        className={CENTERED_SECTION_CONTENT}
        style={{ background: CENTERED_SECTION_VIGNETTE }}
      >
        <ScrollReveal>
          <p className={`${EYEBROW} mb-4`}>{t.faq.eyebrow}</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] mb-5 md:mb-14">
            {t.faq.headline}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <Accordion.Root type="single" collapsible className="space-y-3 text-left">
            {t.faq.items.map((faq, index) => (
              <Accordion.Item
                key={faq.q}
                value={`faq-${index + 1}`}
                className="rounded-2xl border border-[#1C2740] bg-[#0F1520] overflow-hidden"
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    className={cn(
                      "flex w-full items-center justify-between gap-4 px-6 py-5 text-left",
                      "text-[#F1F5F9] font-medium text-base md:text-lg",
                      "hover:bg-[#0F1520]/80 transition-colors group cursor-pointer",
                    )}
                  >
                    {faq.q}
                    <ChevronDown
                      className="w-5 h-5 text-[#94A3B8] shrink-0 transition-transform group-data-[state=open]:rotate-180"
                      strokeWidth={1.5}
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden">
                  <p className="px-6 pb-5 text-[#94A3B8] text-base leading-relaxed border-t border-[#1C2740] pt-4">
                    {faq.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </ScrollReveal>
      </div>
    </section>
  );
}
