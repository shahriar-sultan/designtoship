"use client";

import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const credentials = [
  "Head of Design at Niyyah (London-based EdTech platform)",
  "Senior Product Designer at Karaz Care (Saudi Arabia's Largest HealthTech platform)",
  "Founder & CEO at LumixelStudio, a digital design and no-code development agency.",
  "Founder & Mentor at UI Design Marathon Course (UIMC) my very success course ever!",
  "300+ Designer Trained in Bangladesh",
  "50+ Designer Mentored Worldwide",
];

export function MyIntro() {
  return (
    <section
      className="relative py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#FFD5D6" }}
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
                  এখন আমি কোথায় ?
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal delay={100}>
            <div className="max-w-[1052px] mx-auto text-center mb-8 space-y-4">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.2]"
                style={{ color: "#402617" }}
              >
                আমি যেখানে দাঁড়িয়ে… তার শুরুটা ছিল ঠিক আপনার জায়গা থেকেই!
              </h2>
              <p
                className="text-lg md:text-xl"
                style={{ color: "#635F5E" }}
              >
                আমি শাহরিয়ার সুলতান ডিজাইন করি, শেখাই, আর পথ দেখাই।
              </p>
            </div>
          </ScrollReveal>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
            {/* Left: Profile Image Card */}
            <ScrollReveal delay={200} direction="right">
              <div
                className="rounded-[40px] h-[534px] flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: "#FFF4D4",
                  border: "8px solid #FFFCFB",
                  boxShadow: `
                    1px -1px 4px rgba(161, 150, 145, 0.32),
                    4px -5px 7px rgba(161, 150, 145, 0.28),
                    8px -12px 9px rgba(161, 150, 145, 0.16),
                    15px -22px 11px rgba(161, 150, 145, 0.05),
                    23px -34px 12px rgba(161, 150, 145, 0.01)
                  `,
                }}
              >
                <div className="w-full h-full bg-[#FFF4D4] flex items-center justify-center">
                  <div
                    className="text-center opacity-30"
                    style={{ color: "#402617" }}
                  >
                    <svg
                      className="w-32 h-32 mx-auto mb-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <p className="text-sm font-medium">Profile Image</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Credentials List */}
            <ScrollReveal delay={300} direction="left">
              <div className="space-y-6">
                <h3
                  className="text-xl font-semibold"
                  style={{ color: "#8F4039" }}
                >
                  আমার ছোট্ট পরিচিতি
                </h3>
                <div className="space-y-5">
                  {credentials.map((credential, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className="w-8 h-8 flex-shrink-0 mt-0.5"
                        style={{ color: "#7E7068" }}
                      >
                        <ArrowRight
                          className="w-full h-full"
                          strokeWidth={2}
                        />
                      </div>
                      <p
                        className="text-base md:text-lg leading-relaxed"
                        style={{ color: "#402617" }}
                      >
                        {credential}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
