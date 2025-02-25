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

const ChartByBuBar = ({ data }) => {
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
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(245, 248, 248)",
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

export default ChartByBuBar;
