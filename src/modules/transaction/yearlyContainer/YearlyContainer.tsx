import React from "react";
import NavBarMenu from "../../../layout/navBar/NavBar";
import styles from "./YearlyStyle.module.css";
import InfoTableHead from "../components/InfoTableHead/InfoTableHead";
import Moment from "moment";
import YearlyTableRow from "./components/YearlyTableRow";
import { State as StateTransaction } from "../reducers/transactionReducer";
import { connect } from "react-redux";
import { getYearlyOrWeekly } from "../service/TransactionService";
import { Month, TransactionReducer } from "../../../models/Transaction";
import {
  firstDateOfTheMonth,
  lastDateOfTheMonth,
} from "../../../helpers/Variables";
export interface State {
  months: Month[];
  sumIncome: number;
  sumExpense: number;
}
type Props = {
  state: StateTransaction;
};

class YearlyContainer extends React.Component<Props> {
  state: State = {
    months: [],
    sumIncome: 0,
    sumExpense: 0,
  };

  componentDidMount() {
    this.setYear(this.props.state.date);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.state.date !== this.props.state.date) {
      this.setState({
        date: this.props.state.date,
      });
      this.setYear(this.props.state.date);
    }
  }

  setYear = async (date: Date) => {
    let months: Month[] = [];

    for (let i = 0; i <= 11; i++) {
      await months.push({
        from: Moment(date).set("month", i).startOf("month").toDate(),
        to: Moment(date).set("month", i).endOf("month").toDate(),
        income: 0,
        expense: 0,
      });
    }

    let data = await getYearlyOrWeekly(months);
    if (Moment(date).get("year") < Moment().get("year")) {
      this.setState({
        months: data.months,
        sumIncome: data.sumIncome,
        sumExpense: data.sumExpense,
      });
    }
    if (Moment(date).get("year") === Moment().get("year")) {
      this.setState({
        sumIncome: data.sumIncome,
        sumExpense: data.sumExpense,
      });
      this.setMonths(data.months);
    }
    if (Moment(date).get("year") > Moment().get("year")) {
      this.setState({
        months: data.months.filter(
          (month: Month) => month.expense > 0 || month.income > 0
        ),
        sumIncome: data.sumIncome,
        sumExpense: data.sumExpense,
      });
    }
  };

  setMonths = async (months: Month[]) => {
    let year: Month[] = [];
    const newMonths = months.filter(
      month => month.expense > 0 || month.income > 0
    );
    let lastMonth = Moment().get("month");
    if (
      newMonths.length > 0 &&
      lastMonth < Moment(newMonths[newMonths.length - 1].from).get("month")
    ) {
      lastMonth = Moment(newMonths[newMonths.length - 1].from).get("month");
    }

    for (let i = 0; i <= lastMonth; i++) {
      if (
        newMonths.filter(month => Moment(month.from).get("month") === i)
          .length > 0
      ) {
        year.push(
          newMonths.filter(month => Moment(month.from).get("month") === i)[0]
        );
      } else {
        await year.push({
          from: Moment().startOf("month").set("month", i).toDate(),
          to: Moment().endOf("month").set("month", i).toDate(),
          income: 0,
          expense: 0,
        });
      }
    }

    this.setState({ months: year });
  };
  render() {
    const { months, sumExpense, sumIncome } = this.state;
    const { date } = this.props.state;
    return (
      <div className={styles.wrapper}>
        <NavBarMenu />
        <div className={styles.container}>
          <table className={styles.table}>
            <InfoTableHead sumIncome={sumIncome} sumExpense={sumExpense} />
            <tbody>
              {months.reverse().map(month => (
                <YearlyTableRow month={month} />
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

export default connect(mapStateToProps)(YearlyContainer);
