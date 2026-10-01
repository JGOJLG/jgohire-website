"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AUTH_ROUTES = new Set(["/client-portal/login","/client-portal/signup"]);

const nav=[
  {href:"/client-portal",label:"Dashboard",icon:"⌂"},
  {href:"/client-portal/jobs",label:"Job Tracker",icon:"▣"},
  {href:"/client-portal#message-templates",label:"Message Templates",icon:"✉"},
  {href:"/client-portal/files",label:"Documents",icon:"□"},
  {href:"/client-portal/resources",label:"Resources",icon:"◇"},
];

export default function PortalHeader(){
 const pathname=usePathname();
 if(AUTH_ROUTES.has(pathname))return null;
 return <aside className="cp-sidebar">
   <div className="cp-sidebar-inner">
    <Link href="/client-portal" className="cp-brand cp-sidebar-brand"><span className="cp-brand-mark">JGO</span><span className="cp-brand-copy"><strong>JGO HIRE</strong><small>Career workspace</small></span></Link>
    <nav className="cp-nav cp-sidebar-nav" aria-label="Client portal navigation">
      {nav.map(n=><Link key={n.label} href={n.href} className={pathname===n.href||(n.href!=="/client-portal"&&pathname.startsWith(n.href.split("#")[0]))?"active":""}><span className="cp-side-icon">{n.icon}</span><span>{n.label}</span></Link>)}
    </nav>
    <div className="cp-sidebar-foot"><span className="cp-sidebar-label">YOUR WORKSPACE</span><p>Everything for your search, in one place.</p><form action="/auth/signout" method="post"><button type="submit" className="cp-sidebar-logout">Log out</button></form></div>
   </div>
 </aside>
}