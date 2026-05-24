"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CourseAssessment } from "@/types/dashboard";

export function AssessmentList({
  assessments,
}: {
  assessments: CourseAssessment[];
}) {
  if (assessments.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {assessments.map((a) => (
          <Link
            key={a.id}
            href={`/dashboard/assessment/${a.id}`}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border p-3 hover:bg-muted/50"
          >
            <div>
              <p className="font-medium">{a.title}</p>
              <p className="text-sm text-muted-foreground">
                Due: {new Date(a.deadline).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded ${a.isSubmitted ? "bg-muted" : "bg-primary/10 text-primary"}`}
              >
                {a.isSubmitted
                  ? `Submitted${a.submission?.grade != null ? ` · ${a.submission.grade}` : ""}`
                  : "Pending"}
              </span>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
