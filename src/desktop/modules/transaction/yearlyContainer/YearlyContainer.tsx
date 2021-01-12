import React from "react";
import Moment from "moment";
import NavBar from "../components/navBar/NavBar";
import YearlyStyle from "./YearlyStyle.module.css";
import InfoRow from "../components/infoRow/InfoRow";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export interface State {
  date: any;
  months: { from: any; to: any; expense: number; income: number }[];
}

class YearlyContainer extends React.Component {
  state: State = {
    date: new Date(),
    months: [],
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
            new Date(date.getFullYear(), date.getMonth()+i, 2)
          ).toISOString(),
          to: moment(
            new Date(date.getFullYear(), date.getMonth()+i+1, 1)
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
            new Date(date.getFullYear(), date.getMonth()+i, 2)
          ).toISOString(),
          to: moment(
            new Date(date.getFullYear(), date.getMonth()+i+1, 1)
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
        console.log(data)
        this.setState({ months: data.data });
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
    const { date, months } = this.state;
    return (
      <div className={YearlyStyle.wrapper}>
        <NavBar
          handlePreviousMonth={this.handlePreviousYear}
          handleNextMonth={this.handleNextYear}
          date={date}
        />
        <InfoRow />
        <div className={YearlyStyle.table}>
          {months.reverse().map((month) => (
            <Link
              className={YearlyStyle.content_row}
              to={`/transaction/monthly?date=${month.from}`}
            >

              <div
                className={
                  new Date(date).getMonth() ===
                    new Date(month.from).getMonth() &&
                  new Date().getFullYear() ===
                    new Date(month.from).getFullYear()
                    ? YearlyStyle.month_selected
                    : YearlyStyle.month
                }
              >
                {Moment(month.from).format("MMM")}
              </div>
              <div className={YearlyStyle.income}>
                {" "}
                $ {(month.income/100).toFixed(2)}
              </div>
              <div className={YearlyStyle.expense}>
                {" "}
                $ {(month.expense/100).toFixed(2)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default YearlyContainer;
