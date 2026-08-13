import { z } from "zod";
import { BANGLADESH_DISTRICTS } from "../constants/districts";

export const BATCH_ID = "batch-4" as const;

export const currentStatusValues = [
  "JOB_HOLDER",
  "FREELANCER",
  "STUDENT",
  "SELF_EMPLOYED",
] as const;

export const educationValues = [
  "SSC",
  "HSC",
  "DIPLOMA",
  "UNDERGRADUATE_ONGOING",
  "UNDERGRADUATE_COMPLETED",
  "POSTGRADUATE",
  "OTHER",
] as const;

export const paymentTierValues = ["EARLY_BIRD", "REGULAR"] as const;

export const figmaExperienceValues = [
  "NEVER",
  "OPENED_NOT_UNDERSTOOD",
  "USED_A_LITTLE",
  "USE_REGULARLY",
] as const;

export const websiteExperienceValues = [
  "NEVER_TRIED",
  "WATCHED_TUTORIALS",
  "TRIED_NOT_FINISHED",
  "MADE_SOMETHING",
] as const;

export const englishComfortValues = [
  "NOT_COMFORTABLE",
  "CAN_MANAGE",
  "COMFORTABLE",
] as const;

export const laptopAvailabilityValues = [
  "OWN",
  "SHARE",
  "NEED_TO_ARRANGE",
] as const;

const districtSchema = z.enum(BANGLADESH_DISTRICTS);

const emailField = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("A valid email is required")
  .transform((v) => v.toLowerCase());

const shortText = (label: string) =>
  z.string().trim().min(1, `${label} is required`).max(500);

const longText = (label: string) =>
  z.string().trim().min(10, `${label} must be at least 10 characters`).max(5000);

export const batchApplicationContactSchema = z.object({
  email: emailField,
  fullName: shortText("Full name"),
  whatsappNumber: z
    .string()
    .trim()
    .min(10, "WhatsApp number is required")
    .max(20),
  facebookProfileLink: z
    .string()
    .trim()
    .url("A valid Facebook profile link is required"),
  emailId: emailField,
  district: districtSchema,
  currentStatus: z.enum(currentStatusValues),
  education: z.enum(educationValues),
});

export const batchApplicationPaymentSchema = z.object({
  bkashTransactionId: z
    .string()
    .trim()
    .min(6, "bKash Transaction ID is required")
    .max(64),
  paymentTier: z.enum(paymentTierValues),
});

export const batchApplicationSkillsSchema = z.object({
  figmaExperience: z.enum(figmaExperienceValues),
  websiteExperience: z.enum(websiteExperienceValues),
  englishComfort: z.enum(englishComfortValues),
  laptopAvailability: z.enum(laptopAvailabilityValues),
});

export const batchApplicationMotivationSchema = z.object({
  whyLearnUiUx: shortText("This field"),
  goalAfterSixMonths: shortText("This field"),
  onlineLearningExperience: shortText("This field"),
});

export const batchApplicationCommitmentSchema = z.object({
  scheduleCommitment: longText("Schedule commitment"),
  stuckBehavior: longText("Stuck behavior"),
  whyGiveSeat: longText("Why give you a seat"),
});

export const batchApplicationSchema = batchApplicationContactSchema
  .merge(batchApplicationPaymentSchema)
  .merge(batchApplicationSkillsSchema)
  .merge(batchApplicationMotivationSchema)
  .merge(batchApplicationCommitmentSchema);

export type BatchApplicationInput = z.infer<typeof batchApplicationSchema>;

export const batchApplicationSteps = [
  batchApplicationContactSchema,
  batchApplicationPaymentSchema,
  batchApplicationSkillsSchema,
  batchApplicationMotivationSchema,
  batchApplicationCommitmentSchema,
] as const;
