"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import "./volunteer-experience.css";

const steps = [
  {
    title: "Why Volunteer Experience Matters",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="volunteer-image">
          <Image
            src="/course/volunteer-experience.png"
            alt="LinkedIn Volunteer Experience example"
            width={1200}
            height={675}
            priority
          />
        </div>

        <div className="volunteer-reading-card">
          <p>
            Your volunteer experience section sits below your education and is an optional place to highlight unpaid work, community involvement, or organizations you have been part of outside of your regular jobs.
          </p>
        </div>

        <aside className="volunteer-statement-card">
          <span>Volunteer Rule</span>
          <p>You do not need a volunteer section, but it can add value if it actually means something.</p>
        </aside>
      </>
    ),
  },
  {
    title: "How to Edit the Volunteer Section",
    eyebrow: "Step 2",
    content: (
      <section className="volunteer-howto-card">
        <div className="volunteer-howto-header">
          <span>How To Edit</span>
          <strong>Update your LinkedIn volunteer section</strong>
        </div>

        <div className="volunteer-howto-body">
          <div>
            <span>01</span>
            <p>Scroll down on your profile and click "Add Section."</p>
          </div>

          <div>
            <span>02</span>
            <p>Select volunteer experience and fill in the organization, your role, and the dates you were involved.</p>
          </div>
        </div>
      </section>
    ),
  },
  {
    title: "What to Include",
    eyebrow: "Step 3",
    content: (
      <>
        <div className="volunteer-reading-card">
          <p>You do not need a volunteer section, but it can add value if it actually means something.</p>

          <p>
            If you have done work that shows responsibility, leadership, or genuine community involvement, it is worth including. This is especially helpful if you are early in your career or your experience section is light. Nonprofits, school organizations, community work, anything where you had a real role and real responsibilities counts.
          </p>

          <p>
            Skip it if it is just filler. More is not always better. It should help tell your story, not take up space.
          </p>

          <p>
            If you do include it, treat it like your experience section but keep the tone a little more natural. Do not just list the organization. Briefly explain what you did and what your role actually was.
          </p>
        </div>

        <div className="volunteer-value-grid">
          <article>
            <span>01</span>
            <h3>Include It If It Means Something</h3>
            <p>
              If you have done work that shows responsibility, leadership, or genuine community involvement, it is worth including.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Skip Filler</h3>
            <p>
              More is not always better. It should help tell your story, not take up space.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Explain Your Role</h3>
            <p>
              Do not just list the organization. Briefly explain what you did and what your role actually was.
            </p>
          </article>
        </div>
      </>
    ),
  },
  {
    title: "Quick Tip",
    eyebrow: "Step 4",
    content: (
      <aside className="volunteer-tip-card">
        <span>Quick Tip</span>
        <p>
          Volunteer experience can be especially helpful if it shows leadership, consistency, people skills, or a cause that connects to your career story.
        </p>
      </aside>
    ),
  },
  {
    title: "Using AI to Improve It",
    eyebrow: "Step 5",
    content: (
      <>
        <div className="volunteer-reading-card">
          <p>
            Use AI to turn your volunteer details into a short, natural description that explains what you actually did and why it mattered.
          </p>
        </div>

        <aside className="volunteer-prompt-card">
          <div className="volunteer-prompt-top">
            <div>
              <span>Copy + Paste Prompt</span>
              <h3>Write your volunteer description.</h3>
            </div>

            <small>AI Tool Ready</small>
          </div>

          <div className="volunteer-prompt-body">
            <p>
              Write a short description for my LinkedIn volunteer experience section based on the details below. Keep it clear, concise, and easy to read. Focus on what I actually did, my responsibilities, and any impact I had. Keep the tone natural and not overly formal. Do not make anything up.
            </p>

            <p>[PASTE DETAILS]</p>
          </div>
        </aside>
      </>
    ),
  },
  {
    title: "Final Takeaway",
    eyebrow: "Step 6",
    content: (
      <aside className="volunteer-final-card">
        <span>Final Takeaway</span>
        <h3>If it was meaningful, include it.</h3>
        <p>
          If you did something meaningful outside of work, put it on your profile. It does not need to be elaborate. It just needs to be real.
        </p>
      </aside>
    ),
  },
];

export default function VolunteerExperienceLesson() {
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
    <section className="volunteer-course">
      <div className="volunteer-topbar">
        <div>
          <span>Volunteer Experience Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="volunteer-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="volunteer-layout">
        <aside className="volunteer-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "volunteer-step volunteer-step-active"
                  : "volunteer-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="volunteer-content">
          <div className="volunteer-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="volunteer-body">{currentStep.content}</div>

          <div className="volunteer-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/certifications-projects-publications"
                className="volunteer-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Certifications, Projects & Publications</strong>
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
