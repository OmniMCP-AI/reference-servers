import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { getSalesAnalyticsOptions } from "../../utils/chartUtils";
import { years, blueLineData, greenLineData } from "../../data/dashboardData";

const SalesAnalyticsCard: React.FC = () => {
  // Sales Analytics data
  const salesAnalyticsData: ChartData<"line"> = useMemo(() => {
    return {
      labels: years,
      datasets: [
        {
          label: "Data 1",
          data: blueLineData,
          borderColor: "#3B82F6", // Blue line
          backgroundColor: "transparent",
          tension: 0.4, // Curve smoothness
          pointRadius: 4,
          pointBackgroundColor: "#3B82F6",
          pointBorderColor: "white",
          pointBorderWidth: 2,
        },
        {
          label: "Data 2",
          data: greenLineData,
          borderColor: "#10B981", // Green line
          backgroundColor: "transparent",
          tension: 0.4, // Curve smoothness
          pointRadius: 4,
          pointBackgroundColor: "#10B981",
          pointBorderColor: "white",
          pointBorderWidth: 2,
        },
      ],
    };
  }, []);

  // Get sales analytics options
  const salesAnalyticsOptions = useMemo(() => getSalesAnalyticsOptions(), []);

  return (
    <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] p-6 card-hover">
      <h2 className="text-2xl font-bold text-[#202224] mb-6">
        Sales Analytics
      </h2>

      <div className="h-[250px] relative" key="sales-analytics-container">
        <Line
          data={salesAnalyticsData}
          options={salesAnalyticsOptions}
          className="chart-animation"
          redraw={true}
        />
      </div>
    </div>
  );
};

export default React.memo(SalesAnalyticsCard);
