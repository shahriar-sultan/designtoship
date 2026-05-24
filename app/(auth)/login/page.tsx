"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/Loading";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified") === "1";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendMsg, setResendMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        const msg = result.error;
        if (msg.toLowerCase().includes("verify")) {
          setError(
            "Please verify your email before logging in. Use resend below if needed.",
          );
        } else {
          setError(msg);
        }
      } else if (result?.ok) {
        router.push("/dashboard");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerification = async () => {
    if (!email) {
      setError("Enter your email first to resend verification.");
      return;
    }
    setResendMsg(null);
    const res = await fetch("/api/auth/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const json = await res.json();
    setResendMsg(json.message ?? (res.ok ? "Email sent" : json.error));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Sign in to access your courses and learning dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {verified && (
          <p className="text-sm text-green-600 bg-green-50 dark:bg-green-950 p-3 rounded-md mb-4">
            Email verified. You can log in now.
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in…" : "Login"}
          </Button>
        </form>
        <div className="mt-4 space-y-2 text-center text-sm">
          <button
            type="button"
            className="text-primary underline"
            onClick={resendVerification}
          >
            Resend verification email
          </button>
          {resendMsg && <p className="text-muted-foreground">{resendMsg}</p>}
          <p className="text-muted-foreground">
            No account?{" "}
            <Link href="/" className="text-primary underline">
              Register
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Suspense
        fallback={
          <Card className="w-full max-w-md p-8">
            <Loading />
          </Card>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
