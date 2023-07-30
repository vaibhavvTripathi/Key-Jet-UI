"use client";
import Letter, { Color } from "@/models/Letter";
import Word from "@/models/Word";
import { green } from "@mui/material/colors";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { TypeContext } from "./context/TypeContext";
import WordVal from "@/components/WordVal";
import { Box, Typography } from "@mui/material";

const para: string = `In this example, an event listener is added to the window object within the component body. Additionally, the same event listener is also passed as an onClick prop to the <button> element. When the component renders, a new event listener is registered on each render, resulting in multiple event listeners for the same event.`;
export default function Home() {
  const {
    HandleKeyDown,
    UserTypedParagraph,
    DisplayTypedParagraph,
    OriginalParagraph,
  } = useContext(TypeContext);

  useEffect(() => {
    window.addEventListener("keydown", HandleKeyDown);

    return () => {
      window.removeEventListener("keydown", HandleKeyDown);
    };
  }, [UserTypedParagraph]);

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3,mt:10 }}>
        Random Quote
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
        {DisplayTypedParagraph.map((word, index) => {
          return (
            <Box key={index}>
              <WordVal letters={word} />
            </Box>
          );
        })}
      </Box>
    </>
  );
}
