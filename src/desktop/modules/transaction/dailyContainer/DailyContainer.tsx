import React, { useState } from "react";
import NavBar from "../components/navBar/NavBar";
import DailyStyle from "./DailyStyle.module.css";
import InfoRow from "../components/infoRow/InfoRow";
import Moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const DailyContainer = () => {
  const [transactions, setTransactions] = useState([
    {
      date:
        "Thu Dec 31 2020 00:00:00 GMT+0200 (Eastern European Standard Time)",
      income: 10002,
      expense: 10000,
      events: [
        {
          type: "income",
          account: "Cash",
          category: "Culture",
          amount: 10000,
        },
      ],
    },
    {
      date:
        "Thu Dec 31 2020 00:00:00 GMT+0200 (Eastern European Standard Time)",
      income: 10022,
      expense: 10003,
      events: [
        {
          type: "expense",
          account: "Cash",
          category: "Culture",
          amount: 10000,
        },
      ],
    },
    {
      date:
        "Thu Dec 31 2020 00:00:00 GMT+0200 (Eastern European Standard Time)",
      income: 10002,
      expense: 10003,
      events: [
        {
          type: "income",
          account: "Cash",
          category: "Culture",
          amount: 10000,
        },
      ],
    },
  ]);
  const [date, setDate] = useState(new Date());

  const handlePreviousMonth = () => {
    let Month = new Date(date).getMonth();
    let Year = date.getFullYear();
    let newMonth = new Date(Year, Month - 1);
    setDate(new Date(newMonth));
  };
  const handleNextMonth = () => {
    let Month = new Date(date).getMonth();
    let Year = date.getFullYear();
    let newMonth = new Date(Year, Month + 1);
    setDate(new Date(newMonth));
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
        {transactions.map((transaction) => (
          <div className={DailyStyle.container}>
            <div className={DailyStyle.content_row}>
              <div className={DailyStyle.date_content}>
                <div className={DailyStyle.date}>
                  {Moment(transaction.date).format("DD")}
                </div>
                <div>
                  <div className={DailyStyle.date_year}>
                    {Moment(transaction.date).format("MM.YYYY")}
                  </div>
                  <div className={DailyStyle.date_day}>
                    {Moment(transaction.date).format("ddd")}
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
                <div className={DailyStyle.category}> {event.category}</div>
                <div className={DailyStyle.category}>{event.account}</div>
                <div
                  className={
                    event.type === "income"
                      ? DailyStyle.income
                      : DailyStyle.expense
                  }
                >
                  {" "}
                  $ {(event.amount / 100).toFixed(2)}
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
