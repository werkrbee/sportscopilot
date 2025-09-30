import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BasketballCard from "@/components/BasketballCard";
import allisonBasketballImg from "@assets/Allison Barone Basketball_1759168369641.jpg";
import trainingVideo from "@assets/video-485_singular_display_1759209003103.mov";
import trainingImage1 from "@assets/IMG_1407_1759208860496.jpeg";
import trainingImage2 from "@assets/IMG_3747_1759209003103.jpeg";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-24">
            <h1 className="text-6xl md:text-8xl font-black text-foreground mb-8 leading-none">
              Meet<br />
              <span className="text-primary">Allison Barone</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground font-light max-w-3xl">
              The creator behind SportsCopilot who turned her own training struggles into a solution for athletes everywhere
            </p>
          </div>

          {/* Basketball Card Profile */}
          <div className="mb-16 flex justify-center">
            <BasketballCard 
              name="Allie Barone"
              image={allisonBasketballImg}
              team="Mercy Varsity"
              sport="Basketball"
              year="2023-2024"
              number="4"
            />
          </div>

          {/* Video Section */}
          <div className="mb-16">
            <Card className="p-8 bg-card">
              <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center">
                Allie's Story: Why SportsCopilot Exists
              </h2>
              <div className="flex justify-center">
                <video 
                  controls 
                  className="w-full max-w-2xl rounded-lg"
                  data-testid="video-allison-story"
                >
                  <source src={trainingVideo} type="video/quicktime" />
                  <source src={trainingVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Card>
          </div>

          {/* Story Section */}
          <div className="mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-12 leading-none">
              She built the tool she needed —<br />
              <span className="text-primary">and shared it so every athlete feels supported.</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-6 text-xl font-light text-foreground">
                <p className="font-medium text-2xl text-primary">
                  SportsCopilot
                </p>
                <p>
                  Allison gives because she's been fortunate to have a strong support system — but she's seen firsthand that not everyone in our communities has that same safety net. When she was playing sports, she wished she had a tool to guide, support, and keep her moving forward.
                </p>
                <p>
                  That's why she built SportsCopilot: what began as her personal solution is now designed to be accessible to every athlete, so no one has to train or grow alone.
                </p>
              </div>
              <div className="space-y-6">
                <img 
                  src={trainingImage1} 
                  alt="Allison training and demonstrating her passion for sports"
                  className="w-full rounded-lg"
                  data-testid="img-allison-sports-1"
                />
                <img 
                  src={trainingImage2} 
                  alt="Allison's athletic dedication and training routine"
                  className="w-full rounded-lg"
                  data-testid="img-allison-sports-2"
                />
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <Card className="p-8 bg-card text-center mb-16">
            <h2 className="text-3xl font-bold text-card-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              SportsCopilot exists to democratize high-quality sports training. We believe every athlete — 
              whether you're just starting out or competing at the highest level — deserves access to 
              personalized coaching, consistent motivation, and clear progress tracking.
            </p>
            <blockquote className="text-2xl font-bold text-primary italic">
              "Agency means you own the journey. SportsCopilot helps you stay on it."
            </blockquote>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-black text-foreground mb-12 leading-none">
              Ready to Transform<br />
              <span className="text-primary">Your Training?</span>
            </h2>
            <p className="text-xl md:text-2xl text-foreground font-light mb-16 max-w-2xl mx-auto">
              Join thousands of athletes who have discovered personalized training with SportsCopilot.
            </p>
            <Button 
              size="lg"
              data-testid="button-join-private-preview"
              className="text-xl px-12 py-6 hover-elevate active-elevate-2 bg-primary text-white font-black"
              onClick={() => window.location.href = '/signup'}
            >
              Waitlist Signup
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}