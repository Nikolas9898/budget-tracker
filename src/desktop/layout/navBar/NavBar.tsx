import React, { useState } from "react";
import NavBarStyle from "./NavBarStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../sideBar/SideBar";

const NavBar = () => {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
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
                  <span className={NavBarStyle.user_email}>georgi_56126@abv.bg</span>
                  <FontAwesomeIcon className={NavBarStyle.menu_down} icon={faCaretDown} />
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
