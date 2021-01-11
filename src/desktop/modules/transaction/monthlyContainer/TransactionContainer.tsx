import React from "react";
import Calendar from "react-calendar";
import TransactionStyl from "./TransactionStyle.module.css";
import AddTransactionModal from "../components/addTransactionModal/AddTransactionModal";
import NavBar from "../components/navBar/NavBar";
import moment from "moment";
import axios from "axios";
import { tokenAuth } from "../../../../../server/src/middleware/tokenAuthentication";
type Props = {
  filters: any;
};
export interface State {
  isAddTransactionOpen: boolean;
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
  isTransfer: boolean;
  errors: {
    account?: string;
    from?: string;
    to?: string;
    category?: string;
    amount: string;
  };
  date: any;
  events: {
    createdAt: any;
    income: number;
    expense: number;
  }[];
}
class TransactionContainer extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }
  state: State = {
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
      note: "",
      description: "",
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
      console.log(new Date(parseInt(this.props.filters.date)),new Date())
      this.setState({
        date: new Date(parseInt(this.props.filters.date)),
      });
      this.getTransactions(new Date(parseInt(this.props.filters.date)));
    } else {
      this.setState({
        date: new Date(),
      });
      this.getTransactions(new Date());
    }
  }

  getTransactions = (date: any) => {
    let firstDay = moment(
      new Date(date.getFullYear(), date.getMonth(), 1)
    ).toISOString();
    let lastDay = moment(
      new Date(date.getFullYear(), date.getMonth() + 1, 0)
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
        `http://localhost:5000/transaction/specificDatePeriod/${firstDay}/${lastDay}`,
        config
      )
      .then((data) => {
        this.setState({ events: data.data });
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

    if (value.account === "") {
      errors.account = "Please select a account";
    }
    if (value.type === "transfer" && value.from === "") {
      errors.from = "Please select a account";
    }
    if (value.category === "") {
      errors.category = "Please select a category";
    }
    if (value.type === "transfer" && value.to === "") {
      errors.to = "Please select a account";
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
    this.getTransactions(new Date(newMonth))
  };
  handlePreviousMonth = () => {
    let Month = new Date(this.state.date).getMonth();
    let Year = this.state.date.getFullYear();
    let newMonth = new Date(Year, Month - 1);
    this.setState({
      date: new Date(newMonth),
    });
    this.getTransactions(new Date(newMonth))
  };
  handleOpenTransaction = (date: any) => {
    if (this.state.isAddTransactionOpen) {
      this.setState({
        isAddTransactionOpen: false,
      });
    } else {
      this.setState({
        isAddTransactionOpen: true,
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

    if (event.target.name === "type" && event.target.value === "transfer") {
      this.setState({
        isTransfer: true,
      });
    } else {
      this.setState({
        isTransfer: false,
      });
    }
  };

  handleSave = () => {
    const errors = this.validateForm(this.state.transaction);
    const isValid = Object.values(errors).filter(Boolean).length <= 0;

    if (!isValid) {
      this.setState({ errors: errors });
      return;
    } else {
      this.setState({ ...this.state, errors: {} });
    }
    console.log(this.state.transaction);
  };

  handleSetEvent = (date: any, view: any) => {
    return (
      <div>
        {this.state.events.map((event) => (
          <div>
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
            onChange={(date) => console.log(date)}
            className={TransactionStyl.calendar}
            onClickDay={(date) => this.handleOpenTransaction(date)}
            showNavigation={false}
            tileContent={({ date, view }) => this.handleSetEvent(date, view)}
          />
        </div>
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
