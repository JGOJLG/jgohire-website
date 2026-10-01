"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AUTH_ROUTES = new Set(["/client-portal/login","/client-portal/signup"]);

export default function PortalHeader(){
 const pathname=usePathname();
 if(AUTH_ROUTES.has(pathname))return null;
 return <header className="cp-header cp-dashboard-topbar">
   <div className="cp-shell cp-header-inner">
    <Link href="/client-portal" className="cp-brand">
      <span className="cp-brand-mark">JGO</span>
      <span className="cp-brand-copy"><strong>JGO HIRE</strong><small>Career workspace</small></span>
    </Link>
    <nav className="cp-nav" aria-label="Client portal navigation">
      <Link href="/client-portal" className={pathname==="/client-portal"?"active":""}>Dashboard</Link>
      <Link href="/client-portal/jobs" className={pathname.startsWith("/client-portal/jobs")?"active":""}>Job Tracker</Link>
      <Link href="/client-portal#message-templates">Message Templates</Link>
      <Link href="/client-portal/files" className={pathname.startsWith("/client-portal/files")?"active":""}>Documents</Link>
      <Link href="/client-portal/resources" className={pathname.startsWith("/client-portal/resources")?"active":""}>Resources</Link>
      <form action="/auth/signout" method="post" style={{display:"contents"}}><button type="submit" className="cp-topbar-logout">Log out</button></form>
    </nav>
   </div>
 </header>
}