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
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
  ];
  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Price",
        data: [
          data.April,
          data.May,
          data.June,
          data.July,
          data.August,
          data.September,
          data.October,
          data.November,
          data.December,
          data.January,
          data.February,
          data.March,
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
  };

  return <Bar data={chartData} options={options} />;
};

export default SlipSummaryChart;
