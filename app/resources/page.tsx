import Link from "next/link";
import { Suspense } from "react";
import ClientResourceUnlock from "./ClientResourceUnlock";

const resourceNavigation = [
  {
    title: "Free Resources",
    description: "Guides and tools you can use right away.",
    href: "#free-resources",
    number: "01",
  },
  {
    title: "Client Exclusive",
    description: "Frameworks available to JGO Hire clients.",
    href: "#client-exclusive",
    number: "02",
  },
  {
    title: "Digital Guides",
    description: "Self-paced resources available for purchase.",
    href: "#digital-guides",
    number: "03",
  },
  {
    title: "Personalized Support",
    description: "Work directly with Jen on your career goals.",
    href: "/contact",
    number: "04",
  },
];

const freeResources = [
  {
    label: "Free Guide",
    title: "10 Reasons You’re Not Hearing Back After Applying",
    description:
      "Learn why qualified candidates get overlooked and how to improve your chances of getting interviews.",
    preview: [
      "Your resume is not telling the right story.",
      "You are applying like everyone else.",
      "Your value is not clear quickly enough.",
    ],
    href: "/free",
    buttonLabel: "Download Free Guide",
  },
  {
    label: "Free Guide",
    title: "30-Minute Interview Countdown",
    description:
      "A simple countdown to help you feel calm, focused, and ready before you click Join.",
    preview: [
      "Review your achievements, job description, and interviewer’s name.",
      "Test your camera, microphone, internet, and interview space.",
      "Take a breath, relax your shoulders, sit up tall, and smile.",
    ],
    href: "/free",
    buttonLabel: "Download Free Guide",
  },
];

const clientResources = [
  {
    label: "Client Exclusive",
    title: "JGO CORE™ Framework",
    description:
      "Build stories, not scripts. Use CORE to structure clear, confident interview answers.",
    preview: [
      "Context: Set the stage.",
      "Ownership: Clarify your personal contribution.",
      "Response: Explain the actions you took.",
      "Effect: Share the result or impact.",
    ],
    href: "/coreframework",
  },
  {
    label: "Client Exclusive",
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

export default function ResourcesPage() {
  return (
    <main className="resources-page">
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

      <section className="resources-hero">
        <div className="site-shell resources-hero-content">
          <p className="eyebrow">JGO Hire Resources</p>
          <h1>Career resources for every stage of your job search.</h1>
          <p className="resources-hero-copy">
            Explore free guides, client-exclusive frameworks, and digital
            resources designed to help you communicate your value with more
            clarity and confidence.
          </p>
        </div>
      </section>

      <section className="resources-navigation-section">
        <div className="site-shell">
          <div className="resources-navigation-heading">
            <p className="eyebrow">Browse the Library</p>
            <h2>What are you looking for?</h2>
          </div>

          <nav
            className="resources-navigation-grid"
            aria-label="Resource categories"
          >
            {resourceNavigation.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="resources-navigation-card"
              >
                <span className="resources-navigation-number">
                  {item.number}
                </span>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <span className="resources-navigation-arrow">→</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section
        className="resources-section resources-section-white"
        id="free-resources"
      >
        <div className="site-shell">
          <div className="resources-section-heading">
            <p className="eyebrow">Free Resources</p>
            <h2>Simple guides you can use right away.</h2>
            <p>
              Practical resources to support your applications, job-search
              strategy, and interview preparation.
            </p>
          </div>

          <div className="resources-grid">
            {freeResources.map((resource) => (
              <article key={resource.title} className="resource-library-card">
                <div className="resource-library-top">
                  <span className="resource-library-label">
                    {resource.label}
                  </span>
                  <span className="resource-library-icon" aria-hidden="true">
                    ↓
                  </span>
                </div>

                <h3>{resource.title}</h3>
                <p className="resource-library-description">
                  {resource.description}
                </p>

                <div className="resource-library-preview">
                  {resource.preview.map((item, index) => (
                    <div key={item}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={resource.href}
                  className="button button-primary resource-library-button"
                >
                  {resource.buttonLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="resources-section resources-section-cream"
        id="client-exclusive"
      >
        <div className="site-shell">
          <div className="resources-section-heading">
            <p className="eyebrow">Client Exclusive</p>
            <h2>Frameworks for stronger interview preparation.</h2>
            <p>
              Available to JGO Hire clients and designed to support confidence,
              clarity, and execution.
            </p>
          </div>

          <div className="resources-grid">
            {clientResources.map((resource) => (
              <article
                key={resource.title}
                className="resource-library-card resource-library-card-locked"
              >
                <div className="resource-library-top">
                  <span className="resource-library-label">
                    {resource.label}
                  </span>
                  <span className="resource-library-icon" aria-hidden="true">
                    🔒
                  </span>
                </div>

                <h3>{resource.title}</h3>
                <p className="resource-library-description">
                  {resource.description}
                </p>

                <div className="resource-library-preview">
                  {resource.preview.map((item) => (
                    <div key={item}>
                      <span aria-hidden="true">✓</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>

                <div className="resource-library-actions">
                  <Suspense
  fallback={
    <button
      type="button"
      className="button button-primary"
      disabled
    >
      Unlock the Guide
    </button>
  }
>
  <ClientResourceUnlock
    resourceTitle={resource.title}
    destination={resource.href}
  />
</Suspense>

                  <Link href="/contact" className="button button-secondary">
                    Become a Client
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="resources-section resources-section-white"
        id="digital-guides"
      >
        <div className="site-shell">
          <div className="resources-section-heading">
            <p className="eyebrow">Digital Guides</p>
            <h2>Prefer to work through it on your own?</h2>
            <p>
              Purchase individual resources and work through the strategy at
              your own pace.
            </p>
          </div>

          <div className="resources-digital-card">
            <div className="resources-digital-copy">
              <span className="resource-library-label">DIY Option</span>
              <h3>The LinkedIn Optimization Guide</h3>
              <p>
                A step-by-step guide to help you strengthen your LinkedIn
                profile, improve your positioning, and show up more confidently
                online.
              </p>

              <div className="resources-digital-price">
                <span className="resources-old-price">$500 value</span>
                <strong>only $23</strong>
              </div>

              <Link href="/guide" className="button button-light">
                Purchase the Guide
              </Link>
            </div>

            <div className="resources-digital-preview">
              <small>JGO Hire</small>
              <strong>
                LinkedIn
                <br />
                Optimization Guide
              </strong>
              <span>Recruiter-backed profile strategy</span>
            </div>
          </div>
        </div>
      </section>

      <section className="resources-support-section">
        <div className="site-shell">
          <div className="resources-support-card">
            <div className="resources-support-copy">
              <p className="eyebrow">Personalized Support</p>

              <h2>Not sure what your next step should be?</h2>

              <p>
                Tell me where you are in your job search, what feels stuck, and
                what you are working toward. We’ll identify the strongest next
                move together.
              </p>
            </div>

            <Link href="/contact" className="resources-support-button">
              Book a Consultation
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
