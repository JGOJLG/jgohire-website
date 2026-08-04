"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import "./additional-sections.css";

const steps = [
  {
    title: "Adding Sections to Your Profile",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="additional-sections-image">
          <Image
            src="/course/additional-sections.png"
            alt="LinkedIn profile sections example"
            width={1200}
            height={675}
            priority
          />
        </div>

        <div className="additional-sections-reading-card">
          <p>
            LinkedIn lets you customize your profile beyond the basics. At the
            top of your profile, just below your name, headline, and location,
            you will see a button that says "Add Section."
          </p>

          <p>
            This is where you can add anything that is not already there by
            default.
          </p>
        </div>

        <aside className="additional-sections-statement-card">
          <span>Keep It Simple</span>
          <p>Most people add too much.</p>
        </aside>
      </>
    ),
  },

  {
    title: "Choose Sections Intentionally",
    eyebrow: "Step 2",
    content: (
      <>
        <div className="additional-sections-reading-card">
          <p>
            You do not need to add everything. Most people add too much. Only
            include sections that support your experience and make your profile
            easier to understand or more credible.
          </p>

          <p>
            Every section on your profile should serve a purpose. Think about
            whether it helps someone understand your background, experience,
            skills, or accomplishments.
          </p>
        </div>

        <div className="additional-sections-focus-grid">
          <article>
            <span>01</span>
            <h3>Add Value</h3>
            <p>
              Include sections that strengthen your story and showcase your
              experience.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Build Credibility</h3>
            <p>
              Use sections that help recruiters and connections understand
              what you bring.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Stay Intentional</h3>
            <p>
              More sections do not always make a stronger profile.
            </p>
          </article>
        </div>
      </>
    ),
  },

  {
    title: "Custom Link Button",
    eyebrow: "Step 3",
    content: (
      <>
        <div className="additional-sections-custom-card">
          <span>Underrated Feature</span>

          <h3>It is simple and underrated.</h3>

          <p>
            LinkedIn also gives you a custom link button at the top of your
            profile.
          </p>

          <p>
            You can use it to send people somewhere specific: a personal
            website, portfolio, GitHub, booking link, or work samples.
          </p>

          <p>
            Think about what you want someone to do after they view your
            profile and point them there.
          </p>
        </div>

        <div className="additional-sections-link-grid">
          <article>
            <span>Website</span>
            <p>Share your personal website or professional brand.</p>
          </article>

          <article>
            <span>Portfolio</span>
            <p>Showcase projects, designs, or work samples.</p>
          </article>

          <article>
            <span>Booking</span>
            <p>Make it easy for people to take the next step.</p>
          </article>
        </div>
      </>
    ),
  },

  {
    title: "Final Takeaway",
    eyebrow: "Step 4",
    content: (
      <aside className="additional-sections-final-card">
        <span>Final Takeaway</span>

        <h3>Simple and intentional always wins.</h3>

        <p>
          Do not add sections just to have them. If it does not add value or
          help tell your story, leave it out.
        </p>

        <p>
          Simple and intentional always wins.
        </p>
      </aside>
    ),
  },
];

export default function AdditionalSectionsLesson() {
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
    <section className="additional-sections-course">
      <div className="additional-sections-topbar">
        <div>
          <span>Additional Sections Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="additional-sections-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="additional-sections-layout">
        <aside className="additional-sections-steps">
          {steps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              className={
                index === activeStep
                  ? "additional-sections-step additional-sections-step-active"
                  : "additional-sections-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="additional-sections-content">
          <div className="additional-sections-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="additional-sections-body">
            {currentStep.content}
          </div>

          <div className="additional-sections-controls">
            <button
              type="button"
              disabled={activeStep === 0}
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/wrap-up"
                className="additional-sections-next-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Wrap Up</strong>
                </span>

                <span>→</span>
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
