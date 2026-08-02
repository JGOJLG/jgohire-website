"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type FormStatus = "idle" | "submitting" | "error";

type ApiResponse = {
  success?: boolean;
  error?: string;
};

const guides = [
  {
    title: "10 Reasons You're Not Hearing Back",
    description:
      "A practical guide to help you understand why qualified candidates often get overlooked.",
    items: [
      ["01", "Your resume isn't telling the right story."],
      ["02", "You're applying like everyone else."],
      ["03", "Your value isn't clear quickly enough."],
      ["04", "Networking matters more than you think."],
    ],
  },
  {
    title: "30-Minute Interview Countdown™",
    description:
      "A simple checklist to help you feel prepared, calm, and confident before every interview.",
    items: [
      ["30", "Review the job description and your strongest stories."],
      ["20", "Test your camera, lighting, audio, and internet."],
      ["10", "Reset your mindset and remove distractions."],
      ["05", "Take a deep breath and trust your preparation."],
    ],
  },
];

export default function FreeResourcesPage() {
  const router = useRouter();

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/free-resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          website: formData.get("website"),
        }),
      });

      const contentType = response.headers.get("content-type");

      let result: ApiResponse = {};

      if (contentType?.includes("application/json")) {
        result = (await response.json()) as ApiResponse;
      }

      if (!response.ok) {
        throw new Error(
          result.error ||
            "The free guide form could not connect. Please confirm the API route exists and try again."
        );
      }

      form.reset();
      router.push("/free/guides");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      setStatus("error");
    }
  }

  return (
    <main className="free-resources-page">
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

      <section className="free-resources-hero">
        <div className="site-shell free-resources-hero-content">
          <p className="eyebrow">JGO Insights™</p>

          <h1>Free Career Resources</h1>

          <p>
            Enter your email below to unlock two complimentary resources
            designed to help you navigate your job search with more clarity and
            confidence.
          </p>
        </div>
      </section>

      <section className="free-resources-guide-section">
        <div className="site-shell">
          <div className="free-resources-grid">
            {guides.map((guide) => (
              <article key={guide.title} className="free-resource-card">
                <span className="free-resource-pill">Free Guide</span>

                <h2>{guide.title}</h2>

                <p className="free-resource-description">
                  {guide.description}
                </p>

                <div className="free-resource-preview">
                  {guide.items.map(([number, text]) => (
                    <div key={`${guide.title}-${number}`}>
                      <span>{number}</span>
                      <strong>{text}</strong>
                    </div>
                  ))}
                </div>

                <div className="free-resource-overlay">
                  <div className="free-resource-lock">
                    <strong>Unlock this guide</strong>

                    <span>
                      Complete the form below for instant access to both
                      resources.
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="free-resources-form-section">
        <div className="site-shell free-resources-form-wrap">
          <div className="free-resources-form-card">
            <div className="free-resources-form-heading">
              <p className="eyebrow">Instant Access</p>

              <h2>Complete the form to unlock both guides.</h2>

              <p>
                Enter your full name and email address. You will be taken
                directly to both downloadable resources.
              </p>
            </div>

            <form
              className="free-resources-form"
              onSubmit={handleSubmit}
            >
              <label className="contact-field">
                <span>
                  Full name <small>Required</small>
                </span>

                <input
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="contact-field">
                <span>
                  Email address <small>Required</small>
                </span>

                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="contact-honeypot" aria-hidden="true">
                Website

                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>

              {status === "error" ? (
                <p className="contact-error">{errorMessage}</p>
              ) : null}

              <button
                type="submit"
                className="contact-submit-button"
                disabled={status === "submitting"}
              >
                {status === "submitting"
                  ? "Unlocking..."
                  : "Unlock Both Free Guides"}
              </button>

              <p className="contact-privacy">
                No spam. Just practical career guidance from JGO Hire.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}