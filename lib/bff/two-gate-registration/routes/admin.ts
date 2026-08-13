import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectRegistrationDb } from "../db";
import { RegistrationUser } from "../models/User";
import { sendApprovalEmail } from "../utils/emailService";

/**
 * PATCH /api/admin/users/:id/approve — gate 2 (admin). Idempotent for ACTIVE users.
 */
export async function handleBffApproveUser(
  userId: string,
): Promise<NextResponse> {
  if (!mongoose.isValidObjectId(userId)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  await connectRegistrationDb();

  const existing = await RegistrationUser.findById(userId);
  if (!existing) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (existing.status === "ACTIVE") {
    return NextResponse.json({
      success: true,
      idempotent: true,
      message: "User is already active.",
    });
  }

  if (existing.status !== "PENDING_ADMIN") {
    return NextResponse.json(
      {
        error:
          "User cannot be approved in their current state. Expected status PENDING_ADMIN after email verification.",
      },
      { status: 409 },
    );
  }

  existing.status = "ACTIVE";
  try {
    await existing.save();
  } catch (err) {
    console.error("[two-gate-registration] approve save error:", err);
    return NextResponse.json(
      { error: "Internal server error during approval" },
      { status: 500 },
    );
  }

  try {
    await sendApprovalEmail(existing.email);
  } catch (err) {
    console.error("[two-gate-registration] approval email failed:", err);
    // User is ACTIVE; do not roll back. Operational follow-up can resend manually.
  }

  return NextResponse.json({
    success: true,
    message: "User approved and notified.",
  });
}
