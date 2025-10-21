import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { waitlistSignupSchema } from "@shared/schema";
import { sendWaitlistEmail } from "./outlook";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/waitlist", async (req, res) => {
    try {
      const validatedData = waitlistSignupSchema.parse(req.body);
      
      await sendWaitlistEmail(
        validatedData.firstName,
        validatedData.lastName,
        validatedData.email
      );

      res.json({ 
        success: true, 
        message: "Successfully joined the waitlist! We'll be in touch soon." 
      });
    } catch (error) {
      console.error("Waitlist signup error:", error);
      
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({ 
          success: false, 
          message: "Please check your form inputs and try again." 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Something went wrong. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
