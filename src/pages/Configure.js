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

  const createEmptyGrid = (size = 10) => {
    return Array(size).fill(null).map(() => Array(size).fill('#'));
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
            console.log('intersecting letter', intersectingLetter, row, col, intersectionIndex)
            placed = attemptToPlaceWord(grid, word, row, col, intersectionIndex);
            if (placed) break;
          }
        }
        if (placed) break;
      }
  
      // If the word couldn't be placed, continue with the next word
      if (!placed) {
        console.log(`Could not place the word: ${word}`);
      }
    }

    console.log(grid)
  
    return grid;
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
    const canPlaceHorizontally = checkAndPlace(grid, word, row, col ,intersectionIndex,  'horizontal');
    
    if (canPlaceHorizontally) return true;
    
    // Try placing vertically
    const canPlaceVertically = checkAndPlace(grid, word, row , col , intersectionIndex ,'vertical');
    
    return canPlaceVertically;
  };
  
  // Check if the word can be placed without interfering with other words
  const checkAndPlace = (grid, word, row, col, intersectionIndex, direction) => {
    const wordLength = word.length;
    const quadrants = [[-1, -1], [-1, +1], [+1, -1], [+1,+1]]
  
    if (direction === 'horizontal') {
      console.log('HORIZONTAL', word, `[${row}, ${col}]`)
      const startCol = col - intersectionIndex
      if (startCol < 0 || startCol + wordLength > grid[0].length) return false;
  
      for (let i = 0; i < wordLength; i++) {
        const currentCell = grid[row][startCol + i];
        if (currentCell !== '#' && currentCell !== word[i]) {
          return false; // Conflict found
        }
      }

      for (let i = 0; i < quadrants.length; i ++) {
        const adjustment = quadrants[i]
        const currentCell = grid[row + adjustment[0]][col + adjustment[1]]
        if (currentCell !== '#' && currentCell !== word[i]) {
          return false; // Conflict found
        }
      }
  
      // Place the word horizontally
      for (let i = 0; i < wordLength; i++) {
        grid[row][startCol + i] = word[i];
      }
    } else if (direction === 'vertical') {
      console.log('VERITCAL', word, `[${row}, ${col}]`)
      const startRow = row - intersectionIndex

      if (startRow < 0 || startRow + wordLength > grid.length) return false;
  
      for (let i = 0; i < wordLength; i++) {
        const currentCell = grid[startRow + i][col];
        if (currentCell !== '#' && currentCell !== word[i]) {
          return false; // Conflict found
        }
      }

      for (let i = 0; i < quadrants.length; i ++) {
        const adjustment = quadrants[i]
        const currentCell = grid[row + adjustment[0]][col + adjustment[1]]
        console.log(row + adjustment[0], col + adjustment[1], currentCell)
        if (currentCell !== '#' && currentCell !== word[i]) {
          return false; // Conflict found
        }
      }

      // if( grid[startRow + i][startCol] !=='#')
  
      // Place the word vertically
      for (let i = 0; i < wordLength; i++) {
        grid[startRow + i][col] = word[i];
      }
    }
  
    return true;
  };
  

  const generatePin = (length) => {
    let gamePin = "";
    const characters = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < length; i++) {
      gamePin += characters.charAt(Math.floor(Math.random() * length));
    }
    return gamePin;
  };

  const saveCrossWord = async (e) => {
    const payload = {
      gamePin: generatePin(6),
      formData: JSON.stringify(formData),
    };

    console.log(payload);
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
