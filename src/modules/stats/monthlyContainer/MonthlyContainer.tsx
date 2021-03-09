import React, { useEffect, useState } from "react";
import NavBarMenu from "../../../layout/navBar/NavBar";
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
      .then(data => {
        setTransactions(data.data.transactions);
        setSumExpense(data.data.sumExpense);
        setSumIncome(data.data.sumIncome);
      });
  };
  const data = [
    {
      category: "food",
      value: 16900,
      color: "#E38627",
      label: "category",
    },
    { category: "2", value: 1544, color: "#C13C37" },
    { category: "3", value: 204, color: "#6A2135" },
  ];
  return (
    <div>
      <NavBarMenu />

      <div style={{ width: "400px" }}>
        <PieChart
          labelStyle={index => ({
            fontSize: "5px",
            fontFamily: "sans-serif",
          })}
          radius={42}
          labelPosition={112}
          animate={true}
          label={({ dataEntry }) => dataEntry.category}
          data={data}
        />
      </div>
    </div>
  );
};

export default MonthlyContainer;
