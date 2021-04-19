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
import {firstDateOfTheMonth, lastDateOfTheMonth, UnitOfTime} from '../../../helpers/Variables';
import {setIsTransactionOpen, setTransaction} from '../actions/transactionActions';
import styles from './DailyStyle.module.css';
import '../../../scss/variables.scss';

const DailyContainer = (): JSX.Element => {
  const [transactions, setTransactions] = useState<TransactionWithAmountNumber[]>([]);
  const [sumIncome, setSumIncome] = useState(0);
  const [sumExpense, setSumExpense] = useState(0);

  const dispatch = useDispatch();

  const stateTransaction = useSelector((state: {transactionReducer: TransactionReducer}) => state.transactionReducer);
  const {amount} = stateTransaction.transactionEvent;
  const getTransactions = async (date: Date) => {
    const data = await getSpecificDatePeriod(firstDateOfTheMonth(date).toDate(), lastDateOfTheMonth(date).toDate());
    setTransactions(data.transactions);
    setSumExpense(data.sumExpense);
    setSumIncome(data.sumIncome);
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
    <div className="wrapper">
      <NavBarMenu />
      <div className={styles.container}>
        <table className={styles.table}>
          <InfoTableHead sumIncome={sumIncome} sumExpense={sumExpense} />

          {transactions
            .sort((a, b) => {
              return Moment(a.createdAt).get(UnitOfTime.DATE) - Moment(b.createdAt).get(UnitOfTime.DATE);
            })
            .reverse()
            .map((transaction: TransactionWithAmountNumber) => (
              <tbody className={styles.table_container}>
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
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};

export default DailyContainer;
