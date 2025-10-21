import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const { toast } = useToast();

  const waitlistMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/waitlist", data);
      return await res.json();
    },
    onSuccess: (data: any) => {
      toast({
        title: "Success!",
        description: data.message || "You've been added to the waitlist. We'll be in touch soon!",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: ""
      });
    },
    onError: () => {
      toast({
        title: "Unable to Join Waitlist",
        description: "We're experiencing technical difficulties. Please try again in a few moments.",
        variant: "destructive",
      });
    },
  });

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    waitlistMutation.mutate(formData);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-6 py-24">
        <div className="max-w-md mx-auto">
          <Card className="p-8 border border-card-border">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Join Private Preview
              </h1>
              <p className="text-muted-foreground">
                Sign up for early access to SportsCopilot's private preview
              </p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    placeholder="First name"
                    data-testid="input-first-name"
                    disabled={waitlistMutation.isPending}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    placeholder="Last name"
                    data-testid="input-last-name"
                    disabled={waitlistMutation.isPending}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="Enter your email"
                  data-testid="input-email"
                  disabled={waitlistMutation.isPending}
                  required
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full hover-elevate active-elevate-2"
                data-testid="button-signup"
                disabled={waitlistMutation.isPending}
              >
                {waitlistMutation.isPending ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">
                We'll notify you when SportsCopilot Private Preview is ready.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}