import { ReactNode, createContext, useContext, useState } from "react";
import { TypeContext } from "./TypeContext";
import { Color } from "@/models/Letter";
import { List } from "@mui/material";
import Word from "@/models/Word";

export interface ResultContext {
  results: Result[];
  calculate: (time: number) => void;
}

export const ResultContext = createContext<ResultContext>({
  results: [],
  calculate: (time: number) => {},
});

const ResultProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<Result[]>([]);

  const calculate = (
    time: number,
    DisplayTypedParagraph: Array<Word>,
    OriginalParagraph: Array<Word>
  ) => {
    let green = 0;
    let red = 0;
    let maroon = 0;
    let grey = 0;
    let correctlyTypedChar = 0;
    for (let i = 0; i < DisplayTypedParagraph.length; i++) {
      if (DisplayTypedParagraph[i] === OriginalParagraph[i]) {
        correctlyTypedChar += OriginalParagraph[i].length;
      }
      for (let j = 0; j < DisplayTypedParagraph[i].length; j++) {
        if (DisplayTypedParagraph[i][j].color === Color.GREEN) green++;
        if (DisplayTypedParagraph[i][j].color === Color.RED) red++;
        if (DisplayTypedParagraph[i][j].color === Color.GREY) grey++;
        if (DisplayTypedParagraph[i][j].color === Color.MAROON) maroon++;
      }
    }
    const Wpm = (correctlyTypedChar / (5 * time)) * 60;
    const RawSpeed = ((red + green) / (5 * time)) * 60;
    const CorrectChar = green;
    const ExtraChar = maroon;
    const IncorrectChar = red;
    const MissedChar = grey;
    const Accuracy = (green * 100) / (green + red + grey + maroon);

    const item: Result = {
      time: time,
      wpm: Wpm,
      rawSpeed: RawSpeed,
      correctChar: CorrectChar,
      extraChar: ExtraChar,
      incorrectChar: IncorrectChar,
      missedChar: MissedChar,
      accuracy: Accuracy,
    };
    setResults([...results, item]);
  };

  const ContextValue = {
    results,
    calculate,
  };

  return (
    <ResultContext.Provider value={ContextValue}>
      {children}
    </ResultContext.Provider>
  );
};
