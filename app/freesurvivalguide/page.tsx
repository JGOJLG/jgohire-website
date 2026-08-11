"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type AnswerType = "apply" | "overthink" | "interview" | "survivor";

type Answer = {
  label: string;
  type: AnswerType;
};

type QuizQuestion = {
  question: string;
  answers: Answer[];
};

type Screen =
  | "intro"
  | "quiz"
  | "analyzing"
  | "result"
  | "guide"
  | "success";

const questions: QuizQuestion[] = [
  {
    question: "Be honest. What does your job search look like right now?",
    answers: [
      { label: "I’m applying everywhere and hearing crickets.", type: "apply" },
      { label: "I’m getting interviews, but no offers.", type: "interview" },
      { label: "I have no idea what I’m doing anymore.", type: "survivor" },
      { label: "I just started and would like to avoid all of the above.", type: "overthink" },
    ],
  },
  {
    question: "How confident are you that your resume is actually doing its job?",
    answers: [
      { label: "Very. She’s ready.", type: "interview" },
      { label: "Mostly… but I keep changing it.", type: "overthink" },
      { label: "Not even a little bit.", type: "apply" },
      { label: "I genuinely have no idea anymore.", type: "survivor" },
    ],
  },
  {
    question: "You get the dreaded “we’ve decided to move forward with another candidate…” email. You:",
    answers: [
      { label: "Shake it off. Next.", type: "apply" },
      { label: "Immediately wonder what I did wrong.", type: "overthink" },
      { label: "Question my entire career.", type: "survivor" },
      { label: "What email? I stopped opening those.", type: "interview" },
    ],
  },
  {
    question: "How would you describe your current job search strategy?",
    answers: [
      { label: "I have a plan and I’m sticking to it.", type: "interview" },
      { label: "Apply, refresh email, repeat.", type: "apply" },
      { label: "A little strategy. A little chaos.", type: "overthink" },
      { label: "Calling it a “strategy” feels generous.", type: "survivor" },
    ],
  },
];

const results: Record<AnswerType, { eyebrow: string; title: string; description: string }> = {
  apply: {
    eyebrow: "Your Job Search Type",
    title: "The Apply-and-Pray Applicant",
    description:
      "You are definitely putting yourself out there. The problem is, more applications do not always equal more results. A little more strategy before you hit Apply can make a very big difference.",
  },
  overthink: {
    eyebrow: "Your Job Search Type",
    title: "The Overthinking Optimizer",
    description:
      "You care about getting this right, which is great. But somewhere along the way, tweaking, researching and second-guessing may have become the strategy. We need to make this a whole lot simpler.",
  },
  interview: {
    eyebrow: "Your Job Search Type",
    title: "The Interview Almost-There",
    description:
      "You are getting traction, which means something is working. Now we need to figure out what is happening between getting in the room and getting the yes.",
  },
  survivor: {
    eyebrow: "Your Job Search Type",
    title: "The Job Search Survivor",
    description:
      "You have officially been through it. Applications, rejection emails, conflicting advice and probably at least one moment where you considered throwing your laptop across the room. You need a reset, not more noise.",
  },
};

const shellStyle: React.CSSProperties = {
  width: "min(1120px, calc(100% - 36px))",
  margin: "0 auto",
};

const cardStyle: React.CSSProperties = {
  borderRadius: "30px",
  background: "#f8f6f1",
  border: "1px solid rgba(255,255,255,0.82)",
  boxShadow: "0 28px 80px rgba(24,33,27,0.16)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #d9dfd8",
  borderRadius: "14px",
  background: "#ffffff",
  padding: "14px 15px",
  fontSize: "15px",
  color: "#26352b",
  outline: "none",
};

