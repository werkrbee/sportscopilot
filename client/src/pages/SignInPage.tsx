import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in attempted:', { email, password });
    // todo: remove mock sign in functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-6 py-24">
        <div className="max-w-md mx-auto">
          <Card className="p-8 border border-card-border">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="text-muted-foreground">
                Sign in to continue your training journey
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  data-testid="input-password"
                  required
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full hover-elevate active-elevate-2"
                data-testid="button-signin"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Forgot your password?{" "}
                <Link href="/reset-password">
                  <span className="text-primary hover:underline cursor-pointer">
                    Reset it here
                  </span>
                </Link>
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Need private preview access?{" "}
                <Link href="/signup">
                  <span className="text-primary hover:underline cursor-pointer font-medium">
                    Join waitlist
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