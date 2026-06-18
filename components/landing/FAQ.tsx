"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";
import { EYEBROW } from "./constants";
import { Section } from "./Section";
import { useLanguage } from "./LanguageProvider";

export function FAQ() {
  const { t } = useLanguage();

  return (
    <Section id="faq" variant="alt" containerClassName="max-w-2xl text-center">
      <ScrollReveal>
        <p className={`${EYEBROW} mb-4`}>{t.faq.eyebrow}</p>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-landing-fg mb-5 md:mb-10">
          {t.faq.headline}
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <Accordion.Root type="single" collapsible className="space-y-3 text-left">
          {t.faq.items.map((faq, index) => (
            <Accordion.Item
              key={faq.q}
              value={`faq-${index + 1}`}
              className="rounded-2xl border border-landing-border bg-landing-surface overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger
                  className={cn(
                    "flex w-full items-center justify-between gap-4 px-6 py-5 text-left",
                    "text-landing-fg font-medium text-base md:text-lg",
                    "hover:bg-landing-bg-alt transition-colors group cursor-pointer",
                  )}
                >
                  {faq.q}
                  <ChevronDown
                    className="w-5 h-5 text-landing-muted shrink-0 transition-transform group-data-[state=open]:rotate-180"
                    strokeWidth={1.5}
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden">
                <p className="px-6 pb-5 text-landing-muted text-base leading-relaxed border-t border-landing-border pt-4">
                  {faq.a}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </ScrollReveal>
    </Section>
  );
}
