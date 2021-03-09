import React from "react";
import NavBarStyle from "./NavBarStyle.module.css";
import { Link } from "react-router-dom";
import Moment from "moment";
import {
  handleNextMonth,
  handleNextYear,
  handlePreviousMonth,
  handlePreviousYear,
} from "../../modules/transaction/actions/transactionActions";
import { useDispatch, useSelector } from "react-redux";
import {
  containerIsTransaction,
  isSelectedTitle,
} from "../../helpers/Variables";
import { TransactionReducer } from "../../helpers/ITransactions";

const NavBarMenu = () => {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { transactionReducer: TransactionReducer }) =>
      state.transactionReducer
  );

  return (
    <div className={NavBarStyle.container}>
      <div className={NavBarStyle.container_navigation}>
        <Link
          to={
            containerIsTransaction(window.location.pathname)
              ? "/transaction/daily"
              : "/stats/daily"
          }
          className={
            isSelectedTitle(window.location.pathname, "daily")
              ? NavBarStyle.title_selected
              : NavBarStyle.title
          }
        >
          Daily
        </Link>

        <Link
          to={
            containerIsTransaction(window.location.pathname)
              ? "/transaction/weekly"
              : "/stats/weekly"
          }
          className={
            isSelectedTitle(window.location.pathname, "weekly")
              ? NavBarStyle.title_selected
              : NavBarStyle.title
          }
        >
          Weekly
        </Link>

        <Link
          to={
            containerIsTransaction(window.location.pathname)
              ? "/transaction/monthly"
              : "/stats/monthly"
          }
          className={
            isSelectedTitle(window.location.pathname, "monthly")
              ? NavBarStyle.title_selected
              : NavBarStyle.title
          }
        >
          Monthly
        </Link>

        <Link
          to={
            containerIsTransaction(window.location.pathname)
              ? "/transaction/yearly"
              : "/stats/yearly"
          }
          className={
            isSelectedTitle(window.location.pathname, "yearly")
              ? NavBarStyle.title_selected
              : NavBarStyle.title
          }
        >
          Yearly
        </Link>

        <Link
          to={
            containerIsTransaction(window.location.pathname)
              ? "/transaction/period"
              : "/stats/period"
          }
          className={
            isSelectedTitle(window.location.pathname, "period")
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
            isSelectedTitle(window.location.pathname, "yearly")
              ? dispatch(handlePreviousYear())
              : dispatch(handlePreviousMonth())
          }
        >
          {"<"}
        </div>
        {isSelectedTitle(window.location.pathname, "yearly")
          ? Moment(state.date).format("YYYY")
          : Moment(state.date).format("MMM YYYY")}
        <div
          className={NavBarStyle.change_month_button}
          onClick={() =>
            isSelectedTitle(window.location.pathname, "yearly")
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
