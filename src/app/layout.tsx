"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TypeContextProvider from "./context/TypeContext";
import ResultProvider from "./context/ResultContext";
import { ColorModeContext, useMode } from "@/theme";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import CompetitionProvider from "./context/CompeteContext";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, colorMode] = useMode();
  return (
    <TypeContextProvider>
      <CompetitionProvider>
        <ResultProvider>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <html lang="en">
                <body>
                  <Container>
                    <Navbar />
                    {children}
                  </Container>
                </body>
              </html>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </ResultProvider>
      </CompetitionProvider>
    </TypeContextProvider>
  );
}
