import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import microsoftHeadset from "../../assets/images/products/microsoft-headset.png";

const FeaturedProductCard: React.FC = () => {
  return (
    <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] p-6 card-hover relative">
      <h2 className="text-2xl font-bold text-[#202224] mb-6">
        Featured Product
      </h2>

      <div className="flex justify-center flex-col items-center relative">
        <div className="mb-4">
          <img
            src={microsoftHeadset}
            alt="Beats Headphone"
            className="w-40 h-40 object-contain"
          />
        </div>

        <h3 className="text-lg font-bold text-[#282D32]">
          Beats Headphone 2019
        </h3>
        <p className="text-[#4880FF] font-bold opacity-70 mt-1 mb-6">$89.00</p>

        {/* Navigation Arrows */}
        <button className="absolute left-0 w-8 h-8 rounded-full bg-[#E2EAF8]/40 flex items-center justify-center">
          <FiChevronLeft className="text-[#626262]" />
        </button>
        <button className="absolute right-0 w-8 h-8 rounded-full bg-[#E2EAF8]/40 flex items-center justify-center">
          <FiChevronRight className="text-[#626262]" />
        </button>
      </div>
    </div>
  );
};

export default React.memo(FeaturedProductCard);
