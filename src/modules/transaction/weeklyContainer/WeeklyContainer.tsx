import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Moment from 'moment';
import NavBarMenu from '../../../layout/navBar/NavBar';
import InfoTableHead from '../components/InfoTableHead/InfoTableHead';
import WeeklyTableRow from './components/WeeklyTableRow';
import {getYearlyOrWeekly} from '../service/TransactionService';
import {
  firstDateOfFirstWeekOfTheMonth,
  lastDateOfFirstWeekOfTheMonth,
  firstDateOfLastWeekOfTheMonth,
  lastDateOfLastWeekOfTheMonth,
  UnitOfTime
} from '../../../helpers/Variables';
import {Month, TransactionReducer} from '../../../models/Transaction';
import {UserReducer} from '../../../models/User';
import classes from './WeeklyStyle.module.css';
import '../../../scss/variables.scss';

const WeeklyContainer = (): JSX.Element => {
  const [weeksInMonth, setWeeks] = useState<Month[]>([]);
  const [sumIncome, setSumIncome] = useState(0);
  const [sumExpense, setSumExpense] = useState(0);

  const stateTransaction = useSelector(
    (state: {userReducer: UserReducer; transactionReducer: TransactionReducer}) => state.transactionReducer
  );
  const {amount} = stateTransaction.transactionEvent;
  const getWeeks = async (date: Date) => {
    const weeks: Month[] = [];

    setWeeks([]);
    weeks.push({
      from: firstDateOfFirstWeekOfTheMonth(date).toDate(),
      to: lastDateOfFirstWeekOfTheMonth(date).toDate(),
      income: 0,
      expense: 0
    });

    for (
      let i = lastDateOfFirstWeekOfTheMonth(date).get(UnitOfTime.DATE);
      i <= firstDateOfLastWeekOfTheMonth(date).get(UnitOfTime.DATE) - 7;
      i += 7
    ) {
      weeks.push({
        from: Moment(date)
          .set(UnitOfTime.DATE, i + 1)
          .startOf(UnitOfTime.DATE)
          .toDate(),
        to: Moment(date)
          .set(UnitOfTime.DATE, i + 7)
          .startOf(UnitOfTime.DATE)
          .toDate(),
        income: 0,
        expense: 0
      });
    }

    weeks.push({
      from: firstDateOfLastWeekOfTheMonth(date).startOf(UnitOfTime.DATE).toDate(),
      to: lastDateOfLastWeekOfTheMonth(date).startOf(UnitOfTime.DATE).toDate(),
      income: 0,
      expense: 0
    });
    try {
      const response = await getYearlyOrWeekly(weeks);
      const {data} = response;

      setWeeks(data.months.reverse());
      setSumExpense(data.sumExpense);
      setSumIncome(data.sumIncome);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getWeeks(stateTransaction.date);
  }, [amount, stateTransaction.date]);
  return (
    <div className="wrapper">
      <NavBarMenu />
      <div className={classes.container}>
        <table className={classes.table}>
          <InfoTableHead sumExpense={sumExpense} sumIncome={sumIncome} />
          <tbody>
            {weeksInMonth.map((week) => (
              <WeeklyTableRow week={week} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyContainer;
