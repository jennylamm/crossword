// src/components/NavigateButton.js
import React from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import Icon from "../assests/images/blobModal.png";

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

const GameCompletedModal = (props) => {
  return (
    <StyledModal {...props}>
      <PositionText>
        <h2
          style={{
            marginBottom: "0px",
            textSize: "25px",
          }}
        >
          Congratulations!
        </h2>
        <h3
          style={{
            marginBottom: "0px",
          }}
        >
          ٩(＾◡＾)۶
        </h3>
        <p
          style={{
            width: "250px",
          }}
        >
          You did it
        </p>
        <button onClick={props.onHide}>Close</button>
      </PositionText>
    </StyledModal>
  );
};

export default GameCompletedModal;
