import { NextResponse } from "next/server";
import { getAccessToken, endpointUrl } from "@/lib/paypal";

export async function POST(req) {
  try {
    const { intent, purchase_units } = await req.json();
    const accessToken = await getAccessToken();

    const orderData = {
      intent: intent.toUpperCase(),
      purchase_units,
      payment_source: {
        paypal: {
          experience_context: {
            shipping_preference: "NO_SHIPPING",
          },
        },
      },
    };

    const response = await fetch(`${endpointUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({...orderData, completed: false}),
    });

    const json = await response.json();
    return NextResponse.json(json);
  } catch (err) {
    console.error("Error creating order:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
