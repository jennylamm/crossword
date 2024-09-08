import React, { useState } from "react";
import "./Configure.css";
import styled from "styled-components";
import { useCrossWordData } from "../context/Context";
import { PositionHeader } from "../components/Styling";
import img from "../assests/images/ConfigureImage.PNG";

const PositionAll = styled.div`
  background-image: url(${img});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(62, 21, 21);
  font-family: "Lexend Deca", sans-serif;
`;

const Configure = () => {
  const { formData, setFormData } = useCrossWordData();


  const formatWords = (formData) => {
    let updatedFormData
    // making all words uppercase
    updatedFormData = formData.map((item) => ({
      ...item,
      word: item.word.toUpperCase(),
    }));

    // sorting words by decending order 
    updatedFormData = updatedFormData.sort((a, b) => b.word.length - a.word.length);
    return updatedFormData;
  };

  const createCrossWord = (formData) => {
    setFormData(formatWords(formData));
  };



  return (
    <PositionAll>
      <PositionHeader>
        <h1 style={{ marginBottom: "10px" }}>Configure Page</h1>
        <p style={{ margin: "0px" }}>Make your crossword!</p>
      </PositionHeader>
      <button onClick={() => createCrossWord(formData)}>Create</button>
    </PositionAll>
  );
};

export default Configure;
