"use client";

import "./leave-a-review.css";

export default function LeaveAReviewLesson() {
  const googleReviewLink =
    "https://www.google.com/maps/place/JGO+Hire/@46.423669,-129.9427085,3z/data=!3m1!4b1!4m6!3m5!1s0x265dc22602f4a189:0xa4bb9e0dca6ee3fe!8m2!3d46.423669!4d46.423669!16s%2Fg%2F11z8vwdwxy?entry=ttu";

  return (
    <div className="review-course">

      <div className="review-label">
        JGO Hire LinkedIn Guide
      </div>


      <section className="review-hero">

        <div className="review-eyebrow">
          Thank You
        </div>

        <h1>
          Leave A Review.
        </h1>

        <p>
          Your feedback helps JGO Hire continue helping professionals improve their careers.
        </p>

      </section>



      <section className="review-card">

        <span>
          Public Review
        </span>

        <h2>
          Loved the guide?
        </h2>

        <p>
          If this course helped you improve your LinkedIn profile, I would really appreciate you sharing your experience with others.
        </p>


        <a
          href={googleReviewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="review-google-button"
        >
          ⭐ Leave a Google Review
        </a>

      </section>




      <section className="review-private">

        <span>
          Private Feedback
        </span>

        <h2>
          Want to share something privately?
        </h2>

        <p>
          I would love to hear what worked, what could be improved, or any suggestions you have for future resources.
        </p>


        <a
          href="mailto:jen@jgohire.com?subject=LinkedIn Guide Feedback"
          className="review-private-button"
        >
          Send Private Feedback
        </a>

      </section>




      <section className="review-final">

        <span>
          Thank You
        </span>

        <h2>
          Your feedback makes a difference.
        </h2>

        <p>
          Whether you leave a public review or send private feedback, I appreciate you taking the time to share your experience.
        </p>

      </section>



      <div className="review-next">

        <small>
          Course Complete
        </small>

        <h3>
          Thank you for completing the JGO Hire LinkedIn Guide.
        </h3>

      </div>


    </div>
  );
}