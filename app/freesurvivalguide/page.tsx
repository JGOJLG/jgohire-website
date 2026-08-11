"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type AnswerType = "apply" | "overthink" | "interview" | "survivor";
type Screen = "intro" | "quiz" | "analyzing" | "result" | "guide" | "success";
type Answer = { label: string; type: AnswerType };
type QuizQuestion = { question: string; answers: Answer[] };

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
      { label: "Calling it a ‘strategy’ feels generous.", type: "survivor" },
    ],
  },
];

const results: Record<AnswerType, { title: string; description: string }> = {
  apply: { title: "The Apply-and-Pray Applicant", description: "You are definitely putting yourself out there. The problem is, more applications do not always equal more results. A little more strategy before you hit Apply can make a very big difference." },
  overthink: { title: "The Overthinking Optimizer", description: "You care about getting this right, which is great. But somewhere along the way, tweaking, researching and second-guessing may have become the strategy. We need to make this a whole lot simpler." },
  interview: { title: "The Interview Almost-There", description: "You are getting traction, which means something is working. Now we need to figure out what is happening between getting in the room and getting the yes." },
  survivor: { title: "The Job Search Survivor", description: "You have officially been through it. Applications, rejection emails, conflicting advice and probably at least one moment where you considered throwing your laptop across the room. You need a reset, not more noise." },
};

const inputStyle: React.CSSProperties = { width: "100%", boxSizing: "border-box", border: "1px solid #d9dfd8", borderRadius: "14px", background: "#fff", padding: "14px 15px", fontSize: "15px", color: "#26352b", outline: "none" };

