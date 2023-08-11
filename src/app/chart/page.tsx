"use client";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  LineElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Button, Container } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  PointElement,
  LineElement
);

// return <Bar options={options} data={data} />;
const Page = () => {
  const [arr, setArr] = useState([
    {
      participantID: "P2",
      time: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
      ],
      correctWords: [
        1, 1, 1, 2, 3, 4, 5, 6, 8, 9
      ],
    },
    {
      participantID: "P3",
      time: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      ],
      correctWords: [
        1, 1, 2, 3, 4, 5, 6, 7, 8, 9
      ],
    },
    {
      participantID: "P4",
      time: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      ],
      correctWords: [
        1, 1, 2, 3, 4, 6, 8, 10, 12, 14
      ],
    },
    {
      participantID: "P5",
      time: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      ],
      correctWords: [
        1, 1, 2, 3, 5, 7, 10, 13, 16, 20
      ],
    },
  ]);
  const options = {
    responsive: true,
    animation: {
      duration: 600,
      easing: 'easeOutSine',
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  const data = {
    labels: arr[0].time,
    datasets: arr.map((dataset) => ({
      label: dataset.participantID,
      data: dataset.correctWords,
      backgroundColor: "white",
      borderColor: "gray",
    })),
  };

  const handle = () => {
    const newArr = arr.map(data => {
      const correctWords = [...data.correctWords, data.correctWords[data.correctWords.length - 1] + Math.floor(Math.random() * 10) + 1]
      const time = [...data.time, data.time[data.time.length - 1] + 1];
      return {...data, correctWords: correctWords, time: time }
    });
    console.log(newArr);
    setArr(newArr);
  }

  return (
    <Container>
      <div>page</div>
      <Container>
        <Chart type="line" options={options} data={data}/>
      </Container>
      <Button variant="contained" onClick={handle}>Click Me</Button>
    </Container>
  );
}

export default Page;