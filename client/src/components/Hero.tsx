import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="px-6 py-24 text-center bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Stop Guessing. Start Training with Purpose.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          SportsCopilot is your personalized sports assistant — evaluating your game, 
          recommending the right drills, and building ActionPlans to keep you consistent and motivated.
        </p>
        <Button 
          size="lg"
          data-testid="button-build-actionplan-hero"
          className="text-lg px-8 py-4 hover-elevate active-elevate-2"
          onClick={() => console.log('Build My ActionPlan clicked from hero')}
        >
          Build My ActionPlan
        </Button>
      </div>
    </section>
  );
}