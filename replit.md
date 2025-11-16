# SportsCopilot Landing Page

## Overview
A mobile-first React landing page for SportsCopilot.com featuring minimalist design inspired by Jack Dorsey's method and 37signals copy philosophy. The application showcases personalized sports training through AI-powered agents that create ActionPlans for athletes.

## Recent Changes
### November 16, 2025
- **Azure Static Web Apps Migration**: Converted backend from Express to Azure Functions for full Azure SWA compatibility
  - Created `/api` folder with Azure Functions v4 programming model
  - Converted waitlist endpoint from Express route to serverless Azure Function
  - Updated `staticwebapp.config.json` with Node.js 20 runtime configuration
  - Updated GitHub Actions workflow to deploy both frontend and API
  - Maintained Azure Microsoft Graph API email integration for production
  - Frontend remains unchanged - still calls `/api/waitlist` endpoint

### October 7, 2025
- **Configuration Fix**: Updated `.replit` and `package.json` to run Express server (port 5000) instead of standalone Vite
  - `.replit` workflow now runs `npm run dev:server`
  - `npm run dev` now starts the full-stack Express server with integrated Vite
  - This fixes the Azure Static Web Apps configuration that was frontend-only

### September 21, 2025
- Updated color scheme to emphasize black, white, and red throughout the design
- Added navigation header with About, Pricing, Sign In, and Sign Up For Free
- Created About page featuring Allison Barone's story with attached video and images
- Created Pricing page with Free, Pro, and Team tiers
- Created authentication pages (Sign In, Sign Up)
- Added video link on home page that leads to About page
- Integrated user-provided media assets (video and images of Allison's sports passion)

## User Preferences
- **Design Philosophy**: Minimalist design following Jack Dorsey's "Make every single detail perfect. And limit the number of details" approach
- **Copy Style**: 37signals-inspired (direct, clear, no fluff)
- **Color Scheme**: Black, white, and red throughout
- **Mobile-First**: Responsive design prioritizing mobile experience
- **Sports Focus**: Basketball-themed with drill cards and training emphasis

## Project Architecture
- **Frontend**: React + TailwindCSS + Wouter routing
- **Backend (Development)**: Express.js server with integrated Vite (for local dev on Replit)
- **Backend (Production)**: Azure Functions (serverless) for Azure Static Web Apps deployment
- **Email Integration**: Dual-mode system
  - Development: Replit Outlook connector
  - Production: Azure Microsoft Graph API with ClientSecretCredential
- **Storage**: In-memory storage (MemStorage) 
- **Components**: Modular React components with shadcn/ui system
- **Assets**: Generated basketball icons and user-provided media (Allison's video/images)

## Integration Notes
- **Calendar Integration**: User dismissed Outlook connector integration (connector:ccfg_outlook_01K4BBCKRJKP82N3PYQPZQ6DAK)
- Future calendar integration will need manual credential setup if required
- Webhook stubs created for content cascading to mobile apps

## Key Components
- **Landing Page**: Hero, Agent Blocks, Philosophy, Content Cascade, Drill Showcase, Final CTA
- **About Page**: Allison Barone's story with video and sports images
- **Pricing Page**: Three-tier pricing (Free, Pro, Team)
- **Authentication**: Sign In and Sign Up pages with form handling
- **Drill Cards**: Basketball-themed cards with clean white/black/red design
- **Header**: Navigation with responsive design and active states

## Future Enhancements
- Real authentication system integration
- Calendar integration for drill reminders and ActionPlan scheduling
- Messaging app webhooks for drill notifications and progress updates
- User dashboard for personalized ActionPlan management
- Drill library with filtering and search capabilities
- Progress tracking and consistency metrics display