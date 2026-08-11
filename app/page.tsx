import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import CredibilityStrip from "@/components/CredibilityStrip";
import HowCanIHelp from "@/components/HowCanIHelp";
import Services from "@/components/Services";
import FreeSurvivalGuide from "@/components/FreeSurvivalGuide";
import RecruiterAdvantage from "@/components/RecruiterAdvantage";
import FinalCTA from "@/components/FinalCTA";
import LinkedInGuide from "@/components/LinkedInGuide";
import JobSearchQuizPopup from "@/components/JobSearchQuizPopup";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <CredibilityStrip />
      <HowCanIHelp />
      <Services />

      <FreeSurvivalGuide />

      <LinkedInGuide />
      <RecruiterAdvantage />
      <FinalCTA />

      <JobSearchQuizPopup />
    </main>
  );
}