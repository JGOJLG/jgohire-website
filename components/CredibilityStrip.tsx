const items = [
  "Certified Career Coach",
  "Nearly 10 Years in Recruiting",
  "Thousands of Resumes Reviewed",
  "Thousands of Interviews Conducted",
];

export default function CredibilityStrip() {
  return (
    <section className="credibility-strip">
      <div className="site-shell credibility-grid">
        {items.map((item) => (
          <div key={item} className="credibility-item">
            <span className="credibility-dot" />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}