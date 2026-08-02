import Link from "next/link";

const experienceCards = [
  {
    eyebrow: "Career Coaching",
    title: "Certified in NLP-based coaching.",
    description:
      "Jen is certified in Career Coaching using NLP techniques, helping clients communicate clearly, build confidence, and present themselves more effectively.",
  },
  {
    eyebrow: "Recruiting Experience",
    title: "From Fortune 100 companies to startups.",
    description:
      "Jen has partnered with Fortune 100 organizations, high-growth startups, and small businesses across multiple industries and functions.",
  },
  {
    eyebrow: "Hiring Strategy",
    title: "Entry level through executive search.",
    description:
      "Her recruiting work has supported searches ranging from entry-level roles through executive leadership.",
  },
];

const highlights = [
  "Recognized with industry awards for recruiting excellence",
  "Invited to speak on recruiting and hiring panels",
  "Selected for talent strategy and hiring best-practice projects",
  "Consulted with organizations on recruiting process and candidate experience",
  "Helped candidates navigate resumes, interviews, offers, and career transitions",
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <header className="contact-header">
        <div className="site-shell contact-header-inner">
          <Link href="/" className="contact-logo">
            <span>JGO HIRE</span>
            <small>Career Coach + Recruiter</small>
          </Link>

          <Link href="/" className="contact-back-link">
            Back to Home
          </Link>
        </div>
      </header>

      <section className="about-hero">
        <div className="site-shell about-hero-grid">
          <div className="about-hero-copy">
            <p className="eyebrow">About Jen</p>

            <h1>The strategy behind JGO Hire.</h1>

            <p className="about-hero-lead">
              Recruiter. Certified Career Coach. Hiring insider.
            </p>

            <p>
              Jen is a Certified Career Coach and agency recruiter with nearly
              a decade of experience on both sides of the hiring process.
            </p>

            <p>
              She created JGO Hire to give job seekers access to the same
              insight most people only get if they happen to know someone in
              recruiting.
            </p>

            <p className="about-hero-emphasis">Now you do.</p>

            <div className="about-hero-actions">
              <Link href="/contact" className="button button-primary">
                Book a Consultation
              </Link>

              <a
                href="https://www.linkedin.com/in/jennifergordon23/"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>

          <div className="about-photo-area">
            <div className="about-photo-frame">
              <img
                src="https://images.squarespace-cdn.com/content/v1/6a25df4e5b314b5b3136f476/717c5d1a-c8c2-47f3-9a31-d897286e94b7/Untitled+design.PNG?format=1000w"
                alt="Jen Gordon"
                className="about-photo"
              />
            </div>

            <div className="about-photo-badge about-photo-badge-one">
              Recruiter Perspective
            </div>

            <div className="about-photo-badge about-photo-badge-two">
              Certified Career Coach
            </div>
          </div>
        </div>
      </section>

      <section className="about-perspective-section">
        <div className="site-shell">
          <div className="about-perspective-card">
            <p className="eyebrow">Why JGO Hire</p>

            <h2>Guidance built from both sides of hiring.</h2>

            <p>
              The guidance Jen provides is not based on theory. It is based on
              thousands of conversations with candidates, hiring managers, and
              executives.
            </p>

            <p>
              It comes from years of reviewing resumes, conducting interviews,
              negotiating offers, and helping people navigate the job market
              from both sides.
            </p>
          </div>
        </div>
      </section>

      <section className="about-experience-section">
        <div className="site-shell">
          <div className="about-section-heading">
            <p className="eyebrow">Experience That Matters</p>
            <h2>Practical insight, not generic career advice.</h2>
          </div>

          <div className="about-experience-grid">
            {experienceCards.map((card) => (
              <article key={card.title} className="about-experience-card">
                <p className="about-card-eyebrow">{card.eyebrow}</p>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-beyond-section">
        <div className="site-shell about-beyond-grid">
          <div className="about-beyond-copy">
            <p className="eyebrow">Beyond the Resume</p>

            <h2>Career support shaped by real hiring experience.</h2>

            <p>
              Jen understands what employers are evaluating, what candidates
              struggle to communicate, and where job searches often lose
              momentum.
            </p>
          </div>

          <div className="about-highlight-list">
            {highlights.map((highlight) => (
              <div key={highlight} className="about-highlight-item">
                <span aria-hidden="true">✓</span>
                <p>{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-closing-section">
        <div className="site-shell">
          <div className="about-closing-card">
            <p className="eyebrow">The Reason Behind JGO Hire</p>

            <h2>You should not have to figure this out through trial and error.</h2>

            <p>
              Most job seekers are expected to navigate resumes, LinkedIn,
              interviews, networking, salary conversations, and career
              decisions without an inside perspective.
            </p>

            <p>
              JGO Hire was built to change that. Jen is here for every step of
              the job search, and everything in between.
            </p>

            <Link href="/contact" className="button button-light">
              Start the Conversation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}