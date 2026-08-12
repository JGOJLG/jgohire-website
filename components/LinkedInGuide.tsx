import Link from "next/link";

const guideBenefits = [
  "Optimize your profile for recruiter visibility",
  "Craft a headline that clearly positions you",
  "Use AI prompts without sounding generic",
  "Improve your profile section by section",
];

export default function LinkedInGuide() {
  return (
    <section className="linkedin-guide-section" id="linkedin-guide">
      <div className="site-shell">
        <div className="linkedin-guide-card">
          <div className="linkedin-guide-copy">
            <p className="linkedin-guide-kicker">DIY Option</p>

            <h2>The LinkedIn Optimization Guide</h2>

            <p className="linkedin-guide-description">
              Not everyone needs 1:1 coaching. This guide gives you
              recruiter-backed LinkedIn strategy you can implement at your own
              pace.
            </p>

            <div className="linkedin-guide-price">
              <span className="linkedin-guide-old-price">$500 value</span>

              <span className="linkedin-guide-new-price">only $150</span>
            </div>

            <Link
              href="/guide"
              className="linkedin-guide-button"
            >
              Get the Guide
            </Link>
          </div>

          <div className="linkedin-guide-benefits">
            {guideBenefits.map((benefit) => (
              <div key={benefit} className="linkedin-guide-benefit">
                <span aria-hidden="true">✓</span>
                <p>{benefit}</p>
              </div>
            ))}
          </div>

          <div className="linkedin-guide-device">
            <div className="linkedin-guide-laptop">
              <div className="linkedin-guide-camera" />

              <div className="linkedin-guide-screen">
                <small>JGO Hire</small>

                <strong>
                  LinkedIn
                  <br />
                  Guide
                </strong>

                <p>Recruiter-backed profile strategy</p>

                <div className="linkedin-guide-lines">
                  <i />
                  <i />
                  <i className="short" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}