import Image from "next/image";
import Link from "next/link";
import styles from "./guide.module.css";

const checkoutPath = "/api/checkout";
const loginPath = "/login?redirect=/course";

const modules = [
  {
    number: "01",
    title: "Start Here",
    description: "Set your strategy before rewriting your profile.",
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
    description: "Strengthen every section recruiters review first.",
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
    description: "Add credibility, visibility, and recruiter-friendly detail.",
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
    description: "Polish your profile and put the strategy into action.",
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
    question: "I already purchased. Where do I go?",
    answer:
      "Use Member Login to sign in and continue your course from where you left off.",
  },
];

function PriceLabel({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={
        compact ? styles.compactPriceLabel : styles.buttonPriceLabel
      }
    >
      <span className={styles.buttonOldPrice}>$500</span>
      <span className={styles.buttonCurrentPrice}>$23</span>
    </span>
  );
}

function PurchaseButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <form action={checkoutPath} method="POST">
      <button type="submit" className={className}>
        {children}
      </button>
    </form>
  );
}

export default function LinkedInGuidePage() {
  return (
    <main className={styles.page}>
      <div className={styles.ambientOne} />
      <div className={styles.ambientTwo} />

      <header className={styles.header}>
        <div className={styles.shell}>
          <div className={styles.headerInner}>
            <Link href="/" className={styles.logo}>
              <span>JGO HIRE</span>
              <small>Career Coach + Recruiter</small>
            </Link>

            <nav className={styles.nav} aria-label="Guide navigation">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/resources">Resources</Link>
              <Link href="/testimonials">Testimonials</Link>
            </nav>

            <div className={styles.headerActions}>
              <Link href={loginPath} className={styles.memberLink}>
                Member Login
              </Link>

              <PurchaseButton className={styles.headerPurchaseButton}>
                <span>Purchase</span>
                <PriceLabel compact />
              </PurchaseButton>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.shell}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.pill}>LinkedIn Optimization Guide</span>

              <h1>
                Build a LinkedIn profile recruiters actually{" "}
                <em>notice.</em>
              </h1>

              <p className={styles.heroText}>
                A recruiter-backed course that helps you optimize every section
                of your LinkedIn profile with clear strategy, practical AI
                guidance, and examples that still sound like you.
              </p>

              <div className={styles.heroActions}>
                <PurchaseButton className={styles.primaryButton}>
                  <span>Purchase the Guide</span>
                  <PriceLabel />
                </PurchaseButton>

                <a href="#course-preview" className={styles.secondaryButton}>
                  See What&apos;s Inside
                </a>
              </div>

              <p className={styles.memberPrompt}>
                Already purchased?{" "}
                <Link href={loginPath}>Log in to continue your course.</Link>
              </p>

              <div className={styles.lifetimePill}>
                <span className={styles.lifetimeDot} />
                Lifetime Access
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.imageCard}>
                <Image
                  src="/linkedin-guide-hero.png"
                  alt="How to Use AI to Optimize Your LinkedIn Profile"
                  width={1600}
                  height={1000}
                  priority
                  className={styles.heroImage}
                />
              </div>

              <div className={styles.priceCard}>
                <span className={styles.valueLabel}>Limited-Time Price</span>

                <div className={styles.priceRow}>
                  <span className={styles.oldPrice}>$500</span>
                  <strong>$23</strong>
                </div>

                <p>One payment. Lifetime access.</p>

                <PurchaseButton className={styles.priceButton}>
                  Get Instant Access
                </PurchaseButton>

                <a href="#course-preview" className={styles.previewLink}>
                  Preview the curriculum
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.previewSection} id="course-preview">
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <span className={styles.pill}>Inside the Guide</span>
            <h2>Everything you need to rebuild your profile with purpose.</h2>
            <p>
              Open each module to preview the full learning path before you buy.
            </p>
          </div>

          <div className={styles.moduleList}>
            {modules.map((module, index) => (
              <details
                className={styles.module}
                key={module.title}
              >
                <summary>
                  <span className={styles.moduleNumber}>{module.number}</span>

                  <span className={styles.moduleCopy}>
                    <strong>{module.title}</strong>
                    <small>{module.description}</small>
                  </span>

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

          <div className={styles.previewCta}>
            <div>
              <span className={styles.pill}>Start Today</span>
              <h3>One purchase. A stronger profile you can keep improving.</h3>
            </div>

            <PurchaseButton className={styles.primaryButton}>
              <span>Get the Guide</span>
              <PriceLabel />
            </PurchaseButton>
          </div>
        </div>
      </section>

      <section className={styles.midCtaSection}>
        <div className={styles.shell}>
          <div className={styles.midCta}>
            <div>
              <span className={styles.pill}>Work at Your Own Pace</span>
              <h2>Your LinkedIn. Stronger, clearer, and more searchable.</h2>
              <p>
                Move through each lesson when it works for you and return
                whenever your career goals change.
              </p>
            </div>

            <div className={styles.midCtaActions}>
              <PurchaseButton className={styles.darkButton}>
                <span>Purchase the Guide</span>
                <PriceLabel />
              </PurchaseButton>

              <Link href={loginPath} className={styles.memberTextLink}>
                Already purchased? Member Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.shell}>
          <div className={styles.faqGrid}>
            <div className={styles.faqHeading}>
              <span className={styles.pill}>Questions</span>
              <h2>Before you start.</h2>
              <p>
                Everything you need to know before purchasing the LinkedIn
                Optimization Guide.
              </p>
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
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.shell}>
          <div className={styles.finalCard}>
            <div>
              <span className={styles.pill}>LinkedIn Optimization Guide</span>
              <h2>Ready to upgrade your profile?</h2>
              <p>
                Get recruiter-backed guidance for every section of your
                LinkedIn profile.
              </p>
            </div>

            <div className={styles.finalPrice}>
              <div className={styles.finalPriceRow}>
                <span>$500</span>
                <strong>$23</strong>
              </div>

              <small>One-time payment. Lifetime access.</small>

              <PurchaseButton className={styles.lightButton}>
                Get Instant Access
              </PurchaseButton>

              <Link href={loginPath} className={styles.finalLoginLink}>
                Already purchased? Log in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
