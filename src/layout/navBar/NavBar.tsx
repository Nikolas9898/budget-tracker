import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import {
  handleNextMonth,
  handleNextYear,
  handlePreviousMonth,
  handlePreviousYear,
} from "../../modules/transaction/actions/transactionActions";
import {
  isTransactionContainer,
  isSelectedTitle,
} from "../../helpers/Variables";
import { TransactionReducer } from "../../models/Transaction";
import styles from "./NavBarStyle.module.css";

const NavBarMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const state = useSelector(
    (state: { transactionReducer: TransactionReducer }) =>
      state.transactionReducer
  );

  return (
    <div className={styles.container}>
      <div className={styles.container_navigation}>
        <Link
          to={
            isTransactionContainer(location.pathname)
              ? "/transaction/daily"
              : "/stats/daily"
          }
          className={
            isSelectedTitle(location.pathname, "daily")
              ? styles.title_selected
              : styles.title
          }
        >
          Daily
        </Link>

        <Link
          to={
            isTransactionContainer(location.pathname)
              ? "/transaction/weekly"
              : "/stats/weekly"
          }
          className={
            isSelectedTitle(location.pathname, "weekly")
              ? styles.title_selected
              : styles.title
          }
        >
          Weekly
        </Link>

        <Link
          to={
            isTransactionContainer(location.pathname)
              ? "/transaction/monthly"
              : "/stats/monthly"
          }
          className={
            isSelectedTitle(location.pathname, "monthly")
              ? styles.title_selected
              : styles.title
          }
        >
          Monthly
        </Link>

        <Link
          to={
            isTransactionContainer(location.pathname)
              ? "/transaction/yearly"
              : "/stats/yearly"
          }
          className={
            isSelectedTitle(location.pathname, "yearly")
              ? styles.title_selected
              : styles.title
          }
        >
          Yearly
        </Link>

        <Link
          to={
            isTransactionContainer(location.pathname)
              ? "/transaction/period"
              : "/stats/period"
          }
          className={
            isSelectedTitle(location.pathname, "period")
              ? styles.title_selected
              : styles.title
          }
        >
          Period
        </Link>
      </div>
      <div className={styles.change_month_content}>
        <div
          className={styles.change_month_button}
          onClick={() =>
            isSelectedTitle(location.pathname, "yearly")
              ? dispatch(handlePreviousYear())
              : dispatch(handlePreviousMonth())
          }
        >
          {"<"}
        </div>
        {isSelectedTitle(location.pathname, "yearly")
          ? Moment(state.date).format("YYYY")
          : Moment(state.date).format("MMM YYYY")}
        <div
          className={styles.change_month_button}
          onClick={() =>
            isSelectedTitle(location.pathname, "yearly")
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