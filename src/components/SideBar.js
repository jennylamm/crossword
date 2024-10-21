import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./SideBar.css";


const SideBar = () => {
  return (
    <Menu customBurgerIcon={ <img src={process.env.PUBLIC_URL + "/assets/images/icon.svg"} alt=""/>  }>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/generate">
        Generate
      </a>
      <a className="menu-item" href="/play">
        Play
      </a>

    </Menu>
  );
};

export default SideBar