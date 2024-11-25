import { sendEvent, getUserData } from "../utils";

export async function POST(req) {
  const body = await req.json();
  const userData = getUserData({ body, headers: req.headers });
  const customData = {
    currency: "USD",
    value: body.totalAmount,
    content_ids: ["galtag"],
    content_type: "product",
    contents: [{ id: "product_id_123", quantity: body.qty }],
  };

  await sendEvent("InitiateCheckout", userData, customData);

  return new Response(JSON.stringify({ message: "Checkout event sent" }), {
    status: 200,
  });
}
