"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { CtaButton } from "./CtaButton";
import { EditorialGraphicPlaceholder } from "./EditorialGraphicPlaceholder";
import { EYEBROW } from "./constants";
import { Section } from "./Section";
import { useLanguage } from "./LanguageProvider";

const GRAPHIC = {
  src: "/images/who-is-this-for-graphic.jpg",
  alt: "",
} as const;

function splitMixedScript(text: string) {
  const parts = text.split(/([A-Za-z0-9][A-Za-z0-9\s\-'.·(),+"→—]*)/g).filter(Boolean);

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

export function WhoIsThisFor() {
  const { t } = useLanguage();

  return (
    <Section id="who-is-this-for" containerClassName="max-w-6xl">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,45%)_minmax(0,55%)] lg:gap-12">
        <div className="text-left lg:col-start-2 lg:row-start-1">
          <ScrollReveal>
            <p className={`${EYEBROW} mb-4`}>{t.whoIsThisFor.eyebrow}</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="mb-6 font-bn text-3xl font-bold tracking-tight text-landing-fg sm:text-4xl md:mb-8 md:text-5xl">
              {t.whoIsThisFor.headline}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="rounded-2xl border border-landing-border bg-landing-bg-alt p-6 md:p-8">
              <h3 className="mb-4 font-bn text-lg font-semibold text-landing-fg">
                {t.whoIsThisFor.forTitle}
              </h3>
              <ul className="space-y-3">
                {t.whoIsThisFor.forItems.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 font-bn text-base leading-bn text-landing-muted"
                  >
                    <span className="shrink-0 text-landing-accent">✓</span>
                    <span>{splitMixedScript(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 font-bn text-sm leading-bn text-landing-muted sm:text-[0.9375rem]">
              {splitMixedScript(t.whoIsThisFor.disqualifier)}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <div className="mt-8 md:mt-10">
              <CtaButton />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={120} className="lg:col-start-1 lg:row-start-1">
          <EditorialGraphicPlaceholder src={GRAPHIC.src} alt={GRAPHIC.alt} />
        </ScrollReveal>
      </div>
    </Section>
  );
}
