import { Card } from "@/components/ui/card";
import basketballIcon from "@assets/generated_images/Basketball_hoop_line_art_ffd0138d.png";

interface DrillCardProps {
  title: string;
  subtitle: string;
  instruction: string;
  icon?: string;
}

export default function DrillCard({ 
  title, 
  subtitle, 
  instruction, 
  icon = basketballIcon 
}: DrillCardProps) {
  return (
    <Card 
      className="bg-background border-2 border-foreground p-6 hover-elevate active-elevate-2 cursor-pointer"
      data-testid={`drill-card-${title.toLowerCase()}`}
      onClick={() => console.log(`${title} drill card clicked`)}
    >
      <div className="text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-sm font-medium text-destructive mb-4">
          {subtitle}
        </p>
        <div className="flex justify-center mb-4">
          <img 
            src={icon} 
            alt={`${title} drill icon`}
            className="w-12 h-12 object-contain"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {instruction}
        </p>
      </div>
    </Card>
  );
}