import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {firstDateOfTheYear, lastDateOfTheYear} from '../../../helpers/MomentHelpers';
import NavBarMenu from '../../../layout/navBar/NavBar';
import {TransactionReducer} from '../../../models/Transaction';
import StatsForm from '../components/StatsForm';
import {getStatsInSpecificDatePeriod} from '../service/StatsService';

const YearlyContainer = (): JSX.Element => {
  const [incomeStats, setIncomeStats] = useState([]);
  const [expenseStats, setExpenseStats] = useState([]);
  const stateTransaction = useSelector((state: {transactionReducer: TransactionReducer}) => state.transactionReducer);

  const getYearlyStats = async (date: Date) => {
    try {
      const from: Date = firstDateOfTheYear(date).toDate();
      const to: Date = lastDateOfTheYear(date).toDate();
      const response = await getStatsInSpecificDatePeriod(from, to);

      setIncomeStats(response.data.incomeStats);
      setExpenseStats(response.data.expenseStats);
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    getYearlyStats(stateTransaction.date);
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

export default YearlyContainer;
