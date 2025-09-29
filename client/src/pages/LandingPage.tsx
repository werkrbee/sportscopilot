import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AgentBlocks from "@/components/AgentBlocks";
import FinalCTA from "@/components/FinalCTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <AgentBlocks />
        <FinalCTA />
      </main>
    </div>
  );
}