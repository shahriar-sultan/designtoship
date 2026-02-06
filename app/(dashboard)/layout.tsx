import { cookies } from "next/headers";
import { ClientRoot } from "@/components/dashboard/ClientRoot";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

    const session = await auth();

    // Redirect if not authenticated (middleware should handle this, but double-check)
    if (!session) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">Please log in to access the dashboard.</p>
        </div>
      );
    }

    return (
      <SessionProvider session={session}>
        <ClientRoot defaultOpen={defaultOpen}>{children}</ClientRoot>
      </SessionProvider>
    );
  } catch (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Something went wrong!</h2>
        <p className="text-muted-foreground">We couldn't load the dashboard. Please try again later.</p>
      </div>
    );
  }
}