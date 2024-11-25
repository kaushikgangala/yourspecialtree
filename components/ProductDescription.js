import React from 'react'
import Image from "next/image";


const ProductDescription = ({handleScrollToSection}) => {
  return (
    <>
<div className="max-w-7xl mx-auto mt-12 px-6">
  <section className="bg-white rounded-lg shadow-lg p-8">
    <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
      Personalized Christmas Tree Skirts
    </h1>
    <p className="text-lg text-gray-700 mt-4 text-center mb-6 max-w-2xl mx-auto">
      Transform your tree into a stunning holiday centerpiece with our{" "}
      <span className="font-semibold text-red-600">Personalized Christmas Tree Skirt</span>! Made with soft, plush fleece, this skirt adds warmth and festive cheer to any home.
    </p>
    
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="flex justify-center items-center">
        <Image
          src={'https://printify.com/cdn-cgi/image/width=720,quality=100,format=avif/https://images.printify.com/api/catalog/66d828d6778c2df71b0b43d2'}
          alt="Personalized Christmas Tree Skirt"
          width={600}
          height={600}
          className="w-full h-auto rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
          Made with...
        </h2>
        <ul className="list-disc list-inside space-y-4 text-gray-700 text-lg">
          <li>
            <span className="font-semibold text-gray-900">100% Polyester:</span> A durable, quick-drying fabric that ensures your skirt lasts through the seasons.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Soft and Plush Fleece Material:</span> Ultra-soft and cozy, it creates the perfect backdrop for your tree&apos;s holiday magic.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Hemmed Edges:</span> Quality craftsmanship that guarantees long-lasting durability year after year.
          </li>
        </ul>

        <div>
          <h2 className="text-2xl font-medium text-gray-900 mt-8">Care Instructions</h2>
          <p className="text-gray-700 mt-2 text-lg">
            Machine wash cold with similar colors on a gentle cycle. Tumble dry low or hang dry. For best results, avoid bleach or dry cleaning.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-medium text-gray-900 mt-8">Size Guide</h2>
          <p className="text-gray-700 mt-2 text-lg">
            Diameter: ~44&quot; (Imperial)
          </p>
        </div>
      </div>
    </div>

    {/* Call to Action */}
    <div className="mt-12 text-center">
      <button
        className="bg-red-600 text-white text-lg font-semibold px-10 py-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
        onClick={handleScrollToSection}
      >
        Customize Yours Now
      </button>
    </div>
  </section>
</div>


</>
  )
}

export default ProductDescription