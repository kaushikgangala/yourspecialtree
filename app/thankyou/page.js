"use client";

import Footer from "@/components/Footer";
import { primaryFontColor } from "@/utils/styles";
import { useEffect, useState } from "react";

const ThankYouPage = () => {
  const [customerData, setCustomerData] = useState(null);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    setCustomerData(JSON.parse(localStorage.getItem("customer")));
    setProductData(JSON.parse(localStorage.getItem("products")));
    async function metaPurchaseEvent() {
      await fetch("/api/meta/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: productsData
            .reduce((acc, curr) => acc + curr.price, 0)
            .toFixed(2),
          quantity: products.length,
          email: customerData.email,
          phone: customerData.phone,
          fbc: sessionStorage.getItem("_fbc"),
          fbp: sessionStorage.getItem("_fbp"),
          totalAmount: productData
            .reduce((acc, curr) => acc + curr.price, 0)
            .toFixed(2),
          qty: productData.length,
        }),
      });
    }
    metaPurchaseEvent();
  }, []);

  const currentDate = new Date();
  const deliveryDate = new Date(currentDate);
  deliveryDate.setDate(deliveryDate.getDate() + 6);

  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="thank-you-container bg-red-50 min-h-screen flex items-center justify-center">
        <div className="bg-white  p-8 w-full max-w-3xl ">
          <h1
            className="text-3xl font-extrabold text-center mb-4"
            style={{ color: primaryFontColor }}
          >
            🎄 Thank You for Your Order! 🎁
          </h1>
          <p className="text-lg text-center text-gray-700 mb-6">
            Your order has been successfully placed! Here are the details:
          </p>
          <div className="my-6">
            <p className="text-lg font-medium">
              Expected Delivery:
              <span
                className="block text-2xl font-bold"
                style={{ color: "red" }}
              >
                {formattedDeliveryDate}
              </span>
            </p>
          </div>

          <div className="order-details space-y-6">
            {customerData && (
              <div className=" p-4 rounded-lg shadow-inner">
                <h2 className="text-2xl font-semibold  mb-4">
                  Shipping Details
                </h2>
                <p className="text-lg text-gray-800">
                  <strong>Name:</strong> {customerData.name}
                </p>
                <p className="text-lg text-gray-800">
                  <strong>Email:</strong> {customerData.email}
                </p>
                <p className="text-lg text-gray-800">
                  <strong>Phone:</strong> {customerData.phone}
                </p>
                <p className="text-lg text-gray-800">
                  <strong>Address:</strong> {customerData.street},{" "}
                  {customerData.city}, {customerData.state},{" "}
                  {customerData.country} - {customerData.pin}
                </p>
              </div>
            )}

            <div className=" p-4 rounded-lg shadow-inner">
              <h2 className="text-2xl font-semibold  mb-4">Products Ordered</h2>
              {productData.map((product, index) => (
                <div
                  key={index}
                  className="product-item text-lg text-gray-800 border-b border-gray-200 pb-2 mb-2 last:border-none last:pb-0 last:mb-0"
                >
                  <p>
                    <strong>Product:</strong> {product.name}
                  </p>
                  <p>
                    <strong>Price:</strong> $
                    <span id="amount">{product.price}</span>
                  </p>
                </div>
              ))}

              <div className="mt-4 text-xl font-bold">
                <p id="total-amount">
                  🎅 Total Amount: $
                  {productData
                    .reduce((total, product) => total + product.price, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ThankYouPage;
