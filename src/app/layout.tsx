"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TypeContextProvider from "./context/TypeContext";
import ResultProvider from "./context/ResultContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TypeContextProvider>
      <ResultProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </ResultProvider>
    </TypeContextProvider>
  );
}
