"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import "./education.css";

const steps = [
  {
    title: "Why Education Matters",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="education-image">
          <Image
            src="/course/education.png"
            alt="LinkedIn Education section example"
            width={1200}
            height={675}
            priority
          />
        </div>

        <div className="education-reading-card">
          <p>
            Your education section is where you list the schools you attended, your degree or area of study, and the dates you were there. It sits below your experience section and is one of the fields recruiters and background check systems use to verify your background.
          </p>
        </div>

        <aside className="education-statement-card">
          <span>Education Rule</span>
          <p>Accuracy matters here because this is one of the most verified parts of your profile.</p>
        </aside>
      </>
    ),
  },
  {
    title: "How to Edit the Education Section",
    eyebrow: "Step 2",
    content: (
      <section className="education-howto-card">
        <div className="education-howto-header">
          <span>How To Edit</span>
          <strong>Update your LinkedIn education section</strong>
        </div>

        <div className="education-howto-body">
          <div>
            <span>01</span>
            <p>Click the pencil icon next to the Education section or hit the plus sign to add a new school.</p>
          </div>

          <div>
            <span>02</span>
            <p>Fill in the school name, degree type, field of study, and start and end dates.</p>
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
        <div className="education-grid">
          <article>
            <span>01</span>
            <h3>Include College</h3>
            <p>For college, make sure everything is accurate. If you did not graduate, do not say you did.</p>
          </article>

          <article>
            <span>02</span>
            <h3>Include High School</h3>
            <p>High school might feel unnecessary but it is actually useful for networking.</p>
          </article>

          <article>
            <span>03</span>
            <h3>Check Dates</h3>
            <p>Make sure your education dates line up with your experience dates.</p>
          </article>
        </div>

        <div className="education-reading-card">
          <p>
            Include both your college and your high school. High school might feel unnecessary but it is actually useful for networking. It helps you find people who went to the same school, which is an easy way to connect and start a conversation. It is underrated.
          </p>

          <p>
            For college, make sure everything is accurate. If you did not graduate, do not say you did. List the school, the dates you were there, and credits completed if relevant. You can list what you studied and your major. What you cannot do is claim a degree you did not earn.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Common Education Mistakes",
    eyebrow: "Step 4",
    content: (
      <div className="education-mistake-grid">
        <article>
          <span>01</span>
          <h3>Claiming a Degree You Did Not Earn</h3>
          <p>If you did not graduate, do not list it as a completed degree. Be honest about what you completed.</p>
        </article>

        <article>
          <span>02</span>
          <h3>Incorrect Graduation Dates</h3>
          <p>Dates that do not line up with your resume or background check can create unnecessary questions.</p>
        </article>

        <article>
          <span>03</span>
          <h3>Leaving Schools Off Entirely</h3>
          <p>Education can help with credibility, alumni searches, and networking. Do not overlook it.</p>
        </article>
      </div>
    ),
  },
  {
    title: "Background Checks",
    eyebrow: "Step 5",
    content: (
      <aside className="education-dark-card">
        <span>Accuracy Matters</span>
        <h3>Background checks verify education.</h3>
        <p>
          Many companies run background checks and they will find out if something does not match. Be honest and save yourself the headache.
        </p>
      </aside>
    ),
  },
  {
    title: "Additional Details",
    eyebrow: "Step 6",
    content: (
      <>
        <div className="education-reading-card">
          <p>
            If you are early in your career, you can add relevant coursework, clubs, or organizations if they actually relate to what you are targeting. If you have a few years of experience, keep it short.
          </p>

          <p>
            Make sure your education dates line up with your experience dates. If something overlaps or looks off, it raises questions.
          </p>
        </div>

        <aside className="education-tip-card">
          <span>Quick Tip</span>
          <p>
            If you transferred schools, attended multiple colleges, or completed coursework without graduating, list it accurately. Recruiters care more about honesty than perfection.
          </p>
        </aside>

        <aside className="education-tip-card">
          <span>Quick Tip</span>
          <p>
            Some roles require specific degrees. If your education does not match what was listed as a requirement, it can disqualify you later in the process even after interviews. Accuracy matters here.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "Final Takeaway",
    eyebrow: "Step 7",
    content: (
      <aside className="education-final-card">
        <span>Final Takeaway</span>
        <h3>Get it right the first time.</h3>
        <p>
          Your education section is one of the most verified parts of your profile. Recruiters check it, background systems check it, and inconsistencies get flagged. Get it right the first time and you never have to think about it again.
        </p>
      </aside>
    ),
  },
];

export default function EducationLesson() {
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
    <section className="education-course">
      <div className="education-topbar">
        <div>
          <span>Education Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="education-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="education-layout">
        <aside className="education-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "education-step education-step-active"
                  : "education-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="education-content">
          <div className="education-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="education-body">{currentStep.content}</div>

          <div className="education-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/volunteer-experience"
                className="education-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Volunteer Experience</strong>
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
