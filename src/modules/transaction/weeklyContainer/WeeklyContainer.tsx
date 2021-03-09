import NavBarMenu from "../../../layout/navBar/NavBar";
import React from "react";
import WeeklyStyle from "./WeeklyStyle.module.css";
import InfoRow from "../components/infoRow/InfoRow";
import WeeklyTableRow from "./WeeklyTableRow";
import { State as StateTransaction } from "../reducers/transactionReducer";
import { connect } from "react-redux";
import { getYearlyOrWeekly } from "../service/TransactionService";
import {
  dayStartOfTheWeekOfTheMonth,
  monthStartOfTheWeekOfTheMonth,
  yearStartOfTheWeekOfTheMonth,
  dayEndOfTheWeekOfTheMonth,
  monthEndOfTheWeekOfTheMonth,
  yearEndOfTheWeekOfTheMonth,
  dayStartOfTheWeekEndOfTheMonth,
  monthStartOfTheWeekEndOfTheMonth,
  yearStartOfTheWeekEndOfTheMonth,
  dayEndOfTheWeekStartOfTheMonth,
  monthEndOfTheWeekStartOfTheMonth,
  yearEndOfTheWeekStartOfTheMonth,
} from "../../../helpers/Variables";
import { TransactionReducer } from "../../../helpers/ITransactions";

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
      from: new Date(
        yearStartOfTheWeekOfTheMonth(date),
        monthStartOfTheWeekOfTheMonth(date),
        dayStartOfTheWeekOfTheMonth(date) + 1
      ),
      to: new Date(
        yearEndOfTheWeekStartOfTheMonth(date),
        monthEndOfTheWeekStartOfTheMonth(date),
        dayEndOfTheWeekStartOfTheMonth(date) + 1
      ),
      income: 0,
      expense: 0,
    });

    for (
      let i = dayEndOfTheWeekStartOfTheMonth(date) + 1;
      i <= dayStartOfTheWeekEndOfTheMonth(date) - 7;
      i = i + 7
    ) {
      weeks.push({
        from: new Date(date.getFullYear(), date.getMonth(), i + 1),
        to: new Date(date.getFullYear(), date.getMonth(), i + 7),
        income: 0,
        expense: 0,
      });
    }

    weeks.push({
      from: new Date(
        yearStartOfTheWeekEndOfTheMonth(date),
        monthStartOfTheWeekEndOfTheMonth(date),
        dayStartOfTheWeekEndOfTheMonth(date) + 1
      ),
      to: new Date(
        yearEndOfTheWeekOfTheMonth(date),
        monthEndOfTheWeekOfTheMonth(date),
        dayEndOfTheWeekOfTheMonth(date) + 1
      ),
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
      <div className={WeeklyStyle.wrapper}>
        <NavBarMenu />
        <div className={WeeklyStyle.container}>
          <table className={WeeklyStyle.table}>
            <InfoRow sumExpense={sumExpense} sumIncome={sumIncome} />
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
