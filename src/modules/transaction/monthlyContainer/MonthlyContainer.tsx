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
  isTheSameDate
} from '../../../helpers/Variables';
import {deleteTransaction, getSpecificDatePeriod} from '../service/TransactionService';
import {handleInput, setTransaction} from '../actions/transactionActions';
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
  // const [calendarDates] = useState<State['calendarDates']>([]);
  const [isEditTransactionOpen, setIsEditTransactionOpen] = useState(false);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isInfoTransactionOpen, setIsInfoTransactionOpen] = useState(false);

  const dispatch = useDispatch();

  const stateTransaction = useSelector((state: {transactionReducer: TransactionReducer}) => state.transactionReducer);

  // eslint-disable-next-line react/state-in-constructor

  // componentDidMount() {
  //   const {stateTransaction, filters, setDate: setDateWithFilter} = this.props;
  //   if (filters.date) {
  //     this.setState({
  //       date: filters.date
  //     });
  //     setDateWithFilter(filters.date);
  //     this.getTransactions(filters.date);
  //     this.setCalendar(filters.date);
  //   } else {
  //     this.setState({
  //       date: stateTransaction.date
  //     });
  //     this.getTransactions(stateTransaction.date);
  //     this.setCalendar(stateTransaction.date);
  //   }
  // }

  // componentDidUpdate(prevProps: Readonly<Props>) {
  //   const {stateTransaction, filters} = this.props;

  //   if (prevProps.stateTransaction.date !== stateTransaction.date) {
  //     if (!filters.date) {
  //       this.setCalendar(stateTransaction.date);
  //       this.getTransactions(stateTransaction.date);
  //     }
  //   }
  // }

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
    // eslint-disable-next-line no-underscore-dangle
    const newEvents: TransactionEventWithAmountNumber[] = selectedTransaction.events.filter(
      ({_id: transactionEventId}) => transactionEventId !== eventId
    );
    // this.setState({
    //   selectedDay: {...selectedDay, events: newEvents},
    //   isEditTransactionOpen: false
    // });
    setSelectedTransaction({...selectedTransaction, events: newEvents});
    clearState();
    getTransactions(stateTransaction.date);
  };

  const handleOpenEdit = (event: TransactionEventWithAmountNumber) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow

    const {_id: selectedTransactionId} = selectedTransaction;
    if (isEditTransactionOpen) {
      setIsEditTransactionOpen(false);

      clearState();
    } else {
      setIsEditTransactionOpen(true);

      const Event: TransactionEvent = {
        ...event,
        amount: (event.amount / 100).toFixed(2),
        fees: (event.fees / 100).toFixed(2),
        transactionId: selectedTransactionId
      };

      dispatch(setTransaction(Event));
    }
  };

  const handleNextDay = async () => {
    const newDate: Date = Moment(selectedTransaction.createdAt).add(1, 'days').toDate();
    setSelectedTransaction({...selectedTransaction, createdAt: newDate, events: []});

    // this.setState({
    //   selectedDay: {createdAt: newDate, events: []},
    //   date: newDate
    // });

    transactions.forEach((transaction) => {
      if (isTheSameDate(newDate, transaction.createdAt)) {
        setSelectedTransaction(transaction);
      }
    });
  };

  const handlePreviousDay = async () => {
    const newDate: Date = Moment(selectedTransaction.createdAt).add(-1, 'days').toDate();
    // this.setState({
    //   selectedDay: {createdAt: newDate, events: []},
    //   date: newDate
    // });
    setSelectedTransaction({...selectedTransaction, createdAt: newDate, events: []});

    transactions.forEach((transaction) => {
      if (isTheSameDate(newDate, transaction.createdAt)) {
        setSelectedTransaction(transaction);
      }
    });
  };

  const handleOpenTransaction = () => {
    const {createdAt} = selectedTransaction;
    // const {handleInput} = this.props;
    if (isAddTransactionOpen) {
      setIsAddTransactionOpen(false);
      clearState();
    } else {
      handleInput({
        target: {
          name: 'date',
          value: createdAt
        }
      });
      setIsAddTransactionOpen(true);
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

  // const handleSave = async () => {
  //   const {_id: transactionEventId} = stateTransaction.transactionEvent;
  //   const errors1: Error = validateTransaction(stateTransaction.transactionEvent);
  //   const isValid: boolean = Object.values(errors1).filter(Boolean).length <= 0;

  //   if (!isValid) {
  //     setErrors(errors);
  //     return;
  //   }
  //   const event = getTransaction(stateTransaction.transactionEvent);

  //   if (isEditTransactionOpen) {
  //     await editTransaction(selectedDayId, transactionEventId, event.events[0]);

  //     this.getTransactions(transactionEvent.date);
  //     this.clearState();
  //   } else {
  //     await createTransactionRequest(event);
  //     this.getTransactions(date);
  //     this.clearState();
  //   }
  //   this.setState({
  //     // eslint-disable-next-line react/no-access-state-in-setstate
  //     ...this.state,
  //     errors: {},
  //     isAddTransactionOpen: false,
  //     isEditTransactionOpen: false
  //   });
  // };

  const setFirstWeek = (date: Date) => {
    const lastDateOfPreviusMonth: number = Moment(date).set('date', 0).get('date');

    for (let i = firstDateOfFirstWeekOfTheMonth(date).get('date'); i <= lastDateOfPreviusMonth; i += 1) {
      stateTransaction.calendarDates.push({
        date: Moment(firstDateOfFirstWeekOfTheMonth(date)).set('date', i).toDate()
      });
    }
  };

  const setLastWeek = (date: Date) => {
    for (let i = 1; i <= lastDateOfLastWeekOfTheMonth(date).get('date'); i += 1) {
      stateTransaction.calendarDates.push({
        date: Moment(lastDateOfLastWeekOfTheMonth(date)).startOf('date').set('date', i).toDate()
      });
    }
  };

  const setCalendar = (date: Date) => {
    if (firstDateOfTheMonth(date).get('day') !== 1) {
      setFirstWeek(date);
    }

    for (let i = 1; i <= lastDateOfTheMonth(date).get('date'); i += 1) {
      stateTransaction.calendarDates.push({
        date: Moment(firstDateOfTheMonth(date)).set('date', i).toDate()
      });
    }

    if (lastDateOfTheMonth(date).get('day') !== 0) {
      setLastWeek(date);
    }
  };

  useEffect(() => {
    setCalendar(stateTransaction.date);
    getTransactions(stateTransaction.date);
  }, [stateTransaction.date]);

  return (
    <div className="wrapper">
      <NavBarMenu />
      <Calendar
        handleOpenInfoModal={handleOpenInfoModal}
        transactions={transactions}
        calendarDates={stateTransaction.calendarDates}
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
      {/* <AddTransactionModal
        isEditTransactionOpen={isEditTransactionOpen}
        errors={errors}
        transactionEvent={transactionEvent}
        handleSave={handleSave}
        handleOpenEdit={handleOpenEdit}
        handleInputChange={handleInput}
        isAddTransactionOpen={isAddTransactionOpen}
        handleOpenTransaction={handleOpenTransaction}
        handleDelete={handleDelete}
      /> */}
    </div>
  );
};

export default MonthlyContainer;