export default function JobSearchSurvivalGuideLandingPage() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [analyzingMessageIndex, setAnalyzingMessageIndex] = useState(0);

  const resultType = useMemo(() => {
    const counts: Record<AnswerType, number> = {
      apply: 0,
      overthink: 0,
      interview: 0,
      survivor: 0,
    };

    answers.forEach((answer) => {
      counts[answer] += 1;
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0][0] as AnswerType;
  }, [answers]);

  const result = results[resultType];
  const progress =
    screen === "quiz" ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  function startQuiz() {
    setError("");
    setCurrentQuestion(0);
    setAnswers([]);
    setFirstName("");
    setEmail("");
    setScreen("quiz");
  }

  function skipQuizAndGetGuide() {
    setError("");
    setFirstName("");
    setEmail("");
    setScreen("guide");
  }

  function chooseAnswer(answer: Answer) {
    const updatedAnswers = [...answers, answer.type];
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      return;
    }

    setScreen("analyzing");
    setAnalyzingMessageIndex(0);

    window.setTimeout(() => setAnalyzingMessageIndex(1), 1300);
    window.setTimeout(() => setAnalyzingMessageIndex(2), 2600);
    window.setTimeout(() => setScreen("result"), 4000);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanName = firstName.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail) {
      setError("Add your name and email so I know where to send it.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/job-search-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: cleanName,
          email: cleanEmail,
          resultType: screen === "guide" ? "direct" : resultType,
          resultTitle: screen === "guide" ? "Direct Guide Signup" : result.title,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "I couldn't send the guide just yet. Try that one more time.",
        );
      }

      setScreen("success");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Try that one more time.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 82% 8%, rgba(111,137,109,0.15), transparent 28%), linear-gradient(180deg, #f7f3ec 0%, #edf1eb 100%)",
        color: "#26352b",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid rgba(217,223,216,0.8)",
          background: "rgba(248,246,241,0.9)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div
          style={{
            ...shellStyle,
            minHeight: "78px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "#203126" }}>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "23px",
                letterSpacing: "0.08em",
              }}
            >
              JGO HIRE
            </div>
            <div
              style={{
                marginTop: "3px",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#758178",
              }}
            >
              Career Coach + Recruiter
            </div>
          </Link>

          <Link
            href="/"
            style={{
              color: "#667168",
              fontSize: "13px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Back to JGO Hire
          </Link>
        </div>
      </header>

      <section style={{ padding: "72px 0 90px" }}>
        <div style={shellStyle}>
          <div
            className="jgo-guide-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.9fr) minmax(440px, 1.1fr)",
              gap: "56px",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  color: "#61775f",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.17em",
                  textTransform: "uppercase",
                }}
              >
                Free JGO Hire Resource
              </p>

              <h1
                style={{
                  margin: "16px 0 0",
                  maxWidth: "620px",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(52px, 7vw, 86px)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.05em",
                  fontWeight: 500,
                  color: "#203126",
                }}
              >
                The Job Seeker
                <span
                  style={{
                    display: "block",
                    color: "#61775f",
                    fontStyle: "italic",
                  }}
                >
                  Survival Guide
                </span>
              </h1>

              <p
                style={{
                  margin: "24px 0 0",
                  maxWidth: "600px",
                  color: "#5e6a62",
                  fontSize: "18px",
                  lineHeight: 1.72,
                }}
              >
                Resumes. LinkedIn. Interviews. AI. Ghosting. Conflicting advice from
                approximately everyone on the internet. Let&apos;s make the modern job
                search make a little more sense.
              </p>

              <div style={{ marginTop: "32px", display: "grid", gap: "13px" }}>
                {[
                  "7 recruiter-backed survival rules",
                  "A quick job search reality check",
                  "A downloadable PDF you can keep",
                  "No corporate career-speak",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      color: "#405045",
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    <span
                      style={{
                        width: "27px",
                        height: "27px",
                        borderRadius: "999px",
                        background: "#dfe8db",
                        color: "#4d684f",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                      }}
                    >
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "38px",
                  paddingTop: "24px",
                  borderTop: "1px solid #d9dfd8",
                  color: "#7a857d",
                  fontSize: "13px",
                  lineHeight: 1.6,
                }}
              >
                Created by Jen, recruiter + career coach at JGO Hire. Career advice
                from someone who actually recruits.
              </div>
            </div>

            <div style={cardStyle}>
              {screen === "intro" && (
                <div style={{ padding: "48px 46px 42px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      borderRadius: "999px",
                      background: "#e6ece4",
                      color: "#526954",
                      padding: "9px 14px",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      marginBottom: "22px",
                    }}
                  >
                    30-Second Job Search Reality Check
                  </div>

                  <h2
                    style={{
                      margin: 0,
                      fontSize: "42px",
                      lineHeight: 1.05,
                      letterSpacing: "-0.035em",
                      fontWeight: 500,
                      color: "#203126",
                    }}
                  >
                    Okay, quick question… how&apos;s the job search{" "}
                    <em style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}>
                      actually
                    </em>{" "}
                    going?
                  </h2>

                  <p
                    style={{
                      margin: "22px 0 0",
                      fontSize: "17px",
                      lineHeight: 1.7,
                      color: "#6b756d",
                    }}
                  >
                    4 questions. No judgment. Mild recruiter commentary included.
                  </p>

                  <button
                    type="button"
                    onClick={startQuiz}
                    style={{
                      marginTop: "30px",
                      width: "100%",
                      border: "none",
                      borderRadius: "16px",
                      background: "#4e6b4f",
                      color: "#ffffff",
                      padding: "17px 20px",
                      fontSize: "16px",
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 8px 24px rgba(70,98,73,0.18)",
                    }}
                  >
                    Take the 30-second quiz →
                  </button>

                  <button
                    type="button"
                    onClick={skipQuizAndGetGuide}
                    style={{
                      marginTop: "14px",
                      width: "100%",
                      border: "none",
                      background: "transparent",
                      color: "#6f7a72",
                      fontSize: "13px",
                      lineHeight: 1.5,
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                      cursor: "pointer",
                    }}
                  >
                    I don&apos;t have 30 seconds. I&apos;m busy. Just send me the free guide →
                  </button>

                  <p
                    style={{
                      margin: "10px 0 0",
                      textAlign: "center",
                      fontSize: "12px",
                      color: "#939a94",
                    }}
                  >
                    No career crisis required.
                  </p>
                </div>
              )}

              {screen === "quiz" && (
                <div style={{ padding: "42px 46px 46px" }}>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "#78847b",
                        }}
                      >
                        Question {currentQuestion + 1} of {questions.length}
                      </span>
                      <span style={{ fontSize: "12px", color: "#9aa29c" }}>
                        {Math.round(progress)}%
                      </span>
                    </div>

                    <div
                      style={{
                        marginTop: "10px",
                        height: "7px",
                        borderRadius: "999px",
                        background: "#e3e7e1",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${progress}%`,
                          background: "#728872",
                          borderRadius: "999px",
                          transition: "width 0.35s ease",
                        }}
                      />
                    </div>
                  </div>

                  <h2
                    style={{
                      margin: "32px 0 0",
                      fontSize: "31px",
                      lineHeight: 1.18,
                      letterSpacing: "-0.025em",
                      fontWeight: 500,
                      color: "#213128",
                    }}
                  >
                    {questions[currentQuestion].question}
                  </h2>

                  <div style={{ display: "grid", gap: "12px", marginTop: "26px" }}>
                    {questions[currentQuestion].answers.map((answer) => (
                      <button
                        key={answer.label}
                        type="button"
                        onClick={() => chooseAnswer(answer)}
                        style={{
                          width: "100%",
                          border: "1px solid #dde3dc",
                          borderRadius: "16px",
                          background: "#ffffff",
                          padding: "16px 18px",
                          textAlign: "left",
                          fontSize: "15px",
                          lineHeight: 1.5,
                          color: "#344137",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "14px",
                        }}
                      >
                        <span>{answer.label}</span>
                        <span style={{ color: "#89968c" }}>→</span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setScreen("intro")}
                    style={{
                      marginTop: "18px",
                      border: "none",
                      background: "transparent",
                      color: "#89938c",
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Back
                  </button>
                </div>
              )}

              {screen === "analyzing" && (
                <div
                  style={{
                    minHeight: "470px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "48px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "62px",
                      height: "62px",
                      borderRadius: "999px",
                      background: "#e6ece4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "26px",
                    }}
                  >
                    …
                  </div>

                  <h2
                    style={{
                      margin: "24px 0 0",
                      fontSize: "34px",
                      fontWeight: 500,
                      letterSpacing: "-0.03em",
                      color: "#213128",
                    }}
                  >
                    Okay. I&apos;ve seen enough.
                  </h2>

                  <p
                    style={{
                      margin: "12px 0 0",
                      color: "#6b756d",
                      fontSize: "16px",
                    }}
                  >
                    Calculating your highly scientific job search diagnosis...
                  </p>

                  <div
                    aria-live="polite"
                    style={{
                      marginTop: "28px",
                      minHeight: "24px",
                      color: "#969d97",
                      fontSize: "14px",
                      lineHeight: 1.5,
                    }}
                  >
                    {analyzingMessageIndex === 0 && <span>Analyzing the chaos...</span>}
                    {analyzingMessageIndex === 1 && <span>Reviewing career decisions...</span>}
                    {analyzingMessageIndex === 2 && <span>Consulting a recruiter...</span>}
                  </div>
                </div>
              )}

              {screen === "guide" && (
                <div style={{ padding: "48px 46px 44px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      borderRadius: "999px",
                      background: "#e6ece4",
                      color: "#526954",
                      padding: "9px 14px",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      marginBottom: "22px",
                    }}
                  >
                    Skip the Quiz
                  </div>

                  <h2
                    style={{
                      margin: 0,
                      fontSize: "40px",
                      lineHeight: 1.05,
                      letterSpacing: "-0.035em",
                      fontWeight: 500,
                      color: "#203126",
                    }}
                  >
                    Fine. I&apos;ll save you the 30 seconds.
                  </h2>

                  <p
                    style={{
                      margin: "18px 0 0",
                      fontSize: "16px",
                      lineHeight: 1.7,
                      color: "#687269",
                    }}
                  >
                    Drop your info below and I&apos;ll send the JGO Hire Job Seeker Survival Guide straight to your inbox.
                  </p>

                  <div
                    style={{
                      marginTop: "22px",
                      padding: "18px 20px",
                      borderRadius: "18px",
                      background: "#eaf0e8",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: "#334239",
                        fontSize: "14px",
                        lineHeight: 1.6,
                      }}
                    >
                      No quiz required. No judgment either. You clearly have places to be.
                    </p>
                  </div>

                  <GuideForm
                    firstName={firstName}
                    setFirstName={setFirstName}
                    email={email}
                    setEmail={setEmail}
                    error={error}
                    isSubmitting={isSubmitting}
                    handleSubmit={handleSubmit}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setScreen("intro");
                    }}
                    style={{
                      marginTop: "12px",
                      width: "100%",
                      border: "none",
                      background: "transparent",
                      color: "#7d8780",
                      padding: "4px 0",
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    Actually, I&apos;ll take the quiz.
                  </button>
                </div>
              )}

              {screen === "result" && (
                <div style={{ padding: "46px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#718272",
                    }}
                  >
                    {result.eyebrow}
                  </span>

                  <h2
                    style={{
                      margin: "10px 0 0",
                      fontSize: "40px",
                      lineHeight: 1.05,
                      letterSpacing: "-0.035em",
                      fontWeight: 500,
                      color: "#213128",
                    }}
                  >
                    {result.title}
                  </h2>

                  <p
                    style={{
                      margin: "20px 0 0",
                      fontSize: "16px",
                      lineHeight: 1.7,
                      color: "#687269",
                    }}
                  >
                    {result.description}
                  </p>

                  <div
                    style={{
                      marginTop: "24px",
                      padding: "20px",
                      borderRadius: "18px",
                      background: "#eaf0e8",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        lineHeight: 1.55,
                        fontWeight: 700,
                        color: "#2e3d31",
                      }}
                    >
                      Whatever your result, the fix starts in the same place: a smarter job search strategy.
                    </p>
                    <p
                      style={{
                        margin: "8px 0 0",
                        fontSize: "14px",
                        lineHeight: 1.55,
                        color: "#687269",
                      }}
                    >
                      I put together a free guide to help you get more intentional about your search, without making job hunting your entire personality.
                    </p>
                  </div>

                  <GuideForm
                    firstName={firstName}
                    setFirstName={setFirstName}
                    email={email}
                    setEmail={setEmail}
                    error={error}
                    isSubmitting={isSubmitting}
                    handleSubmit={handleSubmit}
                  />
                </div>
              )}

              {screen === "success" && (
                <div
                  style={{
                    minHeight: "470px",
                    padding: "48px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "62px",
                      height: "62px",
                      borderRadius: "999px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#e4ece2",
                      fontSize: "25px",
                      color: "#4d684f",
                    }}
                  >
                    ✓
                  </div>

                  <h2
                    style={{
                      margin: "22px 0 0",
                      fontSize: "36px",
                      fontWeight: 500,
                      letterSpacing: "-0.03em",
                      color: "#213128",
                    }}
                  >
                    It&apos;s on the way.
                  </h2>

                  <p
                    style={{
                      margin: "14px 0 0",
                      maxWidth: "400px",
                      fontSize: "16px",
                      lineHeight: 1.65,
                      color: "#687269",
                    }}
                  >
                    Check your inbox. Your Job Seeker Survival Guide is on the way. And maybe check your spam folder too because apparently email providers love making things difficult.
                  </p>

                  <Link
                    href="/"
                    style={{
                      marginTop: "28px",
                      border: "1px solid #d8ded7",
                      borderRadius: "13px",
                      background: "#ffffff",
                      color: "#4d6247",
                      padding: "12px 18px",
                      fontSize: "14px",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    Back to JGO Hire
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "74px 0", background: "#223028", color: "white" }}>
        <div
          className="jgo-bottom-grid"
          style={{
            ...shellStyle,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "56px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                color: "#b4c6ae",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              Why JGO Hire
            </p>
            <h2
              style={{
                margin: "12px 0 0",
                maxWidth: "520px",
                fontFamily: "Georgia, serif",
                fontSize: "clamp(38px, 5vw, 58px)",
                lineHeight: 1.02,
                fontWeight: 500,
                letterSpacing: "-0.04em",
              }}
            >
              Career advice from someone who has actually sat on the other side of the table.
            </h2>
          </div>

          <div style={{ color: "#c6d0c8", fontSize: "16px", lineHeight: 1.75 }}>
            <p style={{ margin: 0 }}>
              I&apos;m a recruiter and career coach. I&apos;ve spent years reviewing resumes, interviewing candidates and watching hiring decisions happen in real time.
            </p>
            <p style={{ margin: "16px 0 0" }}>
              The guide gives you a place to start. If you get through it and think, <em>“Okay Jen, but what do I do with MY situation?”</em> that&apos;s where working together comes in.
            </p>
            <Link
              href="/#services"
              style={{
                marginTop: "24px",
                display: "inline-flex",
                color: "#ffffff",
                fontWeight: 700,
                textDecoration: "none",
                borderBottom: "1px solid #91a48e",
                paddingBottom: "4px",
              }}
            >
              See How We Can Work Together →
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 860px) {
          .jgo-guide-grid,
          .jgo-bottom-grid {
            grid-template-columns: 1fr !important;
          }

          .jgo-guide-grid {
            gap: 38px !important;
          }
        }

        @media (max-width: 560px) {
          .jgo-guide-grid > div:last-child {
            border-radius: 22px !important;
          }

          .jgo-guide-grid > div:last-child > div {
            padding-left: 22px !important;
            padding-right: 22px !important;
          }
        }
      `}</style>
    </main>
  );
}

