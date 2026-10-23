import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import styles from "./page.module.css";

const appUrl = "https://jgojob.com";
const features = [
  { title: "Keep every application in one place", description: "Save job details, links, salary ranges, benefits, application status, and next steps instead of searching through tabs and spreadsheets." },
  { title: "Track the people behind each opportunity", description: "Organize recruiters, hiring managers, LinkedIn connections, messages, and outreach follow-ups alongside each job." },
  { title: "Stay ahead of interviews", description: "Keep interview dates, rounds, notes, and follow-up tasks connected to the role you are pursuing." },
  { title: "See what needs your attention", description: "Use your dashboard to review upcoming interviews, active applications, and what to do next." },
  { title: "Write outreach with more confidence", description: "JGO Job+ offers 150+ recruiter-informed message templates for networking, follow-ups, referrals, and more." },
  { title: "Prepare for the conversation", description: "JGO Job+ includes an interview preparation workspace and additional insights to help you approach each opportunity." },
];

export default function JGOJobPage() {
  return <main className={styles.page}>
    <SiteHeader />
    <section className={styles.hero}>
      <div className={`${styles.shell} ${styles.heroGrid}`}>
        <div>
          <p className={styles.eyebrow}>Introducing JGO Job</p>
          <h1>Make your job search a little more simple, a lot more organized.</h1>
          <p>Applying is only one part of the job search. Between tracking applications, reaching out to recruiters, scheduling interviews, and remembering follow-ups, there is a lot to manage. JGO Job puts it all in one place.</p>
          <div className={styles.buttons}>
            <a className={styles.primary} href={appUrl} target="_blank" rel="noopener noreferrer">Start for Free ↗</a>
            <a className={styles.secondary} href="#features">Explore Features</a>
          </div>
          <p style={{fontSize:13,marginTop:16}}>Free to get started. Upgrade only if you want more support.</p>
        </div>
        <div><Image src="/jgo-job-homepage-promo.webp" alt="Preview of the JGO Job job search organizer" width={900} height={700} className={styles.heroImage} priority /></div>
      </div>
    </section>
    <section className={styles.section} id="features"><div className={styles.shell}>
      <p className={styles.eyebrow}>Everything in one place</p>
      <h2>Less tracking. More moving forward.</h2>
      <p className={styles.lead}>You should not have to piece together your job search across spreadsheets, notes, emails, and browser tabs. Keep the important details together, so you know where things stand.</p>
      <div className={styles.grid}>{features.map(f=><article className={styles.feature} key={f.title}><h3>{f.title}</h3><p>{f.description}</p></article>)}</div>
    </div></section>
    <section className={`${styles.section} ${styles.muted}`}><div className={`${styles.shell} ${styles.split}`}>
      <div><p className={styles.eyebrow}>Built by a recruiter and career coach</p><h2>Because a job search is more than an application.</h2><p className={styles.lead}>JGO Job was created by Jennifer Gordon, a recruiter and Certified Career Coach, to help job seekers manage the work that happens before and after they click Apply. It is designed to make the process easier to navigate, not more complicated.</p></div>
      <div><p className={styles.eyebrow}>A simpler workflow</p><ol className={styles.list}><li>Save the jobs you are interested in or have applied to.</li><li>Keep contact information and outreach together.</li><li>Record interviews, notes, and next steps.</li><li>Return to your dashboard to see what comes next.</li></ol></div>
    </div></section>
    <section className={styles.section}><div className={styles.shell}>
      <p className={styles.eyebrow}>Choose what works for you</p><h2>Start free. Add coaching tools when you need them.</h2>
      <div className={`${styles.grid} ${styles.split}`} style={{gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))"}}>
        <article className={styles.plan}><h3>JGO Job</h3><div className={styles.price}>Free</div><p>Organize applications, track outreach, manage contacts and interviews, and keep up with your next steps.</p><a className={styles.secondary} href={appUrl} target="_blank" rel="noopener noreferrer">Get Started Free ↗</a></article>
        <article className={styles.plan}><h3>JGO Job+</h3><div className={styles.price}>$9.23 <span style={{fontSize:15,fontWeight:400}}>/ month</span></div><p>Everything in the free version, plus 150+ message templates, interview preparation, job insights, and personalized next-move guidance.</p><a className={styles.primary} href={appUrl} target="_blank" rel="noopener noreferrer">Explore Job+ ↗</a><p style={{fontSize:13}}>Built to be canceled when you no longer need it.</p></article>
      </div>
    </div></section>
    <section className={styles.foot}><div className={styles.shell}><h2>Your job search has enough moving parts.</h2><p>Give yourself one organized place to keep track of them. Get started with JGO Job for free.</p><a className={styles.primary} href={appUrl} target="_blank" rel="noopener noreferrer">Try JGO Job Free ↗</a></div></section>
  </main>;
}
