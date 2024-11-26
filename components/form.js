"use client";

import Image from "next/image";
import { transformLink } from "@/utils/s3Link";
import { useRef } from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PayPalButton from "./PaypalButton";
import { primaryFontColor, secondaryFontColor } from "@/utils/styles";

export default function OrderForm({ handleScrollToSection }) {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    pin: "",
    state: "",
    country: "",
  });
  const [products, setProducts] = useState([
    { name: "Christmas Tree Skirt", price: 80 },
  ]);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts((prev) => [...prev, { name: "", price: "" }]);
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const res = await fetch("/api/orders/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: file.name,
              folder: `orders/${customer.name}-${customer.email}`, // Unique folder for the current order
            }),
          });

          if (!res.ok) throw new Error("Failed to get signed URL");

          const { uploadUrl, fileUrl } = await res.json();

          // Upload to S3
          await fetch(uploadUrl, {
            method: "PUT",
            headers: {
              "Content-Type": file.type,
            },
            body: file,
          });

          return fileUrl;
        })
      );

      setImages((prev) => [...prev, ...uploadedImages]);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (
      !customer.name ||
      !customer.email ||
      !products.length ||
      images.length === 0
    ) {
      alert("Please fill in all required fields and upload images.");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          products,
          imagesFolder: `orders/${customer.name}-${customer.email}`,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      setOrderSuccess(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }

    // Push to the Thank You page with query parameters
    localStorage.setItem("customer", JSON.stringify(customer));
    localStorage.setItem("products", JSON.stringify(products));
    router.push(`/thankyou`);
  };

  const handleRemoveImage = async (index) => {
    const imageUrl = images[index];
    const fileName =
      imageUrl.split("/")[imageUrl.split("/").length - 2] +
      "/" +
      imageUrl.split("/")[imageUrl.split("/").length - 1]; // Extract the file name from the URL

    try {
      setImages((prev) => prev.filter((_, i) => i !== index)); // Remove from UI first

      // Send a request to the backend to delete the image from S3
      const res = await fetch("/api/orders/remove-image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName }), // Send the file name to the backend
      });

      if (!res.ok) {
        throw new Error("Failed to remove image");
      }
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  function handleScrollToSection1() {
    section1Ref.current?.scrollIntoView({
      behavior: "smooth", // Smooth scroll effect
      block: "start", // Align to the top of the viewport
    });
  }
  function handleScrollToSection2() {
    section2Ref.current?.scrollIntoView({
      behavior: "smooth", // Smooth scroll effect
      block: "start", // Align to the top of the viewport
    });
  }
  function handleScrollToSection3() {
    section3Ref.current?.scrollIntoView({
      behavior: "smooth", // Smooth scroll effect
      block: "start", // Align to the top of the viewport
    });
  }

  // meta events
  async function metaAddToCart() {
    await fetch("/api/meta/atc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: products.reduce((acc, curr) => acc + curr.price, 0).toFixed(2),
        quantity: products.length,
        email: customer.email,
        phone: customer.phone,
        fbc: sessionStorage.getItem("_fbc"),
        fbp: sessionStorage.getItem("_fbp"),
      }),
    });
  }

  async function metaCheckout() {
    await fetch("/api/meta/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        value: products.reduce((acc, curr) => acc + curr.price, 0).toFixed(2),
        quantity: products.length,
        email: customer.email,
        phone: customer.phone,
        fbc: sessionStorage.getItem("_fbc"),
        fbp: sessionStorage.getItem("_fbp"),
        totalAmount: products
          .reduce((acc, curr) => acc + curr.price, 0)
          .toFixed(2),
        qty: products.length,
      }),
    });
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1
        className="text-4xl font-extrabold mb-6 text-center drop-shadow-md"
        style={{ color: "red" }}
      >
        Claim Your Holiday Magic Now
      </h1>

      {orderSuccess ? (
        <p className="text-green-600 text-lg text-center">
          Order placed successfully!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div ref={section1Ref}></div> {/* Step 1: Customer Details */}
          {step >= 1 && (
            <fieldset className="p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
              <legend
                className="text-2xl font-semibold text-center  mb-4"
                style={{ color: secondaryFontColor }}
              >
                Shipping Details
              </legend>
              {Object.keys(customer).map((field) => (
                <div key={field} className="mb-4">
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "phone" || field === "pin" ? "tel" : "text"}
                    id={field}
                    name={field}
                    value={customer[field]}
                    onChange={handleCustomerChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
              ))}
              <button
                id="form-btn-1"
                type="button"
                disabled={
                  !customer.name ||
                  !customer.email ||
                  !customer.phone ||
                  !customer.street ||
                  !customer.city ||
                  !customer.pin ||
                  !customer.state ||
                  !customer.country
                }
                onClick={() => {
                  setStep(2);
                  handleScrollToSection2();
                  metaAddToCart();
                }}
                className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
              >
                Next: Upload Images
              </button>
            </fieldset>
          )}
          {/* Step 2: Upload Images */}
          <div ref={section2Ref}></div>
          {step >= 2 && (
            <fieldset className="p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white max-w-4xl mx-auto overflow-hidden">
              <legend
                className="text-2xl font-semibold text-center mb-4"
                style={{ color: secondaryFontColor }}
              >
                Upload Images
              </legend>

              <p className="text-lg text-gray-700 font-medium mt-2 text-center">
                Upload up to 15 images
              </p>
              <input
                type="file"
                multiple
                disabled={images.length >= 15}
                accept="image/*"
                onChange={handleUpload}
                className="mb-4 p-2 bg-white border border-gray-300 rounded-md w-full"
              />
              {uploading && (
                <p className="text-blue-600 text-center">
                  Uploading images... Please wait
                </p>
              )}
              {images.length > 0 && (
                <div className="mb-4">
                  <ul className="flex flex-wrap gap-4 overflow-x-auto">
                    {images.map((url, index) => (
                      <li
                        key={index}
                        className="relative w-24 h-24 rounded-md overflow-hidden"
                      >
                        <Image
                          src={transformLink(url)}
                          alt={`Uploaded Image ${index}`}
                          className="object-cover w-full h-full"
                          width={400}
                          height={400}
                          unoptimized
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {images.length > 15 && (
                <p className="text-red-600 text-sm text-center">
                  You have exceeded the limit of 15 images.
                </p>
              )}
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  handleScrollToSection1();
                }}
                className="w-full py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mb-2"
              >
                Back: Customer Details
              </button>
              <button
                id="form-btn-2"
                type="button"
                disabled={images.length === 0 || images.length > 15}
                onClick={() => {
                  setStep(3);
                  handleScrollToSection3();
                }}
                className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
              >
                Next: Confirm Order
              </button>
            </fieldset>
          )}
          {/* Step 3: Products */}
          <div ref={section3Ref}></div>
          {step >= 3 && (
            <fieldset className="p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
              <legend
                className="text-2xl font-semibold text-center mb-4"
                style={{ color: secondaryFontColor }}
              >
                Confirm Order
              </legend>

              {/* Order Bumps with Animated Arrow */}
              <div className="space-y-6">
                {[
                  {
                    title: "Customized Christmas Stocking",
                    price: 29.99,
                    description:
                      "Add a personalized Christmas stocking to your order.",
                    image:
                      "https://printify.com/cdn-cgi/image/width=520,quality=100,format=avif/https://images.printify.com/api/catalog/66d80f895d7e08d6ce09e147",
                  },
                  {
                    title: "Customized Wrapping Paper",
                    price: 9.99,
                    description:
                      "Get festive with customized wrapping paper for all your gifts.",
                    image:
                      "https://printify.com/cdn-cgi/image/width=520,quality=100,format=avif/https://images.printify.com/api/catalog/66d596c9f863229a4c0c5e46",
                  },
                ].map((orderBump, index) => (
                  <div
                    key={index}
                    className="relative flex items-center space-x-4 p-4 border border-gray-300 rounded-lg shadow-md bg-red-50 hover:bg-red-100 transition"
                  >
                    {/* Animated Arrow */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <div className="animate-ping bg-yellow-500 rounded-full w-4 h-4">
                        <Image
                          src="/formArrow.svg" // Change this to your image path
                          alt="form arrow"
                          width={80} // Adjust image size if necessary
                          height={80}
                          className="m-auto "
                        />
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      id={`order-bump-${index}`}
                      checked={products.some(
                        (product) => product.name === orderBump.title
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setProducts((prev) => [
                            ...prev,
                            { name: orderBump.title, price: orderBump.price },
                          ]);
                        } else {
                          setProducts((prev) =>
                            prev.filter(
                              (product) => product.name !== orderBump.title
                            )
                          );
                        }
                      }}
                      className="h-5 w-5 border-gray-300 rounded"
                    />
                    <div className="flex items-center space-x-4">
                      <Image
                        src={orderBump.image}
                        alt={orderBump.title}
                        width={400}
                        height={400}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="text-sm">
                        <h4 className="font-semibold">
                          Add {orderBump.title} to your order at just - $
                          {orderBump.price}
                        </h4>
                        <p className="text-gray-600">{orderBump.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 space-y-4">
                {/* List each product */}
                {products.map((product, index) => (
                  <div key={index} className="flex justify-between text-lg">
                    <span>{product.name}</span>
                    <span>${product.price.toFixed(2)}</span>
                  </div>
                ))}

                {/* Total Amount */}
                <div
                  className="flex justify-between text-xl font-bold "
                  style={{ color: primaryFontColor }}
                >
                  <span>Total Amount:</span>
                  <span>
                    $
                    {products
                      .reduce((acc, curr) => acc + curr.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <button
                type="button"
                onClick={() => {
                  setStep(2);
                  handleScrollToSection2();
                }}
                className="w-full py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mt-6 mb-2"
              >
                Back: Upload Images
              </button>
              <PayPalButton
                amount={products
                  .reduce((acc, curr) => acc + curr.price, 0)
                  .toFixed(2)}
                onFormSubmit={handleSubmit}
                metaCheckout={metaCheckout}
              />
            </fieldset>
          )}
        </form>
      )}
    </div>
  );
}
