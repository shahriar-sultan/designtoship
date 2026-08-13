import { NextRequest, NextResponse } from "next/server";
import { isTwoGateRegistrationEnabled } from "@/lib/bff/two-gate-registration/config";
import {
  handleGetBatchApplicationConfig,
  handleSubmitBatchApplication,
} from "@/lib/bff/two-gate-registration/routes/applications";

export async function GET() {
  if (!isTwoGateRegistrationEnabled()) {
    return NextResponse.json(
      { error: "Batch applications are not enabled on this deployment" },
      { status: 503 },
    );
  }
  return handleGetBatchApplicationConfig();
}

export async function POST(request: NextRequest) {
  if (!isTwoGateRegistrationEnabled()) {
    return NextResponse.json(
      { error: "Batch applications are not enabled on this deployment" },
      { status: 503 },
    );
  }
  return handleSubmitBatchApplication(request);
}
