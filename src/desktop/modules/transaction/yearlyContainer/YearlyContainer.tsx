import React from "react";
import Moment from "moment";
import NavBar from "../components/navBar/NavBar";
import YearlyStyle from "./YearlyStyle.module.css";
import InfoRow from "../components/infoRow/InfoRow";
import {Link} from 'react-router-dom'

export interface State {
  date: any;
  months: { date: any }[];
}

class YearlyContainer extends React.Component {
  state: State = {
    date: new Date(),
    months: [],
  };

  componentDidMount() {
    this.setYear();
  }
  setYear = () => {
    let months = [];

    const { date } = this.state;

    if (date.getFullYear() === new Date().getFullYear()) {
      for (let i = 0; i <= date.getMonth(); i++) {
        this.state.months.push({ date: new Date().setMonth(i) });
      }
    }
    if (date.getFullYear() < new Date().getFullYear()) {
      for (let i = 0; i <= 11; i++) {
        this.state.months.push({ date: new Date(date).setMonth(i) });
      }
    }
    this.setState({});
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
            <Link className={YearlyStyle.content_row} to={`/transaction/monthly?date=${month.date}`}>
              <div
                className={
                  new Date(date).getMonth() === new Date(month.date).getMonth()&&
                  new Date(date).getFullYear()===new Date(month.date).getFullYear()
                    ? YearlyStyle.month_selected
                    : YearlyStyle.month
                }
              >
                {console.log( Moment(month.date).format("MMM.YYYY"))}
                {Moment(month.date).format("MMM")}
              </div>
              <div className={YearlyStyle.income}>
                {" "}
                $ {(10000 / 100).toFixed(2)}
              </div>
              <div className={YearlyStyle.expense}>
                {" "}
                $ {(10000 / 100).toFixed(2)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default YearlyContainer;
