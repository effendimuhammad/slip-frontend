import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HorizontalBarChart = ({ data }) => {
  const labels = data.map((item) => `${item.partName} (${item.partNumber})`);
  const totalPrices = data.map((item) => item.total_price);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Price",
        data: totalPrices,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(252, 255, 255)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y", // This makes the bar chart horizontal
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to adjust its height
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Price by Part Name and Part Number",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Total Price (IDR Rp)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Part Name (Part Number)",
        },
      },
    },
  };

  // Calculate the height based on the number of data points
  const chartHeight = data.length * 50; // Adjust the multiplier as needed

  return (
    <div style={{ height: chartHeight }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
