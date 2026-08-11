"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type RuleStatus = "unreviewed" | "handled" | "work";

type Rule = {
  number: string;
  title: string;
  shortTitle: string;
  body: string[];
  checklistTitle: string;
  checklist: string[];
  reality: string;
};

type DiagnosticOption = {
  id: string;
  label: string;
  description: string;
  rule: number;
};

const STORAGE_KEY = "jgo-survival-guide-progress";

const rules: Rule[] = [
  {
    number: "01",
    title: "Stop measuring your job search by how many jobs you apply to.",
    shortTitle: "Application Strategy",
    body: [
      "There is nothing inherently impressive about submitting 75 applications.",
      "If 70 of them are jobs you are barely qualified for, do not actually want, or applied to without taking five minutes to understand the company, you are creating activity, not necessarily progress.",
      "You do not need to check every single box in a job description. You do need to make enough sense on paper that someone wants to learn more.",
    ],
    checklistTitle: "Before applying, ask yourself:",
    checklist: [
      "Am I genuinely qualified for most of what they are asking for?",
      "Would I actually accept an interview for this job?",
      "Can I clearly explain why my experience connects to this role?",
      "Is my resume making that connection obvious?",
    ],
    reality:
      "10 thoughtful applications can be more valuable than 100 random ones. Your goal is not to win LinkedIn's imaginary award for Most Applications Submitted. Your goal is to get hired.",
  },
  {
    number: "02",
    title: "Your resume has one job.",
    shortTitle: "Resume",
    body: [
      "And no, its job is not to tell your entire life story.",
      "Its job is to make someone think: “I want to talk to this person.” That is it.",
      "A recruiter may initially look at your resume for seconds, not minutes. Make those seconds easy.",
      "Your resume does not need an objective explaining that you are seeking a challenging opportunity to utilize your skills. I promise. We know why you are here.",
    ],
    checklistTitle: "Your resume should quickly answer:",
    checklist: [
      "What do you do?",
      "What are you good at?",
      "What have you actually accomplished?",
      "Why does your background make sense for this job?",
      "Can a human being actually read this thing?",
    ],
    reality:
      "If the top third is clear, your recent experience is relevant, your bullets show impact, and the formatting is easy to read, stop editing it for the 47th time.",
  },
  {
    number: "03",
    title: "Please stop trying to beat the ATS.",
    shortTitle: "ATS",
    body: [
      "Somewhere along the way, job seekers became convinced there is a mysterious robot standing between them and employment.",
      "Applicant tracking systems are real. But stuffing your resume with invisible keywords, copying an entire job description into the footer, or asking AI to turn every sentence into corporate word salad is not the strategy.",
      "Think alignment, not gaming the system.",
    ],
    checklistTitle: "If a role keeps asking for these things:",
    checklist: [
      "Project Management",
      "Stakeholder Management",
      "Salesforce",
      "B2B SaaS",
    ],
    reality:
      "And you genuinely have that experience? Those things should probably be easy to find on your resume. That is not tricking an ATS. That is communicating clearly.",
  },
  {
    number: "04",
    title: "LinkedIn is part of your resume now.",
    shortTitle: "LinkedIn",
    body: [
      "Someone is probably going to look you up. Make sure what they find supports the story your resume is telling.",
      "You do not need to become a LinkedIn influencer. You can simply have a strong profile, engage thoughtfully, and connect with people in your industry.",
    ],
    checklistTitle: "At minimum, check:",
    checklist: [
      "Photo: current, clear, and professional.",
      "Headline: tell me what you do, not just your current job title.",
      "About: give me context about who you are professionally and what you do well.",
      "Experience: it should generally align with your resume.",
      "Dates: make sure your LinkedIn and resume dates match. Recruiters notice.",
    ],
    reality:
      "You do not need to wake up at 6:00 AM and write, “I have been thinking a lot about leadership...” Strong and accurate is enough.",
  },
  {
    number: "05",
    title: "Applying is only one lane of the job search.",
    shortTitle: "Networking",
    body: [
      "Yes, apply to jobs. But also reconnect with former coworkers, message people you genuinely know, talk to recruiters, follow companies you care about, and tell people you are looking.",
      "A surprising number of job seekers quietly search for six months while telling approximately nobody.",
      "You do not need to announce your job search to the entire internet. But people cannot help you if they do not know you are looking.",
    ],
    checklistTitle: "Try this:",
    checklist: [
      "Hey! I am starting to explore new opportunities in [AREA]. If you happen to hear of anything that feels aligned with my background in [X/Y], I would love to be on your radar.",
    ],
    reality:
      "Normal. Human. No awkward begging required.",
  },
  {
    number: "06",
    title: "Getting the interview is not the finish line.",
    shortTitle: "Interviewing",
    body: [
      "If you are getting interviews but not offers, that is actually useful information. Your resume is probably doing its job. Now we look at the interview.",
      "One of the biggest mistakes candidates make is preparing to answer questions instead of preparing to tell their story.",
      "You cannot predict every question. You can prepare the stories you want to tell.",
    ],
    checklistTitle: "Before an interview, know:",
    checklist: [
      "Why this company?",
      "Why this role?",
      "Why now?",
      "What are the 4 to 5 experiences you absolutely want them to know about?",
      "What examples prove you can do what this job requires?",
    ],
    reality:
      "Have questions. Not because somebody told you that you have to ask questions at the end. Ask because you are interviewing them too.",
  },
  {
    number: "07",
    title: "Use AI. Just do not let AI turn you into a robot.",
    shortTitle: "AI",
    body: [
      "AI can be incredibly helpful during a job search. Use it to get organized, practice, research, and improve clarity.",
      "But if your cover letter begins, “I am writing to express my enthusiastic interest in the esteemed position...” we have a problem.",
      "You should still sound like you.",
    ],
    checklistTitle: "Good ways to use AI:",
    checklist: [
      "Compare your resume to a job description.",
      "Brainstorm interview questions.",
      "Practice answers and identify where they get vague.",
      "Research what you should understand before an interview.",
      "Organize your accomplishments.",
      "Improve clarity when you are stuck.",
    ],
    reality:
      "AI should help you communicate your experience. It should not invent your experience, inflate your skills, or make you sound like a management consultant who swallowed a thesaurus.",
  },
];

