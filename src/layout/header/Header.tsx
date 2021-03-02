import React, { useState } from "react";
import NavBarStyle from "./HeaderStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../sideBar/SideBar";
import { useSelector } from "react-redux";
const NavBar = () => {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
  let user = useSelector((state: any) => state.user.user);
  return (
    <div>
      <nav className={NavBarStyle.container}>
        <FontAwesomeIcon
          className={NavBarStyle.menu_bar}
          icon={faBars}
          onClick={() => setSideBarIsOpen(true)}
        />
        <div className={NavBarStyle.page_title}>Transaction</div>
        <div className={NavBarStyle.user_content}>
          <FontAwesomeIcon className={NavBarStyle.user_email} icon={faUser} />
          <span className={NavBarStyle.user_email}>{user.email}</span>
          <FontAwesomeIcon
            className={NavBarStyle.menu_down}
            icon={faCaretDown}
          />
        </div>
      </nav>
      <SideBar
        sideBarIsOpen={sideBarIsOpen}
        setSideBarIsOpen={setSideBarIsOpen}
      />
    </div>
  );
};
export default NavBar;
