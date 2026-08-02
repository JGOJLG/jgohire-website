"use client";

import type { FormEvent } from "react";

export default function FreeResource() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className="resource-section">
      <div className="site-shell">
        <div className="resource-card">
          <div className="resource-copy">
            <p className="resource-eyebrow">Free Career Resource</p>

            <h2>Get the tools recruiters use to evaluate candidates.</h2>

            <p className="resource-description">
              Practical guidance to strengthen your resume, interviews, and job
              search strategy.
            </p>

            <div className="resource-points">
              <div>
                <span>01</span>
                <p>Resume mistakes recruiters notice</p>
              </div>

              <div>
                <span>02</span>
                <p>Interview tips that actually work</p>
              </div>

              <div>
                <span>03</span>
                <p>How to position your experience</p>
              </div>
            </div>
          </div>

          <div className="resource-form-panel">
            <p className="resource-form-label">Send me the guide</p>

            <form className="resource-form" onSubmit={handleSubmit}>
              <label>
                <span>First name</span>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Your first name"
                  required
                />
              </label>

              <label>
                <span>Email address</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  required
                />
              </label>

              <button type="submit" className="resource-submit">
                Get the Free Guide
              </button>
            </form>

            <p className="resource-disclaimer">
              No spam. Just practical career advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}