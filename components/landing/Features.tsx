"use client";

import { Card } from "@/components/ui/card";
import { GraduationCap, Laptop, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Features() {
  const features = [
    {
      icon: GraduationCap,
      title: "ক্যারিয়ার পরিবর্তন",
      description: "যেকোনো ব্যাকগ্রাউন্ড থেকে UI/UX ডিজাইনে কীভাবে আসবেন তা প্রমাণিত কৌশল দিয়ে শিখুন",
    },
    {
      icon: Laptop,
      title: "আয়ের উৎস",
      description: "ফ্রিল্যান্সিং, ফুল-টাইম রোল এবং প্যাসিভ ইনকাম সহ ডিজাইনে একাধিক আয়ের উৎস আবিষ্কার করুন",
    },
    {
      icon: Sparkles,
      title: "AI ইন্টিগ্রেশন",
      description: "আপনার প্রোডাক্টিভিটি এবং ক্রিয়েটিভিটি বাড়াতে কাটিং-এজ AI টুলস এবং টেকনিক মাস্টার করুন",
    },
  ];

  return (
    <section className="relative bg-[#FFF4EF] py-12 md:py-16">
      {/* Gradient Background */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] md:h-[651px] bg-gradient-to-t from-[#FFF3ED] to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Badge */}
          <ScrollReveal>
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="bg-[#FFF4ED]/50 border border-[#977259]/60 rounded-full px-4 md:px-6 py-[6px] inline-flex items-center">
                <span className="text-[#977259] text-base md:text-[18px] font-medium">
                  আপনি কী শিখবেন
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal delay={100}>
            <div className="max-w-[800px] mx-auto text-center mb-8 md:mb-12 space-y-3 md:space-y-4 px-4">
              <h2 className="text-[#402617] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.2]">
                আপনার ডিজাইন ক্যারিয়ার পরিবর্তন করুন
              </h2>
              <p className="text-[#64605D] text-lg md:text-xl lg:text-[22px] leading-relaxed">
                সফল ক্যারিয়ার গড়ার জন্য টপ ডিজাইনাররা যে স্কিলস এবং কৌশল ব্যবহার করে তা আয়ত্ত করুন
              </p>
            </div>
          </ScrollReveal>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 100 + 200}>
                <Card
                  key={index}
                  className="bg-white border-2 border-[#EADED7] rounded-2xl md:rounded-[20px] p-5 md:p-7 hover:shadow-[0_4px_24px_rgba(110,95,87,0.1)] transition-shadow h-full"
                >
                  <div className="space-y-4 md:space-y-6">
                    {/* Icon */}
                    <div className="w-7 h-7 md:w-8 md:h-8 text-[#6D6059]">
                      <feature.icon
                        className="w-full h-full"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-2 md:space-y-3">
                      <h3 className="text-[#402617] text-lg md:text-[20px] font-bold leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-[#6A615C] text-sm md:text-[15px] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
