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

const SlipSummaryChart = ({ data }) => {
  const labels = [
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
  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Price",
        data: [
          data.January,
          data.February,
          data.March,
          data.April,
          data.May,
          data.June,
          data.July,
          data.August,
          data.September,
          data.October,
          data.November,
          data.December,
        ],
        backgroundColor: "rgba(62, 15, 156, 0.2)",
        borderColor: "rgb(5, 65, 65)",
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
        text: "Total Price per Month",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Price (IDR Rp)",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default SlipSummaryChart;
