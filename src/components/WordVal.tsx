import Letter, { Color } from "@/models/Letter";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const WordVal = ({ letters }: { letters: Array<Letter> }) => {

  const COLOR = new Map<Color, string>();
  COLOR.set(Color.GREY, "text1.main");
  COLOR.set(Color.GREEN, "text1.light");
  COLOR.set(Color.RED, "text2.main");
  COLOR.set(Color.MAROON,"text2.light")
  
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap"}}>
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
            variant="h3"
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
