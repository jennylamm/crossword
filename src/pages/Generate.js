// src/pages/Contact.js
import React from "react";
import InputForm from "../components/InputForm";
import styled from "styled-components";
import img from "../assests/images/GenerateImage.PNG";
import { PositionHeader } from "../components/Styling";

const PositionAll = styled.div`
  background-image: url(${img});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(62, 21, 21); /* Change text color to make it readable */
  font-family: "Lexend Deca", sans-serif;
`;

const PositionInputForm = styled.div`
  max-width: 600px; 
  width:100%
`;

const Generate = () => {
  return (
    <PositionAll>
      <PositionHeader>
        <h1 style={{ marginBottom: "10px" }}>Generate Your CrossWord</h1>
        <p style={{margin: "0px"}}>Enter your words and clues!</p>
      </PositionHeader>
      <PositionInputForm>
        <InputForm />
      </PositionInputForm>
    </PositionAll>
  );
};

export default Generate;
