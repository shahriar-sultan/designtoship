"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DashboardBreadcrumb } from "@/components/dashboard/DashboardBreadcrumb";
import { ModuleList } from "@/components/dashboard/ModuleList";
import { AssessmentList } from "@/components/dashboard/AssessmentList";
import type { CourseDetail } from "@/types/dashboard";
import Loading from "@/components/Loading";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const [data, setData] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/dashboard/student/courses/${courseId}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Failed to load");
        setData(json.data ?? json);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loading />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div>
        <DashboardBreadcrumb title="Course" />
        <p className="text-destructive">{error ?? "Not found"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardBreadcrumb title={data.course.title} />
      <Card>
        <CardHeader>
          <CardTitle>{data.course.title}</CardTitle>
          {data.course.description && (
            <p className="text-muted-foreground">{data.course.description}</p>
          )}
          <p className="text-sm">Instructor: {data.course.instructor.name}</p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm mb-2">
            <span>Overall progress</span>
            <span>{data.progress}%</span>
          </div>
          <Progress value={data.progress} />
        </CardContent>
      </Card>
      <ModuleList courseId={courseId} modules={data.modules} />
      <AssessmentList assessments={data.assessments} />
    </div>
  );
}
