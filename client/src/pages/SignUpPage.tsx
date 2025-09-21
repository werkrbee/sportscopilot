import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { useState } from "react";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up attempted:', formData);
    // todo: remove mock sign up functionality
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
                Start Your Journey
              </h1>
              <p className="text-muted-foreground">
                Sign up for free and build your personalized ActionPlan
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
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder="Create a password"
                  data-testid="input-password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateField('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  data-testid="input-confirm-password"
                  required
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full hover-elevate active-elevate-2"
                data-testid="button-signup"
              >
                Sign Up For Free
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href="/signin">
                  <span className="text-primary hover:underline cursor-pointer font-medium">
                    Sign in
                  </span>
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}