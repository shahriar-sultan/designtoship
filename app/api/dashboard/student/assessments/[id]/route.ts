import { proxyToBackend } from "@/lib/bff";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyToBackend(`/dashboard/student/assessments/${id}`);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  return proxyToBackend(`/dashboard/student/assessments/${id}/submit`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
