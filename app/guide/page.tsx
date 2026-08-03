import Image from "next/image";
import Link from "next/link";
import styles from "./guide.module.css";

const modules = [
  {
    number: "01",
    title: "Start Here",
    lessons: [
      "Introduction",
      "About the Author",
      "Mindset",
      "AI Tips",
      "How Networking Actually Works on LinkedIn",
    ],
  },
  {
    number: "02",
    title: "Build Your Profile",
    lessons: [
      "Profile Photo",
      "Banner Photo",
      "Headline",
      "Your Location",
      "About Section",
      "Experience",
      "Education",
      "Volunteer Experience",
    ],
  },
  {
    number: "03",
    title: "Stand Out",
    lessons: [
      "Certifications, Projects & Publications",
      "Skills",
      "Recommendations",
      "Open to Work",
      "Connections",
      "Additional Sections",
    ],
  },
  {
    number: "04",
    title: "Finish Strong",
    lessons: ["Wrap Up", "Bonus Content"],
  },
];

const faqs = [
  {
    question: "Do I need experience with AI?",
    answer:
      "No. The guide is beginner-friendly and walks you through how to use AI in a simple, strategic way.",
  },
  {
    question: "Will my profile sound like AI wrote it?",
    answer:
      "No. You will use AI to strengthen your wording while keeping your profile clear, credible, and true to your voice.",
  },
  {
    question: "Is this only for active job seekers?",
    answer:
      "No. It is useful for anyone who wants a stronger LinkedIn presence before the right opportunity comes along.",
  },
  {
    question: "How is this different from asking ChatGPT?",
    answer:
      "ChatGPT can give you words. This guide gives you recruiter-backed strategy for every section of your profile.",
  },
  {
    question: "I already have LinkedIn. Do I still need this?",
    answer:
      "Yes, if your profile feels outdated, unclear, generic, or disconnected from the roles you want.",
  },
];

export default function LinkedInGuidePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.shell}>
          <Link href="/" className={styles.logo}>
            <span>JGO HIRE</span>
            <small>Career Coach + Recruiter</small>
          </Link>

          <nav className={styles.nav} aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/testimonials">Testimonials</Link>
          </nav>

          <Link href="/resources" className={styles.backLink}>
            Back to Resources
          </Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.shell}>
          <div className={styles.heroImageWrap}>
            <Image
              src="/linkedin-guide-hero.png"
              alt="How to Use AI to Optimize Your LinkedIn Profile"
              width={1600}
              height={1000}
              priority
              className={styles.heroImage}
            />
          </div>

          <div className={styles.heroBottom}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>LinkedIn Optimization Guide</p>

              <h1>Build a profile recruiters actually notice.</h1>

              <p>
                A simple, recruiter-backed guide to optimizing your LinkedIn
                profile with AI without sounding like AI.
              </p>
            </div>

            <div className={styles.priceCard} id="buy">
              <span className={styles.valueLabel}>Limited-Time Price</span>

              <div className={styles.priceRow}>
                <span className={styles.oldPrice}>$500</span>
                <strong>$23</strong>
              </div>

              <p>One payment. Lifetime access.</p>

              <a href="#course-preview" className={styles.primaryButton}>
                See What&apos;s Inside
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.quickSection}>
        <div className={styles.shell}>
          <div className={styles.quickGrid}>
            <div>
              <span>01</span>
              <p>Recruiter-backed strategy</p>
            </div>

            <div>
              <span>02</span>
              <p>Simple AI guidance</p>
            </div>

            <div>
              <span>03</span>
              <p>Every LinkedIn section</p>
            </div>

            <div>
              <span>04</span>
              <p>Lifetime access</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.previewSection} id="course-preview">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Inside the Guide</p>
            <h2>Everything you need. Nothing you don&apos;t.</h2>
            <p>Open each section to preview the complete guide.</p>
          </div>

          <div className={styles.moduleList}>
            {modules.map((module, index) => (
              <details
                className={styles.module}
                key={module.title}
                open={index === 0}
              >
                <summary>
                  <span className={styles.moduleNumber}>{module.number}</span>

                  <span className={styles.moduleTitle}>{module.title}</span>

                  <span className={styles.lessonCount}>
                    {module.lessons.length} lessons
                  </span>

                  <span className={styles.moduleIcon}>+</span>
                </summary>

                <div className={styles.lessons}>
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div className={styles.lesson} key={lesson}>
                      <span>
                        {String(lessonIndex + 1).padStart(2, "0")}
                      </span>
                      <p>{lesson}</p>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.midCtaSection}>
        <div className={styles.shell}>
          <div className={styles.midCta}>
            <div>
              <p className={styles.eyebrow}>Work at Your Own Pace</p>
              <h2>Your LinkedIn. Stronger, clearer, and more searchable.</h2>
            </div>

            <a href="#buy" className={styles.darkButton}>
              Get the Guide for $23
            </a>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.shell}>
          <div className={styles.faqHeading}>
            <p className={styles.eyebrow}>Questions</p>
            <h2>Before you start.</h2>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details className={styles.faq} key={faq.question}>
                <summary>
                  <span>{faq.question}</span>
                  <span className={styles.faqIcon}>+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.shell}>
          <div className={styles.finalCard}>
            <div>
              <p className={styles.eyebrow}>LinkedIn Optimization Guide</p>
              <h2>Ready to upgrade your profile?</h2>
            </div>

            <div className={styles.finalPrice}>
              <div>
                <span className={styles.finalOldPrice}>$500</span>
                <strong>$23</strong>
              </div>

              <span>One-time payment</span>

              <a href="#buy" className={styles.lightButton}>
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
