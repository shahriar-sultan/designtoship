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

const faqs = [
  {
    id: "faq-1",
    question: "Do I need to know design or coding before joining?",
    answer:
      "No. This course starts from zero. The only thing you need is a computer, an internet connection, and the willingness to show up and do the work.",
  },
  {
    id: "faq-2",
    question: "Will I really not write any code?",
    answer:
      "Correct. You will learn to give very precise instructions to AI, and the AI will write the code. Your job is to design well and direct the AI clearly. That is the skill.",
  },
  {
    id: "faq-3",
    question: "What if I miss a class?",
    answer:
      "Every class is recorded. You will have lifetime access to all recordings. But showing up live is how you get the most out of the Build Labs and the feedback.",
  },
  {
    id: "faq-4",
    question: "What is a product track?",
    answer:
      "Everyone in the batch works on a different version of the same product type. You will be assigned a track before the batch starts. This way you have peers to compare with, and a senior designer can give you focused feedback.",
  },
  {
    id: "faq-5",
    question: "When does Batch 4 start?",
    answer:
      "The start date will be announced once the pre-sale closes. You will be the first to know after you apply.",
  },
];

export function FAQ() {
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
          <p className={`${EYEBROW} mb-4`}>COMMON QUESTIONS</p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] mb-10 md:mb-14">
            Questions people ask before joining.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <Accordion.Root type="single" collapsible className="space-y-3 text-left">
            {faqs.map((faq) => (
              <Accordion.Item
                key={faq.id}
                value={faq.id}
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
                    {faq.question}
                    <ChevronDown
                      className="w-5 h-5 text-[#94A3B8] shrink-0 transition-transform group-data-[state=open]:rotate-180"
                      strokeWidth={1.5}
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden">
                  <p className="px-6 pb-5 text-[#94A3B8] text-base leading-relaxed border-t border-[#1C2740] pt-4">
                    {faq.answer}
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
