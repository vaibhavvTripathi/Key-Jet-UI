import { ReactNode, createContext, useContext, useState } from "react";
import { TypeContext } from "./TypeContext";
import { Color } from "@/models/Letter";
import { List } from "@mui/material";
import Word from "@/models/Word";
import io from "socket.io-client";

export interface CompeteContext {
  results: Result[];
  calculate: (time: number, DisplayTypeParagraph: Array<Word>) => void;
}

const socket = io("http://localhost:8000");

export const CompeteContext = createContext<CompeteContext>({
  results: [],
  calculate: (time: number, DisplayTypeParagraph: Array<Word>) => {},
});

const CompetitionProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<Result[]>([]);

  const createRoom = () => {
    socket.emit("create_room", {
      userId: sessionStorage.getItem("userId"),
    });
  };

  const joinRoom = () => {
    socket.emit("join_room", {
      roomId: sessionStorage.getItem("roomId"),
      userId: sessionStorage.getItem("userId"),
    });
  };

  socket.on("get_room_id", (data) => {
    sessionStorage.setItem("roomId", data.id);
  });

  socket.on("handle_error", (data) => {
    alert(data.message);
  });

  const calculate = (time: number, DisplayTypedParagraph: Array<Word>) => {
    let green = 0;
    let red = 0;
    let maroon = 0;
    let grey = 0;
    let correctlyTypedChar = 0;

    for (const word of DisplayTypedParagraph) {
      let flag = true;
      let greenCount = 0;
      for (const char of word) {
        if (char.isCurrent) {
          flag = false;
          break;
        }
        switch (char.color) {
          case Color.GREEN:
            green++;
            greenCount++;
            break;
          case Color.RED:
            red++;
            break;
          case Color.GREY:
            grey++;
            break;
          case Color.MAROON:
            maroon++;
            break;
          default:
            break;
        }
      }
      if (flag && greenCount === word.length) {
        correctlyTypedChar += word.length;
        correctlyTypedChar++;
        green++;
      }
    }
    const Wpm = Math.round((correctlyTypedChar / (5 * time)) * 60);
    const RawSpeed = Math.round(((red + green) / (5 * time)) * 60);
    const CorrectChar = green;
    const ExtraChar = maroon;
    const IncorrectChar = red;
    const MissedChar = grey;
    const Accuracy = Math.round((green * 100) / (green + red + grey + maroon));

    const item = {
      time: time,
      wpm: Wpm,
      rawSpeed: RawSpeed,
      correctChar: CorrectChar,
      extraChar: ExtraChar,
      incorrectChar: IncorrectChar,
      missedChar: MissedChar,
      accuracy: Accuracy,
    roomId : sessionStorage.getItem("roomId"),
    userId : sessionStorage.getItem("userId")
    };
    socket.emit("get_race_data", item);
  };

  const ContextValue = {
    results,
    calculate,
  };

  return (
    <CompeteContext.Provider value={ContextValue}>
      {children}
    </CompeteContext.Provider>
  );
};

export default CompetitionProvider;
