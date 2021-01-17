import NavBarMenu from "../../../layout/navBarMenu/NavBarMenu";
import Moment from "moment";
import React from "react";
import WeeklyStyle from "./WeeklyStyle.module.css";
import InfoRow from "../components/infoRow/InfoRow";
import moment from "moment";
import axios from "axios";

export interface State {
  date: any;
  weeks: { from: any; to: any; income: number; expense: number }[];
  sumIncome: number;
  sumExpense: number;
}

class WeeklyContainer extends React.Component {
  state: State = {
    date: new Date(),
    weeks: [],
    sumIncome: 0,
    sumExpense: 0,
  };
  componentDidMount() {
    this.TakeWeeks(new Date());
  }

  handleNextMonth = () => {
    let Month = new Date(this.state.date).getMonth();
    let Year = this.state.date.getFullYear();
    let newMonth = new Date(Year, Month + 1);
    this.setState({
      date: new Date(newMonth),
    });
    this.TakeWeeks(newMonth);
  };
  handlePreviousMonth = () => {
    let Month = new Date(this.state.date).getMonth();
    let Year = this.state.date.getFullYear();
    let newMonth = new Date(Year, Month - 1);
    this.setState({
      date: new Date(newMonth),
    });
    this.TakeWeeks(newMonth);
  };

  TakeWeeks = async (date: any) => {
    let firstWeekDay = moment(date)
      .startOf("month")
      .startOf("week")
      .get("date");
    let firstWeekMonth = moment(date)
      .startOf("month")
      .startOf("week")
      .get("month");
    let firstWeekYear = moment(date)
      .startOf("month")
      .startOf("week")
      .get("year");

    let firstWeekLastDay = moment(date)
      .startOf("month")
      .endOf("week")
      .get("date");
    let firstWeekLastMonth = moment(date)
      .startOf("month")
      .endOf("week")
      .get("month");
    let firstWeekLastYear = moment(date)
      .startOf("month")
      .endOf("week")
      .get("year");

    let lastWeekDay = moment(date).endOf("month").startOf("week").get("date");

    let lastWeekMonth = moment(date)
      .endOf("month")
      .startOf("week")
      .get("month");

    let lastWeekYear = moment(date).endOf("month").startOf("week").get("year");

    let lastWeekLastDay = moment(date).endOf("month").endOf("week").get("date");
    let lastWeekLastMonth = moment(date)
      .endOf("month")
      .endOf("week")
      .get("month");
    let lastWeekLastYear = moment(date)
      .endOf("month")
      .endOf("week")
      .get("year");

    let weeks = [];

    weeks.push({
      from: new Date(firstWeekYear, firstWeekMonth, firstWeekDay),
      to: new Date(firstWeekLastYear, firstWeekLastMonth, firstWeekLastDay),
      income: 0,
      expense: 0,
    });

    for (let i = firstWeekLastDay + 1; i <= lastWeekDay - 7; i = i + 7) {
      weeks.push({
        from: new Date(date.getFullYear(), date.getMonth(), i),
        to: new Date(date.getFullYear(), date.getMonth(), i + 6),
        income: 0,
        expense: 0,
      });
    }

    weeks.push({
      from: new Date(lastWeekYear, lastWeekMonth, lastWeekDay),
      to: new Date(lastWeekLastYear, lastWeekLastMonth, lastWeekLastDay),
      income: 0,
      expense: 0,
    });

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
        weeks,
        config
      )
      .then((data) => {
        this.setState({
          weeks: data.data.months,
          sumIncome: data.data.sumIncome,
          sumExpense: data.data.sumExpense,
        });
      });
  };
  render() {
    const { sumIncome, sumExpense } = this.state;
    return (
      <div className={WeeklyStyle.wrapper}>
        <NavBarMenu
          handlePreviousMonth={this.handlePreviousMonth}
          handleNextMonth={this.handleNextMonth}
          date={this.state.date}
        />
        <InfoRow sumExpense={sumExpense} sumIncome={sumIncome} />
        {this.state.weeks.reverse().map((week, index) => (
          <div key={index} className={WeeklyStyle.container_row}>
            <div className={WeeklyStyle.date}>
              {Moment(week.from).format("DD.MM")} ~{" "}
              {Moment(week.to).format("DD.MM")}
            </div>
            <div className={WeeklyStyle.income}>
              $ {(week.income / 100).toFixed(2)}
            </div>
            <div className={WeeklyStyle.expense}>
              $ {(week.expense / 100).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default WeeklyContainer;
