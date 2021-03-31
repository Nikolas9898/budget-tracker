import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import NavBarMenu from "../../../layout/navBar/NavBar";
import InfoTableHead from "../components/InfoTableHead/InfoTableHead";
import DailyTableRow from "./components/dailyTableRow/DailyTableRow";
import DailyTableHeader from "./components/dailyTableHeader/DailyTableHeader";
import {
  TransactionReducer,
  TransactionWithAmountNumber,
  TransactionEventWithAmountNumber,
  TransactionEvent,
} from "../../../models/Transaction";
import { getSpecificDatePeriod } from "../service/TransactionService";
import {
  firstDateOfTheMonth,
  lastDateOfTheMonth,
} from "../../../helpers/Variables";
import { setTransaction } from "../actions/transactionActions";
import { UserReducer } from "../../../models/User";
import styles from "./DailyStyle.module.css";
const DailyContainer = () => {
  const [transactions, setTransactions] = useState<
    TransactionWithAmountNumber[]
  >([]);
  const [sumIncome, setSumIncome] = useState(0);
  const [sumExpense, setSumExpense] = useState(0);

  const dispatch = useDispatch();

  const stateTransaction = useSelector(
    (state: {
      userReducer: UserReducer;
      transactionReducer: TransactionReducer;
    }) => state.transactionReducer
  );

  useEffect(() => {
    getTransactions(stateTransaction.date);
  }, [stateTransaction.date]);

  const getTransactions = async (date: Date) => {
    const data = await getSpecificDatePeriod(
      firstDateOfTheMonth(date).toDate(),
      lastDateOfTheMonth(date).toDate()
    );
    setTransactions(data.transactions);
    setSumExpense(data.sumExpense);
    setSumIncome(data.sumIncome);
  };

  const handleSelectEvent = (
    transactioEvent: TransactionEventWithAmountNumber,
    transactionId: string
  ) => {
    const Event: TransactionEvent = {
      ...transactioEvent,
      amount: (transactioEvent.amount / 100).toFixed(2),
      fees: (transactioEvent.fees! / 100).toFixed(2),
      transactionId: transactionId,
    };

    dispatch(setTransaction(Event));
  };

  return (
    <div className={styles.wrapper}>
      <NavBarMenu />
      <div className={styles.container}>
        <table className={styles.table}>
          <InfoTableHead sumIncome={sumIncome} sumExpense={sumExpense} />

          {transactions
            .sort(function (a, b) {
              return (
                Moment(a.createdAt).get("date") -
                Moment(b.createdAt).get("date")
              );
            })
            .reverse()
            .map((transaction: TransactionWithAmountNumber) => (
              <tbody className={styles.table_container}>
                <DailyTableHeader transaction={transaction} />

                {transaction.events.map(
                  (event: TransactionEventWithAmountNumber) => (
                    <DailyTableRow
                      event={event}
                      key={event._id}
                      handleSelectEvent={event =>
                        handleSelectEvent(event, transaction._id)
                      }
                    />
                  )
                )}
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};

export default DailyContainer;
