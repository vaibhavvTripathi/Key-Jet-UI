"use client"
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TypeContextProvider from "./context/TypeContext";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TypeContextProvider>
      <html lang="en">
        <body >{children}</body>
      </html>
    </TypeContextProvider>
  );
}
