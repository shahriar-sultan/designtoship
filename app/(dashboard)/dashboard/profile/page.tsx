"use client";

import { useSession } from "next-auth/react";
import { DashboardBreadcrumb } from "@/components/dashboard/DashboardBreadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-lg">
      <DashboardBreadcrumb title="Profile" />
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Name: </span>
            {session?.user?.name ?? "N/A"}
          </p>
          <p>
            <span className="text-muted-foreground">Email: </span>
            {session?.user?.email ?? "N/A"}
          </p>
          <p>
            <span className="text-muted-foreground">Role: </span>
            {session?.user?.role ?? "N/A"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
