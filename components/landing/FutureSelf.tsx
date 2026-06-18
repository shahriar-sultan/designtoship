"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { FUTURE_SELF_SECTION } from "./future-self-config";
import { Section } from "./Section";
import { useLanguage } from "./LanguageProvider";

function splitMixedScript(text: string) {
  const parts = text.split(/([A-Za-z0-9][A-Za-z0-9\s\-'.·(),"+?→—]*)/g).filter(Boolean);

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

function renderRichText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={`bold-${index}`}
          className="font-semibold text-landing-fg"
        >
          {splitMixedScript(part.slice(2, -2))}
        </strong>
      );
    }

    return (
      <span key={`text-${index}`}>{splitMixedScript(part)}</span>
    );
  });
}

function HandDrawnUnderline() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -bottom-1 left-0 h-3 w-full text-landing-accent sm:-bottom-1.5 sm:h-3.5"
      viewBox="0 0 240 14"
      preserveAspectRatio="none"
    >
      <path
        d="M3 10 C48 3, 96 12, 144 5 S 210 11, 237 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CollageSquiggle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 48 32"
      fill="none"
    >
      <path
        d="M4 20 C12 8, 20 24, 28 12 S 40 8, 44 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="40" cy="8" r="2" fill="currentColor" />
    </svg>
  );
}

function DottedConnector({ className }: { className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 64 24" fill="none">
      <path
        d="M4 12 H60"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CursorDoodle({ className }: { className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 24 28" fill="none">
      <path
        d="M5 3 L5 21 L10 16 L14 24 L17 22 L13 14 L20 14 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SparkDoodle({ className }: { className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2 L11.2 8.8 L18 10 L11.2 11.2 L10 18 L8.8 11.2 L2 10 L8.8 8.8 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DreamCollage({
  images,
}: {
  images: (typeof FUTURE_SELF_SECTION)["bn"]["images"];
}) {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm sm:max-w-md md:mx-0 md:max-w-none md:aspect-auto md:min-h-[26rem] lg:min-h-[28rem]">
      <div className="absolute left-0 top-0 z-10 w-[74%] rotate-[-1.5deg]">
        <div className="overflow-hidden rounded-2xl border border-landing-border bg-landing-surface shadow-landing">
          <img
            src={images[0].src}
            alt={images[0].alt}
            width={560}
            height={420}
            decoding="async"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>
      </div>

      <CollageSquiggle className="absolute left-[58%] top-[34%] z-20 h-8 w-12 text-landing-accent/80" />
      <DottedConnector className="absolute left-[42%] top-[48%] z-20 h-6 w-16 text-landing-accent/55" />

      <div className="absolute right-0 top-[10%] z-20 w-[60%] rotate-[2deg]">
        <div className="overflow-hidden rounded-2xl border border-landing-border bg-landing-surface shadow-landing-lg">
          <img
            src={images[1].src}
            alt={images[1].alt}
            width={480}
            height={360}
            decoding="async"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-[14%] z-30 w-[52%] rotate-[-1deg]">
        <div className="overflow-hidden rounded-xl border border-landing-border bg-landing-surface shadow-landing">
          <img
            src={images[2].src}
            alt={images[2].alt}
            width={400}
            height={300}
            decoding="async"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>
      </div>

      <CursorDoodle className="absolute bottom-[18%] right-[8%] z-20 h-7 w-6 text-landing-accent/70" />
    </div>
  );
}

export function FutureSelf() {
  const { lang } = useLanguage();
  const copy = FUTURE_SELF_SECTION[lang];

  return (
    <Section
      id="future-self"
      variant="alt"
      containerClassName="max-w-6xl"
      aria-labelledby="future-self-heading"
    >
      <ScrollReveal className="mx-auto max-w-4xl text-center">
        <h2
          id="future-self-heading"
          className="font-bn text-2xl font-bold leading-snug tracking-tight text-landing-fg sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-tight"
        >
          {splitMixedScript(copy.headingBefore)}
          <span className="relative inline-block whitespace-nowrap">
            {splitMixedScript(copy.headingAccent)}
            <HandDrawnUnderline />
          </span>
          {splitMixedScript(copy.headingAfter)}
        </h2>
      </ScrollReveal>

      <div className="mt-10 grid grid-cols-1 items-center gap-10 md:mt-12 md:grid-cols-[minmax(0,45%)_minmax(0,55%)] md:gap-10 lg:gap-14">
        <ScrollReveal delay={80} className="md:pr-2">
          <DreamCollage images={copy.images} />
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div className="space-y-5 sm:space-y-6">
            {copy.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-bn text-base leading-bn text-landing-muted sm:text-lg sm:leading-bn"
              >
                {renderRichText(paragraph)}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={220} className="relative mt-12 md:mt-16">
        <SparkDoodle className="absolute left-[8%] top-1/2 hidden h-5 w-5 -translate-y-1/2 text-landing-accent/75 sm:block md:left-[12%]" />
        <SparkDoodle className="absolute right-[8%] top-[18%] h-4 w-4 text-landing-accent/60 sm:h-5 sm:w-5 md:right-[12%]" />
        <CollageSquiggle className="absolute bottom-0 left-[14%] hidden h-7 w-10 text-landing-accent/55 md:block" />

        <p className="relative mx-auto max-w-3xl px-2 text-center font-bn text-xl font-semibold leading-snug text-landing-fg sm:text-2xl md:text-3xl md:leading-snug">
          {renderRichText(copy.closing)}
        </p>
      </ScrollReveal>
    </Section>
  );
}
