import { BANGLADESH_DISTRICTS } from "./constants/districts";
import { BATCH_ID } from "./schemas/batchApplication";

export type BatchPricingTier = {
  id: "EARLY_BIRD" | "REGULAR";
  labelBn: string;
  labelEn: string;
  amountBdt: number;
};

export type BatchApplicationConfig = {
  batchId: typeof BATCH_ID;
  title: string;
  titleBn: string;
  courseStart: string;
  schedule: string;
  duration: string;
  bkashNumber: string;
  earlyBirdDeadline: string;
  pricing: BatchPricingTier[];
  districts: readonly string[];
};

function parseEarlyBirdDeadline(): string {
  const raw = process.env.BFF_BATCH_EARLY_BIRD_DEADLINE?.trim();
  if (raw) return raw;
  return "2026-06-22T23:59:59+06:00";
}

function parseBkashNumber(): string {
  return process.env.BFF_BATCH_BKASH_NUMBER?.trim() || "01864494184";
}

export function getBatchApplicationConfig(): BatchApplicationConfig {
  const earlyBirdAmount = Number(process.env.BFF_BATCH_EARLY_BIRD_AMOUNT ?? 9900);
  const regularAmount = Number(process.env.BFF_BATCH_REGULAR_AMOUNT ?? 13900);

  return {
    batchId: BATCH_ID,
    title: "Design & Ship with AI — Batch 4",
    titleBn: "রেজিস্ট্রেশন ফর্ম",
    courseStart: "Mid-July",
    schedule: "Thursday & Saturday, 9:00 PM – 11:00 PM",
    duration: "10 weeks, 20 live classes",
    bkashNumber: parseBkashNumber(),
    earlyBirdDeadline: parseEarlyBirdDeadline(),
    pricing: [
      {
        id: "EARLY_BIRD",
        labelBn: `Early Bird — ৳${earlyBirdAmount.toLocaleString("en-BD")} (২২শে জুনের আগে)`,
        labelEn: `Early Bird — ৳${earlyBirdAmount.toLocaleString("en-BD")} (before June 22)`,
        amountBdt: earlyBirdAmount,
      },
      {
        id: "REGULAR",
        labelBn: `Regular — ৳${regularAmount.toLocaleString("en-BD")} (২২শে জুনের পরে)`,
        labelEn: `Regular — ৳${regularAmount.toLocaleString("en-BD")} (after June 22)`,
        amountBdt: regularAmount,
      },
    ],
    districts: BANGLADESH_DISTRICTS,
  };
}

/** Server-side: which payment tier is valid for the current date. */
export function getExpectedPaymentTier(now = new Date()): "EARLY_BIRD" | "REGULAR" {
  const config = getBatchApplicationConfig();
  const deadline = new Date(config.earlyBirdDeadline);
  return now <= deadline ? "EARLY_BIRD" : "REGULAR";
}
