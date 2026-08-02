import Link from "next/link";

const services = [
  {
    title: "Interview Coaching",
    description:
      "Practice with recruiter-backed coaching to interview with confidence and stand out.",
  },
  {
    title: "Resume Writing",
    description:
      "Create a resume that clearly tells your story and gets you noticed.",
  },
  {
    title: "LinkedIn Optimization",
    description:
      "Turn your LinkedIn profile into a powerful networking and recruiting tool.",
  },
  {
    title: "Career Coaching",
    description:
      "Get personalized guidance for career growth, transitions, and major decisions.",
  },
  {
    title: "Job Search Strategy",
    description:
      "Build a focused plan to navigate your job search with clarity and confidence.",
  },
  {
    title: "Career Documents",
    description:
      "Professional cover letters and supporting materials tailored to your career goals.",
  },
];

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="site-shell">
        <div className="section-heading">
          <p className="eyebrow">Work Together</p>

          <h2>How We Can Work Together</h2>

          <p>
            Personalized support designed around your goals, experience, and
            where you are in your career journey.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <Link href="/contact">Learn More →</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}