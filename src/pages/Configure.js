import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCrossWordData } from "../context/Context";
import img from "../assests/images/ConfigureImage.PNG";
import DisplayCrossWord from "../components/DisplayCrossWord";
import ClueList from "../components/ClueList";
import GamePinModal from "../components/GamePinModal";

const PositionAll = styled.div`
  flex-direction: column;
  align-items: center;
  color: rgb(62, 21, 21);
  font-family: "Lexend Deca", sans-serif;
  background-image: url(${img});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: grid;
  grid-template-columns: 4fr 3fr;
`;

const PositionBoth = styled.div`
  padding-left: 20%;
  margin: 10px;
`;

const PositionGrid = styled.div`
  padding-top: 20px;
  padding-left: 20px;
`;

export const DisplayClues = styled.div`
  margin-left: 75px;
  white-space: nowrap;
`;

const StyledButton = styled.div`
  margin-top: 30px;
`;

const Configure = () => {
  const {
    formData,
    finalGrid,
    setFinalGrid,
    horizontalClues,
    setHorizontalClues,
    verticalClues,
    setVerticalClues,
  } = useCrossWordData();

  const [modalShow, setModalShow] = useState(false);
  const [gamePin, setGamePin] = useState("");

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

  const createEmptyGrid = (size = 15) => {
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill(""));
  };

  const createCrossWord = (formData) => {
    const formattedWords = formatWords(formData);
    const grid = createEmptyGrid();

    // Place the first word in the middle horizontally
    const firstWord = formattedWords[0].word;
    placeFirstWord(grid, firstWord);

    // Try to place each remaining word
    for (let i = 1; i < formattedWords.length; i++) {
      const word = formattedWords[i].word;
      let placed = false;

      // Check for possible intersections with words already on the grid
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
          const intersectingLetter = grid[row][col];

          if (intersectingLetter && word.includes(intersectingLetter)) {
            const intersectionIndex = word.indexOf(intersectingLetter);
            placed = attemptToPlaceWord(
              grid,
              word,
              row,
              col,
              intersectionIndex
            );
            if (placed) break;
          }
        }
        if (placed) break;
      }

      // If the word couldn't be placed, continue with the next word
      if (!placed) {
      }
    }

    setFinalGrid(grid);
    try {
      generateClues(grid, formData);
    } catch {
    }
    return true;
  };

  // Place the first word horizontally in the center
  const placeFirstWord = (grid, word) => {
    const startRow = Math.floor(grid.length / 2);
    const startCol = Math.floor((grid[0].length - word.length) / 2);
    for (let i = 0; i < word.length; i++) {
      grid[startRow][startCol + i] = word[i];
    }
  };

  // Attempt to place the word given a possible intersection point
  const attemptToPlaceWord = (grid, word, row, col, intersectionIndex) => {
    // Try placing horizontally
    const canPlaceHorizontally = checkAndPlace(
      grid,
      word,
      row,
      col,
      intersectionIndex,
      "horizontal"
    );

    if (canPlaceHorizontally) return true;

    // Try placing vertically
    const canPlaceVertically = checkAndPlace(
      grid,
      word,
      row,
      col,
      intersectionIndex,
      "vertical"
    );

    return canPlaceVertically;
  };

  // Check if the word can be placed without interfering with other words
  const checkAndPlace = (
    grid,
    word,
    row,
    col,
    intersectionIndex,
    direction
  ) => {
    const wordLength = word.length;
    const quadrants = [
      [-1, -1],
      [-1, +1],
      [+1, -1],
      [+1, +1],
    ];

    if (direction === "horizontal") {
      const startCol = col - intersectionIndex;
      if (startCol < 0 || startCol + wordLength > grid[0].length) return false;

      for (let i = 0; i < wordLength; i++) {
        const currentCell = grid[row][startCol + i];
        if (currentCell !== "" && currentCell !== word[i]) {
          return false; // Conflict found
        }
      }

      for (let i = 0; i < quadrants.length; i++) {
        const adjustment = quadrants[i];
        const currentCell = grid[row + adjustment[0]][col + adjustment[1]];
        if (currentCell !== "" && currentCell !== word[i]) {
          return false; // Conflict found
        }
      }

      // Place the word horizontally
      for (let i = 0; i < wordLength; i++) {
        grid[row][startCol + i] = word[i];
      }
    } else if (direction === "vertical") {
      const startRow = row - intersectionIndex;

      if (startRow < 0 || startRow + wordLength > grid.length) return false;

      for (let i = 0; i < wordLength; i++) {
        const currentCell = grid[startRow + i][col];
        if (currentCell !== "" && currentCell !== word[i]) {
          return false; // Conflict found
        }
      }

      for (let i = 0; i < quadrants.length; i++) {
        const adjustment = quadrants[i];
        const currentCell = grid[row + adjustment[0]][col + adjustment[1]];
        if (currentCell !== "" && currentCell !== word[i]) {
          return false; // Conflict found
        }
      }

      // Place the word vertically
      for (let i = 0; i < wordLength; i++) {
        grid[startRow + i][col] = word[i];
      }
    }

    return true;
  };

  const generateClues = (finalGrid, formData) => {
    const tempHorizontalClues = [];
    const tempVerticalClues = [];
    let clueIndex = 1;
    const formDataMap = Object.fromEntries(
      formData.map(({ word, clue }) => [word.toUpperCase(), clue])
    );

    for (let row = 0; row < finalGrid.length; row++) {
      for (let col = 0; col < finalGrid[row].length; col++) {
        if (finalGrid[row][col] !== "") {
          // Check for start of horizontal word
          if (
            col + 1 < finalGrid[row].length &&
            finalGrid[row][col + 1] !== "" && // Right cell exists and is non-empty
            (col === 0 || finalGrid[row][col - 1] === "")
          ) {
            let horizontalWord = "";
            let c = col;
            while (c < finalGrid[row].length && finalGrid[row][c] !== "") {
              horizontalWord += finalGrid[row][c];
              c++;
            }

            // Match horizontal word with formData
            if (formDataMap[horizontalWord]) {
              tempHorizontalClues.push({
                number: clueIndex,
                clue: formDataMap[horizontalWord],
                word: horizontalWord,
                position: [row, col],
              });
              clueIndex++;
            }
          }

          // Check for vertical word
          if (
            row + 1 < finalGrid.length &&
            finalGrid[row + 1][col] !== "" && // Below cell exists and is non-empty
            (row === 0 || finalGrid[row - 1][col] === "") // Above cell is either out of bounds or empty
          ) {
            let verticalWord = "";
            let r = row;
            while (r < finalGrid.length && finalGrid[r][col] !== "") {
              verticalWord += finalGrid[r][col];
              r++;
            }

            // Match vertical word with formData
            if (formDataMap[verticalWord]) {
              tempVerticalClues.push({
                number: clueIndex,
                clue: formDataMap[verticalWord],
                word: verticalWord,
                position: [row, col],
              });
              clueIndex++;
            }
          }
        }
      }
    }

    setVerticalClues(tempVerticalClues);
    setHorizontalClues(tempHorizontalClues);
  };

  const generatePin = (length) => {
    let gamePin = "";
    const characters = "abcdefghijklmnopqrstuvwxyz1234567890";

    for (let i = 0; i < length; i++) {
      gamePin += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return gamePin;
  };

  const saveCrossWord = async (e) => {
    const generatedPin = generatePin(6);
    setGamePin(generatedPin);
    const payload = {
      gamePin: generatedPin,
      grid: JSON.stringify(finalGrid),
      across: JSON.stringify(horizontalClues),
      down: JSON.stringify(verticalClues),
    };

    const response = await fetch("/write-to-csv", {
      // No need to specify localhost:3001 due to proxy
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setModalShow(true);
    } else setModalShow(true);
  };

  useEffect(() => {
    createCrossWord(formData);
  }, []);

  return (
    <PositionAll>
      <GamePinModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        gamepin={gamePin}
      />

      <PositionBoth>
        <h1 style={{ marginBottom: "10px" }}>Configure Crossword</h1>
        <p style={{ margin: "0px" }}>Make your crossword!</p>
        <PositionGrid>
          <DisplayCrossWord>{finalGrid}</DisplayCrossWord>
        </PositionGrid>
      </PositionBoth>
      <DisplayClues>
        <ClueList clues={horizontalClues} direction={"Across"} />
        <ClueList clues={verticalClues} direction={"Down"} />
        <StyledButton>
          <button onClick={() => saveCrossWord()}>Save</button>
        </StyledButton>
      </DisplayClues>
    </PositionAll>
  );
};

export default Configure;
