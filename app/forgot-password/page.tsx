"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import "../login/login.css";

type Status = "idle" | "sending" | "success" | "error";

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim().toLowerCase();

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("success");
    setMessage("Check your email for a secure password reset link.");
  }

  return (
    <main className="course-login-page">
      <header className="course-login-header">
        <Link href="/" className="course-login-logo">
          <span>JGO HIRE</span>
          <small>Career Coach + Recruiter</small>
        </Link>
        <Link href="/login" className="course-login-back">Back to Login</Link>
      </header>

      <section className="course-login-shell course-login-shell-single">
        <div className="course-login-intro">
          <div className="course-login-badge">
            <span aria-hidden="true">✦</span>
            Password Help
          </div>
          <p className="course-login-eyebrow">Member Access</p>
          <h1 className="course-login-single-heading">Reset your password.</h1>
          <p className="course-login-description">
            Enter the email connected to your course account. We will send a
            secure link so you can choose a new password.
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
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </label>

              {message ? (
                <p className={status === "success" ? "course-login-success" : "course-login-error"}>
                  {message}
                </p>
              ) : null}

              <button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Email Me a Reset Link"}
              </button>
            </form>

            <p className="course-login-help">
              Still having trouble? <Link href="/account-help">Get account help</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
