"use client";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";

export default function SwipableImageGallery({ images }) {
  const [currentImage, setCurrentImage] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Optional, enables swipe with a mouse
  });

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length); // Go to next image
  };

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length); // Go to previous image
  };

  return (
    <div className="relative mb-4" {...handlers}>
      {/* Main Image */}
      <Image
        src={images[currentImage]}
        alt={`Product Image ${currentImage + 1}`}
        width={600}
        height={600}
        unoptimized
        className="w-full h-auto rounded-lg shadow-lg"
      />

      {/* Thumbnail Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((img, index) => (
          <div key={index} className="relative">
            <Image
              src={img}
              alt={`Thumbnail Image ${index + 1}`}
              width={400}
              height={400}
              unoptimized
              className={`cursor-pointer w-12 h-12 rounded-md border-2 ${
                currentImage === index ? "border-blue-500" : "border-gray-400"
              } object-cover`}
              onClick={() => setCurrentImage(index)}
              // aria-label={`Switch to image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
