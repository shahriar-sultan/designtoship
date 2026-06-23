"use client";

import {
  BarChart3,
  Calendar,
  Clock,
  Languages,
  Users,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CURRICULUM_COURSE_CARD } from "./course-card-config";
import { useLanguage } from "./LanguageProvider";

function splitMixedScript(text: string) {
  const parts = text.split(/([A-Za-z0-9][A-Za-z0-9\s\-'.·(),+]*)/g).filter(Boolean);

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

type CurriculumCourseCardProps = {
  className?: string;
};

export function CurriculumCourseCard({ className }: CurriculumCourseCardProps) {
  const { lang } = useLanguage();
  const copy = CURRICULUM_COURSE_CARD[lang];
  const alumniCount = CURRICULUM_COURSE_CARD.alumniCount;

  const details = [
    { icon: Calendar, label: lang === "bn" ? "শুরু" : "Starts", value: copy.startDate },
    {
      icon: Clock,
      label: lang === "bn" ? "সময়কাল" : "Duration",
      value: copy.duration,
    },
    {
      icon: Video,
      label: lang === "bn" ? "ক্লাস" : "Classes",
      value: copy.classes,
    },
    {
      icon: BarChart3,
      label: "Level",
      value: copy.level,
      emphasize: true,
    },
    {
      icon: Languages,
      label: lang === "bn" ? "মাধ্যম" : "Medium",
      value: copy.medium,
    },
  ];

  return (
    <aside
      className={cn(
        "rounded-2xl border border-landing-border bg-landing-surface p-6 shadow-landing-lg sm:p-7",
        "lg:sticky lg:top-24 lg:self-start",
        className,
      )}
    >
      <h3 className="font-bn text-xl font-bold leading-snug text-landing-fg sm:text-2xl">
        {splitMixedScript(copy.courseTitle)}
      </h3>

      {alumniCount != null && alumniCount > 0 && (
        <p className="mt-3 flex items-start gap-2 font-bn text-sm leading-bn text-landing-muted">
          <Users
            className="mt-0.5 h-4 w-4 shrink-0 text-landing-accent"
            strokeWidth={1.75}
            aria-hidden
          />
          <span>{splitMixedScript(copy.trustLine(alumniCount))}</span>
        </p>
      )}

      <ul className="mt-6 space-y-4 border-t border-landing-border pt-6">
        {details.map(({ icon: Icon, label, value, emphasize }) => (
          <li key={label} className="flex items-start gap-3">
            <Icon
              className="mt-0.5 h-4 w-4 shrink-0 text-landing-accent"
              strokeWidth={1.75}
              aria-hidden
            />
            <span
              className={cn(
                "font-bn text-sm leading-bn sm:text-base",
                emphasize ? "font-medium text-landing-fg" : "text-landing-muted",
              )}
            >
              <span className="font-medium text-landing-fg">{label}:</span>{" "}
              {splitMixedScript(value)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-landing-border pt-6">
        <p className="font-bn text-lg font-bold text-landing-fg">
          {splitMixedScript(copy.price)}
        </p>
      </div>
    </aside>
  );
}
