"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CtaButton } from "./CtaButton";
import { LandingButton } from "./LandingButton";
import { EYEBROW_PILL, HERO_TOP_TINT } from "./constants";
import { useLanguage } from "./LanguageProvider";

function splitMixedScript(text: string) {
  const parts = text.split(/([A-Za-z0-9][A-Za-z0-9\s\-'.·,→]*)/g).filter(Boolean);

  return parts.map((part, index) =>
    /^[A-Za-z0-9]/.test(part) ? (
      <span key={`${part}-${index}`} className="font-latin">
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

export function Hero() {
  const { t } = useLanguage();

  const scrollToCurriculum = () => {
    document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative overflow-hidden bg-landing-bg bg-hero-tint pt-24 pb-0 md:pt-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: HERO_TOP_TINT }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 xl:gap-16">
          {/* Left column: copy */}
          <div className="order-1 text-left">
            <ScrollReveal>
              <p className={EYEBROW_PILL}>{t.hero.eyebrow}</p>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <h1 className="mt-5 font-bn text-[1.65rem] font-bold leading-bn tracking-tight text-landing-fg sm:text-4xl md:text-[2.75rem] md:leading-[1.2] lg:text-5xl lg:leading-[1.15]">
                {t.hero.headlineBefore}
                <span className="text-gradient-hero font-latin">{t.hero.headlineGradient}</span>
                <span className="font-latin">{t.hero.headlineAfter}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <p className="mt-5 max-w-xl font-bn text-base leading-bn text-landing-muted sm:text-lg sm:leading-bn">
                {splitMixedScript(t.hero.subtitle)}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={240}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CtaButton className="w-full sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-landing-accent" />
                <LandingButton
                  variant="outline"
                  onClick={scrollToCurriculum}
                  className="w-full border-landing-accent/50 bg-landing-accent/10 px-7 py-3.5 text-sm font-semibold text-landing-fg shadow-landing hover:border-landing-accent hover:bg-landing-accent/15 hover:text-landing-accent sm:w-auto md:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-landing-accent"
                >
                  {t.hero.ctaSecondary}
                </LandingButton>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column: mockup */}
          <ScrollReveal delay={120} className="order-2 w-full">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -left-3 top-8 rounded-full border border-landing-border bg-landing-bg px-3 py-1.5 text-xs font-medium text-landing-accent shadow-landing sm:-left-5"
              >
                <span className="font-latin">Figma</span>
                <span className="font-bn"> → Live</span>
              </div>
              <div
                aria-hidden="true"
                className="absolute -right-2 bottom-10 rounded-full border border-landing-border bg-landing-bg px-3 py-1.5 text-xs font-medium text-landing-muted shadow-landing sm:-right-4"
              >
                <span className="font-latin text-gradient-hero font-semibold">AI</span>
                <span className="font-bn"> Augmented</span>
              </div>

              <div className="shadow-landing-lg rounded-[20px] border border-landing-border bg-landing-surface p-2 sm:p-3">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-landing-bg-alt">
                  <Image
                    src="/hero-mockup-placeholder.svg"
                    alt="Course UI mockup preview"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
