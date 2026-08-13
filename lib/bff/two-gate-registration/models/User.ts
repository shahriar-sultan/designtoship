import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { BATCH_ID } from "../schemas/batchApplication";

const USER_STATUSES = [
  "PENDING_EMAIL",
  "PENDING_ADMIN",
  "ACTIVE",
  "REJECTED",
] as const;

export type RegistrationUserStatus = (typeof USER_STATUSES)[number];

const batchApplicationSchema = new Schema(
  {
    batchId: { type: String, required: true, default: BATCH_ID },
    fullName: { type: String, required: true, trim: true },
    whatsappNumber: { type: String, required: true, trim: true },
    facebookProfileLink: { type: String, required: true, trim: true },
    emailId: { type: String, required: true, lowercase: true, trim: true },
    district: { type: String, required: true, trim: true },
    currentStatus: { type: String, required: true },
    education: { type: String, required: true },
    bkashTransactionId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    paymentTier: { type: String, required: true },
    figmaExperience: { type: String, required: true },
    websiteExperience: { type: String, required: true },
    englishComfort: { type: String, required: true },
    laptopAvailability: { type: String, required: true },
    whyLearnUiUx: { type: String, required: true, trim: true },
    goalAfterSixMonths: { type: String, required: true, trim: true },
    onlineLearningExperience: { type: String, required: true, trim: true },
    scheduleCommitment: { type: String, required: true, trim: true },
    stuckBehavior: { type: String, required: true, trim: true },
    whyGiveSeat: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const registrationUserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      required: true,
      enum: USER_STATUSES,
      default: "PENDING_EMAIL",
    },
    isEmailVerified: { type: Boolean, default: false },
    /** SHA-256 hex digest of the raw verification token (never store the raw token). */
    emailVerificationToken: { type: String, default: null, index: true },
    emailTokenExpires: { type: Date, default: null },
    application: { type: batchApplicationSchema, default: null },
  },
  {
    timestamps: true,
    collection: "bff_two_gate_users",
  },
);

registrationUserSchema.index(
  { "application.bkashTransactionId": 1 },
  {
    unique: true,
    sparse: true,
    partialFilterExpression: { "application.bkashTransactionId": { $type: "string" } },
  },
);

export type RegistrationUserDocument = InferSchemaType<
  typeof registrationUserSchema
> & {
  _id: mongoose.Types.ObjectId;
};

export const RegistrationUser: Model<RegistrationUserDocument> =
  (mongoose.models.RegistrationUser as Model<RegistrationUserDocument>) ??
  mongoose.model<RegistrationUserDocument>(
    "RegistrationUser",
    registrationUserSchema,
  );
