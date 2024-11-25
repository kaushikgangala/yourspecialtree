import { sendEvent, getUserData } from "../utils";
import crypto from "crypto";

export async function POST(req) {
  const body = await req.json();
  const userData = getUserData({ body, headers: req.headers });
  const customData = {
    currency: "USD",
    value: body.totalAmount,
    content_ids: ["galtag"],
    content_type: "product",
    contents: [{ id: "product_id_123", quantity: body.qty }],
    order_id: crypto.randomBytes(16).toString("hex"),
  };

  await sendEvent("Purchase", userData, customData);

  return new Response(JSON.stringify({ message: "Purchase event sent" }), {
    status: 200,
  });
}
