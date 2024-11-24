import React from "react";
import styled from "styled-components";
import img from "../assests/images/RajPlayImage.PNG";
import PlayInput from "../components/PlayInput";
import { useCrossWordData } from "../context/Context";
import PlayableCrossword from "../components/PlayableCrossword";

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

const Play = () => {
  const { playPinSubmitted, finalGrid } = useCrossWordData();

  console.log("play", finalGrid)

  return (
    <PositionAll>
      <PositionBoth>
        <h1 style={{ marginBottom: "10px" }}>Play</h1>
      </PositionBoth>
      <PositionInput>
        {playPinSubmitted? <PlayableCrossword/> : <PlayInput />}
      </PositionInput>
    </PositionAll>
  );
};

export default Play;
