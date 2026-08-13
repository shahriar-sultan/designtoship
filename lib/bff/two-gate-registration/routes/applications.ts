import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getBatchApplicationConfig, getExpectedPaymentTier } from "../batchConfig";
import { connectRegistrationDb } from "../db";
import { RegistrationUser } from "../models/User";
import {
  batchApplicationSchema,
  type BatchApplicationInput,
} from "../schemas/batchApplication";
import {
  generateRawVerificationToken,
  hashTokenSha256,
} from "../utils/cryptoHelper";
import { sendVerificationEmail } from "../utils/emailService";

function genericApplicationErrorResponse() {
  return NextResponse.json(
    {
      error:
        "We could not complete your application with the information provided. Please try again later.",
    },
    { status: 400 },
  );
}

function buildApplicationPayload(data: BatchApplicationInput) {
  return {
    batchId: getBatchApplicationConfig().batchId,
    fullName: data.fullName,
    whatsappNumber: data.whatsappNumber,
    facebookProfileLink: data.facebookProfileLink,
    emailId: data.emailId,
    district: data.district,
    currentStatus: data.currentStatus,
    education: data.education,
    bkashTransactionId: data.bkashTransactionId,
    paymentTier: data.paymentTier,
    figmaExperience: data.figmaExperience,
    websiteExperience: data.websiteExperience,
    englishComfort: data.englishComfort,
    laptopAvailability: data.laptopAvailability,
    whyLearnUiUx: data.whyLearnUiUx,
    goalAfterSixMonths: data.goalAfterSixMonths,
    onlineLearningExperience: data.onlineLearningExperience,
    scheduleCommitment: data.scheduleCommitment,
    stuckBehavior: data.stuckBehavior,
    whyGiveSeat: data.whyGiveSeat,
  };
}

/**
 * GET config for the batch application form (districts, pricing, deadlines).
 */
export async function handleGetBatchApplicationConfig(): Promise<NextResponse> {
  const config = getBatchApplicationConfig();
  const expectedPaymentTier = getExpectedPaymentTier();
  return NextResponse.json({
    success: true,
    data: { ...config, expectedPaymentTier },
  });
}

/**
 * POST /api/applications/batch-4 — submit full application and start two-gate flow.
 */
export async function handleSubmitBatchApplication(
  request: NextRequest,
): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = batchApplicationSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstIssue?.message ?? "Invalid application data" },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const expectedTier = getExpectedPaymentTier();
  if (data.paymentTier !== expectedTier) {
    return NextResponse.json(
      {
        error:
          expectedTier === "EARLY_BIRD"
            ? "Early Bird pricing applies until the deadline. Please select the correct payment tier."
            : "Regular pricing applies after the Early Bird deadline. Please select the correct payment tier.",
      },
      { status: 400 },
    );
  }

  await connectRegistrationDb();

  const rawToken = generateRawVerificationToken();
  const tokenHash = hashTokenSha256(rawToken);
  const emailTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const application = buildApplicationPayload(data);

  try {
    await RegistrationUser.create({
      email: data.email,
      status: "PENDING_EMAIL",
      isEmailVerified: false,
      emailVerificationToken: tokenHash,
      emailTokenExpires,
      application,
    });
  } catch (err) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      return genericApplicationErrorResponse();
    }
    console.error("[two-gate-registration] batch application error:", err);
    return NextResponse.json(
      { error: "Internal server error during application submission" },
      { status: 500 },
    );
  }

  try {
    await sendVerificationEmail(data.email, rawToken);
  } catch (err) {
    console.error("[two-gate-registration] verification email failed:", err);
    await RegistrationUser.deleteOne({ email: data.email }).catch(() => undefined);
    return NextResponse.json(
      { error: "Internal server error during application submission" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message:
        "Application submitted. Please check your email to verify your address.",
    },
    { status: 201 },
  );
}

export type ApplicationListItem = {
  id: string;
  email: string;
  status: string;
  isEmailVerified: boolean;
  createdAt: string;
  application: {
    fullName: string;
    district: string;
    paymentTier: string;
    bkashTransactionId: string;
    whatsappNumber: string;
  } | null;
};

/**
 * GET /api/admin/applications — list registration users with applications (admin JWT).
 */
export async function handleListApplications(
  request: NextRequest,
): Promise<NextResponse> {
  const statusFilter = request.nextUrl.searchParams.get("status")?.trim();
  await connectRegistrationDb();

  const query: Record<string, unknown> = { application: { $ne: null } };
  if (statusFilter) {
    query.status = statusFilter;
  }

  const users = await RegistrationUser.find(query)
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  const data: ApplicationListItem[] = users.map((user) => ({
    id: String(user._id),
    email: user.email,
    status: user.status,
    isEmailVerified: user.isEmailVerified,
    createdAt:
      user.createdAt instanceof Date
        ? user.createdAt.toISOString()
        : String(user.createdAt),
    application: user.application
      ? {
          fullName: user.application.fullName,
          district: user.application.district,
          paymentTier: user.application.paymentTier,
          bkashTransactionId: user.application.bkashTransactionId,
          whatsappNumber: user.application.whatsappNumber,
        }
      : null,
  }));

  return NextResponse.json({ success: true, data });
}
