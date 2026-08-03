"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./about-author.css";

const steps = [
  {
    title: "Meet Jen",
    eyebrow: "Step 1",
    content: (
      <div className="about-step-card">
        <p>
          Jen Gordon is a Certified Career Coach and agency recruiter with over 10 years of experience on both sides of the hiring process, hiring as well as helping candidates get hired.
        </p>

        <p>
          She holds a certification in career coaching using NLP techniques, which means the strategies in this guide are not just based on recruiting experience. They are rooted in how people actually think, communicate, and present themselves, and how to make that work in your favor.
        </p>
      </div>
    ),
  },
  {
    title: "Experience at a Glance",
    eyebrow: "Step 2",
    content: (
      <>
        <div className="about-stat-grid">
          <article className="about-stat-card">
            <strong>10+</strong>
            <p>Years on both sides of the hiring process</p>
          </article>

          <article className="about-stat-card">
            <strong>1000s</strong>
            <p>Of candidates interviewed and placed</p>
          </article>

          <article className="about-stat-card">
            <strong>
              Fortune
              <br />
              100
            </strong>
            <p>To startups, all company sizes, all industries</p>
          </article>
        </div>

        <div className="about-step-card">
          <p>
            On the recruiting side, Jen has partnered with companies ranging from Fortune 100 organizations to high growth startups and small businesses, supporting searches across multiple industries and functions, from entry level roles to executive leadership.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "What Sets This Guide Apart",
    eyebrow: "Step 3",
    content: (
      <aside className="about-dark-card">
        <h3>What sets this guide apart.</h3>
        <p>
          The advice in this guide is not based on theory. It is based on thousands of conversations with candidates, hiring managers, and executives, along with years of reviewing resumes, conducting interviews, negotiating offers, and helping people navigate the job market from both sides.
        </p>
      </aside>
    ),
  },
  {
    title: "Experience That Shapes the Strategy",
    eyebrow: "Step 4",
    content: (
      <div className="about-cred-grid">
        <article className="about-cred-card">
          <span>01</span>
          <h3>Industry Recognition</h3>
          <p>Recognized with industry awards throughout her recruiting career</p>
        </article>

        <article className="about-cred-card">
          <span>02</span>
          <h3>Recruiting Panels</h3>
          <p>Invited to speak on recruiting panels</p>
        </article>

        <article className="about-cred-card">
          <span>03</span>
          <h3>Talent Strategy</h3>
          <p>Selected for special projects focused on talent strategy and hiring best practices</p>
        </article>

        <article className="about-cred-card">
          <span>04</span>
          <h3>Candidate Experience</h3>
          <p>Consulted with organizations on improving their recruiting processes and candidate experience</p>
        </article>
      </div>
    ),
  },
  {
    title: "Why JGO Hire Exists",
    eyebrow: "Step 5",
    content: (
      <section className="about-final-card">
        <span>Why JGO Hire Exists</span>
        <p>
          She created JGO Hire to give job seekers access to the same insight that most people only get if they happen to know someone in recruiting. Now you do. She is here for you, for every step of the job search, and everything in between.
        </p>
      </section>
    ),
  },
];

export default function AboutAuthorLesson() {
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
    <section className="about-course">
      <div className="about-course-topbar">
        <div>
          <span>About the Author Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="about-course-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="about-course-layout">
        <aside className="about-course-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "about-course-step about-course-step-active"
                  : "about-course-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="about-course-content">
          <div className="about-course-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="about-course-body">{currentStep.content}</div>

          <div className="about-course-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/mindset"
                className="about-course-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Mindset</strong>
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
