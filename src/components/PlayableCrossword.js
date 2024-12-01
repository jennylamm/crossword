import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useCrossWordData } from "../context/Context";

// Styled Components
const CrosswordContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ columns, cellsize }) =>
    `repeat(${columns}, ${cellsize}px)`};
  grid-gap: ${({ gap }) => `${gap}px`};
`;

const CellWrapper = styled.div`
  position: relative;
  width: ${({ cellsize }) => `${cellsize}px`};
  height: ${({ cellsize }) => `${cellsize}px`};
`;

const CellInput = styled.input`
  width: ${({ cellsize }) => `${cellsize}px`};
  height: ${({ cellsize }) => `${cellsize}px`};
  border: 0.5px solid #333333e6;
  text-align: center;
  font-size: 20px;
  color: rgb(62, 21, 21);
  font-family: "Lexend Deca", sans-serif;
  text-transform: uppercase;
  cursor: ${({ active }) => (active ? "text" : "not-allowed")};
  background-color: ${({ focused, word, cell }) =>
    focused
      ? "#ffcc00e6" // Highlight the focused cell with yellow
      : word
      ? "#add8e6e6" // Highlight the word cells with light blue
      : cell
      ? "#ffffffe6"
      : "#333333e6"};
`;

const ClueNumber = styled.span`
  position: absolute;
  top: 2px;
  left: 3px;
  font-size: 10px;
  color: rgb(62, 21, 21);
