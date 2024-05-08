/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ResultContext } from "@/app/context/ResultContext";
import { TypeContext } from "@/app/context/TypeContext";
import { ColorModeContext } from "@/theme";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { use, useContext, useEffect, useState } from "react";
import WordVal from "./WordVal";
import { CustomizeContext } from "@/app/context/CustomizeContext";
import useKeyPressSound from "@/hooks/customizeHooks";

type TypePropsType = {
  handleFinishRace: () => void;
  initialTimeCount: number;
  initStart: boolean;
  allowToFinish?: boolean;
};
function Type({
  handleFinishRace,
  initialTimeCount,
  initStart,
  allowToFinish
}: TypePropsType) {
  const {
    HandleKeyDown,
    UserTypedParagraph,
    DisplayTypedParagraph,
    OriginalParagraph,
  } = useContext(TypeContext);

  const [hasStarted, setHasStarted] = useState<boolean>(initStart);
  const [timeCount, setTimeCount] = useState<number>(initialTimeCount);
  const router = useRouter();
  const { calculate } = useContext(ResultContext);

  const { customization } = useContext(CustomizeContext);
  useKeyPressSound(customization);

  useEffect(() => {
    if (!hasStarted) return;

    if (
      timeCount === 30 ||
      (UserTypedParagraph.length > OriginalParagraph.length && !allowToFinish)
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
        }}
      >
        {hasStarted && (
          <Typography variant="h5" sx={{ color: "grey", fontWeight: 600 }}>
            {30 - timeCount}
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

      {!hasStarted && (
        <Typography variant="h4" sx={{ textAlign: "center", mb: 3, mt: 10 }}>
          Press Any Key to Start
        </Typography>
      )}
    </>
  );
}

export default Type;
