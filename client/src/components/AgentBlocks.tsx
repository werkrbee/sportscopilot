import { Card } from "@/components/ui/card";
import { AlertCircle, MapPin, Monitor } from "lucide-react";

const agents = [
  {
    icon: AlertCircle,
    title: "Performance Gaps",
    description: "Areas where the athlete falls short of goals — fitness, skills, recovery, discipline.",
    testId: "agent-performance-gaps"
  },
  {
    icon: MapPin,
    title: "Training Plan Agent", 
    description: "Structured roadmap of drills, workouts, nutrition, recovery.",
    testId: "agent-training-plan"
  },
  {
    icon: Monitor,
    title: "Performance Monitoring Agent",
    description: "Continuous guidance, accountability, and mid-course corrections.",
    testId: "agent-performance-monitoring"
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
            SportsCopilot guides athletes through the G.A.M.E. Framework.
          </p>
        </div>
      </div>
    </section>
  );
}