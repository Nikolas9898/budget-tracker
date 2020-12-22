import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import TransactionStyl from "./TransactionStyle.module.css";
import AddTransactionModal from "./components/addTransactionModal/AddTransactionModal";

interface State {
  isAddTransactionOpen: boolean;
  weeks: {
    day: number;
    month: number;
    year: number;
  }[];
  week: {
    From: {
      day: number;
      month: number;
      year: number;
    };
    To: {
      day: number;
      month: number;
      year: number;
    };
  }[];
  events: {
    date: {
      day: number;
      month: number;
      year: number;
    };
    income: number;
    expense: number;
  }[];
}
class TransactionContainer extends React.Component {
  state: State = {
    isAddTransactionOpen: false,
    weeks: [],
    week: [],
    events: [
      {
        date: { day: 12, month: 11, year: 2020 },
        income: 100.2,
        expense: 100.3,
      },
      {
        date: { day: 11, month: 11, year: 2020 },
        income: 100.22,
        expense: 100.3,
      },
      {
        date: { day: 1, month: 11, year: 2020 },
        income: 100.2,
        expense: 100.3,
      },
    ],
  };

  handleChangeView = (value: any) => {};

  handleOpenTransaction = (date: any) => {
    if (this.state.isAddTransactionOpen) {
      this.setState({ isAddTransactionOpen: false });
    } else {
      this.setState({ isAddTransactionOpen: true });
    }

  };

  handleSetWeeks = () => {
    if (this.state.week.length > 1) {
      return;
    } else {
      for (let i = 0; i < this.state.weeks.length; i = i + 4) {
        this.state.week.push({
          From: this.state.weeks[i],
          To: this.state.weeks[i + 2],
        });
      }
      this.setState({});
    }
  };

  handleChange = () => {
    this.setState({ weeks: [], week: [] });
  };

  handleSetEvent = (date: any, view: any) => {
    if (date.getDay() === 0) {
      this.state.weeks.push({
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      });
    }
    if (date.getDay() === 1) {
      this.state.weeks.push({
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      });
    }

    return (
      <div>
        {this.state.events.map((event) => (
          <div>
            {view === "month" &&
            date.getDate() === event.date.day &&
            date.getMonth() === event.date.month &&
            date.getFullYear() === event.date.year ? (
              <div className={TransactionStyl.content_day}>
                <div className={TransactionStyl.income}>${event.income}</div>
                <div className={TransactionStyl.expense}>${event.expense}</div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  };

  render() {
    const {week,isAddTransactionOpen}=this.state;
    return (
      <div className={TransactionStyl.container}>
        <div className={TransactionStyl.menu}>
          {/*<div onClick={() => handleChangeView("day")}>Daily</div>*/}
          <div onClick={this.handleSetWeeks}>Weekly</div>
          {/*<div onClick={() => handleChangeView("month")}>Monthly</div>*/}
          {/*<div onClick={() => handleChangeView("year")}>Yearly</div>*/}
          {/*<div onClick={() => handleChangeView("period")}>Period</div>*/}
        </div>

        <Calendar
          className={TransactionStyl.calendar}
          onClickDay={(date) => this.handleOpenTransaction(date)}
          showNavigation={false}
          tileContent={({ date, view }) => this.handleSetEvent(date, view)}
          onActiveStartDateChange={(date) => console.log(date)}
          onChange={(date) => this.handleChange()}
        />
        <AddTransactionModal isAddTransactionOpen={isAddTransactionOpen}/>
        <div>
          {week.map((w) => (
            <div>
              <span>
                {w.From.day}.{w.From.month + 1} - {w.To.day}.{w.To.month + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TransactionContainer;
