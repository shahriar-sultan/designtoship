"use client";

import { CTAButton } from "./CTAButton";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Reviews() {
  const t = useTranslations("reviews");

  return (
    <section className="relative bg-[#FFF4EF] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Badge */}
          <ScrollReveal>
            <div className="flex justify-center mb-8 md:mb-14">
              <div className="bg-[#FFF4ED]/50 border border-[#977259]/60 rounded-full px-4 md:px-6 py-[6px] inline-flex items-center">
                <span className="text-[#977259] text-base md:text-[18px] font-medium">
                  {t("badge")}
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal delay={100}>
            <div className="max-w-[1052px] mx-auto text-center mb-8 md:mb-14 px-4">
              <h2 className="text-[#402617] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.2]">
                {t("title")}
              </h2>
            </div>
          </ScrollReveal>

          {/* Testimonial Carousel */}
          <ScrollReveal delay={200}>
            <div className="relative overflow-hidden pb-8">
            {/* This creates a horizontal scrolling effect */}
            <div className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:-mx-[510px] md:px-[510px]">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[356px]"
                >
                  <div className="relative bg-white rounded-xl overflow-hidden h-[380px] sm:h-[424px] md:h-[500px]">
                    {/* Image Placeholder */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500" />

                    {/* Overlay with glassmorphism */}
                    <div
                      className="absolute bottom-0 left-0 right-0 mx-3 mb-3 md:mx-[14px] md:mb-[14px] bg-black/35 backdrop-blur-[10px] rounded-2xl md:rounded-[19px] p-3"
                      style={{
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div className="space-y-2">
                        <div className="text-white text-base md:text-lg lg:text-xl font-medium">
                          Student Name {i}
                        </div>
                        <div className="text-white/90 text-xs md:text-sm lg:text-base">
                          {t(`studentRoles.${i}`)}
                        </div>
                      </div>
                    </div>

                    {/* Play Button */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div
                        className="w-12 h-12 md:w-[60px] md:h-[60px] bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                        style={{
                          boxShadow: "0 7px 25px rgba(151, 114, 93, 0.1)",
                        }}
                      >
                        <svg
                          className="w-4 h-5 md:w-[19px] md:h-[21px]"
                          viewBox="0 0 19 21"
                          fill="none"
                        >
                          <path d="M2 2L17 10.5L2 19V2Z" fill="#000000" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </ScrollReveal>

          {/* Bottom CTA */}
          <ScrollReveal delay={300}>
            <div className="flex justify-center mt-8 md:mt-12">
              <CTAButton>
                {t("cta")}
              </CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
