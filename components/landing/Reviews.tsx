"use client";

import { CTAButton } from "./CTAButton";
import { ScrollReveal } from "@/components/ScrollReveal";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
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

  const onSelect = useCallback((api: { selectedScrollSnap: () => number; canScrollPrev: () => boolean; canScrollNext: () => boolean }) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const reviews = [
    { name: "Student 1", role: "Sr. UX Designer at Google" },
    { name: "Student 2", role: "Sr. UX Designer at Google" },
    { name: "Student 3", role: "Sr. UX Designer at Google" },
    { name: "Student 4", role: "Student at DIU" },
    { name: "Student 5", role: "Jr. UX Designer at Lamosa" },
    { name: "Student 6", role: "Sr. UX Designer at Google" },
  ];

  return (
    <section
      className="relative py-16 md:py-20 lg:py-24"
      style={{
        background: "linear-gradient(to bottom, #FFF4ED 0%, #FFFFFF 100%)",
      }}
    >
      <div className="container mx-auto">
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
                  আমার শিক্ষার্থীদের অনুভূতি
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal delay={100}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.2] text-center mb-12 max-w-[742px] mx-auto"
              style={{ color: "#402617" }}
            >
              যারা একদিন সন্দেহে ছিল, তারাই আজ নিজেদের ক্যারিয়ারে লিড দিচ্ছে!
            </h2>
          </ScrollReveal>

          {/* Carousel */}
          <ScrollReveal delay={200}>
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-5">
                  {reviews.map((review, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-[300px] sm:w-[356px]"
                    >
                      <div className="relative bg-white rounded-xl overflow-hidden h-[424px] md:h-[500px] shadow-lg">
                        <div className="w-full h-full bg-[#D9D9D9]" />
                        <div
                          className="absolute bottom-3 left-3 right-3 bg-black/35 backdrop-blur-[10px] rounded-2xl p-3 z-20"
                          style={{ backdropFilter: "blur(10px)" }}
                        >
                          <div className="text-white font-medium">
                            {review.name}
                          </div>
                          <div className="text-white/90 text-sm">
                            {review.role}
                          </div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                          <div
                            className="w-[60px] h-[60px] bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                            style={{
                              boxShadow: "0 7px 25px rgba(151, 114, 93, 0.1)",
                            }}
                          >
                            <span className="play-button-wave-small" />
                            <span className="play-button-wave-small" />
                            <span className="play-button-wave-small" />
                            <svg
                              className="relative z-10 w-5 h-6"
                              viewBox="0 0 19 21"
                              fill="none"
                            >
                              <path
                                d="M2 2L17 10.5L2 19V2Z"
                                fill="#000000"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-[#361F12] hover:bg-[#4A2F1A] disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center z-10"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-[#361F12] hover:bg-[#4A2F1A] disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center z-10"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              <div className="flex justify-center gap-2 mt-6">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      index === selectedIndex
                        ? "bg-[#361F12] w-8"
                        : "bg-[#977259]/40 w-2"
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={300}>
            <div className="flex justify-center mt-10">
              <CTAButton paddingVariant="large">
                আপনার ক্যারিয়ারের টার্নিং পয়েন্ট শুরু হোক এখন এখনই ওয়েবিনারে রেজিস্ট্রেশন করুন!
              </CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
