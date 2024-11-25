"use client";
import { useState } from "react";
import Image from "next/image";
import Images from "./Images"
import React from "react";

const ProductDetails = ({handleScrollToSection}) => {
  const [currentImage, setCurrentImage] = useState(0);

  // Sample images for the carousel
  const images = [
    "https://printify.com/cdn-cgi/image/width=720,quality=100,format=avif/https://images.printify.com/api/catalog/66d828d6778c2df71b0b43d2",
    "https://printify.com/cdn-cgi/image/width=720,quality=100,format=avif/https://images.printify.com/api/catalog/63526ee3ee512ff9ba093675",
    "https://printify.com/cdn-cgi/image/width=720,quality=100,format=avif/https://images.printify.com/api/catalog/5bbf2226a342bc24de48c9c1",
    "https://printify.com/cdn-cgi/image/width=720,quality=100,format=avif/https://images.printify.com/api/catalog/66d828d16c2346293e0162c6",
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
  <h1 className="text-3xl font-extrabold mb-6 text-center text-red-600">
    We believe every Christmas tree deserves a unique touch.
  </h1>

  {/* Image Carousel */}
  <div className="relative mb-6">
    <Images images={images} />
  </div>

  {/* Product Description */}
  <section className="mt-8">
  <h2 className="text-3xl font-semibold text-gray-900 mb-6">Why You'll Love It</h2>
  <ul className="list-disc list-inside space-y-4 text-gray-700 text-lg">
    <li>
      <span className="font-semibold text-gray-900">A Piece of Your Holiday Story:{" "}</span>  
      This tree skirt will be a part of your family’s Christmas traditions for years to come, creating memories every season.
    </li>
    <li>
      <span className="font-semibold text-gray-900">Wrapped in Comfort:{" "}</span>  
      Feel the warmth of soft, plush fleece as you gather with loved ones around the tree—cozy, just like home.
    </li>
    <li>
      <span className="font-semibold text-gray-900">Made Just for You:{" "}</span>  
      Every stitch is a reminder that this isn’t just any holiday decoration; it’s a personalized piece crafted with care for your family.
    </li>
  </ul>
</section>



  <div className="bg-white text-red-600 max-w-md mx-auto p-6 rounded-lg shadow-lg border border-red-600">
    <h1 className="text-3xl font-bold text-center text-green-600 mb-4">
      Limited-Time Offer!
    </h1>
    <div className="flex justify-center items-center gap-2 mb-4">
      <span className="text-gray-500 line-through text-lg">$160</span>
      <span className="text-4xl font-bold text-green-600">$80</span>
    </div>

    <p className="text-center text-red-500 font-medium mb-4">
      **Grab this deal while stocks last!**
    </p>

    <div className="mt-6">
      <p className="text-lg font-medium">
        Expected Delivery:
        <span className="block text-2xl font-bold text-red-600 mt-2">{formattedDeliveryDate}</span>
      </p>
    </div>

    <div className="mt-6 text-center">
      <button className="bg-red-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105" onClick={handleScrollToSection}>
        Customize Yours Now
      </button>
    </div>
  </div>
</>

  );
};

export default ProductDetails;
