import React from "react";
import { FiFilter, FiChevronDown } from "react-icons/fi";

// Import chart images
import barChart1Svg from "../assets/images/charts/barChart/Bar1.png";
import barChart2Svg from "../assets/images/charts/barChart/Bar2.png";
import barChart3Svg from "../assets/images/charts/barChart/Bar3.png";
import barChart4Svg from "../assets/images/charts/barChart/Bar4.png";
import pieChart1Svg from "../assets/images/charts/pieChart/Pie1.png";
import pieChart2Svg from "../assets/images/charts/pieChart/Pie2.png";
import pieChart3Svg from "../assets/images/charts/pieChart/Pie3.png";
import pieChart4Svg from "../assets/images/charts/pieChart/Pie4.png";
import donutChart1Svg from "../assets/images/charts/donutChart/donutChart1.png";
import donutChart2Svg from "../assets/images/charts/donutChart/donutChart2.png";
import donutChart3Svg from "../assets/images/charts/donutChart/donutChart3.png";
import donutChart4Svg from "../assets/images/charts/donutChart/donutChart4.png";

const ElementsUI: React.FC = () => {
  return (
    <div className="p-6 bg-[#F5F6FA]">
      {/* UI Elements Header */}
      <h1 className="text-3xl font-bold text-[#202224] -tracking-[0.11px] mb-6">
        UI Elements
      </h1>

      {/* Filter Component */}
      <div className="bg-[#F9F9FB] rounded-[14px] border border-[#D5D5D5] p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FiFilter className="mr-2" />
            <span className="text-[#202224] font-bold">Filter By</span>
          </div>
          <div className="flex items-center">
            <span className="text-[#202224] font-bold mr-2">Charts</span>
            <FiChevronDown />
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-[14px] shadow-md p-6 card-hover">
        <h2 className="text-2xl font-bold text-[#202224] mb-6 opacity-90">
          Bar Chart
        </h2>
        <div className="flex justify-center">
          <img src={barChart1Svg} alt="Bar Chart" className="w-full h-auto" />
          <img src={barChart2Svg} alt="Bar Chart" className="w-full h-auto" />
          <img src={barChart3Svg} alt="Bar Chart" className="w-full h-auto" />
          <img src={barChart4Svg} alt="Bar Chart" className="w-full h-auto" />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-[14px] shadow-md p-6 card-hover">
        <h2 className="text-2xl font-bold text-[#202224] mb-6 opacity-90">
          Pie Chart
        </h2>
        <div className="flex justify-center">
          <img src={pieChart1Svg} alt="Pie Chart" className="w-full h-auto" />
          <img src={pieChart2Svg} alt="Pie Chart" className="w-full h-auto" />
          <img src={pieChart3Svg} alt="Pie Chart" className="w-full h-auto" />
          <img src={pieChart4Svg} alt="Pie Chart" className="w-full h-auto" />
        </div>
      </div>

      {/* Donut Chart */}
      <div className="bg-white rounded-[14px] shadow-md p-6 card-hover">
        <h2 className="text-2xl font-bold text-[#202224] mb-6 opacity-90">
          Donut Chart
        </h2>
        <div className="flex justify-center">
          <img
            src={donutChart1Svg}
            alt="Donut Chart1"
            className="w-full h-auto"
          />
          <img
            src={donutChart2Svg}
            alt="Donut Chart2"
            className="w-full h-auto"
          />
          <img
            src={donutChart3Svg}
            alt="Donut Chart3"
            className="w-full h-auto"
          />
          <img
            src={donutChart4Svg}
            alt="Donut Chart4"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ElementsUI;
