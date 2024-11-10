import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./SideBar.css";
import Icon from '../assests/images/Icon.svg'


const SideBar = () => {

  return (
    <Menu customBurgerIcon={ <img src={Icon} alt=""/>  }>
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