import { useCounter } from "@/utills/useCounter";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Box, Typography } from "@mui/material";

type IntermediateRaceScreenType = {
  timeLeft: number;
};
const IntermediateRaceScreen = ({ timeLeft }: IntermediateRaceScreenType) => {
  const counter = useCounter(timeLeft, 0, -1);
  useEffect(() => {
    toast.success(`👫🏻 Your patner has joined `);
  }, []);
  return (
    <Box sx={{ width: "fit-content", mx: "auto",mt:3 }}>
      <CountdownCircleTimer
        isPlaying
        duration={timeLeft / 1000}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        size={450}
      >
        {renderTime}
      </CountdownCircleTimer>
    </Box>
  );
};

const renderTime = ({ remainingTime }: { remainingTime: number }) => {
  if (remainingTime === 0) {
    return <Typography variant="h1">Good Luck</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h1">Race starts in</Typography>
      <Typography variant="h1">{remainingTime}</Typography>
      <Typography variant="h1">seconds</Typography>
    </Box>
  );
};
export default IntermediateRaceScreen;
