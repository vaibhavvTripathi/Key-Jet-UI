"use client";
import Letter, { Color } from "@/models/Letter";
import Word from "@/models/Word";
import { green } from "@mui/material/colors";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { TypeContext } from "./context/TypeContext";
import WordVal from "@/components/WordVal";
import { Box, Typography } from "@mui/material";
import { ResultContext } from "./context/ResultContext";
import { useRouter } from "next/navigation";

const para: string = `In this example, an event listener is added to the window object within the component body. Additionally, the same event listener is also passed as an onClick prop to the <button> element. When the component renders, a new event listener is registered on each render, resulting in multiple event listeners for the same event.`;
export default function Home() {
  const {
    HandleKeyDown,
    UserTypedParagraph,
    DisplayTypedParagraph,
    OriginalParagraph,
  } = useContext(TypeContext);

  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [timeCount, setTimeCount] = useState<number>(0);
 const router = useRouter();
  const { calculate } = useContext(ResultContext);
 
  useEffect(() => {
    if (!hasStarted) return;
    if(timeCount===30) {
      router.push("/results");
      return;
    }
    const interval = setInterval(() => {
      console.log(timeCount)
      calculate(timeCount, DisplayTypedParagraph);
      setTimeCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [hasStarted,timeCount]);

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
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3, mt: 10 }}>
        Press Any Key to Start
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          flexWrap: "wrap",
          width: "50%",
          mx: "auto",
        }}
      >
        <Typography variant="h5" sx={{ color: "grey", fontWeight: 600 }}>
          {timeCount}
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
