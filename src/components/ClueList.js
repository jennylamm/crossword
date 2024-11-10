import React from "react";

const ClueList = ({ clues, direction }) => {
    return (
      <div>
        <div className="clue-number">{direction}</div>
  
        {clues.map((clue, index) => (
          <div key={index} className="clue-item">
            <div className="clue-text">
              {clue.number}. {clue.clue}
            </div>
          </div>
        ))}
      </div>
    );
  };

export default ClueList