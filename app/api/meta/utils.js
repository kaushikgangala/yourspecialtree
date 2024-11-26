import crypto from "crypto";
import axios from "axios";

// Facebook Conversions API details
const accessToken = process.env.META_ACCESS_TOKEN;
const pixelId = process.env.META_PIXEL_ID;
const apiUrl = `https://graph.facebook.com/v14.0/${pixelId}/events`;

// Hashing function
export function hashSHA256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

// Helper function to send events
export const sendEvent = async (eventName, userData, customData) => {
  const event = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        user_data: userData,
        custom_data: customData,
        action_source: "website",
      },
    ],
    access_token: accessToken,
  };

  try {
    const response = await axios.post(apiUrl, event);
    console.log(`${eventName} event sent successfully:`, response.data);
  } catch (error) {
    console.error(
      `Error sending ${eventName} event:`,
      error.response?.data || error.message
    );
  }
};

// Extract user data
// export const getUserData = (req) => {
//   const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

//   const client_ip_address = clientIp ? clientIp.split(",")[0].trim() : null;

//   return {
//     em: hashSHA256(req.body.email),
//     ph: hashSHA256(req.body.phone),
//     client_ip_address,
//     client_user_agent: req.headers["user-agent"],
//     fbc: req.body.fbc,
//     fbp: req.body.fbp,
//   };
// };

export const getUserData = (req) => {
  // Extract IP address from X-Forwarded-For (ideal for proxy environments)
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection?.remoteAddress;

  // In case the clientIp is an array (common in some proxy setups), take the first IP
  const client_ip_address = clientIp ? clientIp.split(",")[0].trim() : null;
  console.log(req.body);
  return {
    em: hashSHA256(req.body.email), // email (hashed in SHA-256)
    ph: hashSHA256(req.body.phone), // phone number (hashed in SHA-256)
    client_ip_address,
    client_user_agent: req.headers["user-agent"],
    fbc: req.body.fbc, // "fb.1.1554763741205.IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk",
    fbp: req.body.fbp, // "fb.1.1596403881668.1116446470",
  };
};
