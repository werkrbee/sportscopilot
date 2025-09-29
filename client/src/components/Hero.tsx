import { Button } from "@/components/ui/button";
import InteractiveScoreboard from "@/components/InteractiveScoreboard";

export default function Hero() {
  return (
    <section className="px-8 pt-4 pb-16 md:pt-8 md:pb-24 bg-background min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="lg:col-span-8">
            <InteractiveScoreboard 
              advertiserName="Gatorade"
            />
            <h1 className="text-6xl md:text-8xl font-black text-foreground mb-8 leading-none tracking-tight">
              Stop Guessing.<br />
              <span className="text-primary">Start Training</span><br />
              with Purpose.
            </h1>
            <p className="text-xl md:text-2xl text-foreground mb-16 max-w-2xl font-light">
              SportsCopilot is your personalized sports assistant — evaluating your game, 
              recommending the right drills, and building ActionPlans.
            </p>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <Button 
              variant="outline"
              size="lg"
              data-testid="button-watch-allisons-story"
              className="w-full text-lg px-8 py-6 hover-elevate active-elevate-2 bg-primary text-white border-primary font-bold"
              onClick={() => window.location.href = '/about'}
            >
              Watch Founder Story
            </Button>
            <Button 
              size="lg"
              data-testid="button-explore-agents-hero"
              className="w-full text-lg px-8 py-6 hover-elevate active-elevate-2 bg-secondary text-white border-secondary font-bold"
              onClick={() => window.location.href = '/signup'}
            >
              Waitlist Signup
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}