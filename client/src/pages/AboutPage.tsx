import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// Import assets directly from attached_assets
const videoFile = "/attached_assets/IMG_1605_1758489623151.MP4";
const image1 = "/attached_assets/IMG_1599_1758489699793.JPEG";
const image2 = "/attached_assets/IMG_4762_1758489760539.JPEG";

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
                  <source src={videoFile} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Card>
          </div>

          {/* Story Section */}
          <div className="mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-12 leading-none">
              From Personal<br />
              <span className="text-primary">Struggle</span> to Solution
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-6 text-xl font-light text-foreground">
                <p>
                  Allison Barone built SportsCopilot because she lived the problem herself. 
                  As a dedicated athlete, she struggled with inconsistent training, lack of personalized guidance, 
                  and staying motivated without a coach.
                </p>
                <p>
                  "I was tired of guessing what drills to do and whether I was improving," 
                  Allison reflects. "Personal coaches are expensive and not always available."
                </p>
                <p>
                  That frustration became SportsCopilot. Allison combined her passion for sports 
                  with technology to create an AI-powered training companion.
                </p>
              </div>
              <div className="space-y-6">
                <img 
                  src={image1} 
                  alt="Allison training and demonstrating her passion for sports"
                  className="w-full"
                  data-testid="img-allison-sports-1"
                />
                <img 
                  src={image2} 
                  alt="Allison's athletic dedication and training routine"
                  className="w-full"
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