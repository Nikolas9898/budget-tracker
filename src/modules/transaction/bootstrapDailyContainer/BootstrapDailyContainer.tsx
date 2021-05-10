import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'moment';
import NavBarMenu from '../../../layout/navBar/NavBar';
import BootstrapInfoTableHead from '../components/BootstrapInfoTableHead';
import BootstrapDailyTableHead from './BootstrapDailyTableHead';
import {
  TransactionReducer,
  TransactionWithAmountNumber,
  TransactionEventWithAmountNumber,
  TransactionEvent
} from '../../../models/Transaction';
import {getSpecificDatePeriod} from '../service/TransactionService';
import {setIsTransactionOpen, setTransaction} from '../actions/transactionActions';

import '../../../scss/variables.scss';
import {UnitOfTime} from '../../../models/Clendar';
import {firstDateOfTheMonth, lastDateOfTheMonth} from '../../../helpers/MomentHelpers';
import BootstrapDailyTableRow from './BootstrapDailyTableRow';
import classes from '../dailyContainer/DailyStyle.module.css';
import BootstrapNavBarMenu from '../../../layout/bootstrapNavBar/BootstrapNavBar';

const BootstrapDailyContainer = (): JSX.Element => {
  const [transactions, setTransactions] = useState<TransactionWithAmountNumber[]>([]);
  const [sumIncome, setSumIncome] = useState(0);
  const [sumExpense, setSumExpense] = useState(0);

  const dispatch = useDispatch();

  const stateTransaction = useSelector((state: {transactionReducer: TransactionReducer}) => state.transactionReducer);
  const {amount} = stateTransaction.transactionEvent;
  const getTransactions = async (date: Date) => {
    try {
      const response = await getSpecificDatePeriod(
        firstDateOfTheMonth(date).toDate(),
        lastDateOfTheMonth(date).toDate()
      );
      const {data} = response;
      setTransactions(data.transactions);
      setSumExpense(data.sumExpense);
      setSumIncome(data.sumIncome);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getTransactions(stateTransaction.date);
  }, [amount, stateTransaction.date]);

  const handleSelectEvent = (transactioEvent: TransactionEventWithAmountNumber, transactionId: string) => {
    const Event: TransactionEvent = {
      ...transactioEvent,
      amount: (transactioEvent.amount / 100).toFixed(2),
      fees: (transactioEvent.fees / 100).toFixed(2),
      transactionId
    };
    dispatch(setIsTransactionOpen());
    dispatch(setTransaction(Event));
  };

  return (
    <div className="container-fluid">
      <BootstrapNavBarMenu />
      <div className="container">
        <BootstrapInfoTableHead sumIncome={sumIncome} sumExpense={sumExpense} />

        {transactions
          .sort((a, b) => {
            return Moment(a.createdAt).get(UnitOfTime.DATE) - Moment(b.createdAt).get(UnitOfTime.DATE);
          })
          .reverse()
          .map((transaction: TransactionWithAmountNumber) => (
            <div className={classes.table_container}>
              <BootstrapDailyTableHead transaction={transaction} />

              {transaction.events.map((event: TransactionEventWithAmountNumber) => {
                const {_id: eventId} = event;
                return (
                  <BootstrapDailyTableRow
                    key={eventId}
                    transaction={transaction}
                    transactionEvent={event}
                    handleSelectEvent={handleSelectEvent}
                  />
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BootstrapDailyContainer;
