import clientPromise from "@/lib/mongodb";

export async function PATCH(req) {
    try {
      // Parse request body
      const body = await req.json();
      const { orderId, completed } = body;
  
      // Validate input
      if (!orderId) {
        throw new Error("Missing order ID");
      }
      if (typeof completed !== "boolean") {
        throw new Error("Invalid or missing 'completed' status");
      }
  
      // Connect to the database
      const client = await clientPromise;
      const db = client.db("yst");
  
      // Update the order
      const result = await db.collection("orders").updateOne(
        { _id: new ObjectId(orderId) },
        { $set: { completed } }
      );
  
      // Check if the order was updated
      if (result.matchedCount === 0) {
        throw new Error("Order not found");
      }
  
      // Respond with success
      return new Response(
        JSON.stringify({ message: "Order updated successfully" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error updating order:", error);
  
      // Respond with an error
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  