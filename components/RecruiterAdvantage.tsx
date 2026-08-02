const points = [
  {
    title: "Recruiter perspective",
    description: "Understand what hiring teams notice first.",
  },
  {
    title: "Clear positioning",
    description: "Communicate your value without sounding generic.",
  },
  {
    title: "Practical strategy",
    description: "Leave with clear next steps you can actually use.",
  },
];

export default function RecruiterAdvantage() {
  return (
    <section className="advantage-section" id="about">
      <div className="site-shell advantage-grid">
        <div className="advantage-copy">
          <p className="eyebrow">The Recruiter Advantage</p>
          <h2>I know what happens after you apply.</h2>
          <p>
            I use real recruiting experience to help you stand out, communicate
            clearly, and move forward with confidence.
          </p>
        </div>

        <div className="advantage-list">
          {points.map((point, index) => (
            <article key={point.title} className="advantage-item">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}