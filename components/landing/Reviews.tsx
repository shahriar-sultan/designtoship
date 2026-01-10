"use client";

import { CTAButton } from "./CTAButton";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ScrollReveal";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Reviews() {
  const t = useTranslations("reviews");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const reviews = [1, 2, 3, 4, 5, 6];

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
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4 md:gap-5">
                  {reviews.map((i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 flex-[0_0_auto] w-[280px] sm:w-[300px] md:w-[356px]"
                    >
                      <div className="relative bg-white rounded-xl overflow-hidden h-[380px] sm:h-[424px] md:h-[500px]">
                        {/* Image Placeholder */}
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500" />

                        {/* Overlay with glassmorphism */}
                        <div
                          className="absolute bottom-0 left-0 right-0 mx-3 mb-3 md:mx-[14px] md:mb-[14px] bg-black/35 backdrop-blur-[10px] rounded-2xl md:rounded-[19px] p-3 z-20"
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
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 overflow-visible">
                          <div
                            className="relative w-12 h-12 md:w-[60px] md:h-[60px] bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                            style={{
                              boxShadow: "0 7px 25px rgba(151, 114, 93, 0.1)",
                            }}
                          >
                            {/* Floating waves */}
                            <span className="play-button-wave-small" />
                            <span className="play-button-wave-small" />
                            <span className="play-button-wave-small" />
                            <svg
                              className="relative z-10 w-4 h-5 md:w-[19px] md:h-[21px]"
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

              {/* Navigation Buttons */}
              <button
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 w-10 h-10 md:w-12 md:h-12 bg-[#361F12] hover:bg-[#4A2F1A] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-full flex items-center justify-center transition-all shadow-lg z-10"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
              <button
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 w-10 h-10 md:w-12 md:h-12 bg-[#361F12] hover:bg-[#4A2F1A] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-full flex items-center justify-center transition-all shadow-lg z-10"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      index === selectedIndex
                        ? "bg-[#361F12] w-8"
                        : "bg-[#977259]/40"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Bottom CTA */}
          <ScrollReveal delay={300}>
            <div className="flex justify-center mt-8 md:mt-12">
              <CTAButton>{t("cta")}</CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
