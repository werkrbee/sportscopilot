import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="flex items-center justify-between px-8 py-6 bg-background">
      <Link href="/">
        <div className="font-black text-2xl text-foreground cursor-pointer">
          SportsCopilot
        </div>
      </Link>
      
      <nav className="hidden md:flex items-center space-x-12">
        <Link href="/about">
          <span 
            className={`text-foreground hover:text-primary cursor-pointer font-medium text-lg ${location === '/about' ? 'text-primary' : ''}`}
            data-testid="link-about"
          >
            Allie's Story
          </span>
        </Link>
        <Link href="/pricing">
          <span 
            className={`text-foreground hover:text-primary cursor-pointer font-medium text-lg ${location === '/pricing' ? 'text-primary' : ''}`}
            data-testid="link-pricing"
          >
            Pricing
          </span>
        </Link>
        <Link href="/signin">
          <span 
            className={`text-foreground hover:text-primary cursor-pointer font-medium text-lg ${location === '/signin' ? 'text-primary' : ''}`}
            data-testid="link-signin"
          >
            Login
          </span>
        </Link>
      </nav>

      <Button 
        size="default"
        data-testid="button-signup-waitlist"
        className="hover-elevate active-elevate-2 bg-primary text-white font-bold px-6 py-3"
        onClick={() => window.location.href = '/signup'}
      >
        Waitlist Signup
      </Button>
    </header>
  );
}