type GuideFormProps = {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  isSubmitting: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

function GuideForm({
  firstName,
  setFirstName,
  email,
  setEmail,
  error,
  isSubmitting,
  handleSubmit,
}: GuideFormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "24px", display: "grid", gap: "12px" }}
    >
      <input
        type="text"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        placeholder="First name"
        autoComplete="given-name"
        style={inputStyle}
      />
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email address"
        autoComplete="email"
        style={inputStyle}
      />

      {error && (
        <p
          style={{
            margin: 0,
            padding: "12px 14px",
            borderRadius: "12px",
            background: "#f8eaea",
            fontSize: "13px",
            lineHeight: 1.5,
            color: "#a14848",
          }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: "100%",
          border: "none",
          borderRadius: "16px",
          background: isSubmitting ? "#829184" : "#4e6b4f",
          color: "#ffffff",
          padding: "16px",
          fontSize: "16px",
          fontWeight: 700,
          cursor: isSubmitting ? "not-allowed" : "pointer",
          opacity: isSubmitting ? 0.8 : 1,
        }}
      >
        {isSubmitting ? "Sending..." : "Send Me the Guide →"}
      </button>

      <p
        style={{
          margin: "2px 0 0",
          textAlign: "center",
          color: "#939a94",
          fontSize: "11px",
          lineHeight: 1.5,
        }}
      >
        Useful career advice only. No inbox nonsense.
      </p>
    </form>
  );
}
