"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { DashboardBreadcrumb } from "@/components/dashboard/DashboardBreadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/Loading";

export default function AdminCourseManagePage() {
  const params = useParams();
  const courseId = params.id as string;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [course, setCourse] = useState<{
    title: string;
    modules: { id: string; title: string; order: number }[];
    assessments: { id: string; title: string }[];
  } | null>(null);
  const [moduleForm, setModuleForm] = useState({
    title: "",
    type: "video",
    youtubeUrl: "",
    zoomUrl: "",
    content: "",
    order: 1,
  });
  const [assessmentForm, setAssessmentForm] = useState({
    title: "",
    description: "",
    timeLimit: 10080,
  });
  const [message, setMessage] = useState<string | null>(null);

  const load = () => {
    fetch(`/api/admin/courses/${courseId}`)
      .then((r) => r.json())
      .then((json) => setCourse(json.data ?? json));
  };

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role !== "ADMIN") {
      router.replace("/dashboard");
      return;
    }
    load();
  }, [session, status, router, courseId]);

  const addModule = async (e: React.FormEvent) => {
    e.preventDefault();
    const contentType =
      moduleForm.type === "video"
        ? "VIDEO"
        : moduleForm.type === "live"
          ? "TEXT"
          : "TEXT";
    const content: Record<string, unknown> = {
      instructions: moduleForm.content,
    };
    if (moduleForm.type === "live") {
      content.kind = "live";
      content.zoomUrl = moduleForm.zoomUrl;
    }
    if (moduleForm.youtubeUrl) {
      content.youtubeUrl = moduleForm.youtubeUrl;
    }

    const res = await fetch(`/api/admin/courses/${courseId}/modules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: moduleForm.title,
        contentType,
        contentUrl: moduleForm.youtubeUrl || undefined,
        content,
        order: moduleForm.order,
      }),
    });
    if (res.ok) {
      setMessage("Module added");
      load();
    }
  };

  const addAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/courses/${courseId}/assessments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: assessmentForm.title,
        description: assessmentForm.description,
        type: "ASSIGNMENT",
        courseId,
        timeLimit: assessmentForm.timeLimit,
      }),
    });
    if (res.ok) {
      setMessage("Assessment added");
      load();
    }
  };

  if (status === "loading" || !course) {
    return (
      <div className="flex justify-center py-20">
        <Loading />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <DashboardBreadcrumb title={course.title} />
      {message && <p className="text-sm text-green-600">{message}</p>}

      <Card>
        <CardHeader>
          <CardTitle>Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-1 mb-4">
            {course.modules?.map((m) => (
              <li key={m.id}>
                {m.order}. {m.title}
              </li>
            ))}
          </ul>
          <form onSubmit={addModule} className="space-y-3 border-t pt-4">
            <Input
              placeholder="Module title"
              value={moduleForm.title}
              onChange={(e) =>
                setModuleForm({ ...moduleForm, title: e.target.value })
              }
              required
            />
            <select
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={moduleForm.type}
              onChange={(e) =>
                setModuleForm({ ...moduleForm, type: e.target.value })
              }
            >
              <option value="video">Video</option>
              <option value="live">Live</option>
              <option value="assignment">Assignment</option>
            </select>
            {moduleForm.type === "video" && (
              <Input
                placeholder="YouTube URL"
                value={moduleForm.youtubeUrl}
                onChange={(e) =>
                  setModuleForm({ ...moduleForm, youtubeUrl: e.target.value })
                }
              />
            )}
            {moduleForm.type === "live" && (
              <Input
                placeholder="Zoom URL"
                value={moduleForm.zoomUrl}
                onChange={(e) =>
                  setModuleForm({ ...moduleForm, zoomUrl: e.target.value })
                }
              />
            )}
            <textarea
              className="w-full rounded-md border px-3 py-2 text-sm min-h-[80px]"
              placeholder="Content / instructions"
              value={moduleForm.content}
              onChange={(e) =>
                setModuleForm({ ...moduleForm, content: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Order"
              value={moduleForm.order}
              onChange={(e) =>
                setModuleForm({
                  ...moduleForm,
                  order: parseInt(e.target.value, 10) || 1,
                })
              }
            />
            <Button type="submit">Add module</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-1 mb-4">
            {course.assessments?.map((a) => (
              <li key={a.id}>{a.title}</li>
            ))}
          </ul>
          <form onSubmit={addAssessment} className="space-y-3 border-t pt-4">
            <Input
              placeholder="Assessment title"
              value={assessmentForm.title}
              onChange={(e) =>
                setAssessmentForm({ ...assessmentForm, title: e.target.value })
              }
              required
            />
            <textarea
              className="w-full rounded-md border px-3 py-2 text-sm min-h-[80px]"
              placeholder="Description"
              value={assessmentForm.description}
              onChange={(e) =>
                setAssessmentForm({
                  ...assessmentForm,
                  description: e.target.value,
                })
              }
            />
            <Button type="submit">Add assessment</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
