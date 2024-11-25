export async function getAccessToken() {
    const client_id = process.env.PAYPAL_CLIENT_ID;
    const client_secret = process.env.PAYPAL_CLIENT_SECRET;
    const auth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  
    const response = await fetch(`${environment === "sandbox"
        ? "https://api-m.sandbox.paypal.com"
        : "https://api-m.paypal.com"}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
      body: "grant_type=client_credentials",
    });
  
    const data = await response.json();
    return data.access_token;
  }
  