"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const ImageFetcher = ({ imageKey }) => {
  const [imageUrl, setImageUrl] = useState(null); // Stores the signed URL
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(false); // Tracks if an error occurred

  useEffect(() => {
    const fetchImage = async () => {
      if (!imageKey) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/get-object-url?objectKey=${encodeURIComponent(imageKey)}`
        );
        const data = await response.json();

        if (response.ok && data.url) {
          setImageUrl(data.url);
        } else {
          console.error("Failed to fetch image URL:", data.error);
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching image URL:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [imageKey]);

  // if (loading) {
  //   return <p className="text-blue-600">Loading image...</p>;
  // }

  // if (error || !imageUrl) {
  //   return (
  //     <div className="text-red-600 text-sm">
  //       Failed to load image. Please try again.
  //     </div>
  //   );
  // }

  return (
    <Image
      src={imageUrl}
      alt={`Uploaded Image`}
      className="w-24 h-24 object-cover rounded-md"
      width={400}
      height={400}
    />
  );
};

export default ImageFetcher;
