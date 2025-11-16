import { app, HttpRequest, HttpResponseInit, InvocationContext} from '@azure/functions';
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import { z } from 'zod';
import { waitlistSignupSchema } from '../../shared/schema';

let cachedAzureToken: { token: string; expiresAt: number } | null = null;

// Azure Active Directory authentication using client credentials
async function getAzureAccessToken() {
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  const tenantId = process.env.AZURE_TENANT_ID;

  if (!clientId || !clientSecret || !tenantId) {
    throw new Error('Azure credentials not configured');
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

async function sendWaitlistEmail(firstName: string, lastName: string, email: string) {
  try {
    const accessToken = await getAzureAccessToken();

    const client = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => accessToken
      }
    });

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

    const senderEmail = process.env.AZURE_SENDER_EMAIL || 'allie@sportscopilot.com';
    const endpoint = `/users/${senderEmail}/sendMail`;

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

async function waitlistHandler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Waitlist signup request received`);

  // Only allow POST requests
  if (request.method !== 'POST') {
    return {
      status: 405,
      jsonBody: {
        success: false,
        message: 'Method not allowed'
      }
    };
  }

  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = waitlistSignupSchema.parse(body);
    
    // Send waitlist email
    await sendWaitlistEmail(
      validatedData.firstName,
      validatedData.lastName,
      validatedData.email
    );

    context.log(`Waitlist email sent for ${validatedData.email}`);

    return {
      status: 200,
      jsonBody: { 
        success: true, 
        message: "Successfully joined the waitlist! We'll be in touch soon." 
      }
    };
  } catch (error) {
    context.error('Waitlist signup error:', error);
    
    if (error instanceof z.ZodError) {
      return {
        status: 400,
        jsonBody: { 
          success: false, 
          message: "Please check your form inputs and try again." 
        }
      };
    }
    
    return {
      status: 500,
      jsonBody: { 
        success: false, 
        message: "We're having trouble processing signups right now. Please try again in a few moments." 
      }
    };
  }
}

app.http('waitlist', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'waitlist',
  handler: waitlistHandler
});
