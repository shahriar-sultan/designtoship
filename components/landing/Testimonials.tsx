"use client";

import { CTAButton } from "./CTAButton";
import { ScrollReveal } from "@/components/ScrollReveal";

const testimonials = [
  { quote: "UIMC আমাকে AI-চালিত ডিজাইনের দিকটা এত সহজ করে দেখিয়েছে যে, portfolio বানানো থেকে job পাওয়া সব ধাপেই clarity পেয়েছি।", name: "Marvin McKinney", role: "Senior UI/UX Designer at Google" },
  { quote: "UIMC আমাকে AI-চালিত ডিজাইনের দিকটা এত সহজ করে দেখিয়েছে যে, portfolio বানানো থেকে job পাওয়া সব ধাপেই clarity পেয়েছি।", name: "Marvin McKinney", role: "Senior UI/UX Designer at Google" },
  { quote: "UIMC আমাকে AI-চালিত ডিজাইনের দিকটা এত সহজ করে দেখিয়েছে যে, portfolio বানানো থেকে job পাওয়া সব ধাপেই clarity পেয়েছি।", name: "Marvin McKinney", role: "Senior UI/UX Designer at Google" },
  { quote: "UIMC আমাকে AI-চালিত ডিজাইনের দিকটা এত সহজ করে দেখিয়েছে যে, portfolio বানানো থেকে job পাওয়া সব ধাপেই clarity পেয়েছি।", name: "Marvin McKinney", role: "Senior UI/UX Designer at Google" },
  { quote: "UIMC আমাকে AI-চালিত ডিজাইনের দিকটা এত সহজ করে দেখিয়েছে যে, portfolio বানানো থেকে job পাওয়া সব ধাপেই clarity পেয়েছি।", name: "Marvin McKinney", role: "Senior UI/UX Designer at Google" },
  { quote: "UIMC আমাকে AI-চালিত ডিজাইনের দিকটা এত সহজ করে দেখিয়েছে যে, portfolio বানানো থেকে job পাওয়া সব ধাপেই clarity পেয়েছি।", name: "Marvin McKinney", role: "Senior UI/UX Designer at Google" },
];

export function Testimonials() {
  return (
    <section
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #FFFFFF 0%, #FFF4D4 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-[1224px] mx-auto">
          {/* Dark rounded card container */}
          <div
            className="relative rounded-[80px] p-8 md:p-12 lg:p-16 overflow-hidden"
            style={{ backgroundColor: "#1A110C" }}
          >
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg width="100%" height="100%">
                <defs>
                  <pattern
                    id="testimonial-grid"
                    width="30"
                    height="30"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 30 0 L 0 0 0 30"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#testimonial-grid)" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Section Badge */}
              <ScrollReveal>
                <div className="flex justify-center mb-8">
                  <div
                    className="rounded-full px-6 py-2 inline-flex items-center"
                    style={{
                      backgroundColor: "rgba(25, 23, 21, 0.5)",
                      border: "1px solid rgba(151, 114, 89, 0.59)",
                    }}
                  >
                    <span className="text-white text-sm font-medium">
                      Testimonial
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Main Heading - gradient */}
              <ScrollReveal delay={100}>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.2] text-center mb-12 max-w-[692px] mx-auto bg-linear-to-br from-[#F6F0EF] via-[#F9E19A] to-[#F9E19A] bg-clip-text text-transparent"
                >
                  এগিয়ে যাওয়া কিছু মানুষের কথা!
                </h2>
              </ScrollReveal>

              {/* Testimonial Cards Grid - 2x2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <ScrollReveal key={index} delay={200 + index * 100}>
                    <div
                      className="rounded-2xl p-6 space-y-6 backdrop-blur-[14px]"
                      style={{
                        backgroundColor: "rgba(123, 66, 37, 0.05)",
                        border: "2px solid #4C2317",
                      }}
                    >
                      {/* Quote marks */}
                      <div className="flex">
                        <svg
                          className="w-12 h-9"
                          viewBox="0 0 98 70"
                          fill="none"
                        >
                          <path
                            d="M0 0V70L45.44 0H0Z"
                            stroke="#EDD9CC"
                            strokeWidth="1.5"
                            fill="none"
                          />
                          <path
                            d="M51.91 0V70L97.53 0H51.91Z"
                            stroke="#EDD9CC"
                            strokeWidth="1.5"
                            fill="none"
                          />
                        </svg>
                      </div>
                      <p className="text-[#F6F2EF] text-sm md:text-base leading-relaxed">
                        {testimonial.quote}
                      </p>
                      <div
                        className="h-px w-full"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(237,217,204,0) 0%, rgba(142,114,98,1) 50%, rgba(237,217,204,0) 100%)",
                        }}
                      />
                      <div className="flex items-center gap-4">
                        <div
                          className="w-[70px] h-[70px] rounded-full flex-shrink-0"
                          style={{ backgroundColor: "#D9D9D9" }}
                        />
                        <div>
                          <div className="text-[#F5F5F5] text-base font-medium">
                            {testimonial.name}
                          </div>
                          <div
                            className="rounded-full px-2.5 py-1 border inline-block mt-1"
                            style={{
                              borderColor: "rgba(110, 88, 74, 1)",
                              color: "#FEB89D",
                            }}
                          >
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Joker Quote */}
          <ScrollReveal delay={600}>
            <p
              className="text-center mt-12 max-w-[1050px] mx-auto text-base md:text-lg leading-relaxed"
              style={{ color: "#FBE1C1" }}
            >
              Once The Joker Said - &quot;If you&apos;re good at something, never
              do it for free!&quot; But what he didn&apos;t say is - &quot;Sometimes
              the best return comes from giving, not charging.&quot;
            </p>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={700}>
            <div className="flex justify-center mt-10">
              <CTAButton>রেজিস্ট্রেশন করুন (It&apos;s Free)</CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
