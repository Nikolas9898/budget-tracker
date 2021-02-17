import React from "react";
import NavBarStyle from "./NavBarMenuStyle.module.css";
import { Link } from "react-router-dom";
import Moment from "moment";
import {
  handleNextMonth,
  handleNextYear,
  handlePreviousMonth,
  handlePreviousYear,
} from "../../modules/transaction/actions/transactionActions";
import { useDispatch, useSelector } from "react-redux";

const NavBarMenu = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.transaction);

  let containerIsYearly: boolean =
    window.location.pathname === "/transaction/yearly" ||
    window.location.pathname === "/stats/yearly";

  let containerIsTransaction: boolean = window.location.pathname.includes(
    "transaction"
  );
  return (
    <div className={NavBarStyle.container}>
      <div className={NavBarStyle.container_navigation}>
        <Link
          to={containerIsTransaction ? "/transaction/daily" : "/stats/daily"}
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
          to={containerIsTransaction ? "/transaction/weekly" : "/stats/weekly"}
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
            containerIsTransaction ? "/transaction/monthly" : "/stats/monthly"
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
          to={containerIsTransaction ? "/transaction/yearly" : "/stats/yearly"}
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
          to={containerIsTransaction ? "/transaction/period" : "/stats/period"}
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
          onClick={() =>
            containerIsYearly
              ? dispatch(handlePreviousYear())
              : dispatch(handlePreviousMonth())
          }
        >
          {"<"}
        </div>
        {containerIsYearly
          ? Moment(state.date).format("YYYY")
          : Moment(state.date).format("MMM YYYY")}
        <div
          className={NavBarStyle.change_month_button}
          onClick={() =>
            containerIsYearly
              ? dispatch(handleNextYear())
              : dispatch(handleNextMonth())
          }
        >
          {">"}
        </div>
      </div>
    </div>
  );
};

export default NavBarMenu;
