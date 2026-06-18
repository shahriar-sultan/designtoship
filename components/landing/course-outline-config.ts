import type { Language } from "@/lib/translations";

export type OutlinePhase = {
  step: number;
  name: string;
  weeks: string;
};

export type OutlineStat = {
  value: string;
  label: string;
};

export const COURSE_OUTLINE: Record<
  Language,
  {
    headline: string;
    subtitle: string;
    stats: OutlineStat[];
    phases: OutlinePhase[];
  }
> = {
  bn: {
    headline: "কোর্স আউটলাইন",
    subtitle:
      "জিরো থেকে শুরু — ৬টি ধাপে একজন স্কিলড UI/UX ডিজাইনার হয়ে ওঠার পুরো পথ",
    stats: [
      { value: "১৩", label: "সপ্তাহ" },
      { value: "৭৮+", label: "ঘণ্টা live class" },
      { value: "৬", label: "ধাপ" },
    ],
    phases: [
      { step: 1, name: "ডিজাইন ফাউন্ডেশন", weeks: "সপ্তাহ ১–৩" },
      { step: 2, name: "Website ডিজাইন", weeks: "সপ্তাহ ৪–৫" },
      { step: 3, name: "Website তৈরী", weeks: "সপ্তাহ ৬–৮" },
      { step: 4, name: "App ডিজাইন", weeks: "সপ্তাহ ৯–১০" },
      { step: 5, name: "App তৈরী", weeks: "সপ্তাহ ১১–১২" },
      { step: 6, name: "Portfolio ও Career", weeks: "সপ্তাহ ১৩" },
    ],
  },
  en: {
    headline: "Course Outline",
    subtitle:
      "From zero — the full path to becoming a skilled UI/UX designer in 6 phases.",
    stats: [
      { value: "13", label: "weeks" },
      { value: "78+", label: "hours live class" },
      { value: "6", label: "phases" },
    ],
    phases: [
      { step: 1, name: "Design Foundations", weeks: "Weeks 1–3" },
      { step: 2, name: "Website Design", weeks: "Weeks 4–5" },
      { step: 3, name: "Website Build", weeks: "Weeks 6–8" },
      { step: 4, name: "App Design", weeks: "Weeks 9–10" },
      { step: 5, name: "App Build", weeks: "Weeks 11–12" },
      { step: 6, name: "Portfolio & Career", weeks: "Week 13" },
    ],
  },
};
