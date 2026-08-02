"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      service: formData.get("service"),
      message: formData.get("message"),
      referralSource: formData.get("referralSource"),
      website: formData.get("website"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit the form.");
      }

      form.reset();
      setStatus("success");
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
    <main className="contact-page">
      <header className="contact-header">
        <div className="site-shell contact-header-inner">
          <Link href="/" className="contact-logo">
            <span>JGO HIRE</span>
            <small>Career Coach + Recruiter</small>
          </Link>

          <Link href="/" className="contact-back-link">
            Back to Home
          </Link>
        </div>
      </header>

      <section className="contact-hero">
        <div className="site-shell contact-hero-content">
          <p className="contact-eyebrow">Let’s Talk</p>

          <h1>
            Not sure where
            <br />
            to start?
          </h1>

          <h2>That is exactly what this conversation is for.</h2>

          <p className="contact-hero-copy">
            Tell me where you are in your career, what challenges you are
            facing, and what you are hoping to achieve. Together, we’ll
            determine the best next step.
          </p>

          <div className="contact-reassurance">
            No pressure. No obligation. Just a conversation.
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="site-shell contact-form-layout">
          <aside className="contact-sidebar">
            <p className="contact-sidebar-label">What happens next?</p>

            <h2>A simple first step.</h2>

            <div className="contact-steps">
              <div>
                <span>01</span>
                <p>You tell me what support you’re looking for.</p>
              </div>

              <div>
                <span>02</span>
                <p>I’ll personally review your information.</p>
              </div>

              <div>
                <span>03</span>
                <p>I’ll follow up with the best next step.</p>
              </div>
            </div>

            <p className="contact-direct-email">
              Prefer email?
              <a href="mailto:jen@jgohire.com">jen@jgohire.com</a>
            </p>
          </aside>

          <div className="contact-form-card">
            {status === "success" ? (
              <div className="contact-success">
                <div className="contact-success-icon" aria-hidden="true">
                  ✓
                </div>

                <p className="contact-eyebrow">Message Received</p>

                <h2>Thank you for reaching out.</h2>

                <p>
                  Your information has been submitted successfully. I’ll review
                  everything and get back to you soon.
                </p>

                <Link href="/" className="contact-submit-button">
                  Return to JGO Hire
                </Link>
              </div>
            ) : (
              <>
                <div className="contact-form-heading">
                  <p className="contact-eyebrow">Book a Consultation</p>

                  <h2>Tell me a little about you.</h2>

                  <p>
                    Complete the form below, and I’ll be in touch to discuss
                    how JGO Hire can support you.
                  </p>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-field-row">
                    <label className="contact-field">
                      <span>
                        First name <small>Required</small>
                      </span>

                      <input
                        type="text"
                        name="firstName"
                        autoComplete="given-name"
                        required
                      />
                    </label>

                    <label className="contact-field">
                      <span>
                        Last name <small>Required</small>
                      </span>

                      <input
                        type="text"
                        name="lastName"
                        autoComplete="family-name"
                        required
                      />
                    </label>
                  </div>

                  <div className="contact-field-row">
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

                    <label className="contact-field">
                      <span>Phone number</span>

                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                      />
                    </label>
                  </div>

                  <label className="contact-field">
                    <span>What kind of support are you looking for?</span>

                    <select name="service" defaultValue="">
                      <option value="" disabled>
                        Select a service
                      </option>
                      <option value="Interview Coaching">
                        Interview Coaching
                      </option>
                      <option value="Resume Writing">Resume Writing</option>
                      <option value="LinkedIn Optimization">
                        LinkedIn Optimization
                      </option>
                      <option value="Career Coaching">Career Coaching</option>
                      <option value="Job Search Strategy">
                        Job Search Strategy
                      </option>
                      <option value="Career Documents">
                        Career Documents
                      </option>
                      <option value="Not Sure Yet">I’m not sure yet</option>
                    </select>
                  </label>

                  <label className="contact-field">
                    <span>
                      What brought you here today? <small>Required</small>
                    </span>

                    <textarea
                      name="message"
                      rows={6}
                      placeholder="Tell me what you are working through and what kind of support you need."
                      required
                    />
                  </label>

                  <label className="contact-field">
                    <span>How did you hear about JGO Hire?</span>

                    <select name="referralSource" defaultValue="">
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Instagram">Instagram</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="TikTok">TikTok</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Substack">Substack</option>
                      <option value="Referral">Referral</option>
                      <option value="Google">Google</option>
                      <option value="Other">Other</option>
                    </select>
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
                      ? "Sending..."
                      : "Submit My Information"}
                  </button>

                  <p className="contact-privacy">
                    Your information will only be used to respond to your
                    inquiry.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}