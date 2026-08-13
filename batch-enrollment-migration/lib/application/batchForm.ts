import type { BatchApplicationInput } from "@/lib/bff/two-gate-registration/schemas/batchApplication";
import { BANGLADESH_DISTRICTS } from "@/lib/bff/two-gate-registration/constants/districts";

export type BatchFormConfig = {
  batchId: string;
  title: string;
  titleBn: string;
  courseStart: string;
  schedule: string;
  duration: string;
  bkashNumber: string;
  earlyBirdDeadline: string;
  expectedPaymentTier: "EARLY_BIRD" | "REGULAR";
  pricing: Array<{
    id: "EARLY_BIRD" | "REGULAR";
    labelBn: string;
    labelEn: string;
    amountBdt: number;
  }>;
  districts: readonly string[];
};

export const EMPTY_BATCH_FORM: BatchApplicationInput = {
  email: "",
  fullName: "",
  whatsappNumber: "",
  facebookProfileLink: "",
  emailId: "",
  district: BANGLADESH_DISTRICTS[12],
  currentStatus: "JOB_HOLDER",
  education: "UNDERGRADUATE_COMPLETED",
  bkashTransactionId: "",
  paymentTier: "EARLY_BIRD",
  figmaExperience: "USED_A_LITTLE",
  websiteExperience: "NEVER_TRIED",
  englishComfort: "CAN_MANAGE",
  laptopAvailability: "OWN",
  whyLearnUiUx: "",
  goalAfterSixMonths: "",
  onlineLearningExperience: "",
  scheduleCommitment: "",
  stuckBehavior: "",
  whyGiveSeat: "",
};

export const CURRENT_STATUS_OPTIONS = [
  { value: "JOB_HOLDER", label: "চাকরিজীবী (Job Holder)" },
  { value: "FREELANCER", label: "ফ্রিল্যান্সার (Freelancer)" },
  { value: "STUDENT", label: "শিক্ষার্থী (Student)" },
  { value: "SELF_EMPLOYED", label: "আত্মকর্মসংস্থান (Self-employed)" },
] as const;

export const EDUCATION_OPTIONS = [
  { value: "SSC", label: "SSC" },
  { value: "HSC", label: "HSC" },
  { value: "DIPLOMA", label: "ডিপ্লোমা (Diploma)" },
  { value: "UNDERGRADUATE_ONGOING", label: "স্নাতক (চলমান) (Undergraduate — Ongoing)" },
  { value: "UNDERGRADUATE_COMPLETED", label: "স্নাতক (সম্পন্ন) (Undergraduate — Completed)" },
  { value: "POSTGRADUATE", label: "স্নাতকোত্তর (Postgraduate)" },
  { value: "OTHER", label: "অন্যান্য (Other)" },
] as const;

export const FIGMA_OPTIONS = [
  { value: "NEVER", label: "না, কখনো করিনি (No, never)" },
  { value: "OPENED_NOT_UNDERSTOOD", label: "খুলেছি কিন্তু বুঝিনি (Opened but didn't understand)" },
  { value: "USED_A_LITTLE", label: "একটু একটু ব্যবহার করেছি (Used a little)" },
  { value: "USE_REGULARLY", label: "নিয়মিত ব্যবহার করি (Use regularly)" },
] as const;

export const WEBSITE_OPTIONS = [
  { value: "NEVER_TRIED", label: "না, কখনো চেষ্টা করিনি (No, never tried)" },
  { value: "WATCHED_TUTORIALS", label: "টিউটোরিয়াল দেখেছি কিন্তু চেষ্টা করিনি (Watched tutorials but didn't try)" },
  { value: "TRIED_NOT_FINISHED", label: "চেষ্টা করেছি কিন্তু শেষ করতে পারিনি (Tried but couldn't finish)" },
  { value: "MADE_SOMETHING", label: "হ্যাঁ, কিছু একটা বানিয়েছি (Yes, made something)" },
] as const;

export const ENGLISH_COMFORT_OPTIONS = [
  { value: "NOT_COMFORTABLE", label: "স্বাচ্ছন্দ্য বোধ করি না (Don't feel comfortable)" },
  { value: "CAN_MANAGE", label: "কোনোমতে চালিয়ে নিতে পারি (Can manage somehow)" },
  { value: "COMFORTABLE", label: "স্বাচ্ছন্দ্য বোধ করি (Feel comfortable)" },
] as const;

export const LAPTOP_OPTIONS = [
  { value: "OWN", label: "হ্যাঁ, আমার নিজের আছে (Yes, I have my own)" },
  { value: "SHARE", label: "শেয়ার করি (I share)" },
  { value: "NEED_TO_ARRANGE", label: "নেই, ব্যবস্থা করতে হবে (Don't have, need to arrange)" },
] as const;

export const SECTION_TITLES = [
  "সেকশন ১ — যোগাযোগ ও পরিচয় (Contact & Identity)",
  "সেকশন ২ — পেমেন্ট তথ্য (Payment Information)",
  "সেকশন ৩ — বর্তমান Skill (Current Skill)",
  "সেকশন ৪ — অনুপ্রেরণা ও লক্ষ্য (Inspiration & Goals)",
  "সেকশন ৫ — প্রতিশ্রুতি ও মানসিকতা (Commitment & Mindset)",
] as const;

const DRAFT_KEY = "batch-4-application-draft";

export function loadFormDraft(): BatchApplicationInput | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return { ...EMPTY_BATCH_FORM, ...JSON.parse(raw) };
  } catch {
    return null;
  }
}

export function saveFormDraft(data: BatchApplicationInput) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch {
    // ignore quota errors
  }
}

export function clearFormDraft() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(DRAFT_KEY);
}
