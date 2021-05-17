import React, {useEffect, useState} from 'react';
import {firstDateOfYear, lastDateOfYear} from '../../../helpers/MomentHelpers';
import NavBarMenu from '../../../layout/navBar/NavBar';
import StatsForm from '../components/StatsForm';
import {getStatsInSpecificDatePeriod} from '../service/StatsService';

const YearlyContainer = (): JSX.Element => {
  const [incomeStats, setIncomeStats] = useState([]);
  const [expenseStats, setExpenseStats] = useState([]);
  const getYearlyStats = async () => {
    try {
      const from: string = firstDateOfYear;
      const to: string = lastDateOfYear;
      const response = await getStatsInSpecificDatePeriod(from, to);

      setIncomeStats(response.data.incomeStats);
      setExpenseStats(response.data.expenseStats);
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    getYearlyStats();
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

export default YearlyContainer;
