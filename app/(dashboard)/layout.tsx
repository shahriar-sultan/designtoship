"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ClientRoot } from "@/components/dashboard/ClientRoot";
import { SessionProvider } from "next-auth/react";
import Loading from "@/components/Loading";

function DashboardContent({ children, defaultOpen }: { children: React.ReactNode; defaultOpen: boolean }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session) {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p className="text-muted-foreground">Please log in to access the dashboard.</p>
      </div>
    );
  }

  return <ClientRoot defaultOpen={defaultOpen}>{children}</ClientRoot>;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [defaultOpen, setDefaultOpen] = useState(false);

  useEffect(() => {
    // Get sidebar state from localStorage
    const sidebarState = localStorage.getItem("sidebar_state");
    setDefaultOpen(sidebarState === "true");
  }, []);

  return (
    <SessionProvider>
      <DashboardContent defaultOpen={defaultOpen}>
        {children}
      </DashboardContent>
    </SessionProvider>
  );
}