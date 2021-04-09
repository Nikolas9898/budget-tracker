import React, { useState } from "react";
import styles from "./HeaderStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../sideBar/SideBar";
import { useSelector } from "react-redux";
import { headerTitle } from "../../helpers/Variables";
import { User, UserReducer } from "../../interfaces/User";
import AccountMenu from "../accountMenu/AccountMenu";
import { TransactionReducer } from "../../interfaces/Transaction";
const NavBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const user = useSelector(
    (state: { userReducer: UserReducer }) => state.userReducer.user
  );

  return (
    <div>
      <nav className={styles.container}>
        <FontAwesomeIcon
          className={styles.menu_bar}
          icon={faBars}
          onClick={() => setIsSideBarOpen(true)}
        />

        <div className={styles.page_title}>
          {headerTitle(window.location.pathname)}
        </div>
        <div className={styles.dropdown}>
          <div className={styles.user_content}>
            <FontAwesomeIcon className={styles.user_email} icon={faUser} />
            <span className={styles.user_email}>{user.email}</span>
            <FontAwesomeIcon className={styles.caret_down} icon={faCaretDown} />
          </div>
          <AccountMenu />
        </div>
      </nav>
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
    </div>
  );
};
export default NavBar;
