"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./mindset.css";

const steps = [
  {
    title: "The Mindset Shift",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="mindset-reading-card">
          <p>
            I was resistant to Artificial Intelligence too. AI feels weird at first, a little intimidating, and there are a lot of unknowns around it. I get it. But AI is here and not going anywhere, so instead of fighting it, you might as well learn how to use it to your advantage.
          </p>

          <p>
            The reality is other people are already using AI. The people you are competing with for jobs are using AI. So the question is not really whether to use it. It is whether you are going to use AI well or get left behind by people who figured it out before you did.
          </p>
        </div>

        <aside className="mindset-statement-card">
          <span>The Mindset Shift</span>
          <p>You do not need to love AI. You just need to know how to use it.</p>
        </aside>
      </>
    ),
  },
  {
    title: "Are You Actually Using It Right?",
    eyebrow: "Step 2",
    content: (
      <>
        <div className="mindset-reading-card">
          <p>
            A lot of people say they are using AI, but there is a big difference between using AI and using AI well. The output is only as good as what you put in. What you ask, how specific you are, and what context you provide all determine what you get back.
          </p>

          <p>
            You cannot copy and paste whatever AI generates and expect it to land. That is exactly why so many profiles, emails, messages, posts, and beyond are starting to sound identical. You have to take what AI gives you, edit it, and shape it into something that actually sounds like you and reflects your real experience.
          </p>

          <p>
            That is what this guide is for. You will learn how to use AI, how to prompt it correctly, and how to edit the output when you do not get what you wanted the first time.
          </p>
        </div>

        <div className="mindset-two-card-grid">
          <article>
            <span>01</span>
            <h3>Input Matters</h3>
            <p>The output is only as good as what you put in.</p>
          </article>

          <article>
            <span>02</span>
            <h3>Editing Matters</h3>
            <p>You have to take what AI gives you, edit it, and shape it into something that actually sounds like you.</p>
          </article>
        </div>
      </>
    ),
  },
  {
    title: "Can People Tell?",
    eyebrow: "Step 3",
    content: (
      <>
        <aside className="mindset-callout-card">
          <span>Real Talk</span>
          <p>
            If you are wondering whether people can tell when AI wrote something, the answer is yes, some of us can. As someone who uses AI regularly, I start to notice patterns. It often starts with the em dash (—). Then certain phrases, certain sentence structures, a format that starts to feel very familiar. People who rely too heavily on AI without editing tend to come across as less authentic, even if that is not the intention.
          </p>
        </aside>

        <div className="mindset-reading-card">
          <p>
            As a recruiter and the author of this guide, I strongly believe you should be using AI. The key is using it in a way where nobody knows you are. Think of it like a natural makeup look. You are wearing makeup, but it is subtle enough that nobody can really tell. Or think of it like a tailor. You did not make the suit, but you had it fitted to your body so it looks like it was made for you. That is exactly what you are doing when you edit AI output to match your voice.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Which Tool Should You Use?",
    eyebrow: "Step 4",
    content: (
      <>
        <div className="mindset-reading-card">
          <p>
            There is no shortage of AI tools out there. ChatGPT, Gemini, Grok, Claude, and Perplexity are among the most popular. You do not need to use all of them. Try a couple, see which one feels most natural, and stick with it.
          </p>
        </div>

        <div className="mindset-tool-grid">
          <span>ChatGPT</span>
          <span>Gemini</span>
          <span>Grok</span>
          <span>Claude</span>
          <span>Perplexity</span>
        </div>

        <aside className="mindset-final-card">
          <span>Final Takeaway</span>
          <p>The goal is not to use every tool. The goal is to use one well.</p>
        </aside>
      </>
    ),
  },
  {
    title: "Make the Tool Sound Like You",
    eyebrow: "Step 5",
    content: (
      <div className="mindset-reading-card">
        <p>
          Personally, I have spent time training ChatGPT to match my voice. I know how to adjust the wording so it sounds like me and not like a generic AI response. The editing step is not optional. It is the whole point. If you are not going back in and making the output your own, you are not really using AI as a tool. You are just outsourcing your voice to it.
        </p>

        <p>
          I have also used Claude, which tends to feel more conversational and performs well depending on what you need. That said, the paid version of ChatGPT is my go-to.
        </p>
      </div>
    ),
  },
];

export default function MindsetLesson() {
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
    <section className="mindset-course">
      <div className="mindset-course-topbar">
        <div>
          <span>Mindset Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="mindset-course-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="mindset-course-layout">
        <aside className="mindset-course-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "mindset-course-step mindset-course-step-active"
                  : "mindset-course-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="mindset-course-content">
          <div className="mindset-course-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="mindset-course-body">{currentStep.content}</div>

          <div className="mindset-course-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/ai-tips"
                className="mindset-course-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>AI Tips</strong>
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
