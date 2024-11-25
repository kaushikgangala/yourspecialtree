"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the server when the component loads
    async function fetchOrders() {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  // Handle marking an order as complete
  const handleMarkComplete = async (orderId) => {
    try {
      // Send a request to update the order status
      const res = await fetch(`/api/orders`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({orderId, completed: true }),
      });

      if (res.ok) {
        // Update the local state to mark the order as complete
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, completed: true } : order
          )
        );
      } else {
        console.error("Failed to mark order as complete.");
      }
    } catch (error) {
      console.error("Error marking order as complete:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        Orders Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className={`p-6 rounded-lg shadow-lg ${
              order.completed
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-white hover:shadow-xl"
            }`}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Order ID: {order._id}
            </h2>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Customer:</strong> {order.customer.name}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Email:</strong> {order.customer.email}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Images folder:</strong>  {order.imagesFolder}
</p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Address:</strong> {order.customer.street}, {order.customer.city},{" "}
              {order.customer.state}, {order.customer.country} -{" "}
              {order.customer.pin}
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Products Ordered:
            </h3>
            <ul className="list-disc list-inside mb-4">
              {order.products.map((product, index) => (
                <li key={index} className="text-gray-700">
                  {product.name} - ${product.price}
                </li>
              ))}
            </ul>

            {!order.completed && (
              <button
                onClick={() => handleMarkComplete(order._id)}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Mark Complete
              </button>
            )}
            {order.completed && (
              <p className="text-center text-lg text-gray-500 font-semibold mt-4">
                ✅ Order Completed
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
