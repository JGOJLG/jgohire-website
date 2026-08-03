"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./profile-photo.css";

const steps = [
  {
    title: "Why Your Photo Matters",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="profile-photo-image-placeholder">
          <div className="profile-photo-placeholder-icon" aria-hidden="true">
            ◉
          </div>

          <div>
            <strong>Profile Photo Example</strong>
            <p>Add your LinkedIn profile photo image here.</p>
          </div>
        </div>

        <div className="profile-photo-reading-card">
          <p>
            Your profile photo is the small circular image at the top of your LinkedIn page. It is the first thing anyone sees when they land on your profile, find you in a search, or receive a message from you. Before anyone reads a single word about your experience, they have already formed an impression based on your photo.
          </p>
        </div>

        <aside className="profile-photo-statement-card">
          <span>First Impression Rule</span>
          <p>Your photo speaks before your experience does.</p>
        </aside>
      </>
    ),
  },
  {
    title: "How to Add or Change It",
    eyebrow: "Step 2",
    content: (
      <section className="profile-photo-howto-card">
        <div className="profile-photo-howto-header">
          <span>How To Edit</span>
          <strong>Update your LinkedIn profile photo</strong>
        </div>

        <div className="profile-photo-howto-body">
          <div>
            <span>01</span>
            <p>Go to your LinkedIn profile.</p>
          </div>

          <div>
            <span>02</span>
            <p>
              Click on your current photo or the blank circle where your photo would appear.
            </p>
          </div>

          <div>
            <span>03</span>
            <p>Upload a new image.</p>
          </div>

          <div>
            <span>04</span>
            <p>Crop and adjust it before saving.</p>
          </div>
        </div>
      </section>
    ),
  },
  {
    title: "Do Not Use a Fully AI-Generated Photo",
    eyebrow: "Step 3",
    content: (
      <>
        <aside className="profile-photo-warning-card">
          <span>Common Mistake</span>
          <h3>Do Not Use a Fully AI-Generated Photo</h3>

          <p>I know, I just spent time telling you to use AI. Bear with me on this one.</p>

          <p>
            Do not use a fully AI-generated photo on your LinkedIn profile. For recruiters, it is an immediate red flag.
          </p>

          <p>
            There is a significant amount of fraudulent activity happening on LinkedIn right now. You are probably already seeing it on the job seeker side with fake postings and ghost jobs, but it exists on the recruiter side too. Fake profiles are everywhere. Some are built to scrape information. Others are used to apply to roles in bulk. And in some cases, someone will have an entirely different person interview on their behalf, and then show up as a completely different human being on their first day.
          </p>

          <p>
            A large number of those fraudulent profiles use AI-generated photos. Because of that, recruiters have become more skeptical, and when something looks slightly off about a photo, it registers. It creates the same hesitation as having no photo at all, using a cartoon or illustrated image, or uploading a cropped group shot where half of someone else's shoulder is still in the frame. It is not about dishonesty. It is simply not professional.
          </p>
        </aside>

        <aside className="profile-photo-tip-card">
          <span>Quick Tip</span>
          <p>
            Recruiters are trained to spot inconsistencies. An AI-generated photo is one of the fastest ways to lose credibility before anyone has even read your name.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "Using AI to Improve Your Profile Photo",
    eyebrow: "Step 4",
    content: (
      <>
        <div className="profile-photo-reading-card">
          <p>Where AI Can Actually Help</p>

          <p>
            AI can be useful for small enhancements. Clean up the background, improve the lighting, or make the image look a bit more polished. You can even adjust your outfit slightly.
          </p>

          <p>
            Just be careful. Sometimes AI alters your face and it no longer looks like you. That defeats the whole purpose.
          </p>
        </div>

        <div className="profile-photo-support-grid">
          <article>
            <span>01</span>
            <h3>Good Use of AI</h3>
            <p>
              Clean up the background, improve the lighting, or make the image look a bit more polished.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Be Careful</h3>
            <p>
              Sometimes AI alters your face and it no longer looks like you. That defeats the whole purpose.
            </p>
          </article>
        </div>
      </>
    ),
  },
  {
    title: "Prompt",
    eyebrow: "Step 5",
    content: (
      <aside className="profile-photo-prompt-card">
        <span>Prompt</span>
        <h3>Here is a prompt you can use:</h3>

        <div>
          Edit this image to make it look more professional for a LinkedIn profile photo. Do not change my face, facial features, skin tone, or expression in any way. My face must remain completely accurate and recognizable. Do not smooth my skin excessively or apply any beauty filters. Only make subtle, realistic enhancements. Clean up or replace the background with a neutral, professional setting such as a soft office or lightly blurred environment, similar to a clean headshot backdrop. Improve lighting so it looks natural and well-lit, like soft daylight, and adjust colors slightly to make the image look clean and polished while staying true to life. If adjusting clothing, keep it minimal and realistic so it still looks like something I would actually wear. The final result should look like a professional headshot, natural, not overly edited, and not AI-generated.
        </div>
      </aside>
    ),
  },
  {
    title: "The Best Option",
    eyebrow: "Step 6",
    content: (
      <>
        <div className="profile-photo-reading-card">
          <p>
            Go outside, use natural lighting, wear something you would actually wear to work, and have someone take the photo. Start with a real photo of you. From there, AI enhancements are fair game. It does not need to be perfect. It just needs to look like you.
          </p>
        </div>

        <aside className="profile-photo-final-card">
          <span>Final Takeaway</span>
          <h3>Use a real photo of you.</h3>
          <p>Whatever you do, do not use a fully AI-generated photo.</p>
        </aside>
      </>
    ),
  },
];

export default function ProfilePhotoLesson() {
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
    <section className="profile-photo-course">
      <div className="profile-photo-topbar">
        <div>
          <span>Profile Photo Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="profile-photo-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="profile-photo-layout">
        <aside className="profile-photo-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "profile-photo-step profile-photo-step-active"
                  : "profile-photo-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="profile-photo-content">
          <div className="profile-photo-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="profile-photo-body">{currentStep.content}</div>

          <div className="profile-photo-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/banner-photo"
                className="profile-photo-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Banner Photo</strong>
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
