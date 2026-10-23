import s from "./JgoJobLaunch.module.css";
export default function JgoJobLaunch(){
 const url="https://jgojob.com/?utm_source=jgohire&utm_medium=website&utm_campaign=jgojob_launch&utm_content=homepage";
 return <section className={s.section} aria-labelledby="jgojob-title"><div className={s.shell}>
  <div className={s.copy}>
   <div className={s.brand}><span>JGO JOB</span><i></i><small>JOB TRACKER</small></div>
   <h2 id="jgojob-title">Your job search,<br/>a little easier.</h2>
   <p>Track applications, manage outreach, and stay on top of interviews and follow-ups. Everything in one place, so your job search feels a little less overwhelming.</p>
   <a className={s.cta} href={url}>Start for free</a>
   <small className={s.note}>Free job tracker. No credit card required.</small>
  </div>
  <div className={s.preview} aria-label="JGO Job dashboard preview">
   <div className={s.backplate}></div>
   <div className={s.frame} style={{fontFamily:"Arial, sans-serif",fontSize:"10px",color:"#173f33"}}>
    <div className={s.appTop}><b className={s.appIcon}>J</b><strong>JGO JOB</strong><nav><span className={s.active}>Job Tracker</span><span>Find Jobs</span><span>How It Works</span></nav></div>
    <div className={s.appHero}><div><small>WELCOME BACK</small><h3>Let’s keep this organized.</h3><p>Your applications, follow-ups, interviews and next moves — all in one place.</p></div><span className={s.fakeButton}>＋ Add a Job</span></div>
    <div className={s.stats}><div><small>▣ &nbsp; ALL JOBS</small><b>11</b><p>opportunities tracking</p></div><div><small>↗ &nbsp; APPLIED</small><b>8</b><p>You applied. Great. Now don’t disappear.</p></div><div><small>▯ &nbsp; INTERVIEWS</small><b>6</b><p>now we have something to work with</p></div><div><small>☆ &nbsp; OFFERS</small><b>2</b><p>okay, now we’re talking</p></div></div>
    <div className={s.appBottom}><div><b>▣ &nbsp; Upcoming Interviews</b><u>View all</u></div><div><b>☑ &nbsp; Tasks</b><u>View all</u></div></div>
   </div>
  </div>
 </div><div className={s.premium}><div className={s.premiumCopy}><div className={s.premiumEyebrow}>JGO JOB+ <span>PREMIUM</span></div><h3>A little extra help for every step of your job search.</h3><p>Get the tools and guidance of a recruiter and career coach, right when you need them.</p><div className={s.premiumFeatures}><div><strong>150+ ready-to-use message templates</strong><span>Reach out to recruiters, follow up, network, and navigate offers with confidence.</span></div><div><strong>Interview preparation</strong><span>Know what to expect, how to prepare, and how to talk about your experience.</span></div><div><strong>Job search insights</strong><span>See what is working and where to focus your energy.</span></div><div><strong>Your Next Move</strong><span>Clear, practical guidance on what to do next.</span></div></div><div className={s.premiumAction}><a href="https://jgojob.com/?utm_source=jgohire&utm_medium=website&utm_campaign=jgojob_plus&utm_content=homepage">Explore JGO Job+</a><span>$9.23/month · Built to be canceled.</span></div></div><div className={s.premiumPreview} aria-label="JGO Job Plus message templates preview"><div className={s.premiumAppTop}><b className={s.appIcon}>J</b><strong>JGO JOB+</strong><span>Messages</span></div><div className={s.premiumAppBody}><small>MESSAGE TEMPLATES</small><h4>Find the right words.</h4><p>150+ templates written from a recruiter and career coach perspective.</p><div className={s.templateTabs}><b>Recruiter / Hiring Manager</b><span>Networking</span><span>Follow-ups</span></div><div className={s.templateRows}><div>Initial outreach <span>Warm · Professional</span></div><div>After applying <span>Warm · Professional</span></div><div>After an interview <span>Warm · Professional</span></div><div>Ask for a referral <span>Warm · Professional</span></div></div></div></div></div></section>
}