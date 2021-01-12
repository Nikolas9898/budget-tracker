import React from "react";
import NavBarStyle from "./NavBarStyle.module.css";
import { Link } from "react-router-dom";
import Moment from "moment";

type Props = {
  handlePreviousMonth: () => void;
  handleNextMonth: () => void;
  date: any;
};

const NavBar: React.FC<Props> = ({
  handlePreviousMonth,
  handleNextMonth,
  date,
}) => {
  return (
    <div className={NavBarStyle.container}>
      <div className={NavBarStyle.container_navigation}>
        <Link
          to={"/transaction/daily"}
          className={
            window.location.pathname === "/transaction/daily"
              ? NavBarStyle.title_selected
              : NavBarStyle.title
          }
        >
          Daily
        </Link>

        <Link
          to={"/transaction/weekly"}
          className={
            window.location.pathname === "/transaction/weekly"
              ? NavBarStyle.title_selected
              : NavBarStyle.title
          }
        >
          Weekly
        </Link>

        <Link
          to={"/transaction/monthly"}
          className={
            window.location.pathname === "/transaction/monthly"
              ? NavBarStyle.title_selected
              : NavBarStyle.title
          }
        >
          Monthly
        </Link>

        <Link
          to={"/transaction/yearly"}
          className={
            window.location.pathname === "/transaction/yearly"
              ? NavBarStyle.title_selected
              : NavBarStyle.title
          }
        >
          Yearly
        </Link>

        <Link
          to={"/transaction/period"}
          className={
            window.location.pathname === "/transaction/period"
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
        { window.location.pathname === "/transaction/yearly"?
            Moment(date).format("YYYY"):
            Moment(date).format("MMM YYYY")
        }

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

export default NavBar;
