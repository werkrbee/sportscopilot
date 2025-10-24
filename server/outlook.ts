import { Client } from '@microsoft/microsoft-graph-client';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
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

    await client
      .api('/me/sendMail')
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
