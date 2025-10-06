import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AgentBlocks from "@/components/AgentBlocks";
import GameFramework from "@/components/GameFramework";
import FinalCTA from "@/components/FinalCTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <AgentBlocks />
        <GameFramework />
        <FinalCTA />
      </main>
    </div>
  );
}