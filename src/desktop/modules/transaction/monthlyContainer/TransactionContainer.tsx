import React from "react";
import TransactionStyl from "./TransactionStyle.module.css";
import AddTransactionModal from "../components/addTransactionModal/AddTransactionModal";
import NavBarMenu from "../../../layout/navBarMenu/NavBarMenu";
import moment from "moment";
import axios from "axios";
import InfoModal from "../components/infoModal/InfoModal";
import NewCalendar from "./NewCalendar";

type Props = {
  filters: any;
};
export interface State {
  isAddTransactionOpen: boolean;
  isInfoTransactionOpen: boolean;

  transaction: {
    _id?: string;
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
  selectedDay: {
    _id?: string;
    createdAt?: any;
    events: State["transaction"][];
    income?: number;
    expense?: number;
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
  transactions: {
    _id: string;
    createdAt: any;
    events: State["transaction"][];
    income: number;
    expense: number;
  }[];
  calendarDates: {
    date: any;
  }[];
}
class TransactionContainer extends React.Component<Props> {
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
      note: "",
      description: "",
    },
    selectedDay: {
      events:[]
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
    this.setCalendar(new Date());
  }

  getTransactions = (date: any) => {
    let firstDay = moment(date).startOf("month").startOf("week").get("date");
    let firstMonth = moment(date).startOf("month").startOf("week").get("month");
    let firstYear = moment(date).startOf("month").startOf("week").get("year");
    let lastDay = moment(date).endOf("month").endOf("week").get("date");
    let lastMonth = moment(date).endOf("month").endOf("week").get("month");
    let lastYear = moment(date).endOf("month").endOf("week").get("year");

    let from = moment(new Date(firstYear, firstMonth, firstDay));
    let to = moment(new Date(lastYear, lastMonth, lastDay));

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
        this.setState({ transactions: data.data.transactions });
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
  handleDelete = (transactionId: any, eventId: any) => {
    let config = {
      headers: {
        Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjRjZjcyMDIwNTM5MmM3MGU5MmJlZiIsImlhdCI6MTYxMDIyNzAwOH0.bL8WKWjEe1NP2-07udR7ORGkraoavQZEyjtOUd9-5Po",
      },
    };
let data={}
    axios
      .put(
        `http://localhost:5000/transaction/event/delete/${transactionId}/${eventId}`,
        data,config
      )
      .then(() => {
        this.getTransactions(this.state.date);
      });
  };
  handleNextMonth = async () => {
    const { date } = this.state;
    let Month = new Date(date).getMonth();
    let Year = date.getFullYear();
    let newMonth = new Date(Year, Month + 1);
    await this.setState({
      date: new Date(newMonth),
      calendarDates: [],
    });
    this.getTransactions(new Date(newMonth));
    this.setCalendar(new Date(newMonth));
  };
  handlePreviousMonth = async () => {
    const { date } = this.state;
    let Month = new Date(date).getMonth();
    let Year = date.getFullYear();
    let newMonth = new Date(Year, Month - 1);
    await this.setState({
      date: new Date(newMonth),
      calendarDates: [],
    });
    this.getTransactions(new Date(newMonth));
    this.setCalendar(new Date(newMonth));
  };
  handleOpenTransaction = () => {
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
    const { isInfoTransactionOpen, transactions, transaction } = this.state;

    if (isInfoTransactionOpen) {
      this.setState({
        isInfoTransactionOpen: false,
        selectedDay: {events:[]},
      });
    } else {
      transactions.map((transaction) => {
        if (
          new Date(date).getDate() ===
            new Date(transaction.createdAt).getDate() &&
          new Date(date).getMonth() ===
            new Date(transaction.createdAt).getMonth()
        ) {
          this.setState({
            selectedDay: transaction,
          });
        }
      });
      this.setState({
        isInfoTransactionOpen: true,
        transaction: { ...transaction, date: new Date(date) },
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
              note: "",
              description: "",
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
          this.getTransactions(this.state.date);
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
              note: "",
              description: "",
            },
          });
        });
    }
  };

  handleGetSpecificDay = async (event: any) => {
    await this.setState({ specificDay: event });
  };

  // handleSetEvent = (date: any, view: any) => {
  //   return (
  //     <div>
  //       {this.state.events.map((event) => (
  //         <div onClick={() => this.handleGetSpecificDay(event)}>
  //           {view === "month" &&
  //           date.getDate() === new Date(event.createdAt).getDate() &&
  //           date.getMonth() === new Date(event.createdAt).getMonth() &&
  //           date.getFullYear() === new Date(event.createdAt).getFullYear() ? (
  //             <div className={TransactionStyl.content_day}>
  //               <div className={TransactionStyl.income}>
  //                 ${(event.income / 100).toFixed(2)}
  //               </div>
  //               <div className={TransactionStyl.expense}>
  //                 ${(event.expense / 100).toFixed(2)}
  //               </div>
  //             </div>
  //           ) : null}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  setCalendar = (date: any) => {
    const { calendarDates } = this.state;
    let firstDay = moment(date).startOf("month").get("date");
    let firstMonth = moment(date).startOf("month").get("month");
    let firstYear = moment(date).startOf("month").get("year");

    let fromDate = new Date(firstYear, firstMonth, firstDay);

    let lastDay = moment(date).endOf("month").get("date");
    let lastMonth = moment(date).endOf("month").get("month");
    let lastYear = moment(date).endOf("month").get("year");

    let toDate = new Date(lastYear, lastMonth, lastDay);

    if (fromDate.getDay() !== 0) {
      this.setFirstWeek(date);
    }

    for (let i = 1; i <= toDate.getDate(); i++) {
      calendarDates.push({
        date: new Date(date.getFullYear(), date.getMonth(), i),
      });
    }
    if (toDate.getDay() !== 6) this.setLastWeek(date);
  };
  setFirstWeek = (date: any) => {
    let firstDay = moment(date).startOf("month").startOf("week").get("date");
    let firstMonth = moment(date).startOf("month").startOf("week").get("month");
    let firstYear = moment(date).startOf("month").startOf("week").get("year");

    let fromDate = new Date(firstYear, firstMonth, firstDay);

    let lastDay = moment(fromDate).endOf("month").get("date");
    let lastMonth = moment(fromDate).endOf("month").get("month");
    let lastYear = moment(fromDate).endOf("month").get("year");

    let toDate = new Date(lastYear, lastMonth, lastDay);

    for (let i = fromDate.getDate(); i <= toDate.getDate(); i++) {
      this.state.calendarDates.push({
        date: new Date(fromDate.getFullYear(), fromDate.getMonth(), i),
      });
    }
  };
  setLastWeek = (date: any) => {
    let lastDay = moment(date).endOf("month").endOf("week").get("date");
    let lastMonth = moment(date).endOf("month").endOf("week").get("month");
    let lastYear = moment(date).endOf("month").endOf("week").get("year");

    let toDate = new Date(lastYear, lastMonth, lastDay);

    for (let i = 1; i <= toDate.getDate(); i++) {
      this.state.calendarDates.push({
        date: new Date(toDate.getFullYear(), toDate.getMonth(), i),
      });
    }
  };

  render() {
    const {
      date,
      errors,
      isTransfer,
      selectedDay,
      transaction,
      transactions,
      calendarDates,
      isAddTransactionOpen,
      isInfoTransactionOpen,
    } = this.state;
    return (
      <div className={TransactionStyl.wrapper}>
        <NavBarMenu
          date={date}
          handleNextMonth={this.handleNextMonth}
          handlePreviousMonth={this.handlePreviousMonth}
        />
        <NewCalendar
          handleOpenInfoModal={this.handleOpenInfoModal}
          transactions={transactions}
          calendarDate={calendarDates}
          date={date}
        />
        <InfoModal
          handleDelete={this.handleDelete}
          selectedDay={selectedDay}
          transaction={transaction}
          isInfoTransactionOpen={isInfoTransactionOpen}
          handleOpenInfoModal={this.handleOpenInfoModal}
          handleOpenTransaction={this.handleOpenTransaction}
        />
        <AddTransactionModal
          errors={errors}
          isTransfer={isTransfer}
          transaction={transaction}
          handleSave={this.handleSave}
          handleInputChange={this.handleInputChange}
          isAddTransactionOpen={isAddTransactionOpen}
          handleOpenTransaction={this.handleOpenTransaction}
        />
      </div>
    );
  }
}

export default TransactionContainer;

{
  /*<Calendar*/
}
{
  /*  activeStartDate={this.state.date}*/
}
{
  /*  // onChange={(date) => console.log(date)}*/
}
{
  /*  calendarType={"US"}*/
}
{
  /*  className={TransactionStyl.calendar}*/
}
{
  /*  onClickDay={(date) => this.handleOpenInfoModal(date)}*/
}
{
  /*  showNavigation={false}*/
}
{
  /*  tileContent={({ date, view }) => this.handleSetEvent(date, view)}*/
}
{
  /*/>*/
}
