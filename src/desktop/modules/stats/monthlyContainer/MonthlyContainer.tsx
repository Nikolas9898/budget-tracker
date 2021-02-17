import React, { useEffect, useState } from "react";
import NavBarMenu from "../../../layout/navBarMenu/NavBarMenu";
import { PieChart } from "react-minimal-pie-chart";
import moment from "moment";
import axios from "axios";

type Props = {
  sumIncome: number;
  sumExpense: number;
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

const MonthlyContainer = () => {
  const [transactions, setTransactions] = useState<Props["transactions"]>([]);
  const [date, setDate] = useState(new Date());
  const [sumIncome, setSumIncome] = useState(0);
  const [sumExpense, setSumExpense] = useState(0);

  useEffect(() => {
    getTransactions(new Date());
  }, []);

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

  return (
    <div>
      <NavBarMenu
      />

      <div style={{ width: "400px" }}>
        <PieChart
          animate={true}
          label={({ dataEntry }) => dataEntry.title}
          data={[
            { title: "1", value: 10000, color: "#E38627", label: "1" },
            { title: "2", value: 1544, color: "#C13C37" },
            { title: "3", value: 204, color: "#6A2135" },
          ]}
        />
      </div>
    </div>
  );
};

export default MonthlyContainer;
