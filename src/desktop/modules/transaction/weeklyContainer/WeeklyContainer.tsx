import NavBar from "../components/navBar/NavBar";
import Moment from "moment";
import React from "react";
import WeeklyStyle from "./WeeklyStyle.module.css";

export interface State {
  date: any;
  weeks: { From: any; To: any }[];
}

class WeeklyContainer extends React.Component {
  state: State = {
    date: new Date(),
    weeks: [
    ],
  };
componentDidMount() {
  this.TakeWeeks(new Date())
}

  handleNextMonth = () => {
    let Month = new Date(this.state.date).getMonth();
    let Year = this.state.date.getFullYear();
    let newMonth = new Date(Year, Month + 1);
    this.setState({
      date: new Date(newMonth),
    });
    this.TakeWeeks(newMonth)
  };
  handlePreviousMonth = () => {
    let Month = new Date(this.state.date).getMonth();
    let Year = this.state.date.getFullYear();
    let newMonth = new Date(Year, Month - 1);
    this.setState({
      date: new Date(newMonth),
    });
    this.TakeWeeks(newMonth)
  };
  TakeWeeks=(date:any)=>{
    let from=Moment(date).startOf('month').startOf('week').get('date')
    let to=Moment(date).startOf('month').endOf('week').get('date')
    const newWeek={
     From:new Date(2020,11,from),
      To:new Date(2020,11,to)
    }
   this.setState({weeks:[...this.state.weeks,newWeek]})

  }
  render() {
    return (
      <div className={WeeklyStyle.wrapper}>
        <NavBar
          handlePreviousMonth={this.handlePreviousMonth}
          handleNextMonth={this.handleNextMonth}
          date={this.state.date}
        />

        <div className={WeeklyStyle.info_row}>
          <div>
            <label className={WeeklyStyle.info_title}>Income</label>
            <div className={WeeklyStyle.income}>{(0 / 100).toFixed(2)}</div>
          </div>
          <div>
            <label className={WeeklyStyle.info_title}>Expense</label>
            <div className={WeeklyStyle.expense}>{(0 / 100).toFixed(2)}</div>
          </div>
          <div>
            <label className={WeeklyStyle.info_title}>Total</label>
            <div className={WeeklyStyle.total}>{(0 / 100).toFixed(2)}</div>
          </div>
        </div>
        {this.state.weeks.map((w) => (
          <div className={WeeklyStyle.container_row}>
            <div className={WeeklyStyle.date}>
              {Moment(w.From).format("DD.MM")} ~ {Moment(w.To).format("DD.MM")}
            </div>
            <div className={WeeklyStyle.income}>$ {(0 / 100).toFixed(2)}</div>
            <div className={WeeklyStyle.expense}>$ {(0 / 100).toFixed(2)}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default WeeklyContainer;
