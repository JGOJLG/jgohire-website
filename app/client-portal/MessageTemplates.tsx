"use client";
import {useState} from "react";
import {createClient} from "@/lib/supabase/client";

type SavedTemplate={id:number;user_id:string;name:string;body:string;created_at:string;updated_at:string};

const JGO_TEMPLATES=[
  {name:"Connection Note",timing:"When you send the connection request",body:"Hi {First Name}, I came across your profile while looking into the {Role Title} opportunity at {Company}. I’d love to connect and learn more about your experience there. Thanks!"},
  {name:"After They Accept",timing:"Send about 24 hours after they accept",body:"Hi {First Name}, thanks for connecting! I’m really interested in the {Role Title} role at {Company}. {1 sentence about why you’re interested in the role}. If you have a few minutes, I’d love to hear anything you’re open to sharing about the team or your experience there."},
  {name:"Initial Message",timing:"For a direct message to a recruiter or relevant contact",body:"Hi {First Name}, I’m reaching out because I’m interested in the {Role Title} opportunity at {Company}. {1 sentence about why you’re interested in the role}. My background in {Relevant Experience} seems closely aligned, so I wanted to introduce myself. Thanks for your time!"},
  {name:"Final Follow-Up",timing:"Send about 1 week later",body:"Hi {First Name}, just following up on my note about the {Role Title} role at {Company}. I know things get busy, but I’m still very interested and wanted to stay on your radar. Thanks again!"}
];

export default function MessageTemplates({userId,initialTemplates}:{userId:string;initialTemplates:SavedTemplate[]}){
 const s=createClient(),[saved,setSaved]=useState(initialTemplates),[open,setOpen]=useState<string|null>(null),[draft,setDraft]=useState(""),[copied,setCopied]=useState<string|null>(null),[adding,setAdding]=useState(false),[name,setName]=useState(""),[body,setBody]=useState("");
 function customize(t:{name:string;body:string}){setOpen(t.name);setDraft(t.body);setCopied(null)}
 async function copy(text:string,key:string){await navigator.clipboard.writeText(text);setCopied(key);setTimeout(()=>setCopied(null),1600)}
 async function addTemplate(){if(!name.trim()||!body.trim())return;const{data,error}=await s.from("client_message_templates").insert({user_id:userId,name:name.trim(),body:body.trim()}).select("*").single();if(!error&&data){setSaved(v=>[data,...v]);setName("");setBody("");setAdding(false)}}
 async function saveTemplate(t:SavedTemplate,nextName:string,nextBody:string){const{data,error}=await s.from("client_message_templates").update({name:nextName.trim(),body:nextBody.trim(),updated_at:new Date().toISOString()}).eq("id",t.id).eq("user_id",userId).select("*").single();if(!error&&data)setSaved(v=>v.map(x=>x.id===t.id?data:x))}
 async function removeTemplate(t:SavedTemplate){if(!confirm("Delete this template?"))return;const{error}=await s.from("client_message_templates").delete().eq("id",t.id).eq("user_id",userId);if(!error)setSaved(v=>v.filter(x=>x.id!==t.id))}
 return <div className="cp-card" style={{padding:20}}>
   <div className="cp-section-head"><div><p className="cp-eyebrow">Message templates</p><h2>Reach out without starting from scratch</h2><p className="cp-muted">Choose a JGO template, personalize the highlighted fill-ins, then copy it when you’re ready.</p></div></div>
   <div style={{display:"grid",gap:10}}>
    {JGO_TEMPLATES.map(t=><div key={t.name} style={{border:"1px solid #e1e7df",borderRadius:14,padding:14,background:"#fff"}}>
      <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"center",flexWrap:"wrap"}}><div><strong>{t.name}</strong><div className="cp-muted" style={{fontSize:12,marginTop:2}}>{t.timing}</div></div><button className="cp-button secondary" style={{padding:"8px 12px"}} onClick={()=>customize(t)}>Customize</button></div>
      {open===t.name?<div style={{marginTop:12,paddingTop:12,borderTop:"1px solid #edf0eb"}}><label style={{fontWeight:800,fontSize:12}}>Edit your message</label><textarea className="cp-input" rows={6} value={draft} onChange={e=>setDraft(e.target.value)} style={{marginTop:6,width:"100%",resize:"vertical"}}/><div className="cp-muted" style={{fontSize:11,marginTop:5}}>Replace anything in {"{brackets}"} with your details.</div><div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}><button className="cp-button" onClick={()=>copy(draft,t.name)}>{copied===t.name?"Copied!":"Copy Message"}</button><button className="cp-button secondary" onClick={()=>setOpen(null)}>Close</button></div></div>:null}
    </div>)}
   </div>
   <div style={{borderTop:"1px solid #e3e8e1",marginTop:20,paddingTop:18}}>
    <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"center",flexWrap:"wrap"}}><div><h3 style={{margin:0}}>My Templates</h3><p className="cp-muted" style={{margin:"4px 0 0"}}>Save messages you use often. Only you can see these.</p></div><button className="cp-button secondary" onClick={()=>setAdding(v=>!v)}>{adding?"Cancel":"+ New template"}</button></div>
    {adding?<div style={{marginTop:12,display:"grid",gap:8}}><input className="cp-input" placeholder="Template name" value={name} onChange={e=>setName(e.target.value)}/><textarea className="cp-input" rows={5} placeholder="Write your message..." value={body} onChange={e=>setBody(e.target.value)}/><div><button className="cp-button" onClick={addTemplate}>Save Template</button></div></div>:null}
    <div style={{display:"grid",gap:10,marginTop:saved.length?14:0}}>{saved.map(t=><SavedRow key={t.id} t={t} onSave={saveTemplate} onDelete={removeTemplate} onCopy={copy} copied={copied}/>)}</div>
   </div>
 </div>
}
function SavedRow({t,onSave,onDelete,onCopy,copied}:{t:SavedTemplate;onSave:(t:SavedTemplate,n:string,b:string)=>void;onDelete:(t:SavedTemplate)=>void;onCopy:(x:string,k:string)=>void;copied:string|null}){
 const[n,setN]=useState(t.name),[b,setB]=useState(t.body),[edit,setEdit]=useState(false),key="saved-"+t.id;
 return <div style={{border:"1px solid #e1e7df",borderRadius:12,padding:12,background:"#fbfcfa"}}>{edit?<div style={{display:"grid",gap:8}}><input className="cp-input" value={n} onChange={e=>setN(e.target.value)}/><textarea className="cp-input" rows={5} value={b} onChange={e=>setB(e.target.value)}/><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button className="cp-button" onClick={()=>{onSave(t,n,b);setEdit(false)}}>Save</button><button className="cp-button secondary" onClick={()=>setEdit(false)}>Cancel</button></div></div>:<div><div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"center",flexWrap:"wrap"}}><strong>{t.name}</strong><div style={{display:"flex",gap:7,flexWrap:"wrap"}}><button className="cp-button secondary" style={{padding:"7px 10px"}} onClick={()=>onCopy(t.body,key)}>{copied===key?"Copied!":"Copy"}</button><button className="cp-link" style={{border:0,background:"transparent",cursor:"pointer"}} onClick={()=>setEdit(true)}>Edit</button><button className="cp-link" style={{border:0,background:"transparent",cursor:"pointer"}} onClick={()=>onDelete(t)}>Delete</button></div></div><p className="cp-muted" style={{whiteSpace:"pre-wrap",marginBottom:0,fontSize:13}}>{t.body}</p></div>}</div>
}