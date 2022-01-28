import {Document} from 'mongoose';

export default interface TransactionType extends Document {
  _id: string;
  createdAt: Date;
  events: TransactionEvent[];
  userId: string;
  income: number;
  expense: number;
  updatedAt: string;
  __v: number;
}

export interface IObjectKeys {
  [key: string]: string | number | undefined;
}

export interface TransactionEvent extends IObjectKeys {
  _id?: string;
  type: string;
  currency: string;
  transferId?: string;
  date: string;
  fees: number;
  from: string;
  to: string;
  account: string;
  category: string | undefined;
  amount: number;
  note: string;
  description: string;
}

export interface ExportEvent extends IObjectKeys {
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
  from: string;
  to: string;
  account: string | undefined;
  category: string | undefined;
  amount: number;
  note: string;
  description: string;
}

export type DummyExpenseEvent = {
  type: string;
  currency: string;
  transferId?: string;
  date: string;
  fees: number;
  from: string;
  to: string;
  account: string;
  category: string;
  amount: number;
  note: string;
  description: string;
};

export enum Expense {
  TYPE = 'expense',
  NOTE = 'fees',
  CATEGORY = 'other',
  CURRENCY = 'BGN'
}

export enum EventTypes {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'transfer'
}

export const DELETED_SUCCESSFULLY = 'Deleted successfully';

export const NO_EXISTING_TRANSACTION = 'Not authorized or transaction does not exist';
export const NO_TRANSACTION = 'No such transaction available';
export const TWO_DATES_PICKED = 'Please ensure you pick two dates';

export enum MomentConstants {
  DAY = 'day'
}
