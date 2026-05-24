"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DashboardBreadcrumb } from "@/components/dashboard/DashboardBreadcrumb";
import type { AssessmentDetail } from "@/types/dashboard";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AssessmentPage() {
  const params = useParams();
  const assessmentId = params.id as string;
  const [data, setData] = useState<AssessmentDetail | null>(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/dashboard/student/assessments/${assessmentId}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Failed to load");
        setData(json.data ?? json);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [assessmentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/dashboard/student/assessments/${assessmentId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ textAnswer }),
        },
      );
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Submit failed");
      setSuccess(true);
      const reload = await fetch(
        `/api/dashboard/student/assessments/${assessmentId}`,
      );
      const reloadJson = await reload.json();
      setData(reloadJson.data ?? reloadJson);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submit failed");
    } finally {
      setSubmitting(false);
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
        <DashboardBreadcrumb title="Assessment" />
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const submitted = !!data.submission;

  return (
    <div className="max-w-2xl space-y-6">
      <DashboardBreadcrumb title={data.assessment.title} />
      <Card>
        <CardHeader>
          <CardTitle>{data.assessment.title}</CardTitle>
          {data.assessment.description && (
            <p className="text-muted-foreground">{data.assessment.description}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Deadline:{" "}
            {new Date(data.assessment.deadline).toLocaleString()}
          </p>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Your answer</p>
                <p className="mt-1 whitespace-pre-wrap rounded-md bg-muted p-3 text-sm">
                  {data.submission?.textAnswer}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Submitted:{" "}
                {new Date(data.submission!.submittedAt).toLocaleString()}
              </p>
              {data.submission?.grade != null && (
                <p className="text-sm">Grade: {data.submission.grade}</p>
              )}
              {data.submission?.feedback && (
                <p className="text-sm">Feedback: {data.submission.feedback}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm">Submitted successfully.</p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                className="flex min-h-[160px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder="Type your answer here…"
                required
                disabled={submitting}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" disabled={submitting || !textAnswer.trim()}>
                {submitting ? "Submitting…" : "Submit"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
