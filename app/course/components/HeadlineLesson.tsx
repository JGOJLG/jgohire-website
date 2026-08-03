"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./headline.css";

const steps = [
  {
    title: "Why Your Headline Matters",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="headline-reading-card">
          <p>
            Now that we have the visuals covered, let's make sure what people actually read is just as strong. Your headline is the line of text directly under your name at the top of your LinkedIn profile. It shows up in search results and it is one of the first things anyone sees. A strong headline tells people exactly who you are and what you do in just a few words. In years past this was largely overlooked. Now it is one of the first things recruiters see and reference when looking at a profile. Your headline also appears when you send someone a message on LinkedIn, showing up right below your name.
          </p>
        </div>

        <aside className="headline-statement-card">
          <span>Headline Rule</span>
          <p>The goal is not to sound impressive. It is to make sense immediately.</p>
        </aside>
      </>
    ),
  },
  {
    title: "How to Edit Your Headline",
    eyebrow: "Step 2",
    content: (
      <section className="headline-howto-card">
        <div className="headline-howto-header">
          <span>How To Edit</span>
          <strong>Update your LinkedIn headline</strong>
        </div>

        <div className="headline-howto-body">
          <div>
            <span>01</span>
            <p>
              Click the pencil icon near your name and photo and type directly into the field labeled "Headline."
            </p>
          </div>
        </div>
      </section>
    ),
  },
  {
    title: "Using AI to Improve Your Headline",
    eyebrow: "Step 3",
    content: (
      <>
        <div className="headline-reading-card">
          <p>
            This is where AI comes back in. Most people type "write me a LinkedIn headline" and are surprised when what comes back feels flat and generic. That is because they gave AI nothing to work with. You have to give it direction. Here’s how.
          </p>

          <p>
            Start by giving AI your resume. Then tell it exactly what roles you are targeting. Your headline should reflect where you are going, not just where you have been.
          </p>

          <p>
            Tell it how you want it to sound. Clear, specific, and natural. Not overly polished and not full of buzzwords.
          </p>

          <p>
            Ask for multiple options. You are not looking for one perfect answer. You want a few solid directions to choose from and refine.
          </p>

          <p>
            Once you have options, do not just pick one and move on. Read through them, combine what you like, adjust the wording, and make it sound like you. This is a long one. Copy and paste the entire prompt.
          </p>
        </div>

        <div className="headline-ai-grid">
          <article>
            <span>01</span>
            <h3>Give It Your Resume</h3>
            <p>
              Start by giving AI your resume. Then tell it exactly what roles you are targeting.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Give It Direction</h3>
            <p>
              Tell it how you want it to sound. Clear, specific, and natural. Not overly polished and not full of buzzwords.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Ask for Options</h3>
            <p>
              You are not looking for one perfect answer. You want a few solid directions to choose from and refine.
            </p>
          </article>
        </div>
      </>
    ),
  },
  {
    title: "Use This Prompt",
    eyebrow: "Step 4",
    content: (
      <aside className="headline-prompt-card">
        <div className="headline-prompt-top">
          <div>
            <span>Copy + Paste Prompt</span>
            <h3>Use this prompt.</h3>
          </div>

          <small>AI Tool Ready</small>
        </div>

        <div className="headline-prompt-body">
          <p>
            You have the knowledge of an extremely talented Recruiter and LinkedIn Guru. Knowing that, write 5 strong LinkedIn headline options based on my background.
          </p>

          <p>Here is my resume: [PASTE RESUME HERE]</p>

          <p>I am targeting roles in [INSERT ROLES AND INDUSTRY].</p>

          <p>
            The headline should be clear, specific, and easy to understand. Avoid generic phrases like "results-driven" or "detail-oriented." Avoid sounding like a job description. Use relevant keywords recruiters would search for, including job titles, skills, tools, and industries. Keep each option concise. Focus on what I actually do, my key strengths, and relevant experience.
          </p>

          <p>
            I like using the "|" format to separate ideas, so structure some options that way.
          </p>

          <p>Give me:</p>

          <p>2 keyword-heavy headlines using "|"</p>

          <p>1 simple and direct headline</p>

          <p>1 that highlights key skills and tools</p>

          <p>1 that emphasizes my target role clearly</p>
        </div>
      </aside>
    ),
  },
  {
    title: "Formatting That Works",
    eyebrow: "Step 5",
    content: (
      <aside className="headline-format-card">
        <span>Formula</span>
        <h3>A format that works almost every time:</h3>
        <p>
          Once you have options, pick the one that feels closest and refine from there. Mix and match pieces if needed.
        </p>

        <div>Role | Key Skills | Area of Focus</div>
      </aside>
    ),
  },
  {
    title: "Examples",
    eyebrow: "Step 6",
    content: (
      <div className="headline-example-grid">
        <article>
          <span>01</span>
          <h3>Software Engineer</h3>
          <p>Software Engineer | Java, AWS | Scalable Systems</p>
        </article>

        <article>
          <span>02</span>
          <h3>Data Analyst</h3>
          <p>Data Analyst | SQL, Tableau | Business Insights</p>
        </article>

        <article>
          <span>03</span>
          <h3>Sales Representative</h3>
          <p>Sales Representative | SaaS | Mid Market Growth</p>
        </article>

        <article>
          <span>04</span>
          <h3>Earlier in your career:</h3>
          <p>Recent Graduate | Finance | Data Analysis and Reporting</p>
        </article>
      </div>
    ),
  },
  {
    title: "Final Takeaway",
    eyebrow: "Step 7",
    content: (
      <aside className="headline-final-card">
        <span>Final Takeaway</span>
        <h3>Make sense immediately.</h3>
        <p>
          The goal is not to sound impressive. It is to make sense immediately. Someone should read your headline in two seconds and know exactly what you do. Use AI to get there faster, but make sure it still sounds like you.
        </p>
      </aside>
    ),
  },
];

export default function HeadlineLesson() {
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
    <section className="headline-course">
      <div className="headline-topbar">
        <div>
          <span>Headline Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="headline-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="headline-layout">
        <aside className="headline-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "headline-step headline-step-active"
                  : "headline-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="headline-content">
          <div className="headline-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="headline-body">{currentStep.content}</div>

          <div className="headline-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/your-location"
                className="headline-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Your Location</strong>
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
