"use client";

import ProductDescription from "@/components/ProductDescription";
import Image from "next/image";
import { useRef } from "react";

import DiscountCounter from "../components/counter";
import OrderForm from "../components/form";
import ProductDetails from "@/components/ProductDetails";
import Footer from "@/components/Footer";

export default function Home() {
  const sectionRef = useRef(null);
  const handleScrollToSection = () => {
    console.log("handlescroll");
    // Scroll to the section when the button is clicked
    sectionRef.current?.scrollIntoView({
      behavior: "smooth", // Smooth scroll effect
      block: "start", // Align to the top of the viewport
    });
  };

  return (
    <>
      <DiscountCounter className="text-4xl font-semibold text-center mb-6" />

      {/* "Your Special Tree" Section with Image */}
      <div className="flex justify-center items-center mt-6 mb-6 space-x-6">
        <div>
          <Image
            src="/logo.svg" // Change this to your image path
            alt="Special Tree Image"
            width={100} // Adjust image size if necessary
            height={100}
            className=""
          />
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Responsive Flex Container */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Section */}
          <div className="flex-1 space-y-6">
            {/* Product Title */}
            <ProductDetails handleScrollToSection={handleScrollToSection} />
          </div>

          {/* Right Section */}
          <div className="flex-1 space-y-6" ref={sectionRef}>
            <OrderForm handleScrollToSection={handleScrollToSection} />
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-10">
          <ProductDescription handleScrollToSection={handleScrollToSection} />
        </div>
      </div>

      <Footer />
    </>
  );
}
