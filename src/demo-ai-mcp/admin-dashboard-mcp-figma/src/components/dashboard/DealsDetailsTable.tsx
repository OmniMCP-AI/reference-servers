import React from "react";
import { FiChevronDown } from "react-icons/fi";
import appleWatch from "../../assets/images/products/apple-watch.png";
import microsoftHeadset from "../../assets/images/products/microsoft-headset.png";
import samsungA50 from "../../assets/images/products/samsung-A50.png";

const DealsDetailsTable: React.FC = () => {
  return (
    <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] p-6 card-hover mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#202224]">Deals Details</h2>
        <div className="border border-[#D5D5D5] rounded px-3 py-1 flex items-center text-sm text-[rgba(43,48,52,0.4)]">
          <span>October</span>
          <FiChevronDown className="ml-2" />
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] bg-[#F1F4F9] p-3 rounded-xl text-sm font-bold text-[#202224] mb-4">
        <div>Product Name</div>
        <div>Location</div>
        <div>Date - Time</div>
        <div>Piece</div>
        <div>Status</div>
      </div>

      {/* Table Rows */}
      <div className="space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] items-center border-b border-gray-200 pb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-2">
              <img
                src={appleWatch}
                alt="Apple Watch"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-[#202224]/80 font-semibold">
              Apple Watch
            </span>
          </div>
          <div className="text-sm text-[#202224]/80 font-semibold">
            Hanoi, Vietnam
          </div>
          <div className="text-sm text-[#202224]/80 font-semibold">
            11.03.2025 - 08:53 PM
          </div>
          <div className="text-sm text-[#202224]/80 font-semibold">423</div>
          <div>
            <span className="status-badge status-delivered">Delivered</span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] items-center border-b border-gray-200 pb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-2">
              <img
                src={microsoftHeadset}
                alt="Microsoft Headset"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-[#202224]/80 font-semibold">
              Microsoft Headset
            </span>
          </div>
          <div className="text-sm text-[#202224]/80 font-semibold">
            Da Nang, Vietnam
          </div>
          <div className="text-sm text-[#202224]/80 font-semibold">
            11.03.2025 - 10:52 PM
          </div>
          <div className="text-sm text-[#202224]/80 font-semibold">231</div>
          <div>
            <span className="status-badge status-pending">Pending</span>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-2">
              <img
                src={samsungA50}
                alt="Samsung A50"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-[#202224]/80 font-semibold">
              Samsung A50
            </span>
          </div>
          <div className="text-sm text-[#202224]/80 font-semibold">
            HCM, Vietnam
          </div>
          <div className="text-sm text-[#202224]/80 font-semibold">
            02.02.2025 - 12:23 PM
          </div>
          <div className="text-sm text-[#202224]/80 font-semibold">111</div>
          <div>
            <span className="status-badge status-rejected">Rejected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DealsDetailsTable);
