"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./banner-photo.css";

const steps = [
  {
    title: "Why Your Banner Matters",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="banner-photo-image-placeholder">
          <div className="banner-photo-placeholder-art" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div>
            <strong>Banner Photo Example</strong>
            <p>Add your LinkedIn banner image here.</p>
          </div>
        </div>

        <div className="banner-photo-reading-card">
          <p>
            Your banner photo is the large horizontal image at the top of your LinkedIn profile, sitting behind your profile photo. Most people leave it blank or never think about it. That is a missed opportunity. It takes minimal effort and instantly makes your profile look more complete and intentional.
          </p>
        </div>

        <aside className="banner-photo-statement-card">
          <span>Profile Polish</span>
          <p>Blank space is a missed opportunity.</p>
        </aside>
      </>
    ),
  },
  {
    title: "How to Add or Change It",
    eyebrow: "Step 2",
    content: (
      <>
        <section className="banner-photo-howto-card">
          <div className="banner-photo-howto-header">
            <span>How To Edit</span>
            <strong>Update your LinkedIn banner photo</strong>
          </div>

          <div className="banner-photo-howto-body">
            <div>
              <span>01</span>
              <p>Go to your profile.</p>
            </div>

            <div>
              <span>02</span>
              <p>Click the pencil icon in the top right corner of the banner area.</p>
            </div>

            <div>
              <span>03</span>
              <p>Upload an image.</p>
            </div>
          </div>
        </section>

        <aside className="banner-photo-tip-card">
          <span>Quick Tip</span>
          <p>
            The correct size is 1584 x 396 pixels. If you are using Canva, just search "LinkedIn banner" and it will already be sized correctly.
          </p>
        </aside>

        <aside className="banner-photo-tip-card">
          <span>Important</span>
          <p>
            One thing to keep in mind: LinkedIn crops the banner slightly depending on the screen, even when you use the correct dimensions. Keep anything important centered so it does not get cut off.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "Do You Need AI for This?",
    eyebrow: "Step 3",
    content: (
      <aside className="banner-photo-tool-card">
        <span>Tool Choice</span>
        <h3>Do You Need AI for This?</h3>

        <p>
          Not necessarily. A free Canva account works perfectly for this. Search "LinkedIn banner," pick a pre-sized template, swap in your colors or a clean image, and you are done. You can also use one of the default options LinkedIn provides, which is always better than leaving it blank.
        </p>

        <p>
          AI is useful if you want something more specific or customized, which is what the prompts below are for.
        </p>
      </aside>
    ),
  },
  {
    title: "Corporate and Minimal Prompts",
    eyebrow: "Step 4",
    content: (
      <>
        <div className="banner-photo-reading-card">
          <p>Examples by Scenario</p>

          <p>
            If you want to use AI for your banner, here are prompts based on your situation. Copy the one that fits, fill in any blanks, and adjust from there.
          </p>
        </div>

        <div className="banner-photo-prompt-grid">
          <article className="banner-photo-prompt-card">
            <span>Prompt</span>
            <h3>Corporate roles</h3>
            <p>
              Create a clean, professional LinkedIn banner featuring a modern [city] skyline. Keep the design minimal with soft lighting and neutral tones. No text. Should feel polished and corporate without being too busy. The image must be exactly 1584 x 396 pixels. Please size correctly.
            </p>
          </article>

          <article className="banner-photo-prompt-card">
            <span>Prompt</span>
            <h3>Minimal and safe</h3>
            <p>
              Create a simple LinkedIn banner with a clean, neutral background, soft gradients, and subtle texture. Use muted colors like light gray, beige, or soft blue. Keep it minimal, modern, and not distracting. The image must be exactly 1584 x 396 pixels. Please size correctly.
            </p>
          </article>

          <article className="banner-photo-prompt-card">
            <span>Prompt</span>
            <h3>Office and professional aesthetic</h3>
            <p>
              Create a LinkedIn banner showing a clean, modern workspace or office setting. Bright natural lighting, minimal desk setup, neutral tones, and a professional feel. No people in the image. The image must be exactly 1584 x 396 pixels. Please size correctly.
            </p>
          </article>
        </div>
      </>
    ),
  },
  {
    title: "Creative and Business Prompts",
    eyebrow: "Step 5",
    content: (
      <div className="banner-photo-prompt-grid">
        <article className="banner-photo-prompt-card">
          <span>Prompt</span>
          <h3>Creative roles</h3>
          <p>
            Create a modern LinkedIn banner with a clean but slightly creative design. Use soft color accents, subtle shapes, and a minimal layout. It should feel polished but show some personality without being overwhelming. My industry is ___, I specialize in ___, and I want to promote ___. The image must be exactly 1584 x 396 pixels. Please size correctly.
          </p>
        </article>

        <article className="banner-photo-prompt-card">
          <span>Prompt</span>
          <h3>Freelancer or business owner</h3>
          <p>
            Create a clean LinkedIn banner with a minimal background and neutral tones. Leave space in the center to add a name, title, and contact information. Keep it simple, professional, and easy to read. The image must be exactly 1584 x 396 pixels. Please size correctly.
          </p>
        </article>
      </div>
    ),
  },
  {
    title: "Industry-Specific Prompts",
    eyebrow: "Step 6",
    content: (
      <div className="banner-photo-prompt-grid">
        <article className="banner-photo-prompt-card">
          <span>Prompt</span>
          <h3>Tech and engineering roles</h3>
          <p>
            Create a clean, modern LinkedIn banner with a minimal tech-inspired aesthetic. Think subtle circuit patterns, soft gradients, or a clean dark background with light accents. No text. Should feel current and professional without being overdone. The image must be exactly 1584 x 396 pixels. Please size correctly.
          </p>
        </article>

        <article className="banner-photo-prompt-card">
          <span>Prompt</span>
          <h3>Healthcare and wellness roles</h3>
          <p>
            Create a calm, professional LinkedIn banner with soft, clean tones. Think light blues, greens, or neutrals. Minimal design, no text, and a feel that is approachable and trustworthy. The image must be exactly 1584 x 396 pixels. Please size correctly.
          </p>
        </article>
      </div>
    ),
  },
  {
    title: "Final Takeaway",
    eyebrow: "Step 7",
    content: (
      <aside className="banner-photo-final-card">
        <span>Final Takeaway</span>
        <h3>Clean and simple wins every time.</h3>
        <p>
          Your banner does not need to be perfect. It just needs to look intentional. One good image or a clean graphic is all it takes.
        </p>
      </aside>
    ),
  },
];

export default function BannerPhotoLesson() {
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
    <section className="banner-photo-course">
      <div className="banner-photo-topbar">
        <div>
          <span>Banner Photo Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="banner-photo-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="banner-photo-layout">
        <aside className="banner-photo-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "banner-photo-step banner-photo-step-active"
                  : "banner-photo-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="banner-photo-content">
          <div className="banner-photo-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="banner-photo-body">{currentStep.content}</div>

          <div className="banner-photo-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/headline"
                className="banner-photo-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Headline</strong>
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
