export default function AgencyPhilosophy() {
  return (
    <section className="px-6 py-24 bg-card">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-lg text-card-foreground leading-relaxed mb-12">
            At SportsCopilot, we believe in agency — the responsibility we each have to improve and achieve more. 
            We don't take our cues from others; we own our journey. But greatness isn't built alone. 
            SportsCopilot is your expert companion — keeping you consistent, motivated, and on track for the long haul.
          </p>
          <blockquote 
            className="text-2xl md:text-3xl font-bold text-foreground italic"
            data-testid="text-agency-quote"
          >
            "Agency means you own the journey. SportsCopilot helps you stay on it."
          </blockquote>
        </div>
      </div>
    </section>
  );
}