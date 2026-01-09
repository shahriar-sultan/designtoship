"use client";

import { Lightbulb } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ScrollReveal";

export function CTA() {
  const t = useTranslations("cta");

  const faqCategories = [
    {
      title: t("faq.categories.aiFear.title"),
      questions: t.raw("faq.categories.aiFear.questions") as string[],
    },
    {
      title: t("faq.categories.design.title"),
      questions: t.raw("faq.categories.design.questions") as string[],
    },
    {
      title: t("faq.categories.career.title"),
      questions: t.raw("faq.categories.career.questions") as string[],
    },
  ];

  return (
    <>
      {/* Investment Section */}
      <section className="relative bg-[#FFF4EF] py-12 md:py-16">
        {/* Gradient Background */}
        <div className="absolute bottom-0 left-0 right-0 h-[250px] md:h-[346px] bg-gradient-to-t from-[#FFF3ED] to-transparent pointer-events-none" />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-[1092px] mx-auto">
            {/* Heading */}
            <ScrollReveal>
              <div className="max-w-[1052px] mx-auto text-center mb-10 md:mb-14 space-y-3 md:space-y-4 px-4">
                <h2 className="text-[#402617] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.2]">
                  {t("investment.title")}
                </h2>
                <p className="text-[#64605D] text-lg md:text-xl lg:text-[22px] leading-relaxed">
                  {t("investment.subtitle")}
                </p>
              </div>
            </ScrollReveal>

            {/* Illustration Card */}
            <ScrollReveal delay={200}>
              <div 
              className="bg-[#FFF4D4] border-4 md:border-[8px] border-[#FFFCFB] rounded-3xl md:rounded-[40px] h-[350px] md:h-[432px] flex items-center justify-center"
              style={{
                boxShadow: `
                  2px -3px 8px rgba(228, 220, 216, 0.64),
                  8px -12px 14px rgba(228, 220, 216, 0.55),
                  18px -27px 19px rgba(228, 220, 216, 0.33),
                  32px -48px 23px rgba(228, 220, 216, 0.1),
                  50px -75px 25px rgba(228, 220, 216, 0.01)
                `,
              }}
            >
              <div className="text-center px-4">
                <div className="text-[#402617] text-2xl md:text-3xl lg:text-[40px] font-bold">
                  Illustration here
                </div>
                <p className="text-[#64605D] text-base md:text-lg mt-2">Investment Concept Visual</p>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-[#FFF4EF] py-12 md:py-16">
        {/* Top Gradient */}
        <div className="absolute top-0 left-0 right-0 h-[250px] md:h-[346px] bg-gradient-to-b from-[#FFF3ED] to-transparent pointer-events-none" />
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[250px] md:h-[346px] bg-gradient-to-t from-[#FFF3ED] to-transparent pointer-events-none" />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-[1200px] mx-auto">
            {/* Section Badge */}
            <ScrollReveal>
              <div className="flex justify-center mb-6 md:mb-8">
                <div 
                  className="bg-[#FFF4ED]/50 border border-[#977259]/60 rounded-full px-4 md:px-6 py-[6px] inline-flex items-center"
                >
                  <span className="text-[#977259] text-base md:text-[18px] font-medium">
                    {t("faq.badge")}
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Main Heading */}
            <ScrollReveal delay={100}>
              <div className="max-w-[1052px] mx-auto text-center mb-8 md:mb-12 space-y-3 md:space-y-4 px-4">
                <h2 className="text-[#402617] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.2]">
                  {t("faq.title")}
                </h2>
                <p className="text-[#64605D] text-lg md:text-xl lg:text-[22px] leading-relaxed">
                  {t("faq.subtitle")}
                </p>
              </div>
            </ScrollReveal>

            {/* FAQ Categories */}
            <div className="max-w-[632px] mx-auto mt-12 md:mt-16 space-y-10 md:space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <ScrollReveal key={categoryIndex} delay={categoryIndex * 150 + 200}>
                  <div className="space-y-3 md:space-y-4">
                  <h3 className="text-[#8F5C3F] text-xl md:text-[24px] font-semibold">
                    {category.title}
                  </h3>
                  
                  <div className="space-y-4 md:space-y-[18px]">
                    {category.questions.map((question, questionIndex) => (
                      <div key={questionIndex} className="flex items-start gap-3 md:gap-4">
                        <div className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0 text-[#7E7068] mt-1">
                          <Lightbulb className="w-full h-full" strokeWidth={1.5} />
                        </div>
                        <p className="text-[#402617] text-base md:text-lg lg:text-[20px] leading-[1.75]">
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
            <ScrollReveal delay={650}>
              <div className="flex justify-center mt-12 md:mt-16">
                <CTAButton paddingVariant="small">
                  {t("faq.cta")}
                </CTAButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
