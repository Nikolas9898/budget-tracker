import { Document } from "mongoose";

export default interface TransactionInterface extends Document {
  _id: string;
  createdAt: Date;
  events: Array<TransactionEvent>;
  userId: string;
  income: number;
  expense: number;
  updatedAt: string;
  __v: number;
}

export interface TransactionEvent {
  _id?: string;
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
