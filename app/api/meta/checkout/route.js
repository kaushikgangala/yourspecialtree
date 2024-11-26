import { sendEvent, getUserData } from "../utils";

export async function POST(req) {
  const body = await req.json();
  const userData = getUserData({ body, headers: req.headers });
  const customData = {
    currency: "USD",
    value: body.value,
    content_ids: ["tree_skirt"],
    content_type: "product",
    contents: [{ id: "tree_skirt", quantity: body.quantity }],
  };

  await sendEvent("InitiateCheckout", userData, customData);

  return new Response(JSON.stringify({ message: "Checkout event sent" }), {
    status: 200,
  });
}
