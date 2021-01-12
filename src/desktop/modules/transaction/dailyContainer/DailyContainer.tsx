import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar/NavBar";
import DailyStyle from "./DailyStyle.module.css";
import InfoRow from "../components/infoRow/InfoRow";
import Moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import axios from "axios";

type Props = {
  transactions: {
    createdAt: any;
    income: number;
    expense: number;
    events: {
      type: string;
      date: any;
      account?: string;
      from?: string;
      to?: string;
      category?: string;
      amount: number;
      note: string;
      description: string;
    }[];
  }[];
};

const DailyContainer = () => {
  const [transactions, setTransactions] = useState<Props["transactions"]>([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getTransactions(new Date());
  }, []);

  const getTransactions = (date: any) => {
    let firstDay = moment(
      new Date(date.getFullYear(), date.getMonth(), 1)
    ).toISOString();
    let lastDay = moment(
      new Date(date.getFullYear(), date.getMonth() + 1, 0)
    ).toISOString();
    let config = {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjRjZjcyMDIwNTM5MmM3MGU5MmJlZiIsImlhdCI6MTYxMDIyNzAwOH0.bL8WKWjEe1NP2-07udR7ORGkraoavQZEyjtOUd9-5Po",
      },
    };
    axios
      .get(
        `http://localhost:5000/transaction/specificDatePeriod/${firstDay}/${lastDay}`,
        config
      )
      .then((data) => {
        setTransactions(data.data);
      });
  };

  const handlePreviousMonth = () => {
    let Month = new Date(date).getMonth();
    let Year = date.getFullYear();
    let newMonth = new Date(Year, Month - 1);
    setDate(new Date(newMonth));
    getTransactions(new Date(newMonth));
  };
  const handleNextMonth = () => {
    let Month = new Date(date).getMonth();
    let Year = date.getFullYear();
    let newMonth = new Date(Year, Month + 1);
    setDate(new Date(newMonth));
    getTransactions(new Date(newMonth));
  };
  return (
    <div className={DailyStyle.wrapper}>
      <NavBar
        handlePreviousMonth={handlePreviousMonth}
        handleNextMonth={handleNextMonth}
        date={date}
      />
      <InfoRow />
      <div className={DailyStyle.table}>
        {transactions.sort(function(a, b){return new Date(a.createdAt).getDate()-new Date(b.createdAt).getDate()}).reverse().map((transaction) => (
          <div className={DailyStyle.container}>
            <div className={DailyStyle.content_row}>
              <div className={DailyStyle.date_content}>
                <div className={DailyStyle.date}>
                  {Moment(transaction.createdAt).format("DD")}
                </div>
                <div>
                  <div className={DailyStyle.date_year}>
                    {Moment(transaction.createdAt).format("MM.YYYY")}
                  </div>
                  <div className={DailyStyle.date_day}>
                    {Moment(transaction.createdAt).format("ddd")}
                  </div>
                </div>
              </div>
              <div className={DailyStyle.income}>
                $ {(transaction.income / 100).toFixed(2)}
              </div>
              <div className={DailyStyle.expense}>
                $ {(transaction.expense / 100).toFixed(2)}
              </div>
            </div>
            {transaction.events.map((event) => (
              <div className={DailyStyle.content_row}>
                <div className={DailyStyle.category}>
                  {event.category} {event.account}
                  {event.from} {event.to}
                </div>
                <div className={DailyStyle.income}>
                  {event.type === "income"
                    ? <div>$ {(event.amount / 100).toFixed(2)}</div>
                    : null}
                </div>
                <div className={DailyStyle.expense}>
                  {event.type === "expense"||event.type === "transfer"
                    ? <div>${(event.amount / 100).toFixed(2)}</div>
                    : null}
                </div>
              </div>
            ))}
          </div>
        ))}
        <FontAwesomeIcon
          className={DailyStyle.add_button}
          icon={faPlusCircle}
        />
      </div>
    </div>
  );
};

export default DailyContainer;
