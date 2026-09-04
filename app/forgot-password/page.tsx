"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import "../login/login.css";

type Status = "idle" | "sending" | "success" | "error";

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(searchParams.get("email") || "");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    if (error) {
      setStatus("error");
      setMessage("We couldn’t send the reset email right now. Please try again in a minute or use Account Help.");
      return;
    }

    setStatus("success");
    setMessage("Reset link sent. Check your inbox and junk folder. If you created a password hint, you’ll see it after you open the secure reset link.");
  }

  return (
    <main className="course-login-page">
      <header className="course-login-header">
        <Link href="/" className="course-login-logo">
          <span>JGO HIRE</span>
          <small>Career Coach + Recruiter</small>
        </Link>
        <Link href="/client-portal/login" className="course-login-back">Back to Login</Link>
      </header>

      <section className="course-login-shell course-login-shell-single">
        <div className="course-login-intro">
          <div className="course-login-badge">Password Help</div>
          <p className="course-login-eyebrow">JGO Hire Account</p>
          <h1 className="course-login-single-heading">Reset your password.</h1>
          <p className="course-login-description">
            Enter the email you use for JGO Hire. We’ll send one secure link to choose a new password.
          </p>
        </div>

        <div className="course-login-card-wrap">
          <div className="course-login-glow" aria-hidden="true" />
          <div className="course-login-card">
            <div className="course-login-card-icon" aria-hidden="true">JGO</div>
            <p className="course-login-card-label">Password Reset</p>
            <h2>Send reset link</h2>

            <form className="course-login-form" onSubmit={handleSubmit}>
              <label htmlFor="forgot-password-email">
                <span>Email address</span>
                <input
                  id="forgot-password-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  autoFocus
                />
              </label>

              {message ? (
                <p className={status === "success" ? "course-login-success" : "course-login-error"} role="status">
                  {message}
                </p>
              ) : null}

              <button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : status === "success" ? "Send Again" : "Send Reset Link"}
              </button>
            </form>

            <p className="course-login-help">
              Need help with your account? <Link href="/account-help">Account Help</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
