"use client";
import * as React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { LineChart } from "@mui/x-charts/LineChart";
import { Paper } from "@mui/material";
type Props = {
  line1: { val: Array<number>; label: string };
  line2: { val: Array<number>; label: string };
  x: { val: Array<number>; label: string };
  y: string
};
export default function SimpleLineChart(props: Props) {
  const line1 = props.line1.val;
  const line2 = props.line2.val;
  const x = props.x.val;
  const y = props.y;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: props.x.label,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: y,
        },
      },
    },
  };

  const labels = x;
  const data = {
    labels,
    datasets: [
      {
        label: props.line1.label,
        data: line1,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: props.line2.label,
        data: line2,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
}
