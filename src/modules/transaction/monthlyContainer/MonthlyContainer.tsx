import React from "react";
import TransactionStyl from "./MonthlyStyle.module.css";
import AddTransactionModal from "../components/addTransactionModal/AddTransactionModal";
import NavBarMenu from "../../../layout/navBar/NavBar";
import moment from "moment";
import InfoModal from "../components/infoModal/InfoModal";
import Calendar from "./Calendar";
import { connect } from "react-redux";
import { State as StateTransaction } from "../reducers/transactionReducer";
import {
  dayStartOfTheWeekOfTheMonth,
  monthStartOfTheWeekOfTheMonth,
  yearStartOfTheWeekOfTheMonth,
  dayEndOfTheWeekOfTheMonth,
  monthEndOfTheWeekOfTheMonth,
  yearEndOfTheWeekOfTheMonth,
  dayStartOfTheMonth,
  monthStartOfTheMonth,
  yearStartOfTheMonth,
  dayEndOfTheMonth,
  monthEndOfTheMonth,
  yearEndOfTheMonth,
  transactionEvent,
} from "../../../helpers/Variables";
import { validateTransaction } from "../../../helpers/Validation";
import {
  createTransactionRequest,
  deleteTransaction,
  editTransaction,
  getSpecificDatePeriod,
} from "../service/TransactionService";
import { handleInput, setTransaction } from "../actions/transactionActions";
import {
  Transaction,
  Errors,
  HandleInput,
  TransactionEvent,
  TransactionReducer,
} from "../../../helpers/ITransactions";

type Props = {
  filters: any;
  stateTransaction: StateTransaction;
  handleInput: (event: HandleInput) => void;
  setTransaction: (event: TransactionEvent) => void;
};

type State = {
  isAddTransactionOpen: boolean;
  isInfoTransactionOpen: boolean;
  isEditTransactionOpen: boolean;
  selectedDay: Transaction;
  isTransfer: boolean;
  errors: Errors;
  date: Date;
  calendarDates: { date: Date }[];
  transactions: Transaction[];
};

class MonthlyContainer extends React.Component<Props> {
  state: State = {
    isInfoTransactionOpen: false,
    isAddTransactionOpen: false,
    isEditTransactionOpen: false,
    date: new Date(),
    isTransfer: false,
    selectedDay: {
      _id: "",
      createdAt: new Date(),
      events: [],
      expense: 0,
      income: 0,
    },
    errors: {
      account: "",
      from: "",
      category: "",
      to: "",
      amount: "",
    },
    transactions: [],
    calendarDates: [],
  };

