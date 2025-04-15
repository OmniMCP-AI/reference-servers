import { ChartOptions, Plugin } from "chart.js";
import { TooltipItem } from "chart.js";

// Add a custom plugin for the top sales indicator
export const topSalesPlugin: Plugin<"line"> = {
  id: "topSales",
  afterDraw: (chart) => {
    const { ctx, scales } = chart;
    const dataset = chart.data.datasets[0];
    if (!dataset || !dataset.data) return;

    const data = dataset.data as number[];
    const maxValue = Math.max(...data);
    const maxIndex = data.indexOf(maxValue);

    // Check if we have valid data
    if (maxIndex === -1) return;

    const xScale = scales.x;
    const yScale = scales.y;
    if (!xScale || !yScale) return;

    const x = xScale.getPixelForValue(maxIndex);
    const y = yScale.getPixelForValue(maxValue);

    // Draw a larger point at the max value
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "#4880FF";
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  },
};

// Sales chart options configuration
export const getSalesChartOptions = (currentMonthData: {
  quantities: number[];
}): ChartOptions<"line"> => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#5E77FF",
        titleFont: {
          family: "Nunito Sans",
          size: 12,
          weight: "bold",
        },
        bodyFont: {
          family: "Nunito Sans",
          size: 12,
          weight: "bold",
        },
        padding: 10,
        displayColors: false,
        callbacks: {
          title: function (tooltipItems) {
            return `Sales: ${tooltipItems[0].label}`;
          },
          label: function (context: TooltipItem<"line">) {
            return `${context.parsed.y}%`;
          },
        },
        // Add custom tooltip styling
        titleMarginBottom: 6,
        cornerRadius: 4,
        caretSize: 6,
      },
    },
    animation: {
      duration: 2000,
      easing: "easeOutQuart",
      delay: (context) => {
        return context.dataIndex * 100;
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(43, 48, 52, 0.4)",
          font: {
            family: "Nunito Sans",
            size: 12,
            weight: "bold",
          },
          callback: function (_value, index) {
            // Show fewer labels to avoid crowding
            return index % 2 === 0 ? currentMonthData.quantities[index] : "";
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        position: "left",
        grid: {
          color: "#EAEAEA",
          lineWidth: 1,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "rgba(43, 48, 52, 0.4)",
          font: {
            family: "Nunito Sans",
            size: 12,
            weight: "bold",
          },
          callback: function (value) {
            if (typeof value === "number") {
              return `${value}%`;
            }
            return value;
          },
          padding: 10,
        },
        min: 20,
        max: 100,
      },
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    elements: {
      point: {
        hitRadius: 10,
      },
    },
  };
};

// Revenue chart options
export const getRevenueChartOptions = (currentMonthData: {
  revenue: number[];
}): ChartOptions<"line"> => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "#9CA3AF",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#f0f0f0",
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 12,
          },
          callback: function (_value, index) {
            // Show fewer labels to avoid crowding
            return index % 2 === 0 ? currentMonthData.revenue[index] : "";
          },
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // We'll create our own legend
      },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#4B5563",
        bodyColor: "#4B5563",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 4,
        displayColors: true,
        boxPadding: 4,
        callbacks: {
          labelColor: function (context) {
            const colors = ["#FF7A5C", "#A370F7"];
            return {
              backgroundColor: colors[context.datasetIndex],
              borderColor: colors[context.datasetIndex],
            };
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Makes the line curved
      },
      point: {
        radius: 0, // Hide points
        hoverRadius: 6, // Show on hover
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };
};

// Sales Analytics options
export const getSalesAnalyticsOptions = (): ChartOptions<"line"> => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 25,
          color: "#9CA3AF",
          font: {
            size: 12,
          },
          padding: 10,
        },
        grid: {
          color: "#F3F4F6",
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 12,
          },
          maxRotation: 0,
          padding: 10,
          callback: function (val: string | number) {
            // Only display full years, not half years
            const label = this.getLabelForValue(Number(val));
            return label.includes(".5") ? "" : label;
          },
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#1F2937",
        bodyColor: "#4B5563",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 6,
        displayColors: true,
        boxPadding: 6,
        callbacks: {
          title: function (tooltipItems) {
            return tooltipItems[0].label.includes(".5")
              ? `Mid ${Math.floor(parseFloat(tooltipItems[0].label))}`
              : tooltipItems[0].label;
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  };
};
