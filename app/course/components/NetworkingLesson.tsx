"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./networking.css";

const steps = [
  {
    title: "LinkedIn Is a Network",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="networking-reading-card">
          <p>
            LinkedIn is not just a place to upload your experience. It is a network, and everything you do on it can be seen by other people. When you like, comment on, or engage with a post, that activity can show up in your connections' feeds. That means people who follow you can see what you are interacting with, even if they have no connection to the person who originally posted it.
          </p>

          <p>
            That is what makes LinkedIn different from just having a resume online.
          </p>

          <p>
            You do not need to be posting every day to stay visible. Even small actions, a like, a comment, a share, can put your name in front of people who matter. The algorithm rewards activity, and consistency over time builds a presence that works in your favor without you having to think much about it.
          </p>
        </div>

        <aside className="networking-statement-card">
          <span>Visibility Rule</span>
          <p>Small actions can put your name in front of people who matter.</p>
        </aside>
      </>
    ),
  },
  {
    title: "Understanding Connections",
    eyebrow: "Step 2",
    content: (
      <>
        <div className="networking-reading-card">
          <p>
            LinkedIn organizes your network into degrees, and knowing the difference changes how you think about the platform.
          </p>
        </div>

        <div className="networking-connection-grid">
          <article className="networking-connection-card">
            <strong>1st</strong>
            <h3>First Degree Connections</h3>
            <p>
              First degree connections are people you are directly connected with. These are the people you can message freely, and they are the most likely to see your activity.
            </p>
          </article>

          <article className="networking-connection-card">
            <strong>2nd</strong>
            <h3>Second Degree Connections</h3>
            <p>
              Second degree connections are people connected to your first degree connections. This is where things start to expand. When you engage with content, your activity can reach into this group.
            </p>
          </article>

          <article className="networking-connection-card">
            <strong>3rd</strong>
            <h3>Third Degree Connections</h3>
            <p>
              Third degree connections are outside your immediate network. You cannot message them directly, but if your second degree connections engage with your activity, that interaction can push your name into their network too.
            </p>
          </article>
        </div>

        <aside className="networking-highlight-card">
          <span>Network Effect</span>
          <p>
            The bigger and more engaged your network is, the further your presence travels.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "Why This Matters",
    eyebrow: "Step 3",
    content: (
      <div className="networking-reading-card">
        <p>
          LinkedIn is designed to show people content and profiles that are connected to them in some way. If you are completely inactive, you are limiting your visibility. If you are engaging, even in small ways, you are increasing the chances that recruiters come across your profile, hiring managers see your name, and other professionals in your space may start to recognize you.
        </p>

        <p>It all builds over time.</p>
      </div>
    ),
  },
  {
    title: "How the Algorithm Works",
    eyebrow: "Step 4",
    content: (
      <>
        <div className="networking-algorithm-grid">
          <article className="networking-algorithm-card">
            <span>01</span>
            <h3>You Engage</h3>
            <p>
              When you like or comment on something, LinkedIn may show that activity to your network.
            </p>
          </article>

          <article className="networking-algorithm-card">
            <span>02</span>
            <h3>Your Network Sees It</h3>
            <p>
              If your connections then engage with it, it continues to spread.
            </p>
          </article>

          <article className="networking-algorithm-card">
            <span>03</span>
            <h3>It Spreads</h3>
            <p>
              It is not random. It is based on connections, relevance, and engagement.
            </p>
          </article>

          <article className="networking-algorithm-card">
            <span>04</span>
            <h3>Visibility Grows</h3>
            <p>
              Once you understand that, you can use it to your advantage.
            </p>
          </article>
        </div>

        <div className="networking-reading-card">
          <p>
            LinkedIn rewards activity. The more you engage, the more visible you become. When you like or comment on something, LinkedIn may show that activity to your network. If your connections then engage with it, it continues to spread. It is not random. It is based on connections, relevance, and engagement.
          </p>

          <p>
            This is why you sometimes see posts liked by people you know, even if you have never heard of the person who posted them. That is the algorithm doing exactly what it is designed to do, and once you understand that, you can use it to your advantage.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "The Takeaway",
    eyebrow: "Step 5",
    content: (
      <aside className="networking-final-card">
        <span>The Takeaway</span>
        <h3>Small actions add up.</h3>
        <p>
          You do not need to overthink this. Stay active, engage with content in your field, and connect with people in your industry. Small actions add up, and the more visible you are, the more opportunities you create.
        </p>
      </aside>
    ),
  },
];

export default function NetworkingLesson() {
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
    <section className="networking-course">
      <div className="networking-topbar">
        <div>
          <span>Networking Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="networking-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="networking-layout">
        <aside className="networking-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "networking-step networking-step-active"
                  : "networking-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="networking-content">
          <div className="networking-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="networking-body">{currentStep.content}</div>

          <div className="networking-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/profile-photo"
                className="networking-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Profile Photo</strong>
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
