import React, { useEffect, useState } from "react";
import NavBarMenu from "../../../layout/navBar/NavBar";
import styles from "./DailyStyle.module.css";
import InfoTableHead from "../components/InfoTableHead/InfoTableHead";
import Moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import DailyTableRow from "./components/dailyTableRow/DailyTableRow";
import { useDispatch, useSelector } from "react-redux";
import AddTransactionModal from "../components/addTransactionModal/AddTransactionModal";
import {
  TransactionReducer,
  TransactionWithAmountNumber,
  TransactionEventWithAmountNumber,
  TransactionEvent,
} from "../../../models/Transaction";
import { userReducer } from "../../../models/User";
import {
  createTransactionRequest,
  deleteTransaction,
  editTransaction,
  getSpecificDatePeriod,
} from "../service/TransactionService";
import { validateTransaction } from "../../../helpers/Validation";
import {
  firstDateOfTheMonth,
  lastDateOfTheMonth,
  transactionEvent,
} from "../../../helpers/Variables";
import { setTransaction, handleInput } from "../actions/transactionActions";
import DailyTableHeader from "./components/dailyTableHeader/DailyTableHeader";

const DailyContainer = () => {
  const [transactions, setTransactions] = useState<
    TransactionWithAmountNumber[]
  >([]);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [sumIncome, setSumIncome] = useState(0);
  const [sumExpense, setSumExpense] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [isEditTransacionOpen, setIsEditTransacionOpen] = useState(false);
  const [errors, setErrors] = useState({
    account: "",
    from: "",
    category: "",
    to: "",
    amount: "",
  });

  const dispatch = useDispatch();

  const stateTransaction = useSelector(
    (state: {
      userReducer: userReducer;
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
  const handleSave = async () => {
    const { transaction, date } = stateTransaction;
    const errors = validateTransaction(transaction);
    const isValid = Object.values(errors).filter(Boolean).length <= 0;

    if (!isValid) {
      setErrors(errors);
      return;
    }

    let event = transactionEvent(transaction);

    if (isEditTransacionOpen) {
      await editTransaction(
        transactionId,
        stateTransaction.transaction._id,
        event.events[0]
      );
      getTransactions(date);
      clearState();
    } else {
      await createTransactionRequest(event);
      getTransactions(date);
      clearState();
    }
  };

  const handleDelete = async (eventId: string) => {
    await deleteTransaction(transactionId, eventId);
    clearState();
    getTransactions(stateTransaction.date);
  };

  const clearState = () => {
    setErrors({ account: "", from: "", category: "", to: "", amount: "" });
    setIsTransactionOpen(false);
    setIsEditTransacionOpen(false);
    setTransactionId("");
    dispatch(
      setTransaction({
        _id: "",
        type: "income",
        date: Moment().toDate(),
        account: "",
        from: "",
        category: "",
        fees: "0",
        to: "",
        amount: "0",
        note: "",
        description: "",
      })
    );
  };

  const handleSelectEvent = (
    transactioEvent: TransactionEventWithAmountNumber,
    transactionId: string
  ) => {
    if (isTransactionOpen) {
      clearState();
    } else {
      setIsTransactionOpen(true);
      setTransactionId(transactionId);
      setIsEditTransacionOpen(true);
      const Event: TransactionEvent = {
        ...transactioEvent,
        amount: (transactioEvent.amount / 100).toFixed(2),
        fees: (transactioEvent.fees! / 100).toFixed(2),
      };

      dispatch(setTransaction(Event));
    }
  };
  const handleOpenTransaction = () => {
    if (isTransactionOpen) {
      clearState();
    } else {
      setIsTransactionOpen(true);

      dispatch(
        handleInput({
          target: {
            name: "date",
            value: Moment().startOf("date").toDate(),
          },
        })
      );
    }
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
        <FontAwesomeIcon
          className={styles.add_button}
          icon={faPlusCircle}
          onClick={() => handleOpenTransaction()}
        />
      </div>
      <AddTransactionModal
        isAddTransactionOpen={isTransactionOpen}
        transactionEvent={stateTransaction.transaction}
        errors={errors}
        isEditTransactionOpen={isEditTransacionOpen}
        handleInputChange={event => dispatch(handleInput(event))}
        handleSave={handleSave}
        handleOpenTransaction={handleOpenTransaction}
        handleOpenEdit={handleOpenTransaction}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default DailyContainer;