  componentDidMount() {
    const { stateTransaction, filters } = this.props;
    console.log(filters);
    if (filters.date) {
      this.setState({
        date: new Date(this.props.filters.date),
      });
      this.getTransactions(new Date(filters.date));
      this.setCalendar(new Date(filters.date));
    } else {
      this.setState({
        date: stateTransaction.date,
      });
      this.getTransactions(stateTransaction.date);
    }
    if (filters.date === undefined) {
      this.setCalendar(stateTransaction.date);
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    const { date } = this.props.stateTransaction;

    if (prevProps.stateTransaction.date !== date) {
      this.setCalendar(date);
      this.getTransactions(date);
    }
  }

  getTransactions = async (date: Date) => {
    let from = new Date(
      yearStartOfTheWeekOfTheMonth(date),
      monthStartOfTheWeekOfTheMonth(date),
      dayStartOfTheWeekOfTheMonth(date)
    );

    let to = new Date(
      yearEndOfTheWeekOfTheMonth(date),
      monthEndOfTheWeekOfTheMonth(date),
      dayEndOfTheWeekOfTheMonth(date)
    );

    let data = await getSpecificDatePeriod(from, to);
    data.transactions.map((transaction: Transaction) => {
      if (
        new Date(this.state.selectedDay.createdAt).getDate() ===
          new Date(transaction.createdAt).getDate() &&
        new Date(this.state.selectedDay.createdAt).getMonth() ===
          new Date(transaction.createdAt).getMonth()
      ) {
        this.setState({
          selectedDay: transaction,
        });
      }
    });
    this.setState({ transactions: data.transactions });
  };

  handleDelete = async (eventId: string) => {
    await deleteTransaction(this.state.selectedDay._id, eventId);
    let newEvents = this.state.selectedDay.events.filter(
      event => event._id !== eventId
    );
    this.setState({
      selectedDay: { ...this.state.selectedDay, events: newEvents },
      isEditTransactionOpen: false,
    });
    this.clearState();
    this.getTransactions(this.state.date);
  };
  handleOpenEdit = (event: TransactionEvent) => {
    const { isEditTransactionOpen } = this.state;
    if (isEditTransactionOpen) {
      this.setState({ isEditTransactionOpen: false });
      this.clearState();
    } else {
      this.setState({
        isEditTransactionOpen: true,
      });

      this.props.setTransaction({
        ...event,
        amount: (parseFloat(event.amount) / 100).toFixed(2),
        fees: (parseFloat(event.fees) / 100).toFixed(2),
      });
    }
  };
  handleNextDay = async () => {
    const { selectedDay, transactions } = this.state;

    let date = new Date(selectedDay.createdAt);

    let newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    await this.setState({
      selectedDay: { createdAt: newDate, events: [] },
      date: newDate,
    });

    await transactions.map(transaction => {
      if (
        newDate.getDate() === new Date(transaction.createdAt).getDate() &&
        newDate.getMonth() === new Date(transaction.createdAt).getMonth()
      ) {
        this.setState({
          selectedDay: transaction,
        });
      }
    });
  };
  handlePreviousDay = async () => {
    const { selectedDay, transactions } = this.state;

    let date = new Date(selectedDay.createdAt);

    let newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 1
    );
    this.setState({
      selectedDay: { createdAt: newDate, events: [] },
      date: newDate,
    });

    await transactions.map(transaction => {
      if (
        newDate.getDate() === new Date(transaction.createdAt).getDate() &&
        newDate.getMonth() === new Date(transaction.createdAt).getMonth()
      ) {
        this.setState({
          selectedDay: transaction,
        });
      }
    });
  };
  handleOpenTransaction = () => {
    if (this.state.isAddTransactionOpen) {
      this.setState({
        isAddTransactionOpen: false,
      });
      this.clearState();
    } else {
      this.props.handleInput({
        target: {
          name: "date",
          value: this.state.selectedDay.createdAt,
        },
      });
      this.setState({
        isAddTransactionOpen: true,
      });
    }
  };
  handleOpenInfoModal = (date: Date) => {
    const { isInfoTransactionOpen } = this.state;
    if (isInfoTransactionOpen) {
      this.setState({
        isInfoTransactionOpen: false,
        selectedDay: { events: [] },
      });
    } else {
      this.setState({
        isInfoTransactionOpen: true,
        selectedDay: { createdAt: new Date(date), events: [] },
      });
      this.selectedDay(date);
    }
  };
  selectedDay = (date: Date) => {
    this.state.transactions.forEach(transaction => {
      if (
        new Date(date).getDate() ===
          new Date(transaction.createdAt).getDate() &&
        new Date(date).getMonth() === new Date(transaction.createdAt).getMonth()
      ) {
        this.setState({
          selectedDay: transaction,
        });
      }
    });
  };

  handleSave = async () => {
    const { isEditTransactionOpen, selectedDay } = this.state;
    const { transaction, date } = this.props.stateTransaction;
    const errors = validateTransaction(transaction);
    const isValid = Object.values(errors).filter(Boolean).length <= 0;

    if (!isValid) {
      this.setState({ errors: errors });
      return;
    }
    let event = transactionEvent(transaction);
    console.log(event);
    if (isEditTransactionOpen) {
      await editTransaction(selectedDay._id, transaction._id, event.events[0]);
      this.getTransactions(transaction.date);
      this.clearState();
    } else {
      await createTransactionRequest(event);
      this.getTransactions(date);
      this.clearState();
    }
    this.setState({
      ...this.state,
      errors: {},
      isAddTransactionOpen: false,
      isEditTransactionOpen: false,
    });
  };

