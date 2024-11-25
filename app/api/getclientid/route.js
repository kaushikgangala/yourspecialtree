import { NextResponse } from "next/server";

export async function GET() {
  const client_id = process.env.PAYPAL_CLIENT_ID || "";
  return NextResponse.json({ client_id });
}
