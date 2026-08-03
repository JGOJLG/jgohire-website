"use client";

import Link from "next/link";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "Jen, I got the Program Coordinator job! I am so excited. They were able to offer me the very top of the salary range and can provide a relocation package too. Thank you so much for all your help.",
    name: "Madison S.",
    result: "Job offer + top of salary range",
  },
  {
    quote:
      "Hey Jen, I just wanted to let you know that I got the job as a litigation assistant at a firm in Raleigh. Thank you so much for all your help shaping up my resume and LinkedIn. Your guidance was unbelievably helpful.",
    name: "April D.",
    result: "New litigation assistant role",
  },
  {
    quote:
      "I just wanted to let you know I got the job! I couldn't have done it without your preparation and guidance. Thank you for giving me insight into the interview process that I did not know existed.",
    name: "Ilana P.",
    result: "Interview preparation + job offer",
  },
  {
    quote:
      "Wow, this is great and exactly what I was looking for. Even as an executive, I just don't know how resumes work, so I am grateful to find someone who can do it. It looks great. Thank you.",
    name: "Taylor J.",
    result: "Executive resume support",
  },
  {
    quote:
      "Thank you so much for talking things through with Ethan, Jen. Great advice all around. I can't begin to tell you how much we appreciate your guidance.",
    name: "Susan R.",
    result: "Career guidance",
  },
  {
    quote:
      "Wow. I had no idea this is what recruiters actually look for. You were so helpful, detailed, and professional. I really appreciate the help.",
    name: "Mohammad Z.",
    result: "Recruiter insight",
  },
  {
    quote: "I got the job!",
    name: "Caroline D.",
    result: "New job offer",
  },
  {
    quote:
      "Thanks so much, Jen. I really appreciate the advice and all of your support throughout the process. I'll definitely focus on what we discussed last session. I'll reach out after the interview and let you know how it goes. Thanks again.",
    name: "Jesse M.",
    result: "Interview coaching",
  },
];

export default function TestimonialsPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  function showPrevious() {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  }

  function getCardPosition(index: number) {
    const previousIndex =
      activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;

    const nextIndex =
      activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1;

    if (index === activeIndex) {
      return "testimonial-carousel-card-active";
    }

    if (index === previousIndex) {
      return "testimonial-carousel-card-previous";
    }

    if (index === nextIndex) {
      return "testimonial-carousel-card-next";
    }

    return "testimonial-carousel-card-hidden";
  }

  return (
    <main className="testimonials-page">
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

      <section className="testimonials-hero">
        <div className="site-shell testimonials-hero-content">
          <p className="eyebrow">Client Wins</p>

          <h1>Real people. Real offers. Real confidence.</h1>

          <p className="testimonials-hero-copy">
            From resumes and LinkedIn strategy to interview preparation and
            career clarity, these are the moments that make the work worth it.
          </p>

          <div className="testimonials-results">
            <span>1,000+ Clients Served</span>
            <span>Recruiter + Career Coach</span>
            <span>Resume, LinkedIn + Interview Prep</span>
          </div>
        </div>
      </section>

      <section className="testimonial-carousel-section">
        <div className="site-shell">
          <div className="testimonials-section-heading testimonials-section-heading-centered">
            <p className="eyebrow">What Clients Are Saying</p>

            <h2>Career support that creates real momentum.</h2>

            <p>
              Use the arrows to read more client experiences and career wins.
            </p>
          </div>

          <div className="testimonial-carousel-shell">
            <button
              type="button"
              className="testimonial-carousel-arrow testimonial-carousel-arrow-left"
              onClick={showPrevious}
              aria-label="Previous testimonial"
            >
              ←
            </button>

            <div className="testimonial-carousel-stage">
              {testimonials.map((testimonial, index) => (
                <article
                  key={`${testimonial.name}-${index}`}
                  className={`testimonial-carousel-card ${getCardPosition(
                    index
                  )}`}
                  aria-hidden={index !== activeIndex}
                >
                  <div className="testimonial-carousel-stars" aria-label="5 stars">
                    ★★★★★
                  </div>

                  <p className="testimonial-carousel-result">
                    {testimonial.result}
                  </p>

                  <blockquote>“{testimonial.quote}”</blockquote>

                  <p className="testimonial-carousel-name">
                    {testimonial.name}
                  </p>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="testimonial-carousel-arrow testimonial-carousel-arrow-right"
              onClick={showNext}
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>

          <div
            className="testimonial-carousel-dots"
            aria-label="Choose a testimonial"
          >
            {testimonials.map((testimonial, index) => (
              <button
                key={`${testimonial.name}-dot`}
                type="button"
                className={
                  index === activeIndex
                    ? "testimonial-carousel-dot testimonial-carousel-dot-active"
                    : "testimonial-carousel-dot"
                }
                onClick={() => setActiveIndex(index)}
                aria-label={`View testimonial from ${testimonial.name}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-cta-section">
        <div className="site-shell">
          <div className="testimonials-cta-card">
            <p className="eyebrow">Your Next Career Win</p>

            <h2>Your next career move can feel clearer.</h2>

            <p>
              Whether you need a stronger resume, a polished LinkedIn profile,
              interview coaching, or a focused job-search strategy, JGO Hire
              can help you move forward with confidence.
            </p>

            <Link href="/contact" className="button button-light">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="testimonials-review-section">
        <div className="site-shell testimonials-review-content">
          <div className="testimonial-stars" aria-label="5 stars">
            ★★★★★
          </div>

          <p className="eyebrow">Worked With JGO Hire?</p>

          <h2>Had a great experience?</h2>

          <p>
            If we have worked together and you found value in the process, I
            would be incredibly grateful if you shared your experience with a
            Google review.
          </p>

          <a
            href="https://g.page/r/Cf7jbsoNnrukEBI/review"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary"
          >
            Leave a Google Review
          </a>
        </div>
      </section>
    </main>
  );
}
