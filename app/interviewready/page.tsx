"use client";

import { useEffect, useMemo, useState } from "react";

const checklistSections = [
  {
    letter: "R",
    title: "Research",
    items: [
      "Review the job description one last time",
      "Review your resume",
      "Know who you're interviewing with",
      "Prepare 3–5 stories that show your impact",
      "Have 3 thoughtful questions ready",
    ],
  },
  {
    letter: "E",
    title: "Environment",
    items: [
      "Interview from a laptop or desktop, not your phone",
      "Quiet, distraction-free room",
      "Clean, professional background",
      "Camera at eye level",
      "Good lighting facing you",
      "Strong internet connection",
      "Phone on silent",
      "Water nearby",
      "Close Slack, Teams, email, and notifications",
    ],
  },
  {
    letter: "A",
    title: "Appearance",
    items: [
      "Dress professionally",
      "Sit up straight",
      "Smile before joining",
      "Check your camera framing",
      "Have a notebook and pen nearby",
    ],
  },
  {
    letter: "D",
    title: "Delivery",
    items: [
      "Listen completely before answering",
      "Pause before responding",
      "Keep answers clear and focused",
      "Use real examples",
      "Let your personality come through",
      "Make eye contact by looking at the camera",
      "Don’t rush",
    ],
  },
  {
    letter: "Y",
    title: "Your Mindset",
    items: [
      "Treat every interview like the opportunity you’ve been waiting for",
      "Confidence comes from preparation",
      "They already liked your resume. Now they want to meet you.",
      "You’re interviewing them, too",
      "Focus on connection, not perfection",
      "Be yourself. The right company wants the real you.",
    ],
  },
];

const countdownItems = [
  {
    time: "30",
    label: "min before",
    title: "Review, don’t cram.",
    items: [
      "Review your top achievements.",
      "Read the job description one final time.",
      "Review your interviewer’s name and title.",
      "Stop trying to learn anything new.",
    ],
  },
  {
    time: "20",
    label: "min before",
    title: "Set up your space.",
    items: [
      "Test your microphone.",
      "Test your camera.",
      "Check your internet.",
      "Grab water.",
    ],
  },
  {
    time: "15",
    label: "min before",
    title: "Remove distractions.",
    items: [
      "Close every unnecessary window.",
      "Silence your phone.",
      "Open only what you’ll need.",
      "Have your resume and notes ready.",
    ],
  },
  {
    time: "10",
    label: "min before",
    title: "Reset your body.",
    items: [
      "Take three slow breaths.",
      "Relax your shoulders.",
      "Sit up tall.",
      "Smile.",
    ],
  },
  {
    time: "5",
    label: "min before",
    title: "Shift your mindset.",
    items: [
      "Instead of “I hope they like me.”",
      "Think “I’m here to learn if we’re a great fit for each other.”",
    ],
  },
  {
    time: "2",
    label: "min before",
    title: "Remind yourself.",
    items: [
      "I know my experience.",
      "I don’t need to memorize answers.",
      "I can pause before responding.",
      "I can ask for clarification if needed.",
      "It’s okay if I don’t know every answer.",
    ],
  },
  {
    time: "1",
    label: "min before",
    title: "Click join.",
    items: [
      "The company already saw something they liked.",
      "That’s why they invited you.",
      "Take a breath. Smile. Click join.",
    ],
  },
];

const allChecklistItems = checklistSections.flatMap((section) => section.items);

