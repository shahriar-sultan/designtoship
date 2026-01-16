"use client";

import { CTAButton } from "./CTAButton";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Testimonials() {
  const testimonials = [
    {
      quote: "এই ওয়েবিনার আমার ডিজাইন ক্যারিয়ারের ধারণা সম্পূর্ণ পরিবর্তন করে দিয়েছে। AI ইন্টিগ্রেশন কৌশলগুলো ছিল গেম-চেঞ্জিং।",
      name: "সারা চেন",
      role: "Spotify-তে UX ডিজাইনার",
    },
    {
      quote: "সাস্টেনেবল ডিজাইন ক্যারিয়ার গড়ার অসাধারণ ইনসাইটস। প্র্যাকটিক্যাল অ্যাডভাইসগুলো ছিল ঠিক যা আমার দরকার ছিল।",
      name: "আলেক্স রদ্রিগেজ",
      role: "Airbnb-তে প্রোডাক্ট ডিজাইনার",
    },
    {
      quote: "এখানে দেওয়া রোডম্যাপটি বিস্তারিত এবং কার্যকর। আমি ইতিমধ্যেই কৌশলগুলো ইমপ্লিমেন্ট করা শুরু করেছি।",
      name: "মায়া প্যাটেল",
      role: "Netflix-তে সিনিয়র UI ডিজাইনার",
    },
    {
      quote: "অবশেষে ডিজাইনে এগিয়ে যাওয়ার একটি স্পষ্ট পথ। AI টুলস ওভারভিউ আমাকে মাসের গবেষণা বাঁচিয়েছে।",
      name: "জেমস উইলসন",
      role: "Microsoft-তে ডিজাইন লিড",
    },
    {
      quote: "ট্রান্সফরমেটিভ কনটেন্ট যা ট্র্যাডিশনাল ডিজাইনকে মডার্ন AI ক্যাপাবিলিটিসের সাথে কানেক্ট করে।",
      name: "লিসা থম্পসন",
      role: "Adobe-তে ক্রিয়েটিভ ডিরেক্টর",
    },
    {
      quote: "ক্যারিয়ার ট্রানজিশন গাইডেন্স ছিল পারফেক্ট। আমি এখন কনফিডেন্টলি ডিজাইনকে ক্যারিয়ার হিসেবে অনুসরণ করছি।",
      name: "ডেভিড কিম",
      role: "Meta-তে UI/UX ডিজাইনার",
    },
  ];

  return (
    <section className="relative bg-[#FFF4EF] py-12 md:py-16">
      {/* Gradient Background */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] md:h-[651px] bg-gradient-to-t from-[#FFF3ED] to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-[1224px] mx-auto">
          {/* Section Badge */}
          <ScrollReveal>
            <div className="flex justify-center mb-6 md:mb-8">
              <div 
                className="bg-[#FFF4ED]/50 border border-[#977259]/60 rounded-full px-4 md:px-6 py-[6px] inline-flex items-center"
              >
                <span className="text-[#977259] text-base md:text-[18px] font-medium">
                  সাফল্যের গল্প
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal delay={100}>
            <div className="max-w-[1052px] mx-auto text-center mb-8 md:mb-12 space-y-3 md:space-y-4 px-4">
              <h2 className="text-[#402617] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.2]">
                হাজারো সফল ডিজাইনারদের সাথে যোগ দিন
              </h2>
              <p className="text-[#64605D] text-lg md:text-xl lg:text-[22px] leading-relaxed">
                আমাদের প্রমাণিত কৌশল ব্যবহার করে যারা তাদের ক্যারিয়ার পরিবর্তন করেছেন তাদের রিয়েল গল্প
              </p>
            </div>
          </ScrollReveal>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 100 + 200}>
                <Card 
                key={index}
                className="bg-[#FFFEFB] border-2 border-[#EDDAD0] rounded-2xl p-5 md:p-6 space-y-6 md:space-y-8"
              >
                {/* Quote Decoration */}
                <div className="flex gap-1">
                  <svg className="w-20 md:w-[98px] h-14 md:h-[70px]" viewBox="0 0 98 70" fill="none">
                    <path 
                      d="M0 0V70L45.44 0H0Z" 
                      stroke="#EDDAD0" 
                      strokeWidth="1.5" 
                      fill="none"
                    />
                    <path 
                      d="M51.91 0V70L97.53 0H51.91Z" 
                      stroke="#EDDAD0" 
                      strokeWidth="1.5" 
                      fill="none"
                    />
                  </svg>
                </div>

                {/* Quote Text */}
                <p className="text-[#402617] text-sm md:text-[16px] leading-relaxed">
                  {testimonial.quote}
                </p>

                {/* Divider Line */}
                <div 
                  className="h-[1px] w-full"
                  style={{
                    background: 'linear-gradient(90deg, rgba(237, 218, 208, 0) 0%, rgba(210, 186, 173, 1) 50%, rgba(237, 218, 208, 0) 100%)',
                  }}
                />

                {/* Author Info */}
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Avatar Placeholder */}
                  <div className="w-14 h-14 md:w-[70px] md:h-[70px] rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400" />
                  </div>
                  
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="text-[#65605B] text-base md:text-[18px] leading-tight">
                      {testimonial.name}
                    </div>
                    <div className="border border-[#BDB0A3] rounded-full px-[10px] py-[1px] inline-block">
                      <span className="text-[#402617] text-xs md:text-[13px]">
                        {testimonial.role}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <ScrollReveal delay={800}>
            <div className="flex justify-center mt-10 md:mt-14">
              <CTAButton paddingVariant="large">
                Join the Webinar
              </CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
