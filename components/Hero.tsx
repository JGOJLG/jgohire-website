import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="site-shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Certified Career Coach + Recruiter</p>

          <h1>Expert career support at every step.</h1>

          <p className="hero-description">
            Resume strategy, interview coaching, and career guidance backed by
            nearly a decade of recruiting experience.
          </p>

          <div className="hero-actions">
            <Link href="/contact" className="button button-primary">
              Book a Consultation
            </Link>

            <Link href="/#services" className="button button-secondary">
              Explore Services
            </Link>
          </div>

          <div className="hero-stats" aria-label="JGO Hire experience">
            <div>
              <strong>10+</strong>
              <span>Years recruiting</span>
            </div>

            <div>
              <strong>1,000+</strong>
              <span>Resumes reviewed</span>
            </div>

            <div>
              <strong>Thousands</strong>
              <span>Candidates supported</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-frame">
            <img
              src="https://images.squarespace-cdn.com/content/v1/6a25df4e5b314b5b3136f476/717c5d1a-c8c2-47f3-9a31-d897286e94b7/Untitled+design.PNG?format=1200w"
              alt="Jen Gordon, Certified Career Coach and Recruiter"
              className="hero-image"
            />
          </div>

          <div className="hero-note">
            <span className="hero-note-kicker">Why JGO Hire</span>
            <strong>Real recruiting experience.</strong>
            <p>
              Career advice from someone who understands hiring from the
              inside.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
