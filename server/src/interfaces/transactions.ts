import { Document } from "mongoose";

export default interface ITransaction extends Document {
  _id: string;
  createdAt: Date;
  events: Array<TransactionEvent>;
  userId: string;
  income: number;
  expense: number;
  updatedAt: string;
  __v: number;
}

interface IObjectKeys {
  [key: string]: string | number | undefined;
}

export interface TransactionEvent extends IObjectKeys {
  _id?: string;
  type: string;
  currency: string;
  transferId?: string;
  date: string;
  fees?: number;
  from?: string;
  to?: string;
  account: string | undefined;
  category: string | undefined;
  amount: number;
  note: string;
  description: string;
}

export interface TransferWithFees extends IObjectKeys {
  type: string;
  currency: string;
  transferId?: string;
  date: string;
  fees: number;
  from?: string;
  to?: string;
  account: string | undefined;
  category: string | undefined;
  amount: number;
  note: string;
  description: string;
}

export type DummyExpenseEvents = {
  type: string;
  currency: string;
  transferId?: string;
  date: string;
  fees?: number;
  from?: string;
  to?: string;
  account: string;
  category: string;
  amount: number;
  note: string;
  description: string;
};

export enum Expense {
  type = "expense",
  note = "fees",
  category = "other",
  currency = "BG",
}

export enum eventTypes {
  income = "income",
  expense = "expense",
  transfer = "transfer",
}

export enum successMessages {
  deletedSuccessfully = "Deleted successfully",
}

export enum errorMessages {
  noExistingTransaction = "Not authorized or transaction does not exist",
  noTransaction = "No such transaction available",
  twoDatesPicket = "Please ensure you pick two dates",
}

export enum momentConstants {
  day = "day",
}
