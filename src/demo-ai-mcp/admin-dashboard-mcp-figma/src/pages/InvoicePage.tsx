import React from "react";
import { FiPrinter } from "react-icons/fi";

interface InvoiceItemProps {
  serialNo: string;
  description: string;
  basePrice: string;
  quantity: string;
  totalCost: string;
}

const InvoicePage: React.FC = () => {
  const invoiceItems: InvoiceItemProps[] = [
    {
      serialNo: "1",
      description: "Children Toy",
      basePrice: "$20",
      quantity: "2",
      totalCost: "$80",
    },
    {
      serialNo: "2",
      description: "Makeup",
      basePrice: "$50",
      quantity: "2",
      totalCost: "$100",
    },
    {
      serialNo: "3",
      description: "Asus Laptop",
      basePrice: "$100",
      quantity: "5",
      totalCost: "$500",
    },
    {
      serialNo: "4",
      description: "Iphone X",
      basePrice: "$1000",
      quantity: "4",
      totalCost: "$4000",
    },
  ];

  return (
    <main className="px-8 py-6">
      {/* Header */}
      <h1 className="text-[#202224] text-3xl font-bold mb-8">Invoice</h1>

      {/* Invoice Card */}
      <div className="invoice-card bg-white rounded-xl border border-[#B9B9B9] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.03)] p-8">
        {/* Invoice Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Invoice From */}
          <div>
            <p className="text-[#404040] text-base font-semibold mb-1">
              Invoice From :
            </p>
            <h3 className="text-[#404040] text-base font-bold mb-1">
              Virginia Walker
            </h3>
            <p className="text-[#565656] text-sm font-semibold">
              9694 Krajcik Locks Suite 635
            </p>
          </div>

          {/* Invoice To */}
          <div>
            <p className="text-[#404040] text-base font-semibold mb-1">
              Invoice To :
            </p>
            <h3 className="text-[#404040] text-base font-bold mb-1">
              Austin Miller
            </h3>
            <p className="text-[#565656] text-sm font-semibold">Brookview</p>
          </div>

          {/* Invoice Dates */}
          <div>
            <p className="text-[#404040] text-base font-semibold mb-2">
              Invoice Date : 12 Nov 2019
            </p>
            <p className="text-[#404040] text-base font-semibold">
              Due Date : 25 Dec 2019
            </p>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="overflow-x-auto mb-8">
          <table className="invoice-table w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#F1F4F9] rounded-lg">
                <th className="py-3 px-4 text-[#202224] text-sm font-semibold text-center">
                  Serial No.
                </th>
                <th className="py-3 px-4 text-[#202224] text-sm font-semibold text-center">
                  Description
                </th>
                <th className="py-3 px-4 text-[#202224] text-sm font-semibold text-center">
                  Base Cost
                </th>
                <th className="py-3 px-4 text-[#202224] text-sm font-semibold text-center">
                  Quantity
                </th>
                <th className="py-3 px-4 text-[#202224] text-sm font-semibold text-center">
                  Total Cost
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {invoiceItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-[#E0E0E0] border-opacity-70"
                >
                  <td className="py-4 px-4 text-[#292828] text-sm font-semibold text-center">
                    {item.serialNo}
                  </td>
                  <td className="py-4 px-4 text-[#292828] text-sm font-semibold text-center">
                    {item.description}
                  </td>
                  <td className="py-4 px-4 text-[#292828] text-sm font-semibold text-center">
                    {item.basePrice}
                  </td>
                  <td className="py-4 px-4 text-[#292828] text-sm font-semibold text-center">
                    {item.quantity}
                  </td>
                  <td className="py-4 px-4 text-[#292828] text-sm font-semibold text-center">
                    {item.totalCost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Amount */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center space-x-8">
            <p className="text-base font-extrabold text-[#202224]">Total =</p>
            <p className="text-base font-extrabold text-[#202224]">$4680</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          {/* Print Button */}
          <button className="print-button flex items-center justify-center px-6 py-3 bg-[#FAFBFD] border border-[#D5D5D5] rounded-xl text-[#202224]">
            <FiPrinter className="mr-2" size={18} />
            <span>Print</span>
          </button>

          {/* Send Button */}
          <button className="send-button flex items-center justify-center px-8 py-3 bg-[#4880FF] text-white font-bold rounded-xl">
            <span className="mr-2">Send</span>
            <span className="icon-container bg-[#6E9AFF] w-6 h-6 rounded-lg flex items-center justify-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default InvoicePage;
