import { ReactNode, createContext, useContext, useState } from "react";
import { TypeContext } from "./TypeContext";
import { Color } from "@/models/Letter";

export interface ResultContext {
    timeControl: number;
    rawSpeed : number;
    wpm : number;
    accuracy : number;
    correctChar : number;
    incorrectChar : number;
    extraChar : number;
    missedChar : number;
}

export const ResultContext = createContext<ResultContext>({
    timeControl : 0,
    rawSpeed : 0,
    wpm : 0,
    accuracy : 0,
    correctChar : 0,
    incorrectChar : 0,
    extraChar : 0,
    missedChar : 0
});

const ResultProvider = ({children} : {children : ReactNode}) => {
    const [timeControl, setTimecontrol] = useState(0);
    const [rawSpeed, setRawSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [correctChar, setCorrectChar] = useState(0);
    const [incorrectChar, setIncorrectChar] = useState(0);
    const [extraChar, setExtraChar] = useState(0);
    const [missedChar, setMissedChar] = useState(0);

    const [wpm, setWpm] = useState(0);

    const {OriginalParagraph, UserTypedParagraph, DisplayTypedParagraph} = useContext(TypeContext);
    
    let green = 0;
    let red = 0;
    let maroon = 0;
    let grey = 0;
    let correctlyTypedChar = 0;
    for(let i = 0; i < DisplayTypedParagraph.length; i++) {
        if(DisplayTypedParagraph[i] === OriginalParagraph[i]) {
            correctlyTypedChar += OriginalParagraph[i].length;
        }
        for(let j = 0; j < DisplayTypedParagraph[i].length; j++) {
            if(DisplayTypedParagraph[i][j].color === Color.GREEN) green++;
            if(DisplayTypedParagraph[i][j].color === Color.RED) red++;
            if(DisplayTypedParagraph[i][j].color === Color.GREY) grey++; 
            if(DisplayTypedParagraph[i][j].color === Color.MAROON) maroon++;
        }
    }

    const speed = (correctlyTypedChar / (5 * timeControl)) * 60;
    setWpm(speed);
    const speed_ = ((red + green)/ (5 * timeControl)) * 60;
    setRawSpeed(speed_);
    setCorrectChar(green);
    setExtraChar(maroon);
    setIncorrectChar(red);
    setMissedChar(grey);
    const acc = (green * 100 / (green + red + grey + maroon));
    setAccuracy(acc);

    const ContextValue = {
        timeControl,
        rawSpeed,
        wpm,
        accuracy,
        correctChar,
        incorrectChar,
        extraChar,
        missedChar
    }

    return (
        <ResultContext.Provider value = {ContextValue}>
            {children}
        </ResultContext.Provider>
    )
}