import React, {useEffect, useState} from 'react';
import Moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import NavBarMenu from '../../../layout/navBar/NavBar';
import Calendar from './Calendar/Calendar';
import {getSpecificDatePeriod} from '../service/TransactionService';
import {setIsTransactionOpen, setTransaction, setDate} from '../actions/transactionActions';
import {
  Transaction,
  TransactionEvent,
  TransactionEventWithAmountNumber,
  TransactionWithAmountNumber
} from '../../../models/Transaction';
import {Error} from '../../../models/Error';
import '../../../scss/variables.scss';
import DailyTransactions from './components/DailyTransactions';
import {UnitOfTime} from '../../../models/Clendar';
import {
  firstDateOfFirstWeekOfTheMonth,
  lastDateOfLastWeekOfTheMonth,
  isTheSameDate,
  firstDateOfTheMonth,
  lastDateOfTheMonth
} from '../../../helpers/MomentHelpers';
import {getTransactionState} from '../../../helpers/transactionSelectors';
import {setAccount} from '../../login/actions/usersActions';

type State = {
  isAddTransactionOpen: boolean;
  isInfoTransactionOpen: boolean;
  isEditTransactionOpen: boolean;
  selectedDay: Transaction;
  isTransfer: boolean;
  errors: Error;
  date: Date;
  calendarDates: {date: Date}[];
  transactions: Transaction[];
};

const MonthlyContainer = (): JSX.Element => {
  const [transactions, setTransactions] = useState<TransactionWithAmountNumber[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionWithAmountNumber>({
    _id: '',
    createdAt: Moment().startOf('date').toDate(),
    events: [],
    expense: 0,
    income: 0
  });

  const [calendarDates, setCalendarDates] = useState<State['calendarDates']>([]);

  const dispatch = useDispatch();

  const stateTransaction = useSelector(getTransactionState);

  // eslint-disable-next-line react/state-in-constructor

  const getTransactions = async (date: Date) => {
    const from: Date = firstDateOfFirstWeekOfTheMonth(date).toDate();
    const to: Date = lastDateOfLastWeekOfTheMonth(date).toDate();

    try {
      const response = await getSpecificDatePeriod(from, to);
      await response.data.transactions.forEach((transactionItem: TransactionWithAmountNumber) => {
        if (isTheSameDate(selectedTransaction.createdAt, transactionItem.createdAt)) {
          setSelectedTransaction(transactionItem);
        }
      });
      setTransactions(response.data.transactions);

      const isSelectedTransactionExist = response.data.transactions.find((element: TransactionWithAmountNumber) =>
        isTheSameDate(selectedTransaction.createdAt, element.createdAt)
      );

      if (!isSelectedTransactionExist) {
        setSelectedTransaction({
          _id: '',
          createdAt: date,
          events: [],
          expense: 0,
          income: 0
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleOpenEdit = (event: TransactionEventWithAmountNumber) => {
    const {_id: selectedTransactionId} = selectedTransaction;

    const Event: TransactionEvent = {
      ...event,
      amount: (event.amount / 100).toFixed(2),
      fees: (event.fees / 100).toFixed(2),
      transactionId: selectedTransactionId
    };

    dispatch(setAccount(Event));
    dispatch(setTransaction(Event));
    dispatch(setIsTransactionOpen());
  };

  const selectedDay = (date: Date) => {
    transactions.forEach((transaction) => {
      if (isTheSameDate(date, transaction.createdAt)) {
        setSelectedTransaction(transaction);
      }
    });
  };

  const handleOpenInfoModal = (date: Date) => {
    dispatch(setDate(date));
    setSelectedTransaction({_id: '', createdAt: date, events: [], expense: 0, income: 0});
    selectedDay(date);
  };

  const setFirstWeek = (date: Date) => {
    const lastDateOfPreviusMonth: number = Moment(date).set(UnitOfTime.DATE, 0).get(UnitOfTime.DATE);
    const calendar: State['calendarDates'] = [];
    for (let i = firstDateOfFirstWeekOfTheMonth(date).get(UnitOfTime.DATE); i <= lastDateOfPreviusMonth; i += 1) {
      calendar.push({
        date: Moment(firstDateOfFirstWeekOfTheMonth(date)).set(UnitOfTime.DATE, i).toDate()
      });
    }
    return calendar;
  };

  const setLastWeek = (date: Date) => {
    const calendar: State['calendarDates'] = [];
    for (let i = 1; i <= lastDateOfLastWeekOfTheMonth(date).get(UnitOfTime.DATE); i += 1) {
      calendar.push({
        date: Moment(lastDateOfLastWeekOfTheMonth(date)).startOf(UnitOfTime.DATE).set(UnitOfTime.DATE, i).toDate()
      });
    }
    return calendar;
  };

  const setCalendar = async (date: Date) => {
    setCalendarDates([]);
    let calendar: State['calendarDates'] = [];

    if (firstDateOfTheMonth(date).get(UnitOfTime.DAY) !== 1) {
      calendar = setFirstWeek(date);
    }

    for (let i = 1; i <= lastDateOfTheMonth(date).get(UnitOfTime.DATE); i += 1) {
      calendar.push({
        date: Moment(firstDateOfTheMonth(date)).set(UnitOfTime.DATE, i).toDate()
      });
    }

    if (lastDateOfTheMonth(date).get(UnitOfTime.DAY) !== 0) {
      setLastWeek(date);
      calendar = calendar.concat(setLastWeek(date));
    }

    setCalendarDates(calendar);
  };

  useEffect(() => {
    getTransactions(stateTransaction.date);
    setCalendar(stateTransaction.date);
  }, [stateTransaction.isTransactionOpen, stateTransaction.date]);

  return (
    <div className="wrapper">
      <NavBarMenu />
      <div className="row mt-5">
        <div className="col-xxl-7 col-xl-12 pe-4  ">
          <Calendar
            handleOpenInfoModal={handleOpenInfoModal}
            transactions={transactions}
            calendarDates={calendarDates}
            date={stateTransaction.date}
          />
        </div>

        <div className={`col-xxl-5 col-xl-12  p-2 pt-sm-5 pt-xxl-0 `}>
          <DailyTransactions selectedTransaction={selectedTransaction} handleOpenEdit={handleOpenEdit} />
        </div>
      </div>
    </div>
  );
};

export default MonthlyContainer;
