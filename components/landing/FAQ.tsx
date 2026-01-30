"use client";

import { CTAButton } from "./CTAButton";
import { Lightbulb } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const faqCategories = [
  {
    title: "AI Vs. You",
    questions: [
      "AI কি সম্পূর্ণরূপে ডিজাইনারদের Replace করবে?",
      "AI-Dominated ইন্ডাস্ট্রিতে কীভাবে প্রাসঙ্গিক থাকবো?",
      "প্রথমে কোন AI টুলস শিখবেন?",
    ],
  },
  {
    title: "Designing Career",
    questions: [
      "শুরু করার জন্য কি ডিজাইন ডিগ্রি দরকার?",
      "প্রফেশনাল ডিজাইনার হতে কত সময় লাগে?",
      "বিগিনার হিসেবে কত স্যালারি আশা করতে পারি?",
    ],
  },
  {
    title: "Practical Learning",
    questions: [
      "আমার পোর্টফোলিওতে কোন প্রজেক্টস ইনক্লুড করব?",
      "প্রথম ডিজাইন জব কীভাবে খুঁজব?",
      "ডিজাইন স্কিলস প্র্যাকটিস করার সেরা উপায় কী?",
    ],
  },
];

export function FAQ() {
  return (
    <section className="relative bg-white py-16 md:py-20 lg:py-24">
      {/* Top Gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-[341px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 244, 237, 1) 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Badge */}
          <ScrollReveal>
            <div className="flex justify-center mb-8">
              <div
                className="rounded-full px-6 py-2 inline-flex items-center"
                style={{
                  backgroundColor: "rgba(255, 244, 237, 0.5)",
                  border: "1px solid rgba(151, 114, 89, 0.59)",
                }}
              >
                <span
                  className="text-base font-medium"
                  style={{ color: "#AA5B2F" }}
                >
                  FAQ
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal delay={100}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.2] text-center mb-12 max-w-[622px] mx-auto bg-linear-to-br from-[#1F1A17] to-[#D7540D] bg-clip-text text-transparent"
            >
              যে প্রশ্নের উত্তর আপনার জন্য অপেক্ষা করছে এই Webiner-এ!
            </h2>
          </ScrollReveal>

          {/* FAQ Categories */}
          <div className="space-y-14 max-w-[632px] mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <ScrollReveal key={categoryIndex} delay={200 + categoryIndex * 100}>
                <div className="space-y-4">
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: "#AE4407" }}
                  >
                    {category.title}
                  </h3>
                  <div className="space-y-5">
                    {category.questions.map((question, questionIndex) => (
                      <div key={questionIndex} className="flex items-start gap-4">
                        <div
                          className="w-8 h-8 flex-shrink-0 mt-0.5"
                          style={{ color: "#7E7068" }}
                        >
                          <Lightbulb
                            className="w-full h-full"
                            strokeWidth={1.5}
                            fill="currentColor"
                          />
                        </div>
                        <p
                          className="text-base md:text-lg leading-relaxed"
                          style={{ color: "#402617" }}
                        >
                          {question}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <ScrollReveal delay={500}>
            <div className="flex justify-center mt-10">
              <CTAButton>রেজিস্ট্রেশন করুন (It&apos;s Free)</CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
