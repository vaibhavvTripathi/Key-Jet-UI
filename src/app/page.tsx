"use client";
import Letter, { Color } from "@/models/Letter";
import Word from "@/models/Word";
import { green } from "@mui/material/colors";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { TypeContext } from "./context/TypeContext";
import WordVal from "@/components/WordVal";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { ResultContext } from "./context/ResultContext";
import { useRouter } from "next/navigation";
import { ColorModeContext } from "@/theme";
import RefreshIcon from "@mui/icons-material/Refresh";

const para: string = `become must head into order for should about lead find face stand never man when work day say against plan word time use general few through day up into hand you which there out which open under interest this still move little leave at it where`;
export default function Home() {
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
      router.push("/results");
      return;
    }
    const interval = setInterval(() => {
      console.log(timeCount);
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
          mt: 5,
          mx: "auto",
        }}
      >
        <Typography variant="h3" sx={{ color: "grey", fontWeight: 600 }}>
          {timeCount}
        </Typography>
        <Button variant="outlined" onClick={toggleColorMode}></Button>
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
        <Box sx={{ width: "100%" }}>
          <IconButton sx={{ mx: "auto", display: "block" }}>
            <RefreshIcon />
          </IconButton>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 3,
              color: "text1.main",
              width: "100%",
              
            }}
          >
            Press Any Key to Start
          </Typography>
        </Box>
      </Box>
    </>
  );
}
