import { Button } from "@/components/ui/button";
import ActivityGenerator from "@/components/ActivityGenerator";

export default function Hero() {
  return (
    <section className="px-8 pt-4 pb-16 md:pt-8 md:pb-24 bg-background min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto w-full text-center">
        <ActivityGenerator isLoggedIn={false} />
        <h1 className="text-6xl md:text-8xl font-black text-foreground mb-8 leading-none tracking-tight">
          Struggling to stay on track with your training?
          <br /><br />
          "It doesn't have to be this hard."
        </h1>
        <p className="text-xl md:text-2xl text-foreground mb-12 max-w-3xl mx-auto font-light">
          It doesn't have to be this hard.
          <br /><br />
          There are tons of apps promising to make athletes better. You've probably tried a few — workout trackers, stat sheets, AI tools, you name it. Yet, here you are.
          <br /><br />
          Most sports platforms end up being either too complicated, too basic, or too impersonal. You know? They track numbers, but they don't really care about the person behind them.
          <br /><br />
          Not SportsCopilot. SportsCopilot is simple, supportive, and made for real athletes — not pros with teams of trainers, but the ones juggling school, work, and late-night practices.
          <br /><br />
          It helps you grade your performance, analyze what's missing, map your next steps, and maintain your progress — all in one place. No fluff. No overthinking. Just steady improvement with guidance that feels personal.
          <br /><br />
          SportsCopilot was built by a student-athlete, for every athlete.
          <br /><br />
          So, take a look around and sign up for the waitlist for the SportsCopilot Private Preview, coming soon.
          We'd be honored to be part of your journey.
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