import { NextResponse } from "next/server";
import { getAccessToken } from "@/utils/paypal";

export async function POST(req) {
  const { intent, amount } = await req.json();
  const accessToken = await getAccessToken();
  const endpoint = `${environment === "sandbox"
  ? "https://api-m.sandbox.paypal.com"
  : "https://api-m.paypal.com"}/v2/checkout/orders`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: intent.toUpperCase(),
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount,
          },
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            shipping_preference: "NO_SHIPPING",
          },
        },
      },
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
