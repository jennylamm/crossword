import React, { createContext, useState, useContext } from "react";

// Create a context
const CrossWordContext = createContext();

// Create a provider component
export const CrossWordProvider = ({ children }) => {
  const [formData, setFormData] = useState([
    { word: "ong", clue: "1" },
    { word: "cripsy", clue: "2" },
    { word: "wifeylifely", clue: "3" },
    { word: "leprocorn", clue: "4" },
    { word: "noodling", clue: "5" },
    { word: "hangrr", clue: "6" },
    { word: "yes", clue: "7" },
    { word: "wanaka", clue: "8" },
    { word: "lamglish", clue: "9" },
    { word: "hazards", clue: "10" },
    { word: "bsfr", clue: "11" },
    { word: "gaggy", clue: "12" },
    { word: "papa", clue: "13" },
    { word: "tottis", clue: "14" },
  ]);

  const [finalGrid, setFinalGrid] = useState([])

  return (
    <CrossWordContext.Provider value={{ formData, setFormData, finalGrid, setFinalGrid }}>
      {children}
    </CrossWordContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useCrossWordData = () => useContext(CrossWordContext);
