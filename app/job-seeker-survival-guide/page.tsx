import type { Metadata } from "next";
import SurvivalGuideClient from "./SurvivalGuideClient";

export const metadata: Metadata = {
  title: "Job Seeker Survival Guide | JGO Hire",
  description:
    "The JGO Hire Job Seeker Survival Guide: how to navigate the modern job search without losing your mind.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function JobSeekerSurvivalGuidePage() {
  return <SurvivalGuideClient />;
}