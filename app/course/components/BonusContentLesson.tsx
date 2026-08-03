"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./bonus-content.css";

const steps = [
  {
    title: "Apply With Intention",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="bonus-content-reading-card">
          <p>
            Most people apply to jobs the exact same way. Same resume, no
            adjustments, sent to every posting they can find, and then they
            wonder why nothing is happening.
          </p>

          <p>
            Here is one small shift that makes a real difference.
          </p>
        </div>

        <aside className="bonus-content-statement-card">
          <span>Small Shift</span>
          <p>
            Stop applying blindly and start applying with intention.
          </p>
        </aside>
      </>
    ),
  },

  {
    title: "Use AI Before You Apply",
    eyebrow: "Step 2",
    content: (
      <>
        <div className="bonus-content-reading-card">
          <p>
            Take the job description and your resume and paste them both into
            AI.
          </p>

          <p>
            Then ask AI what you should highlight from your background based on
            the role you are targeting.
          </p>
        </div>

        <div className="bonus-content-prompt-card">
          <div className="bonus-content-prompt-top">
            <div>
              <span>Copy + Paste Prompt</span>
              <h3>Use this before you apply.</h3>
            </div>

            <small>AI Tool Ready</small>
          </div>

          <div className="bonus-content-prompt-body">
            <p>
              Based on this job description, what should I highlight from my
              background? Focus on the most relevant experience, skills, and
              keywords specific to this role. Do not make anything up.
            </p>

            <p>
              [PASTE JOB DESCRIPTION]
            </p>
          </div>
        </div>

        <div className="bonus-content-reading-card">
          <p>
            That one step alone will help you stop applying blindly and start
            applying with intention.
          </p>

          <p>
            When your resume is actually speaking to the role you are going
            after, it shows.
          </p>
        </div>
      </>
    ),
  },

  {
    title: "Need Personalized Feedback?",
    eyebrow: "Step 3",
    content: (
      <aside className="bonus-content-coaching-card">
        <span>1:1 Guidance</span>

        <h3>
          Looking for personalized feedback?
        </h3>

        <p>
          This guide gives you the foundation, but sometimes you need
          personalized feedback.
        </p>

        <p>
          In a 1:1 coaching session, we'll review your resume, LinkedIn profile,
          job search strategy, and applications together.
        </p>

        <p>
          You'll get direct feedback from someone who has spent years on the
          recruiting side reviewing candidates and making hiring decisions.
        </p>

        <p>
          If you're looking for a clearer strategy, more confidence, and a
          personalized plan built around your goals, I'd love to help.
        </p>

        <p>
          Reach out at jen@jgohire.com to learn more.
        </p>

        <a
          className="bonus-content-email-pill"
          href="mailto:jen@jgohire.com"
        >
          jen@jgohire.com
        </a>
      </aside>
    ),
  },

  {
    title: "Final Recap",
    eyebrow: "Step 4",
    content: (
      <aside className="bonus-content-final-card">
        <div className="bonus-content-stars">
          ★★★★★
        </div>

        <span>Course Complete</span>

        <h3>
          You invested in yourself. Now put it into action.
        </h3>

        <p>
          You now have a LinkedIn profile that is clearer, stronger, and built
          with intention.
        </p>

        <p>
          Throughout this guide, you learned how recruiters view profiles, what
          information matters most, how to use AI effectively, and how to
          position your experience in a way that tells your story.
        </p>

        <p>
          But the biggest change is not just your LinkedIn profile. It is the
          confidence and understanding you gained throughout the process.
        </p>

        <p>
          You no longer have to guess what recruiters are looking for. You have
          the tools to make smarter decisions, tell your story better, and
          approach your job search with more strategy.
        </p>

        <p>
          Thank you for investing in yourself and taking the time to build
          something that represents you.
        </p>

        <p>
          Now it is time to put it into action.
        </p>

        <div className="bonus-content-updated">
          This guide was last updated June 10, 2026. LinkedIn updates frequently
          and some features or layouts may have changed since publication. If
          anything looks different on your end, feel free to reach out.
        </div>
      </aside>
    ),
  },
];

export default function BonusContentLesson() {
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
    <section className="bonus-content-course">
      <div className="bonus-content-topbar">
        <div>
          <span>Bonus Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="bonus-content-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="bonus-content-layout">
        <aside className="bonus-content-steps">
          {steps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              className={
                index === activeStep
                  ? "bonus-content-step bonus-content-step-active"
                  : "bonus-content-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="bonus-content-content">
          <div className="bonus-content-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="bonus-content-body">
            {currentStep.content}
          </div>

          <div className="bonus-content-controls">
            <button
              type="button"
              disabled={activeStep === 0}
              onClick={() =>
                moveToStep(Math.max(0, activeStep - 1))
              }
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/leave-a-review"
                className="bonus-content-next-card"
              >
                <span>
                  <small>Course Complete</small>
                  <strong>Leave a Review</strong>
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