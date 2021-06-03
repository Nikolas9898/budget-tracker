import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {firstDateOfTheYear, lastDateOfTheYear} from '../../../helpers/MomentHelpers';
import {setStatColor} from '../../../helpers/StatHelper';
import NavBarMenu from '../../../layout/navBar/NavBar';
import {Stat} from '../../../models/Stat';
import {TransactionReducer} from '../../../models/Transaction';
import StatsForm from '../components/StatsForm';
import {getStatsInSpecificDatePeriod} from '../service/StatsService';

const YearlyContainer = (): JSX.Element => {
  const [incomeStats, setIncomeStats] = useState<Stat[]>([]);
  const [expenseStats, setExpenseStats] = useState<Stat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedIncome, setSelectedIncome] = useState<number | undefined>();
  const [selectedExpense, setSelectedExpense] = useState<number | undefined>();
  const stateTransaction = useSelector((state: {transactionReducer: TransactionReducer}) => state.transactionReducer);

  const getYearlyStats = async (date: Date) => {
    setIsLoading(true);
    try {
      const from: Date = firstDateOfTheYear(date).toDate();
      const to: Date = lastDateOfTheYear(date).toDate();
      const response = await getStatsInSpecificDatePeriod(from, to);

      const income = setStatColor(response.data.incomeStats);
      const expense = setStatColor(response.data.expenseStats);

      setIncomeStats(income);
      setExpenseStats(expense);
      setIsLoading(false);
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleSelect = (value: {index: number | undefined; isIncome: boolean}) => {
    if (value.isIncome) {
      setSelectedIncome(value.index);
    } else {
      setSelectedExpense(value.index);
    }
  };

  useEffect(() => {
    getYearlyStats(stateTransaction.date);
  }, [stateTransaction.date]);

  return (
    <div className="wrapper">
      <NavBarMenu />
      {!isLoading && (
        <div className="row justify-content-evenly ">
          <StatsForm stats={incomeStats} isIncome selected={selectedIncome} handleSelect={handleSelect} />
          <StatsForm stats={expenseStats} isIncome={false} selected={selectedExpense} handleSelect={handleSelect} />
        </div>
      )}
    </div>
  );
};

export default YearlyContainer;
