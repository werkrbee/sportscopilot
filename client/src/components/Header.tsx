import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <div className="font-bold text-xl text-foreground">
        SportsCopilot
      </div>
      <Button 
        size="default"
        data-testid="button-build-actionplan"
        className="hover-elevate active-elevate-2"
        onClick={() => console.log('Build ActionPlan clicked')}
      >
        Build My ActionPlan
      </Button>
    </header>
  );
}