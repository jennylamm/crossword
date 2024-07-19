import React from "react";
import "./Home.css";
// import HomeImage from "../assests/images/HomeImage.png"
import SideBar from "../components/SideBar";

function Home() {
  return (
    <div className="App">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />

      <header className="App-header">
        {/* <img src={HomeImage} className="App-logo" alt="logo" /> FOR LOGO*/} 
      </header>
    </div>
  );
}

export default Home;
