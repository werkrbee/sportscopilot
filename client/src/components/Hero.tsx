import { Button } from "@/components/ui/button";
import ActivityGenerator from "@/components/ActivityGenerator";

export default function Hero() {
  return (
    <section className="px-8 pt-4 pb-16 md:pt-8 md:pb-24 bg-background min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto w-full text-center">
        <ActivityGenerator isLoggedIn={false} />
        <h1 className="text-6xl md:text-8xl font-black text-foreground mb-8 leading-none tracking-tight">
          Stop Guessing.<br />
          <span className="text-primary">Start Training</span><br />
          with Purpose.
        </h1>
        <p className="text-xl md:text-2xl text-foreground mb-12 max-w-3xl mx-auto font-light">
          SportsCopilot's agentic system creates your personal Impact Plan through intelligent assessment, targeted recommendations, and structured practice.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
          <Button 
            variant="outline"
            size="lg"
            data-testid="button-watch-allisons-story"
            className="text-lg px-8 py-6 hover-elevate active-elevate-2 bg-primary text-white border-primary font-bold"
            onClick={() => window.location.href = '/about'}
          >
            Watch Founder Story
          </Button>
          <Button 
            size="lg"
            data-testid="button-explore-agents-hero"
            className="text-lg px-8 py-6 hover-elevate active-elevate-2 bg-secondary text-white border-secondary font-bold"
            onClick={() => window.location.href = '/signup'}
          >
            Waitlist Signup
          </Button>
        </div>
      </div>
    </section>
  );
}