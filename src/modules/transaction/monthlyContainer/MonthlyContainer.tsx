import React, {useEffect, useState} from 'react';

import Moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import NavBarMenu from '../../../layout/navBar/NavBar';
import InfoModal from '../components/infoModal/InfoModal';
import Calendar from './Calendar/Calendar';
import {
  firstDateOfFirstWeekOfTheMonth,
  firstDateOfTheMonth,
  lastDateOfTheMonth,
  lastDateOfLastWeekOfTheMonth,
  isTheSameDate,
  UnitOfTime
} from '../../../helpers/Variables';
import {deleteTransaction, getSpecificDatePeriod} from '../service/TransactionService';
import {handleInput, setIsTransactionOpen, setTransaction} from '../actions/transactionActions';
import {
  Transaction,
  TransactionEvent,
  TransactionEventWithAmountNumber,
  TransactionReducer,
  TransactionWithAmountNumber
} from '../../../models/Transaction';
import {Error} from '../../../models/Error';
import '../../../scss/variables.scss';
import AddTransactionButton from '../../../layout/addTranasctionButton/AddTransactionButton';

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

  const [isInfoTransactionOpen, setIsInfoTransactionOpen] = useState(false);

  const dispatch = useDispatch();

  const stateTransaction = useSelector((state: {transactionReducer: TransactionReducer}) => state.transactionReducer);
  const {amount} = stateTransaction.transactionEvent;
  // eslint-disable-next-line react/state-in-constructor

  const getTransactions = async (date: Date) => {
    const from: Date = firstDateOfFirstWeekOfTheMonth(date).toDate();
    const to: Date = lastDateOfLastWeekOfTheMonth(date).toDate();
    const data = await getSpecificDatePeriod(from, to);
    data.transactions.forEach((transactionItem: TransactionWithAmountNumber) => {
      if (isTheSameDate(selectedTransaction.createdAt, transactionItem.createdAt)) {
        setSelectedTransaction(transactionItem);
      }
    });
    setTransactions(data.transactions);
  };

  const clearState = () => {
    setTransaction({
      _id: '',
      type: 'income',
      date: Moment().toDate(),
      account: '',
      from: '',
      category: '',
      fees: '0',
      to: '',
      amount: '0',
      note: '',
      description: '',
      transactionId: ''
    });
  };

  const handleDelete = async (eventId: string) => {
    const {_id: selectedDayId} = selectedTransaction;

    await deleteTransaction(selectedDayId, eventId);
    const newEvents: TransactionEventWithAmountNumber[] = selectedTransaction.events.filter(
      ({_id: transactionEventId}) => transactionEventId !== eventId
    );

    setSelectedTransaction({...selectedTransaction, events: newEvents});
    clearState();
    getTransactions(stateTransaction.date);
  };

  const handleOpenEdit = (event: TransactionEventWithAmountNumber) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow

    const {_id: selectedTransactionId} = selectedTransaction;

    const Event: TransactionEvent = {
      ...event,
      amount: (event.amount / 100).toFixed(2),
      fees: (event.fees / 100).toFixed(2),
      transactionId: selectedTransactionId
    };

    dispatch(setTransaction(Event));
    dispatch(setIsTransactionOpen());
  };

  const handleNextDay = async () => {
    const newDate: Date = Moment(selectedTransaction.createdAt).add(1, UnitOfTime.DAYS).toDate();
    setSelectedTransaction({...selectedTransaction, createdAt: newDate, events: []});

    transactions.forEach((transaction) => {
      if (isTheSameDate(newDate, transaction.createdAt)) {
        setSelectedTransaction(transaction);
      }
    });
  };

  const handlePreviousDay = async () => {
    const newDate: Date = Moment(selectedTransaction.createdAt).add(-1, UnitOfTime.DAYS).toDate();

    setSelectedTransaction({...selectedTransaction, createdAt: newDate, events: []});

    transactions.forEach((transaction) => {
      if (isTheSameDate(newDate, transaction.createdAt)) {
        setSelectedTransaction(transaction);
      }
    });
  };

  const handleOpenTransaction = () => {
    const {createdAt} = selectedTransaction;
    dispatch(setIsTransactionOpen());
    if (stateTransaction.isTransactionOpen) {
      clearState();
    } else {
      dispatch(
        handleInput({
          target: {
            name: UnitOfTime.DATE,
            value: createdAt
          }
        })
      );
    }
  };

  const selectedDay = (date: Date) => {
    transactions.forEach((transaction) => {
      if (isTheSameDate(date, transaction.createdAt)) {
        setSelectedTransaction(transaction);
      }
    });
  };

  const handleOpenInfoModal = (date: Date) => {
    if (isInfoTransactionOpen) {
      setIsInfoTransactionOpen(false);
      setSelectedTransaction({...selectedTransaction, events: []});
    } else {
      setIsInfoTransactionOpen(true);
      setSelectedTransaction({...selectedTransaction, createdAt: date, events: []});

      selectedDay(date);
    }
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
  }, [amount, stateTransaction.date]);

  return (
    <div className="wrapper">
      <NavBarMenu />
      <Calendar
        handleOpenInfoModal={handleOpenInfoModal}
        transactions={transactions}
        calendarDates={calendarDates}
        date={stateTransaction.date}
      />
      <InfoModal
        handleDelete={handleDelete}
        selectedTransaction={selectedTransaction}
        handleNextDay={handleNextDay}
        isInfoTransactionOpen={isInfoTransactionOpen}
        handlePreviousDay={handlePreviousDay}
        handleOpenInfoModal={handleOpenInfoModal}
        handleOpenTransaction={handleOpenTransaction}
        handleOpenEdit={handleOpenEdit}
      />
      <AddTransactionButton />
    </div>
  );
};

export default MonthlyContainer;
