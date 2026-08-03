"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./connections.css";

const steps = [
  {
    title: "Why Connections Matter",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="connections-image-placeholder">
          <div className="connections-network" aria-hidden="true">
            <span className="node node-one" />
            <span className="node node-two" />
            <span className="node node-three" />
            <span className="node node-four" />
            <span className="node node-five" />
            <i className="line line-one" />
            <i className="line line-two" />
            <i className="line line-three" />
            <i className="line line-four" />
          </div>

          <div>
            <strong>Connections Example</strong>
            <p>Add your LinkedIn Connections screenshot here.</p>
          </div>
        </div>

        <div className="connections-reading-card">
          <p>
            Your connections are the people you are linked to on LinkedIn. The more connected you are, the more visible you are. Your profile shows up more in searches, you appear as a mutual connection to others, and your activity reaches more people.
          </p>
        </div>

        <aside className="connections-statement-card">
          <span>Connection Rule</span>
          <p>Your visibility expands through your network.</p>
        </aside>
      </>
    ),
  },
  {
    title: "Connection Levels",
    eyebrow: "Step 2",
    content: (
      <>
        <div className="connections-reading-card">
          <p>You saw this earlier in the guide, but as a reminder:</p>

          <p>
            First degree connections are people you are directly connected with. These are the people you can message freely, and they are the most likely to see your activity.
          </p>

          <p>
            Second degree connections are people connected to your first degree connections. This is where things start to expand. When you engage with content, your activity can reach into this group.
          </p>

          <p>
            Third degree connections are outside your immediate network. You cannot message them directly, but if your second degree connections engage with your activity, that interaction can push your name into their network too. Your visibility expands through these layers. The more first degree connections you have, the further you reach into second and third degree networks. That is how your profile gets in front of more people, including recruiters who may never have found you otherwise.
          </p>
        </div>

        <div className="connections-value-grid">
          <article>
            <span>01</span>
            <h3>First Degree</h3>
            <p>
              People you are directly connected with. These are the people you can message freely, and they are the most likely to see your activity.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Second Degree</h3>
            <p>
              People connected to your first degree connections. This is where things start to expand.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Third Degree</h3>
            <p>
              Outside your immediate network. Your visibility can reach them through engagement and mutual connections.
            </p>
          </article>
        </div>
      </>
    ),
  },
  {
    title: "Where to Start",
    eyebrow: "Step 3",
    content: (
      <>
        <div className="connections-reading-card">
          <p>
            Start with the basics. Connect with former coworkers, managers, classmates, and anyone you have actually worked with or know. That is your foundation.
          </p>

          <p>Then expand. Connect with:</p>

          <p>people in roles you want</p>

          <p>people at companies you are targeting</p>

          <p>people doing interesting work in your field</p>

          <p>
            You can also follow companies you are interested in. It keeps you updated on what they are doing and when they are hiring. LinkedIn also shows recruiters when you are following their company, which signals genuine interest.
          </p>
        </div>

        <div className="connections-focus-grid">
          <article>
            <span>01</span>
            <h3>People You Know</h3>
            <p>Former coworkers, managers, classmates, and anyone you have actually worked with or know.</p>
          </article>

          <article>
            <span>02</span>
            <h3>People in Target Roles</h3>
            <p>Connect with people in roles you want and people doing interesting work in your field.</p>
          </article>

          <article>
            <span>03</span>
            <h3>Target Companies</h3>
            <p>Connect with people at companies you are targeting and follow the companies too.</p>
          </article>
        </div>
      </>
    ),
  },
  {
    title: "Be Intentional",
    eyebrow: "Step 4",
    content: (
      <aside className="connections-tip-card">
        <span>Be Intentional</span>
        <p>
          Be intentional but do not overthink it. You do not need to connect with thousands of random people. Quality still matters.
        </p>
      </aside>
    ),
  },
  {
    title: "Sending Connection Requests",
    eyebrow: "Step 5",
    content: (
      <>
        <div className="connections-reading-card">
          <p>
            If you are reaching out to someone you do not know, add a note. It does not need to be long. LinkedIn limits connection notes to 300 characters so keep it simple and genuine.
          </p>

          <p>
            Example: "Hey, I saw you work at [company] and I am really interested in that space. Would love to connect."
          </p>

          <p>Short, real, and easy to say yes to.</p>

          <p>If you are not sure what to say, use AI to help.</p>
        </div>

        <aside className="connections-prompt-card">
          <div className="connections-prompt-top">
            <div>
              <span>Copy + Paste Prompt</span>
              <h3>Write a connection note.</h3>
            </div>

            <small>AI Tool Ready</small>
          </div>

          <div className="connections-prompt-body">
            <p>
              Write a short LinkedIn connection request message under 300 characters. Keep it natural and not overly formal. Mention that I am interested in [industry/company/role] and would like to connect. Make it simple, genuine, and easy for someone to say yes to. Do not make anything up.
            </p>
          </div>
        </aside>
      </>
    ),
  },
  {
    title: "After You Connect",
    eyebrow: "Step 6",
    content: (
      <div className="connections-reading-card">
        <p>
          Do not just connect and disappear. Engage a little. Like their posts, leave a comment, stay somewhat active. That is how you stay visible even when you are not actively applying.
        </p>
      </div>
    ),
  },
  {
    title: "Use Your Network",
    eyebrow: "Step 7",
    content: (
      <>
        <div className="connections-reading-card">
          <p>
            Mutual connections matter. If you are applying somewhere and you notice you have a connection at that company, even a second degree connection, reach out and share your interest. It can make a real difference.
          </p>
        </div>

        <aside className="connections-tip-card">
          <span>Quick Tip</span>
          <p>
            A warm introduction or a familiar name goes further than a cold application almost every time.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "Final Takeaway",
    eyebrow: "Step 8",
    content: (
      <aside className="connections-final-card">
        <span>Final Takeaway</span>
        <h3>Treat LinkedIn like a networking platform.</h3>

        <p>
          LinkedIn is a networking platform. The more you treat it like one, the better it works for you.
        </p>
      </aside>
    ),
  },
];

export default function ConnectionsLesson() {
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
    <section className="connections-course">
      <div className="connections-topbar">
        <div>
          <span>Connections Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="connections-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="connections-layout">
        <aside className="connections-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "connections-step connections-step-active"
                  : "connections-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="connections-content">
          <div className="connections-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="connections-body">{currentStep.content}</div>

          <div className="connections-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/additional-sections"
                className="connections-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Adding Additional Sections</strong>
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
