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
    let updatedFormData;
    // making all words uppercase
    updatedFormData = formData.map((item) => ({
      ...item,
      word: item.word.toUpperCase(),
    }));

    // sorting words by decending order
    updatedFormData = updatedFormData.sort(
      (a, b) => b.word.length - a.word.length
    );
    return updatedFormData;
  };

  const createCrossWord = (formData) => {
    setFormData(formatWords(formData));
  };

  const generatePin = (length) => {
    let gamePin = "";
    const characters = 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < length; i++) {
      gamePin += characters.charAt(
        Math.floor(Math.random() * length)
      );
    }
    return gamePin;
  };

  const saveCrossWord = async (e) => {
    const payload = {
      gamePin: generatePin(6),
      formData: JSON.stringify(formData),
    };

    console.log(payload)
    const response = await fetch("/write-to-csv", {
      // No need to specify localhost:3001 due to proxy
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("Data written to CSV");
    } else {
      alert("Failed to write to CSV");
    }
  };

  return (
    <PositionAll>
      <PositionHeader>
        <h1 style={{ marginBottom: "10px" }}>Configure Page</h1>
        <p style={{ margin: "0px" }}>Make your crossword!</p>
      </PositionHeader>
      <button onClick={() => createCrossWord(formData)}>Create</button>
      <button onClick={() => saveCrossWord()}>Save</button>
    </PositionAll>
  );
};

export default Configure;
