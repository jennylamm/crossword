import React, { useState } from "react";
import styled from "styled-components";
import img from "../assests/images/RajPlayImage.PNG";
import PlayInput from "../components/PlayInput";
import { useCrossWordData } from "../context/Context";
import PlayableCrossword from "../components/PlayableCrossword";
import GameCompletedModal from "../components/GameCompletedModal";
import ClueList from "../components/ClueList";
import { DisplayClues } from "./Configure";

const PositionAll = styled.div`
  background-image: url(${img});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: rgb(62, 21, 21);
  font-family: "Lexend Deca", sans-serif;
`;

const PositionBoth = styled.div`
  padding-left: 10%;
  padding-top: 5%;
  margin: 30px;
`;

const PositionInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PositionPlayCrossWord = styled.div`
  flex-direction: column;
  align-items: center;
  display: grid;
  grid-template-columns: 5fr 3fr;

`

const PlayCrossWord = ({ setModal }) => {
  const { horizontalClues, verticalClues } = useCrossWordData();

  return (
    <PositionPlayCrossWord>
      <PlayableCrossword setModal={setModal} />
      <DisplayClues>
      <ClueList clues={horizontalClues} direction={"Across"} />
      <ClueList clues={verticalClues} direction={"Down"} />
      </DisplayClues>
    </PositionPlayCrossWord>
  );
};

const Play = () => {
  const { playPinSubmitted } = useCrossWordData();
  const [showCompletedModal, setShowCompletedModal] = useState(false);

  return (
    <PositionAll>
      <GameCompletedModal
        show={showCompletedModal}
        onHide={() => setShowCompletedModal(false)}
      />
      <PositionBoth>
        <h1 style={{ marginBottom: "10px" }}>Play Crossword</h1>
        <p style={{ margin: "0px" }}>Use clues if you're stuck!</p>
      </PositionBoth>
      <PositionInput>
        {playPinSubmitted ? <PlayCrossWord /> : <PlayInput />}
      </PositionInput>
    </PositionAll>
  );
};

export default Play;
