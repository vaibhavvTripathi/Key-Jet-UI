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
  wpm: Array<number>;
  raw: Array<number>;
  time: Array<number>;
};
export default function SimpleLineChart(props: Props) {
  const wpm = props.wpm;
  const raw = props.raw;
  const time = props.time;

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
          text: 'time'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'words per minute'
        }
      }
    }
  };

  const labels = time;
  const data = {
    labels,
    datasets: [
      {
        label: "wpm",
        data: wpm,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "raw",
        data: raw,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <>
      {/* <Paper
        elevation={2}
        style={{
          backgroundColor: "transparent",
          padding: "1em",
          margin: "auto",
          position: "relative",
        }}
      > */}
      <Line options={options} data={data} />
      {/* </Paper> */}
    </>
  );
}
