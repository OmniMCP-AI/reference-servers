import React, { useState } from "react";
import SummaryCards from "../components/dashboard/SummaryCards";
import SalesDetailsChart from "../components/dashboard/SalesDetailsChart";
import DealsDetailsTable from "../components/dashboard/DealsDetailsTable";
import RevenueChart from "../components/dashboard/RevenueChart";
import CustomersCard from "../components/dashboard/CustomersCard";
import FeaturedProductCard from "../components/dashboard/FeaturedProductCard";
import SalesAnalyticsCard from "../components/dashboard/SalesAnalyticsCard";
import { monthlySalesData } from "../data/dashboardData";
import { monthlyRevenueData } from "../data/dashboardData";

// Import and register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
} from "chart.js";

// Register Chart.js components globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Set global Chart.js defaults
ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;

const Dashboard: React.FC = () => {
  // State for selected month
  const [selectedMonth, setSelectedMonth] = useState<string>("October");

  // State for Revenue chart month
  const [revenueMonth, setRevenueMonth] = useState<string>("October");

  // Chart key state for forcing re-renders when needed
  const [chartsKey, setChartsKey] = useState<number>(0);

  // List of all months for dropdown
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Handle month selection
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    // Force chart re-render by updating key
    setChartsKey((prev) => prev + 1);
  };

  // Handle revenue month change
  const handleRevenueMonthChange = (month: string) => {
    setRevenueMonth(month);
    // Force chart re-render by updating key
    setChartsKey((prev) => prev + 1);
  };

  return (
    <main className="px-8 py-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#202224] -tracking-[0.11px] mb-6">
        Dashboard
      </h1>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Sales Details Chart */}
      <SalesDetailsChart
        key={`sales-chart-${selectedMonth}-${chartsKey}`}
        selectedMonth={selectedMonth}
        handleMonthChange={handleMonthChange}
        months={months}
        monthlySalesData={monthlySalesData}
      />

      {/* Deals Details Table */}
      <DealsDetailsTable />

      {/* Revenue Chart */}
      <RevenueChart
        key={`revenue-chart-${revenueMonth}-${chartsKey}`}
        revenueMonth={revenueMonth}
        setRevenueMonth={handleRevenueMonthChange}
        months={months}
        monthlyRevenueData={monthlyRevenueData}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
        {/* Customers Card */}
        <CustomersCard />

        {/* Featured Product Card */}
        <FeaturedProductCard />

        {/* Sales Analytics Card */}
        <SalesAnalyticsCard />
      </div>
    </main>
  );
};

export default Dashboard;
