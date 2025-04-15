import React from "react";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiPackage,
  FiDollarSign,
  FiUsers,
  FiShoppingBag,
} from "react-icons/fi";

const SummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 stats-grid">
      {/* Total Users */}
      <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] p-6 relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#8280FF]/20 flex items-center justify-center">
          <FiUsers className="text-[#8280FF] text-xl" />
        </div>
        <p className="text-[#202224]/70 text-base font-semibold mb-2">
          Total User
        </p>
        <h2 className="text-[28px] font-bold tracking-wide text-[#202224]">
          40,689
        </h2>
        <div className="mt-4 flex items-center text-xs text-[#00B69B] font-semibold">
          <FiTrendingUp className="mr-1" />
          <span>8.5% Up from yesterday</span>
        </div>
      </div>

      {/* Total Order */}
      <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] p-6 relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#FEC53D]/20 flex items-center justify-center">
          <FiShoppingBag className="text-[#FEC53D] text-xl" />
        </div>
        <p className="text-[#202224]/70 text-base font-semibold mb-2">
          Total Order
        </p>
        <h2 className="text-[28px] font-bold tracking-wide text-[#202224]">
          10293
        </h2>
        <div className="mt-4 flex items-center text-xs text-[#00B69B] font-semibold">
          <FiTrendingUp className="mr-1" />
          <span>1.3% Up from past week</span>
        </div>
      </div>

      {/* Total Sales */}
      <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] p-6 relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#4AD991]/20 flex items-center justify-center">
          <FiDollarSign className="text-[#4AD991] text-xl" />
        </div>
        <p className="text-[#202224]/70 text-base font-semibold mb-2">
          Total Sales
        </p>
        <h2 className="text-[28px] font-bold tracking-wide text-[#202224]">
          $89,000
        </h2>
        <div className="mt-4 flex items-center text-xs text-[#F93C65] font-semibold">
          <FiTrendingDown className="mr-1" />
          <span>4.3% Down from yesterday</span>
        </div>
      </div>

      {/* Total Pending */}
      <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] p-6 relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#FF9066]/30 flex items-center justify-center">
          <FiPackage className="text-[#FF9066] text-xl" />
        </div>
        <p className="text-[#202224]/70 text-base font-semibold mb-2">
          Total Pending
        </p>
        <h2 className="text-[28px] font-bold tracking-wide text-[#202224]">
          2040
        </h2>
        <div className="mt-4 flex items-center text-xs text-[#00B69B] font-semibold">
          <FiTrendingUp className="mr-1" />
          <span>1.8% Up from yesterday</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SummaryCards);