export default function InterviewReadyPage() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    () => allChecklistItems.map(() => false)
  );
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("jgoReadyChecklist");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setCheckedItems(
            allChecklistItems.map((_, index) => Boolean(parsed[index]))
          );
        }
      }
    } catch {
      setCheckedItems(allChecklistItems.map(() => false));
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    window.localStorage.setItem(
      "jgoReadyChecklist",
      JSON.stringify(checkedItems)
    );
  }, [checkedItems, hasLoaded]);

  const completedCount = useMemo(
    () => checkedItems.filter(Boolean).length,
    [checkedItems]
  );

  const percent = Math.round(
    (completedCount / allChecklistItems.length) * 100
  );

  const remainingCount = allChecklistItems.length - completedCount;

  function toggleItem(index: number) {
    setCheckedItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? !item : item
      )
    );
  }

  function resetChecklist() {
    setCheckedItems(allChecklistItems.map(() => false));
    window.localStorage.removeItem("jgoReadyChecklist");
  }

  let runningIndex = 0;

  return (
    <main className="jgo-ready-page">
      <style>{`
        .jgo-ready-page {
          --cream: #f7f3ee;
          --soft: #fbfaf7;
          --sage: #6f806f;
          --sage-dark: #4f654f;
          --ink: #1f1f1f;
          --muted: #6f6f6f;
          --line: rgba(31,31,31,.12);
          min-height: 100vh;
          font-family: Inter, Arial, sans-serif;
          color: var(--ink);
          background: var(--cream);
          padding: 72px 20px;
        }

        .jgo-ready-page * {
          box-sizing: border-box;
        }

        .jgo-wrap {
          max-width: 1180px;
          margin: 0 auto;
        }

        .jgo-logo {
          font-family: Georgia, serif;
          font-size: 34px;
          letter-spacing: -1px;
          margin-bottom: 34px;
          color: var(--ink);
        }

        .jgo-logo em {
          font-style: italic;
          font-weight: 400;
        }

        .jgo-logo strong {
          font-family: Inter, Arial, sans-serif;
          font-weight: 800;
          letter-spacing: -2px;
        }

        .jgo-hero {
          background: var(--soft);
          border: 1px solid var(--line);
          border-radius: 34px;
          padding: 56px;
          margin-bottom: 28px;
          box-shadow: 0 22px 60px rgba(0,0,0,.04);
        }

        .jgo-kicker {
          color: var(--sage-dark);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 14px;
        }

        .jgo-hero h1 {
          font-family: Georgia, serif;
          font-size: clamp(48px, 8vw, 96px);
          line-height: .9;
          margin: 0 0 20px;
          font-weight: 400;
          letter-spacing: -3px;
        }

        .jgo-hero h1 span {
          color: var(--sage);
        }

        .jgo-subtitle {
          font-size: 20px;
          line-height: 1.6;
          max-width: 720px;
          color: var(--muted);
          margin: 0;
        }

        .jgo-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 30px;
        }

        .jgo-btn {
          appearance: none;
          border: 1px solid var(--sage-dark);
          border-radius: 999px;
          background: var(--sage-dark);
          color: #fff !important;
          padding: 14px 22px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none !important;
          transition: .2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .jgo-btn.secondary {
          background: transparent;
          color: var(--sage-dark) !important;
        }

        .jgo-btn:hover {
          transform: translateY(-1px);
          opacity: .92;
        }

        .download-note {
          font-size: 14px;
          color: var(--muted);
          margin-top: 16px;
        }

        .ready-complete-message {
          margin-top: 22px;
          background: #efe9e2;
          border: 1px solid var(--line);
          border-radius: 22px;
          padding: 24px;
        }

        .ready-complete-message h3 {
          font-family: Georgia, serif;
          font-size: 30px;
          font-weight: 400;
          margin: 0 0 8px;
          color: var(--sage-dark);
        }

        .ready-complete-message p {
          margin: 0;
          color: var(--ink);
          line-height: 1.6;
        }

        .jgo-grid {
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 28px;
          align-items: start;
        }

        .jgo-card {
          background: var(--soft);
          border: 1px solid var(--line);
          border-radius: 30px;
          padding: 34px;
          box-shadow: 0 18px 50px rgba(0,0,0,.035);
        }

        .jgo-card h2 {
          font-family: Georgia, serif;
          font-size: 38px;
          font-weight: 400;
          margin: 0 0 10px;
          letter-spacing: -1px;
        }

        .jgo-card p {
          color: var(--muted);
          line-height: 1.6;
          margin-top: 0;
        }

        .ready-section {
          border-top: 1px solid var(--line);
          padding-top: 24px;
          margin-top: 24px;
        }

        .ready-title {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }

        .ready-letter {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: var(--sage);
          color: #fff;
          display: grid;
          place-items: center;
          font-family: Georgia, serif;
          font-size: 28px;
        }

        .ready-title h3 {
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 1.6px;
          font-size: 15px;
          color: var(--sage-dark);
        }

        .check-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          margin: 12px 0;
          font-size: 15px;
          line-height: 1.45;
          cursor: pointer;
        }

        .check-item input {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          accent-color: var(--sage-dark);
          cursor: pointer;
          flex: 0 0 auto;
        }

        .check-item input:checked + span {
          text-decoration: line-through;
          color: #9a9a9a;
        }

        .progress-box {
          background: var(--sage-dark);
          color: #fff;
          border-radius: 24px;
          padding: 28px;
          margin-bottom: 28px;
        }

        .progress-box h3 {
          margin: 0 0 10px;
          font-family: Georgia, serif;
          font-size: 28px;
          font-weight: 400;
        }

        .progress-track {
          width: 100%;
          height: 10px;
          border-radius: 999px;
          background: rgba(255,255,255,.25);
          overflow: hidden;
          margin-top: 18px;
        }

        .progress-fill {
          height: 100%;
          background: #fff;
          border-radius: 999px;
          transition: width .25s ease;
        }

        .countdown-item {
          display: grid;
          grid-template-columns: 82px 1fr;
          gap: 18px;
          padding: 22px 0;
          border-top: 1px solid var(--line);
        }

        .countdown-time {
          width: 72px;
          height: 72px;
          border-radius: 999px;
          border: 1px solid var(--sage);
          color: var(--sage-dark);
          display: grid;
          place-items: center;
          text-align: center;
          font-weight: 700;
          line-height: 1.05;
          font-size: 13px;
        }

        .countdown-time strong {
          display: block;
          font-family: Georgia, serif;
          font-size: 28px;
          font-weight: 400;
        }

        .countdown-copy h3 {
          margin: 0 0 10px;
          font-size: 18px;
        }

        .countdown-copy ul {
          padding-left: 18px;
          margin: 0;
          color: var(--muted);
          line-height: 1.65;
        }

        .jgo-reminder {
          background: #efe9e2;
          border: 1px solid var(--line);
          border-radius: 26px;
          padding: 30px;
          margin-top: 28px;
          text-align: center;
        }

        .jgo-reminder h2 {
          font-family: Georgia, serif;
          font-style: italic;
          font-weight: 400;
          color: var(--sage-dark);
          margin: 0 0 12px;
        }

        .jgo-reminder p {
          margin: 0 auto;
          max-width: 650px;
          color: var(--ink);
          font-size: 18px;
          line-height: 1.6;
        }

        @media print {
          .jgo-ready-page {
            background: #fff;
            padding: 20px;
          }

          .jgo-btn,
          .progress-box,
          .download-note,
          .ready-complete-message {
            display: none !important;
          }

          .jgo-grid {
            grid-template-columns: 1fr;
          }

          .jgo-card,
          .jgo-hero,
          .jgo-reminder {
            box-shadow: none;
            break-inside: avoid;
          }
        }

        @media (max-width: 900px) {
          .jgo-ready-page {
            padding: 42px 16px;
          }

          .jgo-hero {
            padding: 34px 24px;
            border-radius: 26px;
          }

          .jgo-grid {
            grid-template-columns: 1fr;
          }

          .jgo-card {
            padding: 26px 22px;
            border-radius: 24px;
          }

          .countdown-item {
            grid-template-columns: 1fr;
          }

          .jgo-logo {
            font-size: 28px;
          }
        }
      `}</style>

      <div className="jgo-wrap">
        <div className="jgo-logo">
          <em>JGO</em>
          <strong>hire</strong>
        </div>

        <section className="jgo-hero">
          <div className="jgo-kicker">Interview Prep Resource</div>

          <h1>
            JGO <span>READY</span>™
          </h1>

          <p className="jgo-subtitle">
            Your interactive interview checklist to help you walk into every
            interview prepared, confident, and ready to speak to what you do
            every day.
          </p>

          <div className="jgo-actions">
            <a
              className="jgo-btn"
              href="/JGO-READY-Interview-Checklist.pdf"
              download="JGO-READY-Interview-Checklist.pdf"
            >
              Download Printable PDF
            </a>

            <button
              className="jgo-btn secondary"
              type="button"
              onClick={resetChecklist}
            >
              Reset Checklist
            </button>

            <a className="jgo-btn secondary" href="/resources">
              Back to Resources
            </a>
          </div>

          <p className="download-note">
            Tip: Your checklist progress is saved automatically on this device.
          </p>

          {percent === 100 && (
            <div className="ready-complete-message">
              <h3>You’re READY.</h3>
              <p>
                No one knows your job like you do. Go in there and speak to what
                you do every day. You got this.
              </p>
            </div>
          )}
        </section>

        <div className="jgo-grid">
          <section className="jgo-card">
            <h2>Your Interview Checklist</h2>
            <p>
              Use this before every interview, no matter the company, role, or
              round.
            </p>

            {checklistSections.map((section) => (
              <div className="ready-section" key={section.letter}>
                <div className="ready-title">
                  <div className="ready-letter">{section.letter}</div>
                  <h3>{section.title}</h3>
                </div>

                {section.items.map((item) => {
                  const itemIndex = runningIndex;
                  runningIndex += 1;

                  return (
                    <label className="check-item" key={item}>
                      <input
                        type="checkbox"
                        checked={checkedItems[itemIndex] ?? false}
                        onChange={() => toggleItem(itemIndex)}
                      />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
            ))}
          </section>

          <div>
            <section className="progress-box">
              <h3>Your READY Progress</h3>
              <div>
                {percent === 100
                  ? "You’re READY."
                  : `${percent}% complete · ${remainingCount} items remaining`}
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </section>

            <section className="jgo-card">
              <h2>30-Minute Countdown</h2>
              <p>Small steps before the interview create big confidence.</p>

              {countdownItems.map((countdown) => (
                <div className="countdown-item" key={countdown.time}>
                  <div className="countdown-time">
                    <span>
                      <strong>{countdown.time}</strong>
                      {countdown.label}
                    </span>
                  </div>

                  <div className="countdown-copy">
                    <h3>{countdown.title}</h3>
                    <ul>
                      {countdown.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>

        <section className="jgo-reminder">
          <h2>Remember</h2>
          <p>
            No one knows your job like you do. So go in there and speak to what
            you do every day. You got this.
          </p>
        </section>
      </div>
    </main>
  );
}
