import React, { createContext, useState, useContext } from "react";

// Create a context
const CrossWordContext = createContext();

// Create a provider component
export const CrossWordProvider = ({ children }) => {
  const [formData, setFormData] = useState([
    { word: "ong", clue: "Alnerate Spelling to omg" },
    { word: "cripsy", clue: "How we like our chips" },
    { word: "wifeylifely", clue: "___4___" },
    { word: "leprocorn", clue: "something about Jesus" },
    { word: "noodling", clue: "a carb, perphaps" },
    { word: "hangrr", clue: "anger hanrgy" },
    { word: "yes", clue: "tawian reading" },
    { word: "wanaka", clue: "new zealands" },
    { word: "lamglish", clue: "alt lanagueg" },
    { word: "hazards", clue: "blinkging " },
    { word: "bsfr", clue: "be SO FOR REAL" },
    { word: "gaggy", clue: "3.2342342342324" },
    { word: "papa", clue: "downtown abbey" },
    { word: "tottis", clue: "tiramisu" },
  ]);

  const [finalGrid, setFinalGrid] = useState([]);
  const [horizontalClues, setHorizontalClues] = useState([]);

  const [verticalClues, setVerticalClues] = useState([]);

  return (
    <CrossWordContext.Provider
      value={{
        formData,
        setFormData,
        finalGrid,
        setFinalGrid,
        horizontalClues,
        setHorizontalClues,
        verticalClues,
        setVerticalClues,
      }}
    >
      {children}
    </CrossWordContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useCrossWordData = () => useContext(CrossWordContext);
