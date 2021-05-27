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
  const [selectedIncome, setSelectedIncome] = useState<number | undefined>();
  const [selectedExpense, setSelectedExpense] = useState<number | undefined>();
  const stateTransaction = useSelector((state: {transactionReducer: TransactionReducer}) => state.transactionReducer);

  const handleSelect = (value: {index: number | undefined; isIncome: boolean}) => {
    if (value.isIncome) {
      setSelectedIncome(value.index);
    } else {
      setSelectedExpense(value.index);
    }
  };
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

      <div className="row justify-content-evenly ">
        <StatsForm stats={incomeStats} isIncome selected={selectedIncome} handleSelect={handleSelect} />
        <StatsForm stats={expenseStats} isIncome={false} selected={selectedExpense} handleSelect={handleSelect} />
      </div>
    </div>
  );
};

export default MonthlyContainer;
