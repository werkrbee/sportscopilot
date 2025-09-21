import DrillCard from '../DrillCard';

export default function DrillCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <DrillCard
        title="SHOOTING"
        subtitle="BASKETBALL DRILL"
        instruction="10 makes from 5 spots"
      />
      <DrillCard
        title="DRIBBLING"
        subtitle="BASKETBALL DRILL"
        instruction="2 minutes each hand"
      />
      <DrillCard
        title="DEFENSE"
        subtitle="BASKETBALL DRILL"
        instruction="Shuffle drill - 30 seconds"
      />
    </div>
  );
}