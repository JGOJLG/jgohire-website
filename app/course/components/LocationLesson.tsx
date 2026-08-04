"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import "./location.css";

const steps = [
  {
    title: "Why Your Location Matters",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="location-image">
          <Image
            src="/course/location.png"
            alt="LinkedIn location field example"
            width={1200}
            height={675}
            priority
          />
        </div>

        <div className="location-reading-card">
          <p>
            Your location on LinkedIn is the city and region that appears directly under your headline. It sounds minor, but it directly impacts whether you show up in searches, whether someone clicks your profile, and whether your application even gets reviewed.
          </p>
        </div>

        <aside className="location-statement-card">
          <span>Location Rule</span>
          <p>
            Get it right and you stay in the running. Get it wrong and you may be invisible.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "How to Edit Your Location",
    eyebrow: "Step 2",
    content: (
      <section className="location-howto-card">
        <div className="location-howto-header">
          <span>How To Edit</span>
          <strong>Update your LinkedIn location</strong>
        </div>

        <div className="location-howto-body">
          <div>
            <span>01</span>
            <p>Click the pencil icon on your profile.</p>
          </div>

          <div>
            <span>02</span>
            <p>Scroll down to the location field.</p>
          </div>

          <div>
            <span>03</span>
            <p>Type in your city and select the correct option from the dropdown.</p>
          </div>
        </div>
      </section>
    ),
  },
  {
    title: "Why It Matters More Than You Think",
    eyebrow: "Step 3",
    content: (
      <>
        <div className="location-reading-card">
          <p>
            Recruiters search by location constantly. If your location does not match what they are filtering for, you simply will not show up. Most roles, especially at the junior to mid level, are not open to relocation. Companies want local talent, and they search accordingly.
          </p>

          <p>
            If you are targeting a specific city, your profile should reflect that city. If you live in Chicago but are seriously pursuing roles in New York, it is okay to list New York. Just be transparent about it. Mention in your About section or when speaking with a recruiter that you are planning to relocate. The goal is to align your profile with the jobs you actually want without being misleading.
          </p>
        </div>

        <div className="location-filter-grid">
          <article>
            <span>01</span>
            <h3>Search Visibility</h3>
            <p>
              Recruiters search by location constantly. If your location does not match what they are filtering for, you simply will not show up.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Target City</h3>
            <p>
              If you are targeting a specific city, your profile should reflect that city.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Transparency</h3>
            <p>
              The goal is to align your profile with the jobs you actually want without being misleading.
            </p>
          </article>
        </div>
      </>
    ),
  },
  {
    title: "Common Mistake",
    eyebrow: "Step 4",
    content: (
      <>
        <aside className="location-warning-card">
          <span>Common Mistake</span>
          <h3>Do not put something vague like "United States."</h3>

          <p>
            Recruiters are not searching that. They are searching specific cities and regions. A vague location also raises questions. It can signal that someone is hiding where they actually are, that the profile is not being maintained, or in some cases it is associated with fraudulent profiles. Any of those assumptions work against you.
          </p>

          <p>
            Think about what happens the moment you apply. Your name and location are among the first things a recruiter sees. If the role is in Boston and your profile says Miami, there is a good chance they are not clicking through at all. Many recruiters use location filters that automatically screen candidates, and some applicant tracking systems will reject you outright before a human ever sees your name. If you do not match, you may never even be seen.
          </p>
        </aside>

        <aside className="location-tip-card">
          <span>Quick Tip</span>
          <p>
            If you are applying in a city, your profile should say that city. If you are open to multiple locations, pick the one you are targeting most and stay consistent.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "Final Takeaway",
    eyebrow: "Step 5",
    content: (
      <aside className="location-final-card">
        <span>Final Takeaway</span>
        <h3>Your location is not just a detail.</h3>
        <p>
          Your location is not just a detail. It is a filter. Get it right and you stay in the running. Get it wrong and you may be invisible before anyone reads a single word about you.
        </p>
      </aside>
    ),
  },
];

export default function LocationLesson() {
  const [activeStep, setActiveStep] = useState(0);

  const progress = useMemo(
    () => Math.round(((activeStep + 1) / steps.length) * 100),
    [activeStep]
  );

  const currentStep = steps[activeStep];

  function moveToStep(index: number) {
    setActiveStep(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="location-course">
      <div className="location-topbar">
        <div>
          <span>Location Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="location-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="location-layout">
        <aside className="location-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "location-step location-step-active"
                  : "location-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="location-content">
          <div className="location-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="location-body">{currentStep.content}</div>

          <div className="location-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/about-section"
                className="location-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>About Section</strong>
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => moveToStep(activeStep + 1)}
              >
                Continue →
              </button>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
