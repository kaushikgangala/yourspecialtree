"use client";

import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

import Image from "next/image";
import { useRef } from "react";

import DiscountCounter from "../components/counter";
import OrderForm from "../components/form";
import ProductDetails from "@/components/ProductDetails";
import Footer from "@/components/Footer";
import { primaryFontColor, secondaryFontColor } from "@/utils/styles";

import TestimonialsGrid from "../components/TestimonialsGrid";

const testimonials = [
  {
    image:
      "https://s3.us-east-1.amazonaws.com/yst.images/site-assets/review+1.png", // Replace with actual image paths
  },
  {
    image:
      "https://s3.us-east-1.amazonaws.com/yst.images/site-assets/review+2.png", // Replace with actual image paths
  },
  {
    image:
      "https://s3.us-east-1.amazonaws.com/yst.images/site-assets/review+3.png", // Replace with actual image paths
  },
  {
    image:
      "https://s3.us-east-1.amazonaws.com/yst.images/site-assets/review+4.png", // Replace with actual image paths
  },
  {
    image:
      "https://s3.us-east-1.amazonaws.com/yst.images/site-assets/review+5.png", // Replace with actual image paths
  },
  {
    image:
      "https://s3.us-east-1.amazonaws.com/yst.images/site-assets/review+6.png", // Replace with actual image paths
  },
  {
    image:
      "https://s3.us-east-1.amazonaws.com/yst.images/site-assets/review+7.png", // Replace with actual image paths
  },
  {
    image:
      "https://s3.us-east-1.amazonaws.com/yst.images/site-assets/review+8.png", // Replace with actual image paths
  },
  {
    image:
      "https://s3.us-east-1.amazonaws.com/yst.images/site-assets/review+9.png", // Replace with actual image paths
  },
  {
    image:
      "https://s3.us-east-1.amazonaws.com/yst.images/site-assets/review+10.png", // Replace with actual image paths
  },
  {
    image:
      "https://s3.us-east-1.amazonaws.com/yst.images/site-assets/review+11.png", // Replace with actual image paths
  },
  {
    image:
      "https://s3.us-east-1.amazonaws.com/yst.images/site-assets/review+12.png", // Replace with actual image paths
  },
];

export default function Home() {
  const sectionRef = useRef(null);
  const handleScrollToSection = () => {
    // Scroll to the section when the button is clicked
    sectionRef.current?.scrollIntoView({
      behavior: "smooth", // Smooth scroll effect
      block: "start", // Align to the top of the viewport
    });
  };

  return (
    <>
      <DiscountCounter />

      <div className="flex justify-center items-center space-x-6">
        <div className="w-full" style={{ backgroundColor: "red" }}>
          <Image
            src="/logo.svg" // Change this to your image path
            alt="Special Tree Image"
            width={120} // Adjust image size if necessary
            height={120}
            className="m-auto pt-1 pb-2"
          />
        </div>
      </div>
      {/* "Your Special Tree" Section with Image */}
      <p className={`${caveat.className} text-center text-xl mt-12 mb-2`}>
        Planning for Christmas this year?
      </p>
      <h1
        className="text-4xl font-extrabold mb-6 text-center  px-20"
        style={{ color: primaryFontColor }}
      >
        {/* We believe every Christmas tree deserves a unique touch. */}
        Meet - Merry Skirts
      </h1>

      <p className="text-lg text-center" style={{ color: secondaryFontColor }}>
        Helping you add a personal touch to your Christmas Tree is what we do
        best
      </p>
      <div className="mt-6 text-center">
        <button
          className=" text-white px-6 py-3 rounded-md shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
          style={{ backgroundColor: "red" }}
          onClick={handleScrollToSection}
        >
          Customize Yours Now
        </button>
      </div>

      <div className="container mx-auto p-6 mt-16">
        {/* Responsive Flex Container */}
        <div className="flex flex-col-reverse md:flex-row justify-center gap-10">
          {/* Left Section */}
          <div className="flex-1 space-y-6  max-w-screen-sm">
            {/* Product Title */}
            <ProductDetails handleScrollToSection={handleScrollToSection} />
          </div>

          {/* Right Section */}
          <div className="flex-1 space-y-6   max-w-screen-sm" ref={sectionRef}>
            <OrderForm handleScrollToSection={handleScrollToSection} />
          </div>
        </div>
      </div>
      <TestimonialsGrid
        testimonials={testimonials}
        handleScrollToSection={handleScrollToSection}
      />

      <Footer />
    </>
  );
}
