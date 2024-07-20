// src/pages/Contact.js
import React from "react";
import "./Generate.css";
import InputForm from "../components/InputForm";

const Generate = () => {
  return (
    <div className="generate-container">
      <div className="generate-header">
        <h1>Generate Page</h1>
        <p>Welcome to the Generate page!</p>
      </div>
        <InputForm />
    </div>
  );
};

export default Generate;
