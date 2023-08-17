"use client";
import { Compete } from "@/models/competeModel";
import { Button, Container, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "chartjs-plugin-annotation";
import CarPic from "../../Images/CarPic.png";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ColorModeContext, tokens } from "@/theme";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function CompeteGraph() {
  const { mode } = useContext(ColorModeContext);
  const colors = tokens(mode);
  const [mockData, setMockData] = useState({
    roomId: "room123",
    raceData: [
      {
        userId: "user1",
        username: "Alice",
        result: {
          time: 120,
          rawSpeed: 300,
          wpm: 0,
          accuracy: 95,
          correctChar: 300,
          incorrectChar: 15,
          extraChar: 5,
          missedChar: 0,
        },
      },
      {
        userId: "user2",
        username: "Bob",
        result: {
          time: 150,
          rawSpeed: 250,
          wpm: 0,
          accuracy: 90,
          correctChar: 250,
          incorrectChar: 25,
          extraChar: 2,
          missedChar: 10,
        },
      },
      {
        userId: "user3",
        username: "Charlie",
        result: {
          time: 180,
          rawSpeed: 200,
          wpm: 0,
          accuracy: 85,
          correctChar: 200,
          incorrectChar: 30,
          extraChar: 10,
          missedChar: 5,
        },
      },
      {
        userId: "user4",
        username: "Yash",
        result: {
          time: 180,
          rawSpeed: 200,
          wpm: 0,
          accuracy: 85,
          correctChar: 200,
          incorrectChar: 30,
          extraChar: 10,
          missedChar: 5,
        },
      },
      {
        userId: "user5",
        username: "A.",
        result: {
          time: 180,
          rawSpeed: 200,
          wpm: 0,
          accuracy: 85,
          correctChar: 200,
          incorrectChar: 30,
          extraChar: 10,
          missedChar: 5,
        },
      },
    ],
  });

  const handleIncrementSpeed = () => {
    console.log(mode);

    const updatedRaceData = mockData.raceData.map((user) => {
      const randomIncrement = Math.floor(Math.random() * 10) + 1; // Generate a random increment between 1 and 10
      return {
        ...user,
        result: {
          ...user.result,
          wpm: user.result.wpm + randomIncrement,
        },
      };
    });

    setMockData({
      ...mockData,
      raceData: updatedRaceData,
    });
    console.log(mockData);
  };
  const players = mockData.raceData.map((player) => ({
    username: player.username,
    correctWords: player.result.wpm,
  }));

  const labels = players.map((player) => player.username);
  const data = players.map((player) => player.correctWords);

  const options = {
    indexAxis: "y" as const,
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        min: 0,
        max: 150,
        ticks: {
          // forces step size to be 50 units
          stepSize: 5,
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
        barThickness: 0.2,
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Race",
      },
    },
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Correct Words",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container sx={{ marginTop: "20px", textAlign: "center" }}>
      <Container
        // elevation={2}
        style={{
          padding: "1em",
          margin: "auto",
          position: "relative",
          height: "20em",
          maxWidth: "65em",
          backgroundColor: colors.greyAccent[900],
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        }}
      >
        <Bar data={chartData} options={options} />
      </Container>
      <Button
        sx={{ margin: "1em" }}
        variant="contained"
        onClick={handleIncrementSpeed}
      >
        Increment Speed
      </Button>
    </Container>
  );
}

export default CompeteGraph;