`;

const PlayableCrossword = ({ setModal }) => {
  const { finalGrid, verticalClues, horizontalClues } = useCrossWordData();

  const CELL_SIZE = 35;
  const GAP = 3;

  // Generate a map of clue numbers
  const generateNumbersMap = (clues) => {
    const numbersMap = {};
    clues.forEach((clue) => {
      const [row, col] = clue.position;
      numbersMap[`${row}-${col}`] = clue.number;
    });
    return numbersMap;
  };

  const numbersMap = {
    ...generateNumbersMap(verticalClues),
    ...generateNumbersMap(horizontalClues),
  };

  // Track the current focus position
  const [focusedCell, setFocusedCell] = useState(null);
  const [highlightDirection, setHighlightDirection] = useState({});

  const [userGrid, setUserGrid] = useState(
    finalGrid.map((row) => row.map((cell) => (cell ? "" : null)))
  );

  // Validation function
  const validateGrid = (setModal) => {
    const normalizedUserGrid = userGrid.map((row) =>
      row.map((cell) => (cell === null ? "" : cell))
    );

    const isComplete = finalGrid.every((row, rowIdx) =>
      row.every(
        (cellValue, colIdx) => cellValue === normalizedUserGrid[rowIdx][colIdx]
      )
    );

    if (isComplete) {
      setModal(true);
    }
  };

  // Run validation on userGrid updates
  useEffect(() => {
    validateGrid(setModal);
  }, [userGrid, setModal]);

  const handleInputChange = (rowIdx, colIdx, value) => {
    //if (value.length > 1) return;

    const isBackspace = value === ''
    const updatedGrid = userGrid.map((row, rIdx) =>
      row.map((cellValue, cIdx) =>
        rIdx === rowIdx && cIdx === colIdx ? value.toUpperCase() : cellValue
      )
    );
    setUserGrid(updatedGrid);

    const wordCells = getWordCells(rowIdx, colIdx);
    const key = `${rowIdx}-${colIdx}`;

    console.log(highlightDirection[key])
    const isHorizontal = highlightDirection[key] === "horizontal";
    const directionCells = isHorizontal
      ? wordCells.horizontal
      : wordCells.vertical;

    const currentIndex = directionCells.findIndex(
      ([row, col]) => row === rowIdx && col === colIdx
    );

    console.log('horizontal?', isHorizontal, directionCells, currentIndex)

    let nextCell = null;
    if (isBackspace && currentIndex > 0) {
      // Move to the previous cell
      nextCell = directionCells[currentIndex - 1];
      console.log('backspace', nextCell)
    } else if (!isBackspace && currentIndex < directionCells.length - 1) {
      // Move to the next cell
      nextCell = directionCells[currentIndex + 1];
      console.log('not backspace', nextCell)

    }

    if (nextCell) {
      const [nextRow, nextCol] = nextCell;
      setFocusedCell({ rowIdx: nextRow, colIdx: nextCol }); // Update the focused cell
      const nextInput = document.getElementById(`cell-${nextRow}-${nextCol}`);
      nextInput?.focus();

      const nextKey = `${nextRow}-${nextCol}`;
      const wordCells = getWordCells(nextRow, nextCol);

      const isWordHorizontal = wordCells.horizontal.length > 1;
      const isWordVertical = wordCells.vertical.length > 1;
      const isWordBoth = isWordHorizontal && isWordVertical;


      setHighlightDirection((prev) => ({
        ...prev,
        [nextKey]:
          prev[nextKey] || isWordBoth || isWordHorizontal
            ? "horizontal"
            : "vertical",
      }));
    }
  };

  // Get the word cells (horizontal and vertical) for the focused cell
  const getWordCells = (rowIdx, colIdx) => {
    const wordCells = { horizontal: [], vertical: [] };

    // Horizontal word
    let startCol = colIdx;
    while (startCol > 0 && finalGrid[rowIdx][startCol - 1]) startCol--;
    let endCol = colIdx;
    while (
      endCol < finalGrid[rowIdx].length - 1 &&
      finalGrid[rowIdx][endCol + 1]
    )
      endCol++;
    for (let col = startCol; col <= endCol; col++) {
      wordCells.horizontal.push([rowIdx, col]);
    }

    // Vertical word
    let startRow = rowIdx;
    while (startRow > 0 && finalGrid[startRow - 1][colIdx]) startRow--;
    let endRow = rowIdx;
    while (endRow < finalGrid.length - 1 && finalGrid[endRow + 1][colIdx])
      endRow++;
    for (let row = startRow; row <= endRow; row++) {
      wordCells.vertical.push([row, colIdx]);
    }
    return wordCells;
  };

  const handleCellClick = (rowIdx, colIdx) => {
    const key = `${rowIdx}-${colIdx}`;
    const wordCells = getWordCells(rowIdx, colIdx);

    const isWordHorizontal = wordCells.horizontal.length > 1;
    const isWordVertical = wordCells.vertical.length > 1;
    const isWordBoth = isWordHorizontal && isWordVertical;

    // If the cell is already focused, toggle the highlight direction
    if (
      focusedCell &&
      focusedCell.rowIdx === rowIdx &&
      focusedCell.colIdx === colIdx
    ) {
      if (isWordBoth) {
        setHighlightDirection((prev) => ({
          ...prev,
          [key]: prev[key] === "horizontal" ? "vertical" : "horizontal",
        }));
      }
    } else {
      // Otherwise, set the cell as focused
      setFocusedCell({ rowIdx, colIdx });

      setHighlightDirection((prev) => ({
        ...prev,
        [key]:
          prev[key] || isWordBoth || isWordHorizontal
            ? "horizontal"
            : "vertical",
      }));
    }
  };

  const getHighlightColors = (rowIdx, colIdx) => {
    if (!focusedCell) return { focused: false, word: false };

    const { rowIdx: focusedRow, colIdx: focusedCol } = focusedCell;
    const wordCells = getWordCells(focusedRow, focusedCol);

    const key = `${focusedRow}-${focusedCol}`;

    const isWordBoth =
      wordCells.horizontal.length > 1 && wordCells.vertical.length > 1;

    const direction = isWordBoth
      ? highlightDirection[key] || "horizontal"
      : null;

    const hortizontalCells = wordCells.horizontal.some(
      (cell) => cell[0] === rowIdx && cell[1] === colIdx
    );
    const verticalCells = wordCells.vertical.some(
      (cell) => cell[0] === rowIdx && cell[1] === colIdx
    );

    const isInWord =
      isWordBoth && direction === "horizontal"
        ? hortizontalCells
        : isWordBoth && direction === "vertical"
        ? verticalCells
        : hortizontalCells || verticalCells;

    const focused = focusedRow === rowIdx && focusedCol === colIdx;
    const word = isInWord && !focused;

    return { focused, word };
  };

  return (
    <CrosswordContainer
      columns={finalGrid[0].length}
      cellsize={CELL_SIZE}
      gap={GAP}
    >
      {finalGrid.map((row, rowIdx) =>
        row.map((cell, colIdx) => {
          const cellNumber = numbersMap[`${rowIdx}-${colIdx}`];

          const { focused, word } = getHighlightColors(rowIdx, colIdx);

          return (
            <CellWrapper key={`${rowIdx}-${colIdx}`} cellsize={CELL_SIZE}>
              <CellInput
                id={`cell-${rowIdx}-${colIdx}`} // Add unique id for targeting
                type="text"
                value={userGrid[rowIdx][colIdx] || ""}
                onInput={(e) =>
                  handleInputChange(rowIdx, colIdx, e.target.value)
                }
                maxLength={1} // Ensures only one character can be entered
                disabled={!cell}
                active={!!cell}
                focused={focused} // Pass focused prop
                word={word} // Pass word prop
                cell={cell} // Pass cell prop to manage default background
                cellsize={CELL_SIZE}
                onClick={() => handleCellClick(rowIdx, colIdx)} // Single click handler
              />
              {cellNumber && <ClueNumber>{cellNumber}</ClueNumber>}
            </CellWrapper>
          );
        })
      )}
    </CrosswordContainer>
  );
};

export default PlayableCrossword;
