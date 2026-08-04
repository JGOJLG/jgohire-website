"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import "./recommendations.css";

const steps = [
  {
    title: "Why Recommendations Matter",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="recommendations-image">
          <Image
            src="/course/recommendations.png"
            alt="LinkedIn Recommendations section example"
            width={1200}
            height={675}
            priority
          />
        </div>

        <div className="recommendations-reading-card">
          <p>
            Recommendations are written references that live directly on your LinkedIn profile. They are public and visible to anyone who visits.
          </p>
        </div>

        <aside className="recommendations-statement-card">
          <span>Recommendation Rule</span>
          <p>A recommendation is someone vouching for you publicly.</p>
        </aside>
      </>
    ),
  },
  {
    title: "How to Request One",
    eyebrow: "Step 2",
    content: (
      <section className="recommendations-howto-card">
        <div className="recommendations-howto-header">
          <span>How To Edit</span>
          <strong>Request a LinkedIn recommendation</strong>
        </div>

        <div className="recommendations-howto-body">
          <div>
            <span>01</span>
            <p>Go to your profile and scroll down to the Recommendations section.</p>
          </div>

          <div>
            <span>02</span>
            <p>If you do not see it, click "Add Section" and add Recommendations first.</p>
          </div>

          <div>
            <span>03</span>
            <p>Once it is there, click the "+" button and select "Ask for a recommendation."</p>
          </div>

          <div>
            <span>04</span>
            <p>
              You will choose the person, your relationship to them, and LinkedIn will send the request.
            </p>
          </div>
        </div>
      </section>
    ),
  },
  {
    title: "Why This Matters",
    eyebrow: "Step 3",
    content: (
      <>
        <div className="recommendations-reading-card">
          <p>This is one most people skip, and that can be a mistake.</p>

          <p>
            A recommendation is someone vouching for you publicly. As a recruiter, I am not making a hiring decision based on this alone, but it helps. If I land on a strong profile and see a few solid recommendations from managers or coworkers, it reinforces everything I am already seeing.
          </p>

          <p>
            You do not need a lot. Two or three specific, well-written recommendations is more than enough.
          </p>
        </div>

        <div className="recommendations-value-grid">
          <article>
            <span>01</span>
            <h3>Public Credibility</h3>
            <p>A recommendation is someone vouching for you publicly.</p>
          </article>

          <article>
            <span>02</span>
            <h3>Reinforces Your Profile</h3>
            <p>
              If I land on a strong profile and see a few solid recommendations from managers or coworkers, it reinforces everything I am already seeing.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Quality Over Quantity</h3>
            <p>Two or three specific, well-written recommendations is more than enough.</p>
          </article>
        </div>
      </>
    ),
  },
  {
    title: "Who to Ask",
    eyebrow: "Step 4",
    content: (
      <div className="recommendations-reading-card">
        <p>
          Be intentional. Ask former managers, people you worked closely with, or clients if that is relevant to your work. Pick people who can speak to what you actually did, not just what you are like as a person.
        </p>
      </div>
    ),
  },
  {
    title: "Make It Easy for Them",
    eyebrow: "Step 5",
    content: (
      <div className="recommendations-reading-card">
        <p>
          Most people feel awkward asking for recommendations. The easiest way around that is to write it for them.
        </p>

        <p>
          People are busy. If you send something already drafted, they are far more likely to edit it and post it than start from scratch. It removes the friction and makes it a quick yes.
        </p>
      </div>
    ),
  },
  {
    title: "Prompt for Someone to Post",
    eyebrow: "Step 6",
    content: (
      <aside className="recommendations-prompt-card">
        <div className="recommendations-prompt-top">
          <div>
            <span>Copy + Paste Prompt</span>
            <h3>For someone to post about you:</h3>
          </div>

          <small>AI Tool Ready</small>
        </div>

        <div className="recommendations-prompt-body">
          <p>
            Write a LinkedIn recommendation for me from the perspective of a [manager/coworker/client]. Focus on my work, strengths, and how I contributed to the team. Keep it specific and natural, not overly formal or generic. Include 2 to 3 concrete examples of what I did or how I added value. Keep it to 4 to 6 sentences. Do not make anything up.
          </p>

          <p>[PASTE DETAILS]</p>
        </div>
      </aside>
    ),
  },
  {
    title: "Refine the Draft",
    eyebrow: "Step 7",
    content: (
      <>
        <aside className="recommendations-prompt-card">
          <div className="recommendations-prompt-top">
            <div>
              <span>Copy + Paste Prompt</span>
              <h3>If it comes back too generic or robotic:</h3>
            </div>

            <small>AI Tool Ready</small>
          </div>

          <div className="recommendations-prompt-body">
            <p>
              Refine it: Rewrite this to sound more natural and human. Make it less generic and more specific. Remove anything overly formal or repetitive. Keep it realistic, like something a real person would actually write.
            </p>

            <p>[PASTE TEXT]</p>
          </div>
        </aside>

        <aside className="recommendations-note-card">
          <span>Send This Note</span>
          <h3>Once you have a solid draft, send it with a simple note:</h3>

          <p>
            "Hey, I am updating my LinkedIn and was wondering if you would be open to writing me a recommendation. Totally understand if you are busy. I drafted something to make it easier. Feel free to edit it however you want."
          </p>

          <p>Most people will appreciate that you did the work for them.</p>
        </aside>
      </>
    ),
  },
  {
    title: "Writing One for Someone Else",
    eyebrow: "Step 8",
    content: (
      <>
        <div className="recommendations-reading-card">
          <p>
            If someone asks you to write one for them, same idea. Use AI to get a strong starting point.
          </p>
        </div>

        <aside className="recommendations-prompt-card">
          <div className="recommendations-prompt-top">
            <div>
              <span>Copy + Paste Prompt</span>
              <h3>Writing for someone else:</h3>
            </div>

            <small>AI Tool Ready</small>
          </div>

          <div className="recommendations-prompt-body">
            <p>
              Write a LinkedIn recommendation for [PERSON] based on the details below. Highlight their strengths, what they are good at, and specific examples of their work. Keep it genuine, clear, and professional but not overly formal. 4 to 6 sentences max. Do not make anything up.
            </p>

            <p>[PASTE DETAILS]</p>
          </div>
        </aside>

        <aside className="recommendations-note-card">
          <span>Relationship Builder</span>
          <h3>Writing recommendations for others can also work in your favor.</h3>

          <p>
            Writing recommendations for others can also work in your favor. When you take the time to write one for someone, it often prompts them to return the favor without you even having to ask.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "Final Takeaway",
    eyebrow: "Step 9",
    content: (
      <aside className="recommendations-final-card">
        <span>Final Takeaway</span>
        <h3>Every strong signal matters.</h3>

        <p>
          Recommendations will not get you a job on their own, but they add credibility. Every strong signal on your profile makes it harder to scroll past. This is one of them.
        </p>
      </aside>
    ),
  },
];

export default function RecommendationsLesson() {
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
    <section className="recommendations-course">
      <div className="recommendations-topbar">
        <div>
          <span>Recommendations Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="recommendations-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="recommendations-layout">
        <aside className="recommendations-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "recommendations-step recommendations-step-active"
                  : "recommendations-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="recommendations-content">
          <div className="recommendations-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="recommendations-body">{currentStep.content}</div>

          <div className="recommendations-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/open-to-work"
                className="recommendations-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Open to Work</strong>
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
