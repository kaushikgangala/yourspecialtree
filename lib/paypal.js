const environment = process.env.PAYPAL_ENVIRONMENT || "sandbox";
const client_id = process.env.PAYPAL_CLIENT_ID;
const client_secret = process.env.PAYPAL_CLIENT_SECRET;

export const endpointUrl =
  environment === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";

export async function getAccessToken() {
  const auth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const data = "grant_type=client_credentials";

  const response = await fetch(`${endpointUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: data,
  });

  const json = await response.json();
  if (!json.access_token) {
    throw new Error("Failed to retrieve access token");
  }
  return json.access_token;
}
