import React from "react";
import { FiShoppingBag, FiHeart, FiSettings, FiStar } from "react-icons/fi";

// Import product images
import appleWatch from "../assets/images/products/apple-watch.png";
import microsoftHeadset from "../assets/images/products/microsoft-headset.png";
import camera from "../assets/images/products/camera.png";
import samsungA50 from "../assets/images/products/samsung-A50.png";
import womensDress from "../assets/images/products/womens-dress.png";

// Type definition for product
interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
}

const ProductUI: React.FC = () => {
  // Sample products data
  const products: Product[] = [
    {
      id: 1,
      name: "Apple Watch Series 4",
      category: "Electronics",
      image: appleWatch,
      price: 120,
      rating: 4.5,
      reviews: 131,
    },
    {
      id: 2,
      name: "Microsoft Headset",
      category: "Accessories",
      image: microsoftHeadset,
      price: 249,
      rating: 4.2,
      reviews: 98,
    },
    {
      id: 3,
      name: "Digital Camera",
      category: "Electronics",
      image: camera,
      price: 1299,
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: "Samsung A50",
      category: "Phone",
      image: samsungA50,
      price: 499,
      rating: 4.4,
      reviews: 115,
    },
    {
      id: 5,
      name: "Women's Dress",
      category: "Fashion",
      image: womensDress,
      price: 89,
      rating: 4.1,
      reviews: 86,
    },
  ];

  return (
    <div className="p-6 bg-[#F5F6FA]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#202224]">Products</h1>
        <div className="flex space-x-4">
          <button className="p-2 bg-white rounded-lg shadow">
            <FiHeart className="text-gray-500" />
          </button>
          <button className="p-2 bg-white rounded-lg shadow">
            <FiShoppingBag className="text-gray-500" />
          </button>
          <button className="p-2 bg-white rounded-lg shadow">
            <FiSettings className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Featured Product Banner */}
      <div className="mb-8 bg-[#4880FF] rounded-xl shadow-md overflow-hidden relative featured-product-banner">
        <div className="p-8 text-white">
          <h2 className="text-3xl font-black mb-2">
            Enjoy free home
            <br />
            delivery in this summer
          </h2>
          <p className="text-white/80 mb-3 text-base">
            Designer Dresses - Pick from trendy Designer Dress.
          </p>
          <p className="mb-4 text-base">September 12-22</p>
          <button className="bg-[#FF8743] text-white font-bold py-2 px-6 rounded-xl tracking-wider text-sm">
            Get Started
          </button>
        </div>
        {/* Background pattern would be added via CSS */}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-[14px] shadow-md overflow-hidden"
          >
            {/* Image section */}
            <div className="relative h-48 bg-[#F9F9F9]">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain p-4"
              />

              {/* Navigation arrows */}
              <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#E2EAF8]/50 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="transform rotate-90 text-[#626262]">▼</span>
              </button>
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#E2EAF8]/50 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="transform -rotate-90 text-[#626262]">▼</span>
              </button>
            </div>

            {/* Details section */}
            <div className="p-4">
              {/* Favorite icon */}
              <div className="flex justify-end mb-2">
                <button className="text-gray-400 hover:text-red-500">
                  <FiHeart />
                </button>
              </div>

              {/* Product title */}
              <h3 className="font-bold text-lg text-[#202224] mb-2">
                {product.name}
              </h3>

              {/* Ratings */}
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-[#FF9500] fill-[#FF9500]"
                        : "text-black/20"
                    }`}
                  />
                ))}
                <span className="text-sm text-black/40 ml-1">
                  ({product.reviews})
                </span>
              </div>

              {/* Price and action */}
              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-[#4880FF]">
                  ${product.price.toFixed(2)}
                </span>
                <button className="bg-[#E2EAF8]/70 text-[#202224] font-bold py-2 px-4 rounded-xl text-sm">
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductUI;
