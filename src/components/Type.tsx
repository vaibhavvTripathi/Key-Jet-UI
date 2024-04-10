/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ResultContext } from "@/app/context/ResultContext";
import { TypeContext } from "@/app/context/TypeContext";
import { ColorModeContext } from "@/theme";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import WordVal from "./WordVal";

type TypePropsType = {
  handleFinishRace: () => void;
};
function Type({ handleFinishRace }: TypePropsType) {
  const {
    HandleKeyDown,
    UserTypedParagraph,
    DisplayTypedParagraph,
    OriginalParagraph,
  } = useContext(TypeContext);

  const { toggleColorMode } = useContext(ColorModeContext);

  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [timeCount, setTimeCount] = useState<number>(0);
  const router = useRouter();
  const { calculate } = useContext(ResultContext);

  useEffect(() => {
    if (!hasStarted) return;

    if (
      timeCount === 30 ||
      UserTypedParagraph.length > OriginalParagraph.length
    ) {
      handleFinishRace();
      return;
    }
    const interval = setInterval(() => {
      calculate(timeCount, DisplayTypedParagraph);
      setTimeCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [hasStarted, timeCount]);

  const handleKeyStroke = (e: KeyboardEvent) => {
    if (hasStarted === false) setHasStarted(true);

    HandleKeyDown(e);
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyStroke);

    return () => {
      return window.removeEventListener("keydown", handleKeyStroke);
    };
  }, [UserTypedParagraph]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          flexWrap: "wrap",
          width: "70%",
          mx: "auto",
          mt: 15,
        }}
      >
        {hasStarted && (
          <Typography variant="h5" sx={{ color: "grey", fontWeight: 600 }}>
            {timeCount}
          </Typography>
        )}

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

      {UserTypedParagraph[0].length === 0 && (
        <Typography variant="h4" sx={{ textAlign: "center", mb: 3, mt: 10 }}>
          Press Any Key to Start
        </Typography>
      )}
    </>
  );
}

export default Type;
