import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with your training journey",
      features: [
        "Basic drill recommendations",
        "Weekly ActionPlans", 
        "Progress tracking",
        "Community access"
      ],
      cta: "Join Free Waitlist",
      testId: "plan-free"
    },
    {
      name: "Pro", 
      price: "$19",
      period: "per month",
      description: "Advanced features for serious athletes",
      features: [
        "Personalized AI coaching",
        "Daily ActionPlans",
        "Advanced analytics", 
        "Video analysis",
        "Priority support",
        "Calendar integration"
      ],
      cta: "Join Pro Waitlist",
      testId: "plan-pro",
      popular: true
    },
    {
      name: "Team",
      price: "$49", 
      period: "per month",
      description: "Built for coaches and team management",
      features: [
        "Everything in Pro",
        "Team management",
        "Coach dashboard",
        "Player progress reports",
        "Custom drill library",
        "API access"
      ],
      cta: "Contact Sales",
      testId: "plan-team"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the plan that fits your training goals. No hidden fees, cancel anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <Card 
                key={plan.name}
                className={`p-8 relative hover-elevate ${plan.popular ? 'border-primary border-2' : 'border border-card-border'}`}
                data-testid={plan.testId}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full hover-elevate active-elevate-2"
                  data-testid={`button-${plan.testId}`}
                  onClick={() => console.log(`${plan.name} plan selected`)}
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Questions? We're here to help.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact our support team or check out our comprehensive help center.
            </p>
            <Button 
              variant="outline"
              size="lg"
              data-testid="button-contact-support"
              className="hover-elevate active-elevate-2"
              onClick={() => console.log('Contact support clicked')}
            >
              Contact Support
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}