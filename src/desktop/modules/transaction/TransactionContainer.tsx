import React from "react";
import Calendar from "react-calendar";
import TransactionStyl from "./TransactionStyle.module.css";

class TransactionContainer extends React.Component {
  state = {};

  render() {
    return (
      <div className={TransactionStyl.container}>
        <div>
          <Calendar
          showWeekNumbers={true}
          />
        </div>
      </div>
    );
  }
}

export default TransactionContainer;
