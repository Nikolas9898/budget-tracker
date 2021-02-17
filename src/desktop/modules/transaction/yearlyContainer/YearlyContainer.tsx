import React from "react";
import NavBarMenu from "../../../layout/navBarMenu/NavBarMenu";
import YearlyStyle from "./YearlyStyle.module.css";
import InfoRow from "../components/infoRow/InfoRow";
import axios from "axios";
import Moment from "moment";
import YearlyTableRow from "./YearlyTableRow";
import { State as StateTransaction } from "../reducers/transactionReducer";
import { connect } from "react-redux";

export interface State {
  months: { from: any; to: any; expense: number; income: number }[];
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

class YearlyContainer extends React.Component<Props> {
  state: State = {
    months: [],
    sumIncome: 0,
    sumExpense: 0,
  };

  componentDidMount() {
    this.setYear(this.props.state.date);
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
      this.setYear(this.props.state.date);
    }
  }

  setYear = async (date: any) => {
    let months = [];

    for (let i = 0; i <= 11; i++) {
      await months.push({
        from: Moment(new Date(date.getFullYear(), i, 2)).toISOString(),
        to: Moment(new Date(date.getFullYear(), i + 1, 1)).toISOString(),
        income: 0,
        expense: 0,
      });
    }
    // }
    axios
      .post(
        `http://localhost:5000/transaction/getYearlyOrWeekly`,
        months,
        config
      )
      .then((data) => {
        if (date.getFullYear() < new Date().getFullYear()) {
          this.setState({
            months: data.data.months,
            sumIncome: data.data.sumIncome,
            sumExpense: data.data.sumExpense,
          });
        }
        if (date.getFullYear() === new Date().getFullYear()) {
          this.setState({
            sumIncome: data.data.sumIncome,
            sumExpense: data.data.sumExpense,
          });
          this.setMonths(data.data.months);
        }
        if (date.getFullYear() > new Date().getFullYear()) {

          this.setState({
            months: data.data.months.filter(
              (month: any) => month.expense > 0 || month.income > 0
            ),
            sumIncome: data.data.sumIncome,
            sumExpense: data.data.sumExpense,
          });
        }
      });
  };

  setMonths = async (months: State["months"]) => {
    const { date } = this.props.state;
    let year = [];
    let newMonths = months.filter(
      (month) => month.expense > 0 || month.income > 0
    );

    for (
      let i = 0;
      i <= new Date(newMonths[newMonths.length - 1].from).getMonth();
      i++
    ) {
      if (
        newMonths.filter((month) => new Date(month.from).getMonth() === i)
          .length > 0
      ) {
        year.push(
          newMonths.filter((month) => new Date(month.from).getMonth() === i)[0]
        );
      } else {
        await year.push({
          from: Moment(new Date(date.getFullYear(), i, 2)).toISOString(),
          to: Moment(new Date(date.getFullYear(), i + 1, 1)).toISOString(),
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
      <div className={YearlyStyle.wrapper}>
        <NavBarMenu />
        <div className={YearlyStyle.container}>
          <table className={YearlyStyle.table}>
            <InfoRow sumIncome={sumIncome} sumExpense={sumExpense} />
            <tbody>
              {months.reverse().map((month, index) => (
                <YearlyTableRow month={month} date={date} />
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

export default connect(mapStateToProps)(YearlyContainer);
