import React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiChevronDown,
  FiFilter,
} from "react-icons/fi";

const OrderLists: React.FC = () => {
  // Order data based on Figma design
  const orders = [
    {
      id: "00001",
      name: "Christine Brooks",
      address: "089 Kutch Green Apt. 448",
      date: "04 Sep 2019",
      type: "Electric",
      status: "Completed",
    },
    {
      id: "00002",
      name: "Rosie Pearson",
      address: "979 Immanuel Ferry Suite 526",
      date: "28 May 2019",
      type: "Book",
      status: "Processing",
    },
    {
      id: "00003",
      name: "Darrell Caldwell",
      address: "8587 Frida Ports",
      date: "23 Nov 2019",
      type: "Medicine",
      status: "Rejected",
    },
    {
      id: "00004",
      name: "Gilbert Johnston",
      address: "768 Destiny Lake Suite 600",
      date: "05 Feb 2019",
      type: "Mobile",
      status: "Completed",
    },
    {
      id: "00005",
      name: "Alan Cain",
      address: "042 Mylene Throughway",
      date: "29 Jul 2019",
      type: "Watch",
      status: "Processing",
    },
    {
      id: "00006",
      name: "Alfred Murray",
      address: "543 Weimann Mountain",
      date: "15 Aug 2019",
      type: "Medicine",
      status: "Completed",
    },
    {
      id: "00007",
      name: "Maggie Sullivan",
      address: "New Scottieberg",
      date: "21 Dec 2019",
      type: "Watch",
      status: "Processing",
    },
    {
      id: "00008",
      name: "Rosie Todd",
      address: "New Jon",
      date: "30 Apr 2019",
      type: "Medicine",
      status: "On Hold",
    },
    {
      id: "00009",
      name: "Dollie Hines",
      address: "124 Lyla Forge Suite 975",
      date: "09 Jan 2019",
      type: "Book",
      status: "In Transit",
    },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#E6F7F4] text-[#00B69B]"; // Green
      case "Processing":
        return "bg-[#EFE6FD] text-[#6226EF]"; // Purple
      case "Rejected":
        return "bg-[#FCE6E6] text-[#EF3826]"; // Red
      case "On Hold":
        return "bg-[#FFF8E7] text-[#FFA756]"; // Orange
      case "In Transit":
        return "bg-[#F2E6FF] text-[#BA29FF]"; // Purple
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-[#F5F6FA] min-h-screen">
      <main className="px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[32px] font-bold text-[#202224] tracking-[-0.5px]">
            Order Lists
          </h1>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#F9F9FB] rounded-xl shadow-sm border border-[#D5D5D5] p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Filter By */}
            <div className="relative flex items-center border-r border-[#979797]/70">
              <FiFilter className="text-[#202224] mr-2" />
              <p className="text-sm font-bold text-[#202224]">Filter By</p>
            </div>

            {/* Date */}
            <div className="relative flex items-center justify-between cursor-pointer border-r border-[#979797]/70">
              <p className="text-sm font-bold text-[#202224]">Date</p>
              <FiChevronDown className="text-[#202224]" />
            </div>

            {/* Order Status */}
            <div className="relative flex items-center justify-between cursor-pointer border-r border-[#979797]/70">
              <p className="text-sm font-bold text-[#202224]">Order Status</p>
              <FiChevronDown className="text-[#202224]" />
            </div>

            {/* Order Type */}
            <div className="relative flex items-center justify-between cursor-pointer border-r border-[#979797]/70">
              <p className="text-sm font-bold text-[#202224]">Order Type</p>
              <FiChevronDown className="text-[#202224]" />
            </div>

            {/* Reset Filter */}
            <div className="flex items-center justify-center">
              <button className="flex items-center justify-center text-[#EA0234] font-semibold">
                <FiRefreshCw className="mr-2" />
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-[#B9B9B9]/30 rounded-xl shadow-sm mb-6 overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#FCFDFD] border-b border-[#D5D5D5] py-4 px-6 grid grid-cols-7">
            <div className="text-sm font-extrabold text-[#202224]/90">ID</div>
            <div className="text-sm font-extrabold text-[#202224]/90">NAME</div>
            <div className="text-sm font-extrabold text-[#202224]/90 col-span-2">
              ADDRESS
            </div>
            <div className="text-sm font-extrabold text-[#202224]/90">DATE</div>
            <div className="text-sm font-extrabold text-[#202224]/90">TYPE</div>
            <div className="text-sm font-extrabold text-[#202224]/90">
              STATUS
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#979797]/60">
            {orders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-7 py-5 px-6 hover:bg-[#F8FAFF] transition-colors"
              >
                <div className="text-sm font-semibold text-[#202224]/90">
                  #{order.id}
                </div>
                <div className="text-sm font-semibold text-[#202224]/90">
                  {order.name}
                </div>
                <div className="text-sm font-semibold text-[#202224]/90 col-span-2">
                  {order.address}
                </div>
                <div className="text-sm font-semibold text-[#202224]/90">
                  {order.date}
                </div>
                <div className="text-sm font-semibold text-[#202224]/90">
                  {order.type}
                </div>
                <div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold ${getStatusStyles(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-[#202224]/60">Showing 1-09 of 78</div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-[#D5D5D5] bg-[#FAFBFD] text-[#202224]/60">
              <FiChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#4880FF] text-white font-bold">
              1
            </button>
            <div className="w-8 h-8 flex items-center justify-center text-[#202224]/90">
              ...
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-[#D5D5D5] text-[#202224]/90 font-semibold hover:bg-[#F8FAFF] transition-colors">
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderLists;
