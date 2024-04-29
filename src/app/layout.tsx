"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TypeContextProvider from "./context/TypeContext";
import ResultProvider from "./context/ResultContext";
import { ColorModeContext, useMode } from "@/theme";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "@/components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import CustomizeContextProvider from "./context/CustomizeContext";

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, colorMode] = useMode();
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <CustomizeContextProvider>
        <ThemeProvider theme={theme}>
          <TypeContextProvider>
            <ResultProvider>
              <ColorModeContext.Provider value={colorMode}>
                <CssBaseline />
                <html lang="en">
                  <body>
                    <Container>
                      <Toaster/>
                      <Navbar />
                      {children}
                    </Container>
                  </body>
                </html>
              </ColorModeContext.Provider>
            </ResultProvider>
          </TypeContextProvider>
        </ThemeProvider>
        </CustomizeContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
