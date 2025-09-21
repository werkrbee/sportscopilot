import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AgentBlocks from "@/components/AgentBlocks";
import AgencyPhilosophy from "@/components/AgencyPhilosophy";
import ContentCascade from "@/components/ContentCascade";
import DrillShowcase from "@/components/DrillShowcase";
import FinalCTA from "@/components/FinalCTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <AgentBlocks />
        <AgencyPhilosophy />
        <ContentCascade />
        <DrillShowcase />
        <FinalCTA />
      </main>
    </div>
  );
}