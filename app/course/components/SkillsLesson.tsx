"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import "./skills.css";

const steps = [
  {
    title: "Why Skills Matter",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="skills-image">
          <Image
            src="/course/skills.png"
            alt="LinkedIn Skills section example"
            width={1200}
            height={675}
            priority
          />
        </div>

        <div className="skills-reading-card">
          <p>
            Your skills section is a list of specific abilities, tools, and areas of expertise that show up on your profile and help recruiters find you in searches.
          </p>
        </div>

        <aside className="skills-statement-card">
          <span>Skills Rule</span>
          <p>If recruiters can't find the skill, they can't find you.</p>
        </aside>
      </>
    ),
  },
  {
    title: "How to Edit the Skills Section",
    eyebrow: "Step 2",
    content: (
      <section className="skills-howto-card">
        <div className="skills-howto-header">
          <span>How To Edit</span>
          <strong>Update your LinkedIn skills section</strong>
        </div>

        <div className="skills-howto-body">
          <div>
            <span>01</span>
            <p>Click the pencil icon next to the Skills section and search for skills to add them one by one.</p>
          </div>
        </div>
      </section>
    ),
  },
  {
    title: "How Recruiters Use This Section",
    eyebrow: "Step 3",
    content: (
      <>
        <div className="skills-reading-card">
          <p>This section is about being intentional.</p>

          <p>
            Recruiters search by skills constantly. If a skill is not on your profile, you may not show up. That said, skills are not only pulled from this section. If a keyword appears anywhere on your profile, in your experience or About section for example, you can still show up in that search.
          </p>

          <p>
            Here is where most people get it wrong. If you list a skill here but never show how you used it in your experience, it raises questions. And if you mention a skill in your experience but leave it out of this section, you are missing an opportunity to be found.
          </p>

          <p>
            Your profile should connect. The skills you list here should be backed up by what is in your experience.
          </p>
        </div>

        <aside className="skills-tip-card">
          <span>Quick Tip</span>
          <p>Only include skills you can actually speak to. If it comes up in an interview, you need to be able to back it up.</p>
        </aside>

        <aside className="skills-tip-card">
          <span>Quick Tip</span>
          <p>
            The skills on your profile should appear throughout your profile. If a skill is important enough to list, it should also show up in your Experience or About section.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "What to Include",
    eyebrow: "Step 4",
    content: (
      <>
        <div className="skills-reading-card">
          <p>
            Focus on skills that align with the roles you are targeting. Aim for 10 to 15 strong, relevant skills. You do not need 50. Quality over quantity always wins.
          </p>

          <p>
            Your top 3 skills are the most important. LinkedIn displays these first, so make sure they are your strongest and most relevant. You can reorder them by clicking the pencil icon and dragging them into place.
          </p>
        </div>

        <div className="skills-value-grid">
          <article>
            <span>01</span>
            <h3>Align With Target Roles</h3>
            <p>Focus on skills that align with the roles you are targeting.</p>
          </article>

          <article>
            <span>02</span>
            <h3>10 to 15 Strong Skills</h3>
            <p>Aim for 10 to 15 strong, relevant skills. You do not need 50.</p>
          </article>

          <article>
            <span>03</span>
            <h3>Top 3 Skills</h3>
            <p>LinkedIn displays these first, so make sure they are your strongest and most relevant.</p>
          </article>
        </div>
      </>
    ),
  },
  {
    title: "Find the Right Skills",
    eyebrow: "Step 5",
    content: (
      <>
        <div className="skills-reading-card">
          <p>If you are not sure what to include, use AI to help you think it through.</p>
        </div>

        <aside className="skills-prompt-card">
          <div className="skills-prompt-top">
            <div>
              <span>Copy + Paste Prompt</span>
              <h3>Find the right skills.</h3>
            </div>

            <small>AI Tool Ready</small>
          </div>

          <div className="skills-prompt-body">
            <p>
              Based on my background and the roles I am targeting in [INSERT ROLES AND INDUSTRY], what skills should I list on my LinkedIn profile? Focus on relevant, commonly searched skills that recruiters would look for. Do not include anything unnecessary. Only suggest skills that align with my experience.
            </p>

            <p>[PASTE EXPERIENCE]</p>
          </div>
        </aside>
      </>
    ),
  },
  {
    title: "Skills Support Your Story",
    eyebrow: "Step 6",
    content: (
      <aside className="skills-final-card">
        <span>Final Takeaway</span>
        <h3>Skills support your story.</h3>
        <p>
          Once you have the list, compare it to your actual experience and only keep what you can genuinely speak to. Whatever skills you list on LinkedIn should also be on your resume.
        </p>
      </aside>
    ),
  },
  {
    title: "Endorsements",
    eyebrow: "Step 7",
    content: (
      <>
        <div className="skills-image">
          <Image
            src="/course/endorsements.png"
            alt="LinkedIn Endorsements example"
            width={1200}
            height={675}
            priority
          />
        </div>

        <aside className="skills-statement-card">
          <span>Endorsements Rule</span>
          <p>Endorsements help validate your skills because other people are confirming them, not just you.</p>
        </aside>

        <div className="skills-reading-card">
          <p>Endorsements are one of the most overlooked parts of this section.</p>

          <p>
            An endorsement is when someone in your network confirms that you have a specific skill. It shows up as a number next to each skill and adds credibility because it is not just you claiming it. Other people are backing it up.
          </p>

          <p>To get endorsed, reach out to former coworkers, classmates, or managers and ask. Most people are happy to do it.</p>

          <p>
            You should also endorse others. Go to someone's profile, scroll to their skills section, and click endorse next to any skill you know they genuinely have. LinkedIn often notifies them and many will return the favor.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Why Endorsements Matter",
    eyebrow: "Step 8",
    content: (
      <>
        <div className="skills-value-grid">
          <article>
            <span>01</span>
            <h3>Ask Former Colleagues</h3>
            <p>Reach out to former coworkers, classmates, managers, or clients who can genuinely speak to your skills.</p>
          </article>

          <article>
            <span>02</span>
            <h3>Focus on Relevant Skills</h3>
            <p>Prioritize endorsements for the skills most important to the roles you want next.</p>
          </article>

          <article>
            <span>03</span>
            <h3>Give to Receive</h3>
            <p>Endorsing others often encourages them to visit your profile and return the favor.</p>
          </article>
        </div>

        <aside className="skills-tip-card">
          <span>Quick Tip</span>
          <p>
            Endorsements and recommendations are not the same thing. Endorsements are tied to specific skills. Recommendations are written statements about you as a professional. We will cover recommendations later in this guide.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "Final Takeaway",
    eyebrow: "Step 9",
    content: (
      <aside className="skills-final-card">
        <span>Final Takeaway</span>
        <h3>Make your profile work together.</h3>
        <p>
          Your skills section is one piece of a larger puzzle. It will not get you a job on its own, but it adds context and it helps you show up. Your skills, experience, and headline all work together. Make sure they are aligned, telling the same story, and allow you to show up in the proper searches.
        </p>
      </aside>
    ),
  },
];

export default function SkillsLesson() {
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
    <section className="skills-course">
      <div className="skills-topbar">
        <div>
          <span>Skills Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="skills-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="skills-layout">
        <aside className="skills-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={`${step.title}-${index}`}
              className={
                index === activeStep
                  ? "skills-step skills-step-active"
                  : "skills-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="skills-content">
          <div className="skills-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="skills-body">{currentStep.content}</div>

          <div className="skills-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/recommendations"
                className="skills-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Recommendations</strong>
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
