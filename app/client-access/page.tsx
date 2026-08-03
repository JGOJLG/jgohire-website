"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const allowedDestinations = ["/coreframework", "/interviewready"];

export default function ClientAccessPage() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const destination = useMemo(() => {
    const requestedPage = searchParams.get("next") || "/coreframework";
    return allowedDestinations.includes(requestedPage)
      ? requestedPage
      : "/coreframework";
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/client-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, destination }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "That password is not correct.");
        return;
      }

      window.location.href = data.redirectTo;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="client-access-page">
      <header className="contact-header">
        <div className="site-shell contact-header-inner">
          <Link href="/" className="contact-logo">
            <span>JGO HIRE</span>
            <small>Career Coach + Recruiter</small>
          </Link>

          <Link href="/resources" className="contact-back-link">
            Back to Resources
          </Link>
        </div>
      </header>

      <section className="client-access-section">
        <div className="client-access-card">
          <div className="client-access-lock" aria-hidden="true">
            🔒
          </div>

          <p className="eyebrow">Client Exclusive</p>
          <h1>Unlock your client resource.</h1>
          <p>
            Enter the password provided by JGO Hire to access this guide.
          </p>

          <form onSubmit={handleSubmit} className="client-access-form">
            <label htmlFor="client-password">Client password</label>
            <input
              id="client-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />

            {error ? <p className="client-access-error">{error}</p> : null}

            <button
              type="submit"
              className="button button-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Unlocking..." : "Unlock Resource"}
            </button>
          </form>

          <p className="client-access-help">
            Need the password? <Link href="/contact">Contact JGO Hire</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
