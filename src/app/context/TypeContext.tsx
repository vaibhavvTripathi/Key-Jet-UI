import Letter, { Color } from "@/models/Letter";
import Word from "@/models/Word";
import React, { useState } from "react";
import { createContext } from "react";

export interface TypeContextType {
  OriginalParagraph: Array<Word>;
  UserTypedParagraph: Array<Word>;
  DisplayTypedParagraph: Array<Word>;
  HandleKeyDown: (e: KeyboardEvent) => void;
  HandleBackspace: () => void;
}

export const TypeContext = createContext<TypeContextType>({
  OriginalParagraph: [[]],
  UserTypedParagraph: [[]],
  DisplayTypedParagraph: [[]],
  HandleKeyDown: (e: KeyboardEvent) => {},
  HandleBackspace: () => {},
});
const TypeContextProvider = () => {
  const [UserTypedParagraph, setUserTypedParagraph] = useState<Array<Word>>([
    [],
  ]);
  const [OriginalParagraph, setOriginalParagraph] = useState<Array<Word>>([[]]);
  const [DisplayTypedParagraph, setDisplayTypedParagraph] = useState<
    Array<Word>
  >([[]]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (OriginalParagraph.length < UserTypedParagraph.length) {
      return;
    }

    const keyInput: string = e.key;

    if (keyInput === " ") {
      const newArray = [...UserTypedParagraph, []];
      setUserTypedParagraph(newArray);
    } else if (keyInput !== "CapsLock") {
      const updatedArray: Array<Array<Letter>> = UserTypedParagraph.map(
        (word, index) => {
          if (index === UserTypedParagraph.length - 1) {
            const newWord = word.map((letter, index) => {
              return { ...letter, isCurrent: false };
            });
            const letter: Letter = {
              value: keyInput,
              color: Color.BLUE,
              isCurrent: true,
            };

            return [...newWord, letter];
          }
          return [...word];
        }
      );
      setUserTypedParagraph(updatedArray);
    }
  };

  const updateDisplayParagraph = () => {
    const updatedDisplayParagraph: Array<Word> = UserTypedParagraph.map(
      (word, index) => {
        if (index >= UserTypedParagraph.length) {
          return word;
        }

        const userTypedWord: Word = UserTypedParagraph[index];
        const originalWord: Word = UserTypedParagraph[index];

        let displayedWord: Word = [];
        for (
          let i = 0;
          i < Math.max(userTypedWord.length, originalWord.length);
          i++
        ) {
          if (i > userTypedWord.length) {
            displayedWord = [...displayedWord, originalWord[i]];
          } else if (i > originalWord.length) {
            const extraLetter: Letter = {
              ...userTypedWord[i],
              color: Color.RED,
            };
            displayedWord = [...displayedWord, extraLetter];
          } else {
            if (originalWord[i] === userTypedWord[i]) {
              displayedWord = [...displayedWord, originalWord[i]];
            } else {
              displayedWord = [
                ...displayedWord,
                { ...originalWord[i], color: Color.RED },
              ];
            }
          }
        }

        return displayedWord;
      }
    );
  };

  const handleBackSpace = () => {};

  return <div>TypeContext</div>;
};

export default TypeContextProvider;
