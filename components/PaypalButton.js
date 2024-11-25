"use client";

import { useEffect, useState } from "react";

export default function PayPalButton({email, phone, amount, onFormSubmit, metaCheckout }) {
  const [clientId, setClientId] = useState(null);
// console.log(clientId)
  useEffect(() => {
    const fetchClientId = async () => {
      const res = await fetch("/api/getclientid");
      const data = await res.json();
      setClientId(data.client_id);
    };

    fetchClientId();
  }, []);

  useEffect(() => {
    if (clientId) {
      const loadPayPalScript = async () => {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&enable-funding=venmo&currency=USD&intent=capture`;
        script.onload = () => initPayPalButtons();
        document.head.appendChild(script);
      };

      const initPayPalButtons = () => {
        paypal
          .Buttons({
            style: {
              shape: "rect",
              color: "gold",
              layout: "vertical",
              label: "paypal",
            },
            createOrder: async () => {
              const res = await fetch("/api/create_order", {
                method: "POST",
                headers: { "Content-Type": "application/json",  },
                body: JSON.stringify({ intent: "capture", purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: amount,
                    },
                  },
                ], }),
              });
              const data = await res.json();
              return data.id;
            },
            onApprove: async (data) => {
              const res = await fetch("/api/complete_order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  intent: "capture",
                  order_id: data.orderID,
                }),
              });

              const orderDetails = await res.json();

              
              metaCheckout();
              onFormSubmit();
            },
            onError: (err) => {
              console.error("PayPal error:", err);
            },
          })
          .render("#paypal-buttons");
      };

      loadPayPalScript();
    }
  }, [clientId, amount, onFormSubmit]);

  return <div id="paypal-buttons"></div>;
}
