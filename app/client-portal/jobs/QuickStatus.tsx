"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./status.module.css";

const statuses = [
  "Open / Interested",
  "Application Submitted",
  "Messaged Contact",
  "Recruiter Screen",
  "Interviewing",
  "Final Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
  "Closed",
];

const key = (s: string) =>
  s.toLowerCase().replaceAll(" / ", "-").replaceAll(" ", "-");

export default function QuickStatus({
  jobId,
  userId,
  status,
  onStatusSaved,
}: {
  jobId: number;
  userId: string;
  status: string;
  onStatusSaved?: (status: string) => void;
}) {
  const s = createClient();
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    setValue(status);
  }, [status]);

  async function change(next: string) {
    const previous = value;
    setValue(next);
    setSaving(true);

    const { data, error } = await s
      .from("client_job_applications")
      .update({ status: next, updated_at: new Date().toISOString() })
      .eq("id", jobId)
      .eq("user_id", userId)
      .select("status")
      .single();

    setSaving(false);

    if (error || !data) {
      setValue(previous);
      return;
    }

    const savedStatus = data.status || next;
    setValue(savedStatus);
    onStatusSaved?.(savedStatus);

    if (savedStatus === "Offer") {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 3200);
    }
  }

  return (
    <div className={styles.wrap} onClick={(e) => e.stopPropagation()}>
      {celebrate ? (
        <div className={styles.celebration} aria-live="polite">
          <div className={styles.confetti}>
            {Array.from({ length: 22 }).map((_, i) => (
              <i key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
          <strong>YOU GOT AN OFFER!</strong>
          <span>Congrats! This is huge.</span>
        </div>
      ) : null}

      <select
        aria-label="Update job status"
        className={`${styles.select} ${styles[key(value)] || ""}`}
        value={value}
        disabled={saving}
        onChange={(e) => change(e.target.value)}
      >
        {statuses.map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
      {saving ? <span className={styles.saving}>Saving…</span> : null}
    </div>
  );
}
