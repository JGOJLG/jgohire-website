"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./certifications-projects-publications.css";

const steps = [
  {
    title: "Why These Sections Matter",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="cpp-image-placeholder">
          <div className="cpp-placeholder-layout" aria-hidden="true">
            <article>
              <span />
              <span />
              <span />
            </article>
            <article>
              <span />
              <span />
              <span />
            </article>
            <article>
              <span />
              <span />
              <span />
            </article>
          </div>

          <div>
            <strong>Additional Sections Example</strong>
            <p>Add your LinkedIn Certifications, Projects, and Publications screenshot here.</p>
          </div>
        </div>

        <div className="cpp-reading-card">
          <p>
            These sections are not required for everyone, but they can add credibility when they actually make sense. Certifications can validate your skills. Projects can show real work you have done. Publications can build authority in your field.
          </p>
        </div>

        <aside className="cpp-statement-card">
          <span>Additional Sections Rule</span>
          <p>Only include what actually makes sense for you.</p>
        </aside>
      </>
    ),
  },
  {
    title: "Certifications",
    eyebrow: "Step 2",
    content: (
      <>
        <div className="cpp-reading-card">
          <p>
            Your certifications section is where you list any official credentials, licenses, or completed programs relevant to your field. Click "Add Section" on your profile and select certifications to add it.
          </p>

          <p>
            Certifications matter. Recruiters look for them and in some fields they are required. Even when they are not required, they validate the skills you are already claiming to have on your profile.
          </p>

          <p>
            If you are in finance, real estate, healthcare, tech, or any field where certifications are common, make sure yours are listed.
          </p>

          <p>
            Include the name of the certification, the issuing organization, the date you received it, and the expiration date if applicable. Keep it accurate. Do not list things that are not real certifications just to fill space.
          </p>
        </div>

        <section className="cpp-howto-card">
          <div className="cpp-howto-header">
            <span>How To Edit</span>
            <strong>Add certifications to your LinkedIn profile</strong>
          </div>

          <div className="cpp-howto-body">
            <div>
              <span>01</span>
              <p>Click "Add Section" on your profile.</p>
            </div>

            <div>
              <span>02</span>
              <p>Select certifications to add it.</p>
            </div>

            <div>
              <span>03</span>
              <p>
                Include the name of the certification, the issuing organization, the date you received it, and the expiration date if applicable.
              </p>
            </div>
          </div>
        </section>

        <div className="cpp-value-grid">
          <article>
            <span>01</span>
            <h3>Validate Your Skills</h3>
            <p>
              Even when they are not required, they validate the skills you are already claiming to have on your profile.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>List Relevant Fields</h3>
            <p>
              If you are in finance, real estate, healthcare, tech, or any field where certifications are common, make sure yours are listed.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Keep It Accurate</h3>
            <p>Do not list things that are not real certifications just to fill space.</p>
          </article>
        </div>

        <aside className="cpp-tip-card">
          <span>Quick Tip</span>
          <p>
            Include the name of the certification, the issuing organization, the date you received it, and the expiration date if applicable.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "Certification Prompt",
    eyebrow: "Step 3",
    content: (
      <aside className="cpp-prompt-card">
        <div className="cpp-prompt-top">
          <div>
            <span>Copy + Paste Prompt</span>
            <h3>Find relevant certifications.</h3>
          </div>

          <small>AI Tool Ready</small>
        </div>

        <div className="cpp-prompt-body">
          <p>
            Based on my background and the roles I am targeting in [INSERT ROLES AND INDUSTRY], what certifications are worth listing on my LinkedIn profile? Only suggest relevant and recognized certifications that would add real value or help with recruiter searches. Do not suggest anything unnecessary. If certifications are not important for my background or goals, tell me that directly.
          </p>

          <p>[PASTE EXPERIENCE]</p>
        </div>
      </aside>
    ),
  },
  {
    title: "Projects",
    eyebrow: "Step 4",
    content: (
      <>
        <div className="cpp-reading-card">
          <p>
            Your projects section is where you can showcase specific work you have done outside of or alongside your regular jobs. It is a great place to demonstrate real skills, especially if your experience section does not fully capture everything you are capable of.
          </p>
        </div>

        <section className="cpp-howto-card">
          <div className="cpp-howto-header">
            <span>How To Edit</span>
            <strong>Add projects to your LinkedIn profile</strong>
          </div>

          <div className="cpp-howto-body">
            <div>
              <span>01</span>
              <p>To add it, click "Add Section" and select projects.</p>
            </div>

            <div>
              <span>02</span>
              <p>
                You can also link a project to a current or past position if it was done as part of that role.
              </p>
            </div>
          </div>
        </section>

        <aside className="cpp-statement-card">
          <span>Project Rule</span>
          <p>This section is a major advantage for some people and less relevant for others.</p>
        </aside>

        <div className="cpp-reading-card">
          <p>
            If you are in tech, data, product, or design, or if you are early in your career, projects can set you apart. This is where you show what you have actually built or worked on, even if it was not part of a full time job.
          </p>

          <p>
            Coding projects, dashboards, case studies, freelance work, and relevant school projects all count. Do not just list the project name. Explain it. What was it, what did you do, what tools did you use, and what was the outcome. Think of it like an experience bullet but slightly more flexible.
          </p>

          <p>
            If you have links like a GitHub profile or a portfolio, include them. This section lets you show your work, not just describe it.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Project Prompt",
    eyebrow: "Step 5",
    content: (
      <aside className="cpp-prompt-card">
        <div className="cpp-prompt-top">
          <div>
            <span>Copy + Paste Prompt</span>
            <h3>Rewrite your project description.</h3>
          </div>

          <small>AI Tool Ready</small>
        </div>

        <div className="cpp-prompt-body">
          <p>
            Rewrite this project description for my LinkedIn profile. Clearly explain what the project was, what I did, the tools or technologies I used, and the outcome. Keep it concise and easy to read. Use clear, simple language and avoid anything generic or corporate. Do not make anything up.
          </p>

          <p>[PASTE PROJECT DETAILS]</p>
        </div>
      </aside>
    ),
  },
  {
    title: "Publications",
    eyebrow: "Step 6",
    content: (
      <div className="cpp-reading-card">
        <p>
          Your publications section is where you can list any written work published under your name. Click "Add Section" and select publications to add it.
        </p>

        <p>
          This one is more niche, but if you have it, include it. Articles, blogs, research papers, anything published under your name counts. Include the title, where it was published, and a link if you have one. If you are trying to build credibility in your field, this section can quietly do a lot of work for you.
        </p>

        <p>If you do not have anything here, do not worry about it. Not everyone will.</p>
      </div>
    ),
  },
  {
    title: "Publication Prompt",
    eyebrow: "Step 7",
    content: (
      <aside className="cpp-prompt-card">
        <div className="cpp-prompt-top">
          <div>
            <span>Copy + Paste Prompt</span>
            <h3>Write your publication summary.</h3>
          </div>

          <small>AI Tool Ready</small>
        </div>

        <div className="cpp-prompt-body">
          <p>
            Write a short, clear summary of this publication for my LinkedIn profile. Explain what it is about in simple terms and highlight the key topic or takeaway. Keep it one to two sentences, easy to read, and avoid overly formal language. Do not make anything up.
          </p>

          <p>[PASTE TEXT OR LINK]</p>
        </div>
      </aside>
    ),
  },
  {
    title: "Final Takeaway",
    eyebrow: "Step 8",
    content: (
      <aside className="cpp-final-card">
        <span>Final Takeaway</span>
        <h3>Only include what actually makes sense for you.</h3>

        <p>
          Only include what actually makes sense for you. Not every section needs to be filled out. A clean and relevant profile will always beat a cluttered one trying to do too much. If you are in tech or early in your career, prioritize projects. If you are in a certification heavy field, prioritize certifications. If you have publications, great. If not, move on.
        </p>
      </aside>
    ),
  },
];

export default function CertificationsProjectsPublicationsLesson() {
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
    <section className="cpp-course">
      <div className="cpp-topbar">
        <div>
          <span>Additional Sections Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="cpp-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="cpp-layout">
        <aside className="cpp-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "cpp-step cpp-step-active"
                  : "cpp-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="cpp-content">
          <div className="cpp-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="cpp-body">{currentStep.content}</div>

          <div className="cpp-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/skills"
                className="cpp-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Skills</strong>
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
