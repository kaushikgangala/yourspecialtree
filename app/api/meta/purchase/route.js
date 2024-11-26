import { sendEvent, getUserData } from "../utils";
import crypto from "crypto";

export async function POST(req) {
  const body = await req.json();
  const userData = getUserData({ body, headers: req.headers });
  const customData = {
    currency: "USD",
    value: body.value,
    content_ids: ["tree_skirt"],
    content_type: "product",
    contents: [{ id: "tree_skirt", quantity: body.quantity }],
    order_id: crypto.randomBytes(16).toString("hex"),
  };

  await sendEvent("Purchase", userData, customData);

  return new Response(JSON.stringify({ message: "Purchase event sent" }), {
    status: 200,
  });
}
