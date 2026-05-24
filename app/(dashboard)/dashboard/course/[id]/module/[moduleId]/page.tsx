"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { DashboardBreadcrumb } from "@/components/dashboard/DashboardBreadcrumb";
import type { ModuleDetail } from "@/types/dashboard";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function youtubeEmbedUrl(url: string | null) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/,
  );
  const id = match?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : url.includes("embed") ? url : null;
}

export default function ModuleConsumptionPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const moduleId = params.moduleId as string;
  const [data, setData] = useState<ModuleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    fetch(`/api/dashboard/student/courses/${courseId}/modules/${moduleId}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Failed to load");
        setData(json.data ?? json);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [courseId, moduleId]);

  const markComplete = async () => {
    setCompleting(true);
    try {
      const res = await fetch(
        `/api/dashboard/student/courses/${courseId}/modules/${moduleId}/complete`,
        { method: "POST" },
      );
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Failed");
      }
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to mark complete");
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loading />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div>
        <DashboardBreadcrumb title="Module" />
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const { module: mod } = data;
  const embed = youtubeEmbedUrl(mod.youtubeUrl);

  return (
    <div className="space-y-6 max-w-4xl">
      <DashboardBreadcrumb title={mod.title} />
      <Card>
        <CardHeader>
          <CardTitle>{mod.title}</CardTitle>
          {mod.scheduledAt && mod.type === "live" && (
            <p className="text-sm text-muted-foreground">
              Scheduled: {new Date(mod.scheduledAt).toLocaleString()}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {mod.type === "video" && embed && (
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
              <iframe
                src={embed}
                title={mod.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}
          {mod.type === "live" && mod.zoomUrl && (
            <Button asChild>
              <a href={mod.zoomUrl} target="_blank" rel="noopener noreferrer">
                Join Zoom session
              </a>
            </Button>
          )}
          {mod.content && (
            <div className="prose dark:prose-invert max-w-none text-sm whitespace-pre-wrap">
              {mod.content}
            </div>
          )}
          {!data.isCompleted && (
            <Button onClick={markComplete} disabled={completing}>
              {completing ? "Saving…" : "Mark as complete"}
            </Button>
          )}
          {data.isCompleted && (
            <p className="text-sm text-green-600">You completed this module.</p>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={!data.prevModuleId}
          onClick={() =>
            data.prevModuleId &&
            router.push(
              `/dashboard/course/${courseId}/module/${data.prevModuleId}`,
            )
          }
        >
          Previous
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/dashboard/course/${courseId}`}>Back to course</Link>
        </Button>
        <Button
          variant="outline"
          disabled={!data.nextModuleId}
          onClick={() =>
            data.nextModuleId &&
            router.push(
              `/dashboard/course/${courseId}/module/${data.nextModuleId}`,
            )
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
