import React, { createContext, useState, useContext } from "react";

// Create a context
const CrossWordContext = createContext();

// Create a provider component
export const CrossWordProvider = ({ children }) => {
  const [formData, setFormData] = useState([
    { word: "", clue: "" },
    { word: "", clue: "" },
    { word: "", clue: "" },
    { word: "", clue: "" },
    { word: "", clue: "" },
  ]);

  const [finalGrid, setFinalGrid] = useState([]);
  const [horizontalClues, setHorizontalClues] = useState([]);
  const [verticalClues, setVerticalClues] = useState([]);
  const [playPinSubmitted, setPlayPinSubmitted] = useState(false);


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
        playPinSubmitted, 
        setPlayPinSubmitted
      }}
    >
      {children}
    </CrossWordContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useCrossWordData = () => useContext(CrossWordContext);
