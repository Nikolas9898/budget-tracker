import React from "react";
import Moment from "moment";
import NavBarMenu from "../../../layout/navBarMenu/NavBarMenu";
import YearlyStyle from "./YearlyStyle.module.css";
import InfoRow from "../components/infoRow/InfoRow";
import {useHistory} from 'react-router-dom'
import axios from "axios";
import moment from "moment";
import YearlyTableRow from "./YearlyTableRow";

export interface State {
  date: any;
  months: { from: any; to: any; expense: number; income: number }[];
  sumIncome: number;
  sumExpense: number;
}

class YearlyContainer extends React.Component {
  state: State = {
    date: new Date(),
    months: [],
    sumIncome: 0,
    sumExpense: 0,
  };

  componentDidMount() {
    this.setYear();
  }
  setYear = async () => {
    let months = [];

    const { date } = this.state;

    if (date.getFullYear() === new Date().getFullYear()) {
      for (let i = 0; i <= date.getMonth(); i++) {
        await months.push({
          from: moment(
            new Date(date.getFullYear(), date.getMonth() + i, 2)
          ).toISOString(),
          to: moment(
            new Date(date.getFullYear(), date.getMonth() + i + 1, 1)
          ).toISOString(),
          income: 0,
          expense: 0,
        });
      }
    }
    if (date.getFullYear() < new Date().getFullYear()) {
      for (let i = 0; i <= 11; i++) {
        await months.push({
          from: moment(
            new Date(date.getFullYear(), date.getMonth() + i, 2)
          ).toISOString(),
          to: moment(
            new Date(date.getFullYear(), date.getMonth() + i + 1, 1)
          ).toISOString(),
          income: 0,
          expense: 0,
        });
      }
    }
    let config = {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjRjZjcyMDIwNTM5MmM3MGU5MmJlZiIsImlhdCI6MTYxMDIyNzAwOH0.bL8WKWjEe1NP2-07udR7ORGkraoavQZEyjtOUd9-5Po",
      },
    };

    axios
      .post(
        `http://localhost:5000/transaction/getYearlyOrWeekly`,
        months,
        config
      )
      .then((data) => {
        this.setState({
          months: data.data.months,
          sumIncome: data.data.sumIncome,
          sumExpense: data.data.sumExpense,
        });
      });
  };
  handleNextYear = async () => {
    let Year = this.state.date.getFullYear();
    let newYear = new Date().setFullYear(Year + 1);

    await this.setState({
      date: new Date(newYear),
      months: [],
    });

    this.setYear();
  };
  handlePreviousYear = async () => {
    let Year = this.state.date.getFullYear();
    let newYear = new Date().setFullYear(Year - 1);

    await this.setState({
      ...this.state,
      date: new Date(newYear),
      months: [],
    });

    this.setYear();
  };


  render() {
    const { date, months, sumExpense, sumIncome } = this.state;
    return (
      <div className={YearlyStyle.wrapper}>
        <NavBarMenu
          handlePreviousMonth={this.handlePreviousYear}
          handleNextMonth={this.handleNextYear}
          date={date}
        />
        <div className={YearlyStyle.container}>
          <table className={YearlyStyle.table}>
            <InfoRow sumIncome={sumIncome} sumExpense={sumExpense} />
            <tbody >
            {months.reverse().map((month, index) => (
                <YearlyTableRow month={month} date={date}/>
            ))}
            </tbody>
          </table>
        </div>

      </div>
    );
  }
}

export default YearlyContainer;
