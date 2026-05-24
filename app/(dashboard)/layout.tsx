"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ClientRoot } from "@/components/dashboard/ClientRoot";
import Loading from "@/components/Loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [defaultOpen, setDefaultOpen] = useState(false);

  useEffect(() => {
    const sidebarState = localStorage.getItem("sidebar_state");
    setDefaultOpen(sidebarState === "true");
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
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
    return null;
  }

  return <ClientRoot defaultOpen={defaultOpen}>{children}</ClientRoot>;
}
