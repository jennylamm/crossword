import React, { createContext, useState, useContext } from 'react';

// Create a context
const CrossWordContext = createContext();

// Create a provider component
export const CrossWordProvider = ({ children }) => {
  const [formData, setFormData] = useState([
    { word: "Lantern", clue: "Portable light source used outdoors" },
    { word: "Mirage", clue: "Illusion seen in the desert or on hot roads" },
    {
      word: "Rip",
      clue: "A small hole in your jeans",
    },
    {
      word: "Whistle",
      clue: "A high-pitched sound, often used to catch attention",
    },
    { word: "Orbit", clue: "The path a planet takes around a star" },

  ]);

  return (
    <CrossWordContext.Provider value={{ formData, setFormData }}>
      {children}
    </CrossWordContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useCrossWordData = () => useContext(CrossWordContext);
