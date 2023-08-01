"use client";
import Letter, { Color } from "@/models/Letter";
import Word from "@/models/Word";
import { green } from "@mui/material/colors";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { TypeContext } from "./context/TypeContext";

const para: string = `In this example, an event listener is added to the window object within the component body. Additionally, the same event listener is also passed as an onClick prop to the <button> element. When the component renders, a new event listener is registered on each render, resulting in multiple event listeners for the same event.`;
export default function Home() {
  const { HandleKeyDown, UserTypedParagraph } = useContext(TypeContext);
  useEffect(() => {
    window.addEventListener("keydown", HandleKeyDown);

    return () => {
      window.removeEventListener("keydown", HandleKeyDown);
    };
  }, [UserTypedParagraph]);

  return (
    <>
      <span style={{ color: "red" }}>{para}</span>
    </>
  );
}
