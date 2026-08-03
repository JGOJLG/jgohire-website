"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./experience.css";

const steps = [
  {
    title: "Why Experience Matters",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="experience-image-placeholder">
          <div className="experience-placeholder-card" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div>
            <strong>Experience Section Example</strong>
            <p>Add your LinkedIn Experience section screenshot here.</p>
          </div>
        </div>

        <div className="experience-reading-card">
          <p>
            Your experience section is where you list your work history, including job titles, companies, and what you did in each role. It sits below your About section and is usually one of the first things a recruiter looks at after your headline.
          </p>
        </div>

        <aside className="experience-statement-card">
          <span>Experience Rule</span>
          <p>If someone has to read it twice to figure out what you did, it needs more work.</p>
        </aside>
      </>
    ),
  },
  {
    title: "How to Edit the Experience Section",
    eyebrow: "Step 2",
    content: (
      <>
        <section className="experience-howto-card">
          <div className="experience-howto-header">
            <span>How To Edit</span>
            <strong>Update your LinkedIn experience section</strong>
          </div>

          <div className="experience-howto-body">
            <div>
              <span>01</span>
              <p>Click the pencil icon next to the Experience section or hit the plus sign to add a new role.</p>
            </div>

            <div>
              <span>02</span>
              <p>You will fill in your title, company name, employment type, dates, and a description of what you did.</p>
            </div>

            <div>
              <span>03</span>
              <p>LinkedIn automatically displays roles in reverse chronological order so your most recent position appears first. If it does not, you can reorder the jobs.</p>
            </div>

            <div>
              <span>04</span>
              <p>Double check your dates carefully. If anything looks off or does not match your resume, it creates doubt immediately.</p>
            </div>
          </div>
        </section>

        <aside className="experience-tip-card">
          <span>Quick Tip</span>
          <p>
            Before you start editing, turn off the “Notify Network” or "Share profile changes" toggle. LinkedIn typically only notifies your network if you add a new role, not if you update a description, but it is worth turning off just to be safe. If you are in a confidential job search, that notification is the last thing you want your current employer to see. It is a small step most people skip and it can create a very uncomfortable situation at work. Turn it off first.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "Your Experience Section",
    eyebrow: "Step 3",
    content: (
      <>
        <div className="experience-reading-card">
          <p>
            Your LinkedIn should mostly match your resume. Titles, companies, dates, all of it. Consistency matters. If something looks off between the two, a recruiter will notice and it raises questions you do not want to answer.
          </p>

          <p>
            I say mostly because many people tailor their resume for specific jobs. That is normal and expected. It is just not practical to update your LinkedIn every single time you apply. Your LinkedIn should stay more general, but that does not mean vague.
          </p>

          <p>
            What matters most is that your profile includes the right keywords. Recruiters search using specific titles, skills, tools, and industries. If those words are not on your profile, you will not show up. Even if you are a perfect fit for a role, you will be invisible if your profile does not match the search.
          </p>
        </div>

        <div className="experience-focus-grid">
          <article>
            <span>01</span>
            <h3>Match Your Resume</h3>
            <p>Titles, companies, dates, all of it. Consistency matters.</p>
          </article>

          <article>
            <span>02</span>
            <h3>Stay General, Not Vague</h3>
            <p>Your LinkedIn should stay more general, but that does not mean vague.</p>
          </article>

          <article>
            <span>03</span>
            <h3>Use the Right Keywords</h3>
            <p>Recruiters search using specific titles, skills, tools, and industries.</p>
          </article>
        </div>
      </>
    ),
  },
  {
    title: "Keep It Clean and Consistent",
    eyebrow: "Step 4",
    content: (
      <>
        <div className="experience-reading-card">
          <p>
            Keep your formatting consistent across every role. If you use bullet points for one job, use them for all. If you write in short paragraphs, do that across the board. Mixing formats makes your profile look unfinished.
          </p>

          <p>
            LinkedIn does not have a built-in bullet point feature. If you want to use them, Google "bullet points to copy and paste". Pick a simple one, copy it, and paste it directly into your description. Be sure to keep it consistent across all jobs.
          </p>
        </div>

        <aside className="experience-resource-card">
          <span>Formatting Resource</span>
          <h3>Need a clean bullet symbol?</h3>
          <p>Use one simple bullet symbol and keep it consistent across every role.</p>
          <a
            href="https://symbolsdb.com/bullet-point-symbol"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bullet Point Symbols ← Click Here
          </a>
        </aside>
      </>
    ),
  },
  {
    title: "What to Include",
    eyebrow: "Step 5",
    content: (
      <>
        <div className="experience-reading-card">
          <p>
            You do not need to list everything you did. Focus on three things: what you worked on, what tools you used, and what the outcome was. If you can include numbers, do it. It makes your experience feel specific and real.
          </p>
        </div>

        <div className="experience-impact-grid">
          <article>
            <h3>What You Worked On</h3>
            <p>Focus on the actual projects, responsibilities, or work you owned.</p>
          </article>

          <article>
            <h3>Tools You Used</h3>
            <p>Mention relevant systems, tools, platforms, or technical skills.</p>
          </article>

          <article>
            <h3>The Outcome</h3>
            <p>If you can include numbers, do it. It makes your experience feel specific and real.</p>
          </article>
        </div>

        <aside className="experience-compare-card">
          <span>Before / After</span>
          <h3>Same experience. Completely different impact.</h3>

          <div>
            <article>
              <strong>Instead of:</strong>
              <p>"Responsible for reporting in SQL"</p>
            </article>

            <article>
              <strong>Write:</strong>
              <p>"Built weekly reports using SQL to track performance and support team decisions"</p>
            </article>
          </div>
        </aside>
      </>
    ),
  },
  {
    title: "Gaps in Your Experience",
    eyebrow: "Step 6",
    content: (
      <aside className="experience-dark-card">
        <span>Career Breaks</span>
        <h3>Gaps in Your Experience</h3>

        <p>
          If you have gaps, do not panic. You do not need to hide them or fabricate something to fill them in. Whether you were caregiving, freelancing, job searching, or simply taking time for personal reasons, LinkedIn has a Career Break section you can use to acknowledge it honestly.
        </p>

        <p>
          Recruiters are not always automatically turned off by gaps, but they will immediately look for an explanation. Think about how many people were displaced during COVID, took time to care for a family member, or stepped back to handle something personal. Most gaps are completely explainable. What raises a flag is when there is no context at all, because it can feel like something is being hidden. You do not need to over explain or apologize. Just be ready to speak to it briefly and confidently when the conversation comes up.
        </p>

        <p>Add the context where you can, own it, and move on.</p>
      </aside>
    ),
  },
  {
    title: "If You Are Early in Your Career",
    eyebrow: "Step 7",
    content: (
      <>
        <div className="experience-reading-card">
          <p>
            If you do not have much full-time experience yet, use what you do have. Internships, volunteer work, freelance projects, school projects, anything relevant counts. Something is always better than nothing.
          </p>
        </div>

        <aside className="experience-tip-card">
          <span>Quick Tip</span>
          <p>
            A common question is whether to include every job you have ever had, including high school. Early in your career, yes. If you need something to speak to, include it. Part time roles and high school jobs show responsibility and work ethic. But once you have two to three years of professional experience, start removing those earlier roles. Your profile should reflect where you are now, not where you started.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "Rewrite Your Bullets",
    eyebrow: "Step 8",
    content: (
      <>
        <div className="experience-reading-card">
          <p>Paste your current resume bullet points into AI and ask it to rewrite them for LinkedIn.</p>
        </div>

        <aside className="experience-prompt-card">
          <div className="experience-prompt-top">
            <div>
              <span>Copy + Paste Prompt</span>
              <h3>Rewrite your bullets.</h3>
            </div>

            <small>AI Tool Ready</small>
          </div>

          <div className="experience-prompt-body">
            <p>
              You are a Recruiter and LinkedIn Guru. With that insight, please rewrite these bullet points for my LinkedIn experience section. Make them clearer, more concise, and more impactful. Focus on what I actually did, the tools I used, and the outcome. Keep each bullet short and easy to read. Avoid generic phrases and do not make anything up.
            </p>

            <p>[PASTE BULLETS]</p>
          </div>
        </aside>
      </>
    ),
  },
  {
    title: "Shorten Wordy Bullets",
    eyebrow: "Step 9",
    content: (
      <aside className="experience-prompt-card">
        <div className="experience-prompt-top">
          <div>
            <span>Copy + Paste Prompt</span>
            <h3>If the response comes back too long or wordy:</h3>
          </div>

          <small>AI Tool Ready</small>
        </div>

        <div className="experience-prompt-body">
          <p>
            Shorten these bullet points for my LinkedIn experience section and make them more direct. Keep only what is important. Make each one easy to skim. Remove anything repetitive or overly wordy. Keep the wording natural and not like AI wrote it. Do not change the meaning.
          </p>

          <p>[PASTE BULLETS]</p>
        </div>
      </aside>
    ),
  },
  {
    title: "Small Details That Matter",
    eyebrow: "Step 10",
    content: (
      <>
        <div className="experience-detail-grid">
          <article>
            <span>01</span>
            <h3>Tense</h3>
            <p>Write your current role in present tense and all past roles in past tense. It is a small detail that stands out when it is wrong.</p>
          </article>

          <article>
            <span>02</span>
            <h3>Bullet Consistency</h3>
            <p>If you are using bullet points, make sure every single role uses the exact same bullet symbol.</p>
          </article>

          <article>
            <span>03</span>
            <h3>Most Detail First</h3>
            <p>Give the most detail to your most recent and relevant roles. Older roles can be shorter.</p>
          </article>
        </div>

        <div className="experience-reading-card">
          <p>
            Reminder: If you are using bullet points, make sure every single role uses the exact same bullet symbol. LinkedIn does not have a native bullet feature, so people often copy and paste from different sources and end up with three different styles across their profile. It looks sloppy. Pick one, copy it, and use it everywhere.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Final Takeaway",
    eyebrow: "Step 11",
    content: (
      <aside className="experience-final-card">
        <span>Final Takeaway</span>
        <h3>Make it easy to understand.</h3>
        <p>
          This section should be easy for a recruiter to understand. If someone has to read it twice to figure out what you did, it needs more work.
        </p>
      </aside>
    ),
  },
];

export default function ExperienceLesson() {
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
    <section className="experience-course">
      <div className="experience-topbar">
        <div>
          <span>Experience Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="experience-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="experience-layout">
        <aside className="experience-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "experience-step experience-step-active"
                  : "experience-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="experience-content">
          <div className="experience-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="experience-body">{currentStep.content}</div>

          <div className="experience-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/education"
                className="experience-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Education</strong>
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
