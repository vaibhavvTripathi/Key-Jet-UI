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
import CompeteGraph from "@/components/CompeteGraph";

const para: string = `become must head into order for should about lead find face stand never man when work day say against plan word time use general few through day up into hand you which there out which open under interest this still move little leave at it where`;
export default function Home() {
  

  return (
    <>
      <Type />
    </>
  );
}
