import { Card } from "@/components/ui/card";
import { GraduationCap, Search, MapPin, Users } from "lucide-react";

const gameSteps = [
  {
    icon: GraduationCap,
    letter: "G",
    title: "Grade",
    subtitle: "Player Evaluation",
    description: "Assess strengths, weaknesses, and current performance."
  },
  {
    icon: Search,
    letter: "A", 
    title: "Analyze",
    subtitle: "Performance Gaps",
    description: "Identify what's holding the athlete back."
  },
  {
    icon: MapPin,
    letter: "M",
    title: "Map",
    subtitle: "Impact/Training Plan", 
    description: "Create a structured plan with drills, workouts, and recovery."
  },
  {
    icon: Users,
    letter: "E",
    title: "Engage",
    subtitle: "Performance Monitoring Check-Ins",
    description: "Provide ongoing guidance, feedback, and accountability."
  }
];

export default function GameFramework() {
  return (
    <section className="px-6 py-24 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">
            SportsCopilot <span className="text-primary">G.A.M.E.</span> Framework
          </h2>
          <p className="text-xl text-foreground font-light max-w-2xl mx-auto">
            A simple 4-step path to consistent athlete growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {gameSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card 
                key={index}
                className="p-6 text-center hover-elevate border border-card-border"
                data-testid={`game-step-${step.letter.toLowerCase()}`}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary rounded-md flex items-center justify-center relative">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-xs font-black text-secondary-foreground">{step.letter}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <h4 className="text-sm font-medium text-primary mb-3">
                  {step.subtitle}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center">
          <p className="text-lg text-foreground font-medium mb-4">
            We start by grading performance, then analyze gaps that hold players back. From there, we map out a personalized training plan and keep athletes engaged with ongoing coach check-ins.
          </p>
          <p className="text-xl text-primary font-bold">
            → Turning insight into impact, one athlete at a time.
          </p>
        </div>
      </div>
    </section>
  );
}