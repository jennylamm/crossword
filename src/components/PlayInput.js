import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Papa from "papaparse";
import { useCrossWordData } from "../context/Context";

const PositionBoth = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const PlayInput = () => {
  const [inputCode, setInputCode] = useState("");
  const [csvData, setCsvData] = useState("");  

  const { setFinalGrid, setVerticalClues, setHorizontalClues, setPlayPinSubmitted } =
    useCrossWordData();

  useEffect(() => {
    fetch("/data.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            setCsvData(result.data); // Store the parsed CSV data
          },
        });
      });
  }, []);

  const handleSubmit = (e) => {
    setInputCode(inputCode);

    e.preventDefault();

    const foundRow = csvData.find((row) => row.gamePin === inputCode);

    if (foundRow) {
      setFinalGrid(JSON.parse(foundRow.grid))
      setHorizontalClues(JSON.parse(foundRow.across))
      setVerticalClues(JSON.parse(foundRow.down))
      setPlayPinSubmitted(true)

    } else {
    }
  };

  return (
    <>
      <p>Enter your pin to load your crossword</p>
      <PositionBoth>
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </PositionBoth>

    </>
  );
};

export default PlayInput;
