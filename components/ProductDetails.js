"use client";
import { useState } from "react";
import Image from "next/image";
import Images from "./Images";
import React from "react";
import { primaryFontColor, secondaryFontColor } from "@/utils/styles";

const ProductDetails = ({ handleScrollToSection }) => {
  const [currentImage, setCurrentImage] = useState(0);

  // Sample images for the carousel
  const images = [
    "https://s3.us-east-1.amazonaws.com/yst.images/site-assets/Close-up.jpg",
    "https://s3.us-east-1.amazonaws.com/yst.images/site-assets/Context.jpg",
    "https://s3.us-east-1.amazonaws.com/yst.images/site-assets/Front.jpg",
  ];

  function getImage(currentImage) {
    return images[currentImage];
  }

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
      {/* Image Carousel */}
      <div className="relative mb-6">
        <Images images={images} />
      </div>

      {/* Product Description */}
      <section className="mt-8">
        <div className="mt-8 grid grid-cols-1  gap-8 mb-12">
          {/* Product Image */}

          {/* Product Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-medium text-gray-900">Made with...</h2>
            <ul className="list-disc list-inside space-y-4 text-gray-700 text-lg">
              <li>
                <span className="font-semibold text-gray-900">
                  100% Polyester:
                </span>{" "}
                A durable, quick-drying fabric that ensures your skirt lasts
                through the seasons.
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  Soft and Plush Fleece Material:
                </span>{" "}
                Ultra-soft and cozy, it creates the perfect backdrop for your
                tree&apos;s holiday magic.
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  Hemmed Edges:
                </span>{" "}
                Quality craftsmanship that guarantees long-lasting durability
                year after year.
              </li>
            </ul>

            <div>
              <h2 className="text-2xl font-medium text-gray-900 mt-8">
                Size Guide
              </h2>
              <p className="text-gray-700 mt-2 text-lg">
                Diameter: ~44&quot; (Imperial)
              </p>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          So why a Merry Skirt?
        </h2>
        {/* <ul className="list-disc list-inside space-y-4 text-gray-700 text-lg"> */}
        <p className="mb-4">
          <span className="font-semibold text-gray-900">Let’s face it — </span>
          Christmas is not just about having a holiday, its about family and
          moments.
        </p>
        <p>
          <span className="font-semibold text-gray-900">
            That’s Where A “MerrySkirts” Comes In.{" "}
          </span>
          Every stitch is a reminder that this isn’t just any holiday
          decoration; it’s a personalized piece crafted with care for your
          family.
        </p>
        {/* </ul> */}
      </section>

      <div className="bg-white  max-w-md mx-auto p-6 rounded-lg shadow-lg border border-red-600">
        <h1
          className="text-3xl font-extrabold text-center mb-4"
          style={{ color: primaryFontColor }}
        >
          Limited-Time Offer!
        </h1>

        <p className="text-center  font-medium mb-4" style={{ color: "red" }}>
          **Grab this deal while stocks last!**
        </p>
        <div className="flex justify-center items-center gap-2">
          <span
            className="line-through text-lg"
            style={{ color: secondaryFontColor }}
          >
            $160
          </span>
          <span
            className="text-4xl font-bold"
            style={{ color: primaryFontColor }}
          >
            $80
          </span>
        </div>

        <div className="mt-6">
          <p className="text-lg font-medium">
            Expected Delivery:
            <span className="block text-2xl font-bold" style={{ color: "red" }}>
              {formattedDeliveryDate}
            </span>
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            className=" text-white px-6 py-3 rounded-md shadow-lg  transition duration-300 transform hover:scale-105"
            style={{ backgroundColor: "red" }}
            onClick={handleScrollToSection}
          >
            Customize Yours Now
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
