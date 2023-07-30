import Letter, { Color } from "@/models/Letter";
import Word from "@/models/Word";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

const quote: string =
  "Embrace each day with a smile, for life's beauty lies in the simplest moments. Let kindness be your compass, guiding you to brighter paths. In unity, we find strength, and in love, we discover endless possibilities.";
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
const TypeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [UserTypedParagraph, setUserTypedParagraph] = useState<Array<Word>>([
    [],
  ]);
  const OriginalParagraph = convertStringToLetterArray(quote);
  const [DisplayTypedParagraph, setDisplayTypedParagraph] = useState<
    Array<Word>
  >([[]]);

  function convertStringToLetterArray(inputString: string): Array<Word> {
    const words = inputString.split(" ");
    const letterArray: Array<Word> = [];

    for (const word of words) {
      const letters: Array<Letter> = [];
      for (const char of word) {
        const letter: Letter = {
          value: char,
          isCurrent: false,
          color: Color.BLUE,
        };
        letters.push(letter);
      }
      letterArray.push(letters);
    }

    return letterArray;
  }

  useEffect(() => {
    updateDisplayParagraph(UserTypedParagraph);
  }, []);

  const HandleKeyDown = (e: KeyboardEvent) => {
    if (OriginalParagraph.length < UserTypedParagraph.length) {
      return;
    }

    const keyInput: string = e.key;

    if (keyInput === " ") {
      const updatedUserTypedParagraph: Array<Word> = UserTypedParagraph.map(
        (word, index) => {
          if (index < UserTypedParagraph.length - 1) {
            return word;
          } else {
            return word.map((letter, index) => {
              if (index < word.length - 1) {
                return letter;
              } else {
                return { ...letter, isCurrent: false };
              }
            });
          }
        }
      );
      const newArray = [...updatedUserTypedParagraph, []];
      setUserTypedParagraph(newArray);
      updateDisplayParagraph(newArray);
    } else if (keyInput === "Backspace") {
      HandleBackspace();
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
      updateDisplayParagraph(updatedArray);
    }
  };

  console.log(UserTypedParagraph[0], DisplayTypedParagraph[0]);
  const updateDisplayParagraph = (UserTypedParagraph: Array<Word>) => {
    const updatedDisplayParagraph: Array<Word> = OriginalParagraph.map(
      (word, index) => {
        if (index >= UserTypedParagraph.length) {
          return word;
        }
        const userTypedWord: Word = UserTypedParagraph[index];
        const originalWord: Word = OriginalParagraph[index];

        let displayedWord: Word = [];

        for (
          let i = 0;
          i < Math.max(userTypedWord.length, originalWord.length);
          i++
        ) {
          if (i >= userTypedWord.length) {
            displayedWord = [...displayedWord, originalWord[i]];
          } else if (i >= originalWord.length) {
            console.log(userTypedWord[i]);
            const extraLetter: Letter = {
              ...userTypedWord[i],
              color: Color.RED,
            };
            displayedWord = [...displayedWord, extraLetter];
          } else {
            if (originalWord[i].value === userTypedWord[i].value) {
              displayedWord = [
                ...displayedWord,
                { ...originalWord[i],isCurrent:userTypedWord[i].isCurrent, color: Color.GREEN },
              ];
            } else {
              displayedWord = [
                ...displayedWord,
                { ...originalWord[i],isCurrent:userTypedWord[i].isCurrent, color: Color.RED },
              ];
            }
          }
        }
        return displayedWord;
      }
    );
    setDisplayTypedParagraph(updatedDisplayParagraph);
  };

  const HandleBackspace = () => {
    let updatedUserTypedParagraph: Array<Word> = [];
    UserTypedParagraph.forEach((word, index) => {
      console.log(UserTypedParagraph.length);
      if (index < UserTypedParagraph.length - 1) {
        updatedUserTypedParagraph = [...updatedUserTypedParagraph, word];
      } else {
        if (word.length !== 0) {
          let newWord = word.filter((letter, index) => {
            return index < word.length - 1;
          });
          newWord = newWord.map((letter, index) => {
            if (index === newWord.length - 1) {
              return { ...letter, isCurrent: true };
            }
            return letter;
          });
          if (newWord.length != 0)
            updatedUserTypedParagraph = [...updatedUserTypedParagraph, newWord];
        }
      }
    });
    if (updatedUserTypedParagraph.length === 0) {
      updatedUserTypedParagraph = [[]];
    }
    console.log(updatedUserTypedParagraph);
    setUserTypedParagraph(updatedUserTypedParagraph);
    updateDisplayParagraph(updatedUserTypedParagraph);
  };

  const contextValue = {
    OriginalParagraph,
    UserTypedParagraph,
    DisplayTypedParagraph,
    HandleKeyDown,
    HandleBackspace,
  };

  return (
    <TypeContext.Provider value={contextValue}>{children}</TypeContext.Provider>
  );
};

export default TypeContextProvider;
