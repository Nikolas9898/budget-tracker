import React from "react";
import SideBarStyle from "./SideBarStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

type Props={
  sideBarIsOpen:boolean;
  setSideBarIsOpen:(value:boolean)=>void;
}

const SideBar: React.FC<Props> = ({ sideBarIsOpen, setSideBarIsOpen }) => {
  return (
    <div>
      {sideBarIsOpen ? (
        <div className={SideBarStyle.wrapper}>
          <FontAwesomeIcon
            className={SideBarStyle.close_button}
            icon={faTimes}
            onClick={() => setSideBarIsOpen(false)}
          />
          <div className={SideBarStyle.content}>
            <Link to='/transaction/monthly' className={SideBarStyle.title}>Transactions</Link>
            <Link to='/stats/monthly' className={SideBarStyle.title}>Stats</Link>
            <Link to='/export' className={SideBarStyle.title}>Export</Link>
            <Link to='/accounts' className={SideBarStyle.title}>Accounts</Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SideBar;
