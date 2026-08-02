const posts = [
  {
    category: "Resume Advice",
    number: "01",
    title: "Why your resume isn’t getting noticed",
  },
  {
    category: "Career Advice",
    number: "02",
    title: "The salary range mistake hurting negotiations",
  },
  {
    category: "Recruiter Insights",
    number: "03",
    title: "What recruiters notice first",
  },
  {
    category: "Interview Tips",
    number: "04",
    title: "How to answer “Tell me about yourself”",
  },
];

export default function SocialFeed() {
  return (
    <section className="insights-section" id="resources">
      <div className="site-shell">
        <div className="insights-header">
          <div>
            <p className="eyebrow">JGO Insights</p>
            <h2>Career advice beyond the resume.</h2>
          </div>

          <a
            href="https://www.instagram.com/jgohired"
            target="_blank"
            rel="noopener noreferrer"
            className="insights-follow"
          >
            Follow @jgohired
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="insights-grid">
          {posts.map((post) => (
            <a
              key={post.title}
              href="https://www.instagram.com/jgohired"
              target="_blank"
              rel="noopener noreferrer"
              className="insight-card"
            >
              <div className="insight-card-top">
                <span className="insight-number">{post.number}</span>
                <span className="insight-category">{post.category}</span>
              </div>

              <h3>{post.title}</h3>

              <span className="insight-link">
                View insight
                <span aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}