import { BATCH_4_APPLY_URL } from "./constants";

/** Edit batch dates, pricing, and course title here. */
export const CURRICULUM_COURSE_CARD = {
  applyUrl: BATCH_4_APPLY_URL,
  /** When set, shows the alumni trust row. Leave null until confirmed. */
  alumniCount: null as number | null,
  bn: {
    courseTitle: "The Design Workbench · Batch 4",
    trustLine: (count: number) =>
      `${count}+ শিক্ষার্থী আগের ৩টি batch-এ শিখেছেন`,
    startDate: "১৩ জুলাই, ২০২৬",
    duration: "১৩ সপ্তাহ",
    classes: "সপ্তাহে ২টি live class · মোট ৭৮+ ঘণ্টা",
    level: "একদম শুরু থেকে (beginner-friendly)",
    medium: "বাংলা",
    price: "৳১৩,৯০০",
  },
  en: {
    courseTitle: "The Design Workbench · Batch 4",
    trustLine: (count: number) =>
      `${count}+ students across the previous 3 batches`,
    startDate: "July 13, 2026",
    duration: "13 weeks",
    classes: "2 live classes per week · 78+ hours total",
    level: "Absolute beginner friendly",
    medium: "Bangla",
    price: "৳13,900",
  },
} as const;
