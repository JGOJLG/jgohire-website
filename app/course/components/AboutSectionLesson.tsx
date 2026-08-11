"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import "./about-section.css";

const steps = [
  {
    title: "Why the About Section Matters",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="about-section-image">
          <Image
            src="/course/about-section.png"
            alt="LinkedIn About section example"
            width={1200}
            height={675}
            priority
          />
        </div>

        <div className="about-section-reading-card">
          <p>
            Your About section lives just below your headline and basic info. It is one of the few places on your profile where you can speak in your own voice and give people a real sense of who you are and what you bring.
          </p>
        </div>

        <aside className="about-section-statement-card">
          <span>About Section Rule</span>
          <p>Your About section is your chance to sound like a real person.</p>
        </aside>
      </>
    ),
  },
  {
    title: "How to Edit the About Section",
    eyebrow: "Step 2",
    content: (
      <section className="about-section-howto-card">
        <div className="about-section-howto-header">
          <span>How To Edit</span>
          <strong>Update your LinkedIn About section</strong>
        </div>

        <div className="about-section-howto-body">
          <div>
            <span>01</span>
            <p>Click the pencil icon next to the word "About" on your profile.</p>
          </div>

          <div>
            <span>02</span>
            <p>If you have never filled it out, it will show a prompt to add a summary.</p>
          </div>

          <div>
            <span>03</span>
            <p>
              If you do not see an About section on your profile at all, click "Add Section" at the top of your profile to add it.
            </p>
          </div>

          <div>
            <span>04</span>
            <p>
              This applies to any section in this guide that you do not currently have. If it is missing, that button is how you add it.
            </p>
          </div>
        </div>
      </section>
    ),
  },
  {
    title: "What to Include",
    eyebrow: "Step 3",
    content: (
      <>
        <div className="about-section-reading-card">
          <p>
            Keep it simple. What do you do, what are you good at, what have you worked on, and what are you looking for? If someone reads it and understands you immediately, you did it right. No big words, nothing fancy, just clear and real.
          </p>

          <p>
            For most About sections, I recommend writing in a <strong>pronoun-free, implied first-person style</strong>. This means you are writing about yourself without repeatedly using “I,” “me,” or “my,” but you are also not referring to yourself in the third person.
          </p>

          <p>
            <strong>Instead of:</strong> “I am a recruiting professional with 3 years of experience in technical recruiting.”
          </p>

          <p>
            <strong>Try:</strong> “Recruiting professional with 3 years of experience in technical recruiting.”
          </p>

          <p>
            It keeps your About section polished, direct, and easy to scan without making it sound like someone else wrote your bio. The exception is a more personal, story-driven About section, where using first person can feel more natural.
          </p>

          <p>
            This is also a great place to naturally incorporate keywords when mentioning your skills and experience. These keywords can help make your profile more searchable to recruiters and are some of the first pieces of information they see when reviewing your profile, especially when using LinkedIn Recruiter.
          </p>

          <p>
            Start by pasting your resume or experience into AI. Do not just ask it to “write me an About section” with no context. That is how you end up with something generic that sounds like everyone else. Give it something real to work with, then guide it.
          </p>
        </div>

        <aside className="about-section-tip-card">
          <span>Quick Tip</span>
          <p>
            Anyone can see your About section, including your current employer. Choose the version below that fits your situation.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "Choose the Right Approach",
    eyebrow: "Step 4",
    content: (
      <div className="about-section-ai-grid">
        <article>
          <span>01</span>
          <h3>Actively Job Searching</h3>
          <p>
            Use this when you want your About section to clearly support the roles you are targeting.
          </p>
        </article>

        <article>
          <span>02</span>
          <h3>Safe for Current Employer</h3>
          <p>
            Use this when you want your profile to sound strong without framing yourself as actively job searching.
          </p>
        </article>

        <article>
          <span>03</span>
          <h3>Story-Driven</h3>
          <p>
            Use this when you want your About section to feel more personal and conversational while still being professional.
          </p>
        </article>
      </div>
    ),
  },
  {
    title: "Actively Job Searching",
    eyebrow: "Step 5",
    content: (
      <aside className="about-section-prompt-card">
        <div className="about-section-prompt-top">
          <div>
            <span>Copy + Paste Prompt</span>
            <h3>Option 1: Actively Job Searching</h3>
          </div>

          <small>AI Tool Ready</small>
        </div>

        <div className="about-section-prompt-body">
          <p>
            You have the knowledge of an extremely talented Recruiter and LinkedIn expert. Knowing that, write a LinkedIn About section based on my background and the roles I am targeting in [INSERT ROLES AND INDUSTRY].

Write in a pronoun-free, implied first-person style. Do not use “I,” “me,” “my,” or refer to me in the third person. For example: “Recruiting professional with 3 years of experience…” rather than “I am a recruiting professional…” or “[Name] is a recruiting professional…”

Keep it clear, concise, and easy to read. Avoid generic phrases, buzzwords, and anything overly corporate. It should sound natural and human, not AI-generated.

Structure it with:

• A strong, concise opening that quickly communicates who I am professionally
• My most relevant experience, strengths, and skills
• Keywords that naturally align with the roles I am targeting
• A brief closing that communicates what I am looking for next

Use short paragraphs and keep it skimmable. Do not make up, assume, or exaggerate any information that is not included in my background.

Target Roles/Industry: [INSERT ROLES AND INDUSTRY]

My Resume/Experience:
[PASTE RESUME/EXPERIENCE]
          </p>
        </div>
      </aside>
    ),
  },
  {
    title: "Safe for Current Employer",
    eyebrow: "Step 6",
    content: (
      <aside className="about-section-prompt-card">
        <div className="about-section-prompt-top">
          <div>
            <span>Copy + Paste Prompt</span>
            <h3>Option 2: Safe for Current Employer</h3>
          </div>

          <small>AI Tool Ready</small>
        </div>

        <div className="about-section-prompt-body">
          <p>
            You have the knowledge of an extremely talented Recruiter and LinkedIn expert. Knowing that, write a LinkedIn About section that provides a strong, general overview of my professional background, experience, and strengths without suggesting that I am actively job searching.

Write in a pronoun-free, implied first-person style. Do not use “I,” “me,” “my,” or refer to me in the third person. For example: “Marketing professional with 5 years of experience…” rather than “I am a marketing professional…” or “[Name] is a marketing professional…”

Keep it professional but natural and human, not overly corporate or AI-generated. Avoid generic phrases, unnecessary buzzwords, and language that sounds like a resume copied directly into LinkedIn.

Structure it with:

• A strong, concise opening that quickly communicates who I am professionally
• My most relevant experience, strengths, and areas of expertise
• The types of work, projects, industries, or environments I have experience in
• Relevant skills and keywords incorporated naturally throughout

Use short paragraphs and keep it clear, concise, and skimmable. Do not include language about seeking new opportunities, being open to work, looking for my next role, or anything else that could signal to my current employer that I am job searching.

Do not make up, assume, or exaggerate any information that is not included in my background.

My Resume/Experience:
[PASTE RESUME/EXPERIENCE]
          </p>
        </div>
      </aside>
    ),
  },
  {
    title: "Story-Driven",
    eyebrow: "Step 7",
    content: (
      <aside className="about-section-prompt-card">
        <div className="about-section-prompt-top">
          <div>
            <span>Copy + Paste Prompt</span>
            <h3>Option 3: Story-Driven</h3>
          </div>

          <small>AI Tool Ready</small>
        </div>

        <div className="about-section-prompt-body">
          <p>
            You have the knowledge of an extremely talented Recruiter and LinkedIn expert. Knowing that, write a LinkedIn About section that tells the story of my professional background in a more personal and conversational way while still remaining professional.

Write in first person, using “I,” “me,” and “my” naturally. It should sound like a real person explaining their career and experience, not like a formal professional bio or a resume summary.

Start with a brief, engaging introduction about how I got into my field or what led me to the work I do today. Then naturally transition into my experience, strengths, skills, and the types of work I enjoy most.

Structure it with:

• A personal but concise opening about my career path or how I got into my field
• My most relevant experience and professional strengths
• The skills, projects, or areas of work I particularly enjoy
• A brief closing that ties my experience and interests together

Keep the tone natural, conversational, and human. Avoid generic phrases, unnecessary buzzwords, overly corporate language, and anything that sounds AI-generated. Do not make the story overly dramatic or force a narrative that is not supported by the information provided.

Use short paragraphs and keep it clear and easy to read. Do not make up, assume, or exaggerate any information that is not included in my background. If there is not enough information to explain how I got into my field, do not invent a story.

My Resume/Experience:
[PASTE RESUME/EXPERIENCE]
          </p>
        </div>
      </aside>
    ),
  },
  {
    title: "Open to Opportunities",
    eyebrow: "Step 8",
    content: (
      <aside className="about-section-prompt-card">
        <div className="about-section-prompt-top">
          <div>
            <span>Copy + Paste Prompt</span>
            <h3>Option 4: Open to Opportunities</h3>
          </div>

          <small>AI Tool Ready</small>
        </div>

        <div className="about-section-prompt-body">
          <p>
            You have the knowledge of an extremely talented Recruiter and LinkedIn expert. Knowing that, write a LinkedIn About section that highlights my professional background, experience, strengths, and key skills while subtly communicating that I am open to new opportunities.

Write in a pronoun-free, implied first-person style. Do not use “I,” “me,” “my,” or refer to me in the third person. For example: “Product marketing professional with 5 years of experience…” rather than “I am a product marketing professional…” or “[Name] is a product marketing professional…”

Keep it professional, natural, and human. It should not read like an active job-search announcement or suggest urgency around finding a new role.

Structure it with:

• A strong, concise opening that quickly communicates who I am professionally
• My most relevant experience, strengths, and areas of expertise
• Relevant skills and keywords incorporated naturally throughout
• A brief closing that lightly communicates openness to relevant opportunities, conversations, or connections

Keep any mention of being open to opportunities subtle and confident. Avoid phrases such as “actively seeking,” “currently looking for a new role,” “seeking my next opportunity,” or anything that sounds overly eager or urgent.

Use short paragraphs and keep it clear, concise, and easy to skim. Avoid generic phrases, unnecessary buzzwords, overly corporate language, and anything that sounds AI-generated.

Do not make up, assume, or exaggerate any information that is not included in my background.

My Resume/Experience:
[PASTE RESUME/EXPERIENCE]
          </p>
        </div>
      </aside>
    ),
  },
  {
    title: "How to Format",
    eyebrow: "Step 9",
    content: (
      <aside className="about-section-format-card">
        <span>Formatting Tip</span>
        <h3>
          LinkedIn does not allow bold text or custom formatting directly in the About section.
        </h3>

        <p>
          If you want to add some visual structure, go to fontly.io/linkedin-font-generator, type what you want, and copy and paste it into your profile. It works for posts too.
        </p>

        <a
          href="https://fontly.io/linkedin-font-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn Font Formatter ← Click Here
        </a>
      </aside>
    ),
  },
  {
    title: "Final Takeaway",
    eyebrow: "Step 10",
    content: (
      <aside className="about-section-final-card">
        <span>Final Takeaway</span>
        <h3>Sound like a real person.</h3>
        <p>
          Your About section is your chance to sound like a real person. Use it. A clear, honest summary that actually sounds like you will always outperform something polished and generic.
        </p>
      </aside>
    ),
  },
];

export default function AboutSectionLesson() {
  const [activeStep, setActiveStep] = useState(0);

  const progress = useMemo(
    () => Math.round(((activeStep + 1) / steps.length) * 100),
    [activeStep]
  );

  const currentStep = steps[activeStep];

  function moveToStep(index: number) {
    setActiveStep(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="about-section-course">
      <div className="about-section-topbar">
        <div>
          <span>About Section Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="about-section-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="about-section-layout">
        <aside className="about-section-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "about-section-step about-section-step-active"
                  : "about-section-step"
              }
              onClick={() => moveToStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="about-section-content">
          <div className="about-section-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="about-section-body">{currentStep.content}</div>

          <div className="about-section-controls">
            <button
              type="button"
              onClick={() => moveToStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/experience"
                className="about-section-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>Experience</strong>
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => moveToStep(activeStep + 1)}
              >
                Continue →
              </button>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
