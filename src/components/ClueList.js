import React from "react";

const ClueList = ({ clues, direction }) => {
    return (
      <>
        <h4 style={{ marginBottom: "3px" }}>{direction}</h4>
  
        {clues.map((clue, index) => (
          <div key={index} className="clue-item">
            <div className="clue-text">
              {clue.number}. {clue.clue}
            </div>
          </div>
        ))}
      </>
    );
  };

export default ClueList