const diagnosticOptions: DiagnosticOption[] = [
  {
    id: "crickets",
    label: "I am applying and hearing crickets.",
    description: "Applications are going out. Interviews are not coming back.",
    rule: 1,
  },
  {
    id: "resume",
    label: "My resume feels off.",
    description: "I keep changing it and I have no idea if I am making it better.",
    rule: 2,
  },
  {
    id: "interviews",
    label: "I am interviewing, but not getting offers.",
    description: "I can get in the room. I am not getting the yes.",
    rule: 6,
  },
  {
    id: "linkedin",
    label: "My LinkedIn needs help.",
    description: "It exists. That is about the nicest thing I can say about it.",
    rule: 4,
  },
  {
    id: "strategy",
    label: "I have no real strategy.",
    description: "Apply. Refresh email. Repeat.",
    rule: 5,
  },
  {
    id: "everything",
    label: "Honestly? I do not even know anymore.",
    description: "The job search has officially entered chaos territory.",
    rule: 1,
  },
];

const applicationSteps = [
  {
    minutes: 2,
    time: "2 MINUTES",
    text: "Read the actual job description.",
  },
  {
    minutes: 3,
    time: "3 MINUTES",
    text: "Identify the 3 to 5 things they seem to care about most.",
  },
  {
    minutes: 5,
    time: "5 MINUTES",
    text: "Look at your resume. Are those things obvious if you genuinely have them?",
  },
  {
    minutes: 2,
    time: "2 MINUTES",
    text: "Check the company and role on LinkedIn.",
  },
  {
    minutes: 2,
    time: "2 MINUTES",
    text: "Look for a relevant connection, recruiter, or hiring team member.",
  },
  {
    minutes: 1,
    time: "1 MINUTE",
    text: "Proofread. Then apply.",
  },
];

