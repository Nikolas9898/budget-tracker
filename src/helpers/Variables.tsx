import Moment from "moment";
import { TransactionReducer } from "./ITransactions";

export const dayStartOfTheWeekOfTheMonth = (date: Date) =>
  Moment(date).startOf("month").startOf("week").get("date");

export const monthStartOfTheWeekOfTheMonth = (date: Date) =>
  Moment(date).startOf("month").startOf("week").get("month");

export const yearStartOfTheWeekOfTheMonth = (date: Date) =>
  Moment(date).startOf("month").startOf("week").get("year");

export const dayEndOfTheWeekOfTheMonth = (date: Date) =>
  Moment(date).endOf("month").endOf("week").get("date");

export const monthEndOfTheWeekOfTheMonth = (date: Date) =>
  Moment(date).endOf("month").endOf("week").get("month");

export const yearEndOfTheWeekOfTheMonth = (date: Date) =>
  Moment(date).endOf("month").endOf("week").get("year");

export const dayStartOfTheWeekEndOfTheMonth = (date: Date) =>
  Moment(date).endOf("month").startOf("week").get("date");

export const monthStartOfTheWeekEndOfTheMonth = (date: Date) =>
  Moment(date).endOf("month").startOf("week").get("month");

export const yearStartOfTheWeekEndOfTheMonth = (date: Date) =>
  Moment(date).endOf("month").startOf("week").get("year");

export const dayEndOfTheWeekStartOfTheMonth = (date: Date) =>
  Moment(date).startOf("month").endOf("week").get("date");

export const monthEndOfTheWeekStartOfTheMonth = (date: Date) =>
  Moment(date).startOf("month").endOf("week").get("month");

export const yearEndOfTheWeekStartOfTheMonth = (date: Date) =>
  Moment(date).startOf("month").endOf("week").get("year");

export const dayStartOfTheMonth = (date: Date) =>
  Moment(date).startOf("month").get("date");

export const monthStartOfTheMonth = (date: Date) =>
  Moment(date).startOf("month").get("month");

export const yearStartOfTheMonth = (date: Date) =>
  Moment(date).startOf("month").get("year");

export const dayEndOfTheMonth = (date: Date) =>
  Moment(date).endOf("month").get("date");

export const monthEndOfTheMonth = (date: Date) =>
  Moment(date).endOf("month").get("month");

export const yearEndOfTheMonth = (date: Date) =>
  Moment(date).endOf("month").get("year");

export const currentDay = (calDate: Date, eventDate: Date) => {
  let isTrue: boolean =
    calDate.getDate() === new Date(eventDate).getDate() &&
    calDate.getMonth() === new Date(eventDate).getMonth() &&
    calDate.getFullYear() === new Date(eventDate).getFullYear();
  return isTrue;
};
export const typeIsTransfer = (type: string) => {
  let isTrue: boolean = type.toLowerCase() === "transfer";
  return isTrue;
};

export const containerIsTransaction = (pathname: string) => {
  let containerIsTransaction: boolean = pathname.includes("transaction");
  return containerIsTransaction;
};

export const isSelectedTitle = (pathname: string, path: string) => {
  let isSelectedTitle: boolean =
    pathname === `/transaction/${path}` || pathname === `/stats/${path}`;
  return isSelectedTitle;
};
export const transactionTypeIsIncome = (type: string, amount: string) => {
  let income = type === "income" ? (parseFloat(amount) / 100).toFixed(2) : "";
  return income;
};
export const transactionTypeIsExpense = (type: string, amount: string) => {
  let income =
    type === "expense" || type === "transfer"
      ? (parseFloat(amount) / 100).toFixed(2)
      : "";
  return income;
};
export const headerTitle = (path: string) => {
  switch (true) {
    case path.includes("/transaction"):
      return "Transaction";
    case path.includes("/stats"):
      return "Stats";
    case path.includes("/export"):
      return "Export";
    case path.includes("/accounts"):
      return "Accounts";
    default:
      return "";
  }
};

export const transactionEvent = (
  transaction: TransactionReducer["transaction"]
) => {
  let event = {
    events: [
      {
        type: transaction.type.toLowerCase(),
        currency: "BG",
        transferId: transaction.transferId,
        date: new Date(
          new Date(transaction.date).setHours(16, 33, 22)
        ).toISOString(),
        account: typeIsTransfer(transaction.type.toLowerCase())
          ? ""
          : transaction.account,
        category: typeIsTransfer(transaction.type.toLowerCase())
          ? ""
          : transaction.category,
        from: typeIsTransfer(transaction.type.toLowerCase())
          ? transaction.from
          : "",
        fees: parseFloat(transaction.fees) * 100,
        to: typeIsTransfer(transaction.type.toLowerCase())
          ? transaction.to
          : "",
        amount: parseFloat(transaction.amount) * 100,
        note: transaction.note,
        description: transaction.description,
      },
    ],
    createdAt: new Date(
      new Date(transaction.date).setHours(0o0, 0o0, 0o0)
    ).toISOString(),
  };
  return event;
};
