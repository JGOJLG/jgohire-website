"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./introduction.css";

const steps = [
  {
    title: "Welcome",
    eyebrow: "Step 1",
    content: (
      <>
        <div className="intro-step-card">
          <p>
            Hi! Welcome. Today you made the choice to set yourself up for success, and I applaud you for that. Sometimes the hardest part is getting started, so I am happy you're here.
          </p>

          <p>
            You may be wondering, who am I getting all of this information from? What makes her so qualified? Some days I ask myself the same thing, but let me give you some insight. My name is Jen and I have been an agency recruiter for almost a decade. I have worked with companies of all sizes from Fortune 500's, extremely well known brands, high growth start ups, and small businesses. I have placed everyone from high-level executive level roles, administrative positions, hospital staff (during COVID… that was a crazy time), day laborers, and so much more. I have reviewed thousands of resumes and LinkedIn profiles, have interviewed thousands of people, and have watched the market evolve over the years. I always tell people, recruiting is subjective as there is a human (mostly) on the other end of the application process. We all see the process in our own ways and can have different opinions about what is needed. However, there are general standards you should be following, and that is why I built this guide.
          </p>

          <p>
            Before we get started, I want to introduce you to what LinkedIn actually is, how it works, and how powerful it can be for your job search and beyond.
          </p>

          <p>
            LinkedIn is not just a search tool. It is not just a database. It is not just a way to look up that friend you met 10 years ago at summer camp to see if they actually ended up working in media like they always dreamed of. Let's be honest, we've all done it. If you plan on doing some professional snooping, see the note below:
          </p>
        </div>

        <aside className="intro-step-callout intro-step-callout-light">
          <span>Side Note</span>
          <p>
            By default, LinkedIn lets people see when you view their profile, but you can easily turn this feature off. To browse profiles anonymously, go to Settings &amp; Privacy, click Visibility, then select Profile Viewing Options. From there, choose "Private Mode" if you want to stay completely anonymous. Keep in mind that when you use private mode, LinkedIn also limits your ability to see who viewed your own profile. Many recruiters and job seekers switch between public and private mode strategically depending on whether they want to network visibly or research profiles more discreetly.
          </p>
        </aside>

        <div className="intro-step-card intro-step-card-short">
          <p>
            LinkedIn is a powerhouse of a networking tool. If positioned correctly, it can set you up for success in your job search and beyond.
          </p>
        </div>

        <aside className="intro-step-callout intro-step-callout-dark">
          <span>Real Talk · From a Recruiter</span>
          <p>
            While there are other job boards out there (Indeed, ZipRecruiter, Dice, Built In, and many many more), LinkedIn is where recruiters live. You can have profiles on all of the previous mentioned sites, but most recruiters will still go back to LinkedIn to look you up. That's why an optimized LinkedIn profile isn't optional. It's your online resume and more.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "Agency vs Internal Recruiters",
    eyebrow: "Step 2",
    content: (
      <>
        <div className="intro-step-card">
          <p>To understand your job search better, let me give you a peek behind the curtain.</p>
          <p>
            It starts with the person either reaching out to you or reading your application. Most of the time, that person is a recruiter. Some hiring managers handle recruiting themselves, but most don't have the time or the specialized expertise, so they outsource. Either to an internal recruiting or HR team, or to a staffing agency.
          </p>
        </div>

        <div className="intro-step-compare">
          <article>
            <span>Internal Recruiter</span>
            <p>
              Works directly for one company. Their entire focus is hiring for that organization. Deep understanding of culture, team dynamics, and what leadership is really looking for. Tradeoff: focused scope, one employer.
            </p>
          </article>

          <article>
            <span>Agency Recruiter</span>
            <p>
              Works for a recruiting firm across multiple companies at once. Constantly sourcing, reaching out, and building pipelines across industries and roles. This is not a side function. It is the whole job.
            </p>
          </article>
        </div>

        <div className="intro-step-card">
          <p>
            The most common misconception I see is people thinking agency recruiters work for them. They don't. Agency recruiters work for the client, meaning the company that hired them. Yes, they earn a commission when you get placed, but that fee is paid by the client, not you. I know that sounds transactional, and honestly, it can be. That is why I have always made a point to surround myself with recruiters who lead with empathy and see people first, not just placements. There is a big difference between what I call "butts in seats" recruiting and human-first recruiting. That is why this guide was created. There's not enough strong resources out there for the job seeker, and that is what we hope to provide.
          </p>
        </div>

        <aside className="intro-step-callout intro-step-callout-dark">
          <p>
            As for why companies use agencies in the first place, think of it like any other specialty. When you need accounting support, you hire an accounting firm. Legal support, you hire a law firm. Recruiting is no different. When a company needs hiring support, they bring in a staffing agency. Agencies already have the networks, the pipelines, and the market knowledge to move fast. They bring expertise that internal teams often don't have, especially for hard-to-fill roles or when the internal team is stretched thin.
          </p>
          <p>
            The good ones go way beyond filling a seat. A strong agency recruiter isn't just sending resumes. They're pre-screening, vetting, and in many cases delivering a shortlist of two or three people where every single one could do the job. That's not luck. That's years of market knowledge, relationship building, and knowing how to read people. The average job posting gets hundreds of applications. A good agency recruiter can cut through that noise and put the right person in front of a hiring manager faster than most internal teams can schedule a kickoff call. Placement rates, offer acceptance rates, retention after placement, those numbers tell the story. The recruiters who take this seriously have numbers that reflect it.
          </p>
        </aside>
      </>
    ),
  },
  {
    title: "What Recruiters Actually See",
    eyebrow: "Step 3",
    content: (
      <>
        <div className="intro-step-card">
          <p>
            Good recruiters are trained to find the best people. That is literally the job. And when recruiters are on LinkedIn, they are not seeing what you see. They use a tool called LinkedIn Recruiter, which is a completely different interface. Recruiters can search using very specific filters like job titles, skills, years of experience, location, current or past companies, and keywords*. They also use something called boolean search, which is a way of combining keywords to get very precise results. Recruiters are not scrolling through feeds. They are hunting with meticulous accuracy.
          </p>

          <p>
            Through LinkedIn Recruiter, recruiters can message candidates directly, save profiles, organize them into pipelines, and track people throughout the hiring process. They can also see things you might not realize are visible. If you have a resume attached to your profile, they can see it. If you have contact information listed, they can see it. And if you have "Open to Work" turned on, even set to hidden from your current employer, recruiters can still see it (if they have an active LinkedIn Recruiter license). There is a lot happening behind the scenes that most job seekers never know about.
          </p>
        </div>

        <aside className="intro-step-callout intro-step-callout-light">
          <span>A Note on Keywords</span>
          <p>
            You will hear me talk about keywords a lot throughout this guide. Keywords are the specific words and phrases recruiters type into search filters to find candidates. Think job titles, skills, tools, and industry terms. If those words are not on your profile, you are not showing up in the search. We will get into exactly how to find the right keywords for your industry and where to put them, but keep this in mind as you read. It is the foundation of everything.
          </p>
        </aside>

        <div className="intro-step-card intro-step-card-short">
          <p>
            This is about making sure your profile accurately reflects what you bring to the table, in the language recruiters are actually using to find it.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Why This Guide Exists",
    eyebrow: "Step 4",
    content: (
      <div className="intro-step-card">
        <p>
          When you are building your LinkedIn profile, you are not just building it for yourself. You are building it to show up in recruiter searches and to make a strong impression the moment someone lands on your page. Recruiters decide within seconds whether a profile is worth exploring. This guide is designed to make sure yours makes that cut.
        </p>

        <p>
          I also want to be upfront with you. This guide covers a lot, and that is intentional. Every piece of it is worth your time. If you follow it closely, you will only have to do this once. You put real effort into your work every day. It makes sense to put a little effort into finding your next opportunity. It is worth doing right.
        </p>
      </div>
    ),
  },
  {
    title: "Before We Start",
    eyebrow: "Step 5",
    content: (
      <div className="intro-step-accordion">
        <details>
          <summary>LinkedIn Account Setup <span>+</span></summary>
          <p>
            If you do not have a LinkedIn account yet, go to linkedin.com and click "Join Now." It will walk you through the setup.
          </p>
        </details>

        <details>
          <summary>Important <span>+</span></summary>
          <p>
            Use your personal email address. Not your work email, and not your college email if you are still in school. Your LinkedIn account stays with you no matter where you work or where you go to school. This is where you will receive job suggestions, recruiter messages, and notifications. You want an email address that is permanently yours and that you actually check.
          </p>
        </details>
      </div>
    ),
  },
  {
    title: "How to Navigate This Guide",
    eyebrow: "Step 6",
    content: (
      <>
        <div className="intro-step-card">
          <p>
            This guide is broken out section by section so you can move through it at your own pace. If you want to jump ahead or go back to a section you already covered, look for the menu in the top right corner. It looks like three lines or three dots depending on your device. Click that and you can skip to any section directly.
          </p>
        </div>

        <div className="intro-step-card">
          <p>
            Now that you understand how this works, pull up your LinkedIn. We are going through this together and making edits as we go. This is not me talking at you. This is a collaboration.
          </p>

          <p>
            Since we are doing this together, let me introduce myself.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Your Quick Setup Check",
    eyebrow: "Step 7",
    content: (
      <section className="intro-step-checklist">
        <p>Before You Continue</p>
        <h3>Your quick setup check.</h3>

        <label>
          <input type="checkbox" />
          <span>Open your LinkedIn profile.</span>
        </label>

        <label>
          <input type="checkbox" />
          <span>Make sure you are logged into the account you actually use.</span>
        </label>

        <label>
          <input type="checkbox" />
          <span>Use your personal email address, not your work or school email.</span>
        </label>

        <label>
          <input type="checkbox" />
          <span>When you are ready, continue to the next lesson.</span>
        </label>
      </section>
    ),
  },
];

export default function IntroductionLesson() {
  const [activeStep, setActiveStep] = useState(0);

  const progress = useMemo(
    () => Math.round(((activeStep + 1) / steps.length) * 100),
    [activeStep]
  );

  const currentStep = steps[activeStep];

  function goPrevious() {
    setActiveStep((current) => Math.max(0, current - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goNext() {
    setActiveStep((current) => Math.min(steps.length - 1, current + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="intro-course">
      <div className="intro-course-topbar">
        <div>
          <span>Introduction Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="intro-course-progress">
          <span style={{ width: `${progress}%` }} />
        </div>

        <span>
          Step {activeStep + 1} of {steps.length}
        </span>
      </div>

      <div className="intro-course-layout">
        <aside className="intro-course-steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.title}
              className={
                index === activeStep
                  ? "intro-course-step intro-course-step-active"
                  : "intro-course-step"
              }
              onClick={() => {
                setActiveStep(index);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step.title}</p>
            </button>
          ))}
        </aside>

        <article className="intro-course-content">
          <div className="intro-course-heading">
            <p>{currentStep.eyebrow}</p>
            <h2>{currentStep.title}</h2>
          </div>

          <div className="intro-course-body">{currentStep.content}</div>

          <div className="intro-course-controls">
            <button
              type="button"
              onClick={goPrevious}
              disabled={activeStep === 0}
            >
              ← Previous
            </button>

            {activeStep === steps.length - 1 ? (
              <Link
                href="/course/about-the-author"
                className="intro-course-next-lesson-card"
              >
                <span>
                  <small>Next Lesson</small>
                  <strong>About the Author</strong>
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <button type="button" onClick={goNext}>
                Continue →
              </button>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
