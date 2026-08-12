import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Free15Client from "./Free15Client";
import "./free15.css";

export const metadata: Metadata = {
  title: "Free 15 Minute Call | JGO Hire",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Free15Page() {
  return (
    <main>
      <SiteHeader />
      <Free15Client />
    </main>
  );
}
