import Moment from "moment";
import { State } from "../modules/transaction/reducers/transactionReducer";

export const dayStartOfTheWeekOfTheMonth = (date: any) =>
  Moment(date).startOf("month").startOf("week").get("date");

export const monthStartOfTheWeekOfTheMonth = (date: any) =>
  Moment(date).startOf("month").startOf("week").get("month");

export const yearStartOfTheWeekOfTheMonth = (date: any) =>
  Moment(date).startOf("month").startOf("week").get("year");

export const dayEndOfTheWeekOfTheMonth = (date: any) =>
  Moment(date).endOf("month").endOf("week").get("date");

export const monthEndOfTheWeekOfTheMonth = (date: any) =>
  Moment(date).endOf("month").endOf("week").get("month");

export const yearEndOfTheWeekOfTheMonth = (date: any) =>
  Moment(date).endOf("month").endOf("week").get("year");

export const dayStartOfTheWeekEndOfTheMonth = (date: any) =>
  Moment(date).endOf("month").startOf("week").get("date");

export const monthStartOfTheWeekEndOfTheMonth = (date: any) =>
  Moment(date).endOf("month").startOf("week").get("month");

export const yearStartOfTheWeekEndOfTheMonth = (date: any) =>
  Moment(date).endOf("month").startOf("week").get("year");

export const dayEndOfTheWeekStartOfTheMonth = (date: any) =>
  Moment(date).startOf("month").endOf("week").get("date");

export const monthEndOfTheWeekStartOfTheMonth = (date: any) =>
  Moment(date).startOf("month").endOf("week").get("month");

export const yearEndOfTheWeekStartOfTheMonth = (date: any) =>
  Moment(date).startOf("month").endOf("week").get("year");

export const dayStartOfTheMonth = (date: any) =>
  Moment(date).startOf("month").get("date");

export const monthStartOfTheMonth = (date: any) =>
  Moment(date).startOf("month").get("month");

export const yearStartOfTheMonth = (date: any) =>
  Moment(date).startOf("month").get("year");

export const dayEndOfTheMonth = (date: any) =>
  Moment(date).endOf("month").get("date");

export const monthEndOfTheMonth = (date: any) =>
  Moment(date).endOf("month").get("month");

export const yearEndOfTheMonth = (date: any) =>
  Moment(date).endOf("month").get("year");

export const currentDay = (calDate: any, event: any) => {
  let isTrue: boolean =
    calDate.date.getDate() === new Date(event.createdAt).getDate() &&
    calDate.date.getMonth() === new Date(event.createdAt).getMonth() &&
    calDate.date.getFullYear() === new Date(event.createdAt).getFullYear();
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
export const transactionEvent = (transaction: State["transaction"]) => {
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
