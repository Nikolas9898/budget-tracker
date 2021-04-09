import Moment from "moment";
import { TransactionEvent } from "../interfaces/Transaction";

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

export const isTypeTransfer = (type: string) =>
  type.toLowerCase() === TransactionTypes.Transfer;

export const isTransactionContainer = (pathname: string) =>
  pathname.includes(TransactionPage.Transaction);

export const isSelectedTitle = (pathname: string, path: string) =>
  pathname === `/transaction/${path}` || pathname === `/stats/${path}`;

export const isTransactionTypeIncome = (type: string, amount: string) =>
  type === TransactionTypes.Income ? (parseFloat(amount) / 100).toFixed(2) : "";

export const isTransactionTypeExpense = (type: string, amount: string) =>
  type === TransactionTypes.Expense || type === TransactionTypes.Transfer
    ? (parseFloat(amount) / 100).toFixed(2)
    : "";

export enum DaysOfWeek {
  Monday = "M",
  Thuesday = "T",
  Wednesday = "W",
  Thursday = "Th",
  Friday = "F",
  Saturday = "Sa",
  Sunday = "Su",
}

export enum TransactionTypes {
  Transfer = "Ttransfer",
  Income = "income",
  Expense = "expense",
  Currency = "Bg",
}
export enum TransactionPage {
  Transaction = "transaction",
  Stats = "stats",
  Export = "export",
  Accounts = "accounts",
}

export const headerTitle = (path: string) => {
  switch (true) {
    case path.includes("/transaction"):
      return TransactionPage.Transaction.toLocaleUpperCase();
    case path.includes("/stats"):
      return TransactionPage.Stats.toLocaleUpperCase();
    case path.includes("/export"):
      return TransactionPage.Export.toLocaleUpperCase();
    case path.includes("/accounts"):
      return TransactionPage.Accounts.toLocaleUpperCase();
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
        currency: TransactionTypes.Currency,
        transferId: transferId,
        date: Moment(date),
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
