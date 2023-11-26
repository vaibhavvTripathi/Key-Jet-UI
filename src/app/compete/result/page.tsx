"use client";
import { CompeteContext } from "@/app/context/CompeteContext";
import { Box, Container, Paper } from "@mui/material";
import React, { useContext } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "@/theme";
import { Typography } from "@mui/material";
import Link from "next/link";

const ResultCompete = () => {
  const { currRoom } = useContext(CompeteContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let winner = currRoom.participants[0];
  console.log("dsds",winner)
  if(!winner) return <Box sx={{textAlign:"center",mt:30}}>
    <h2>Result is not available right now❗</h2>
     Go back to the main page. <Link href={"/"}>Home</Link>
      </Box>
  if(winner && winner.speed<currRoom.participants[1].speed)
  return (
    <>
      <Box
        sx={{
          mt: 5,
          width: "fit-content",
          p: 5,
          mx: "auto",
          border: `1px solid ${colors.greyAccent[500]}`,
          borderRadius: "10px",
        }}
      >
        <Typography variant="h1">🎉 Congratulations !</Typography>
        <Typography variant="h1">🎉 Congratulations !</Typography>
      </Box>
    </>
  );
};

export default ResultCompete;
