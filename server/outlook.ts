import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

let connectionSettings: any;
let cachedAzureToken: { token: string; expiresAt: number } | null = null;

// Azure Active Directory authentication using client credentials
async function getAzureAccessToken() {
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  const tenantId = process.env.AZURE_TENANT_ID;

  if (!clientId || !clientSecret || !tenantId) {
    return null; // Azure credentials not configured, will fall back to Replit
  }

  // Return cached token if still valid
  if (cachedAzureToken && cachedAzureToken.expiresAt > Date.now()) {
    return cachedAzureToken.token;
  }

  try {
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    const tokenResponse = await credential.getToken('https://graph.microsoft.com/.default');
    
    if (!tokenResponse) {
      throw new Error('Failed to get Azure token');
    }

    // Cache the token (expires 5 minutes before actual expiry for safety)
    cachedAzureToken = {
      token: tokenResponse.token,
      expiresAt: tokenResponse.expiresOnTimestamp - 300000
    };

    return tokenResponse.token;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Azure authentication failed:', errorMessage);
    throw new Error('AZURE_AUTH_FAILED');
  }
}

// Replit connector authentication (for development)
async function getReplitAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken || !hostname) {
    return null; // Replit environment not detected
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=outlook',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || !connectionSettings.settings) {
    throw new Error('OUTLOOK_NOT_CONFIGURED');
  }

  const accessToken = connectionSettings.settings.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!accessToken) {
    throw new Error('OUTLOOK_NOT_CONNECTED');
  }
  return accessToken;
}

// Main function to get access token - tries Azure first, then Replit
async function getAccessToken() {
  // Try Azure credentials first (for production)
  const azureToken = await getAzureAccessToken();
  if (azureToken) {
    return azureToken;
  }

  // Fall back to Replit connector (for development)
  const replitToken = await getReplitAccessToken();
  if (replitToken) {
    return replitToken;
  }

  // Neither method worked
  throw new Error('EMAIL_NOT_CONFIGURED');
}

export async function getUncachableOutlookClient() {
  const accessToken = await getAccessToken();

  return Client.initWithMiddleware({
    authProvider: {
      getAccessToken: async () => accessToken
    }
  });
}

export async function sendWaitlistEmail(firstName: string, lastName: string, email: string) {
  try {
    const client = await getUncachableOutlookClient();

    const mail = {
      subject: `New Waitlist Signup: ${firstName} ${lastName}`,
      body: {
        contentType: "html",
        content: `
          <h2>New SportsCopilot Waitlist Signup</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Signup Date:</strong> ${new Date().toLocaleString()}</p>
        `
      },
      toRecipients: [
        {
          emailAddress: {
            address: "allie@sportscopilot.com"
          }
        }
      ]
    };

    // Determine which endpoint to use based on authentication method
    // Azure app-only access requires specifying the user, Replit uses /me
    const senderEmail = process.env.AZURE_SENDER_EMAIL || 'allie@sportscopilot.com';
    const isAzureAuth = !!(process.env.AZURE_CLIENT_ID && process.env.AZURE_CLIENT_SECRET && process.env.AZURE_TENANT_ID);
    
    const endpoint = isAzureAuth 
      ? `/users/${senderEmail}/sendMail`
      : '/me/sendMail';

    await client
      .api(endpoint)
      .post({
        message: mail,
        saveToSentItems: true
      });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Failed to send waitlist email:", errorMessage);
    throw new Error("EMAIL_SEND_FAILED");
  }
}
