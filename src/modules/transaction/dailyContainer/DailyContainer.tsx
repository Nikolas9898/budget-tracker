import React, { useEffect, useState } from "react";
import NavBarMenu from "../../../layout/navBar/NavBar";
import DailyStyle from "./DailyStyle.module.css";
import InfoRow from "../components/infoRow/InfoRow";
import Moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import DailyTableRow from "./components/dailyTableRow/DailyTableRow";
import { useDispatch, useSelector } from "react-redux";
import AddTransactionModal from "../components/addTransactionModal/AddTransactionModal";
import {
  TransactionEvent,
  Transaction,
  TransactionReducer,
  userReducer,
} from "../../../helpers/ITransactions";
import {
  createTransactionRequest,
  deleteTransaction,
  editTransaction,
  getSpecificDatePeriod,
} from "../service/TransactionService";
import { validateTransaction } from "../../../helpers/Validation";
import { transactionEvent } from "../../../helpers/Variables";
import { setTransaction, handleInput } from "../actions/transactionActions";
import DailyTableHeader from "./components/dailyTableHeader/DailyTableHeader";

type Props = {
  sumIncome: number;
  sumExpense: number;
  selectedEvent: TransactionEvent;
  event: {
    _id: string;
    type: string;
    date: Date;
    account?: string;
    from?: string;
    to?: string;
    category?: string;
    amount: number;
    fees: number;
    note: string;
    description: string;
  };
};
const DailyContainer = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionIsOpen, setTransactionIsOpen] = useState(false);
  const [sumIncome, setSumIncome] = useState(0);
  const [sumExpense, setSumExpense] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [editTransacionIsOpen, setEditTransacionIsOpen] = useState(false);

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
  console.log(stateTransaction);

  useEffect(() => {
    getTransactions(stateTransaction.date);
  }, [stateTransaction.date]);

  const getTransactions = async (date: Date) => {
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let data = await getSpecificDatePeriod(firstDay, lastDay);
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

    if (editTransacionIsOpen) {
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
    setTransactionIsOpen(false);
    setEditTransacionIsOpen(false);
    setTransactionId("");
    dispatch(
      setTransaction({
        _id: "",
        type: "income",
        date: new Date(),
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
    transactioEvent: Props["event"],
    transactionId: string
  ) => {
    if (transactionIsOpen) {
      clearState();
    } else {
      setTransactionIsOpen(true);
      setTransactionId(transactionId);
      setEditTransacionIsOpen(true);
      let Event = {
        ...transactioEvent,
        amount: (transactioEvent.amount / 100).toFixed(2),
        fees: (transactioEvent.fees / 100).toFixed(2),
      };

      dispatch(setTransaction(Event));
    }
  };
  const handleOpenTransaction = () => {
    if (transactionIsOpen) {
      clearState();
    } else {
      setTransactionIsOpen(true);

      dispatch(
        handleInput({
          target: {
            name: "date",
            value: new Date().setHours(0, 0, 0, 0),
          },
        })
      );
    }
  };
  return (
    <div className={DailyStyle.wrapper}>
      <NavBarMenu />
      <div className={DailyStyle.container}>
        <table className={DailyStyle.table}>
          <InfoRow sumIncome={sumIncome} sumExpense={sumExpense} />

          {transactions
            .sort(function (a, b) {
              return (
                new Date(a.createdAt).getDate() -
                new Date(b.createdAt).getDate()
              );
            })
            .reverse()
            .map(transaction => (
              <tbody className={DailyStyle.table_container}>
                <DailyTableHeader transaction={transaction} />
                {transaction.events.map((event: any) => (
                  <DailyTableRow
                    event={event}
                    key={event._id}
                    handleSelectEvent={event =>
                      handleSelectEvent(event, transaction._id)
                    }
                  />
                ))}
              </tbody>
            ))}
        </table>
        <FontAwesomeIcon
          className={DailyStyle.add_button}
          icon={faPlusCircle}
          onClick={() => handleOpenTransaction()}
        />
      </div>
      <AddTransactionModal
        isAddTransactionOpen={transactionIsOpen}
        transactionEvent={stateTransaction.transaction}
        errors={errors}
        isEditTransactionOpen={editTransacionIsOpen}
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
