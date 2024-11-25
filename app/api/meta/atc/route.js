import { sendEvent, getUserData } from "../utils";

export async function POST(req) {
  const body = await req.json(); // Parse JSON body
  const userData = getUserData({ body, headers: req.headers });
  const customData = {
    currency: "USD",
    value: 40.0,
    content_ids: ["galtag"],
    content_type: "product",
    contents: [{ id: "galtag", quantity: 1 }],
  };

  await sendEvent("AddToCart", userData, customData);

  return new Response(JSON.stringify({ message: "AddToCart event sent" }), {
    status: 200,
  });
}
