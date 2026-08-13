import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/**
 * BFF-only admin identity for two-gate registration (separate from applicant `RegistrationUser`).
 * Used by the seed script; approval still authorizes via JWT, not this document alone.
 */
const bffAdminUserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true, collection: "bff_admin_users" },
);

export type BffAdminUserDocument = InferSchemaType<typeof bffAdminUserSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const BffAdminUser: Model<BffAdminUserDocument> =
  (mongoose.models.BffAdminUser as Model<BffAdminUserDocument>) ??
  mongoose.model<BffAdminUserDocument>("BffAdminUser", bffAdminUserSchema);
