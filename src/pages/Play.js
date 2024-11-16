import React, { useEffect, useState } from "react";
import styled from "styled-components";
import img from "../assests/images/RajPlayImage.PNG";
import Papa from "papaparse";

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

const Play = () => {
  const [csvData, setCsvData] = useState([]);
  const [inputCode, setInputCode] = useState("");
  const [formDataResult, setFormDataResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("/data.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true, // CSV file has headers
          complete: (result) => {
            setCsvData(result.data); // Store the parsed CSV data
          },
        });
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Search for the inputCode in the CSV data
    const foundRow = csvData.find((row) => row.gamePin === inputCode);

    if (foundRow) {
      setFormDataResult(foundRow.formData);
      setErrorMessage("");
    } else {
      setFormDataResult(null);
      setErrorMessage("Code not found");
    }
  };

  return (
    <PositionAll>
      <h1 style={{ marginBottom: "10px" }}>Play</h1>
      <p style={{ margin: "0px" }}>Enter your pin to load your crossword</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {formDataResult && (
        <div>
          <h2>Form Data:</h2>
          <p>{formDataResult}</p>
        </div>
      )}

      {/* Display error message if code is not found */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </PositionAll>
  );
};

export default Play;
