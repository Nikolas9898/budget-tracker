import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'moment';
import NavBarMenu from '../../../layout/navBar/NavBar';
import InfoTableHead from '../components/InfoTableHead/InfoTableHead';
import DailyTableRow from './components/dailyTableRow/DailyTableRow';
import DailyTableHeader from './components/dailyTableHeader/DailyTableHeader';
import {
  TransactionReducer,
  TransactionWithAmountNumber,
  TransactionEventWithAmountNumber,
  TransactionEvent
} from '../../../models/Transaction';
import {getSpecificDatePeriod} from '../service/TransactionService';
import {setIsTransactionOpen, setTransaction} from '../actions/transactionActions';
import classes from './DailyStyle.module.css';
import '../../../scss/variables.scss';
import {UnitOfTime} from '../../../models/Clendar';
import {firstDateOfTheMonth, lastDateOfTheMonth} from '../../../helpers/MomentHelpers';
import {getTransactionState} from '../../../helpers/transactionSelectors';

const DailyContainer = (): JSX.Element => {
  const [transactions, setTransactions] = useState<TransactionWithAmountNumber[]>([]);
  const [sumIncome, setSumIncome] = useState(0);
  const [sumExpense, setSumExpense] = useState(0);

  const dispatch = useDispatch();

  const stateTransaction = useSelector(getTransactionState);
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
  }, [stateTransaction.isTransactionOpen, stateTransaction.date]);

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
    <div className="wrapper">
      <NavBarMenu />
      <div className="container">
        <InfoTableHead sumExpense={sumExpense} sumIncome={sumIncome} />

        {transactions
          .sort((a, b) => {
            return Moment(b.createdAt).get(UnitOfTime.DATE) - Moment(a.createdAt).get(UnitOfTime.DATE);
          })
          .map((transaction: TransactionWithAmountNumber) => {
            const {_id: transactionId} = transaction;
            return (
              <div key={transactionId} className={`row ${classes.table_container}`}>
                <div className="col-12">
                  <DailyTableHeader transaction={transaction} />
                  {transaction.events.map((event: TransactionEventWithAmountNumber) => {
                    const {_id: eventId} = event;
                    return (
                      <DailyTableRow
                        key={eventId}
                        transaction={transaction}
                        transactionEvent={event}
                        handleSelectEvent={handleSelectEvent}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DailyContainer;
