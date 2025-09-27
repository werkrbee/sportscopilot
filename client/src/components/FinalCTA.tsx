import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  return (
    <section className="px-8 py-32 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-black text-foreground mb-12 leading-none">
          Be your own coach —<br />
          with a <span className="text-primary">Copilot</span><br />
          by your side.
        </h2>
        <p className="text-xl md:text-2xl text-foreground mb-16 font-light max-w-2xl mx-auto">
          Start building the consistency and confidence you need.
        </p>
        <Button 
          size="lg"
          data-testid="button-join-waitlist"
          className="text-xl px-12 py-6 hover-elevate active-elevate-2 bg-primary text-white font-black"
          onClick={() => window.location.href = '/signup'}
        >
          Waitlist Signup
        </Button>
      </div>
    </section>
  );
}