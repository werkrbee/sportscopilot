# Azure Static Web Apps Deployment Guide

This guide explains how SportsCopilot is deployed to Azure Static Web Apps with Azure Functions for the backend API.

## Architecture Overview

- **Frontend**: React + Vite → Deployed to Azure Static Web Apps
- **Backend**: Azure Functions (Node.js 20) → Serverless API endpoints
- **Email**: Azure Microsoft Graph API for sending waitlist emails
- **Deployment**: GitHub Actions automatic deployment on push to main

## Project Structure

```
sportscopilot/
├── client/               # React frontend
├── dist/                 # Frontend build output
├── api/                  # Azure Functions backend
│   ├── src/
│   │   └── functions/
│   │       └── waitlist.ts    # Waitlist signup endpoint
│   ├── package.json
│   ├── tsconfig.json
│   └── host.json
├── shared/               # Shared validation schemas
│   └── schema.ts        # Zod schemas used by both frontend and backend
├── staticwebapp.config.json
└── .github/workflows/
    └── azure-static-web-apps-black-moss-099ef780f.yml
```

## Key Configuration Files

### 1. staticwebapp.config.json
```json
{
  "platform": {
    "apiRuntime": "node:20"     // Uses Node.js 20 for Azure Functions
  },
  "routes": [...],
  "navigationFallback": {...}
}
```

### 2. api/tsconfig.json
```json
{
  "compilerOptions": {
    "rootDir": "../",            // Set root to compile shared folder
    "outDir": "dist",            // Output to dist/
    ...
  },
  "include": ["src/**/*", "../shared/**/*"],  // Include shared schemas
  "exclude": ["../**/node_modules", "../client", "../server"]
}
```

### 3. GitHub Actions Workflow
The workflow automatically:
1. Checks out code
2. Installs and builds frontend (`npm ci && npm run build`)
3. Installs and builds API (`cd api && npm install && npm run build`)
4. Deploys both to Azure Static Web Apps

## Environment Variables (Azure Portal)

Configure these in Azure Portal → Static Web App → Configuration:

| Variable | Value | Purpose |
|----------|-------|---------|
| `AZURE_CLIENT_ID` | Your App (client) ID | Azure AD authentication |
| `AZURE_CLIENT_SECRET` | Your client secret value | Azure AD authentication |
| `AZURE_TENANT_ID` | Your Directory (tenant) ID | Azure AD authentication |
| `AZURE_SENDER_EMAIL` | allie@sportscopilot.com | Email sender address |

## Azure Functions vs Express

### Development (Replit)
- Uses Express.js server with `/api/waitlist` route
- Email via Replit Outlook connector

### Production (Azure)
- Uses Azure Functions with `/api/waitlist` endpoint
- Email via Azure Microsoft Graph API
- Frontend unchanged - still calls `/api/waitlist`

## Deployment Process

### Automatic Deployment
1. Push code to `main` branch
2. GitHub Actions triggers automatically
3. Builds frontend and API
4. Deploys to Azure Static Web Apps
5. Available at: https://sportscopilot.com

### Manual Deployment
```bash
# Commit your changes
git add .
git commit -m "Your message"

# Push to main branch
git push origin main

# GitHub Actions will automatically deploy
```

## Schema Sharing Between Dev and Prod

The waitlist validation schema is shared between:
- Frontend form validation
- Development Express server
- Production Azure Functions

**Shared Schema** (`shared/schema.ts`):
```typescript
export const waitlistSignupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
});
```

**How it works**:
1. Azure Functions tsconfig sets `rootDir: "../"` 
2. Function imports from `../../shared/schema`
3. TypeScript compiles both function and shared schema to `api/dist/`
4. At runtime, the import resolves to `dist/shared/schema.js` ✅

## Testing

### Test Locally (Development)
1. Run `npm run dev:server`
2. Visit preview URL
3. Submit waitlist form
4. Email sent via Replit Outlook connector

### Test Production
1. Visit https://sportscopilot.com
2. Submit waitlist form
3. Email sent via Azure Microsoft Graph API to allie@sportscopilot.com

## Troubleshooting

### Deployment Fails
- Check GitHub Actions logs for build errors
- Verify Node.js 20 is specified in `staticwebapp.config.json`
- Ensure environment variables are set in Azure Portal

### Email Not Sending
- Verify Azure AD app has `Mail.Send` permission with admin consent
- Check environment variables are correctly configured
- Verify `allie@sportscopilot.com` exists in Microsoft 365 tenant
- Check Azure Static Web App logs for authentication errors

### Function Not Found
- Verify `api_location: "api"` in GitHub workflow
- Check that `api/dist/` contains compiled functions
- Ensure function route matches frontend API call

## Azure AD App Registration

See `AZURE_SETUP_GUIDE.md` for complete Azure AD configuration instructions.

## Resources

- [Azure Static Web Apps Documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/)
- [Azure Functions Documentation](https://learn.microsoft.com/en-us/azure/azure-functions/)
- [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/)
