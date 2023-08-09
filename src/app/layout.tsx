"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TypeContextProvider from "./context/TypeContext";
import ResultProvider from "./context/ResultContext";
import { ColorModeContext, useMode } from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, colorMode] = useMode();
  return (
    <TypeContextProvider>
      <ResultProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <html lang="en">
              <body>{children}</body>
            </html>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ResultProvider>
    </TypeContextProvider>
  );
}
