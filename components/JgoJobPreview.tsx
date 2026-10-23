import s from "./JgoJobLaunch.module.css";
export default function JgoJobPreview(){return (
  <div className={s.preview} aria-label="Illustrative JGO Job dashboard with sample jobs">
   <div className={s.backplate}></div>
   <div className={s.frame} style={{fontFamily:"Arial,sans-serif",fontSize:9,color:"#173f33",transform:"none",borderRadius:13}}>
    <div style={{display:"flex",alignItems:"center",padding:"10px 12px",gap:7,borderBottom:"1px solid #e6eae6",background:"#fff"}}><b className={s.appIcon}>J</b><strong style={{fontFamily:"Georgia,serif",fontSize:13}}>JGO JOB</strong><span style={{fontSize:8,color:"#ad822e",border:"1px solid #d8b66c",padding:"4px 7px",borderRadius:20}}>JGO JOB+</span><span style={{marginLeft:"auto",fontSize:8,color:"#607269"}}>Dashboard</span></div>
    <div style={{display:"flex",background:"#fff",minHeight:350}}>
     <aside style={{width:"21%",flexShrink:0,boxSizing:"border-box",padding:"12px 6px",borderRight:"1px solid #e6eae6",background:"#fafbf9"}}>
      {["Dashboard","My Jobs","Messages","Find Jobs","JGO Job+","Help"].map((item,i)=><div key={item} style={{padding:"11px 6px",fontSize:8,whiteSpace:"nowrap",background:i===0?"#e8eee9":"transparent",borderLeft:i===0?"3px solid #174c3c":"3px solid transparent",borderRadius:4,fontWeight:i===0?700:400,color:i===4?"#aa7d29":"#173f33"}}>{item}</div>)}
     </aside>
     <div style={{flex:1,minWidth:0,padding:"14px 12px",boxSizing:"border-box"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}><div><small style={{fontSize:7,letterSpacing:1,color:"#8a9b91"}}>JGO JOB / WORKSPACE</small><h3 style={{fontFamily:"Georgia,serif",fontSize:19,margin:"5px 0",color:"#174236"}}>Your Job Search, Organized.</h3><p style={{margin:0,fontSize:7,color:"#74847a"}}>Track opportunities, write messages, manage outreach.</p></div><span style={{padding:"9px 12px",background:"#174c3c",borderRadius:5,color:"#fff",whiteSpace:"nowrap",fontSize:8}}>+ Add job</span></div>
      <div style={{display:"flex",gap:14,borderBottom:"1px solid #dbe6de",padding:"14px 0 9px",fontSize:8}}><b>Overview</b><span>My jobs</span><span>Upcoming interviews</span><span>Next up</span></div>
      <div style={{display:"grid",gridTemplateColumns:"minmax(0,2.1fr) minmax(105px,1fr)",gap:9,marginTop:11}}>
       <div style={{minWidth:0,border:"1px solid #e0e7e1",borderRadius:9,overflow:"hidden"}}>
        <div style={{padding:10,background:"#f0f7f2"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:5}}><strong style={{fontFamily:"Georgia,serif",fontSize:14}}>Your opportunities</strong><span style={{background:"#fff",border:"1px solid #dbe4dd",borderRadius:5,padding:6,color:"#87958b",fontSize:7}}>Search company or position</span></div><div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:10}}>{["All","Saved","Applied","Follow Up","Interviewing","Offer"].map((x,i)=><span key={x} style={{padding:"5px 7px",background:i===0?"#174c3c":"#fff",color:i===0?"#fff":"#174236",border:"1px solid #d8e2da",borderRadius:5,fontSize:7}}>{x}</span>)}</div></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:7,padding:9}}>
         {[["Northstar Health","Marketing Manager","Remote · $95,000–$115,000/yr","Interviewing","Send follow-up"],["Brightside Tech","Product Designer","New York · $110,000–$135,000/yr","Applied","Not set"],["Summit Group","Account Executive","Hybrid · $85,000–$105,000/yr","Saved","Reach out to recruiter"]].map(([company,title,details,status,next])=><div key={company} style={{border:"1px solid #e0e7e1",borderRadius:8,padding:9,minWidth:0}}><small style={{fontSize:7,color:"#678577"}}>{company}</small><strong style={{display:"block",fontSize:10,margin:"4px 0"}}>{title}</strong><span style={{fontSize:7,color:"#687d72"}}>{details}</span><div style={{borderTop:"1px solid #e6eae6",marginTop:10,paddingTop:7,display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}><div><small style={{fontSize:6,color:"#8a9a8e"}}>STATUS</small><div style={{padding:"6px 3px",background:"#eaf4ed",borderRadius:4,fontSize:7}}>{status}</div></div><div><small style={{fontSize:6,color:"#8a9a8e"}}>NEXT STEP</small><div style={{fontSize:7,marginTop:5}}>{next}</div></div></div></div>)}
        </div>
       </div>
       <div style={{display:"flex",flexDirection:"column",gap:8,minWidth:0}}>
        <div style={{border:"1px solid #e0e7e1",borderRadius:8,padding:10}}><strong style={{fontFamily:"Georgia,serif",fontSize:13}}>Upcoming interviews</strong><div style={{borderTop:"1px solid #e8ece8",marginTop:9,paddingTop:9,fontSize:8}}><span style={{background:"#edf4ef",padding:5,borderRadius:4,marginRight:5}}>NOV 05</span><b>Marketing Manager</b><small style={{display:"block",margin:"6px 0 0 5px",color:"#76877d"}}>Northstar Health · Video interview</small></div></div>
        <div style={{border:"1px solid #e0e7e1",borderRadius:8,padding:10}}><strong style={{fontFamily:"Georgia,serif",fontSize:13}}>Tasks <span style={{color:"#72937d"}}>2</span></strong><div style={{borderTop:"1px solid #e8ece8",marginTop:9,paddingTop:8,fontSize:8}}>☐ Send follow-up email</div><div style={{paddingTop:8,fontSize:8}}>☐ Prepare interview examples</div></div>
        <div style={{border:"1px solid #e0e7e1",borderRadius:8,padding:10}}><strong style={{fontFamily:"Georgia,serif",fontSize:12}}>Recent activity</strong><div style={{marginTop:8,fontSize:8,color:"#61766a"}}>Brightside Tech · Applied</div></div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
);}
