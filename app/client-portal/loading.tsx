export default function Loading() {
  return (
    <main className="cp-main cp-home-simple" aria-busy="true">
      <div className="cp-shell">
        <section className="cp-dashboard-hero cp-home-simple-hero">
          <div>
            <p className="cp-eyebrow">Your JGO workspace</p>
            <h1 className="cp-title">Loading your dashboard...</h1>
            <p className="cp-subtitle">Getting everything ready.</p>
          </div>
        </section>
        <section className="cp-home-launchpad">
          <div className="cp-launch-card"><span className="cp-launch-icon">+</span><div><strong>Add a job</strong><small>Save a new opportunity</small></div></div>
          <div className="cp-launch-card"><span className="cp-launch-icon">JT</span><div><strong>Job Tracker</strong><small>See your pipeline</small></div></div>
          <div className="cp-launch-card"><span className="cp-launch-icon">MSG</span><div><strong>Messages</strong><small>Networking templates</small></div></div>
          <div className="cp-launch-card"><span className="cp-launch-icon">DOC</span><div><strong>Documents</strong><small>Files and coach feedback</small></div></div>
        </section>
      </div>
    </main>
  );
}
