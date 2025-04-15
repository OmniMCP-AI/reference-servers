import React from "react";
import customerChartSvg from "../../assets/icons/customer-chart.svg";

const CustomersCard: React.FC = () => {
  return (
    <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] p-6 card-hover">
      <h2 className="text-2xl font-bold text-[#202224] mb-6">Customers</h2>

      <div className="flex justify-center mb-6">
        <img
          src={customerChartSvg}
          alt="Customer Chart"
          className="w-40 h-40"
        />
      </div>

      <div className="flex justify-around">
        {/* New Customers */}
        <div className="relative">
          <h3 className="text-[28px] font-bold tracking-[1px] text-[#202224] mt-2">
            34,249
          </h3>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#4880FF] mr-2"></div>
            <span className="text-[#282D32] text-base font-semibold opacity-80">
              New Customers
            </span>
          </div>
        </div>

        {/* Repeated Customers */}
        <div className="relative">
          <h3 className="text-[28px] font-bold tracking-[1px] text-center text-[#202224] mt-2">
            1,420
          </h3>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#C0D2F0] mr-2"></div>
            <span className="text-[#282D32] text-base font-semibold opacity-80">
              Repeated
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CustomersCard);
