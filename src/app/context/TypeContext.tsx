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
    const keyInput: string = e.key;

    if (keyInput === " ") {
      if (OriginalParagraph.length < UserTypedParagraph.length) {
        return;
      }
      const updatedUserTypedParagraph: Array<Word> = UserTypedParagraph.map(
        (word, index) => {
          if (index < UserTypedParagraph.length - 1) {
            return word;
          } else {
            let newWord: Word = [];
            const originalWord = OriginalParagraph[index];
            for (
              let i = 0;
              i < Math.max(word.length, originalWord.length);
              i++
            ) {
              if (i < word.length - 1) {
                newWord = [...newWord, word[i]];
              } else if (i === word.length - 1) {
                newWord = [...newWord, { ...word[i], isCurrent: false }];
              } else {
                newWord = [
                  ...newWord,
                  { ...originalWord[i], color: Color.MAROON },
                ];
              }
            }
            return newWord;
          }
        }
      );

      const newArray = [...updatedUserTypedParagraph, []];
      setUserTypedParagraph(newArray);
      updateDisplayParagraph(newArray);
    } else if (keyInput === "Backspace") {
      HandleBackspace();
    } else if (keyInput !== "CapsLock" && keyInput !== "Shift") {
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
            const extraLetter: Letter = {
              ...userTypedWord[i],
              color: Color.RED,
            };
            displayedWord = [...displayedWord, extraLetter];
          } else {
            if (originalWord[i].value === userTypedWord[i].value) {
              displayedWord = [
                ...displayedWord,
                {
                  ...originalWord[i],
                  isCurrent: userTypedWord[i].isCurrent,
                  color:
                    userTypedWord[i].color === Color.MAROON
                      ? Color.MAROON
                      : Color.GREEN,
                },
              ];
            } else {
              displayedWord = [
                ...displayedWord,
                {
                  ...originalWord[i],
                  isCurrent: userTypedWord[i].isCurrent,
                  color: Color.RED,
                },
              ];
            }
          }
        }
        return displayedWord;
      }
    );
    let flag = true;
    for (let i = 0; i < updatedDisplayParagraph.length; i++) {
      for (let j = 0; j < updatedDisplayParagraph[i].length; j++) {
        if (updatedDisplayParagraph[i][j].isCurrent) {
          flag = false;
        }
      }
    }
    if (flag) {
      for (let i = 0; i < updatedDisplayParagraph.length; i++) {
        const word = updatedDisplayParagraph[i];
        let innerFlag = true;
        for (let j = 0; j < word.length; j++) {
          const letter = word[j];

          if (letter.color === Color.BLUE) {
            letter.isCurrent = true;
            innerFlag = false;
            break;
          }
        }
        if (!innerFlag) {
          break;
        }
      }
    }
    setDisplayTypedParagraph(updatedDisplayParagraph);
  };
 console.log(UserTypedParagraph);
  const HandleBackspace = () => {
    let updatedUserTypedParagraph: Array<Word> = [];
    let flag: boolean = false;
    UserTypedParagraph.forEach((word, index) => {
      console.log(UserTypedParagraph.length);
      if (index < UserTypedParagraph.length - 1) {
        updatedUserTypedParagraph = [...updatedUserTypedParagraph, word];
      } else {
        if(word.length==0) {
          flag = true;
        }
        else if (word.length !== 0) {
          if (word.length == 1) {
            flag = true;
          }
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
    if (flag) {
      updatedUserTypedParagraph.forEach((word, index) => {
        if (index === updatedUserTypedParagraph.length - 1) {
          word.forEach((letter, idx) => {
            if (idx === word.length - 1) {
              letter.isCurrent = true;
            }
          });
        }
      });
    }
    if (updatedUserTypedParagraph.length === 0) {
      updatedUserTypedParagraph = [[]];
    }
    console.log("->", updatedUserTypedParagraph);
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
