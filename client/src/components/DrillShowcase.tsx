import DrillCard from "./DrillCard";

export default function DrillShowcase() {
  //todo: remove mock drill data functionality
  const drills = [
    {
      title: "SHOOTING",
      subtitle: "BASKETBALL DRILL", 
      instruction: "10 makes from 5 spots"
    },
    {
      title: "DRIBBLING",
      subtitle: "BASKETBALL DRILL",
      instruction: "2 minutes each hand"
    },
    {
      title: "DEFENSE", 
      subtitle: "BASKETBALL DRILL",
      instruction: "Shuffle drill - 30 seconds"
    }
  ];

  return (
    <section className="px-6 py-24 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
            Personalized Drill Cards
          </h2>
          <p className="text-lg text-muted-foreground">
            Get targeted drills designed for your skill level and goals
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {drills.map((drill, index) => (
            <DrillCard
              key={index}
              title={drill.title}
              subtitle={drill.subtitle}
              instruction={drill.instruction}
            />
          ))}
        </div>
      </div>
    </section>
  );
}