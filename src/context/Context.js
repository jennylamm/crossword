import React, { createContext, useState, useContext } from 'react';

// Create a context
const CrossWordContext = createContext();

// Create a provider component
export const CrossWordProvider = ({ children }) => {
  const [formData, setFormData] = useState([
    { word: '', clue: '' },
    { word: '', clue: '' },
    { word: '', clue: '' },
    { word: '', clue: '' },
    { word: '', clue: '' }
  ]);

  return (
    <CrossWordContext.Provider value={{ formData, setFormData }}>
      {children}
    </CrossWordContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useCrossWordData = () => useContext(CrossWordContext);
