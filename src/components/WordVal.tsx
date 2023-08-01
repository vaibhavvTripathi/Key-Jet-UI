import Letter, { Color } from "@/models/Letter";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const WordVal = ({ letters }: { letters: Array<Letter> }) => {
  const COLOR = new Map<Color, string>();
  COLOR.set(Color.GREY, "grey");
  COLOR.set(Color.GREEN, "green");
  COLOR.set(Color.RED, "red");
  COLOR.set(Color.MAROON,"#EA906C")
  
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {letters.map((letter, index) => {
        return (
          <Typography
            sx={{
              fontFamily: "'Ubuntu', sans-serif",
              
              color: COLOR.get(letter.color),
              borderRight: (letter.isCurrent && letter.color !== Color.GREY) ? "1px solid grey" : "none",
              borderLeft: (letter.isCurrent && letter.color === Color.GREY) ? "1px solid grey" : "none",
              mr:"3px"
            }}
            variant="h5"
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
