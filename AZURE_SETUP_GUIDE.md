# Azure Microsoft Graph API Setup Guide

This guide will help you configure Microsoft Graph API for your Azure Static Web App deployment so the waitlist email functionality works in production.

## Overview

Your SportsCopilot application needs to send emails via Microsoft Graph API when users join the waitlist. The code has been updated to support both:
- **Replit environment** (for development) - Already configured ✓
- **Azure environment** (for production) - Needs configuration (follow steps below)

## Step 1: Register an Application in Azure AD

1. Go to the [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** (you can search for it in the top search bar)
3. In the left sidebar, click **App registrations**
4. Click **+ New registration**
5. Fill in the registration form:
   - **Name**: `SportsCopilot Email Service`
   - **Supported account types**: Select "Accounts in this organizational directory only"
   - **Redirect URI**: Leave blank for now
6. Click **Register**

## Step 2: Create a Client Secret

1. After registration, you'll be on the app's **Overview** page
2. Copy and save the **Application (client) ID** - you'll need this later
3. Copy and save the **Directory (tenant) ID** - you'll need this later
4. In the left sidebar, click **Certificates & secrets**
5. Click **+ New client secret**
6. Add a description: `Email service secret`
7. Choose an expiration period (recommendation: 24 months)
8. Click **Add**
9. **IMPORTANT**: Copy the **Value** immediately - you can only see it once!
   - Save this as your **Client Secret**

## Step 3: Grant API Permissions

1. In the left sidebar, click **API permissions**
2. Click **+ Add a permission**
3. Select **Microsoft Graph**
4. Select **Application permissions** (not Delegated permissions)
5. Search for and add these permissions:
   - `Mail.Send` - Allows the app to send mail as any user
6. Click **Add permissions**
7. Click **Grant admin consent for [Your Organization]**
8. Click **Yes** to confirm

## Step 4: Configure Azure Static Web App Environment Variables

Now you need to add the credentials to your Azure Static Web App:

1. Go to your [SportsCopilot Azure Static Web App](https://portal.azure.com/#@werkrbee.com/resource/subscriptions/a6a82e3e-7fea-4ab5-80c8-d091e6161f55/resourceGroups/rg-werkrbee-sportscopilot/providers/Microsoft.Web/staticSites/sportscopilot/customDomains)
2. In the left sidebar, click **Configuration**
3. Click **+ Add** under "Application settings"
4. Add these four environment variables:

| Name | Value |
|------|-------|
| `AZURE_CLIENT_ID` | Your Application (client) ID from Step 2 |
| `AZURE_CLIENT_SECRET` | Your Client Secret value from Step 2 |
| `AZURE_TENANT_ID` | Your Directory (tenant) ID from Step 2 |
| `AZURE_SENDER_EMAIL` | `allie@sportscopilot.com` |

5. Click **Save** at the top

## Step 5: Deploy the Updated Code

After configuring the environment variables:

1. Push the updated code to GitHub (if you haven't already):
   ```bash
   git add .
   git commit -m "Add Azure Microsoft Graph API support"
   git push origin main
   ```

2. Your Azure Static Web App will automatically redeploy

3. Wait a few minutes for the deployment to complete

## Step 6: Test the Email Functionality

1. Go to your live site (sportscopilot.com or your Azure domain)
2. Navigate to the **Pricing** page or **Signup** page
3. Fill out the waitlist form and submit
4. Check `allie@sportscopilot.com` inbox for the waitlist notification email

## Troubleshooting

### "Unable to Join Waitlist" Error
- Check that all 4 environment variables are correctly set in Azure Static Web App Configuration
- Verify the Client Secret hasn't expired
- Ensure admin consent was granted for the API permissions

### Email Not Received
- Check that `AZURE_SENDER_EMAIL` is set to `allie@sportscopilot.com`
- Verify that `allie@sportscopilot.com` is a valid mailbox in your Microsoft 365 tenant
- Check the Azure Static Web App logs for detailed error messages

### Permission Denied Errors
- Make sure you granted **Application permissions** (not Delegated)
- Verify **Admin consent** was granted for the Mail.Send permission
- Ensure the service account has send-as permissions for the mailbox

## Security Notes

- Never commit the Client Secret to your Git repository
- Store all credentials only in Azure Static Web App Configuration
- Rotate the Client Secret periodically (before it expires)
- The code already sanitizes error messages to prevent credential leakage

## Questions?

If you encounter issues, check the Azure Static Web App logs:
1. Go to your Static Web App in Azure Portal
2. Click **Application Insights** in the left sidebar
3. Click **Logs** to see detailed error messages

---

**Ready to proceed?** Once you complete these steps, your waitlist email functionality will work in production! 🚀
