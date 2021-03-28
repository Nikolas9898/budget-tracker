import NavBarMenu from "../../../layout/navBar/NavBar";
import React from "react";
import styles from "./WeeklyStyle.module.css";
import InfoTableHead from "../components/InfoTableHead/InfoTableHead";
import WeeklyTableRow from "./components/WeeklyTableRow";
import { State as StateTransaction } from "../reducers/transactionReducer";
import { connect } from "react-redux";
import { getYearlyOrWeekly } from "../service/TransactionService";
import {
  firstDateOfFirstWeekOfTheMonth,
  lastDateOfFirstWeekOfTheMonth,
  firstDateOfLastWeekOfTheMonth,
  lastDateOfLastWeekOfTheMonth,
} from "../../../helpers/Variables";
import { TransactionReducer } from "../../../models/Transaction";
import Moment from "moment";

export interface State {
  weeks: { from: Date; to: Date; income: number; expense: number }[];
  sumIncome: number;
  sumExpense: number;
}
type Props = {
  state: StateTransaction;
};
class WeeklyContainer extends React.Component<Props> {
  state: State = {
    weeks: [],
    sumIncome: 0,
    sumExpense: 0,
  };
  componentDidMount() {
    this.TakeWeeks(this.props.state.date);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.state.date !== this.props.state.date) {
      this.setState({
        date: this.props.state.date,
      });
      this.TakeWeeks(this.props.state.date);
    }
  }
  TakeWeeks = async (date: Date) => {
    let weeks = [];

    weeks.push({
      from: firstDateOfFirstWeekOfTheMonth(date),
      to: lastDateOfFirstWeekOfTheMonth(date),
      income: 0,
      expense: 0,
    });

    for (
      let i = lastDateOfFirstWeekOfTheMonth(date).get("date");
      i <= firstDateOfLastWeekOfTheMonth(date).get("date") - 7;
      i = i + 7
    ) {
      weeks.push({
        from: Moment(date).set("date", i + 1),
        to: Moment(date).set("date", i + 7),
        income: 0,
        expense: 0,
      });
    }

    weeks.push({
      from: firstDateOfLastWeekOfTheMonth(date),
      to: lastDateOfLastWeekOfTheMonth(date),
      income: 0,
      expense: 0,
    });

    let data = await getYearlyOrWeekly(weeks);
    this.setState({
      weeks: data.months,
      sumIncome: data.sumIncome,
      sumExpense: data.sumExpense,
    });
  };
  render() {
    const { sumIncome, sumExpense, weeks } = this.state;
    return (
      <div className={styles.wrapper}>
        <NavBarMenu />
        <div className={styles.container}>
          <table className={styles.table}>
            <InfoTableHead sumExpense={sumExpense} sumIncome={sumIncome} />
            <tbody>
              {weeks.reverse().map((week, index) => (
                <WeeklyTableRow week={week} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: { transactionReducer: TransactionReducer }) => {
  return {
    state: state.transactionReducer,
  };
};

export default connect(mapStateToProps)(WeeklyContainer);
