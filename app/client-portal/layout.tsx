import Link from "next/link";
import "./portal.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="client-portal">
      <style>{`
        @media (max-width: 900px) {
          .client-portal .cp-header-inner {
            min-height: 0;
            padding-top: 10px;
            padding-bottom: 8px;
            flex-wrap: wrap;
            gap: 8px;
          }
          .client-portal .cp-nav {
            display: flex !important;
            width: 100%;
            flex-wrap: nowrap;
            overflow-x: auto;
            gap: 4px;
            padding-bottom: 2px;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .client-portal .cp-nav::-webkit-scrollbar { display: none; }
          .client-portal .cp-nav a,
          .client-portal .cp-nav button {
            flex: 0 0 auto;
            white-space: nowrap;
            padding: 8px 10px;
            font-size: 12px;
          }
        }
      `}</style>
      <header className="cp-header">
        <div className="cp-shell cp-header-inner">
          <Link href="/client-portal" className="cp-brand">
            <strong>JGO HIRE</strong>
            <span>Client Portal</span>
          </Link>
          <nav className="cp-nav" aria-label="Client portal navigation">
            <Link href="/client-portal">Home</Link>
            <Link href="/client-portal/jobs">Job Tracker</Link>
            <Link href="/client-portal/files">Documents</Link>
            <Link href="/client-portal/resources">Resources</Link>
            <Link href="/auth/signout">Log out</Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
