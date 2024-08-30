// src/pages/Contact.js
import React from "react";
import "./Generate.css";
import InputForm from "../components/InputForm";

const Generate = () => {
  return (
    <div className="generate-container">
      <div className="generate-header">
        <h1>Generate Your CrossWord</h1>
        <p>Enter your words and clues!</p>
      </div>
        <InputForm />
    </div>
  );
};

export default Generate;
