import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { FiChevronDown } from "react-icons/fi";
import { ChartData } from "chart.js";
import { getRevenueChartOptions } from "../../utils/chartUtils";

interface RevenueChartProps {
  revenueMonth: string;
  setRevenueMonth: (month: string) => void;
  months: string[];
  monthlyRevenueData: Record<
    string,
    { salesData: number[]; profitData: number[]; revenue: number[] }
  >;
}

const RevenueChart: React.FC<RevenueChartProps> = ({
  revenueMonth,
  setRevenueMonth,
  months,
  monthlyRevenueData,
}) => {
  // Current month's data
  const currentMonthData = monthlyRevenueData[revenueMonth];

  // Revenue chart data using useMemo for performance
  const revenueData: ChartData<"line"> = useMemo(() => {
    return {
      labels: currentMonthData.revenue.map((q) => `${q}`),
      datasets: [
        {
          label: "Profit",
          data: currentMonthData.profitData,
          borderWidth: 0,
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
              return;
            }
            const gradient = ctx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom
            );
            gradient.addColorStop(0, "rgba(193, 154, 254, 0.8)");
            gradient.addColorStop(1, "rgba(193, 154, 254, 0.1)");
            return gradient;
          },
          fill: true,
        },
        {
          label: "Sales",
          data: currentMonthData.salesData,
          borderWidth: 0,
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
              return;
            }
            const gradient = ctx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom
            );
            gradient.addColorStop(0, "rgba(255, 159, 138, 0.8)");
            gradient.addColorStop(1, "rgba(255, 159, 138, 0.1)");
            return gradient;
          },
          fill: true,
        },
      ],
    };
  }, [currentMonthData]);

  // Get revenue chart options
  const revenueOptions = useMemo(
    () => getRevenueChartOptions(currentMonthData),
    [currentMonthData]
  );

  return (
    <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] p-6 card-hover mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#202224]">Revenue</h2>
        <div className="relative">
          <div
            className="border border-[#D5D5D5] rounded px-3 py-1 flex items-center text-sm text-[rgba(43,48,52,0.4)] cursor-pointer"
            onClick={() =>
              document
                .getElementById("revenueMonthDropdown")
                ?.classList.toggle("hidden")
            }
          >
            <span>{revenueMonth}</span>
            <FiChevronDown className="ml-2" />
          </div>
          <div
            id="revenueMonthDropdown"
            className="absolute right-0 mt-1 bg-white border border-[#D5D5D5] rounded shadow-md z-10 hidden"
          >
            {months.map((month) => (
              <div
                key={month}
                className="px-4 py-2 hover:bg-[#F5F6FA] text-sm cursor-pointer text-[rgba(43,48,52,0.8)]"
                onClick={() => {
                  setRevenueMonth(month);
                  document
                    .getElementById("revenueMonthDropdown")
                    ?.classList.add("hidden");
                }}
              >
                {month}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="h-[250px] relative"
        key={`revenue-chart-container-${revenueMonth}`}
      >
        <Line
          data={revenueData}
          options={revenueOptions}
          className="chart-animation"
          redraw={true}
        />
      </div>

      <div className="flex justify-center mb-4 mt-8 space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#E3B9FF] mr-2"></div>
          <span className="text-[#282D32] font-bold">Profit</span>
        </div>
        <div className="flex items-center pl-8">
          <div className="w-3 h-3 rounded-full bg-[#F9978A] mr-2"></div>
          <span className="text-[#282D32] font-bold">Sales</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RevenueChart);
