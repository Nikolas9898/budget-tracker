import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import NavBarMenu from '../../../layout/navBar/NavBar';
import StatsForm from '../components/StatsForm';
import {getStatsInSpecificDatePeriod} from '../service/StatsService';
import {firstDateOfTheMonth, lastDateOfTheMonth} from '../../../helpers/MomentHelpers';
import {TransactionReducer} from '../../../models/Transaction';
import '../../../scss/variables.scss';

const MonthlyContainer = (): JSX.Element => {
  const [incomeStats, setIncomeStats] = useState([]);
  const [expenseStats, setExpenseStats] = useState([]);
  const stateTransaction = useSelector((state: {transactionReducer: TransactionReducer}) => state.transactionReducer);

  const getMonthlyStats = async (date: Date) => {
    try {
      const from: Date = firstDateOfTheMonth(date).toDate();
      const to: Date = lastDateOfTheMonth(date).toDate();
      const response = await getStatsInSpecificDatePeriod(from, to);

      setIncomeStats(response.data.incomeStats);
      setExpenseStats(response.data.expenseStats);
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    getMonthlyStats(stateTransaction.date);
  }, [stateTransaction.date]);
  return (
    <div className="wrapper_stats">
      <NavBarMenu />

      <div className="row justify-content-center">
        <StatsForm stats={incomeStats} isIncome />
        <StatsForm stats={expenseStats} isIncome={false} />
      </div>
    </div>
  );
};

export default MonthlyContainer;
