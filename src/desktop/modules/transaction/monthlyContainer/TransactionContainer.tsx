import React from "react";
import Calendar from "react-calendar";
import TransactionStyl from "./TransactionStyle.module.css";
import AddTransactionModal from "../components/addTransactionModal/AddTransactionModal";
import NavBar from "../components/navBar/NavBar";
import moment from "moment";
import axios from "axios";
import InfoModal from "../components/infoModal/InfoModal";
type Props = {
  filters: any;
};
export interface State {
  isAddTransactionOpen: boolean;
  isInfoTransactionOpen: boolean;

  transaction: {
    type: string;
    date: any;
    account?: string;
    from?: string;
    to?: string;
    category?: string;
    amount: string;
    note: string;
    description: string;
  };
  selectedDay: State["transaction"][];

  isTransfer: boolean;
  errors: {
    account?: string;
    from?: string;
    to?: string;
    category?: string;
    amount: string;
  };
  date: any;
  specificDay: {
    events: {
      type: string;
      date: any;
      account?: string;
      from?: string;
      to?: string;
      category?: string;
      amount: string;
      note: string;
      description: string;
    }[];
  };
  events: {
    createdAt: any;
    events: State["transaction"];
    income: number;
    expense: number;
  }[];
}
class TransactionContainer extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }
  state: State = {
    isInfoTransactionOpen: false,
    isAddTransactionOpen: false,
    date: new Date(),
    isTransfer: false,
    transaction: {
      type: "income",
      date: "",
      account: "",
      from: "",
      category: "",
      to: "",
      amount: "0",
      note: "kkkkkkk",
      description: "kkkkkkkkkk",
    },
    selectedDay: [],

    specificDay: {
      events: [],
    },
    errors: {
      account: "",
      from: "",
      category: "",
      to: "",
      amount: "",
    },
    events: [],
  };

  componentDidMount() {
    if (this.props.filters.date) {
      this.setState({
        date: new Date(this.props.filters.date),
      });
      this.getTransactions(new Date(this.props.filters.date));
    } else {
      this.setState({
        date: new Date(),
      });
      this.getTransactions(new Date());
    }
  }

  getTransactions = (date: any) => {
    let firstDay=moment(date).startOf('month').startOf('week').get('date')
    let firstMonth=moment(date).startOf('month').startOf('week').get('month')
    let firstYear=moment(date).startOf('month').startOf('week').get("year")
    let lastDay=moment(date).endOf('month').endOf('week').get('date')
    let lastMonth=moment(date).endOf('month').endOf('week').get('month')
    let lastYear=moment(date).endOf('month').endOf('week').get("year")

    let from = moment(
      new Date(firstYear, firstMonth, firstDay)
    ).toISOString();
    let to = moment(
      new Date(lastYear, lastMonth, lastDay)
    ).toISOString();
    let config = {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjRjZjcyMDIwNTM5MmM3MGU5MmJlZiIsImlhdCI6MTYxMDIyNzAwOH0.bL8WKWjEe1NP2-07udR7ORGkraoavQZEyjtOUd9-5Po",
      },
    };
    axios
      .get(
        `http://localhost:5000/transaction/specificDatePeriod/${from}/${to}`,
        config
      )
      .then((data) => {
        this.setState({ events: data.data.transactions });
      });
  };
  validateForm = (value: State["transaction"]) => {
    let errors = {
      account: "",
      from: "",
      category: "",
      to: "",
      amount: "",
    };

    if (value.account === "" && !(value.type === "transfer")) {
      errors.account = "Please select a account";
    }
    if (value.type === "transfer" && value.from === "") {
      errors.from = "Please select  from";
    }
    if (value.category === "" && !(value.type === "transfer")) {
      errors.category = "Please select a category";
    }
    if (value.type === "transfer" && value.to === "") {
      errors.to = "Please select  to";
    }
    if (value.amount === "") {
      errors.amount = "Please select a amount";
    }
    return errors;
  };
  handleNextMonth = () => {
    let Month = new Date(this.state.date).getMonth();
    let Year = this.state.date.getFullYear();
    let newMonth = new Date(Year, Month + 1);
    this.setState({
      date: new Date(newMonth),
    });
    this.getTransactions(new Date(newMonth));
  };
  handlePreviousMonth = () => {
    let Month = new Date(this.state.date).getMonth();
    let Year = this.state.date.getFullYear();
    let newMonth = new Date(Year, Month - 1);
    this.setState({
      date: new Date(newMonth),
    });
    this.getTransactions(new Date(newMonth));
  };
  handleOpenTransaction = (date: any) => {
    if (this.state.isAddTransactionOpen) {
      this.setState({
        isAddTransactionOpen: false,
      });
    } else {
      this.setState({
        isAddTransactionOpen: true,
      });
    }
  };
  handleOpenInfoModal = (date: any) => {
    if (this.state.isInfoTransactionOpen) {
      this.setState({
        isInfoTransactionOpen: false,
        selectedDay: [],
      });
    } else {
      this.state.events.map((event) => {
        if (new Date(date).getDate() === new Date(event.createdAt).getDate()) {
          this.setState({
            selectedDay: event.events,
          });
        }
      });
      this.setState({
        isInfoTransactionOpen: true,
        transaction: { ...this.state.transaction, date: new Date(date) },
      });
    }
  };
  handleInputChange = (event: any) => {
    this.setState({
      ...this.state,
      transaction: {
        ...this.state.transaction,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSave = () => {
    const { transaction } = this.state;
    const errors = this.validateForm(transaction);
    const isValid = Object.values(errors).filter(Boolean).length <= 0;

    if (!isValid) {
      this.setState({ errors: errors });
      return;
    } else {
      this.setState({ ...this.state, errors: {} });
    }
    let incomeOrExpense = {
      events: [
        {
          type: transaction.type.toLowerCase(),
          currency: "BG",
          date: new Date(
            new Date(transaction.date).setHours(16, 33, 22)
          ).toISOString(),
          account: transaction.account,
          category: transaction.category,
          amount: parseFloat(transaction.amount) * 100,
          note: transaction.note,
          description: transaction.description,
        },
      ],
      createdAt: new Date(
        new Date(transaction.date).setHours(0o0, 0o0, 0o0)
      ).toISOString(),
    };

    let transfer = {
      events: [
        {
          type: transaction.type.toLowerCase(),
          currency: "BG",
          date: new Date(
            new Date(transaction.date).setHours(13, 21, 30)
          ).toISOString(),
          from: transaction.from,
          to: transaction.to,
          amount: parseFloat(transaction.amount) * 100,
          note: transaction.note,
          description: transaction.description,
        },
      ],
      createdAt: new Date(
        new Date(transaction.date).setHours(0o0, 0o0, 0o0)
      ).toISOString(),
    };

    let config = {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjRjZjcyMDIwNTM5MmM3MGU5MmJlZiIsImlhdCI6MTYxMDIyNzAwOH0.bL8WKWjEe1NP2-07udR7ORGkraoavQZEyjtOUd9-5Po",
      },
    };

    if (transaction.type === "transfer") {
      axios
        .post(`http://localhost:5000/transaction/create`, transfer, config)
        .then(() => {
          this.getTransactions(transaction.date);
          this.setState({
            isAddTransactionOpen: false,
            transaction: {
              type: "income",
              date: "",
              account: "",
              from: "",
              category: "",
              to: "",
              amount: "0",
              note: "kkkkkkk",
              description: "kkkkkkkkkk",
            },
          });
        });
    } else {
      axios
        .post(
          `http://localhost:5000/transaction/create`,
          incomeOrExpense,
          config
        )
        .then(() => {
          this.getTransactions(transaction.date);
          this.setState({
            isAddTransactionOpen: false,
            transaction: {
              type: "income",
              date: "",
              account: "",
              from: "",
              category: "",
              to: "",
              amount: "0",
              note: "kkkkkkk",
              description: "kkkkkkkkkk",
            },
          });
        });
    }
  };

  handleGetSpecificDay = async (event: any) => {
    await this.setState({ specificDay: event });
  };

  handleSetEvent = (date: any, view: any) => {
    return (
      <div>
        {this.state.events.map((event) => (
          <div onClick={() => this.handleGetSpecificDay(event)}>
            {view === "month" &&
            date.getDate() === new Date(event.createdAt).getDate() &&
            date.getMonth() === new Date(event.createdAt).getMonth() &&
            date.getFullYear() === new Date(event.createdAt).getFullYear() ? (
              <div className={TransactionStyl.content_day}>
                <div className={TransactionStyl.income}>
                  ${(event.income / 100).toFixed(2)}
                </div>
                <div className={TransactionStyl.expense}>
                  ${(event.expense / 100).toFixed(2)}
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  };

  render() {
    const {
      isAddTransactionOpen,
      transaction,
      errors,
      isTransfer,
      isInfoTransactionOpen,
      specificDay,
      selectedDay,
    } = this.state;
    return (
      <div className={TransactionStyl.wrapper}>
        <NavBar
          handlePreviousMonth={this.handlePreviousMonth}
          handleNextMonth={this.handleNextMonth}
          date={this.state.date}
        />
        <div className={TransactionStyl.container}>
          <Calendar
            activeStartDate={this.state.date}
            // onChange={(date) => console.log(date)}
            className={TransactionStyl.calendar}
            onClickDay={(date) => this.handleOpenInfoModal(date)}
            showNavigation={false}
            tileContent={({ date, view }) => this.handleSetEvent(date, view)}
          />
        </div>
        <InfoModal
          selectedDay={selectedDay}
          specificDay={specificDay}
          transaction={transaction}
          isInfoTransactionOpen={isInfoTransactionOpen}
          handleOpenTransaction={this.handleOpenTransaction}
          handleOpenInfoModal={this.handleOpenInfoModal}
        />
        <AddTransactionModal
          handleOpenTransaction={this.handleOpenTransaction}
          isTransfer={isTransfer}
          isAddTransactionOpen={isAddTransactionOpen}
          transaction={transaction}
          handleInputChange={this.handleInputChange}
          errors={errors}
          handleSave={this.handleSave}
        />
      </div>
    );
  }
}

export default TransactionContainer;
