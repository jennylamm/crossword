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

const Grid = styled.div`
 display: grid;
  grid-template-columns: repeat(15, var(--cell-size, 32px)); /* Dynamically sized cells */
  grid-template-rows: repeat(15, var(--cell-size, 32px));
  gap: 2px; /* Space between cells */
  justify-content: center; /* Center grid horizontally */
  align-items: center; /* Center grid vertically if needed */
`;

const Cell = styled.input`

 width: var(--cell-size, 32px);
  height: var(--cell-size, 32px);
  text-align: center;
  font-size: calc(var(--cell-size, 32px) * 0.5); /* Relative font size */
  font-weight: bold;
  border: 0.5px solid #333333E6; /* Subtle border for each cell */
  background-color: ${({ disabled }) => (disabled ? "#333333E6" : "#ffffffE6")}; /* Darker for disabled cells */
  color: ${({ disabled }) => (disabled ? "transparent" : "#000")}; /* Hide text for blocked cells */
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  outline: none; /* Remove focus outline */
  caret-color: transparent; /* Prevent caret from showing */
  
  &:focus {
    border: 1px solid #4caf50; /* Highlight border when focused */
    background-color: #e8f5e9; /* Light green for active cell */
  }
`;

const CheckButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;


const LoadingMessage = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
`;

const PlayCrossword = () => {
  const { finalGrid, verticalClues, horizontalClues } = useCrossWordData();
  const [userGrid, setUserGrid] = useState(null); // Initialize as null for loading state

  useEffect(() => {
    console.log(finalGrid)
    if (finalGrid && finalGrid.length > 0) {
      // Populate userGrid only when finalGrid is ready
      setUserGrid(
        finalGrid.map((row) => row.map((cell) => (cell ? "" : null)))
      );
    }
  }, [finalGrid]);

  const handleInputChange = (rowIdx, colIdx, value) => {
    const updatedGrid = [...userGrid];
    updatedGrid[rowIdx][colIdx] = value.toUpperCase();
    setUserGrid(updatedGrid);
  };

  const checkSolution = () => {
    for (let i = 0; i < finalGrid.length; i++) {
      for (let j = 0; j < finalGrid[i].length; j++) {
        if (finalGrid[i][j] && finalGrid[i][j] !== userGrid[i][j]) {
          console.log("Incorrect solution!");
          return;
        }
      }
    }
    console.log("Congratulations! You completed the crossword!");
  };

  // Show loading state until userGrid is ready
  if (!userGrid) {
    return <LoadingMessage>Loading crossword...</LoadingMessage>;
  }

  return (
    <div>
      <Grid>
        {finalGrid.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <Cell
              key={`${rowIdx}-${colIdx}`}
              value={userGrid[rowIdx][colIdx] || ""}
              onChange={(e) =>
                handleInputChange(rowIdx, colIdx, e.target.value)
              }
              maxLength={1}
              disabled={!cell}
            />
          ))
        )}
      </Grid>
      <CheckButton onClick={checkSolution}>Check Solution</CheckButton>
    </div>
  );
};

export default PlayCrossword;
