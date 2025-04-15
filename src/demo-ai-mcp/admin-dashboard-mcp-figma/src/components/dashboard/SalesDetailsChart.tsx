import React, { useMemo } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { topSalesPlugin, getSalesChartOptions } from "../../utils/chartUtils";

interface SalesDetailsChartProps {
  selectedMonth: string;
  handleMonthChange: (month: string) => void;
  months: string[];
  monthlySalesData: Record<string, { values: number[]; quantities: number[] }>;
}

const SalesDetailsChart: React.FC<SalesDetailsChartProps> = ({
  selectedMonth,
  handleMonthChange,
  months,
  monthlySalesData,
}) => {
  // Current month's data
  const currentMonthData = monthlySalesData[selectedMonth];

  // Chart data configuration using useMemo for performance
  const salesChartData: ChartData<"line"> = useMemo(() => {
    return {
      labels: currentMonthData.quantities.map((q) => `${q}`),
      datasets: [
        {
          label: "Sales %",
          data: currentMonthData.values,
          borderColor: "#4379EE",
          borderWidth: 1.5,
          pointBackgroundColor: "#4379EE",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
          fill: true,
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 250);
            gradient.addColorStop(0, "rgba(67, 121, 238, 0.16)");
            gradient.addColorStop(1, "rgba(255, 255, 255, 0.18)");
            return gradient;
          },
        },
      ],
    };
  }, [currentMonthData]);

  // Get chart options
  const salesChartOptions = useMemo(() => {
    return getSalesChartOptions(currentMonthData);
  }, [currentMonthData]);

  return (
    <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] p-6 card-hover">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#202224]">Sales Details</h2>
        <div className="relative">
          <div
            className="border border-[#D5D5D5] rounded px-3 py-1 flex items-center text-sm text-[rgba(43,48,52,0.4)] cursor-pointer"
            onClick={() =>
              document
                .getElementById("monthDropdown")
                ?.classList.toggle("hidden")
            }
          >
            <span>{selectedMonth}</span>
            <FiChevronDown className="ml-2" />
          </div>
          <div
            id="monthDropdown"
            className="absolute right-0 mt-1 bg-white border border-[#D5D5D5] rounded shadow-md z-10 hidden"
          >
            {months.map((month) => (
              <div
                key={month}
                className="px-4 py-2 hover:bg-[#F5F6FA] text-sm cursor-pointer text-[rgba(43,48,52,0.8)]"
                onClick={() => {
                  handleMonthChange(month);
                  document
                    .getElementById("monthDropdown")
                    ?.classList.add("hidden");
                }}
              >
                {month}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Implementation */}
      <div
        className="h-[300px] relative"
        key={`chart-container-${selectedMonth}`}
      >
        <Line
          data={salesChartData}
          options={salesChartOptions}
          plugins={[topSalesPlugin]}
          className="chart-animation"
          redraw={true}
        />
      </div>
    </div>
  );
};

export default React.memo(SalesDetailsChart);
