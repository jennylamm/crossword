import React , {useState} from "react";
import styled from "styled-components";

const PositionBoth = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const PlayInput = () => {
    const [inputCode, setInputCode] = useState("");

    const handleSubmit = () => {
        console.log("handle submit", inputCode)
    }
  return (
    <>
      <p>Enter your pin to load your crossword</p>
      <PositionBoth>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      </PositionBoth>

      {/* {formDataResult && (
        <div>
          <h2>Form Data:</h2>
          <p>{formDataResult}</p>
        </div>
      )} */}

      {/* Display error message if code is not found */}
      {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
    </>
  );
};

export default PlayInput;
