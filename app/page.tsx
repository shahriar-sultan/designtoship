import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { RegistrationForm } from "@/components/auth/RegistrationForm";

export default async function HomePage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-950">
      <div className="w-full max-w-lg mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Learning Portal</h1>
        <p className="text-muted-foreground mt-2">
          Create an account to access your courses and continue learning.
        </p>
      </div>
      <RegistrationForm />
    </div>
  );
}
