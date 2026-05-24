import { proxyToBackend } from "@/lib/bff";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyToBackend(`/dashboard/student/courses/${id}`);
}
