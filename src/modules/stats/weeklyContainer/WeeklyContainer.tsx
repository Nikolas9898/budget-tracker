import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Moment from 'moment';
import {TransactionReducer} from '../../../models/Transaction';
import NavBarMenu from '../../../layout/navBar/NavBar';
import StatsForm from '../components/StatsForm';
import {getStatsInSpecificDatePeriod} from '../service/StatsService';
import {setStatColor} from '../../../helpers/StatHelper';
import {Stat} from '../../../models/Stat';

const WeeklyContainer = (): JSX.Element => {
  const [incomeStats, setIncomeStats] = useState<Stat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expenseStats, setExpenseStats] = useState<Stat[]>([]);
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
    setIsLoading(true);
    try {
      const from: Date = Moment(date).set('day', 1).toDate();
      const to: Date = Moment(date).set('day', 7).toDate();

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

  useEffect(() => {
    getMonthlyStats(stateTransaction.date);
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

export default WeeklyContainer;
