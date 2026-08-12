import Link from "next/link";
import { Suspense } from "react";
import ClientResourceUnlock from "./ClientResourceUnlock";
import "./resources.css";

const freeResources = [
  {
    title: "10 Reasons You’re Not Hearing Back After Applying",
    description:
      "Learn why qualified candidates get overlooked and what to change so your applications have a better chance of turning into interviews.",
    href: "/free",
  },
  {
    title: "30-Minute Interview Countdown",
    description:
      "A simple pre-interview countdown to help you feel calm, focused, and ready before you click Join.",
    href: "/free",
  },
];

const clientResources = [
  {
    title: "JGO CORE™ Framework",
    description:
      "Build stories, not scripts. Use CORE to structure clear, confident interview answers.",
    preview: [
      "Context: Set the stage.",
      "Ownership: Clarify your contribution.",
      "Response: Explain the actions you took.",
      "Effect: Share the result or impact.",
    ],
    href: "/coreframework",
  },
  {
    title: "JGO READY™ Interview Framework",
    description:
      "A complete interview preparation system with checklists, reminders, mindset support, and preparation tools.",
    preview: [
      "Interactive interview checklist",
      "Printable preparation guide",
      "Interview-day reminders",
      "Mindset reset and countdown",
    ],
    href: "/interviewready",
  },
];

const guides = [
  {
    eyebrow: "LinkedIn Guide",
    title: "LinkedIn Optimization Guide",
    description:
      "A step-by-step recruiter-backed guide to strengthen your profile and positioning.",
    meta: "$23 • Lifetime access",
    href: "/guide",
    cta: "View the guide",
  },
  {
    eyebrow: "Free Guide + Quiz",
    title: "Job Seeker Survival Guide",
    description:
      "Take the 30-second job search reality check and get the free survival guide.",
    meta: "Free",
    href: "/freesurvivalguide",
    cta: "Get the guide",
  },
];

export default function ResourcesPage() {
  return (
    <main className="resources-clean-page">
      <header className="resources-clean-header">
        <div className="resources-clean-shell resources-clean-header-inner">
          <Link href="/" className="resources-clean-logo">
            <span>JGO HIRE</span>
            <small>Career Coach + Recruiter</small>
          </Link>

          <Link href="/" className="resources-clean-back">
            Back to Home
          </Link>
        </div>
      </header>

      <section className="resources-clean-hero">
        <div className="resources-clean-shell resources-clean-hero-inner">
          <span className="resources-clean-eyebrow">JGO Hire Resources</span>
          <h1>Start here.</h1>
          <p>
            Free job search tools first. Client-only frameworks when you want
            deeper support. A few focused guides if you prefer to work through
            things on your own.
          </p>
        </div>
      </section>

      <section className="resources-clean-section resources-free-section">
        <div className="resources-clean-shell">
          <div className="resources-clean-heading">
            <div>
              <span className="resources-clean-eyebrow">Free Resources</span>
              <h2>Use these right now.</h2>
            </div>
            <p>
              No overwhelm. Just practical resources designed to help with the
              parts of the job search that tend to get people stuck.
            </p>
          </div>

          <div className="resources-free-grid">
            {freeResources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="resources-free-card"
              >
                <div className="resources-free-card-top">
                  <span>Free</span>
                  <span aria-hidden="true">↓</span>
                </div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <strong>
                  Get the resource <span aria-hidden="true">→</span>
                </strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="resources-client-section">
        <div className="resources-client-glow resources-client-glow-one" />
        <div className="resources-client-glow resources-client-glow-two" />

        <div className="resources-clean-shell resources-client-shell">
          <div className="resources-client-copy">
            <span className="resources-client-pill">Client Exclusive</span>
            <h2>The tools clients get behind the scenes.</h2>
            <p>
              These are the frameworks I use to help clients prepare with more
              structure, confidence, and clarity. You can preview what is inside,
              but full access is reserved for JGO Hire clients.
            </p>
            <Link href="/contact" className="resources-client-main-cta">
              Become a JGO Hire client <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="resources-client-grid">
            {clientResources.map((resource) => (
              <article key={resource.title} className="resources-client-card">
                <div className="resources-client-card-top">
                  <span>Client only</span>
                  <span aria-hidden="true">🔒</span>
                </div>

                <h3>{resource.title}</h3>
                <p>{resource.description}</p>

                <div className="resources-client-preview-wrap">
                  <div className="resources-client-preview">
                    {resource.preview.map((item) => (
                      <div key={item}>
                        <span>✓</span>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="resources-client-blur-label">
                    <span>Client access</span>
                  </div>
                </div>

                <div className="resources-client-actions">
                  <Suspense
                    fallback={
                      <button
                        type="button"
                        className="resources-client-unlock"
                        disabled
                      >
                        Unlock
                      </button>
                    }
                  >
                    <ClientResourceUnlock
                      resourceTitle={resource.title}
                      destination={resource.href}
                    />
                  </Suspense>
                  <Link href="/contact" className="resources-client-secondary">
                    Become a Client
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="resources-guides-section">
        <div className="resources-clean-shell">
          <div className="resources-guides-heading">
            <span className="resources-clean-eyebrow">Guides</span>
            <h2>Prefer something self-paced?</h2>
          </div>

          <div className="resources-guides-grid">
            {guides.map((guide) => (
              <Link key={guide.title} href={guide.href} className="resources-guide-card">
                <div>
                  <span className="resources-guide-eyebrow">{guide.eyebrow}</span>
                  <h3>{guide.title}</h3>
                  <p>{guide.description}</p>
                </div>
                <div className="resources-guide-bottom">
                  <span>{guide.meta}</span>
                  <strong>
                    {guide.cta} <span aria-hidden="true">→</span>
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
