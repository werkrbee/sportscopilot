import { Card } from "@/components/ui/card";
import { Calendar, MessageSquare, Activity } from "lucide-react";

export default function ContentCascade() {
  return (
    <section className="px-6 py-24 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Content Cascade
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              SportsCopilot keeps you engaged by cascading content to your favorite apps — 
              so your drills, ActionPlans, and motivation are always within reach. 
              Sync reminders to your calendar, get notifications in your messaging apps, 
              or track consistency through your fitness apps.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-foreground">Calendar integration for drill scheduling</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span className="text-foreground">Push notifications and reminders</span>
              </div>
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-primary" />
                <span className="text-foreground">Fitness app progress tracking</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Card 
              className="bg-card p-8 max-w-sm w-full border border-card-border"
              data-testid="mobile-mockup"
            >
              <div className="bg-background rounded-lg border border-border p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium text-foreground">SportsCopilot</span>
                </div>
                <p className="text-sm text-foreground">
                  🏀 Daily Drill Reminder: 10 minutes of ball-handling — stay sharp!
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Your drills follow you everywhere
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}