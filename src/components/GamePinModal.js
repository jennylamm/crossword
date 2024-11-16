// src/components/NavigateButton.js
import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import Icon from "../assests/images/blobModal.png";
import copy from "../assests/images/copy.svg";
import tick from "../assests/images/tick.svg";


const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 550px;
  height: 550px;
  background: url(${Icon}) no-repeat center center;
  background-size: cover;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PositionText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 550px; /* Ensures it spans the full height of the modal */
  width: 550px;
  text-align: center;
  color: rgb(62, 21, 21);
`;

const PositionPin = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  padding-left: 10px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

const GamePinModal = (props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.gamepin);
    setIsCopied(true);

        setTimeout(() => {
      setIsCopied(false);
    }, 3000); // Resets after 2 seconds
  };

  return (
    <StyledModal {...props}>
      <PositionText>
        <h3
          style={{
            marginBottom: "0px",
            textSize: "25px",
          }}
        >
          Your Crossword Saved!
        </h3>
        <p>Please copy your game pin.</p>
        <PositionPin>
          <h2>{props.gamepin}</h2>
          <CopyButton type="button" onClick={() => handleCopy()}>
            {isCopied ? (
              <img src={tick} alt="copied" /> // Display the tick icon
            ) : (
              <img src={copy} alt="copy" /> // Display the copy icon
            )}
          </CopyButton>
        </PositionPin>

        <button onClick={props.onHide}>Close</button>
      </PositionText>
    </StyledModal>
  );
};

export default GamePinModal;
