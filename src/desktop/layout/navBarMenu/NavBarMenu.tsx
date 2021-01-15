import React from "react";
import NavBarStyle from "./NavBarMenuStyle.module.css";
import { Link } from "react-router-dom";
import Moment from "moment";

type Props = {
  handlePreviousMonth: () => void;
  handleNextMonth: () => void;
  date: any;
};

const NavBarMenu: React.FC<Props> = ({
  handlePreviousMonth,
  handleNextMonth,
  date,
}) => {
  return (
    <div className={NavBarStyle.container}>
      <div className={NavBarStyle.container_navigation}>
        <Link
          to={
            window.location.pathname.includes("transaction")
              ? "/transaction/daily"
              : "/stats/daily"
          }
          className={
            window.location.pathname === "/transaction/daily" ||
            window.location.pathname === "/stats/daily"
              ? NavBarStyle.title_selected
              : NavBarStyle.title
          }
        >
          Daily
        </Link>

        <Link
          to={
            window.location.pathname.includes("transaction")
              ? "/transaction/weekly"
              : "/stats/weekly"
          }
          className={
            window.location.pathname === "/transaction/weekly" ||
            window.location.pathname === "/stats/weekly"
              ? NavBarStyle.title_selected
              : NavBarStyle.title
          }
        >
          Weekly
        </Link>

        <Link
          to={
            window.location.pathname.includes("transaction")
              ? "/transaction/monthly"
              : "/stats/monthly"
          }
          className={
            window.location.pathname === "/transaction/monthly" ||
            window.location.pathname === "/stats/monthly"
              ? NavBarStyle.title_selected
              : NavBarStyle.title
          }
        >
          Monthly
        </Link>

        <Link
          to={
            window.location.pathname.includes("transaction")
              ? "/transaction/yearly"
              : "/stats/yearly"
          }
          className={
            window.location.pathname === "/transaction/yearly" ||
            window.location.pathname === "/stats/yearly"
              ? NavBarStyle.title_selected
              : NavBarStyle.title
          }
        >
          Yearly
        </Link>

        <Link
          to={
            window.location.pathname.includes("transaction")
              ? "/transaction/period"
              : "/stats/period"
          }
          className={
            window.location.pathname === "/transaction/period" ||
            window.location.pathname === "/stats/period"
              ? NavBarStyle.title_selected
              : NavBarStyle.title
          }
        >
          Period
        </Link>
      </div>
      <div className={NavBarStyle.change_month_content}>
        <div
          className={NavBarStyle.change_month_button}
          onClick={() => handlePreviousMonth()}
        >
          {"<"}
        </div>
        {window.location.pathname === "/transaction/yearly" ||
        window.location.pathname === "/stats/yearly"
          ? Moment(date).format("YYYY")
          : Moment(date).format("MMM YYYY")}

        <div
          className={NavBarStyle.change_month_button}
          onClick={() => handleNextMonth()}
        >
          {">"}
        </div>
      </div>
    </div>
  );
};

export default NavBarMenu;
