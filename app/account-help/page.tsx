"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import "../login/login.css";

export default function AccountHelpPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/account-help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          issueType: formData.get("issueType"),
          details: formData.get("details"),
          website: formData.get("website"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your request.");
      }

      form.reset();
      setStatus("success");
      setMessage("Your request was sent. Please also check your spam folder for reset emails.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
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
            Account Help
          </div>
          <p className="course-login-eyebrow">Member Support</p>
          <h1 className="course-login-single-heading">Let&apos;s get you back in.</h1>
          <p className="course-login-description">
            A password reset solves most issues instantly. Use this form only
            when the reset email does not arrive or your purchase email is not recognized.
          </p>

          <Link href="/forgot-password" className="course-login-reset-cta">
            Reset My Password
          </Link>
        </div>

        <div className="course-login-card-wrap">
          <div className="course-login-glow" aria-hidden="true" />
          <div className="course-login-card">
            <div className="course-login-card-icon" aria-hidden="true">JGO</div>
            <p className="course-login-card-label">Access Support</p>
            <h2>Report an issue</h2>

            <form className="course-login-form" onSubmit={handleSubmit}>
              <label>
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>

              <label>
                <span>Purchase email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>

              <label>
                <span>What is happening?</span>
                <select name="issueType" defaultValue="" required>
                  <option value="" disabled>Select an issue</option>
                  <option value="Reset email not received">I did not receive the reset email</option>
                  <option value="Purchase email not recognized">My purchase email is not recognized</option>
                  <option value="Account created but cannot log in">I created an account but cannot log in</option>
                  <option value="Purchased but no account">I purchased but never created an account</option>
                  <option value="Other">Something else</option>
                </select>
              </label>

              <label>
                <span>Details</span>
                <textarea name="details" rows={5} required />
              </label>

              <label className="course-login-honeypot" aria-hidden="true">
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>

              {message ? (
                <p className={status === "success" ? "course-login-success" : "course-login-error"}>
                  {message}
                </p>
              ) : null}

              <button type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending..." : "Send Access Request"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}