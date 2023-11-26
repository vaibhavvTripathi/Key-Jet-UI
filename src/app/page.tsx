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

export default function Home() {
  return (
    <>
      <Type />
    </>
  );
}
