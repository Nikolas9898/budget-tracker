import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Moment from "moment";
import NavBarMenu from "../../../layout/navBar/NavBar";
import InfoTableHead from "../components/InfoTableHead/InfoTableHead";
import WeeklyTableRow from "./components/WeeklyTableRow";
import { getYearlyOrWeekly } from "../service/TransactionService";
import {
  firstDateOfFirstWeekOfTheMonth,
  lastDateOfFirstWeekOfTheMonth,
  firstDateOfLastWeekOfTheMonth,
  lastDateOfLastWeekOfTheMonth,
} from "../../../helpers/Variables";
import { Month, TransactionReducer } from "../../../models/Transaction";
import { UserReducer } from "../../../models/User";
import styles from "./WeeklyStyle.module.css";

const WeeklyContainer = () => {
  const [weeks, setWeeks] = useState<Month[]>([]);
  const [sumIncome, setSumIncome] = useState(0);
  const [sumExpense, setSumExpense] = useState(0);

  const stateTransaction = useSelector(
    (state: {
      userReducer: UserReducer;
      transactionReducer: TransactionReducer;
    }) => state.transactionReducer
  );

  useEffect(() => {
    getWeeks(stateTransaction.date);
  }, [stateTransaction.date]);

  const getWeeks = async (date: Date) => {
    let weeks: Month[] = [];

    weeks.push({
      from: firstDateOfFirstWeekOfTheMonth(date).toDate(),
      to: lastDateOfFirstWeekOfTheMonth(date).toDate(),
      income: 0,
      expense: 0,
    });

    for (
      let i = lastDateOfFirstWeekOfTheMonth(date).get("date");
      i <= firstDateOfLastWeekOfTheMonth(date).get("date") - 7;
      i = i + 7
    ) {
      weeks.push({
        from: Moment(date)
          .set("date", i + 1)
          .startOf("date")
          .toDate(),
        to: Moment(date)
          .set("date", i + 7)
          .startOf("date")
          .toDate(),
        income: 0,
        expense: 0,
      });
    }

    weeks.push({
      from: firstDateOfLastWeekOfTheMonth(date).startOf("date").toDate(),
      to: lastDateOfLastWeekOfTheMonth(date).startOf("date").toDate(),
      income: 0,
      expense: 0,
    });

    let data = await getYearlyOrWeekly(weeks);

    setWeeks(data.months.reverse());
    setSumExpense(data.sumExpense);
    setSumIncome(data.sumIncome);
  };

  return (
    <div className={styles.wrapper}>
      <NavBarMenu />
      <div className={styles.container}>
        <table className={styles.table}>
          <InfoTableHead sumExpense={sumExpense} sumIncome={sumIncome} />
          <tbody>
            {weeks.map((week, index) => (
              <WeeklyTableRow week={week} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyContainer;
