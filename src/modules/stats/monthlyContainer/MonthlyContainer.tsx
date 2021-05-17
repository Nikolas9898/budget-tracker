import React, {useEffect, useState} from 'react';
import NavBarMenu from '../../../layout/navBar/NavBar';
import StatsForm from '../components/StatsForm';
import '../../../scss/variables.scss';
import {getStatsInSpecificDatePeriod} from '../service/StatsService';
import {firstDateOfMonth, lastDateOfMonth} from '../../../helpers/MomentHelpers';

const MonthlyContainer = (): JSX.Element => {
  const [incomeStats, setIncomeStats] = useState([]);
  const [expenseStats, setExpenseStats] = useState([]);
  const getMonthlyStats = async () => {
    try {
      const from: string = firstDateOfMonth;
      const to: string = lastDateOfMonth;
      const response = await getStatsInSpecificDatePeriod(from, to);

      setIncomeStats(response.data.incomeStats);
      setExpenseStats(response.data.expenseStats);
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    getMonthlyStats();
  }, []);
  return (
    <div className="container-fluid m-5">
      <NavBarMenu />

      <div className="row justify-content-center">
        <StatsForm stats={incomeStats} isIncome />
        <StatsForm stats={expenseStats} isIncome={false} />
      </div>
    </div>
  );
};

export default MonthlyContainer;
