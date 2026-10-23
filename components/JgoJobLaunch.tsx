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
 </div><div style={{maxWidth:1180,margin:"48px auto 0",padding:32,background:"#f3ecdf",borderRadius:18,boxSizing:"border-box",width:"calc(100% - 32px)"}}><div style={{color:"#98742c",fontWeight:700,fontSize:12,letterSpacing:2}}>JGO JOB+ · PREMIUM</div><h3 style={{fontFamily:"Georgia,serif",color:"#174236",fontSize:36,fontWeight:400,margin:"16px 0"}}>A little extra help for your job search.</h3><p style={{color:"#626f68",lineHeight:1.6}}>Get recruiter-informed tools to help you write outreach messages, prepare for interviews, and figure out what comes next.</p><div style={{display:"flex",flexWrap:"wrap",gap:12,marginTop:24}}>{[["150+ message templates","Outreach, follow-ups, networking and more."],["Interview preparation","Prepare for questions and tell your story."],["Job search insights","Understand your progress."],["Your Next Move","Know what to focus on next."]].map(([title,desc])=><div key={title} style={{flex:"1 1 220px",background:"#fff",padding:20,borderRadius:12,border:"1px solid #e5dccb"}}><strong style={{display:"block",color:"#174236",marginBottom:8}}>{title}</strong><span style={{color:"#69736d",fontSize:13}}>{desc}</span></div>)}</div><div style={{display:"flex",flexWrap:"wrap",gap:20,alignItems:"center",marginTop:24}}><a href="https://jgojob.com/" style={{background:"#a47a2b",color:"#fff",padding:"14px 24px",borderRadius:40,textDecoration:"none",fontWeight:700}}>Explore JGO Job+</a><span>$9.23/month · Built to be canceled.</span></div></div></section>
}