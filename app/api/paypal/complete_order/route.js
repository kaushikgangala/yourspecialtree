import { NextResponse } from "next/server";
import { getAccessToken } from "@/utils/paypal";

export async function POST(req) {
  const { order_id, intent } = await req.json();
  const accessToken = await getAccessToken();
  const endpoint = `${environment === "sandbox"
  ? "https://api-m.sandbox.paypal.com"
  : "https://api-m.paypal.com"}/v2/checkout/orders/${order_id}/${intent}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
