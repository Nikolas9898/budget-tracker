import React, { useEffect, useState } from "react";
import NavBarMenu from "../../../layout/navBarMenu/NavBarMenu";
import DailyStyle from "./DailyStyle.module.css";
import InfoRow from "../components/infoRow/InfoRow";
import Moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import axios from "axios";
import DailyTableRow from "./components/dailyTableRow/DailyTableRow";

type Props = {
  sumIncome: number;
  sumExpense: number;
  event: {
    _id: string;
    type: string;
    date: any;
    account?: string;
    from?: string;
    to?: string;
    category?: string;
    amount: number;
    fees: number;
    note: string;
    description: string;
  };
  transactions: {
    _id: string;
    createdAt: any;
    income: number;
    expense: number;
    events: Props["event"][];
  }[];
};

const DailyContainer = () => {
  const [transactions, setTransactions] = useState<Props["transactions"]>([]);
  const [date, setDate] = useState(new Date());
  const [sumIncome, setSumIncome] = useState(0);
  const [sumExpense, setSumExpense] = useState(0);
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
        setTransactions(data.data.transactions);
        setSumExpense(data.data.sumExpense);
        setSumIncome(data.data.sumIncome);
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
      <NavBarMenu
        handlePreviousMonth={handlePreviousMonth}
        handleNextMonth={handleNextMonth}
        date={date}
      />
      <div className={DailyStyle.container}>
        <table className={DailyStyle.table}>

          <InfoRow sumIncome={sumIncome} sumExpense={sumExpense} />

          {transactions
              .sort(function (a, b) {
                return (
                    new Date(a.createdAt).getDate() -
                    new Date(b.createdAt).getDate()
                );
              })
              .reverse()
              .map((transaction) => (
                  <tbody className={DailyStyle.table_container}>
                  <tr>
                    <th>
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
                    </th>
                    <th>
                      <div className={DailyStyle.income}>
                        {(transaction.income / 100).toFixed(2)}
                      </div>
                    </th>
                    <th>
                      <div className={DailyStyle.expense}>
                        {(transaction.expense / 100).toFixed(2)}
                      </div>
                    </th>
                  </tr>
                  {transaction.events.map((event) => (
                      <DailyTableRow event={event} key={event._id} />
                  ))}

                  </tbody>
              ))}

        </table>
        <FontAwesomeIcon className={DailyStyle.add_button} icon={faPlusCircle} />
      </div>


    </div>
  );
};

export default DailyContainer;
