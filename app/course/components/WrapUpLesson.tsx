"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./wrap-up.css";

const steps = [
  {
    title: "Your LinkedIn Profile Is Ready",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="wrap-up-reading-card">
          <p>
            At this point your profile should be polished, consistent, and easy
            to understand within seconds.
          </p>

          <p>
            A recruiter should land on your page and immediately know who you
            are, what you do, and whether it makes sense to reach out. That is
            the whole point.
          </p>
        </div>

        <aside className="wrap-up-statement-card">
          <span>The Goal</span>
          <p>
            A recruiter should immediately understand who you are, what you do,
            and why they should reach out.
          </p>
        </aside>
      </>
    ),
  },

  {
    title: "You Learned More Than LinkedIn",
    eyebrow: "Step 2",
    content: (
      <>
        <div className="wrap-up-reading-card">
          <p>
            You fixed your photo, your banner, your headline, your about
            section, your experience, your skills, and everything in between.
          </p>

          <p>
            More importantly, you now know how to use AI the right way. Not
            copying whatever comes back, but guiding it, refining it, and making
            the output actually sound like you.
          </p>

          <p>
            That shift alone puts you ahead of most people, even beyond the
            LinkedIn world.
          </p>
        </div>

        <div className="wrap-up-focus-grid">
          <article>
            <span>01</span>
            <h3>Guide AI</h3>
            <p>
              Use AI as a tool to support your ideas, not replace your voice.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Refine</h3>
            <p>
              Review, edit, and make every section sound authentic to you.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Stand Out</h3>
            <p>
              A thoughtful profile separates you from people who do the bare
              minimum.
            </p>
          </article>
        </div>
      </>
    ),
  },

  {
    title: "The Point",
    eyebrow: "Step 3",
    content: (
      <aside className="wrap-up-statement-card wrap-up-dark">
        <span>The Point</span>

        <p>
          A recruiter should land on your page and immediately know who you
          are, what you do, and whether it makes sense to reach out.
        </p>
      </aside>
    ),
  },

  {
    title: "Final Takeaway",
    eyebrow: "Step 4",
    content: (
      <aside className="wrap-up-final-card">
        <span>Final Takeaway</span>

        <h3>Now let the profile work for you.</h3>

        <p>
          No one can guarantee you a job, and anyone who tells you otherwise is
          not being straight with you.
        </p>

        <p>
          What you do have now is a profile that is visible, credible, and
          working in your favor.
        </p>

        <p>
          You understand how recruiters think, what they search for, and why
          any of this matters. That is a real advantage going into your search.
        </p>

        <p>
          You put in the work. Now let the profile work for you.
        </p>
      </aside>
    ),
  },
];

export default function WrapUpLesson() {
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
    <section className="wrap-up-course">
      <div className="wrap-up-topbar">
        <div>
          <span>Wrap Up Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="wrap-up-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="wrap-up-layout">
        <aside className="wrap-up-steps">
          {steps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              className={
                index === activeStep
                  ? "wrap-up-step wrap-up-step-active"
                  : "wrap-up-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="wrap-up-content">
          <div className="wrap-up-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="wrap-up-body">
            {currentStep.content}
          </div>

          <div className="wrap-up-controls">
            <button
              type="button"
              disabled={activeStep === 0}
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/bonus-content"
                className="wrap-up-next-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Bonus Content</strong>
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