export default function SurvivalGuideClient() {
  const [expandedRules, setExpandedRules] = useState<number[]>([1]);

  const [statuses, setStatuses] = useState<Record<number, RuleStatus>>({
    1: "unreviewed",
    2: "unreviewed",
    3: "unreviewed",
    4: "unreviewed",
    5: "unreviewed",
    6: "unreviewed",
    7: "unreviewed",
  });

  const [diagnostic, setDiagnostic] = useState<DiagnosticOption | null>(null);

  const [applicationChecks, setApplicationChecks] = useState<boolean[]>(
    applicationSteps.map(() => false),
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        if (parsed.statuses) {
          setStatuses(parsed.statuses);
        }

        if (parsed.applicationChecks) {
          setApplicationChecks(parsed.applicationChecks);
        }

        if (parsed.diagnosticId) {
          const savedDiagnostic = diagnosticOptions.find(
            (option) => option.id === parsed.diagnosticId,
          );

          if (savedDiagnostic) {
            setDiagnostic(savedDiagnostic);
          }
        }
      }
    } catch {
      // If saved progress cannot be read, just start fresh.
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        statuses,
        applicationChecks,
        diagnosticId: diagnostic?.id ?? null,
      }),
    );
  }, [statuses, applicationChecks, diagnostic, loaded]);

  const reviewedCount = useMemo(
    () =>
      Object.values(statuses).filter((status) => status !== "unreviewed")
        .length,
    [statuses],
  );

  const handledCount = useMemo(
    () =>
      Object.values(statuses).filter((status) => status === "handled").length,
    [statuses],
  );

  const workRules = useMemo(
    () =>
      rules.filter(
        (_, index) => statuses[index + 1] === "work",
      ),
    [statuses],
  );

  const overallProgress = Math.round((reviewedCount / rules.length) * 100);

  const completedMinutes = applicationSteps.reduce(
    (total, step, index) =>
      applicationChecks[index] ? total + step.minutes : total,
    0,
  );

  function toggleRule(ruleNumber: number) {
    setExpandedRules((current) =>
      current.includes(ruleNumber)
        ? current.filter((number) => number !== ruleNumber)
        : [...current, ruleNumber],
    );
  }

  function setRuleStatus(ruleNumber: number, status: RuleStatus) {
    setStatuses((current) => ({
      ...current,
      [ruleNumber]: status,
    }));
  }

  function chooseDiagnostic(option: DiagnosticOption) {
    setDiagnostic(option);

    setExpandedRules((current) =>
      current.includes(option.rule)
        ? current
        : [...current, option.rule],
    );

    window.setTimeout(() => {
      document
        .getElementById(`survival-rule-${option.rule}`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 120);
  }

  function toggleApplicationCheck(index: number) {
    setApplicationChecks((current) =>
      current.map((value, itemIndex) =>
        itemIndex === index ? !value : value,
      ),
    );
  }

  function resetProgress() {
    setStatuses({
      1: "unreviewed",
      2: "unreviewed",
      3: "unreviewed",
      4: "unreviewed",
      5: "unreviewed",
      6: "unreviewed",
      7: "unreviewed",
    });

    setApplicationChecks(applicationSteps.map(() => false));
    setDiagnostic(null);
    setExpandedRules([1]);

    window.localStorage.removeItem(STORAGE_KEY);
  }

  const recommendedRule = diagnostic
    ? rules[diagnostic.rule - 1]
    : workRules[0] ?? null;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand}>
            <span>JGO HIRE</span>
            <small>Career Coach + Recruiter</small>
          </Link>

          <div className={styles.headerActions}>
            <a
              className={styles.downloadButton}
              href="/JGO-Hire-Job-Seeker-Survival-Guide.pdf"
              download
            >
              Save the PDF ↓
            </a>

            <Link href="/" className={styles.backLink}>
              Back to JGO Hire
            </Link>
          </div>
        </div>
      </header>

      <div className={styles.progressBarShell}>
        <div className={styles.progressBarInfo}>
          <span>Your Survival Plan</span>
          <strong>{overallProgress}% reviewed</strong>
        </div>

        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{
              width: `${overallProgress}%`,
            }}
          />
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroGlow} />

        <div className={styles.shell}>
          <p className={styles.eyebrow}>The JGO Hire</p>

          <h1>
            Job Seeker
            <span>Survival Guide</span>
          </h1>

          <p className={styles.heroSubtitle}>
            How to Navigate the Modern Job Search Without Losing Your Mind
          </p>

          <p className={styles.heroIntro}>
            Applications. LinkedIn. Recruiters. Interviews. Ghosting. AI.
            Let&apos;s make this whole thing make a little more sense.
          </p>

          <div className={styles.heroMeta}>
            <div>
              <strong>7</strong>
              <span>survival rules</span>
            </div>

            <div>
              <strong>15</strong>
              <span>minute application check</span>
            </div>

            <div>
              <strong>0</strong>
              <span>corporate fluff</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.diagnosticSection}>
        <div className={styles.shell}>
          <div className={styles.diagnosticHeading}>
            <div>
              <p className={styles.eyebrow}>Start Here</p>

              <h2>Where are you stuck?</h2>

              <p>
                Pick the one that feels the most accurate right now. I&apos;ll
                tell you where I&apos;d start.
              </p>
            </div>

            {diagnostic && (
              <button
                type="button"
                className={styles.clearDiagnostic}
                onClick={() => setDiagnostic(null)}
              >
                Choose again
              </button>
            )}
          </div>

          <div className={styles.diagnosticGrid}>
            {diagnosticOptions.map((option) => {
              const active = diagnostic?.id === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  className={`${styles.diagnosticCard} ${
                    active ? styles.diagnosticCardActive : ""
                  }`}
                  onClick={() => chooseDiagnostic(option)}
                >
                  <span className={styles.diagnosticRadio}>
                    {active ? "✓" : ""}
                  </span>

                  <strong>{option.label}</strong>

                  <p>{option.description}</p>
                </button>
              );
            })}
          </div>

          {diagnostic && (
            <div className={styles.diagnosticResult}>
              <div>
                <span>YOUR STARTING POINT</span>

                <strong>
                  Rule {diagnostic.rule}:{" "}
                  {rules[diagnostic.rule - 1].shortTitle}
                </strong>
              </div>

              <p>
                Start there. You do not need to fix the entire job search
                tonight.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className={styles.realitySection}>
        <div className={styles.narrowShell}>
          <p className={styles.eyebrow}>First, a reality check</p>

          <h2>The job search is weird right now.</h2>

          <div className={styles.leadCopy}>
            <p>
              If you&apos;ve been applying to jobs and wondering whether
              you&apos;re doing something wrong, welcome to the modern job
              search.
            </p>

            <p>
              There are hundreds of applicants. AI-generated everything. Job
              descriptions asking for 14 skills for a role that somehow still
              pays $65K. Recruiters who reach out and disappear. Companies that
              put you through six interviews. And rejection emails that arrive
              approximately four months after you forgot you applied.
            </p>

            <p className={styles.bigLine}>It&apos;s a lot.</p>
          </div>

          <div className={styles.notNeededCard}>
            <p>But here&apos;s what I want you to know:</p>

            <ul>
              <li>You do not need to apply to 100 jobs a week.</li>
              <li>
                You do not need to completely rewrite your resume every time.
              </li>
              <li>You do not need to spend your entire day on LinkedIn.</li>
              <li>
                And you definitely do not need to turn the job search into your
                entire personality.
              </li>
            </ul>

            <strong>You need a strategy.</strong>
          </div>

          <p className={styles.introClosing}>
            I&apos;ve spent nearly a decade recruiting, reviewing resumes,
            interviewing candidates, and watching hiring decisions happen from
            the other side of the table. This guide is the stuff I wish every
            job seeker knew before they hit Apply.
          </p>

          <p className={styles.letsGo}>Let&apos;s get into it.</p>
        </div>
      </section>

      <section className={styles.rulesSection}>
        <div className={styles.shell}>
          <div className={styles.rulesHeadingRow}>
            <div className={styles.rulesHeading}>
              <p className={styles.eyebrow}>The Survival Rules</p>

              <h2>
                Seven things I want you to know before your next application.
              </h2>
            </div>

            <div className={styles.ruleProgressSummary}>
              <strong>
                {reviewedCount}/{rules.length}
              </strong>
              <span>reviewed</span>
            </div>
          </div>

          <div className={styles.rulesList}>
            {rules.map((rule, index) => {
              const ruleNumber = index + 1;
              const expanded = expandedRules.includes(ruleNumber);
              const status = statuses[ruleNumber];

              return (
                <article
                  key={rule.number}
                  id={`survival-rule-${ruleNumber}`}
                  className={`${styles.ruleCard} ${
                    diagnostic?.rule === ruleNumber
                      ? styles.ruleCardRecommended
                      : ""
                  }`}
                >
                  <button
                    type="button"
                    className={styles.ruleHeader}
                    onClick={() => toggleRule(ruleNumber)}
                    aria-expanded={expanded}
                  >
                    <div className={styles.ruleNumber}>
                      {rule.number}
                    </div>

                    <div className={styles.ruleTitleArea}>
                      <div className={styles.ruleLabelRow}>
                        <p className={styles.ruleLabel}>
                          Survival Rule #{ruleNumber}
                        </p>

                        {diagnostic?.rule === ruleNumber && (
                          <span className={styles.recommendedBadge}>
                            Start here
                          </span>
                        )}

                        {status === "handled" && (
                          <span className={styles.handledBadge}>
                            Handled ✓
                          </span>
                        )}

                        {status === "work" && (
                          <span className={styles.workBadge}>
                            My focus
                          </span>
                        )}
                      </div>

                      <h3>{rule.title}</h3>
                    </div>

                    <span className={styles.expandIcon}>
                      {expanded ? "−" : "+"}
                    </span>
                  </button>

                  {expanded && (
                    <div className={styles.ruleExpanded}>
                      <div className={styles.ruleBody}>
                        {rule.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>

                      <div className={styles.checklistBox}>
                        <h4>{rule.checklistTitle}</h4>

                        <ul>
                          {rule.checklist.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={styles.realityCheck}>
                        <span>JGO Reality Check</span>
                        <p>{rule.reality}</p>
                      </div>

                      <div className={styles.ruleDecision}>
                        <div>
                          <span>Quick gut check:</span>
                          <strong>Where are you with this one?</strong>
                        </div>

                        <div className={styles.ruleDecisionButtons}>
                          <button
                            type="button"
                            className={`${styles.statusButton} ${
                              status === "handled"
                                ? styles.statusButtonActive
                                : ""
                            }`}
                            onClick={() =>
                              setRuleStatus(ruleNumber, "handled")
                            }
                          >
                            ✓ I&apos;ve got this
                          </button>

                          <button
                            type="button"
                            className={`${styles.statusButton} ${
                              status === "work"
                                ? styles.statusButtonWorkActive
                                : ""
                            }`}
                            onClick={() =>
                              setRuleStatus(ruleNumber, "work")
                            }
                          >
                            This needs work
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.applicationSection}>
        <div className={styles.shell}>
          <div className={styles.applicationCard}>
            <div className={styles.applicationIntro}>
              <div className={styles.applicationIntroTop}>
                <div>
                  <p className={styles.eyebrow}>Steal This</p>

                  <h2>The JGO Hire 15-Minute Job Application Check</h2>
                </div>

                <div className={styles.minuteCounter}>
                  <strong>{completedMinutes}</strong>
                  <span>/ 15 min</span>
                </div>
              </div>

              <p>
                You do not need a two-hour resume rewrite every time you see a
                job you like. Give yourself 15 focused minutes instead.
              </p>

              <div className={styles.minuteProgressTrack}>
                <div
                  className={styles.minuteProgressFill}
                  style={{
                    width: `${(completedMinutes / 15) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className={styles.applicationSteps}>
              {applicationSteps.map((step, index) => {
                const checked = applicationChecks[index];

                return (
                  <button
                    type="button"
                    key={`${step.time}-${index}`}
                    className={`${styles.applicationStep} ${
                      checked ? styles.applicationStepComplete : ""
                    }`}
                    onClick={() => toggleApplicationCheck(index)}
                  >
                    <span className={styles.stepCheck}>
                      {checked ? "✓" : String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <strong>{step.time}</strong>
                      <p>{step.text}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className={styles.applyNow}>
              {completedMinutes === 15
                ? "Done. Stop tweaking it. Hit Apply."
                : "No two-hour resume rewrite required."}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.crazySection}>
        <div className={styles.narrowShell}>
          <p className={styles.eyebrow}>Save This Part</p>

          <h2>When the job search starts making you crazy...</h2>

          <p>Come back to this:</p>

          <div className={styles.reminders}>
            <p>You don&apos;t need to apply to everything.</p>

            <p>
              You don&apos;t need to follow every piece of career advice on the
              internet.
            </p>

            <p>You don&apos;t need to completely reinvent yourself.</p>

            <p>
              And you don&apos;t need to interpret every rejection as proof
              that your career is doomed.
            </p>
          </div>

          <p className={styles.youNeed}>You need:</p>

          <div className={styles.needGrid}>
            <span>A clear story.</span>
            <span>A strong resume.</span>
            <span>Intentional applications.</span>
            <span>Good interview preparation.</span>
            <span>Some actual human connection.</span>
            <span>Enough patience to stay consistent.</span>
          </div>

          <div className={styles.finalStatement}>
            <p>The modern job search can be chaotic.</p>

            <strong>Your strategy doesn&apos;t have to be.</strong>
          </div>
        </div>
      </section>

      <section className={styles.planSection}>
        <div className={styles.shell}>
          <div className={styles.planCard}>
            <div className={styles.planHeader}>
              <div>
                <p className={styles.eyebrow}>Your Survival Plan</p>

                <h2>
                  {workRules.length > 0
                    ? "Okay. We have a plan."
                    : reviewedCount === rules.length
                      ? "Look at you. You survived."
                      : "Your next move starts here."}
                </h2>
              </div>

              <div className={styles.planScore}>
                <strong>{handledCount}</strong>
                <span>rules handled</span>
              </div>
            </div>

            {recommendedRule ? (
              <div className={styles.primaryRecommendation}>
                <span>START WITH THIS</span>

                <strong>{recommendedRule.shortTitle}</strong>

                <p>{recommendedRule.title}</p>

                <button
                  type="button"
                  onClick={() => {
                    const ruleIndex =
                      rules.findIndex(
                        (rule) =>
                          rule.number === recommendedRule.number,
                      ) + 1;

                    setExpandedRules((current) =>
                      current.includes(ruleIndex)
                        ? current
                        : [...current, ruleIndex],
                    );

                    document
                      .getElementById(`survival-rule-${ruleIndex}`)
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                  }}
                >
                  Go to this rule ↑
                </button>
              </div>
            ) : (
              <div className={styles.primaryRecommendation}>
                <span>YOUR NEXT MOVE</span>

                <strong>Pick one thing.</strong>

                <p>
                  Go through the rules above and mark the ones you have handled
                  and the ones that need work. Your plan will build itself here.
                </p>
              </div>
            )}

            {workRules.length > 0 && (
              <div className={styles.focusList}>
                <p>Your focus areas:</p>

                <div>
                  {workRules.map((rule) => (
                    <span key={rule.number}>
                      {rule.number}. {rule.shortTitle}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.planBottom}>
              <div>
                <strong>One thing at a time.</strong>

                <p>
                  You do not need to rebuild your entire job search tonight.
                </p>
              </div>

              <button
                type="button"
                className={styles.resetButton}
                onClick={resetProgress}
              >
                Clear my progress
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.nextSection}>
        <div className={styles.shell}>
          <div className={styles.nextCard}>
            <p className={styles.eyebrow}>Okay. Now What?</p>

            <h2>Pick one thing.</h2>

            <p className={styles.nextLead}>
              Pick <strong>one thing</strong> from this guide that you know you
              need to work on. Not eight. One. Fix that first. Then keep going.
            </p>

            <div className={styles.nextDivider} />

            <p>
              And if you want someone who has actually sat on the recruiting
              side of the table to help you figure out what isn&apos;t working,
              that&apos;s literally what I do.
            </p>

            <div className={styles.servicesLine}>
              Resume Strategy <span>•</span> Interview Coaching{" "}
              <span>•</span> Job Search Strategy <span>•</span> LinkedIn
              Optimization <span>•</span> Career Coaching
            </div>

            <div className={styles.nextActions}>
              <Link href="/contact" className={styles.primaryCta}>
                Work With Me →
              </Link>

              <a
                href="/JGO-Hire-Job-Seeker-Survival-Guide.pdf"
                download
                className={styles.secondaryCta}
              >
                Save the PDF ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <strong>JGO HIRE</strong>
            <span>Career Coach + Recruiter</span>
          </div>

          <p>Career advice from someone who actually recruits.</p>
        </div>
      </footer>
    </main>
  );
}