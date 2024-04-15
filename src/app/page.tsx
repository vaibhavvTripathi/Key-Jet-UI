"use client";
import Letter, { Color } from "@/models/Letter";
import Word from "@/models/Word";
import { green } from "@mui/material/colors";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { TypeContext } from "./context/TypeContext";
import WordVal from "@/components/WordVal";
import { Box, Button, Typography } from "@mui/material";
import { ResultContext } from "./context/ResultContext";
import { useRouter } from "next/navigation";
import { ColorModeContext } from "@/theme";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Type from "@/components/Type";
import WaitingForPatnerScreen from "@/components/WaitingForPatnerScreen";
import IntermediateRaceScreen from "@/components/IntermediateRaceScreen";
import CarComponent from "@/components/CarComponent";

export default function Home() {
  const router = useRouter();
  const handleFinishRace = () => {
    router.push("/results");
  };
  const { results } = useContext(ResultContext);
  return (
    <Box sx={{pt:10}}>
      <Type
        handleFinishRace={handleFinishRace}
        initStart={false}
        initialTimeCount={0}
      />
    </Box>
  );
}
