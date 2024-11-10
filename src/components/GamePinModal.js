// src/components/NavigateButton.js
import React from 'react';
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import Icon from '../assests/images/Modal.svg'



const StyledModal = styled(Modal)`
  position: fixed;
  top: 30%;
  left: 50%;
  width: 500px;
  height: 500px;
  background: url(${Icon}) no-repeat center center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; // Ensures it appears on top of other elements
`

const PositionText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const GamePinModal = (props) => {

    return (
        <>
        <StyledModal
          {...props}
        >
            <PositionText>
          <Modal.Header>
            <Modal.Title >
              Crossword Saved!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Here is your gamepin</h4>
            <h5>Please copy</h5>
            <p>{props.gamePin}</p>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={props.onHide}>Close</button>
          </Modal.Footer>
          </PositionText>

        </StyledModal>

        </>
      );
};

export default GamePinModal;
