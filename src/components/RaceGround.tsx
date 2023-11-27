/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ResultContext } from "@/app/context/ResultContext";
import { TypeContext } from "@/app/context/TypeContext";
import { ColorModeContext } from "@/theme";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import WordVal from "./WordVal";
import { CompeteContext } from "@/app/context/CompeteContext";
import RealtimePlayerUpdates from "./RealtimePlayerUpdates";

function RaceGround() {
  const { currRoom, handleRaceData, raceStarted, endRace } =
    useContext(CompeteContext);
  const { calculate } = useContext(ResultContext);
  const {
    HandleKeyDown,
    UserTypedParagraph,
    DisplayTypedParagraph,
    OriginalParagraph,
  } = useContext(TypeContext);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [prevTimeCount, setPrevTimeCount] = useState<number>(10);
  const [timeCount, setTimeCount] = useState<number>(0);
  //   const router = useRouter();
  //   const { calculate } = useContext(ResultContext);

  useEffect(() => {
    if (!hasStarted) return;
    if (timeCount === 30) {
      endRace();
      return;
    }
    const interval = setInterval(() => {
      handleRaceData(timeCount, DisplayTypedParagraph);

      calculate(timeCount, DisplayTypedParagraph);
      setTimeCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [hasStarted, timeCount]);

  const handleKeyStroke = (e: KeyboardEvent) => {
    if (!hasStarted) return;
    HandleKeyDown(e);
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyStroke);

    return () => {
      return window.removeEventListener("keydown", handleKeyStroke);
    };
  }, [UserTypedParagraph, hasStarted]);

  useEffect(() => {
    if (currRoom.total_participants !== 2) return;
    if (prevTimeCount <= 0) {
      setHasStarted(true);
      return;
    }
    console.log(prevTimeCount);
    const interval = setInterval(() => {
      setPrevTimeCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [currRoom, prevTimeCount]);

  console.log(currRoom);
  return (
    <>
      <RealtimePlayerUpdates timeCount={timeCount} />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          flexWrap: "wrap",
          width: "70%",
          mx: "auto",
        }}
      >
        <Typography variant="h5" sx={{ color: "grey", fontWeight: 600 }}>
          {prevTimeCount}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {DisplayTypedParagraph.map((word, index) => {
            return (
              <Box key={index}>
                <WordVal letters={word} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default RaceGround;
