"use client";
import Letter, { Color } from "@/models/Letter";
import Word from "@/models/Word";
import { green } from "@mui/material/colors";
import { ChangeEvent, useEffect, useState } from "react";

const para: string = `In this example, an event listener is added to the window object within the component body. Additionally, the same event listener is also passed as an onClick prop to the <button> element. When the component renders, a new event listener is registered on each render, resulting in multiple event listeners for the same event.`;
export default function Home() {
  const [userArray, setUserArray] = useState<Array<Array<Letter>>>([[]]);
  console.log(userArray);
  const handleKeyDown = (e: KeyboardEvent) => {
    console.log(`"${e.key}"`);
    const keyInput: string = e.key;
    if (keyInput === " ") {
      const newArray = [...userArray, []];
      setUserArray(newArray);
    } else if (keyInput !== "CapsLock") {
      // console.log(userArray)
      const updatedArray: Array<Array<Letter>> = userArray.map(
        (word, index) => {
          if (index === userArray.length - 1) {
            const letter: Letter = {
              value: keyInput,
              color: Color.GREEN,
              correct: true,
            };

            return [...word, letter];
          }
          return [...word];
        }
      );
      setUserArray(updatedArray);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [userArray]);

  return (
    <>
      <span style={{ color: "red" }}>{para}</span>
    </>
  );
}
