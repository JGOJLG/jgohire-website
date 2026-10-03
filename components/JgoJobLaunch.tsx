import s from "./JgoJobLaunch.module.css";
export default function JgoJobLaunch(){
 const url="https://jgojob.com/?utm_source=jgohire&utm_medium=website&utm_campaign=jgojob_launch&utm_content=homepage";
 return <section className={s.section} aria-labelledby="jgojob-title"><div className={s.shell}>
   <div className={s.brand}><span>JGO JOB</span><small>JOB TRACKER</small></div>
   <div className={s.content}>
    <div className={s.copy}><h2 id="jgojob-title">Your job search,<br/>organized.</h2><p>Applications. People. Interviews. Follow-ups. Keep everything connected in one simple place.</p><div className={s.action}><a href={url}>Try JGO Job <span>→</span></a><small>Free for a limited time · No credit card required</small></div></div>
    <div className={s.visual} aria-hidden="true"><div className={s.paper}><div className={s.paperHead}><b>JGO JOB</b><span>JOB TRACKER</span></div><div className={s.row}><i></i><span>Applications</span><b>12</b></div><div className={s.row}><i></i><span>Interviews</span><b>3</b></div><div className={s.row}><i></i><span>Follow-ups</span><b>4</b></div></div></div>
   </div>
 </div></section>
}