import React from "react";

const PricingPage: React.FC = () => {
  return (
    <main className="px-8 py-6">
      <h1 className="text-[32px] font-bold text-[#202224] tracking-[-0.35%] mb-12">
        Pricing
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Basic Plan */}
        <div className="pricing-card bg-white rounded-[24px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] p-8 flex flex-col relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-[22px] font-bold text-[#202224] mb-2">
                Basic
              </h2>
              <div className="pricing-amount mb-2">
                <span className="text-[46px] font-extrabold text-[#4880FF]">
                  $14.99
                </span>
              </div>
              <p className="text-base text-[#212121]/80 font-normal mb-6">
                Monthly Charge
              </p>
            </div>

            <hr className="border-t border-[#212121]/10 mb-6" />

            <div className="pricing-features space-y-4 mb-6 flex-grow flex flex-col items-center justify-center">
              <div className="flex items-center">
                <span className="text-lg font-semibold text-[#212121]">
                  Free Setup
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold text-[#212121]">
                  20 User Connection
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold text-[#212121]">
                  Bandwidth Limit 10 GB
                </span>
              </div>
              <div className="flex items-center opacity-40">
                <span className="text-lg font-semibold text-[#212121]">
                  Analytics Report
                </span>
              </div>
              <div className="flex items-center opacity-40">
                <span className="text-lg font-semibold text-[#212121]">
                  Public API Access
                </span>
              </div>
              <div className="flex items-center opacity-40">
                <span className="text-lg font-semibold text-[#212121]">
                  Custom Content Management
                </span>
              </div>
              <div className="flex items-center opacity-40">
                <span className="text-lg font-semibold text-[#212121]">
                  Plugins Integration
                </span>
              </div>
            </div>

            <hr className="border-t border-[#212121]/10 mb-6" />

            <h3 className="text-[16px] font-bold text-[#212121] mb-4 text-center">
              Start Your 30 Day Free Trial
            </h3>
            <div className="flex items-center justify-center">
              <button className="bg-[#52D679] text-white font-bold py-3 px-6 rounded-full border-2 border-[#52D679] hover:bg-opacity-90 transition-all hover:shadow-[0_4px_8px_rgba(82,214,121,0.2)]">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Standard Plan */}
        <div className="pricing-card bg-white rounded-[24px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] p-8 flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pattern-overlay">
            {/* <img
              src={patternBg}
              alt=""
              className="w-full h-full object-cover"
            /> */}
          </div>
          <div className="relative z-10">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-[22px] font-bold text-[#202224] mb-2">
                Standard
              </h2>
              <div className="pricing-amount mb-2">
                <span className="text-[46px] font-extrabold text-[#4880FF]">
                  $49.99
                </span>
              </div>
              <p className="text-base text-[#212121]/80 font-normal mb-6">
                Monthly Charge
              </p>
            </div>

            <hr className="border-t border-[#212121]/10 mb-6" />

            <div className="pricing-features space-y-4 mb-6 flex-grow flex flex-col items-center justify-center">
              <div className="flex items-center">
                <span className="text-lg font-semibold text-[#212121]">
                  Free Setup
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold text-[#212121]">
                  20 User Connection
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold text-[#212121]">
                  Bandwidth Limit 10 GB
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold text-[#212121]">
                  Analytics Report
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold text-[#212121]">
                  Public API Access
                </span>
              </div>
              <div className="flex items-center opacity-40">
                <span className="text-lg font-semibold text-[#212121]">
                  Custom Content Management
                </span>
              </div>
              <div className="flex items-center opacity-40">
                <span className="text-lg font-semibold text-[#212121]">
                  Plugins Integration
                </span>
              </div>
            </div>

            <hr className="border-t border-[#212121]/10 mb-6" />

            <h3 className="text-[16px] font-bold text-[#212121] mb-4 text-center">
              Start Your 30 Day Free Trial
            </h3>
            <div className="flex items-center justify-center">
              <button className="bg-[#52D679] text-white font-bold py-3 px-6 rounded-full border-2 border-[#52D679] hover:bg-opacity-90 transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="pricing-card bg-[#4880FF] rounded-[24px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] p-8 flex flex-col text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pattern-overlay">
            {/* <img
              src={patternBg}
              alt=""
              className="w-full h-full object-cover"
            /> */}
          </div>
          <div className="relative z-10">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-[22px] font-bold mb-2">Premium</h2>
              <div className="pricing-amount mb-2">
                <span className="text-[46px] font-extrabold">$89.99</span>
              </div>
              <p className="text-base opacity-80 font-normal mb-6">
                Monthly Charge
              </p>
            </div>

            <hr className="border-t border-white/10 mb-6" />

            <div className="pricing-features space-y-4 mb-6 flex-grow flex flex-col items-center justify-center">
              <div className="flex items-center">
                <span className="text-lg font-semibold">Free Setup</span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold">
                  20 User Connection
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold">
                  Bandwidth Limit 10 GB
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold">Analytics Report</span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold">Public API Access</span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold">
                  Custom Content Management
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold">
                  Plugins Integration
                </span>
              </div>
            </div>

            <hr className="border-t border-white/10 mb-6" />

            <h3 className="text-[16px] font-bold mb-4 text-center">
              Start Your 30 Day Free Trial
            </h3>
            <div className="flex items-center justify-center">
              <button className="bg-white text-[#4880FF] font-bold py-3 px-6 rounded-full border-2 border-white hover:bg-opacity-90 transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PricingPage;
