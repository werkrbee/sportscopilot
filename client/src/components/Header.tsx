import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import ThemeSelector from "@/components/ThemeSelector";
import logoImage from "@assets/IMG_1501_1759292797313.png";

export default function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="flex items-center justify-between px-8 py-6 bg-background relative z-50">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <img 
              src={logoImage} 
              alt="SportsCopilot Logo" 
              className="h-16 w-16 md:h-14 md:w-14 object-contain"
              data-testid="img-header-logo"
            />
            <span className="font-black text-lg md:text-2xl text-foreground">
              SportsCopilot
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
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

        <div className="flex items-center space-x-4">
          {/* Theme Selector */}
          <ThemeSelector />

          {/* Desktop Signup Button */}
          <Button 
            size="default"
            data-testid="button-signup-waitlist"
            className="hidden md:block hover-elevate active-elevate-2 bg-primary text-white font-bold px-6 py-3"
            onClick={() => window.location.href = '/signup'}
          >
            Waitlist Signup
          </Button>

          {/* Mobile Waitlist Button */}
          <Button 
            size="sm"
            data-testid="button-mobile-waitlist"
            className="md:hidden hover-elevate active-elevate-2 bg-primary text-white font-bold px-3 py-2 text-sm"
            onClick={() => window.location.href = '/signup'}
          >
            Join Waitlist
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-background">
            <div className="flex flex-col items-center justify-center h-full space-y-12 px-8">
              <Link href="/about" onClick={closeMenu}>
                <span 
                  className={`text-3xl font-black text-foreground hover:text-primary cursor-pointer ${location === '/about' ? 'text-primary' : ''}`}
                  data-testid="mobile-link-about"
                >
                  Allie's Story
                </span>
              </Link>
              <Link href="/pricing" onClick={closeMenu}>
                <span 
                  className={`text-3xl font-black text-foreground hover:text-primary cursor-pointer ${location === '/pricing' ? 'text-primary' : ''}`}
                  data-testid="mobile-link-pricing"
                >
                  Pricing
                </span>
              </Link>
              <Link href="/signin" onClick={closeMenu}>
                <span 
                  className={`text-3xl font-black text-foreground hover:text-primary cursor-pointer ${location === '/signin' ? 'text-primary' : ''}`}
                  data-testid="mobile-link-signin"
                >
                  Login
                </span>
              </Link>
              <Button 
                size="lg"
                data-testid="mobile-button-signup-waitlist"
                className="text-xl px-12 py-6 hover-elevate active-elevate-2 bg-primary text-white font-black mt-8"
                onClick={() => {
                  window.location.href = '/signup';
                  closeMenu();
                }}
              >
                Waitlist Signup
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}