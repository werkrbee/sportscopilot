import { Button } from "@/components/ui/button";
import ActivityGenerator from "@/components/ActivityGenerator";

export default function Hero() {
  return (
    <section className="px-8 pt-4 pb-16 md:pt-8 md:pb-24 bg-background min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto w-full text-center">
        <ActivityGenerator isLoggedIn={false} />
        <h1 className="text-6xl md:text-8xl font-black text-foreground mb-8 leading-none tracking-tight">
          Struggling to stay on track with your training?
          <br />
          <br />
          "It doesn't have to be this hard."
        </h1>
        <div className="mb-12">
          <Button
            variant="outline"
            size="lg"
            data-testid="button-watch-allisons-story"
            className="text-lg px-8 py-6 hover-elevate active-elevate-2 bg-primary text-white border-primary font-bold"
            onClick={() => (window.location.href = "/about")}
          >
            Founder Story
          </Button>
        </div>
        <div className="text-xl md:text-2xl text-foreground mb-12 max-w-3xl mx-auto font-light space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              SportsCopilot — Your Smart Training Agent
            </h2>
            <p>
              There are endless apps that promise to make athletes better — workout trackers, stat sheets, AI dashboards.
              But they all expect you to do the work. You log the data. You read the stats. You plan the next move.
            </p>
            <p>
              That's the app-centric era — where athletes operate the tools.
            </p>
          </div>

          <div className="py-4 border-t border-b border-border my-8">
            <p className="text-center italic">
              Welcome to the agent-centric era.
            </p>
            <p className="text-center font-medium mt-2">
              Where the tools operate for you.
            </p>
          </div>

          <div className="space-y-6">
            <p>
              SportsCopilot isn't another app — it's your Smart Training Agent.
              It learns how you train, tracks your progress automatically, and adapts your plan as you evolve.
              No dashboards to babysit. No spreadsheets to update.
              Your Copilot observes, analyzes, and responds — just like a real coach would.
            </p>
            <p className="font-medium">
              That's the G.A.M.E. Framework — your guided path to consistent athlete growth.
            </p>
          </div>

          <div className="py-4 border-t border-border my-8"></div>

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              The Athlete's Smart Agent
            </h2>
            <p>
              SportsCopilot isn't built for pros with teams of trainers.
              It's built for real athletes — students, workers, and dreamers juggling life and late-night practices.
            </p>
            <p>
              Your Copilot works behind the scenes with four specialized agents.
              No fluff. No overthinking. Just steady, intelligent progress — on autopilot.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <p className="font-medium">
              Built by a student-athlete, for every athlete.
            </p>
            <p>
              You bring the effort.<br />
              SportsCopilot brings the intelligence.
            </p>
            <p>
              Take a look around and sign up for the SportsCopilot Private Preview — coming soon.
              We'd be honored to be part of your journey.
            </p>
            <p className="text-primary font-bold">
              → Be your own coach — with a Copilot by your side.
              Start building the consistency and confidence you need.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            data-testid="button-explore-agents-hero"
            className="text-lg px-8 py-6 hover-elevate active-elevate-2 bg-secondary text-white border-secondary font-bold"
            onClick={() => (window.location.href = "/signup")}
          >
            Waitlist Signup
          </Button>
        </div>
      </div>
    </section>
  );
}
