"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./ai-tips.css";

const steps = [
  {
    title: "Course Mindset",
    eyebrow: "Step 1",
    content: (
      <aside className="ai-tips-statement-card">
        <span>Course Mindset</span>
        <p>AI is not the shortcut. Knowing how to use AI well is the skill.</p>
      </aside>
    ),
  },
  {
    title: "The Biggest Mistakes to Avoid",
    eyebrow: "Step 2",
    content: (
      <div className="ai-tips-feature-grid">
        <article className="ai-tips-feature-card">
          <span>01</span>
          <h3>Do not sound like AI.</h3>
          <p>
            If it reads too polished, too generic, or like something you have seen a hundred times, it is not working. Edit it until it sounds like you.
          </p>
        </article>

        <article className="ai-tips-feature-card">
          <span>02</span>
          <h3>Do not copy and paste.</h3>
          <p>
            What AI gives you is a starting point, not a finished product. Clean it up, adjust it, and make it yours.
          </p>
        </article>

        <article className="ai-tips-feature-card">
          <span>03</span>
          <h3>Do not let it oversell you.</h3>
          <p>
            AI tends to inflate language. Make sure what comes back actually matches your level of experience. Overstating is easy to spot and will work against you.
          </p>
        </article>
      </div>
    ),
  },
  {
    title: "What Good AI Users Do Differently",
    eyebrow: "Step 3",
    content: (
      <div className="ai-tips-grid">
        <article className="ai-tips-card">
          <span>04</span>
          <h3>Be specific.</h3>
          <p>
            Vague input gets vague output. Tell AI exactly what you do, who you are, and what you are going for. The more precise you are, the better the result.
          </p>
        </article>

        <article className="ai-tips-card">
          <span>05</span>
          <h3>Give it context.</h3>
          <p>
            Do not just say "write me a bio." Explain who you are, what you do, and what you are going for. The more you give it, the more it has to work with.
          </p>
        </article>

        <article className="ai-tips-card">
          <span>06</span>
          <h3>Ask it to rewrite.</h3>
          <p>
            If something feels off, say so. "Make this simpler." "Make this sound more natural." "Make this less generic." Keep pushing until it feels right.
          </p>
        </article>

        <article className="ai-tips-card">
          <span>07</span>
          <h3>Push for better.</h3>
          <p>
            If the first response feels average, ask for a stronger or more direct version. You will almost always get a better result on the second or third try.
          </p>
        </article>

        <article className="ai-tips-card">
          <span>08</span>
          <h3>Keep it concise.</h3>
          <p>
            Clear and easy to read will always outperform long and impressive sounding.
          </p>
        </article>

        <article className="ai-tips-card">
          <span>09</span>
          <h3>Test different outcomes.</h3>
          <p>
            Ask for multiple versions and compare them. One might be more direct, one might be warmer, one might land differently than you expected. You do not know what the best version is until you see a few options side by side.
          </p>
        </article>
      </div>
    ),
  },
  {
    title: "You Are Still the Filter",
    eyebrow: "Step 4",
    content: (
      <aside className="ai-tips-filter-card">
        <span>The Filter Rule</span>
        <h3>You are still the filter.</h3>
        <p>
          AI does not decide what is good. You do. If something does not sound like you or does not accurately reflect your experience, do not use it.
        </p>
      </aside>
    ),
  },
  {
    title: "Use AI as a Thought Partner",
    eyebrow: "Step 5",
    content: (
      <div className="ai-tips-feature-grid">
        <article className="ai-tips-feature-card">
          <span>10</span>
          <h3>AI does not know you.</h3>
          <p>
            It only knows what you tell it. Give it nothing and it will give you something generic. Give it real context and the output changes entirely.
          </p>
        </article>

        <article className="ai-tips-feature-card">
          <span>11</span>
          <h3>Use it as a thought partner.</h3>
          <p>
            Ask things like "what am I missing" or "does this positioning make sense for someone targeting operations roles." AI can help you think through strategy, not just write copy.
          </p>
        </article>

        <article className="ai-tips-feature-card">
          <span>12</span>
          <h3>Save what works.</h3>
          <p>
            When you get a response that really sounds like you, keep it. Reuse that prompt or style so you are not starting from scratch every time.
          </p>
        </article>
      </div>
    ),
  },
  {
    title: "Before You Continue",
    eyebrow: "Step 6",
    content: (
      <aside className="ai-tips-final-card">
        <span>Before You Continue</span>
        <p>
          Throughout this guide, I will show you exactly what to ask and how to ask it. Every section includes prompts you can use right away. Follow along, plug in your information, and adjust from there.
        </p>
      </aside>
    ),
  },
];

export default function AITipsLesson() {
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
    <section className="ai-tips-course">
      <div className="ai-tips-topbar">
        <div>
          <span>AI Tips Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="ai-tips-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="ai-tips-layout">
        <aside className="ai-tips-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "ai-tips-step ai-tips-step-active"
                  : "ai-tips-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="ai-tips-content">
          <div className="ai-tips-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="ai-tips-body">{currentStep.content}</div>

          <div className="ai-tips-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/networking-on-linkedin"
                className="ai-tips-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>How Networking Actually Works</strong>
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
