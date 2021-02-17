import NavBarMenu from "../../../layout/navBarMenu/NavBarMenu";
import React from "react";
import WeeklyStyle from "./WeeklyStyle.module.css";
import InfoRow from "../components/infoRow/InfoRow";
import moment from "moment";
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

export interface State {
  weeks: { from: any; to: any; income: number; expense: number }[];
  sumIncome: number;
  sumExpense: number;
}
type Props = {
  state: StateTransaction;
};
let config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  },
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

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<{}>,
    snapshot?: any
  ) {
    if (prevProps.state.date !== this.props.state.date) {
      this.setState({
        date: this.props.state.date,
      });
      this.TakeWeeks(this.props.state.date);
    }
  }
  TakeWeeks = async (date: any) => {
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

    getYearlyOrWeekly(weeks).then(data => {
      this.setState({
        weeks: data.months,
        sumIncome: data.sumIncome,
        sumExpense: data.sumExpense,
      });
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

const mapStateToProps = (state: any) => {
  return {
    state: state.transaction,
  };
};

export default connect(mapStateToProps)(WeeklyContainer);
