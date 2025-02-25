import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SlipSummaryDoughnutChart = ({ data }) => {
  if (!Array.isArray(data)) {
    return null; // Pastikan data adalah array sebelum melanjutkan
  }

  const labels = data.map((item) => item.bu_name || "Unknown");

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Price",
        data: data.map((item) => item.Total_Price || 0),
        backgroundColor: [
          "rgba(206, 14, 56, 0.8)",
          "rgba(16, 133, 211, 0.8)",
          "rgba(235, 174, 22, 0.8)",
          "rgba(14, 163, 163, 0.8)",
          "rgba(59, 14, 148, 0.8)",
          "rgba(238, 138, 39, 0.8)",
          "rgba(199, 199, 199, 0.8)",
          "rgba(83, 102, 255, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)",
          "rgba(83, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Price by BU Name",
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default SlipSummaryDoughnutChart;