  clearState = () => {
    this.props.setTransaction({
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
    });
  };

  setCalendar = async (date: Date) => {
    await this.setState({ calendarDates: [] });
    const { calendarDates } = this.state;

    let fromDate = new Date(
      yearStartOfTheMonth(date),
      monthStartOfTheMonth(date),
      dayStartOfTheMonth(date)
    );

    let toDate = new Date(
      yearEndOfTheMonth(date),
      monthEndOfTheMonth(date),
      dayEndOfTheMonth(date)
    );

    if (fromDate.getDay() !== 1 && fromDate.getDay() !== 0) {
      this.setFirstWeek(date);
    }

    if (fromDate.getDay() === 0) {
      let lastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
      for (let i = lastDay - 5; i <= lastDay; i++) {
        calendarDates.push({
          date: new Date(date.getFullYear(), date.getMonth() - 1, i),
        });
      }
    }

    for (let i = 1; i <= toDate.getDate(); i++) {
      calendarDates.push({
        date: new Date(date.getFullYear(), date.getMonth(), i),
      });
    }

    if (toDate.getDay() !== 0) {
      this.setLastWeek(date);
    }
  };

  setFirstWeek = (date: Date) => {
    let fromDate = new Date(
      yearStartOfTheWeekOfTheMonth(date),
      monthStartOfTheWeekOfTheMonth(date),
      dayStartOfTheWeekOfTheMonth(date) + 1
    );

    let toDate = new Date(
      yearEndOfTheMonth(fromDate),
      monthEndOfTheMonth(fromDate),
      dayEndOfTheMonth(fromDate)
    );

    for (let i = fromDate.getDate(); i <= toDate.getDate(); i++) {
      this.state.calendarDates.push({
        date: new Date(fromDate.getFullYear(), fromDate.getMonth(), i),
      });
    }
  };
  setLastWeek = (date: Date) => {
    let toDate = new Date(
      yearEndOfTheWeekOfTheMonth(date),
      monthEndOfTheWeekOfTheMonth(date),
      dayEndOfTheWeekOfTheMonth(date) + 1
    );

    for (let i = 1; i <= toDate.getDate(); i++) {
      this.state.calendarDates.push({
        date: new Date(toDate.getFullYear(), toDate.getMonth(), i),
      });
    }
  };

  render() {
    const {
      errors,
      selectedDay,
      transactions,
      calendarDates,
      isAddTransactionOpen,
      isEditTransactionOpen,
      isInfoTransactionOpen,
    } = this.state;
    const { date, transaction } = this.props.stateTransaction;
    return (
      <div className={TransactionStyl.wrapper}>
        <NavBarMenu />
        <Calendar
          handleOpenInfoModal={this.handleOpenInfoModal}
          transactions={transactions}
          calendarDates={calendarDates}
          date={date}
        />

        <InfoModal
          handleDelete={this.handleDelete}
          selectedDay={selectedDay}
          handleNextDay={this.handleNextDay}
          isInfoTransactionOpen={isInfoTransactionOpen}
          handlePreviousDay={this.handlePreviousDay}
          handleOpenInfoModal={this.handleOpenInfoModal}
          handleOpenTransaction={this.handleOpenTransaction}
          handleOpenEdit={this.handleOpenEdit}
        />
        <AddTransactionModal
          isEditTransactionOpen={isEditTransactionOpen}
          errors={errors}
          transactionEvent={transaction}
          handleSave={this.handleSave}
          handleOpenEdit={this.handleOpenEdit}
          handleInputChange={this.props.handleInput}
          isAddTransactionOpen={isAddTransactionOpen}
          handleOpenTransaction={this.handleOpenTransaction}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: { transactionReducer: TransactionReducer }) => {
  return {
    stateTransaction: state.transactionReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleInput: (event: HandleInput) => dispatch(handleInput(event)),
    setTransaction: (event: TransactionEvent) =>
      dispatch(setTransaction(event)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyContainer);
