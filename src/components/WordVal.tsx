import Letter, { Color } from "@/models/Letter";
import { Box, Typography } from "@mui/material";
import React from "react";

const WordVal = ({ letters }: { letters: Array<Letter> }) => {
  const COLOR = new Map<Color, string>();
  COLOR.set(Color.BLUE, "grey");
  COLOR.set(Color.GREEN, "green");
  COLOR.set(Color.RED, "red");
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {letters.map((letter, index) => {
        return (
          <Typography
            sx={{
              color: COLOR.get(letter.color),
              textDecoration: letter.isCurrent ? "underline" : "none",
            }}
            variant="h6"
            key={index}
          >
            {letter.value}
          </Typography>
        );
      })}
    </Box>
  );
};

export default WordVal;
