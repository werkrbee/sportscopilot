import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  return (
    <section className="px-6 py-24 bg-background text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          Be your own coach — with a Copilot by your side.
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Start building the consistency and confidence you need to level up your game.
        </p>
        <Button 
          size="lg"
          data-testid="button-join-waitlist"
          className="text-lg px-8 py-4 hover-elevate active-elevate-2"
          onClick={() => window.location.href = '/signup'}
        >
          Join Private Preview Waitlist
        </Button>
      </div>
    </section>
  );
}