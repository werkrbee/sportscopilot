import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <Link href="/">
        <div className="font-bold text-xl text-foreground cursor-pointer hover-elevate">
          SportsCopilot
        </div>
      </Link>
      
      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/about">
          <span 
            className={`text-foreground hover:text-primary cursor-pointer ${location === '/about' ? 'text-primary font-medium' : ''}`}
            data-testid="link-about"
          >
            Allie's Story
          </span>
        </Link>
        <Link href="/pricing">
          <span 
            className={`text-foreground hover:text-primary cursor-pointer ${location === '/pricing' ? 'text-primary font-medium' : ''}`}
            data-testid="link-pricing"
          >
            Pricing
          </span>
        </Link>
        <Link href="/signin">
          <span 
            className={`text-foreground hover:text-primary cursor-pointer ${location === '/signin' ? 'text-primary font-medium' : ''}`}
            data-testid="link-signin"
          >
            Login
          </span>
        </Link>
      </nav>

      <Button 
        size="default"
        data-testid="button-signup-waitlist"
        className="hover-elevate active-elevate-2"
        onClick={() => window.location.href = '/signup'}
      >
        Waitlist Signup
      </Button>
    </header>
  );
}