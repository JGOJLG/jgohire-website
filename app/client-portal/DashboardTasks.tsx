"use client";
import {useState} from "react";
import {createClient} from "@/lib/supabase/client";

type Task={id:number;user_id:string;title:string;due_date:string|null;completed:boolean;created_at:string;updated_at:string};
type Action={key:string;title:string;detail:string;href?:string;cta?:string;urgent?:boolean};

export default function DashboardTasks({userId,initialTasks,suggestedActions,completedKeys}:{userId:string;initialTasks:Task[];suggestedActions:Action[];completedKeys:string[]}){
 const supabase=createClient();
 const[tasks,setTasks]=useState<Task[]>(initialTasks);
 const[title,setTitle]=useState("");
 const[dueDate,setDueDate]=useState("");
 const[busy,setBusy]=useState(false);
 const[actionDone,setActionDone]=useState(new Set(completedKeys));
 const visibleActions=suggestedActions.filter(action=>!actionDone.has(action.key));

 async function addTask(){
  const cleanTitle=title.trim();
  if(!cleanTitle||busy)return;
  setBusy(true);
  const result=await supabase.from("client_dashboard_tasks").insert({user_id:userId,title:cleanTitle,due_date:dueDate||null}).select().single();
  setBusy(false);
  if(result.error||!result.data){window.alert("Could not add that task. Please try again.");return}
  setTasks(current=>[...current,result.data as Task]);
  setTitle("");
  setDueDate("");
 }

 async function toggleTask(task:Task){
  const result=await supabase.from("client_dashboard_tasks").update({completed:!task.completed,updated_at:new Date().toISOString()}).eq("id",task.id).eq("user_id",userId).select().single();
  if(result.error||!result.data){window.alert("Could not update that task.");return}
  setTasks(current=>current.map(item=>item.id===task.id?result.data as Task:item));
 }

 async function deleteTask(task:Task){
  const result=await supabase.from("client_dashboard_tasks").delete().eq("id",task.id).eq("user_id",userId);
  if(result.error){window.alert("Could not delete that task.");return}
  setTasks(current=>current.filter(item=>item.id!==task.id));
 }

 async function completeAction(key:string){const result=await supabase.from("client_portal_action_completions").upsert({user_id:userId,action_key:key},{onConflict:"user_id,action_key"});if(result.error){window.alert("Could not complete that task.");return}setActionDone(current=>new Set([...current,key]));}

 return <div className="cp-card cp-dashboard-tasks">
  <div className="cp-section-head"><div><p className="cp-eyebrow">Today</p><h2>Your tasks</h2><p className="cp-muted">Your next moves and anything else you want to get done, all in one place.</p></div><span className="cp-today-count">{visibleActions.length+tasks.filter(task=>!task.completed).length} to do</span></div>
  <div className="cp-task-add">
   <input className="cp-input" value={title} onChange={event=>setTitle(event.target.value)} placeholder="Add a task..." aria-label="Task"/>
   <input className="cp-input cp-task-date" type="date" value={dueDate} onChange={event=>setDueDate(event.target.value)} aria-label="Due date"/>
   <button className="cp-button" disabled={busy||!title.trim()} onClick={addTask}>{busy?"Adding...":"+ Add task"}</button>
  </div>
  {visibleActions.length?<div className="cp-todo-list cp-combined-next-moves">{visibleActions.slice(0,5).map(action=><div className={"cp-todo"+(action.urgent?" urgent":"")} key={action.key}><button className="cp-check" aria-label={"Mark "+action.title+" complete"} onClick={()=>completeAction(action.key)}></button><div className="cp-todo-copy"><strong>{action.title}</strong><span>{action.detail}</span></div>{action.href?<a className="cp-todo-action" href={action.href}>{action.cta||"Do it"}</a>:null}</div>)}</div>:null}\n  <div className="cp-task-list">
   {tasks.length?tasks.map(task=><div className={"cp-task-row"+(task.completed?" completed":"")} key={task.id}>
    <button className="cp-task-check" onClick={()=>toggleTask(task)} aria-label={task.completed?"Mark incomplete":"Mark complete"}>{task.completed?"X":""}</button>
    <div className="cp-task-copy"><strong>{task.title}</strong>{task.due_date?<small>Due {new Date(task.due_date+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}</small>:null}</div>
    <button className="cp-task-delete" onClick={()=>deleteTask(task)} aria-label="Delete task">Delete</button>
   </div>):<div className="cp-task-empty">No personal tasks yet. Add one above.</div>}
  </div>
 </div>;
}
