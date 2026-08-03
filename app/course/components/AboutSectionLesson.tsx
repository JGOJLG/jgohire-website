"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./about-section.css";

const steps = [
  {
    title: "Why the About Section Matters",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="about-section-image-placeholder">
          <div className="about-section-placeholder-card" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div>
            <strong>About Section Example</strong>
            <p>Add your LinkedIn About section screenshot here.</p>
          </div>
        </div>

        <div className="about-section-reading-card">
          <p>
            Your About section lives just below your headline and basic info. It is one of the few places on your profile where you can speak in your own voice and give people a real sense of who you are and what you bring.
          </p>
        </div>

        <aside className="about-section-statement-card">
          <span>About Section Rule</span>
          <p>Your About section is your chance to sound like a real person.</p>
        </aside>
      </>
    ),
  },
  {
    title: "How to Edit the About Section",
    eyebrow: "Step 2",
    content: (
      <section className="about-section-howto-card">
        <div className="about-section-howto-header">
          <span>How To Edit</span>
          <strong>Update your LinkedIn About section</strong>
        </div>

        <div className="about-section-howto-body">
          <div>
            <span>01</span>
            <p>Click the pencil icon next to the word "About" on your profile.</p>
          </div>

          <div>
            <span>02</span>
            <p>If you have never filled it out, it will show a prompt to add a summary.</p>
          </div>

          <div>
            <span>03</span>
            <p>
              If you do not see an About section on your profile at all, click "Add Section" at the top of your profile to add it.
            </p>
          </div>

          <div>
            <span>04</span>
            <p>
              This applies to any section in this guide that you do not currently have. If it is missing, that button is how you add it.
            </p>
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
        <div className="about-section-reading-card">
          <p>
            Keep it simple. What do you do, what are you good at, what have you worked on, and what are you looking for. If someone reads it and understands you immediately, you did it right. No big words, nothing fancy, just clear and real. This is also a good place to bring in your keywords when mentioning your skillset, which makes you more searchable by recruiters and is one of the first things they see on your profile, especially if they are using the LinkedIn Recruiter tool.
          </p>

          <p>
            Start by pasting your resume or experience into AI. Do not just ask it to "write me an About section" with no context. That is how you end up with something generic that sounds like everyone else. Give it something real to work with, then guide it.
          </p>
        </div>

        <aside className="about-section-tip-card">
          <span>Quick Tip</span>
          <p>
            Anyone can see your About section, including your current employer. Choose the version below that fits your situation.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "Choose the Right Approach",
    eyebrow: "Step 4",
    content: (
      <div className="about-section-ai-grid">
        <article>
          <span>01</span>
          <h3>Actively Job Searching</h3>
          <p>
            Use this when you want your About section to clearly support the roles you are targeting.
          </p>
        </article>

        <article>
          <span>02</span>
          <h3>Safe for Current Employer</h3>
          <p>
            Use this when you want your profile to sound strong without framing yourself as actively job searching.
          </p>
        </article>

        <article>
          <span>03</span>
          <h3>Story-Driven</h3>
          <p>
            Use this when you want your About section to feel more personal and conversational while still being professional.
          </p>
        </article>
      </div>
    ),
  },
  {
    title: "Actively Job Searching",
    eyebrow: "Step 5",
    content: (
      <aside className="about-section-prompt-card">
        <div className="about-section-prompt-top">
          <div>
            <span>Copy + Paste Prompt</span>
            <h3>Option 1: Actively Job Searching</h3>
          </div>

          <small>AI Tool Ready</small>
        </div>

        <div className="about-section-prompt-body">
          <p>
            You have the knowledge of an extremely talented Recruiter and LinkedIn Guru. Knowing that, write a LinkedIn About section based on my background and the roles I am targeting in [INSERT ROLES AND INDUSTRY]. Keep it clear, concise, and easy to read. Avoid generic phrases and anything overly corporate. It should sound natural and human. Structure it with a short intro, key experience and skills, and a brief closing on what I am looking for. Use short paragraphs and keep it skimmable. Do not make anything up. [PASTE RESUME/EXPERIENCE]
          </p>
        </div>
      </aside>
    ),
  },
  {
    title: "Safe for Current Employer",
    eyebrow: "Step 6",
    content: (
      <aside className="about-section-prompt-card">
        <div className="about-section-prompt-top">
          <div>
            <span>Copy + Paste Prompt</span>
            <h3>Option 2: Safe for Current Employer</h3>
          </div>

          <small>AI Tool Ready</small>
        </div>

        <div className="about-section-prompt-body">
          <p>
            You have the knowledge of an extremely talented Recruiter and LinkedIn Guru. Knowing that, write a LinkedIn About section that is a general overview of my background, experience, and strengths. Do not frame it as actively job searching. Keep it professional but natural. Focus on what I do, what I am good at, and the types of work I have experience in. Keep it clear, concise, and easy to read with short paragraphs. Do not make anything up. [PASTE RESUME/EXPERIENCE]
          </p>
        </div>
      </aside>
    ),
  },
  {
    title: "Story-Driven",
    eyebrow: "Step 7",
    content: (
      <aside className="about-section-prompt-card">
        <div className="about-section-prompt-top">
          <div>
            <span>Copy + Paste Prompt</span>
            <h3>Option 3: Story-Driven</h3>
          </div>

          <small>AI Tool Ready</small>
        </div>

        <div className="about-section-prompt-body">
          <p>
            You have the knowledge of an extremely talented Recruiter and LinkedIn Guru. Knowing that, write a LinkedIn About section that feels slightly more personal and conversational while still being professional. Start with a brief intro about how I got into my field, then highlight my experience, skills, and what I enjoy working on. Keep it natural and human, not overly polished. Make it easy to read with short paragraphs. Do not make anything up. [PASTE RESUME/EXPERIENCE]
          </p>
        </div>
      </aside>
    ),
  },
  {
    title: "Open to Opportunities",
    eyebrow: "Step 8",
    content: (
      <aside className="about-section-prompt-card">
        <div className="about-section-prompt-top">
          <div>
            <span>Copy + Paste Prompt</span>
            <h3>Option 4: Open to Opportunities</h3>
          </div>

          <small>AI Tool Ready</small>
        </div>

        <div className="about-section-prompt-body">
          <p>
            You have the knowledge of an extremely talented Recruiter and LinkedIn Guru. Knowing that, write a LinkedIn About section that highlights my background, experience, and key skills while keeping the tone professional and natural. It should not sound like I am actively job searching, but can lightly mention openness to new opportunities. Keep it clear, concise, and easy to skim. Avoid generic or overly corporate language and do not make anything up. [PASTE RESUME/EXPERIENCE]
          </p>
        </div>
      </aside>
    ),
  },
  {
    title: "How to Format",
    eyebrow: "Step 9",
    content: (
      <aside className="about-section-format-card">
        <span>Formatting Tip</span>
        <h3>
          LinkedIn does not allow bold text or custom formatting directly in the About section.
        </h3>

        <p>
          If you want to add some visual structure, go to fontly.io/linkedin-font-generator, type what you want, and copy and paste it into your profile. It works for posts too.
        </p>

        <a
          href="https://fontly.io/linkedin-font-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn Font Formatter ← Click Here
        </a>
      </aside>
    ),
  },
  {
    title: "Final Takeaway",
    eyebrow: "Step 10",
    content: (
      <aside className="about-section-final-card">
        <span>Final Takeaway</span>
        <h3>Sound like a real person.</h3>
        <p>
          Your About section is your chance to sound like a real person. Use it. A clear, honest summary that actually sounds like you will always outperform something polished and generic.
        </p>
      </aside>
    ),
  },
];

export default function AboutSectionLesson() {
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
    <section className="about-section-course">
      <div className="about-section-topbar">
        <div>
          <span>About Section Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="about-section-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="about-section-layout">
        <aside className="about-section-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "about-section-step about-section-step-active"
                  : "about-section-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="about-section-content">
          <div className="about-section-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="about-section-body">{currentStep.content}</div>

          <div className="about-section-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/experience"
                className="about-section-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Experience</strong>
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
