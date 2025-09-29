import { Card } from "@/components/ui/card";
import { Search, Target, TrendingUp } from "lucide-react";

const agents = [
  {
    icon: Search,
    title: "Player Evaluation Agent",
    description: "Initial review of athlete's skills, performance, health, mindset.",
    testId: "agent-assessment"
  },
  {
    icon: Target,
    title: "SC Recommendations Agent", 
    description: "Get the right drills, every time.",
    testId: "agent-recommendations"
  },
  {
    icon: TrendingUp,
    title: "SC Practice Plan Agent",
    description: "Turn practice into progress.",
    testId: "agent-practice-plan"
  }
];

export default function AgentBlocks() {
  return (
    <section className="px-6 py-24 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.map((agent, index) => {
            const IconComponent = agent.icon;
            return (
              <Card 
                key={index}
                className="p-8 text-center hover-elevate border border-card-border"
                data-testid={agent.testId}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-md flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {agent.title}
                </h3>
                <p className="text-muted-foreground">
                  {agent.description}
                </p>
              </Card>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <p className="text-lg text-foreground font-medium">
            Together, this agentic system creates your personal Impact Plan.
          </p>
        </div>
      </div>
    </section>
  );
}