import { NextResponse } from "next/server";
import { getAccessToken, endpointUrl } from "@/lib/paypal";

export async function POST(req) {
  try {
    const { order_id, intent } = await req.json();
    const accessToken = await getAccessToken();

    const response = await fetch(
      `${endpointUrl}/v2/checkout/orders/${order_id}/${intent}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const json = await response.json();
    return NextResponse.json(json);
  } catch (err) {
    console.error("Error completing order:", err);
    return NextResponse.json({ error: "Failed to complete order" }, { status: 500 });
  }
}
