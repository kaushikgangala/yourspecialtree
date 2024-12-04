"use client";

import Image from "next/image";

export default function TestimonialsGrid({
  testimonials,
  handleScrollToSection,
}) {
  return (
    <div className="mt-10 text-center">
      <h2
        className="text-4xl font-extrabold mb-6 text-center drop-shadow-md"
        style={{ color: "red" }}
      >
        See What Our Customer Have To Say...
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {testimonials.map((testimonial, index) => (
          <a
            key={index}
            href={testimonial.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transform transition-transform duration-300"
          >
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={testimonial.image}
                alt={`Testimonial from ${testimonial.name}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg "
              />
              {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <p className="text-white text-center px-4">{testimonial.name}</p>
            </div> */}
            </div>
          </a>
        ))}
      </div>
      <button
        className=" text-white px-6 py-3 text-center rounded-md shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
        style={{ backgroundColor: "red" }}
        onClick={handleScrollToSection}
      >
        Customize Yours Now
      </button>
    </div>
  );
}
