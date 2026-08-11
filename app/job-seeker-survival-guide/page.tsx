import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Job Seeker Survival Guide | JGO Hire",
  description:
    "The JGO Hire Job Seeker Survival Guide: how to navigate the modern job search without losing your mind.",
  robots: {
    index: false,
    follow: false,
  },
};

const rules = [
  {
    number: "01",
    title: "Stop measuring your job search by how many jobs you apply to.",
    body: [
      "There is nothing inherently impressive about submitting 75 applications.",
      "If 70 of them are jobs you are barely qualified for, do not actually want, or applied to without taking five minutes to understand the company, you are creating activity, not necessarily progress.",
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
    body: [
      "And no, its job is not to tell your entire life story.",
      "Its job is to make someone think: “I want to talk to this person.” That's it.",
      "A recruiter may initially look at your resume for seconds, not minutes. Make those seconds easy.",
    ],
    checklistTitle: "Your resume should quickly answer:",
    checklist: [
      "What do you do?",
      "What are you good at?",
      "What have you actually accomplished?",
      "Why does your background make sense for this job?",
    ],
    reality:
      "If the top third is clear, your recent experience is relevant, your bullets show impact, and a human can actually read it, stop editing it for the 47th time.",
  },
  {
    number: "03",
    title: "Please stop trying to beat the ATS.",
    body: [
      "Somewhere along the way, job seekers became convinced there is a mysterious robot standing between them and employment.",
      "Applicant tracking systems are real. But stuffing your resume with invisible keywords, copying an entire job description into the footer, or asking AI to turn every sentence into corporate word salad is not the strategy.",
      "Think alignment, not gaming the system.",
    ],
    checklistTitle: "If the role keeps asking for these things:",
    checklist: [
      "Project Management",
      "Stakeholder Management",
      "Salesforce",
      "B2B SaaS",
    ],
    reality:
      "And you genuinely have that experience? Those things should probably be easy to find on your resume. That's not tricking an ATS. That's communicating clearly.",
  },
  {
    number: "04",
    title: "LinkedIn is part of your resume now.",
    body: [
      "Someone is probably going to look you up. Make sure what they find supports the story your resume is telling.",
      "You do not need to become a LinkedIn influencer. You can simply have a strong profile, engage thoughtfully, and connect with people in your industry.",
    ],
    checklistTitle: "At minimum, check:",
    checklist: [
      "Photo: current, clear, and professional.",
      "Headline: tell me what you do, not just your current title.",
      "About: give me context about who you are professionally and what you do well.",
      "Experience: it should generally align with your resume.",
      "Dates: please make sure your LinkedIn and resume dates match. Recruiters notice.",
    ],
    reality:
      "You also do not need to wake up at 6:00 AM and write, “I've been thinking a lot about leadership...” Strong and accurate is enough.",
  },
  {
    number: "05",
    title: "Applying is only one lane of the job search.",
    body: [
      "Yes, apply to jobs. But also reconnect with former coworkers, message people you genuinely know, talk to recruiters, follow companies you care about, and tell people you are looking.",
      "A surprising number of job seekers quietly search for six months while telling approximately nobody.",
    ],
    checklistTitle: "Try this:",
    checklist: [
      "Hey! I'm starting to explore new opportunities in [AREA]. If you happen to hear of anything that feels aligned with my background in [X/Y], I'd love to be on your radar.",
    ],
    reality:
      "Normal. Human. No awkward begging required. People cannot help you if they do not know you are looking.",
  },
  {
    number: "06",
    title: "Getting the interview is not the finish line.",
    body: [
      "If you are getting interviews but not offers, that is actually useful information. Your resume is probably doing its job. Now we look at the interview.",
      "One of the biggest mistakes candidates make is preparing to answer questions instead of preparing to tell their story.",
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
      "You cannot predict every question. You can prepare the stories you want to tell. And yes, have questions. You are interviewing them too.",
  },
  {
    number: "07",
    title: "Use AI. Just don't let AI turn you into a robot.",
    body: [
      "AI can be incredibly helpful during a job search. Use it to get organized, practice, research, and improve clarity.",
      "But if your cover letter begins, “I am writing to express my enthusiastic interest in the esteemed position...” we have a problem.",
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

const applicationCheck = [
  ["2 MINUTES", "Read the actual job description."],
  ["3 MINUTES", "Identify the 3 to 5 things they seem to care about most."],
  ["5 MINUTES", "Look at your resume. Are those things obvious if you genuinely have them?"],
  ["2 MINUTES", "Check the company and role on LinkedIn."],
  ["2 MINUTES", "Look for a relevant connection, recruiter, or hiring team member."],
  ["1 MINUTE", "Proofread. Then apply."],
];

export default function JobSeekerSurvivalGuidePage() {
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
              href="/downloads/JGO-Hire-Job-Seeker-Survival-Guide.pdf"
              download
            >
              Download PDF
            </a>
            <Link href="/" className={styles.backLink}>
              Back to JGO Hire
            </Link>
          </div>
        </div>
      </header>

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

      <section className={styles.realitySection}>
        <div className={styles.narrowShell}>
          <p className={styles.eyebrow}>First, a reality check</p>
          <h2>The job search is weird right now.</h2>

          <div className={styles.leadCopy}>
            <p>
              If you&apos;ve been applying to jobs and wondering whether you&apos;re
              doing something wrong, welcome to the modern job search.
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
              <li>You do not need to completely rewrite your resume every time.</li>
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
          <div className={styles.rulesHeading}>
            <p className={styles.eyebrow}>The Survival Rules</p>
            <h2>Seven things I want you to know before your next application.</h2>
          </div>

          <div className={styles.rulesList}>
            {rules.map((rule) => (
              <article key={rule.number} className={styles.ruleCard}>
                <div className={styles.ruleNumber}>{rule.number}</div>

                <div className={styles.ruleContent}>
                  <p className={styles.ruleLabel}>Survival Rule #{Number(rule.number)}</p>
                  <h3>{rule.title}</h3>

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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.applicationSection}>
        <div className={styles.shell}>
          <div className={styles.applicationCard}>
            <div className={styles.applicationIntro}>
              <p className={styles.eyebrow}>Steal This</p>
              <h2>The JGO Hire 15-Minute Job Application Check</h2>
              <p>
                You do not need a two-hour resume rewrite every time you see a
                job you like. Give yourself 15 focused minutes instead.
              </p>
            </div>

            <div className={styles.applicationSteps}>
              {applicationCheck.map(([time, text], index) => (
                <div key={time} className={styles.applicationStep}>
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{time}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>

            <div className={styles.applyNow}>No two-hour resume rewrite required.</div>
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
            <p>You don&apos;t need to follow every piece of career advice on the internet.</p>
            <p>You don&apos;t need to completely reinvent yourself.</p>
            <p>
              And you don&apos;t need to interpret every rejection as proof that
              your career is doomed.
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
              Resume Strategy <span>•</span> Interview Coaching <span>•</span>
              Job Search Strategy <span>•</span> LinkedIn Optimization <span>•</span>
              Career Coaching
            </div>

            <div className={styles.nextActions}>
              <Link href="/contact" className={styles.primaryCta}>
                Work With Me →
              </Link>
              <a
                href="/downloads/JGO-Hire-Job-Seeker-Survival-Guide.pdf"
                download
                className={styles.secondaryCta}
              >
                Download the PDF
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
