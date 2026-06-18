"use client";

import { EYEBROW } from "./constants";
import { MENTOR_WELCOME } from "./mentor-welcome-config";

function splitMixedScript(text: string) {
  const parts = text.split(/([A-Za-z0-9][A-Za-z0-9\s\-'.·,—]*)/g).filter(Boolean);

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

export function MentorWelcome() {
  return (
    <section
      id="mentor-welcome"
      aria-labelledby="mentor-welcome-heading"
      className="bg-landing-bg px-5 pt-8 pb-8 md:px-8 md:pt-10 md:pb-10"
    >
      <div className="mx-auto w-full max-w-5xl">
        <article className="rounded-2xl border border-landing-border bg-landing-surface p-6 shadow-landing sm:p-8 md:p-10">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,38%)_1fr] md:gap-10 lg:gap-12">
            <div className="mx-auto w-full max-w-[280px] md:mx-0 md:max-w-[320px]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-landing-bg-alt">
                <img
                  src={MENTOR_WELCOME.imageSrc}
                  alt={MENTOR_WELCOME.imageAlt}
                  width={320}
                  height={400}
                  decoding="async"
                  fetchPriority="high"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: MENTOR_WELCOME.imageObjectPosition }}
                />
              </div>
            </div>

            <div className="text-left">
              <p className={`${EYEBROW} mb-3`}>{MENTOR_WELCOME.eyebrow}</p>
              <h2
                id="mentor-welcome-heading"
                className="font-bn text-xl font-bold leading-snug text-landing-fg sm:text-2xl"
              >
                <span className="font-latin">{MENTOR_WELCOME.name}</span>
                <span aria-hidden="true"> — </span>
                <span className="font-latin font-semibold text-landing-muted">
                  {MENTOR_WELCOME.role}
                </span>
              </h2>

              <div className="mt-5 space-y-4 font-bn text-base leading-bn text-landing-muted sm:text-lg sm:leading-bn">
                {MENTOR_WELCOME.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{splitMixedScript(paragraph)}</p>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
