import Link from "next/link";

const guides = [
  {
    title: "10 Reasons You're Not Hearing Back After Applying",
    description:
      "A clear, practical guide to help you understand why qualified candidates get overlooked and what to adjust.",
    items: [
      ["01", "Your resume isn't telling the right story."],
      ["02", "You're applying like everyone else."],
      ["03", "Your value isn't clear quickly enough."],
    ],
    more: "+ 7 more insights inside",
    downloadUrl:
      "/downloads/JGO-Hire-10-Reasons-Youre-Not-Hearing-Back.pdf",
  },
  {
    title: "30-Minute Interview Countdown™",
    description:
      "A focused pre-interview routine to help you feel prepared, calm, and confident before you click Join.",
    items: [
      ["30", "Review your top achievements and the job description."],
      ["20", "Test your camera, microphone, internet, and setup."],
      ["10", "Breathe, sit up tall, smile, and reset your mindset."],
    ],
    more: "+ full countdown inside",
    downloadUrl:
      "/downloads/JGO-Hire-30-Minute-Interview-Countdown.pdf",
  },
];

export default function FreeGuidesPage() {
  return (
    <main className="free-guides-page">
      <header className="contact-header">
        <div className="site-shell contact-header-inner">
          <Link href="/" className="contact-logo">
            <span>JGO HIRE</span>
            <small>Career Coach + Recruiter</small>
          </Link>

          <Link href="/resources" className="contact-back-link">
            Back to Resources
          </Link>
        </div>
      </header>

      <section className="free-guides-hero">
        <div className="site-shell free-guides-hero-content">
          <p className="eyebrow">JGO Insights™</p>

          <h1>Your Free Career Guides</h1>

          <p>
            Download two complimentary resources designed to help you
            strengthen your job-search strategy and feel more prepared before
            your next interview.
          </p>
        </div>
      </section>

      <section className="free-guides-library">
        <div className="site-shell">
          <div className="free-guides-grid">
            {guides.map((guide) => (
              <article
                key={guide.title}
                className="free-guide-download-card"
              >
                <div className="free-guide-card-content">
                  <span className="free-resource-pill">
                    Free Guide
                  </span>

                  <h2>{guide.title}</h2>

                  <p className="free-guide-description">
                    {guide.description}
                  </p>

                  <div className="free-guide-preview">
                    <p className="free-guide-preview-title">
                      Inside the guide
                    </p>

                    {guide.items.map(([number, text]) => (
                      <div
                        key={`${guide.title}-${number}`}
                        className="free-guide-preview-item"
                      >
                        <span>{number}</span>
                        <strong>{text}</strong>
                      </div>
                    ))}

                    <p className="free-guide-more">
                      {guide.more}
                    </p>
                  </div>

                  <a
                    href={guide.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary free-guide-download-button"
                  >
                    Download Guide
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="free-guides-footer-note">
            These resources are designed to be simple, practical, and easy to
            use as you move through your job search.
          </p>
        </div>
      </section>
    </main>
  );
}