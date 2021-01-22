import React, { useEffect, useState } from "react";
import NavBarMenu from "../../../layout/navBarMenu/NavBarMenu";
import DailyStyle from "./DailyStyle.module.css";
import InfoRow from "../components/infoRow/InfoRow";
import Moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import axios from "axios";
import DailyTableRow from "./components/dailyTableRow/DailyTableRow";
import {
  handleNextMonth,
  handlePreviousMonth,
} from "../../../store/actions/transactionActions";
import { useDispatch, useSelector } from "react-redux";
import AddTransactionModal from "../components/addTransactionModal/AddTransactionModal";

type Props = {
  sumIncome: number;
  sumExpense: number;
  selectedEvent: {
    _id?: string;
    type: string;
    date: any;
    account?: string;
    from?: string;
    to?: string;
    fees: string;
    category?: string;
    amount: string;
    note: string;
    description: string;
  };
  event: {
    _id: string;
    type: string;
    date: any;
    account?: string;
    from?: string;
    to?: string;
    category?: string;
    amount: number;
    fees: number;
    note: string;
    description: string;
  };
  transactions: {
    _id: string;
    createdAt: any;
    income: number;
    expense: number;
    events: Props["event"][];
  }[];
};
const DailyContainer = () => {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState<Props["transactions"]>([]);
  const [transactionIsOpen, setTransactionIsOpen] = useState(false);
  const [sumIncome, setSumIncome] = useState(0);
  const [sumExpense, setSumExpense] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Props["selectedEvent"]>({
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
  });
  const [errors, setErrors] = useState({
    account: "",
    from: "",
    category: "",
    to: "",
    amount: "",
  });

  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
  };
  const state = useSelector((state: any) => state.transaction);

  useEffect(() => {
    getTransactions(state.date);
  }, [state.date]);

  const getTransactions = (date: any) => {
    let firstDay = moment(
      new Date(date.getFullYear(), date.getMonth(), 1)
    ).toISOString();
    let lastDay = moment(
      new Date(date.getFullYear(), date.getMonth() + 1, 0)
    ).toISOString();
    axios
      .get(
        `http://localhost:5000/transaction/specificDatePeriod/${firstDay}/${lastDay}`,
        config
      )
      .then((data) => {
        setTransactions(data.data.transactions);
        setSumExpense(data.data.sumExpense);
        setSumIncome(data.data.sumIncome);
      });
  };
  const handleInput = (event: any) => {
    if (event.target.name === "type") {
      setSelectedEvent({
        ...selectedEvent,
        category: "",
        [event.target.name]: event.target.value,
      });
    } else {
      setSelectedEvent({
        ...selectedEvent,
        [event.target.name]: event.target.value,
      });
    }
  };

  const validateForm = (value: Props["selectedEvent"]) => {
    let errors = {
      account: "",
      from: "",
      category: "",
      to: "",
      amount: "",
      fees: "",
    };

    if (value.account === "" && !(value.type === "transfer")) {
      errors.account = "Please select a account";
    }
    if (
      value.type === "transfer" &&
      (value.from === "" || value.from === undefined)
    ) {
      errors.from = "Please select  from";
    }
    if (value.category === "" && !(value.type === "transfer")) {
      errors.category = "Please select a category";
    }
    if (
      value.type === "transfer" &&
      (value.to === "" || value.to === undefined)
    ) {
      errors.to = "Please select  to";
    }
    if (value.amount === "") {
      errors.amount = "Please select a amount";
    }

    if (parseFloat(value.fees) > parseFloat(value.amount)) {
      errors.fees = "Fees can't be greater then amount";
    }
    return errors;
  };
  const handleSave = () => {
    const errors = validateForm(selectedEvent);
    const isValid = Object.values(errors).filter(Boolean).length <= 0;

    if (!isValid) {
      setErrors(errors);
      return;
    } else {
      setErrors({ account: "", from: "", category: "", to: "", amount: "" });
    }

    let incomeOrExpense = {
      events: [
        {
          type: selectedEvent.type.toLowerCase(),
          currency: "BG",
          date: new Date(new Date(selectedEvent.date)).toISOString(),
          account: selectedEvent.account,
          category: selectedEvent.category,
          amount: parseFloat(selectedEvent.amount) * 100,
          note: selectedEvent.note,
          description: selectedEvent.description,
        },
      ],
      createdAt: new Date(
        new Date(selectedEvent.date).setHours(0o0, 0o0, 0o0, 0o0)
      ).toISOString(),
    };
    let transfer = {
      events: [
        {
          type: selectedEvent.type.toLowerCase(),
          currency: "BG",
          date: new Date(new Date(selectedEvent.date)).toISOString(),
          from: selectedEvent.from,
          fees: parseFloat(selectedEvent.fees) * 100,
          to: selectedEvent.to,
          amount: parseFloat(selectedEvent.amount) * 100,
          note: selectedEvent.note,
          description: selectedEvent.description,
        },
      ],
      createdAt: new Date(
        new Date(selectedEvent.date).setHours(0o0, 0o0, 0o0, 0o0)
      ).toISOString(),
    };

    if (isEdit) {
      if (selectedEvent.type === "transfer") {
        axios
          .put(
            `http://localhost:5000/transaction/event/edit/${transactionId}/${selectedEvent._id}`,
            transfer.events[0],
            config
          )
          .then(() => {
            getTransactions(state.date);
            handleClearState();
          });
      } else {
        axios
          .put(
            `http://localhost:5000/transaction/event/edit/${transactionId}/${selectedEvent._id}`,
            incomeOrExpense.events[0],
            config
          )
          .then(() => {
            getTransactions(new Date());
            handleClearState();
          });
      }
    } else {
      if (selectedEvent.type === "transfer") {
        axios
          .post(`http://localhost:5000/transaction/create`, transfer, config)
          .then(() => {
            getTransactions(state.date);
            handleClearState();
          });
      } else {
        axios
          .post(
            `http://localhost:5000/transaction/create`,
            incomeOrExpense,
            config
          )
          .then(() => {
            getTransactions(state.date);
            handleClearState();
          });
      }
    }
  };
  const handleDelete = () => {
    let data = {};
    axios
      .put(
        `http://localhost:5000/transaction/event/delete/${transactionId}/${selectedEvent._id}`,
        data,
        config
      )
      .then(() => {
        getTransactions(new Date());
        handleClearState();
      });
  };
  const handleClearState = () => {
    setErrors({ account: "", from: "", category: "", to: "", amount: "" });
    setTransactionIsOpen(false);
    setIsEdit(false);
    setTransactionId("");
    setSelectedEvent({
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
    });
  };
  const handleSelectEvent = (event: Props["event"], transactionId: string) => {
    if (transactionIsOpen) {
      handleClearState();
    } else {
      setTransactionIsOpen(true);
      setTransactionId(transactionId);
      setIsEdit(true);
      let Event = {
        ...event,
        amount: (event.amount / 100).toFixed(2),
        fees: (event.fees / 100).toFixed(2),
      };
      setSelectedEvent(Event);
    }
  };
  const handleOpenTransaction = () => {
    if (transactionIsOpen) {
      setTransactionIsOpen(false);
      setIsEdit(false);
      setErrors({ account: "", from: "", category: "", to: "", amount: "" });
      setSelectedEvent({
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
      });
    } else {
      setTransactionIsOpen(true);
    }
  };
  return (
    <div className={DailyStyle.wrapper}>
      <NavBarMenu
        handlePreviousMonth={() => dispatch(handlePreviousMonth())}
        handleNextMonth={() => dispatch(handleNextMonth())}
        date={state.date}
      />
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
            .map((transaction) => (
              <tbody className={DailyStyle.table_container}>
                <tr>
                  <th>
                    <div className={DailyStyle.date_content}>
                      <div className={DailyStyle.date}>
                        {Moment(transaction.createdAt).format("DD")}
                      </div>
                      <div>
                        <div className={DailyStyle.date_year}>
                          {Moment(transaction.createdAt).format("MM.YYYY")}
                        </div>
                        <div
                          className={
                            transaction.createdAt === new Date()
                              ? DailyStyle.date_day
                              : DailyStyle.date_day_select
                          }
                        >
                          {Moment(transaction.createdAt).format("ddd")}
                        </div>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className={DailyStyle.income}>
                      {(transaction.income / 100).toFixed(2)}
                    </div>
                  </th>
                  <th>
                    <div className={DailyStyle.expense}>
                      {(transaction.expense / 100).toFixed(2)}
                    </div>
                  </th>
                </tr>
                {transaction.events.map((event) => (
                  <DailyTableRow
                    event={event}
                    key={event._id}
                    handleSelectEvent={(event) =>
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
        transaction={selectedEvent}
        errors={errors}
        isEditTransactionOpen={isEdit}
        handleInputChange={handleInput}
        handleSave={handleSave}
        handleOpenTransaction={handleOpenTransaction}
        handleOpenEdit={handleOpenTransaction}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default DailyContainer;
