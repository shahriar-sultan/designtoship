"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, BookOpen } from "lucide-react";

const activityData = [
  { month: "Jan", paid: 120, free: 80 },
  { month: "Feb", paid: 150, free: 95 },
  { month: "Mar", paid: 180, free: 110 },
  { month: "Apr", paid: 200, free: 130 },
  { month: "May", paid: 250, free: 160 },
  { month: "Jun", paid: 280, free: 180 },
];

export function CourseActivityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Course Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm font-medium">Paid Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium">Free Courses</span>
            </div>
          </div>

          {/* Simple bar chart representation */}
          <div className="space-y-3">
            {activityData.map((data) => (
              <div key={data.month} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{data.month}</span>
                  <span className="text-muted-foreground">
                    {data.paid + data.free} total
                  </span>
                </div>
                <div className="flex h-4 rounded-full overflow-hidden bg-gray-200">
                  <div
                    className="bg-orange-500"
                    style={{ width: `${(data.paid / (data.paid + data.free)) * 100}%` }}
                  />
                  <div
                    className="bg-blue-500"
                    style={{ width: `${(data.free / (data.paid + data.free)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Paid: {data.paid}</span>
                  <span>Free: {data.free}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-orange-600 mb-1">
                <BookOpen className="h-4 w-4" />
                <span className="font-semibold">1,180</span>
              </div>
              <p className="text-xs text-muted-foreground">Paid Enrollments</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <Users className="h-4 w-4" />
                <span className="font-semibold">755</span>
              </div>
              <p className="text-xs text-muted-foreground">Free Enrollments</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}