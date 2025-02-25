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

const ChartBarTumpuk = ({ data }) => {
  console.log("data", data);

  if (!data || data.length === 0) {
    return <p>No data available ...</p>;
  }

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

  const colors = [
    "rgb(255, 99, 132)",
    "rgb(235, 54, 226)",
    "rgb(75, 192, 192)",
    "rgb(153, 102, 255)",
    "rgb(255, 159, 64)",
    "rgb(199, 199, 199)",
    "rgb(83, 102, 255)",
    "rgb(255, 99, 132)",
    "rgb(154, 27, 228)",
    "rgb(255, 206, 86)",
    "rgb(75, 192, 192)",
    "rgb(153, 102, 255)",
    "rgb(255, 159, 64)",
    "rgb(199, 199, 199)",
    "rgb(83, 102, 255)",
    "rgb(255, 99, 132)",
    "rgb(44, 136, 143)",
    "rgb(255, 206, 86)",
    "rgb(240, 197, 106)",
    "rgb(153, 102, 255)",
    "rgb(255, 159, 64)",
    "rgb(199, 199, 199)",
    "rgb(83, 102, 255)",
    "rgb(255, 99, 132)",
    "rgb(54, 235, 63)",
    "rgb(255, 206, 86)",
    "rgb(175, 231, 111)",
    "rgb(255, 87, 34)",
    "rgb(63, 81, 181)",
    "rgb(0, 150, 136)",
    "rgb(255, 193, 7)",
    "rgb(233, 30, 99)",
    "rgb(156, 39, 176)",
    "rgb(3, 169, 244)",
    "rgb(0, 188, 212)",
    "rgb(139, 195, 74)",
    "rgb(205, 220, 57)",
    "rgb(96, 125, 139)",
    "rgb(255, 235, 59)",
    "rgb(121, 85, 72)",
    "rgb(158, 158, 158)",
    "rgb(103, 58, 183)",
    "rgb(33, 150, 243)",
    "rgb(0, 191, 165)",
    "rgb(255, 152, 0)",
    "rgb(244, 67, 54)",
    "rgb(76, 175, 80)",
    "rgb(255, 87, 34)",
    "rgb(63, 81, 181)",
    "rgb(0, 150, 136)",
    "rgb(255, 193, 7)",
    "rgb(233, 30, 99)",
    "rgb(156, 39, 176)",
    "rgb(3, 169, 244)",
    "rgb(0, 188, 212)",
    "rgb(139, 195, 74)",
    "rgb(205, 220, 57)",
    "rgb(96, 125, 139)",
    "rgb(255, 235, 59)",
    "rgb(121, 85, 72)",
    "rgb(158, 158, 158)",
    "rgb(103, 58, 183)",
    "rgb(33, 150, 243)",
    "rgb(0, 191, 165)",
    "rgb(255, 152, 0)",
    "rgb(244, 67, 54)",
    "rgb(76, 175, 80)",
  ];

  const chartData = {
    labels,
    datasets: data.map((item, index) => ({
      label: `${item.partName} (${item.partNumber})`,
      data: [
        item.January,
        item.February,
        item.March,
        item.April,
        item.May,
        item.June,
        item.July,
        item.August,
        item.September,
        item.October,
        item.November,
        item.December,
      ],
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length],
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Price per Month by Part",
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Total Price (IDR Rp)",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ChartBarTumpuk;
