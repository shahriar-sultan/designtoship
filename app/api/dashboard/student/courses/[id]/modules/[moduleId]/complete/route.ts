import { proxyToBackend } from "@/lib/bff";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string; moduleId: string }> },
) {
  const { id, moduleId } = await params;
  return proxyToBackend(
    `/dashboard/student/courses/${id}/modules/${moduleId}/complete`,
    { method: "POST" },
  );
}
