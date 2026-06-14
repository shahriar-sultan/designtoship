"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { LandingButton } from "./LandingButton";
import { EYEBROW, HERO_FULLSCREEN_VIGNETTE } from "./constants";
import { useLanguage } from "./LanguageProvider";

function renderBengaliNumerals(text: string) {
  const parts = text.split(/([\u09E6-\u09EF]+)/g).filter(Boolean);

  return parts.map((part, index) =>
    /^[\u09E6-\u09EF]+$/.test(part) ? (
      <span key={`${part}-${index}`} className="font-bold">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function Hero() {
  const { t, lang } = useLanguage();

  const stats = [
    { value: "78+", label: t.hero.stat1 },
    { value: "2", label: t.hero.stat2 },
    { value: "2", label: t.hero.stat3 },
  ];

  const scrollToWhatYouLearn = () => {
    document.getElementById("what-you-learn")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCurriculum = () => {
    document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      data-particle-shape="stellar-nebula"
      className="relative min-h-screen flex items-center justify-center"
      style={{ background: "transparent" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: HERO_FULLSCREEN_VIGNETTE }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 py-24 text-center min-h-screen flex flex-col items-stretch justify-center">
        <ScrollReveal>
          <p className={EYEBROW}>{t.hero.eyebrow}</p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F1F5F9] leading-[1.05] mt-8">
            {t.hero.headline1}
            <br />
            {t.hero.headline2}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-xl md:text-2xl text-[#94A3B8] leading-relaxed max-w-2xl mx-auto mt-6">
            {t.hero.subhead}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300} className="w-full">
          <p
            className="w-full text-base text-[#F1F5F9] font-normal mt-4 tracking-normal text-center px-4 [font-synthesis:none]"
            style={
              lang === "bn"
                ? {
                    fontFamily:
                      "var(--font-bengali), var(--font-hind-siliguri), sans-serif",
                    WebkitFontSmoothing: "subpixel-antialiased",
                    MozOsxFontSmoothing: "auto",
                  }
                : undefined
            }
          >
            {lang === "bn" ? renderBengaliNumerals(t.hero.supporting) : t.hero.supporting}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <LandingButton>{t.hero.ctaPrimary}</LandingButton>
            <button
              type="button"
              onClick={scrollToWhatYouLearn}
              className="text-[#94A3B8] hover:text-[#F1F5F9] text-base font-medium transition-colors cursor-pointer"
            >
              {t.hero.ctaSecondary}
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={500}>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 pt-8 max-w-3xl mx-auto w-full">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#1C2740] bg-[#0F1520]/80 p-5 md:p-6 text-left"
              >
                <p className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-[#6C3EFF] via-[#A855F7] to-[#22D3EE] bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-[#94A3B8] mt-1 text-base">{stat.label}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={scrollToCurriculum}
            className="text-[#94A3B8] hover:text-[#F1F5F9] text-base font-medium transition-colors cursor-pointer mt-6"
          >
            {t.hero.seeCurriculum}
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
