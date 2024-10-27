import React from "react";
import "./Home.css";
import HomeLogo from "../assests/images/HomeLogo.gif";
import NavigateButton from "../components/NavigatePage";

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={HomeLogo} className="Home-logo" alt="logo" />
        <div className="play-button">
          <NavigateButton to="/play">Play</NavigateButton>
        </div>
      </header>

    </div>
  );
}

export default Home;
