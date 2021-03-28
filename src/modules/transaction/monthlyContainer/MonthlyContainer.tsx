import React from "react";
import styles from "./MonthlyStyle.module.css";
import AddTransactionModal from "../components/addTransactionModal/AddTransactionModal";
import NavBarMenu from "../../../layout/navBar/NavBar";
import Moment from "moment";
import InfoModal from "../components/infoModal/InfoModal";
import Calendar from "./Calendar";
import { connect } from "react-redux";
import { State as StateTransaction } from "../reducers/transactionReducer";
import {
  firstDateOfFirstWeekOfTheMonth,
  transactionEvent,
  firstDateOfTheMonth,
  lastDateOfTheMonth,
  lastDateOfLastWeekOfTheMonth,
  isTheSameDate,
} from "../../../helpers/Variables";
import { validateTransaction } from "../../../helpers/Validation";
import {
  createTransactionRequest,
  deleteTransaction,
  editTransaction,
  getSpecificDatePeriod,
} from "../service/TransactionService";
import {
  handleInput,
  setDate,
  setTransaction,
} from "../actions/transactionActions";
import {
  Transaction,
  TransactionEvent,
  TransactionReducer,
} from "../../../models/Transaction";
import { HandleInput } from "../../../models/Function";
import { Error } from "../../../models/Error";

type Props = {
  filters: any;
  stateTransaction: StateTransaction;
  handleInput: (event: HandleInput) => void;
  setTransaction: (event: TransactionEvent) => void;
  setDate: (date: Date) => void;
};

type State = {
  isAddTransactionOpen: boolean;
  isInfoTransactionOpen: boolean;
  isEditTransactionOpen: boolean;
  selectedDay: Transaction;
  isTransfer: boolean;
  errors: Error;
  date: Date;
  calendarDates: { date: Date }[];
  transactions: Transaction[];
};

class MonthlyContainer extends React.Component<Props> {
  state: State = {
    isInfoTransactionOpen: false,
    isAddTransactionOpen: false,
    isEditTransactionOpen: false,
    date: Moment().toDate(),
    isTransfer: false,
    selectedDay: {
      _id: "",
      createdAt: Moment().startOf("date").toDate(),
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
    const { stateTransaction, filters, setDate } = this.props;
    if (filters.date) {
      console.log("filter");
      this.setState({
        date: filters.date,
      });
      setDate(filters.date);
      this.getTransactions(filters.date);
      this.setCalendar(filters.date);
    } else {
      console.log("datte");
      this.setState({
        date: stateTransaction.date,
      });
      this.getTransactions(stateTransaction.date);
      this.setCalendar(stateTransaction.date);
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    const { stateTransaction, filters } = this.props;

    if (prevProps.stateTransaction.date !== stateTransaction.date) {
      console.log("datte");
      if (!filters.date) {
        this.setCalendar(stateTransaction.date);
        this.getTransactions(stateTransaction.date);
      }
    }
  }

  getTransactions = async (date: Date) => {
    const { selectedDay } = this.state;
    let from: Date = firstDateOfFirstWeekOfTheMonth(date).toDate();
    let to: Date = lastDateOfLastWeekOfTheMonth(date).toDate();

    let data = await getSpecificDatePeriod(from, to);
    data.transactions.map((transaction: Transaction) => {
      if (isTheSameDate(selectedDay.createdAt, transaction.createdAt)) {
        this.setState({
          selectedDay: transaction,
        });
      }
    });
    this.setState({ transactions: data.transactions });
  };

  handleDelete = async (eventId: string) => {
    await deleteTransaction(this.state.selectedDay._id, eventId);
    let newEvents: TransactionEvent[] = this.state.selectedDay.events.filter(
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
        fees: (parseFloat(event.fees!) / 100).toFixed(2),
      });
    }
  };
  handleNextDay = async () => {
    const { selectedDay, transactions } = this.state;

    let newDate: Date = Moment(selectedDay.createdAt).add(1, "days").toDate();

    await this.setState({
      selectedDay: { createdAt: newDate, events: [] },
      date: newDate,
    });

    await transactions.map(transaction => {
      if (isTheSameDate(newDate, transaction.createdAt)) {
        this.setState({
          selectedDay: transaction,
        });
      }
    });
  };
  handlePreviousDay = async () => {
    const { selectedDay, transactions } = this.state;

    let newDate: Date = Moment(selectedDay.createdAt).add(-1, "days").toDate();
    this.setState({
      selectedDay: { createdAt: newDate, events: [] },
      date: newDate,
    });

    await transactions.map(transaction => {
      if (isTheSameDate(newDate, transaction.createdAt)) {
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
        selectedDay: { createdAt: date, events: [] },
      });
      this.selectedDay(date);
    }
  };
  selectedDay = (date: Date) => {
    this.state.transactions.forEach(transaction => {
      if (isTheSameDate(date, transaction.createdAt)) {
        this.setState({
          selectedDay: transaction,
        });
      }
    });
  };

  handleSave = async () => {
    const { isEditTransactionOpen, selectedDay } = this.state;
    const { transaction, date } = this.props.stateTransaction;
    const errors: Error = validateTransaction(transaction);
    const isValid: boolean = Object.values(errors).filter(Boolean).length <= 0;

    if (!isValid) {
      this.setState({ errors: errors });
      return;
    }
    let event = transactionEvent(transaction);

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
      date: Moment().toDate(),
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

    if (firstDateOfTheMonth(date).get("day") !== 1) {
      this.setFirstWeek(date);
    }

    for (let i = 1; i <= lastDateOfTheMonth(date).get("date"); i++) {
      calendarDates.push({
        date: Moment(firstDateOfTheMonth(date)).set("date", i).toDate(),
      });
    }

    if (lastDateOfTheMonth(date).get("day") !== 0) {
      this.setLastWeek(date);
    }
  };

  setFirstWeek = (date: Date) => {
    const lastDateOfPreviusMonth: number = Moment(date)
      .set("date", 0)
      .get("date");

    for (
      let i = firstDateOfFirstWeekOfTheMonth(date).get("date");
      i <= lastDateOfPreviusMonth;
      i++
    ) {
      this.state.calendarDates.push({
        date: Moment(firstDateOfFirstWeekOfTheMonth(date))
          .set("date", i)
          .toDate(),
      });
    }
  };
  setLastWeek = (date: Date) => {
    for (let i = 1; i <= lastDateOfLastWeekOfTheMonth(date).get("date"); i++) {
      this.state.calendarDates.push({
        date: Moment(lastDateOfLastWeekOfTheMonth(date))
          .set("date", i)
          .toDate(),
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
      <div className={styles.wrapper}>
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
    setDate: (date: Date) => dispatch(setDate(date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyContainer);
