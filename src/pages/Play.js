import React, { useEffect, useState } from "react";
import styled from "styled-components";
import img from "../assests/images/RajPlayImage.PNG";
import Papa from "papaparse";
import PlayInput from "../components/PlayInput";

const PositionAll = styled.div`
  background-image: url(${img});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: rgb(62, 21, 21);
  font-family: "Lexend Deca", sans-serif;
`;

const PositionBoth = styled.div`
  padding-left: 10%;
  padding-top: 5%;
  margin: 30px;
`;

const PositionInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Play = () => {
  // const [csvData, setCsvData] = useState([]);
  // const [inputCode, setInputCode] = useState("");
  // const [formDataResult, setFormDataResult] = useState(null);
  // const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   fetch("/data.csv")
  //     .then((response) => response.text())
  //     .then((csvText) => {
  //       Papa.parse(csvText, {
  //         header: true, // CSV file has headers
  //         complete: (result) => {
  //           setCsvData(result.data); // Store the parsed CSV data
  //         },
  //       });
  //     });
  // }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   console.log("handle submit")

  //   // Search for the inputCode in the CSV data
  //   const foundRow = csvData.find((row) => row.gamePin === inputCode);
  //   console.log(foundRow)

  //   if (foundRow) {
  //     setFormDataResult(foundRow.across);
  //     setErrorMessage("");
  //   } else {
  //     setFormDataResult(null);
  //     setErrorMessage("Code not found");
  //   }
  // };

  return (
    <PositionAll>
      <PositionBoth>
        <h1 style={{ marginBottom: "10px" }}>Play</h1>
      </PositionBoth>
      <PositionInput>
        <PlayInput />
      </PositionInput>
    </PositionAll>
  );
};

export default Play;
