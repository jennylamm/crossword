import React from "react";
import "./Home.css";
// import HomeImage from "../assests/images/HomeImage.png"
import SideBar from "../components/SideBar";
import NavigateButton from "../components/NavigatePage";

function Home() {
  return (
    <div className="Home">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />

      <header className="Home-header">
        {/* <img src={HomeImage} className="App-logo" alt="logo" /> FOR LOGO*/} 
      </header>
      <NavigateButton className="play-button" to="/play">Play</NavigateButton>
    </div>
  );
}

export default Home;