export default function FreeSurvivalGuidePage() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [analyzingMessageIndex, setAnalyzingMessageIndex] = useState(0);

  const resultType = useMemo(() => {
    const counts: Record<AnswerType, number> = { apply: 0, overthink: 0, interview: 0, survivor: 0 };
    answers.forEach((answer) => { counts[answer] += 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as AnswerType;
  }, [answers]);
  const result = results[resultType];
  const progress = screen === "quiz" ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  function startQuiz() { setError(""); setCurrentQuestion(0); setAnswers([]); setFirstName(""); setEmail(""); setScreen("quiz"); }
  function skipQuiz() { setError(""); setFirstName(""); setEmail(""); setScreen("guide"); }
  function chooseAnswer(answer: Answer) {
    setAnswers((previous) => [...previous, answer.type]);
    if (currentQuestion < questions.length - 1) { setCurrentQuestion((previous) => previous + 1); return; }
    setScreen("analyzing"); setAnalyzingMessageIndex(0);
    window.setTimeout(() => setAnalyzingMessageIndex(1), 1300);
    window.setTimeout(() => setAnalyzingMessageIndex(2), 2600);
    window.setTimeout(() => setScreen("result"), 4000);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = firstName.trim(); const cleanEmail = email.trim();
    if (!cleanName || !cleanEmail) { setError("Add your name and email so I know where to send it."); return; }
    setIsSubmitting(true); setError("");
    try {
      const response = await fetch("/api/job-search-guide", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ firstName: cleanName, email: cleanEmail, resultType: screen === "guide" ? "direct" : resultType, resultTitle: screen === "guide" ? "Direct Guide Signup" : result.title }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "I couldn't send the guide just yet. Try that one more time.");
      setScreen("success");
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong. Try that one more time."); }
    finally { setIsSubmitting(false); }
  }

  const form = (
    <form onSubmit={handleSubmit} style={{ marginTop: "24px", display: "grid", gap: "12px" }}>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" autoComplete="given-name" style={inputStyle} />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" autoComplete="email" style={inputStyle} />
      {error && <p style={{ margin: 0, padding: "12px 14px", borderRadius: "12px", background: "#f8eaea", color: "#a14848", fontSize: "13px" }}>{error}</p>}
      <button type="submit" disabled={isSubmitting} style={{ border: "none", borderRadius: "16px", background: isSubmitting ? "#829184" : "#4e6b4f", color: "#fff", padding: "16px", fontSize: "16px", fontWeight: 700, cursor: isSubmitting ? "not-allowed" : "pointer" }}>{isSubmitting ? "Sending..." : "Send Me the Guide →"}</button>
      <p style={{ margin: 0, textAlign: "center", color: "#939a94", fontSize: "11px" }}>Useful career advice only. No inbox nonsense.</p>
    </form>
  );

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(180deg,#f7f3ec 0%,#edf1eb 100%)", color: "#26352b" }}>
      <header style={{ borderBottom: "1px solid #d9dfd8", background: "rgba(248,246,241,.9)" }}><div style={{ width: "min(1120px,calc(100% - 36px))", margin: "0 auto", minHeight: "78px", display: "flex", alignItems: "center", justifyContent: "space-between" }}><Link href="/" style={{ textDecoration: "none", color: "#203126" }}><div style={{ fontFamily: "Georgia,serif", fontSize: "23px", letterSpacing: ".08em" }}>JGO HIRE</div><div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#758178" }}>Career Coach + Recruiter</div></Link><Link href="/" style={{ color: "#667168", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>Back to JGO Hire</Link></div></header>
      <section style={{ padding: "72px 18px 90px" }}><div style={{ width: "min(1120px,100%)", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,430px),1fr))", gap: "56px", alignItems: "center" }}>
        <div><p style={{ margin: 0, color: "#61775f", fontSize: "11px", fontWeight: 800, letterSpacing: ".17em", textTransform: "uppercase" }}>Free JGO Hire Resource</p><h1 style={{ margin: "16px 0 0", fontFamily: "Georgia,serif", fontSize: "clamp(48px,7vw,82px)", lineHeight: .96, letterSpacing: "-.05em", fontWeight: 500, color: "#203126" }}>The Job Seeker <span style={{ display: "block", color: "#61775f", fontStyle: "italic" }}>Survival Guide</span></h1><p style={{ margin: "24px 0 0", color: "#5e6a62", fontSize: "18px", lineHeight: 1.72 }}>Resumes. LinkedIn. Interviews. AI. Ghosting. Conflicting advice from approximately everyone on the internet. Let&apos;s make the modern job search make a little more sense.</p><p style={{ margin: "28px 0 0", color: "#405045", fontWeight: 700 }}>7 recruiter-backed survival rules · 30-second quiz · downloadable PDF</p></div>
        <div style={{ borderRadius: "30px", background: "#f8f6f1", boxShadow: "0 28px 80px rgba(24,33,27,.16)", overflow: "hidden" }}>
          {screen === "intro" && <div style={{ padding: "48px 40px" }}><p style={{ color: "#526954", fontSize: "11px", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}>30-Second Job Search Reality Check</p><h2 style={{ fontSize: "40px", lineHeight: 1.05, fontWeight: 500, color: "#203126" }}>Okay, quick question… how&apos;s the job search <em>actually</em> going?</h2><p style={{ color: "#6b756d", lineHeight: 1.7 }}>4 questions. No judgment. Mild recruiter commentary included.</p><button onClick={startQuiz} style={{ marginTop: "20px", width: "100%", border: "none", borderRadius: "16px", background: "#4e6b4f", color: "white", padding: "17px", fontWeight: 700, cursor: "pointer" }}>Take the 30-second quiz →</button><button onClick={skipQuiz} style={{ marginTop: "14px", width: "100%", border: "none", background: "transparent", color: "#6f7a72", textDecoration: "underline", cursor: "pointer" }}>I don&apos;t have 30 seconds. I&apos;m busy. Just send me the free guide →</button><p style={{ textAlign: "center", color: "#939a94", fontSize: "12px" }}>No career crisis required.</p></div>}
          {screen === "quiz" && <div style={{ padding: "42px 40px" }}><p style={{ color: "#78847b", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}>Question {currentQuestion + 1} of {questions.length}</p><div style={{ height: "7px", borderRadius: "999px", background: "#e3e7e1" }}><div style={{ height: "100%", width: `${progress}%`, background: "#728872", borderRadius: "999px" }} /></div><h2 style={{ marginTop: "30px", fontSize: "30px", color: "#213128" }}>{questions[currentQuestion].question}</h2><div style={{ display: "grid", gap: "12px" }}>{questions[currentQuestion].answers.map((answer) => <button key={answer.label} onClick={() => chooseAnswer(answer)} style={{ border: "1px solid #dde3dc", borderRadius: "16px", background: "white", padding: "16px 18px", textAlign: "left", fontSize: "15px", color: "#344137", cursor: "pointer" }}>{answer.label} →</button>)}</div></div>}
          {screen === "analyzing" && <div style={{ minHeight: "440px", display: "grid", placeItems: "center", padding: "40px", textAlign: "center" }}><div><h2 style={{ fontSize: "34px", color: "#213128" }}>Okay. I&apos;ve seen enough.</h2><p style={{ color: "#6b756d" }}>{["Analyzing the chaos...", "Reviewing career decisions...", "Consulting a recruiter..."][analyzingMessageIndex]}</p></div></div>}
          {screen === "result" && <div style={{ padding: "46px 40px" }}><p style={{ color: "#718272", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}>Your Job Search Type</p><h2 style={{ fontSize: "40px", color: "#213128", lineHeight: 1.05 }}>{result.title}</h2><p style={{ color: "#687269", lineHeight: 1.7 }}>{result.description}</p><div style={{ marginTop: "22px", padding: "18px", borderRadius: "18px", background: "#eaf0e8" }}>Whatever your result, the fix starts in the same place: a smarter job search strategy.</div>{form}</div>}
          {screen === "guide" && <div style={{ padding: "46px 40px" }}><p style={{ color: "#526954", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}>Skip the Quiz</p><h2 style={{ fontSize: "40px", color: "#203126", lineHeight: 1.05 }}>Fine. I&apos;ll save you the 30 seconds.</h2><p style={{ color: "#687269", lineHeight: 1.7 }}>Drop your info below and I&apos;ll send the JGO Hire Job Seeker Survival Guide straight to your inbox.</p>{form}<button onClick={() => setScreen("intro")} style={{ marginTop: "12px", width: "100%", border: "none", background: "transparent", color: "#7d8780", textDecoration: "underline", cursor: "pointer" }}>Actually, I&apos;ll take the quiz.</button></div>}
          {screen === "success" && <div style={{ minHeight: "440px", display: "grid", placeItems: "center", padding: "40px", textAlign: "center" }}><div><div style={{ fontSize: "30px", color: "#4d684f" }}>✓</div><h2 style={{ fontSize: "36px", color: "#213128" }}>It&apos;s on the way.</h2><p style={{ color: "#687269", lineHeight: 1.65 }}>Check your inbox. Your Job Seeker Survival Guide is on the way. And maybe check your spam folder too because apparently email providers love making things difficult.</p></div></div>}
        </div>
      </div></section>
    </main>
  );
}
