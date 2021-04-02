import Moment from "moment";
import { TransactionEvent } from "../models/Transaction";

export const firstDateOfTheMonth = (date: Date) =>
  Moment(date).startOf("month");

export const lastDateOfTheMonth = (date: Date) => Moment(date).endOf("month");

export const firstDateOfFirstWeekOfTheMonth = (date: Date) =>
  firstDateOfTheMonth(date).startOf("isoWeek");

export const lastDateOfFirstWeekOfTheMonth = (date: Date) =>
  firstDateOfTheMonth(date).endOf("isoWeek");

export const firstDateOfLastWeekOfTheMonth = (date: Date) =>
  lastDateOfTheMonth(date).startOf("isoWeek");

export const lastDateOfLastWeekOfTheMonth = (date: Date) =>
  lastDateOfTheMonth(date).startOf("day").endOf("isoWeek");

export const isTheSameDate = (calendarDate: Date, transactionDate: Date) =>
  Moment(calendarDate).diff(transactionDate, "day") === 0;

export const isTypeTransfer = (type: string) => type.toLowerCase() === Transfer;

export const isTransactionContainer = (pathname: string) =>
  pathname.includes(Transaction);

export const isSelectedTitle = (pathname: string, path: string) =>
  pathname === `/transaction/${path}` || pathname === `/stats/${path}`;

export const isTransactionTypeIncome = (type: string, amount: string) =>
  type === Income ? (parseFloat(amount) / 100).toFixed(2) : "";

export const isTransactionTypeExpense = (type: string, amount: string) =>
  type === Expense || type === Transfer
    ? (parseFloat(amount) / 100).toFixed(2)
    : "";

export const Transaction: string = "transaction";
export const Transfer: string = "transfer";
export const Income: string = "income";
export const Expense: string = "expense";
export const Stats: string = "stats";
export const Export: string = "export";
export const Accounts: string = "accounts";
export const Currency: string = "Bg";

export const Monday: string = "M";
export const Thuesday: string = "T";
export const Wednesday: string = "W";
export const Thursday: string = "Th";
export const Friday: string = "F";
export const Saturday: string = "Sa";
export const Sunday: string = "Su";

export const headerTitle = (path: string) => {
  switch (true) {
    case path.includes("/transaction"):
      return Transaction.toLocaleUpperCase();
    case path.includes("/stats"):
      return Stats.toLocaleUpperCase();
    case path.includes("/export"):
      return Export.toLocaleUpperCase();
    case path.includes("/accounts"):
      return Accounts.toLocaleUpperCase();
    default:
      return "";
  }
};

export const transaction = (transaction: TransactionEvent) => {
  const {
    type,
    transferId,
    date,
    account,
    category,
    from,
    fees,
    to,
    amount,
    note,
    description,
  } = transaction;
  return {
    events: [
      {
        type: type.toLowerCase(),
        currency: Currency,
        transferId: transferId,
        date: Moment(date).startOf("date"),
        account: isTypeTransfer(type) ? "" : account,
        category: isTypeTransfer(type) ? "" : category,
        from: isTypeTransfer(type) ? from : "",
        fees: parseFloat(fees!) * 100,
        to: isTypeTransfer(type) ? to : "",
        amount: parseFloat(amount) * 100,
        note: note,
        description: description,
      },
    ],
    createdAt: Moment(transaction.date).startOf("date"),
  };
};
