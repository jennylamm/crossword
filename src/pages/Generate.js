// src/pages/Contact.js
import React from "react";
import InputForm from "../components/InputForm";
import styled from "styled-components";
import img from "../assests/images/GenerateImage.PNG";

const PositionAll = styled.div`
  background-image: url(${img});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: rgb(62, 21, 21); /* Change text color to make it readable */
  font-family: "Lexend Deca", sans-serif;
`;

const PositionBoth = styled.div`
padding-left: 10%;
padding-top: 5%;
margin: 30px
`

const PositionInputForm = styled.div`
padding-top: 30px;
padding-left: 40px;
margin-left: 20px

`;

const Generate = () => {
  return (
    <PositionAll>
      <PositionBoth>
        <h1 style={{ marginBottom: "10px" }}>Generate Your CrossWord</h1>
        <p style={{ margin: "0px" }}>Enter your words and clues!</p>
      <PositionInputForm>
        <InputForm />
      </PositionInputForm>
      </PositionBoth>
    </PositionAll>
  );
};

export default Generate;
