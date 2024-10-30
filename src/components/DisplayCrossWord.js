// src/components/CrosswordForm.js
import React from "react";
import styled from "styled-components";
import { useCrossWordData } from "../context/Context";

const PositionGrid = styled.div`
    --cell-size: 32px; /* Adjust this value to change the size of cells */
    max-width: calc(var(--cell-size) * 15);
    max-height: calc(var(--cell-size) * 15);
`;

const PositionRow = styled.div`
    display: flex;
`;

const PositionCell = styled.div`
    width: var(--cell-size);
    height: var(--cell-size);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(var(--cell-size) * 0.5); /* Font size relative to cell size */
    background-color: ${props => (props.blocked ? '#333333E6' : '#ffffffE6')};
`;

const DisplayCrossWord = () => {
  const { finalGrid } = useCrossWordData();



  return (
    <PositionGrid>
            {finalGrid.map((row, rowIndex) => (
                <PositionRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <PositionCell 
                            key={cellIndex} 
                            blocked={cell === ''}
                        >
                            {cell !== '' ? cell : ''}
                        </PositionCell>
                    ))}
                </PositionRow>
            ))}
        </PositionGrid>
  );
};

export default DisplayCrossWord;
